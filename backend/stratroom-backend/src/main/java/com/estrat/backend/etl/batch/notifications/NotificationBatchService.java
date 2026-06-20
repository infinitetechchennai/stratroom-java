/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.batch.notifications.NotificationBatchService
 *  com.estrat.backend.etl.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.etl.dto.LicenseResponseDTO
 *  com.estrat.backend.etl.dto.OrgDetails
 *  com.estrat.backend.etl.dto.OrganizationDetails
 *  com.estrat.backend.etl.service.DBService
 *  com.estrat.backend.etl.service.LicenseService
 *  com.estrat.backend.etl.util.KPIUtil
 *  com.estrat.backend.etl.util.ScoreCardUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.etl.batch.notifications;

import com.estrat.backend.etl.dto.ControlPanelGeneralDTO;
import com.estrat.backend.etl.dto.LicenseResponseDTO;
import com.estrat.backend.etl.dto.OrgDetails;
import com.estrat.backend.etl.dto.OrganizationDetails;
import com.estrat.backend.etl.service.DBService;
import com.estrat.backend.etl.service.LicenseService;
import com.estrat.backend.etl.util.KPIUtil;
import com.estrat.backend.etl.util.ScoreCardUtil;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class NotificationBatchService {
    public static final String NOTIFICATIONS = "Notifications";
    @Autowired
    private DBService dbService;
    @Autowired
    private LicenseService licenseService;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private ScoreCardUtil scoreCardUtil;
    @Value(value="${batch.all.organization:false}")
    private boolean allOrgFlag;

    public void sendNotification() {
        boolean licenseNotification;
        LicenseResponseDTO licenseResponseDTO = this.licenseService.validateLicense();
        boolean bl = licenseNotification = CollectionUtils.isNotEmpty((Collection)licenseResponseDTO.getModuleList()) ? licenseResponseDTO.getModuleList().contains(NOTIFICATIONS) : false;
        if (this.allOrgFlag) {
            List<com.estrat.backend.etl.dto.OrganizationDetails> orgList = this.dbService.getOrgList();
            orgList.forEach(organization -> this.processBatch((com.estrat.backend.etl.dto.OrganizationDetails)organization, licenseNotification));
        } else {
            OrgDetails orgDetails = (OrgDetails)this.dbService.findByName(licenseResponseDTO.getOrganization()).getBody();
            this.processBatch(new OrganizationDetails(orgDetails), licenseNotification);
        }
    }

    private void processBatch(OrganizationDetails orgDetails, boolean licenseNotification) {
        if (orgDetails != null && orgDetails.getOrgId() != 0L) {
            boolean notificationEnabled;
            ControlPanelGeneralDTO panelGeneralDTO = this.dbService.findByOrgId(orgDetails.getOrgId());
            Object notification = Objects.nonNull(panelGeneralDTO) && Objects.nonNull(panelGeneralDTO.getGeneralSettingValue()) ? panelGeneralDTO.getGeneralSettingValue().get("notification") : null;
            boolean bl = notificationEnabled = notification != null ? Boolean.valueOf(notification.toString()) : false;
            if (notificationEnabled && licenseNotification) {
                this.kpiUtil.sendKPIDataNotifications(String.valueOf(orgDetails.getOrgId()));
                this.scoreCardUtil.sendStatusLightNotifications(String.valueOf(orgDetails.getOrgId()));
            }
        }
    }

    public void kpiStatusNotification() {
        this.scoreCardUtil.kpiStatusNotification();
    }
}

