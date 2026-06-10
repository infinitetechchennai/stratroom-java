/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelWorkFlowApproverMappingDTO
 */
package com.estrat.web.dto;

public class ControlPanelWorkFlowApproverMappingDTO {
    private long id;
    private String userName;
    private long workflowId;
    private long aprovalRoleId;
    private String status;
    private Integer approverOrder;

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

    public long getWorkflowId() {
        return this.workflowId;
    }

    public void setWorkflowId(long workflowId) {
        this.workflowId = workflowId;
    }

    public long getAprovalRoleId() {
        return this.aprovalRoleId;
    }

    public void setAprovalRoleId(long aprovalRoleId) {
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

