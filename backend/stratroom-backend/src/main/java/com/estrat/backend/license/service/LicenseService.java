/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.license.bean.LicenseData
 *  com.estrat.backend.license.bean.LicenseKey
 *  com.estrat.backend.license.bean.OrgLicenseDetails
 *  com.estrat.backend.license.dao.LicenseRepository
 *  com.estrat.backend.license.dto.LicenseDTO
 *  com.estrat.backend.license.dto.LicenseResponseDTO
 *  com.estrat.backend.license.service.LicenseService
 *  com.estrat.backend.license.service.util.EncryptionProvider
 *  com.estrat.backend.license.service.util.KeyGenerator
 *  com.estrat.backend.license.service.util.LicenseUtil
 *  com.estrat.backend.license.service.util.SignatureProvider
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.license.service;

import com.estrat.backend.license.bean.LicenseData;
import com.estrat.backend.license.bean.LicenseKey;
import com.estrat.backend.license.bean.OrgLicenseDetails;
import com.estrat.backend.license.dao.LicenseRepository;
import com.estrat.backend.license.dto.LicenseDTO;
import com.estrat.backend.license.dto.LicenseResponseDTO;
import com.estrat.backend.license.service.util.EncryptionProvider;
import com.estrat.backend.license.service.util.KeyGenerator;
import com.estrat.backend.license.service.util.LicenseUtil;
import com.estrat.backend.license.service.util.SignatureProvider;
import java.io.Serializable;
import java.security.KeyPair;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class LicenseService {
    private Logger log = LoggerFactory.getLogger(LicenseService.class);
    @Autowired
    protected LicenseRepository licenseRepository;
    @Autowired
    @Qualifier("licenseSignatureProvider")
    private SignatureProvider signatureProvider;
    @Autowired
    private KeyGenerator keyGenerator;
    @Autowired
    @Qualifier("licenseEncryptionProvider")
    private EncryptionProvider encryptionProvider;
    @Autowired
    private LicenseUtil licenseUtil;

    public OrgLicenseDetails findByLicenseKey(String licenseKey) {
        return this.licenseRepository.findLicenseByKey(licenseKey);
    }

    public String saveAndGenerateLicense(KeyPair licenseKeyPair, LicenseKey licenseKey, LicenseDTO licenseDTO) {
        OrgLicenseDetails orgLicenseDetails = new OrgLicenseDetails();
        orgLicenseDetails.setExpiryDate(licenseDTO.getExpiryDate());
        orgLicenseDetails.setIssuedDate(LocalDateTime.now());
        orgLicenseDetails.setLicenseKey(licenseKey.getLicenseSaltKey());
        orgLicenseDetails.setModules(CollectionUtils.isNotEmpty((Collection)licenseDTO.getModuleList()) ? String.join((CharSequence)",", licenseDTO.getModuleList()) : "");
        orgLicenseDetails.setDevices(CollectionUtils.isNotEmpty((Collection)licenseDTO.getDeviceList()) ? String.join((CharSequence)",", licenseDTO.getDeviceList()) : "");
        orgLicenseDetails.setOrganiztion(StringUtils.stripToEmpty((String)licenseDTO.getOrganization()));
        orgLicenseDetails.setPrivteKey(this.signatureProvider.encodeBase64(licenseKeyPair.getPrivate().getEncoded()));
        orgLicenseDetails.setPublicKey(licenseKey.getPublicKey());
        orgLicenseDetails.setTotalUsers(licenseDTO.getTotalAllowedUsers());
        String licenseString = this.encryptionProvider.encrypt((Serializable)licenseKey);
        orgLicenseDetails.setLicenseString(licenseString);
        this.licenseRepository.save(orgLicenseDetails);
        return licenseString;
    }

    public String createLicense(LicenseDTO licenseDTO) {
        LicenseKey licenseKey = new LicenseKey();
        long time = UUID.randomUUID().getMostSignificantBits();
        String licenseSaltKey = this.keyGenerator.generate(String.valueOf(time));
        KeyPair licenseKeyPair = this.signatureProvider.generateKeyPair();
        LicenseData licenseData = new LicenseData();
        licenseData.setExpiryDate(licenseDTO.getExpiryDate());
        licenseData.setTotalUsers(Long.valueOf(licenseDTO.getTotalAllowedUsers()));
        licenseData.setModuleList(licenseDTO.getModuleList());
        licenseData.setDeviceList(licenseDTO.getDeviceList());
        licenseData.setOrganization(licenseDTO.getOrganization());
        licenseKey.setLicenseSaltKey(licenseSaltKey);
        licenseKey.setPublicKey(this.signatureProvider.encodeBase64(licenseKeyPair.getPublic().getEncoded()));
        licenseKey.setDataString(this.encryptionProvider.encrypt((Serializable)licenseData, licenseSaltKey));
        String licenseString = this.saveAndGenerateLicense(licenseKeyPair, licenseKey, licenseDTO);
        return licenseString;
    }

    public LicenseResponseDTO validateLicense(Map<String, String> licenseDTO) {
        String licenseKey = licenseDTO.get("licenseKey");
        LicenseKey licenseObj = (LicenseKey)this.encryptionProvider.decrypt(licenseKey);
        OrgLicenseDetails orgLicenseDetails = this.findByLicenseKey(licenseObj.getLicenseSaltKey());
        if (orgLicenseDetails != null) {
            LicenseData licenseData = (LicenseData)this.encryptionProvider.decrypt(licenseObj.getDataString(), licenseObj.getLicenseSaltKey());
            LicenseResponseDTO licenseResponseDTO = this.licenseUtil.validateLicenseDetails(licenseData, orgLicenseDetails, licenseObj);
            if (licenseResponseDTO.isValidationSuccess()) {
                licenseResponseDTO.setSignature(this.signatureProvider.generateDigitalSignature(orgLicenseDetails.getPrivteKey(), licenseData));
            }
            return licenseResponseDTO;
        }
        this.log.error("License details not found for given license key " + licenseObj.getLicenseSaltKey());
        LicenseResponseDTO licenseResponseDTO = new LicenseResponseDTO();
        licenseResponseDTO.setValidationSuccess(false);
        licenseResponseDTO.setValidationMesssage("License details not found for given license key");
        return licenseResponseDTO;
    }
}

