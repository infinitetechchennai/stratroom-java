/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.dto.DeptDetails
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.DepartmentDetails;

public class DeptDetails {
    private long id;
    private String name;
    private String status;
    private Long orgId;
    private String deptID;

    public DeptDetails() {
    }

    public DeptDetails(DepartmentDetails departmentDetails) {
        this.id = departmentDetails.getId();
        this.name = departmentDetails.getName();
        this.status = departmentDetails.getStatus();
        this.deptID = departmentDetails.getDeptUniqueID();
        if (departmentDetails.getOrgId() != null) {
            this.orgId = departmentDetails.getOrgId();
        }
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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public String getDeptID() {
        return this.deptID;
    }

    public void setDeptID(String deptID) {
        this.deptID = deptID;
    }

    public String toString() {
        return "DeptDetails [id=" + this.id + ", name=" + this.name + ", status=" + this.status + ", orgId=" + this.orgId + ", deptID=" + this.deptID + "]";
    }
}

