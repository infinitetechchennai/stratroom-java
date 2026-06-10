/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ApproversHistory
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.backend.db.dto.ApproversHistoryDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ControlPanelWorkFlow;
import com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.backend.db.dto.ApproversHistoryDTO;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="control_panel_workflow_history", schema="orgstructure")
public class ApproversHistory {
    @Id
    @Column(name="entity_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long entityId;
    @ManyToOne
    @JoinColumn(name="workflow_id", nullable=false)
    private ControlPanelWorkFlow workflow;
    @ManyToOne
    @JoinColumn(name="approverid", nullable=false)
    private ControlPanelWorkFlowApproverMapping approver;
    @Column(name="action_taken")
    private String actionTaken;
    @Column(name="action_by")
    private long actionBy;
    @Column(name="change_id")
    private long changeId;
    @Column(name="action_date")
    private LocalDateTime actionDate;
    @Column(name="comments")
    private String comments;
    @Column(name="version")
    private long version;

    public ApproversHistory() {
    }

    public ApproversHistory(ApproversHistoryDTO approversHistoryDTO) {
        this.entityId = approversHistoryDTO.getEntityId();
        if (approversHistoryDTO.getApproverId() != 0L) {
            ControlPanelWorkFlowApproverMapping approversDetails = new ControlPanelWorkFlowApproverMapping();
            approversDetails.setId(approversHistoryDTO.getApproverId());
            this.approver = approversDetails;
        }
        if (approversHistoryDTO.getWorkflowId() != 0L) {
            ControlPanelWorkFlow workflowDetails = new ControlPanelWorkFlow();
            workflowDetails.setId(approversHistoryDTO.getWorkflowId().longValue());
            this.workflow = workflowDetails;
        }
        this.actionTaken = approversHistoryDTO.getActionTaken();
        this.actionBy = approversHistoryDTO.getActionBy();
        this.actionDate = approversHistoryDTO.getActionDate();
        this.comments = approversHistoryDTO.getComments();
        this.changeId = approversHistoryDTO.getChangeId();
        this.version = approversHistoryDTO.getVersion();
    }

    public long getEntityId() {
        return this.entityId;
    }

    public void setEntityId(long entityId) {
        this.entityId = entityId;
    }

    public ControlPanelWorkFlow getWorkflow() {
        return this.workflow;
    }

    public void setWorkFlow_Id(ControlPanelWorkFlow workflow) {
        this.workflow = workflow;
    }

    public ControlPanelWorkFlowApproverMapping getApproverId() {
        return this.approver;
    }

    public void setApprover(ControlPanelWorkFlowApproverMapping approver) {
        this.approver = approver;
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

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public ControlPanelWorkFlowApproverMapping getApprover() {
        return this.approver;
    }

    public void setWorkflow(ControlPanelWorkFlow workflow) {
        this.workflow = workflow;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}

