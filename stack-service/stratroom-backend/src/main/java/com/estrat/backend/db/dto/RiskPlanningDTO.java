/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskPlanning
 *  com.estrat.backend.db.dto.RiskPlanningDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.RiskPlanning;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

public class RiskPlanningDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long pageId;
    private Map<String, Object> riskPlanningValue;
    private Date identifiedDate;
    private Long departmentId;
    private Long riskId;
    private Long riskPageId;

    public RiskPlanningDTO() {
    }

    public RiskPlanningDTO(RiskPlanning planing) {
        this.id = planing.getId();
        this.active = planing.getActive();
        this.owner = planing.getOwner();
        this.createdBy = planing.getCreatedBy();
        this.updatedBy = planing.getUpdatedBy();
        this.createdTime = planing.getCreatedTime();
        this.updatedTime = planing.getUpdatedTime();
        this.identifiedDate = planing.getIdentifiedDate();
        this.departmentId = planing.getDepartmentId();
        this.riskId = planing.getRiskId();
        this.riskPageId = planing.getRiskPageId();
        if (planing.getPageId() != null) {
            this.pageId = planing.getPageId().getId();
        }
        this.riskPlanningValue = JsonUtil.parseMap(planing.getRiskPlanningValue());
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

    public Map<String, Object> getRiskPlanningValue() {
        return this.riskPlanningValue;
    }

    public void setRiskPlanningValue(Map<String, Object> riskPlanningValue) {
        this.riskPlanningValue = riskPlanningValue;
    }

    public Date getIdentifiedDate() {
        return this.identifiedDate;
    }

    public void setIdentifiedDate(Date identifiedDate) {
        this.identifiedDate = identifiedDate;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(Long riskId) {
        this.riskId = riskId;
    }

    public Long getRiskPageId() {
        return this.riskPageId;
    }

    public void setRiskPageId(Long riskPageId) {
        this.riskPageId = riskPageId;
    }
}

