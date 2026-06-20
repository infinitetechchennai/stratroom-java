/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskConsequenceDTO
 */
package com.estrat.backend.scorecard.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class RiskConsequenceDTO {
    private long id;
    private Map<String, Object> consequenceValue;
    private long causeConqId;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long changeId;
    private long parentchangeId;

    public Map<String, Object> getConsequenceValue() {
        return this.consequenceValue;
    }

    public void setConsequenceValue(Map<String, Object> consequenceValue) {
        this.consequenceValue = consequenceValue;
    }

    public long getCauseConqId() {
        return this.causeConqId;
    }

    public void setCauseConqId(long causeConqId) {
        this.causeConqId = causeConqId;
    }

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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public long getParentchangeId() {
        return this.parentchangeId;
    }

    public void setParentchangeId(long parentchangeId) {
        this.parentchangeId = parentchangeId;
    }
}

