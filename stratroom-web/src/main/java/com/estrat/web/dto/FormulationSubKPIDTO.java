/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.FormulationSubKPIDTO
 *  com.estrat.web.dto.KPIFormula
 */
package com.estrat.web.dto;

import com.estrat.web.dto.KPIFormula;
import java.time.LocalDateTime;
import java.util.Map;

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

