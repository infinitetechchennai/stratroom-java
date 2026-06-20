/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPIFormula
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.estrat.backend.scorecard.dto.SubKPIEntrysDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.KPIFormula;
import com.estrat.backend.scorecard.dto.SubKPIEntrysDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class SubKPIDTO {
    private long id;
    private long orgId;
    private String subKpiName;
    private Long subKpiIdSequence;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active;
    private long owner;
    private long objectiveId;
    private Map<String, Object> subKpiValue;
    private String subKpiId;
    private boolean includeReportee;
    private String customReportees;
    private Date startDate;
    private Date endDate;
    private int actType;
    private KPIFormula kpiFormula;
    private long empId;
    private long kpiId;
    private long departmentId;
    private SubKPIEntrysDTO subKPIEntrysDTO;
    public boolean thresholdvalueupdate;
    private String createDateString;
    private String updatedDateString;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getSubKpiName() {
        return this.subKpiName;
    }

    public void setSubKpiName(String subKpiName) {
        this.subKpiName = subKpiName;
    }

    public Long getSubKpiIdSequence() {
        return this.subKpiIdSequence;
    }

    public void setSubKpiIdSequence(Long subKpiIdSequence) {
        this.subKpiIdSequence = subKpiIdSequence;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public Map<String, Object> getSubKpiValue() {
        if (this.subKpiValue == null) {
            this.subKpiValue = new HashMap();
        }
        return this.subKpiValue;
    }

    public void setSubKpiValue(Map<String, Object> subKpiValue) {
        this.subKpiValue = subKpiValue;
    }

    public String getSubKpiId() {
        return this.subKpiId;
    }

    public void setSubKpiId(String subKpiId) {
        this.subKpiId = subKpiId;
    }

    public boolean isIncludeReportee() {
        return this.includeReportee;
    }

    public void setIncludeReportee(boolean includeReportee) {
        this.includeReportee = includeReportee;
    }

    public String getCustomReportees() {
        return this.customReportees;
    }

    public void setCustomReportees(String customReportees) {
        this.customReportees = customReportees;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getActType() {
        return this.actType;
    }

    public void setActType(int actType) {
        this.actType = actType;
    }

    public KPIFormula getKpiFormula() {
        return this.kpiFormula;
    }

    public void setKpiFormula(KPIFormula kpiFormula) {
        this.kpiFormula = kpiFormula;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    @JsonIgnore
    public boolean isStatusRed() {
        String status = this.getSubKpiValue().get("statusLight") != null && StringUtils.isNotEmpty((CharSequence)this.getSubKpiValue().get("statusLight").toString()) ? this.getSubKpiValue().get("statusLight").toString() : "";
        return status.contains("red");
    }

    public boolean isThresholdvalueupdate() {
        return this.thresholdvalueupdate;
    }

    public void setThresholdvalueupdate(boolean thresholdvalueupdate) {
        this.thresholdvalueupdate = thresholdvalueupdate;
    }

    public String getUpdatedDateString() {
        return this.updatedDateString;
    }

    public void setUpdatedDateString(String updatedDateString) {
        this.updatedDateString = updatedDateString;
    }

    public String getCreateDateString() {
        return this.createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public SubKPIEntrysDTO getSubKPIEntrysDTO() {
        return this.subKPIEntrysDTO;
    }

    public void setSubKPIEntrysDTO(SubKPIEntrysDTO subKPIEntrysDTO) {
        this.subKPIEntrysDTO = subKPIEntrysDTO;
    }
}

