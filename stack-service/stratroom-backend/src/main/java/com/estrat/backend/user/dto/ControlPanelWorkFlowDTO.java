/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.ControlPanelWorkFlowApproverMappingDTO
 *  com.estrat.backend.user.dto.ControlPanelWorkFlowDTO
 */
package com.estrat.backend.user.dto;

import com.estrat.backend.user.dto.ControlPanelWorkFlowApproverMappingDTO;
import java.time.LocalDateTime;
import java.util.List;

public class ControlPanelWorkFlowDTO {
    private long id;
    private String name;
    private String type;
    private long department;
    private String conditions;
    private long createdBy;
    private long updatedBy;
    private long owner;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String createrName;
    private String updaterName;
    private String description;
    private String approvedBy;
    private String departmentName;
    private List<ControlPanelWorkFlowApproverMappingDTO> approverList;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getDepartment() {
        return this.department;
    }

    public void setDepartment(long department) {
        this.department = department;
    }

    public String getConditions() {
        return this.conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
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

    public List<ControlPanelWorkFlowApproverMappingDTO> getApproverList() {
        return this.approverList;
    }

    public void setApproverList(List<ControlPanelWorkFlowApproverMappingDTO> approverList) {
        this.approverList = approverList;
    }

    public String getCreaterName() {
        return this.createrName;
    }

    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }

    public String getUpdaterName() {
        return this.updaterName;
    }

    public void setUpdaterName(String updaterName) {
        this.updaterName = updaterName;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getApprovedBy() {
        return this.approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
}

