/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationRiskActivities
 *  com.estrat.service.db.dto.FormulationRiskActivitiesDTO
 *  com.estrat.service.db.dto.FormulationSubRiskDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.FormulationRiskActivities;
import com.estrat.service.db.dto.FormulationSubRiskDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class FormulationRiskActivitiesDTO {
    private long id;
    private Map<String, Object> activityValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private long subRiskId;
    private FormulationSubRiskDTO subRiskDTO;

    public FormulationRiskActivitiesDTO() {
    }

    public FormulationRiskActivitiesDTO(FormulationRiskActivities formulationRiskActivities) {
        this.id = formulationRiskActivities.getId();
        this.createdTime = formulationRiskActivities.getCreatedTime();
        this.updatedTime = formulationRiskActivities.getUpdatedTime();
        this.createdBy = formulationRiskActivities.getCreatedBy();
        this.updatedBy = formulationRiskActivities.getUpdatedBy();
        this.subRiskId = formulationRiskActivities.getSubRiskId().getId();
        this.subRiskDTO = new FormulationSubRiskDTO(formulationRiskActivities.getSubRiskId(), true);
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activityValue = (Map)mapper.readValue(formulationRiskActivities.getActivityValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public FormulationSubRiskDTO getSubRiskDTO() {
        return this.subRiskDTO;
    }

    public void setSubRiskDTO(FormulationSubRiskDTO subRiskDTO) {
        this.subRiskDTO = subRiskDTO;
    }

    public long getSubRiskId() {
        return this.subRiskId;
    }

    public void setSubRiskId(long subRiskId) {
        this.subRiskId = subRiskId;
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

    public Map<String, Object> getActivityValue() {
        return this.activityValue;
    }

    public void setActivityValue(Map<String, Object> activityValue) {
        this.activityValue = activityValue;
    }
}

