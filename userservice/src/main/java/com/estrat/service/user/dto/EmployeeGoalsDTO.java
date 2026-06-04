/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.EmployeeGoalsDTO
 */
package com.estrat.service.user.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class EmployeeGoalsDTO {
    private long id;
    private long owner;
    private int active = 0;
    private Map<String, Object> goalsValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Map<String, Object> getGoalsValue() {
        return this.goalsValue;
    }

    public void setGoalsValue(Map<String, Object> goalsValue) {
        this.goalsValue = goalsValue;
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
}

