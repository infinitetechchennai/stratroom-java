/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptTracker
 *  com.estrat.service.db.dto.DeptTrackerDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.DeptTrackerDTO;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="dept_tracker", schema="orgstructure")
public class DeptTracker {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="Id")
    private long id;
    @Column(name="deptId")
    private long deptId;
    @Column(name="parent_id")
    private Long parentId;
    @Column(name="type")
    private String type;
    @Column(name="who_user_id")
    private Long removeOrAddUserId;
    @Column(name="active")
    private int active = 0;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="orgId")
    private Long orgId;
    @Column(name="pageName")
    private String pageName;
    @Column(name="pageId")
    private Long pageId;
    @Column(name="owner")
    private Long owner;

    public DeptTracker() {
    }

    public DeptTracker(DeptTrackerDTO deptTracker) {
        this.id = deptTracker.getId();
        this.deptId = deptTracker.getDeptId();
        this.parentId = deptTracker.getParentId();
        this.owner = deptTracker.getOwner();
        this.type = deptTracker.getType();
        this.pageName = deptTracker.getPages();
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

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
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

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }
}

