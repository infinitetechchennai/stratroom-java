/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptTracker
 *  com.estrat.service.db.bean.po.OrgTracker
 *  com.estrat.service.db.dto.OrgTrackerDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.DeptTracker;
import com.estrat.service.db.bean.po.OrgTracker;
import java.time.LocalDateTime;
import java.util.Date;

public class OrgTrackerDTO {
    private long id;
    private long empId;
    private long deptId;
    private Long owner;
    private Long parentId;
    private String type;
    private Long removeOrAddUserId;
    private LocalDateTime createdTime;
    private int active = 0;
    private Date startDate;
    private Date endDate;
    private String pageName;
    private Long pageId;
    private String parentName;
    private String ownerName;
    private String designation;
    private String pages;
    private String email;
    private String fromDate;
    private String toDate;
    private String deptOrDesignationName;

    public OrgTrackerDTO() {
    }

    public OrgTrackerDTO(OrgTracker orgTracker) {
        this.id = orgTracker.getId();
        this.empId = orgTracker.getEmpId();
        this.parentId = orgTracker.getParentId();
        this.type = orgTracker.getType();
        this.pages = orgTracker.getPageName();
        this.removeOrAddUserId = orgTracker.getRemoveOrAddUserId();
        this.createdTime = orgTracker.getCreatedTime();
        this.active = orgTracker.getActive();
        this.startDate = orgTracker.getStartDate();
        this.endDate = orgTracker.getEndDate();
        if (orgTracker.getPageId() != null) {
            this.pageId = orgTracker.getPageId();
        }
    }

    public OrgTrackerDTO(DeptTracker orgTracker) {
        this.id = orgTracker.getId();
        this.deptId = orgTracker.getDeptId();
        this.parentId = orgTracker.getParentId();
        this.owner = orgTracker.getOwner();
        this.type = orgTracker.getType();
        this.pages = orgTracker.getPageName();
        this.removeOrAddUserId = orgTracker.getRemoveOrAddUserId();
        this.createdTime = orgTracker.getCreatedTime();
        this.active = orgTracker.getActive();
        this.startDate = orgTracker.getStartDate();
        this.endDate = orgTracker.getEndDate();
        if (orgTracker.getPageId() != null) {
            this.pageId = orgTracker.getPageId();
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
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

    public String getParentName() {
        return this.parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getPages() {
        return this.pages;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFromDate() {
        return this.fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return this.toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getDeptOrDesignationName() {
        return this.deptOrDesignationName;
    }

    public void setDeptOrDesignationName(String deptOrDesignationName) {
        this.deptOrDesignationName = deptOrDesignationName;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }
}

