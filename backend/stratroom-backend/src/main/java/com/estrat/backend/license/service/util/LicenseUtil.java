/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.license.bean.LicenseData
 *  com.estrat.backend.license.bean.LicenseKey
 *  com.estrat.backend.license.bean.OrgLicenseDetails
 *  com.estrat.backend.license.dto.LicenseResponseDTO
 *  com.estrat.backend.license.service.util.LicenseUtil
 *  io.reactivex.functions.BiPredicate
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.license.service.util;

import com.estrat.backend.license.bean.LicenseData;
import com.estrat.backend.license.bean.LicenseKey;
import com.estrat.backend.license.bean.OrgLicenseDetails;
import com.estrat.backend.license.dto.LicenseResponseDTO;
import io.reactivex.functions.BiPredicate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LicenseUtil {
    private Logger log = LoggerFactory.getLogger(LicenseUtil.class);
    BiPredicate<List<String>, List<String>> validateCollection = (elibileList, licenseList) -> licenseList.stream().allMatch(module -> elibileList.contains(module));

    public LicenseResponseDTO validateLicenseDetails(LicenseData licenseData, OrgLicenseDetails orgLicenseDetails, LicenseKey licenseObj) {
        LicenseResponseDTO licenseResponseDTO = null;
        try {
            boolean userCheck;
            boolean expiryCheck;
            licenseResponseDTO = new LicenseResponseDTO();
            long allowedUsers = licenseData.getTotalUsers();
            List moduleList = CollectionUtils.isNotEmpty((Collection)licenseData.getModuleList()) ? licenseData.getModuleList() : Collections.emptyList();
            List dbModuleList = StringUtils.isNotEmpty((CharSequence)orgLicenseDetails.getModules()) ? Arrays.asList(orgLicenseDetails.getModules().split("\\,")).stream().map(obj -> obj.toString()).collect(Collectors.toList()) : Collections.emptyList();
            List deviceList = CollectionUtils.isNotEmpty((Collection)licenseData.getDeviceList()) ? licenseData.getDeviceList() : Collections.emptyList();
            List dbDeviceList = StringUtils.isNotEmpty((CharSequence)orgLicenseDetails.getDevices()) ? Arrays.asList(orgLicenseDetails.getDevices().split("\\,")).stream().map(obj -> obj.toString()).collect(Collectors.toList()) : Collections.emptyList();
            boolean deviceCheck = this.validateCollection.test((List<String>)dbDeviceList, (List<String>)deviceList);
            if (!deviceCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("Device details mismatch with license");
                return licenseResponseDTO;
            }
            boolean moduleCheck = this.validateCollection.test((List<String>)dbModuleList, (List<String>)moduleList);
            if (!moduleCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("Module details mismatch with license");
                return licenseResponseDTO;
            }
            Date dbExpiryDate = orgLicenseDetails.getExpiryDate();
            boolean bl = expiryCheck = !dbExpiryDate.before(new Date());
            if (!expiryCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("License has been expired please renew your license");
                return licenseResponseDTO;
            }
            boolean bl2 = userCheck = orgLicenseDetails.getTotalUsers() == allowedUsers;
            if (!userCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("User details mismatch with license");
                return licenseResponseDTO;
            }
            String organization = StringUtils.stripToEmpty((String)licenseData.getOrganization());
            boolean orgCheck = orgLicenseDetails.getOrganiztion().equalsIgnoreCase(organization);
            if (!orgCheck) {
                licenseResponseDTO.setValidationSuccess(false);
                licenseResponseDTO.setValidationMesssage("Organization mismatch with license");
                return licenseResponseDTO;
            }
            licenseResponseDTO.setExpiryDate(dbExpiryDate);
            licenseResponseDTO.setModuleList(moduleList);
            licenseResponseDTO.setOrganization(organization);
            licenseResponseDTO.setValidationSuccess(true);
            licenseResponseDTO.setTotalAllowedUsers(Long.valueOf(allowedUsers));
            licenseResponseDTO.setDeviceList(deviceList);
        }
        catch (Exception e) {
            this.log.error("Exception while validating license", e);
            licenseResponseDTO = new LicenseResponseDTO();
            licenseResponseDTO.setValidationMesssage("Exception occured while validating license " + e.getMessage());
            licenseResponseDTO.setValidationSuccess(false);
        }
        return licenseResponseDTO;
    }
}

