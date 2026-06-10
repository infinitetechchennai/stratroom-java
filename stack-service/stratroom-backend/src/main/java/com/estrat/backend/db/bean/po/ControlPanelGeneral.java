/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelGeneral
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="control_panel_general", schema="orgstructure")
public class ControlPanelGeneral {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="orgId")
    private long orgId;
    @Column(name="site_name")
    private String siteName;
    @Column(name="site_language")
    private String siteLanguage;
    @Column(name="admin_email_id")
    private String adminEmailId;
    @Column(name="currency_type")
    private String currencyType;
    @Column(name="calendar_year")
    private String calendarYear;
    @Column(name="time_zone")
    private String timeZone;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="general_setting_value")
    private String generalSettingValue;
    @Column(name="currency_view")
    private String currencyView;
    @Column(name="default_date_period")
    private String defaultDatePeriod;
    @Column(name="department_id")
    private Long departmentId;
    @Column(name="department")
    private String department;
    @Column(name="implementation")
    private String implementation;
    @Column(name="implementation_type")
    private String implementationType;
    @Column(name="start_month")
    private String startMonth;
    @Column(name="end_month")
    private String endMonth;

    public ControlPanelGeneral() {
    }

    public ControlPanelGeneral(ControlPanelGeneralDTO controlPanelGeneral) {
        this.orgId = controlPanelGeneral.getOrgId();
        this.siteName = controlPanelGeneral.getSiteName();
        this.siteLanguage = controlPanelGeneral.getSiteLanguage();
        this.adminEmailId = controlPanelGeneral.getAdminEmailId();
        this.currencyType = controlPanelGeneral.getCurrencyType();
        this.calendarYear = controlPanelGeneral.getCalendarYear();
        this.timeZone = controlPanelGeneral.getTimeZone();
        this.createdBy = controlPanelGeneral.getCreatedBy();
        this.updatedBy = controlPanelGeneral.getUpdatedBy();
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
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.generalSettingValue = mapper.writeValueAsString((Object)controlPanelGeneral.getGeneralSettingValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
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

    public String getGeneralSettingValue() {
        return this.generalSettingValue;
    }

    public void setGeneralSettingValue(String generalSettingValue) {
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

