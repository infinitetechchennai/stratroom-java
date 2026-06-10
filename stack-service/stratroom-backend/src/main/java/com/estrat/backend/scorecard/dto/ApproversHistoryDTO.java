/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ApproversHistoryDTO
 */
package com.estrat.backend.scorecard.dto;

import java.time.LocalDateTime;

public class ApproversHistoryDTO {
    private long entityId;
    private long workFlow_Id;
    private long approverId;
    private String approverName;
    private String actionTaken;
    private long actionBy;
    private LocalDateTime actionDate;
    private String comments;
    private long version;

    public long getEntityId() {
        return this.entityId;
    }

    public void setEntityId(long entityId) {
        this.entityId = entityId;
    }

    public long getWorkFlow_Id() {
        return this.workFlow_Id;
    }

    public void setWorkFlow_Id(long workFlow_Id) {
        this.workFlow_Id = workFlow_Id;
    }

    public long getApproverId() {
        return this.approverId;
    }

    public void setApproverId(long approverId) {
        this.approverId = approverId;
    }

    public String getActionTaken() {
        return this.actionTaken;
    }

    public void setActionTaken(String actionTaken) {
        this.actionTaken = actionTaken;
    }

    public long getActionBy() {
        return this.actionBy;
    }

    public void setActionBy(long actionBy) {
        this.actionBy = actionBy;
    }

    public LocalDateTime getActionDate() {
        return this.actionDate;
    }

    public void setActionDate(LocalDateTime actionDate) {
        this.actionDate = actionDate;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getApproverName() {
        return this.approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}

