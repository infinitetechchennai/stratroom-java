/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.CommentsDTO
 */
package com.estrat.backend.scorecard.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class CommentsDTO {
    private long id;
    private int active = 0;
    private Map<String, Object> commentsValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long initiativeId;
    private long createdBy;
    private long updatedBy;
    private long kpiId;
    private String fromPage;
    private Long likeCount;
    private Long empId;
    public List<Long> likeEmpIds;
    private String type;
    private Long commentsParendId;
    private int commentType;
    private List<CommentsDTO> replyComments;

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

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Map<String, Object> getCommentsValue() {
        return this.commentsValue;
    }

    public void setCommentsValue(Map<String, Object> commentsValue) {
        this.commentsValue = commentsValue;
    }

    public String getFromPage() {
        return this.fromPage;
    }

    public void setFromPage(String fromPage) {
        this.fromPage = fromPage;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
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

    public List<CommentsDTO> getReplyComments() {
        return this.replyComments;
    }

    public void setReplyComments(List<CommentsDTO> replyComments) {
        this.replyComments = replyComments;
    }
}

