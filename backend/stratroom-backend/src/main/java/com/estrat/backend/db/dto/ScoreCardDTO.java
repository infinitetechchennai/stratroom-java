/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.dto.ObjectivesDTO
 *  com.estrat.backend.db.dto.ScoreCardDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ScoreCard;
import com.estrat.backend.db.dto.ObjectivesDTO;
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
public class ScoreCardDTO {
    private long id;
    private String scorecardName;
    private String perspectiveType;
    private LocalDateTime createdTime;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime updatedTime;
    private Map<String, Object> scoreCardValue;
    private int active = 0;
    private long owner;
    private List<ObjectivesDTO> objectiveList;
    private long pageId;
    public boolean includeReportee;
    public String customReportees;
    private String perspectiveId;
    private Long perspectiveIdSeq;
    private Date startDate;
    private Date endDate;
    private long scoreCardDetailsId;

    public ScoreCardDTO() {
    }

    public ScoreCardDTO(ScoreCard scoreCard, boolean loadObjectives) {
        this.id = scoreCard.getId();
        this.scorecardName = scoreCard.getScorecardName();
        this.createdTime = scoreCard.getCreatedTime();
        this.active = scoreCard.getActive();
        if (loadObjectives) {
            this.objectiveList = scoreCard.getObjectiveList() != null ? scoreCard.getObjectiveList().stream().map(obj -> new ObjectivesDTO(obj, true)).collect(Collectors.toList()) : null;
        }
        this.owner = scoreCard.getOwner();
        this.updatedTime = scoreCard.getUpdatedTime();
        this.createdBy = scoreCard.getCreatedBy();
        this.updatedBy = scoreCard.getUpdatedBy();
        if (scoreCard.getPageId() != null) {
            this.pageId = scoreCard.getPageId().getId();
            this.scorecardName = scoreCard.getPageId().getPageName();
        }
        this.includeReportee = scoreCard.isIncludeReportee();
        this.customReportees = scoreCard.getCustomReportees();
        this.perspectiveId = scoreCard.getPerspectiveId();
        this.perspectiveIdSeq = scoreCard.getPerspectiveIdSeq();
        this.startDate = scoreCard.getStartDate();
        this.endDate = scoreCard.getEndDate();
        if (scoreCard.getScoreCardDetailsId() != null) {
            this.scoreCardDetailsId = scoreCard.getScoreCardDetailsId().getId();
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

    public Map<String, Object> getScoreCardValue() {
        if (this.scoreCardValue == null) {
            this.scoreCardValue = new HashMap();
        }
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

