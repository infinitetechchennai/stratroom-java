/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.bean.LicenseData
 *  com.estrat.service.licenseservice.bean.LicenseKey
 *  com.estrat.service.licenseservice.bean.OrgLicenseDetails
 *  com.estrat.service.licenseservice.dao.LicenseRepository
 *  com.estrat.service.licenseservice.dto.LicenseDTO
 *  com.estrat.service.licenseservice.dto.LicenseResponseDTO
 *  com.estrat.service.licenseservice.service.LicenseService
 *  com.estrat.service.licenseservice.service.util.EncryptionProvider
 *  com.estrat.service.licenseservice.service.util.KeyGenerator
 *  com.estrat.service.licenseservice.service.util.LicenseUtil
 *  com.estrat.service.licenseservice.service.util.SignatureProvider
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.licenseservice.service;

import com.estrat.service.licenseservice.bean.LicenseData;
import com.estrat.service.licenseservice.bean.LicenseKey;
import com.estrat.service.licenseservice.bean.OrgLicenseDetails;
import com.estrat.service.licenseservice.dao.LicenseRepository;
import com.estrat.service.licenseservice.dto.LicenseDTO;
import com.estrat.service.licenseservice.dto.LicenseResponseDTO;
import com.estrat.service.licenseservice.service.util.EncryptionProvider;
import com.estrat.service.licenseservice.service.util.KeyGenerator;
import com.estrat.service.licenseservice.service.util.LicenseUtil;
import com.estrat.service.licenseservice.service.util.SignatureProvider;
import java.io.Serializable;
import java.security.KeyPair;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LicenseService {
    private Logger log = Logger.getLogger(LicenseService.class);
    @Autowired
    protected LicenseRepository licenseRepository;
    @Autowired
    private SignatureProvider signatureProvider;
    @Autowired
    private KeyGenerator keyGenerator;
    @Autowired
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
        this.log.error((Object)("License details not found for given license key " + licenseObj.getLicenseSaltKey()));
        LicenseResponseDTO licenseResponseDTO = new LicenseResponseDTO();
        licenseResponseDTO.setValidationSuccess(false);
        licenseResponseDTO.setValidationMesssage("License details not found for given license key");
        return licenseResponseDTO;
    }
}

