/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.FormulationKPIDTO
 *  com.estrat.web.dto.FormulationObjectiveDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.FormulationKPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class FormulationObjectiveDTO {
    private long id;
    private String objectivesName;
    private Long owner;
    private Map<String, Object> objectivesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long scoreCardId;
    private long createdBy;
    private long updatedBy;
    private List<FormulationKPIDTO> kpiList;

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getObjectivesName() {
        return this.objectivesName;
    }

    public void setObjectivesName(String objectivesName) {
        this.objectivesName = objectivesName;
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

    public long getScoreCardId() {
        return this.scoreCardId;
    }

    public void setScoreCardId(long scoreCardId) {
        this.scoreCardId = scoreCardId;
    }

    public Map<String, Object> getObjectivesValue() {
        if (this.objectivesValue == null) {
            this.objectivesValue = new HashMap();
        }
        return this.objectivesValue;
    }

    public void setObjectivesValue(Map<String, Object> objectivesValue) {
        this.objectivesValue = objectivesValue;
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

    public List<FormulationKPIDTO> getKpiList() {
        return this.kpiList;
    }

    public void setKpiList(List<FormulationKPIDTO> kpiList) {
        this.kpiList = kpiList;
    }
}

