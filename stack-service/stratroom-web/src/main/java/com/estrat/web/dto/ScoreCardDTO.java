/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ObjectivesDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ScoreCardDTO {
    private long id;
    private long createdBy;
    private String createDateString;
    private String scorecardName;
    private String perspectiveType;
    private String perspectiveId;
    private Long perspectiveIdSeq;
    private String updatedDateString;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> scoreCardValue;
    private int active = 0;
    private long owner;
    private List<ObjectivesDTO> objectiveList;
    @JsonIgnore
    private Map<String, ObjectivesDTO> objectivesMap;
    private long pageId;
    public boolean includeReportee;
    public String customReportees;
    private Date startDate;
    private Date endDate;
    private long scoreCardDetailsId;

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
        if (this.scoreCardValue == null) {
            this.scoreCardValue = new HashMap();
        }
        return this.scoreCardValue;
    }

    public void setScoreCardValue(Map<String, Object> scoreCardValue) {
        this.scoreCardValue = scoreCardValue;
    }

    public Map<String, ObjectivesDTO> getObjectivesMap() {
        if (this.objectivesMap == null) {
            this.objectivesMap = new HashMap();
        }
        return this.objectivesMap;
    }

    public void setObjectivesMap(Map<String, ObjectivesDTO> objectivesMap) {
        this.objectivesMap = objectivesMap;
    }

    public List<ObjectivesDTO> getObjectiveList() {
        if (this.objectiveList == null) {
            this.objectiveList = new ArrayList();
        }
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

    public long getScoreCardDetailsId() {
        return this.scoreCardDetailsId;
    }

    public void setScoreCardDetailsId(long scoreCardDetailsId) {
        this.scoreCardDetailsId = scoreCardDetailsId;
    }
}

