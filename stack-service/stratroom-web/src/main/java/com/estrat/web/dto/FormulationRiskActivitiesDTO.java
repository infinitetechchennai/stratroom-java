/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.FormulationSubRiskDTO;
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
    private int active;

    public FormulationSubRiskDTO getSubRiskDTO() {
        return this.subRiskDTO;
    }

    public void setSubRiskDTO(FormulationSubRiskDTO subRiskDTO) {
        this.subRiskDTO = subRiskDTO;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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
        if (this.activityValue == null) {
            this.activityValue = new HashMap();
        }
        return this.activityValue;
    }

    public void setActivityValue(Map<String, Object> activityValue) {
        this.activityValue = activityValue;
    }
}

