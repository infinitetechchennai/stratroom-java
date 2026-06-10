/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.EmployeePerformanceFormDTO
 */
package com.estrat.scorecard.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class EmployeePerformanceFormDTO {
    private long id;
    private Map<String, Object> performanceFormValue;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int totalSelf = 0;
    private int totalManager = 0;
    private int totalConsensual = 0;
    private long deptId;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getPerformanceFormValue() {
        return this.performanceFormValue;
    }

    public void setPerformanceFormValue(Map<String, Object> performanceFormValue) {
        this.performanceFormValue = performanceFormValue;
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

    public int getTotalSelf() {
        return this.totalSelf;
    }

    public void setTotalSelf(int totalSelf) {
        this.totalSelf = totalSelf;
    }

    public int getTotalManager() {
        return this.totalManager;
    }

    public void setTotalManager(int totalManager) {
        this.totalManager = totalManager;
    }

    public int getTotalConsensual() {
        return this.totalConsensual;
    }

    public void setTotalConsensual(int totalConsensual) {
        this.totalConsensual = totalConsensual;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }
}

