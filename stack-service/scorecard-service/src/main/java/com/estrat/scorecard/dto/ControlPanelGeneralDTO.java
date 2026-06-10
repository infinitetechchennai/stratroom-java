/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ControlPanelGeneralDTO
 */
package com.estrat.scorecard.dto;

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
    private String currencyView;
    private String defaultDatePeriod;
    private Long departmentId;
    private String department;
    private String implementation;
    private String implementationType;
    private String startMonth;
    private String endMonth;

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

    public String getCurrencyView() {
        return this.currencyView;
    }

    public void setCurrencyView(String currencyView) {
        this.currencyView = currencyView;
    }

    public String getDefaultDatePeriod() {
        return this.defaultDatePeriod;
    }

    public void setDefaultDatePeriod(String defaultDatePeriod) {
        this.defaultDatePeriod = defaultDatePeriod;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getImplementation() {
        return this.implementation;
    }

    public void setImplementation(String implementation) {
        this.implementation = implementation;
    }

    public String getImplementationType() {
        return this.implementationType;
    }

    public void setImplementationType(String implementationType) {
        this.implementationType = implementationType;
    }

    public String getStartMonth() {
        return this.startMonth;
    }

    public void setStartMonth(String startMonth) {
        this.startMonth = startMonth;
    }

    public String getEndMonth() {
        return this.endMonth;
    }

    public void setEndMonth(String endMonth) {
        this.endMonth = endMonth;
    }
}

