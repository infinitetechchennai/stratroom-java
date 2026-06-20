/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditManagement
 *  com.estrat.backend.db.dto.AuditManagementDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.AuditManagement;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class AuditManagementDTO {
    private long id;
    private int active = 0;
    private long owner;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long pageId;
    private Map<String, Object> managementValue;
    private Date startDate;
    private Date endDate;
    private Long departmentId;

    public AuditManagementDTO() {
    }

    public AuditManagementDTO(AuditManagement planing) {
        this.id = planing.getId();
        this.active = planing.getActive();
        this.owner = planing.getOwner();
        this.createdBy = planing.getCreatedBy();
        this.updatedBy = planing.getUpdatedBy();
        this.createdTime = planing.getCreatedTime();
        this.updatedTime = planing.getUpdatedTime();
        this.startDate = planing.getStartDate();
        this.endDate = planing.getEndDate();
        this.departmentId = planing.getDepartmentId();
        if (planing.getPageId() != null) {
            this.pageId = planing.getPageId().getId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.managementValue = (Map)mapper.readValue(planing.getManagementValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public Map<String, Object> getManagementValue() {
        return this.managementValue;
    }

    public void setManagementValue(Map<String, Object> managementValue) {
        this.managementValue = managementValue;
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

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}

