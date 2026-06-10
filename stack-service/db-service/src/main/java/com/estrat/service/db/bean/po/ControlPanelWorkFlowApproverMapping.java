/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="controlpanel_workflow_approversmapping", schema="orgstructure")
public class ControlPanelWorkFlowApproverMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="aprovername")
    private String userName;
    @ManyToOne
    @JoinColumn(name="workflow_id", nullable=false)
    private ControlPanelWorkFlow workflow;
    @Column(name="approver_order")
    private Integer approverOrder;
    @Column(name="aproval_role_id")
    private Long aprovalRoleId;
    @Column(name="status")
    private String status;

    public ControlPanelWorkFlowApproverMapping() {
    }

    public ControlPanelWorkFlowApproverMapping(ControlPanelWorkFlowApproverMappingDTO workFlowUsersMappingDTO) {
        this.id = workFlowUsersMappingDTO.getId();
        this.userName = workFlowUsersMappingDTO.getUserName();
        this.workflow = new ControlPanelWorkFlow();
        this.workflow.setId(workFlowUsersMappingDTO.getWorkflowId());
        this.aprovalRoleId = workFlowUsersMappingDTO.getAprovalRoleId();
        this.status = workFlowUsersMappingDTO.getStatus();
        this.approverOrder = workFlowUsersMappingDTO.getApproverOrder();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public ControlPanelWorkFlow getWorkflow() {
        return this.workflow;
    }

    public void setWorkflow(ControlPanelWorkFlow workflow) {
        this.workflow = workflow;
    }

    public Long getAprovalRoleId() {
        return this.aprovalRoleId;
    }

    public void setAprovalRoleId(Long aprovalRoleId) {
        this.aprovalRoleId = aprovalRoleId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getApproverOrder() {
        return this.approverOrder;
    }

    public void setApproverOrder(Integer approverOrder) {
        this.approverOrder = approverOrder;
    }
}

