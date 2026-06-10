/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationScoreCard
 *  com.estrat.backend.db.dto.FormulationObjectiveDTO
 *  com.estrat.backend.db.dto.FormulationScoreCardDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.FormulationScoreCard;
import com.estrat.backend.db.dto.FormulationObjectiveDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public FormulationScoreCardDTO() {
    }

    public FormulationScoreCardDTO(FormulationScoreCard scoreCard, boolean loadObjectives) {
        this.id = scoreCard.getId();
        this.scorecardName = scoreCard.getScorecardName();
        this.createdTime = scoreCard.getCreatedTime();
        if (loadObjectives) {
            this.objectiveList = scoreCard.getObjectiveList() != null ? scoreCard.getObjectiveList().stream().map(obj -> new FormulationObjectiveDTO(obj, true)).collect(Collectors.toList()) : null;
        }
        this.owner = scoreCard.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : scoreCard.getOwner();
        this.updatedTime = scoreCard.getUpdatedTime();
        this.createdBy = scoreCard.getCreatedBy();
        this.updatedBy = scoreCard.getUpdatedBy();
        if (scoreCard.getFormulationId() != null) {
            this.formulationId = scoreCard.getFormulationId().getId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardValue = (Map)mapper.readValue(scoreCard.getScoreCardValue(), HashMap.class);
            this.perspectiveType = Objects.nonNull(this.getScoreCardValue().get("perspectiveType")) ? this.getScoreCardValue().get("perspectiveType").toString() : "";
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

