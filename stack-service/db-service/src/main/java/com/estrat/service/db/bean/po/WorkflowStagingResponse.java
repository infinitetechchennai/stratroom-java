/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.bean.po.WorkflowStagingResponse
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;

public class WorkflowStagingResponse {
    private boolean workflowExists;
    private Long versionToUse;
    private String status;
    private StagingChange stagingChange;
    private ControlPanelWorkFlowDTO workflow;

    public boolean isWorkflowExists() {
        return this.workflowExists;
    }

    public Long getVersionToUse() {
        return this.versionToUse;
    }

    public String getStatus() {
        return this.status;
    }

    public StagingChange getStagingChange() {
        return this.stagingChange;
    }

    public ControlPanelWorkFlowDTO getWorkflow() {
        return this.workflow;
    }

    public void setWorkflowExists(boolean workflowExists) {
        this.workflowExists = workflowExists;
    }

    public void setVersionToUse(Long versionToUse) {
        this.versionToUse = versionToUse;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setStagingChange(StagingChange stagingChange) {
        this.stagingChange = stagingChange;
    }

    public void setWorkflow(ControlPanelWorkFlowDTO workflow) {
        this.workflow = workflow;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof WorkflowStagingResponse)) {
            return false;
        }
        WorkflowStagingResponse other = (WorkflowStagingResponse)o;
        if (!other.canEqual((Object)this)) {
            return false;
        }
        if (this.isWorkflowExists() != other.isWorkflowExists()) {
            return false;
        }
        Long this$versionToUse = this.getVersionToUse();
        Long other$versionToUse = other.getVersionToUse();
        if (this$versionToUse == null ? other$versionToUse != null : !((Object)this$versionToUse).equals(other$versionToUse)) {
            return false;
        }
        String this$status = this.getStatus();
        String other$status = other.getStatus();
        if (this$status == null ? other$status != null : !this$status.equals(other$status)) {
            return false;
        }
        StagingChange this$stagingChange = this.getStagingChange();
        StagingChange other$stagingChange = other.getStagingChange();
        if (this$stagingChange == null ? other$stagingChange != null : !this$stagingChange.equals(other$stagingChange)) {
            return false;
        }
        ControlPanelWorkFlowDTO this$workflow = this.getWorkflow();
        ControlPanelWorkFlowDTO other$workflow = other.getWorkflow();
        return !(this$workflow == null ? other$workflow != null : !this$workflow.equals(other$workflow));
    }

    protected boolean canEqual(Object other) {
        return other instanceof WorkflowStagingResponse;
    }

    public int hashCode() {
        int PRIME = 59;
        int result = 1;
        result = result * 59 + (this.isWorkflowExists() ? 79 : 97);
        Long $versionToUse = this.getVersionToUse();
        result = result * 59 + ($versionToUse == null ? 43 : ((Object)$versionToUse).hashCode());
        String $status = this.getStatus();
        result = result * 59 + ($status == null ? 43 : $status.hashCode());
        StagingChange $stagingChange = this.getStagingChange();
        result = result * 59 + ($stagingChange == null ? 43 : $stagingChange.hashCode());
        ControlPanelWorkFlowDTO $workflow = this.getWorkflow();
        result = result * 59 + ($workflow == null ? 43 : $workflow.hashCode());
        return result;
    }

    public String toString() {
        return "WorkflowStagingResponse(workflowExists=" + this.isWorkflowExists() + ", versionToUse=" + this.getVersionToUse() + ", status=" + this.getStatus() + ", stagingChange=" + this.getStagingChange() + ", workflow=" + this.getWorkflow() + ")";
    }

    public WorkflowStagingResponse(boolean workflowExists, Long versionToUse, String status, StagingChange stagingChange, ControlPanelWorkFlowDTO workflow) {
        this.workflowExists = workflowExists;
        this.versionToUse = versionToUse;
        this.status = status;
        this.stagingChange = stagingChange;
        this.workflow = workflow;
    }

    public WorkflowStagingResponse() {
    }
}

