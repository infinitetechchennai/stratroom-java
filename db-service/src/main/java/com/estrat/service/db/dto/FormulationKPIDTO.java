/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationKPI
 *  com.estrat.service.db.dto.FormulationKPIDTO
 *  com.estrat.service.db.dto.FormulationSubKPIDTO
 *  com.estrat.service.db.dto.KPIFormula
 *  com.estrat.service.db.resource.util.KPIUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.FormulationKPI;
import com.estrat.service.db.dto.FormulationSubKPIDTO;
import com.estrat.service.db.dto.KPIFormula;
import com.estrat.service.db.resource.util.KPIUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class FormulationKPIDTO {
    private long id;
    private String kpiName;
    private Long owner;
    private KPIFormula kpiFormula;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> kpiValue;
    private List<FormulationSubKPIDTO> subKpiList;
    private long createdBy;
    private long updatedBy;
    private long objectiveId;

    public FormulationKPIDTO() {
    }

    public FormulationKPIDTO(FormulationKPI kpi, boolean loadsubKpiFlag) {
        this.id = kpi.getId();
        this.createdTime = kpi.getCreatedTime();
        this.updatedTime = kpi.getUpdatedTime();
        this.createdBy = kpi.getCreatedBy();
        this.updatedBy = kpi.getUpdatedBy();
        this.objectiveId = kpi.getObjectiveId().getId();
        this.owner = kpi.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : kpi.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        if (loadsubKpiFlag) {
            this.subKpiList = kpi.getSubkpiList() != null ? kpi.getSubkpiList().stream().map(newkpi -> new FormulationSubKPIDTO(newkpi)).collect(Collectors.toList()) : null;
        }
        try {
            this.kpiValue = (Map)mapper.readValue(kpi.getKpiValue(), HashMap.class);
            String string = this.kpiName = Objects.nonNull(this.getKpiValue().get("name")) ? this.getKpiValue().get("name").toString() : "";
            if (this.kpiValue.get("kpiFormula") != null) {
                this.kpiFormula = (KPIFormula)mapper.readValue(this.kpiValue.get("kpiFormula").toString(), KPIFormula.class);
                this.kpiValue.remove("kpiFormula");
            }
            new KPIUtil().updateKpiValue(this.getKpiValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

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

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public List<FormulationSubKPIDTO> getSubKpiList() {
        return this.subKpiList;
    }

    public void setSubKpiList(List<FormulationSubKPIDTO> subKpiList) {
        this.subKpiList = subKpiList;
    }
}

