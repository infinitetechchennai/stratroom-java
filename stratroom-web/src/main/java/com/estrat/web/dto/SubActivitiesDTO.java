/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.SubActivitiesDTO
 */
package com.estrat.web.dto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class SubActivitiesDTO {
    private long id;
    private int active = 0;
    private Map<String, Object> activitiesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long activitieId;
    private long createdBy;
    private long updatedBy;

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

    public Map<String, Object> getActivitiesValue() {
        if (this.activitiesValue == null) {
            this.activitiesValue = new HashMap();
        }
        return this.activitiesValue;
    }

    public void setActivitiesValue(Map<String, Object> activitiesValue) {
        this.activitiesValue = activitiesValue;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getActivitieId() {
        return this.activitieId;
    }

    public void setActivitieId(long activitieId) {
        this.activitieId = activitieId;
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

    public String toString() {
        return "SubActivitiesDTO [id=" + this.id + ", active=" + this.active + ", activitiesValue=" + this.activitiesValue + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", owner=" + this.owner + ", activitieId=" + this.activitieId + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + "]";
    }
}

