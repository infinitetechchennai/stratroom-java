/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ScoreCardDetails
 *  com.estrat.backend.db.dto.ScoreCardDTO
 *  com.estrat.backend.db.dto.ScoreCardDetailsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ScoreCardDetails;
import com.estrat.backend.db.dto.ScoreCardDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ScoreCardDetailsDTO {
    private long id;
    private int active = 0;
    private long owner;
    private Map<String, Object> scoreCardDetailsValue;
    private Long pageId;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String scorecardName;
    private Date startDate;
    private Date endDate;
    private List<ScoreCardDTO> scoreCardDTOS;
    private Long departmentId;
    private String departmentName;

    public ScoreCardDetailsDTO() {
    }

    public ScoreCardDetailsDTO(ScoreCardDetails scoreCardDetails) {
        this.id = scoreCardDetails.getId();
        this.active = scoreCardDetails.getActive();
        this.owner = scoreCardDetails.getOwner();
        this.pageId = scoreCardDetails.getPageId().getId();
        this.createdBy = scoreCardDetails.getCreatedBy();
        this.updatedBy = scoreCardDetails.getUpdatedBy();
        this.createdTime = scoreCardDetails.getCreatedTime();
        this.updatedTime = scoreCardDetails.getUpdatedTime();
        this.scorecardName = scoreCardDetails.getScorecardName();
        if (scoreCardDetails.getDepartmentId() != null) {
            this.departmentId = scoreCardDetails.getDepartmentId();
        }
        if (scoreCardDetails.getScorecardName() == null) {
            this.scorecardName = scoreCardDetails.getPageId().getPageName();
        }
        this.startDate = scoreCardDetails.getStartDate();
        this.endDate = scoreCardDetails.getEndDate();
        this.scoreCardDTOS = scoreCardDetails.getScoreCardList() != null ? scoreCardDetails.getScoreCardList().stream().map(obj -> new ScoreCardDTO(obj, true)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardDetailsValue = (Map)mapper.readValue(scoreCardDetails.getScoreCardDetailsValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ScoreCardDetailsDTO(ScoreCardDetails scoreCardDetails, boolean flag) {
        this.id = scoreCardDetails.getId();
        this.active = scoreCardDetails.getActive();
        this.owner = scoreCardDetails.getOwner();
        this.pageId = scoreCardDetails.getPageId().getId();
        this.createdBy = scoreCardDetails.getCreatedBy();
        this.updatedBy = scoreCardDetails.getUpdatedBy();
        this.createdTime = scoreCardDetails.getCreatedTime();
        this.updatedTime = scoreCardDetails.getUpdatedTime();
        this.scorecardName = scoreCardDetails.getScorecardName();
        if (scoreCardDetails.getScorecardName() == null) {
            this.scorecardName = scoreCardDetails.getPageId().getPageName();
        }
        if (scoreCardDetails.getDepartmentId() != null) {
            this.departmentId = scoreCardDetails.getDepartmentId();
        }
        this.startDate = scoreCardDetails.getStartDate();
        this.endDate = scoreCardDetails.getEndDate();
        if (flag) {
            this.scoreCardDTOS = scoreCardDetails.getScoreCardList() != null ? scoreCardDetails.getScoreCardList().stream().map(obj -> new ScoreCardDTO(obj, true)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardDetailsValue = (Map)mapper.readValue(scoreCardDetails.getScoreCardDetailsValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
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

    public Map<String, Object> getScoreCardDetailsValue() {
        return this.scoreCardDetailsValue;
    }

    public void setScoreCardDetailsValue(Map<String, Object> scoreCardDetailsValue) {
        this.scoreCardDetailsValue = scoreCardDetailsValue;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
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

    public String getScorecardName() {
        return this.scorecardName;
    }

    public void setScorecardName(String scorecardName) {
        this.scorecardName = scorecardName;
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

    public List<ScoreCardDTO> getScoreCardDTOS() {
        return this.scoreCardDTOS;
    }

    public void setScoreCardDTOS(List<ScoreCardDTO> scoreCardDTOS) {
        this.scoreCardDTOS = scoreCardDTOS;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}

