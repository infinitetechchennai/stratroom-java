/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgStructureDetails
 *  com.estrat.backend.db.dto.OrgStructureDetailsDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.OrgStructureDetails;
import java.time.LocalDateTime;
import java.util.Date;

public class OrgStructureDetailsDTO {
    private long id;
    private long empId;
    private String status;
    private Long parentId;
    private Date startDate;
    private Date endDate;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long createdBy;
    private Long updatedBy;

    public OrgStructureDetailsDTO() {
    }

    public OrgStructureDetailsDTO(OrgStructureDetails orgStructureDetails) {
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }
}

