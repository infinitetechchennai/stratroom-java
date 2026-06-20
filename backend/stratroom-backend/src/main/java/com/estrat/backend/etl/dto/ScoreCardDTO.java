/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.ObjectivesDTO
 *  com.estrat.backend.etl.dto.ScoreCardDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.etl.dto;

import com.estrat.backend.etl.dto.ObjectivesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ScoreCardDTO {
    private long id;
    private long createdBy;
    private String scorecardName;
    private String perspectiveType;
    private String perspectiveId;
    private Long perspectiveIdSeq;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> scoreCardValue;
    private int active = 0;
    private long owner;
    private List<ObjectivesDTO> objectiveList;
    private long pageId;
    public boolean includeReportee;
    public String customReportees;

    public String getPerspectiveId() {
        return this.perspectiveId;
    }

    public void setPerspectiveId(String perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Long getPerspectiveIdSeq() {
        return this.perspectiveIdSeq;
    }

    public void setPerspectiveIdSeq(Long perspectiveIdSeq) {
        this.perspectiveIdSeq = perspectiveIdSeq;
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

    public Map<String, Object> getScoreCardValue() {
        return this.scoreCardValue;
    }

    public void setScoreCardValue(Map<String, Object> scoreCardValue) {
        this.scoreCardValue = scoreCardValue;
    }

    public List<ObjectivesDTO> getObjectiveList() {
        return this.objectiveList;
    }

    public void setObjectiveList(List<ObjectivesDTO> objectiveList) {
        this.objectiveList = objectiveList;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public boolean isIncludeReportee() {
        return this.includeReportee;
    }

    public void setIncludeReportee(boolean includeReportee) {
        this.includeReportee = includeReportee;
    }

    public String getCustomReportees() {
        return this.customReportees;
    }

    public void setCustomReportees(String customReportees) {
        this.customReportees = customReportees;
    }
}

