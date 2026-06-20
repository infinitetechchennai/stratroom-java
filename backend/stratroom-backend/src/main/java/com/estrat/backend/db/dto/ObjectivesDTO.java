/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.ObjectivesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.dto.KPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ObjectivesDTO {
    private long id;
    private String objectivesName;
    private int active = 0;
    private Map<String, Object> objectivesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long scoreCardId;
    private Long createdBy;
    private Long updatedBy;
    private List<KPIDTO> kpiList;
    private String objectiveId;
    private Date startDate;
    private Date endDate;

    public ObjectivesDTO() {
    }

    public ObjectivesDTO(Objectives objectives, boolean loadKpiFlag) {
        this.id = objectives.getId();
        this.scoreCardId = objectives.getScoreCardId().getId();
        this.active = objectives.getActive();
        this.createdTime = objectives.getCreatedTime();
        this.updatedTime = objectives.getUpdatedTime();
        this.createdBy = objectives.getCreatedBy();
        this.updatedBy = objectives.getUpdatedBy();
        this.objectiveId = objectives.getObjectiveId();
        if (loadKpiFlag) {
            this.kpiList = objectives.getKpiList() != null ? objectives.getKpiList().stream().map(kpi -> new KPIDTO(kpi)).collect(Collectors.toList()) : null;
        }
        this.owner = objectives.getOwner();
        this.startDate = objectives.getStartDate();
        this.endDate = objectives.getEndDate();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.objectivesValue = (Map)mapper.readValue(objectives.getObjectiveValue(), HashMap.class);
            this.objectivesName = Objects.nonNull(this.getObjectivesValue().get("name")) ? this.getObjectivesValue().get("name").toString() : "";
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
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
        if (this.objectivesValue == null) {
            this.objectivesValue = new HashMap();
        }
        return this.objectivesValue;
    }

    public void setObjectivesValue(Map<String, Object> objectivesValue) {
        this.objectivesValue = objectivesValue;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
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
}

