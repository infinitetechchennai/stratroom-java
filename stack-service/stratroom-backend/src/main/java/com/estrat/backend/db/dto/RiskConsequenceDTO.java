/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetails
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory
 *  com.estrat.backend.db.dto.RiskConsequenceDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.RiskConsequenceDetails;
import com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
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
    private long version;
    private String status;

    public RiskConsequenceDTO() {
    }

    public RiskConsequenceDTO(RiskConsequenceDetails riskCauseAndConsequence) {
        this.id = riskCauseAndConsequence.getId();
        this.owner = riskCauseAndConsequence.getOwner();
        this.createdBy = riskCauseAndConsequence.getCreatedBy();
        this.updatedBy = riskCauseAndConsequence.getUpdatedBy();
        this.createdTime = riskCauseAndConsequence.getCreatedTime();
        this.updatedTime = riskCauseAndConsequence.getUpdatedTime();
        this.active = riskCauseAndConsequence.getActive();
        this.causeConqId = riskCauseAndConsequence.getCauseConqId();
        this.version = riskCauseAndConsequence.getVersion();
        this.status = riskCauseAndConsequence.getStatus();
        this.changeId = riskCauseAndConsequence.getChangeId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.consequenceValue = (Map)mapper.readValue(riskCauseAndConsequence.getConsequenceValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public RiskConsequenceDTO(RiskConsequenceDetailsHistory riskConsequenceHstory) {
        this.id = riskConsequenceHstory.getId();
        this.owner = riskConsequenceHstory.getOwner();
        this.createdBy = riskConsequenceHstory.getCreatedBy();
        this.updatedBy = riskConsequenceHstory.getUpdatedBy();
        this.createdTime = riskConsequenceHstory.getCreatedTime();
        this.updatedTime = riskConsequenceHstory.getUpdatedTime();
        this.causeConqId = riskConsequenceHstory.getCauseConqId();
        this.version = riskConsequenceHstory.getVersion();
        this.status = riskConsequenceHstory.getStatus();
        if (riskConsequenceHstory.getChangeId() != null) {
            this.changeId = riskConsequenceHstory.getChangeId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.consequenceValue = (Map)mapper.readValue(riskConsequenceHstory.getConsequenceValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

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

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

