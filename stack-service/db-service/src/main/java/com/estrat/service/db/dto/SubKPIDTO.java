/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubKPI
 *  com.estrat.service.db.dto.KPIFormula
 *  com.estrat.service.db.dto.SubKPIDTO
 *  com.estrat.service.db.resource.util.KPIUtil
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.SubKPI;
import com.estrat.service.db.dto.KPIFormula;
import com.estrat.service.db.resource.util.KPIUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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

    public SubKPIDTO() {
    }

    public SubKPIDTO(SubKPI subKpi) {
        this.id = subKpi.getId();
        this.createdTime = subKpi.getCreatedTime();
        this.updatedTime = subKpi.getUpdatedTime();
        this.active = subKpi.getActive();
        this.owner = subKpi.getOwner();
        this.createdBy = subKpi.getCreatedBy();
        this.updatedBy = subKpi.getUpdatedBy();
        this.subKpiId = subKpi.getSubKpiId();
        this.includeReportee = subKpi.isIncludeReportee();
        this.customReportees = subKpi.getCustomReportees();
        this.startDate = subKpi.getStartDate();
        this.endDate = subKpi.getEndDate();
        this.orgId = subKpi.getOrgId();
        this.actType = subKpi.getActType();
        this.kpiId = subKpi.getKpiId();
        this.objectiveId = subKpi.getObjectiveId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subKpiValue = (Map)mapper.readValue(subKpi.getSubKpiValue(), HashMap.class);
            String string = this.subKpiName = Objects.nonNull(this.getSubKpiValue().get("subMeasureName")) ? this.getSubKpiValue().get("subMeasureName").toString() : "";
            if (this.subKpiValue.get("kpiFormula") != null && this.subKpiValue.get("kpiFormula").toString() != "") {
                this.kpiFormula = (KPIFormula)mapper.readValue(this.subKpiValue.get("kpiFormula").toString(), KPIFormula.class);
                this.subKpiValue.remove("kpiFormula");
            }
            new KPIUtil().updateKpiValue(this.getSubKpiValue());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public SubKPIDTO(SubKPI subKpi, boolean status) {
        this.id = subKpi.getId();
        this.createdTime = subKpi.getCreatedTime();
        this.updatedTime = subKpi.getUpdatedTime();
        this.active = subKpi.getActive();
        this.owner = subKpi.getOwner();
        this.createdBy = subKpi.getCreatedBy();
        this.updatedBy = subKpi.getUpdatedBy();
        this.subKpiId = subKpi.getSubKpiId();
        this.includeReportee = subKpi.isIncludeReportee();
        this.customReportees = subKpi.getCustomReportees();
        this.startDate = subKpi.getStartDate();
        this.endDate = subKpi.getEndDate();
        this.orgId = subKpi.getOrgId();
        this.actType = subKpi.getActType();
        this.kpiId = subKpi.getKpiId();
        this.objectiveId = subKpi.getObjectiveId();
        this.subKpiName = subKpi.getSubKpiName();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subKpiValue = (Map)mapper.readValue(subKpi.getSubKpiValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

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
}

