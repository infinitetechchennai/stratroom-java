/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.OrganizationDetails
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.LicenseResponseDTO
 *  com.estrat.backend.db.resource.util.ScoreCardUtil
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.LicenseService
 *  com.estrat.backend.db.service.NotificationBatchService
 *  com.estrat.backend.db.service.OrgDetailsService
 *  org.apache.commons.collections4.CollectionUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.OrganizationDetails;
import com.estrat.backend.db.bean.po.OrgDetails;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.LicenseResponseDTO;
import com.estrat.backend.db.resource.util.ScoreCardUtil;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.DbLicenseService;
import com.estrat.backend.db.service.OrgDetailsService;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationBatchService {
    @Autowired
    private ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    private DbLicenseService licenseService;
    @Autowired
    private OrgDetailsService orgDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Value(value="${batch.all.organization:false}")
    private boolean allOrgFlag;
    @Autowired
    private ScoreCardUtil scoreCardUtil;

    public void sendNotification() {
        boolean licenseNotification;
        LicenseResponseDTO licenseResponseDTO = this.licenseService.validateLicense();
        boolean bl = licenseNotification = CollectionUtils.isNotEmpty((Collection)licenseResponseDTO.getModuleList()) ? licenseResponseDTO.getModuleList().contains("Notifications") : false;
        if (this.allOrgFlag) {
            List<OrganizationDetails> orgList = this.employeeService.getOrgList();
            orgList.forEach(organization -> this.processBatch(organization, licenseNotification));
        } else {
            OrgDetails orgDetails = this.orgDetailsService.findByName(licenseResponseDTO.getOrganization());
            this.processBatch(new OrganizationDetails(orgDetails), licenseNotification);
        }
    }

    private void processBatch(OrganizationDetails orgDetails, boolean licenseNotification) {
        if (orgDetails != null && orgDetails.getOrgId() != 0L) {
            boolean notificationEnabled;
            ControlPanelGeneralDTO panelGeneralDTO = this.controlPanelGeneralService.findByOrgId(orgDetails.getOrgId());
            Object notification = Objects.nonNull(panelGeneralDTO) && Objects.nonNull(panelGeneralDTO.getGeneralSettingValue()) ? panelGeneralDTO.getGeneralSettingValue().get("notification") : null;
            boolean bl = notificationEnabled = notification != null ? Boolean.valueOf(notification.toString()) : false;
            if (notificationEnabled && licenseNotification) {
                this.scoreCardUtil.populateExpiryScoreCardNotifications();
            }
        }
    }
}

