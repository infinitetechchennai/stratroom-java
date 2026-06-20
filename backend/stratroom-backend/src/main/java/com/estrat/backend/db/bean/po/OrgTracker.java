/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgTracker
 *  com.estrat.backend.db.dto.OrgTrackerDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.OrgTrackerDTO;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="org_tracker", schema="orgstructure")
public class OrgTracker {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="Id")
    private Long id;
    @Column(name="empId")
    private long empId;
    @Column(name="parent_id")
    private Long parentId;
    @Column(name="type")
    private String type;
    @Column(name="who_user_id")
    private Long removeOrAddUserId;
    @Column(name="orgId")
    private Long orgId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="active")
    private int active = 0;
    @Column(name="pageName")
    private String pageName;
    @Column(name="pageId")
    private Long pageId;

    public OrgTracker(OrgTrackerDTO orgTracker) {
        this.id = orgTracker.getId();
        this.empId = orgTracker.getEmpId();
        this.parentId = orgTracker.getParentId();
        this.type = orgTracker.getType();
        this.pageName = orgTracker.getType();
        this.removeOrAddUserId = orgTracker.getRemoveOrAddUserId();
        this.createdTime = orgTracker.getCreatedTime();
        this.active = orgTracker.getActive();
        this.startDate = orgTracker.getStartDate();
        this.endDate = orgTracker.getEndDate();
        this.pageId = orgTracker.getPageId();
    }

    public OrgTracker() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
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

