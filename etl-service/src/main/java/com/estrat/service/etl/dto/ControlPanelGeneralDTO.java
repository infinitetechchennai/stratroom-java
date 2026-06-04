/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.ControlPanelGeneralDTO
 */
package com.estrat.service.etl.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ControlPanelGeneralDTO {
    private String siteName;
    private String siteLanguage;
    private String adminEmailId;
    private String currencyType;
    private String calendarYear;
    private String timeZone;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long orgId;
    private Map<String, Object> generalSettingValue;

    public String getSiteName() {
        return this.siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getSiteLanguage() {
        return this.siteLanguage;
    }

    public void setSiteLanguage(String siteLanguage) {
        this.siteLanguage = siteLanguage;
    }

    public String getAdminEmailId() {
        return this.adminEmailId;
    }

    public void setAdminEmailId(String adminEmailId) {
        this.adminEmailId = adminEmailId;
    }

    public String getCurrencyType() {
        return this.currencyType;
    }

    public void setCurrencyType(String currencyType) {
        this.currencyType = currencyType;
    }

    public String getCalendarYear() {
        return this.calendarYear;
    }

    public void setCalendarYear(String calendarYear) {
        this.calendarYear = calendarYear;
    }

    public String getTimeZone() {
        return this.timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public Map<String, Object> getGeneralSettingValue() {
        return this.generalSettingValue;
    }

    public void setGeneralSettingValue(Map<String, Object> generalSettingValue) {
        this.generalSettingValue = generalSettingValue;
    }
}

