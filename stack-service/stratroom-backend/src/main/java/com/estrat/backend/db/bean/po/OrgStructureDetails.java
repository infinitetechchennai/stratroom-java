/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgStructureDetails
 *  com.estrat.backend.db.dto.OrgStructureDetailsDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.Id
 *  javax.persistence.IdClass
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.OrgStructureDetailsDTO;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="org_structure_details", schema="orgstructure")
@IdClass(value=OrgStructureDetails.class)
public class OrgStructureDetails
implements Serializable {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @Column(name="Id")
    private long id;
    @Column(name="empId")
    private long empId;
    @Column(name="status")
    private String status;
    @Column(name="parent_id")
    private Long parentId;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="active")
    private int active = 0;

    public OrgStructureDetails() {
    }

    public OrgStructureDetails(OrgStructureDetailsDTO orgStructureDetails) {
        this.id = orgStructureDetails.getId();
        this.empId = orgStructureDetails.getEmpId();
        this.status = orgStructureDetails.getStatus();
        this.parentId = orgStructureDetails.getParentId();
        this.startDate = orgStructureDetails.getStartDate();
        this.endDate = orgStructureDetails.getEndDate();
        this.createdTime = orgStructureDetails.getCreatedTime();
        this.updatedTime = orgStructureDetails.getUpdatedTime();
        this.createdBy = orgStructureDetails.getCreatedBy();
        this.updatedBy = orgStructureDetails.getUpdatedBy();
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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getParentId() {
        return this.parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
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

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }
}

