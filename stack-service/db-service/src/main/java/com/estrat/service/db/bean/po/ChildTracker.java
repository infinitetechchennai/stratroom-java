/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ChildTracker
 *  com.estrat.service.db.dto.ChildTrackerDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.ChildTrackerDTO;
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
@Table(name="child_tracker", schema="orgstructure")
public class ChildTracker {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="Id")
    private Long id;
    @Column(name="parent_id")
    private Long parentId;
    @Column(name="imp_type")
    private String type;
    @Column(name="child_id")
    private Long childId;
    @Column(name="org_id")
    private Long orgId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="from_date")
    private Date fromDate;
    @Column(name="to_date")
    private Date toDate;
    @Column(name="created_by")
    private Long createdBy;

    public ChildTracker(ChildTrackerDTO childTracker) {
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

    public ChildTracker() {
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
}

