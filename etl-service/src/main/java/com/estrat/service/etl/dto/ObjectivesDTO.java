/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.KPIDTO
 *  com.estrat.service.etl.dto.ObjectivesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.service.etl.dto;

import com.estrat.service.etl.dto.KPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ObjectivesDTO {
    private long id;
    private long createdBy;
    private String objectivesName;
    private long updatedBy;
    private int active = 0;
    private Map<String, Object> objectivesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long scoreCardId;
    private List<KPIDTO> kpiList;
    private String objectiveId;

    public String getObjectivesName() {
        return this.objectivesName;
    }

    public void setObjectivesName(String objectivesName) {
        this.objectivesName = objectivesName;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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
        return this.objectivesValue;
    }

    public void setObjectivesValue(Map<String, Object> objectivesValue) {
        this.objectivesValue = objectivesValue;
    }

    public List<KPIDTO> getKpiList() {
        return this.kpiList;
    }

    public void setKpiList(List<KPIDTO> kpiList) {
        this.kpiList = kpiList;
    }

    public String getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(String objectiveId) {
        this.objectiveId = objectiveId;
    }
}

