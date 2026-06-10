/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.KPIDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ObjectivesDTO {
    private long id;
    private String createDateString;
    private String updatedDateString;
    private int active = 0;
    private Map<String, Object> objectivesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long scoreCardId;
    private long createdBy;
    private long updatedBy;
    private String objectivesName;
    private List<KPIDTO> kpiList;
    @JsonIgnore
    private Map<String, KPIDTO> kpiMap;
    private String objectiveId;
    private Date startDate;
    private Date endDate;

    public String getCreateDateString() {
        return this.createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public String getUpdatedDateString() {
        return this.updatedDateString;
    }

    public void setUpdatedDateString(String updatedDateString) {
        this.updatedDateString = updatedDateString;
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

    public String getObjectivesName() {
        return this.objectivesName;
    }

    public void setObjectivesName(String objectivesName) {
        this.objectivesName = objectivesName;
    }

    public Map<String, KPIDTO> getKpiMap() {
        if (this.kpiMap == null) {
            this.kpiMap = new HashMap();
        }
        return this.kpiMap;
    }

    public void setKpiMap(Map<String, KPIDTO> kpiMap) {
        this.kpiMap = kpiMap;
    }

    public List<KPIDTO> getKpiList() {
        if (this.kpiList == null) {
            this.kpiList = new ArrayList();
        }
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

