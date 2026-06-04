/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory
 *  com.estrat.service.db.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.service.db.dto.RiskConsequenceDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.RiskCauseAndConsequence;
import com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory;
import com.estrat.service.db.dto.RiskConsequenceDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private List<RiskConsequenceDTO> consequenceList;
    private long changeId;
    private String status;
    private Long version;
    private long parentchangeId;

    public RiskCauseAndConsequenceDTO() {
    }

    public RiskCauseAndConsequenceDTO(RiskCauseAndConsequence riskCauseAndConsequence) {
        this.id = riskCauseAndConsequence.getId();
        if (riskCauseAndConsequence.getRiskId() != null) {
            this.riskId = riskCauseAndConsequence.getRiskId().getId();
        }
        this.owner = riskCauseAndConsequence.getOwner();
        this.createdBy = riskCauseAndConsequence.getCreatedBy();
        this.updatedBy = riskCauseAndConsequence.getUpdatedBy();
        this.createdTime = riskCauseAndConsequence.getCreatedTime();
        this.updatedTime = riskCauseAndConsequence.getUpdatedTime();
        this.active = riskCauseAndConsequence.getActive();
        this.version = riskCauseAndConsequence.getVersion();
        this.status = riskCauseAndConsequence.getStatus();
        this.changeId = riskCauseAndConsequence.getChangeId();
        this.consequenceList = riskCauseAndConsequence.getConsequenceList() != null ? riskCauseAndConsequence.getConsequenceList().stream().map(kpi -> new RiskConsequenceDTO(kpi)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        if (riskCauseAndConsequence.getCauseAndConsequenceValue() != null) {
            try {
                this.causeAndConsequenceValue = (Map)mapper.readValue(riskCauseAndConsequence.getCauseAndConsequenceValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public RiskCauseAndConsequenceDTO(RiskCauseAndConsequenceHistory riskCauseAndConsequence) {
        this.id = riskCauseAndConsequence.getRiskCauseAndConsequenceId();
        if (riskCauseAndConsequence.getRiskId() != 0L) {
            this.riskId = riskCauseAndConsequence.getRiskId();
        }
        this.owner = riskCauseAndConsequence.getOwner();
        this.createdBy = riskCauseAndConsequence.getCreatedBy();
        this.updatedBy = riskCauseAndConsequence.getUpdatedBy();
        this.createdTime = riskCauseAndConsequence.getCreatedTime();
        this.updatedTime = riskCauseAndConsequence.getUpdatedTime();
        this.active = riskCauseAndConsequence.getActive();
        this.version = riskCauseAndConsequence.getVersion();
        this.status = riskCauseAndConsequence.getStatus();
        this.changeId = riskCauseAndConsequence.getChangeId();
        ObjectMapper mapper = new ObjectMapper();
        if (riskCauseAndConsequence.getCauseAndConsequenceValue() != null) {
            try {
                this.causeAndConsequenceValue = (Map)mapper.readValue(riskCauseAndConsequence.getCauseAndConsequenceValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

