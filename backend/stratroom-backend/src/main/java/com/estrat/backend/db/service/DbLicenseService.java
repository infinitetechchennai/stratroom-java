/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.LicenseResponseDTO
 *  com.estrat.backend.db.resource.util.EncryptionProvider
 *  com.estrat.backend.db.resource.util.SignatureProvider
 *  com.estrat.backend.db.service.LicenseService
 *  com.estrat.backend.license.bean.LicenseData
 *  com.estrat.backend.license.bean.LicenseKey
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.dto.LicenseResponseDTO;
import com.estrat.backend.db.resource.util.EncryptionProvider;
import com.estrat.backend.db.resource.util.SignatureProvider;
import com.estrat.service.licenseservice.bean.LicenseData;
import com.estrat.service.licenseservice.bean.LicenseKey;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DbLicenseService {
    private static final Logger log = LoggerFactory.getLogger(DbLicenseService.class);
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    @Qualifier("dbSignatureProvider")
    private SignatureProvider signatureProvider;
    @Autowired
    @Qualifier("dbEncryptionProvider")
    private EncryptionProvider encryptionProvider;
    @Value(value="${license.validate.url}")
    private String licenseUrl;
    @Value(value="${license.file.path}")
    private String licenseFilePath;

    public LicenseResponseDTO validateLicense() {
        HashMap<String, String> licenseMap = new HashMap<String, String>();
        licenseMap.put("licenseKey", this.readLicenseFile());
        String licenseString = (String)licenseMap.get("licenseKey");
        LicenseKey licenseKey = (LicenseKey)this.encryptionProvider.decrypt(licenseString);
        LicenseData licenseData = (LicenseData)this.encryptionProvider.decrypt(licenseKey.getDataString(), licenseKey.getLicenseSaltKey());
        LicenseResponseDTO licenseResponseDTO = null;
        try {
            boolean expiryCheck;
            licenseResponseDTO = new LicenseResponseDTO();
            long allowedUsers = licenseData.getTotalUsers();
            List<String> moduleList = CollectionUtils.isNotEmpty(licenseData.getModuleList()) ? licenseData.getModuleList() : Collections.emptyList();
            List<String> deviceList = CollectionUtils.isNotEmpty(licenseData.getDeviceList()) ? licenseData.getDeviceList() : Collections.emptyList();
            Date dbExpiryDate = licenseData.getExpiryDate();
            boolean bl = expiryCheck = !dbExpiryDate.before(new Date());
            if (!expiryCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("License has been expired please renew your license");
                return licenseResponseDTO;
            }
            licenseResponseDTO.setExpiryDate(dbExpiryDate);
            licenseResponseDTO.setModuleList(moduleList);
            licenseResponseDTO.setOrganization(licenseData.getOrganization());
            licenseResponseDTO.setValidationSuccess(true);
            licenseResponseDTO.setTotalAllowedUsers(Long.valueOf(allowedUsers));
            licenseResponseDTO.setDeviceList(deviceList);
        }
        catch (Exception e) {
            log.error("Exception while validating license", e);
            licenseResponseDTO = new LicenseResponseDTO();
            licenseResponseDTO.setValidationMesssage("Exception occured while validating license " + e.getMessage());
            licenseResponseDTO.setValidationSuccess(false);
        }
        return licenseResponseDTO;
    }

    public String readLicenseFile() {
        StringBuffer stringBuffer = new StringBuffer();
        BufferedReader bufferedReader = null;
        InputStreamReader fileReader = null;
        try {
            fileReader = new FileReader(new File(this.licenseFilePath));
            bufferedReader = new BufferedReader(fileReader);
            String data = null;
            while ((data = bufferedReader.readLine()) != null) {
                stringBuffer.append(data);
            }
        }
        catch (Exception e) {
            log.error("Exception while reading license file ", e);
            throw new RuntimeException(e);
        }
        finally {
            try {
                if (fileReader != null) {
                    fileReader.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            }
            catch (Exception e) {
                log.error("Exception while reading license file ", e);
                throw new RuntimeException(e);
            }
        }
        return stringBuffer.toString();
    }
}

