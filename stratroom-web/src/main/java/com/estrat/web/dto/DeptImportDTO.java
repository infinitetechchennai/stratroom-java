/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DeptImportDTO
 */
package com.estrat.web.dto;

public class DeptImportDTO {
    public long parentId;
    public String deptName;
    public String parentDeptName;
    public String orgName;
    public String ownerName;
    public String emailAddress;
    public String member;
    public String password;
    public String deptID;
    public String parentDeptID;

    public long getParentId() {
        return this.parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getParentDeptName() {
        return this.parentDeptName;
    }

    public void setParentDeptName(String parentDeptName) {
        this.parentDeptName = parentDeptName;
    }

    public String getOrgName() {
        return this.orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getMember() {
        return this.member;
    }

    public void setMember(String member) {
        this.member = member;
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDeptID() {
        return this.deptID;
    }

    public void setDeptID(String deptID) {
        this.deptID = deptID;
    }

    public String getParentDeptID() {
        return this.parentDeptID;
    }

    public void setParentDeptID(String parentDeptID) {
        this.parentDeptID = parentDeptID;
    }
}

