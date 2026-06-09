/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.DeptDetails
 */
package com.estrat.scorecard.dto;

import java.util.Date;

public class DeptDetails {
    private long id;
    private String name;
    private long orgId;
    private String description;
    private Date createdTime;
    private Date touch;
    private String status;
    private String deptID;
    private int isActive = 0;

    public int getIsActive() {
        return this.isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getTouch() {
        return this.touch;
    }

    public void setTouch(Date touch) {
        this.touch = touch;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String toString() {
        return "DeptDetails [id=" + this.id + ", name=" + this.name + ", orgId=" + this.orgId + ", description=" + this.description + ", createdTime=" + this.createdTime + ", touch=" + this.touch + "]";
    }
}

