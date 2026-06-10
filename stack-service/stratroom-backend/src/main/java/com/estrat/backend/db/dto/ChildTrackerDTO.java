/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChildTracker
 *  com.estrat.backend.db.dto.ChildTrackerDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ChildTracker;
import java.time.LocalDateTime;
import java.util.Date;

public class ChildTrackerDTO {
    private Long id;
    private Long parentId;
    private String type;
    private Long childId;
    private String childIds;
    private String childOrg;
    private Long orgId;
    private LocalDateTime createdTime;
    private Date fromDate;
    private Date toDate;
    private Long createdBy;

    public ChildTrackerDTO() {
    }

    public ChildTrackerDTO(ChildTracker childTracker) {
        this.id = childTracker.getId();
        this.childId = childTracker.getChildId();
        this.parentId = childTracker.getParentId();
        this.createdBy = childTracker.getCreatedBy();
        this.createdTime = childTracker.getCreatedTime();
        this.fromDate = childTracker.getFromDate();
        this.toDate = childTracker.getToDate();
        this.type = childTracker.getType();
        this.orgId = childTracker.getOrgId();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return this.parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getChildId() {
        return this.childId;
    }

    public void setChildId(Long childId) {
        this.childId = childId;
    }

    public String getChildIds() {
        return this.childIds;
    }

    public void setChildIds(String childIds) {
        this.childIds = childIds;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public Date getFromDate() {
        return this.fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return this.toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public String getChildOrg() {
        return this.childOrg;
    }

    public void setChildOrg(String childOrg) {
        this.childOrg = childOrg;
    }
}

