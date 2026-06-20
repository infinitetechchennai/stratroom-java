/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelGeneral
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ControlPanelGeneral;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ControlPanelGeneralDTO {
    private String siteName;
    private String siteLanguage;
    private String adminEmailId;
    private String currencyType;
    private String calendarYear;
    private String timeZone;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long orgId;
    private Map<String, Object> generalSettingValue;
    private Map<String, Object> risksetting;
    private String currencyView;
    private String defaultDatePeriod;
    private Long departmentId;
    private String department;
    private String implementation;
    private String implementationType;
    private String startMonth;
    private String endMonth;

    public ControlPanelGeneralDTO() {
    }

    public ControlPanelGeneralDTO(ControlPanelGeneral controlPanelGeneral) {
        if (controlPanelGeneral == null) return;
        this.siteName = controlPanelGeneral.getSiteName();
        this.siteLanguage = controlPanelGeneral.getSiteLanguage();
        this.adminEmailId = controlPanelGeneral.getAdminEmailId();
        this.currencyType = controlPanelGeneral.getCurrencyType();
        this.calendarYear = controlPanelGeneral.getCalendarYear();
        this.timeZone = controlPanelGeneral.getTimeZone();
        this.createdBy = controlPanelGeneral.getCreatedBy();
        this.updatedBy = controlPanelGeneral.getUpdatedBy();
        this.orgId = controlPanelGeneral.getOrgId();
        this.createdTime = controlPanelGeneral.getCreatedTime();
        this.updatedTime = controlPanelGeneral.getUpdatedTime();
        this.department = controlPanelGeneral.getDepartment();
        this.currencyView = controlPanelGeneral.getCurrencyView();
        this.departmentId = controlPanelGeneral.getDepartmentId();
        this.defaultDatePeriod = controlPanelGeneral.getDefaultDatePeriod();
        this.implementation = controlPanelGeneral.getImplementation();
        this.implementationType = controlPanelGeneral.getImplementationType();
        this.startMonth = controlPanelGeneral.getStartMonth();
        this.endMonth = controlPanelGeneral.getEndMonth();
        String gsv = controlPanelGeneral.getGeneralSettingValue();
        if (gsv != null && !gsv.isBlank()) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                this.generalSettingValue = (Map)mapper.readValue(gsv, HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

    public Map<String, Object> getRisksetting() {
        return this.risksetting;
    }

    public void setRisksetting(Map<String, Object> risksetting) {
        this.risksetting = risksetting;
    }
}

