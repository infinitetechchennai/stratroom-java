/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ApproversHistory
 *  com.estrat.service.db.dto.ApproversHistoryDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.ApproversHistory;
import java.time.LocalDateTime;

public class ApproversHistoryDTO {
    private long entityId;
    private Long workflowId;
    private long approverId;
    private String approverName;
    private String actionTaken;
    private long actionBy;
    private long changeId;
    private LocalDateTime actionDate;
    private String comments;
    private long version;

    public ApproversHistoryDTO() {
    }

    public ApproversHistoryDTO(ApproversHistory approversHistory) {
        this.entityId = approversHistory.getEntityId();
        this.workflowId = approversHistory.getWorkflow().getId();
        this.approverId = approversHistory.getApproverId().getId();
        this.actionTaken = approversHistory.getActionTaken();
        this.actionBy = approversHistory.getActionBy();
        this.actionDate = approversHistory.getActionDate();
        this.comments = approversHistory.getComments();
        this.approverName = approversHistory.getApproverId().getUserName();
        this.changeId = approversHistory.getChangeId();
        this.version = approversHistory.getVersion();
    }

    public long getEntityId() {
        return this.entityId;
    }

    public void setEntityId(long entityId) {
        this.entityId = entityId;
    }

    public Long getWorkflowId() {
        return this.workflowId;
    }

    public void setWorkflowId(Long workflowId) {
        this.workflowId = workflowId;
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

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}

