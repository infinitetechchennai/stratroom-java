/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.KPIEntrysDTO
 *  com.estrat.backend.scorecard.dto.KPIFormula
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.KPIEntrysDTO;
import com.estrat.backend.scorecard.dto.KPIFormula;
import com.estrat.backend.scorecard.dto.SubKPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPIDTO {
    private long id;
    private long createdBy;
    private long departmentId;
    private KPIFormula kpiFormula;
    private String kpiName;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> kpiValue;
    private int active;
    private long owner;
    private long objectiveId;
    private String kpiId;
    public boolean includeReportee;
    public String customReportees;
    private Date startDate;
    private Date endDate;
    private int actType;
    private List<SubKPIDTO> subKpiList;
    private KPIEntrysDTO kpiEntrysDTO;

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public KPIFormula getKpiFormula() {
        return this.kpiFormula;
    }

    public void setKpiFormula(KPIFormula kpiFormula) {
        this.kpiFormula = kpiFormula;
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

    public Map<String, Object> getKpiValue() {
        return this.kpiValue;
    }

    public void setKpiValue(Map<String, Object> kpiValue) {
        this.kpiValue = kpiValue;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public String getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(String kpiId) {
        this.kpiId = kpiId;
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

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public List<SubKPIDTO> getSubKpiList() {
        return this.subKpiList;
    }

    public void setSubKpiList(List<SubKPIDTO> subKpiList) {
        this.subKpiList = subKpiList;
    }

    public KPIEntrysDTO getKpiEntrysDTO() {
        return this.kpiEntrysDTO;
    }

    public void setKpiEntrysDTO(KPIEntrysDTO kpiEntrysDTO) {
        this.kpiEntrysDTO = kpiEntrysDTO;
    }
}

