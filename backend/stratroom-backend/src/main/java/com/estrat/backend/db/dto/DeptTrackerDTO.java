/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DeptTracker
 *  com.estrat.backend.db.dto.DeptTrackerDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.DeptTracker;
import java.time.LocalDateTime;
import java.util.Date;

public class DeptTrackerDTO {
    private long id;
    private long deptId;
    private Long parentId;
    private String type;
    private Long removeOrAddUserId;
    private LocalDateTime createdTime;
    private int active = 0;
    private Date startDate;
    private Date endDate;
    private String pages;
    private Long owner;

    public DeptTrackerDTO() {
    }

    public DeptTrackerDTO(DeptTracker deptTracker) {
        this.id = deptTracker.getId();
        this.deptId = deptTracker.getDeptId();
        this.parentId = deptTracker.getParentId();
        this.owner = deptTracker.getOwner();
        this.type = deptTracker.getType();
        this.pages = deptTracker.getPageName();
        this.removeOrAddUserId = deptTracker.getRemoveOrAddUserId();
        this.createdTime = deptTracker.getCreatedTime();
        this.active = deptTracker.getActive();
        this.startDate = deptTracker.getStartDate();
        this.endDate = deptTracker.getEndDate();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
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

    public Long getRemoveOrAddUserId() {
        return this.removeOrAddUserId;
    }

    public void setRemoveOrAddUserId(Long removeOrAddUserId) {
        this.removeOrAddUserId = removeOrAddUserId;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPages() {
        return this.pages;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }
}

