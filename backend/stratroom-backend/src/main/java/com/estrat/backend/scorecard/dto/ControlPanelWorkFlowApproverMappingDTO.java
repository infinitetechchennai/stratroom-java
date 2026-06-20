/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ControlPanelWorkFlowApproverMappingDTO
 */
package com.estrat.backend.scorecard.dto;

public class ControlPanelWorkFlowApproverMappingDTO {
    private long id;
    private String userName;
    private long workflowId;

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
}

