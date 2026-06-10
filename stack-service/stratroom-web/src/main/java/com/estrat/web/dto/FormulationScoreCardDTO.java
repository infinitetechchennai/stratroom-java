/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.FormulationObjectiveDTO
 *  com.estrat.web.dto.FormulationScoreCardDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.FormulationObjectiveDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class FormulationScoreCardDTO {
    private long id;
    private String scorecardName;
    private String perspectiveType;
    private Long owner;
    private LocalDateTime createdTime;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime updatedTime;
    private Map<String, Object> scoreCardValue;
    private List<FormulationObjectiveDTO> objectiveList;
    private long formulationId;

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getPerspectiveType() {
        return this.perspectiveType;
    }

    public void setPerspectiveType(String perspectiveType) {
        this.perspectiveType = perspectiveType;
    }

    public String getScorecardName() {
        return this.scorecardName;
    }

    public void setScorecardName(String scorecardName) {
        this.scorecardName = scorecardName;
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

    public Map<String, Object> getScoreCardValue() {
        if (this.scoreCardValue == null) {
            this.scoreCardValue = new HashMap();
        }
        return this.scoreCardValue;
    }

    public void setScoreCardValue(Map<String, Object> scoreCardValue) {
        this.scoreCardValue = scoreCardValue;
    }

    public List<FormulationObjectiveDTO> getObjectiveList() {
        return this.objectiveList;
    }

    public void setObjectiveList(List<FormulationObjectiveDTO> objectiveList) {
        this.objectiveList = objectiveList;
    }

    public long getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(long formulationId) {
        this.formulationId = formulationId;
    }
}

