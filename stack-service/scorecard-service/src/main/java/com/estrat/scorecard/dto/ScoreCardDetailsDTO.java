/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.ScoreCardDetailsDTO
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.ScoreCardDTO;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

    public String toString() {
        return "ScoreCardDetailsDTO [id=" + this.id + ", active=" + this.active + ", owner=" + this.owner + ", scoreCardDetailsValue=" + this.scoreCardDetailsValue + ", pageId=" + this.pageId + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", scorecardName=" + this.scorecardName + ", startDate=" + this.startDate + ", endDate=" + this.endDate + ", scoreCardDTOS=" + this.scoreCardDTOS + ", departmentId=" + this.departmentId + ", departmentName=" + this.departmentName + "]";
    }
}

