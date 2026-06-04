/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskCommentsDTO {
    private long id;
    private String fromPage;
    private long riskId;
    private Map<String, Object> riskCommentsValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private String createDateString;
    private String updatedDateString;
    private Long version;
    private Long likeCount;
    private Long empId;
    public List<Long> likeEmpIds;
    private String type;
    private Long commentsParendId;
    private int commentType;
    private List<RiskCommentsDTO> replyComments;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public Map<String, Object> getRiskCommentsValue() {
        if (this.riskCommentsValue == null) {
            this.riskCommentsValue = new HashMap();
        }
        return this.riskCommentsValue;
    }

    public void setRiskCommentsValue(Map<String, Object> riskCommentsValue) {
        this.riskCommentsValue = riskCommentsValue;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public String getFromPage() {
        return this.fromPage;
    }

    public void setFromPage(String fromPage) {
        this.fromPage = fromPage;
    }

    public Long getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Long getEmpId() {
        return this.empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public List<Long> getLikeEmpIds() {
        return this.likeEmpIds;
    }

    public void setLikeEmpIds(List<Long> likeEmpIds) {
        this.likeEmpIds = likeEmpIds;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCommentsParendId() {
        return this.commentsParendId;
    }

    public void setCommentsParendId(Long commentsParendId) {
        this.commentsParendId = commentsParendId;
    }

    public int getCommentType() {
        return this.commentType;
    }

    public void setCommentType(int commentType) {
        this.commentType = commentType;
    }

    public List<RiskCommentsDTO> getReplyComments() {
        return this.replyComments;
    }

    public void setReplyComments(List<RiskCommentsDTO> replyComments) {
        this.replyComments = replyComments;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

