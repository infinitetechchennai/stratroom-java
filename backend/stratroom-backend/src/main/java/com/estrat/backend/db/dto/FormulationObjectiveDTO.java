/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationObjectives
 *  com.estrat.backend.db.dto.FormulationKPIDTO
 *  com.estrat.backend.db.dto.FormulationObjectiveDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.FormulationObjectives;
import com.estrat.backend.db.dto.FormulationKPIDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class FormulationObjectiveDTO {
    private long id;
    private String objectivesName;
    private Long owner;
    private Map<String, Object> objectivesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long scoreCardId;
    private Long createdBy;
    private Long updatedBy;
    private List<FormulationKPIDTO> kpiList;

    public FormulationObjectiveDTO() {
    }

    public FormulationObjectiveDTO(FormulationObjectives objectives, boolean loadKpiFlag) {
        this.id = objectives.getId();
        this.scoreCardId = objectives.getScoreCardId().getId();
        this.createdTime = objectives.getCreatedTime();
        this.updatedTime = objectives.getUpdatedTime();
        this.createdBy = objectives.getCreatedBy();
        this.updatedBy = objectives.getUpdatedBy();
        Long l = this.owner = objectives.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : objectives.getOwner();
        if (loadKpiFlag) {
            this.kpiList = objectives.getKpiList() != null ? objectives.getKpiList().stream().map(kpi -> new FormulationKPIDTO(kpi, true)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.objectivesValue = (Map)mapper.readValue(objectives.getObjectiveValue(), HashMap.class);
            this.objectivesName = Objects.nonNull(this.getObjectivesValue().get("name")) ? this.getObjectivesValue().get("name").toString() : "";
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

    public List<FormulationKPIDTO> getKpiList() {
        return this.kpiList;
    }

    public void setKpiList(List<FormulationKPIDTO> kpiList) {
        this.kpiList = kpiList;
    }
}

