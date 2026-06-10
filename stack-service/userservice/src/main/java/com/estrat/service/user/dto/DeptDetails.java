/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.DeptDetails
 */
package com.estrat.service.user.dto;

public class DeptDetails {
    private long id;
    private String name;
    private String status;
    private long orgId;
    private String deptID;

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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getDeptID() {
        return this.deptID;
    }

    public void setDeptID(String deptID) {
        this.deptID = deptID;
    }
}

