/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskConsequenceDetails
 *  com.estrat.service.db.dto.RiskConsequenceDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.RiskConsequenceDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="risk_consequence", schema="orgstructure")
public class RiskConsequenceDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="consequence_value")
    private String consequenceValue;
    @Column(name="cause_conq_id")
    private long causeConqId;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="version")
    private long version;
    @Column(name="change_id")
    private long changeId;
    @Column(name="status")
    private String status;

    public RiskConsequenceDetails() {
    }

    public RiskConsequenceDetails(RiskConsequenceDTO riskCauseAndConsequenceDTO) {
        this.id = riskCauseAndConsequenceDTO.getId();
        this.active = riskCauseAndConsequenceDTO.getActive();
        this.owner = riskCauseAndConsequenceDTO.getOwner();
        this.createdBy = riskCauseAndConsequenceDTO.getCreatedBy();
        this.updatedBy = riskCauseAndConsequenceDTO.getUpdatedBy();
        this.createdTime = riskCauseAndConsequenceDTO.getCreatedTime();
        this.updatedTime = riskCauseAndConsequenceDTO.getUpdatedTime();
        this.causeConqId = riskCauseAndConsequenceDTO.getCauseConqId();
        this.version = riskCauseAndConsequenceDTO.getVersion();
        this.status = riskCauseAndConsequenceDTO.getStatus();
        this.changeId = riskCauseAndConsequenceDTO.getChangeId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.consequenceValue = mapper.writeValueAsString((Object)riskCauseAndConsequenceDTO.getConsequenceValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getCauseConqId() {
        return this.causeConqId;
    }

    public void setCauseConqId(long causeConqId) {
        this.causeConqId = causeConqId;
    }

    public String getConsequenceValue() {
        return this.consequenceValue;
    }

    public void setConsequenceValue(String consequenceValue) {
        this.consequenceValue = consequenceValue;
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

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

