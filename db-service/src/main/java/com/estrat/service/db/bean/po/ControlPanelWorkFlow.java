/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="control_panel_workflow", schema="orgstructure")
public class ControlPanelWorkFlow {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name="workflow_name")
    private String name;
    @Column(name="type")
    private String type;
    @Column(name="department")
    private long department;
    @Column(name="conditions")
    private String conditions;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="owner")
    private long owner;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="creatername")
    private String createrName;
    @Column(name="updatername")
    private String updaterName;
    @Column(name="description")
    private String description;
    @Column(name="approved_by")
    private String approvedBy;
    @OneToMany(mappedBy="workflow", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<ControlPanelWorkFlowApproverMapping> approverList;

    public ControlPanelWorkFlow() {
    }

    public ControlPanelWorkFlow(ControlPanelWorkFlowDTO controlPanelWorkFlowDTO) {
        this.id = controlPanelWorkFlowDTO.getId();
        this.name = controlPanelWorkFlowDTO.getName();
        this.type = controlPanelWorkFlowDTO.getType();
        this.department = controlPanelWorkFlowDTO.getDepartment();
        this.conditions = controlPanelWorkFlowDTO.getConditions();
        this.createdBy = controlPanelWorkFlowDTO.getCreatedBy();
        this.updatedBy = controlPanelWorkFlowDTO.getUpdatedBy();
        this.owner = controlPanelWorkFlowDTO.getOwner();
        this.createdTime = controlPanelWorkFlowDTO.getCreatedTime();
        this.updatedTime = controlPanelWorkFlowDTO.getUpdatedTime();
        this.createrName = controlPanelWorkFlowDTO.getCreaterName();
        this.updaterName = controlPanelWorkFlowDTO.getUpdaterName();
        this.description = controlPanelWorkFlowDTO.getDescription();
        this.approvedBy = controlPanelWorkFlowDTO.getApprovedBy();
    }

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

    public List<ControlPanelWorkFlowApproverMapping> getApproverList() {
        return this.approverList;
    }

    public void setApproverList(List<ControlPanelWorkFlowApproverMapping> approverList) {
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

    public String getApprovedBy() {
        return this.approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
}

