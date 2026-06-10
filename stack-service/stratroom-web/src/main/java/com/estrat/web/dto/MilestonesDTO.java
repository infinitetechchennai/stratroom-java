/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.MilestonesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MilestonesDTO {
    private long id;
    private String createDateString;
    private String updatedDateString;
    private int active = 0;
    private Map<String, Object> mileStonesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long initiativeId;
    private long createdBy;
    private long updatedBy;

    public String getCreateDateString() {
        return this.createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public String getUpdatedDateString() {
        return this.updatedDateString;
    }

    public void setUpdatedDateString(String updatedDateString) {
        this.updatedDateString = updatedDateString;
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

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Map<String, Object> getMileStonesValue() {
        if (this.mileStonesValue == null) {
            this.mileStonesValue = new HashMap();
        }
        return this.mileStonesValue;
    }

    public void setMileStonesValue(Map<String, Object> mileStonesValue) {
        this.mileStonesValue = mileStonesValue;
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
        return "MilestonesDTO [id=" + this.id + ", createDateString=" + this.createDateString + ", updatedDateString=" + this.updatedDateString + ", active=" + this.active + ", mileStonesValue=" + this.mileStonesValue + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", owner=" + this.owner + ", initiativeId=" + this.initiativeId + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + "]";
    }
}

