/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.ControlPanelSecurityDTO
 */
package com.estrat.service.user.dto;

import java.time.LocalDateTime;

public class ControlPanelSecurityDTO {
    private String securityType;
    private String singleSignURL;
    private String audienceURL;
    private String defaultRelayState;
    private String updateApplicationUsername;
    private String applicationUsername;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String nameIDFormat;
    private boolean recipientUrl;
    private boolean allowSSo;
    private long orgId;

    public String getSecurityType() {
        return this.securityType;
    }

    public void setSecurityType(String securityType) {
        this.securityType = securityType;
    }

    public String getSingleSignURL() {
        return this.singleSignURL;
    }

    public void setSingleSignURL(String singleSignURL) {
        this.singleSignURL = singleSignURL;
    }

    public String getAudienceURL() {
        return this.audienceURL;
    }

    public void setAudienceURL(String audienceURL) {
        this.audienceURL = audienceURL;
    }

    public String getDefaultRelayState() {
        return this.defaultRelayState;
    }

    public void setDefaultRelayState(String defaultRelayState) {
        this.defaultRelayState = defaultRelayState;
    }

    public String getUpdateApplicationUsername() {
        return this.updateApplicationUsername;
    }

    public void setUpdateApplicationUsername(String updateApplicationUsername) {
        this.updateApplicationUsername = updateApplicationUsername;
    }

    public String getApplicationUsername() {
        return this.applicationUsername;
    }

    public void setApplicationUsername(String applicationUsername) {
        this.applicationUsername = applicationUsername;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public String getNameIDFormat() {
        return this.nameIDFormat;
    }

    public void setNameIDFormat(String nameIDFormat) {
        this.nameIDFormat = nameIDFormat;
    }

    public boolean isRecipientUrl() {
        return this.recipientUrl;
    }

    public void setRecipientUrl(boolean recipientUrl) {
        this.recipientUrl = recipientUrl;
    }

    public boolean isAllowSSo() {
        return this.allowSSo;
    }

    public void setAllowSSo(boolean allowSSo) {
        this.allowSSo = allowSSo;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }
}

