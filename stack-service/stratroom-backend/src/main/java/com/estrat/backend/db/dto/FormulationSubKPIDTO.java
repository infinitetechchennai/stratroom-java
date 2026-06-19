/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationSubKPI
 *  com.estrat.backend.db.dto.FormulationSubKPIDTO
 *  com.estrat.backend.db.dto.KPIFormula
 *  com.estrat.backend.db.resource.util.KPIUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.FormulationSubKPI;
import com.estrat.backend.db.dto.KPIFormula;
import com.estrat.backend.db.resource.util.KPIUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import com.estrat.backend.db.util.JsonUtil;

public class FormulationSubKPIDTO {
    private long id;
    private String subkpiName;
    private Long owner;
    private KPIFormula kpiFormula;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> subkpiValue;
    private long createdBy;
    private long updatedBy;
    private long kpiId;
    private long objectiveId;

    public FormulationSubKPIDTO() {
    }

    public FormulationSubKPIDTO(FormulationSubKPI subkpi) {
        this.id = subkpi.getId();
        this.createdTime = subkpi.getCreatedTime();
        this.updatedTime = subkpi.getUpdatedTime();
        this.createdBy = subkpi.getCreatedBy();
        this.updatedBy = subkpi.getUpdatedBy();
        this.objectiveId = subkpi.getObjectiveId();
        this.kpiId = subkpi.getKpiId().getId();
        this.owner = subkpi.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : subkpi.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subkpiValue = JsonUtil.parseMap(subkpi.getSubkpiValue());
            String string = this.subkpiName = Objects.nonNull(this.getSubkpiValue().get("name")) ? this.getSubkpiValue().get("name").toString() : "";
            if (this.subkpiValue.get("kpiFormula") != null) {
                this.kpiFormula = (KPIFormula)mapper.readValue(this.subkpiValue.get("kpiFormula").toString(), KPIFormula.class);
                this.subkpiValue.remove("kpiFormula");
            }
            new KPIUtil().updateKpiValue(this.getSubkpiValue());
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

    public String getSubkpiName() {
        return this.subkpiName;
    }

    public void setSubkpiName(String subkpiName) {
        this.subkpiName = subkpiName;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public KPIFormula getKpiFormula() {
        return this.kpiFormula;
    }

    public void setKpiFormula(KPIFormula kpiFormula) {
        this.kpiFormula = kpiFormula;
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

    public Map<String, Object> getSubkpiValue() {
        if (this.subkpiValue == null) {
            this.subkpiValue = new HashMap();
        }
        return this.subkpiValue;
    }

    public void setSubkpiValue(Map<String, Object> subkpiValue) {
        this.subkpiValue = subkpiValue;
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

