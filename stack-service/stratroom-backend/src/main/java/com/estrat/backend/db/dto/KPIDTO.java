/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.KPIFormula
 *  com.estrat.backend.db.dto.SubKPIDTO
 *  com.estrat.backend.db.resource.util.KPIUtil
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.dto.KPIFormula;
import com.estrat.backend.db.dto.SubKPIDTO;
import com.estrat.backend.db.resource.util.KPIUtil;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import com.estrat.backend.db.util.JsonUtil;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPIDTO {
    private long id;
    private long empId;
    private String kpiName;
    private KPIFormula kpiFormula;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> kpiValue;
    private long createdBy;
    private long updatedBy;
    private int active;
    private long owner;
    private long objectiveId;
    private String kpiId;
    public boolean includeReportee;
    public String customReportees;
    private Date startDate;
    private Date endDate;
    private long orgId;
    private int actType;
    private List<SubKPIDTO> subKpiList;

    public KPIDTO() {
    }

    public KPIDTO(KPI kpi) {
        this.id = kpi.getId();
        this.createdTime = kpi.getCreatedTime();
        this.updatedTime = kpi.getUpdatedTime();
        this.active = kpi.getActive();
        this.owner = kpi.getOwner();
        this.createdBy = kpi.getCreatedBy();
        this.updatedBy = kpi.getUpdatedBy();
        this.kpiId = kpi.getKpiId();
        this.includeReportee = kpi.isIncludeReportee();
        this.customReportees = kpi.getCustomReportees();
        this.objectiveId = kpi.getObjectiveId();
        this.startDate = kpi.getStartDate();
        this.endDate = kpi.getEndDate();
        this.orgId = kpi.getOrgId();
        this.actType = kpi.getActType();
        this.subKpiList = kpi.getSubKpiList() != null ? kpi.getSubKpiList().stream().map(dto -> new SubKPIDTO(dto)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.kpiValue = JsonUtil.parseMap(kpi.getKpiValue());
            String string = this.kpiName = Objects.nonNull(this.getKpiValue().get("name")) ? this.getKpiValue().get("name").toString() : "";
            if (this.kpiValue.get("kpiFormula") != null && this.kpiValue.get("kpiFormula").toString() != "") {
                this.kpiFormula = (KPIFormula)mapper.readValue(this.kpiValue.get("kpiFormula").toString(), KPIFormula.class);
            }
            new KPIUtil().updateKpiValue(this.getKpiValue());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public KPIDTO(KPI kpi, boolean status) {
        this.id = kpi.getId();
        this.createdTime = kpi.getCreatedTime();
        this.updatedTime = kpi.getUpdatedTime();
        this.active = kpi.getActive();
        this.owner = kpi.getOwner();
        this.createdBy = kpi.getCreatedBy();
        this.updatedBy = kpi.getUpdatedBy();
        this.kpiId = kpi.getKpiId();
        this.includeReportee = kpi.isIncludeReportee();
        this.customReportees = kpi.getCustomReportees();
        this.objectiveId = kpi.getObjectiveId();
        this.startDate = kpi.getStartDate();
        this.endDate = kpi.getEndDate();
        this.orgId = kpi.getOrgId();
        this.actType = kpi.getActType();
        this.subKpiList = kpi.getSubKpiList() != null ? kpi.getSubKpiList().stream().map(dto -> new SubKPIDTO(dto)).collect(Collectors.toList()) : null;
        this.kpiValue = JsonUtil.parseMap(kpi.getKpiValue());
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
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
        if (this.kpiValue == null) {
            this.kpiValue = new HashMap();
        }
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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public int getActType() {
        return this.actType;
    }

    public void setActType(int actType) {
        this.actType = actType;
    }

    public List<SubKPIDTO> getSubKpiList() {
        return this.subKpiList;
    }

    public void setSubKpiList(List<SubKPIDTO> subKpiList) {
        this.subKpiList = subKpiList;
    }
}

