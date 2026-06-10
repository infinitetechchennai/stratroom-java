/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.RiskConsequenceDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskCauseAndConsequenceDTO {
    private long id;
    private long riskId;
    private Map<String, Object> causeAndConsequenceValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private String createDateString;
    private String updatedDateString;
    private List<RiskConsequenceDTO> consequenceList;
    private Map<String, RiskConsequenceDTO> riskConsequenceMap;
    private long changeId;
    private long parentchangeId;

    public Map<String, RiskConsequenceDTO> getRiskConsequenceMap() {
        if (this.riskConsequenceMap == null) {
            this.riskConsequenceMap = new HashMap();
        }
        return this.riskConsequenceMap;
    }

    public void setRiskConsequenceMap(Map<String, RiskConsequenceDTO> riskConsequenceMap) {
        this.riskConsequenceMap = riskConsequenceMap;
    }

    public List<RiskConsequenceDTO> getConsequenceList() {
        return this.consequenceList;
    }

    public void setConsequenceList(List<RiskConsequenceDTO> consequenceList) {
        this.consequenceList = consequenceList;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public Map<String, Object> getCauseAndConsequenceValue() {
        if (this.causeAndConsequenceValue == null) {
            this.causeAndConsequenceValue = new HashMap();
        }
        return this.causeAndConsequenceValue;
    }

    public void setCauseAndConsequenceValue(Map<String, Object> causeAndConsequenceValue) {
        this.causeAndConsequenceValue = causeAndConsequenceValue;
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

