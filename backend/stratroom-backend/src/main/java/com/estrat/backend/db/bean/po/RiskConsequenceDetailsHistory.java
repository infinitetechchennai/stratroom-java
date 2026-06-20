/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetails
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.RiskConsequenceDetails;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="risk_consequence_history", schema="orgstructure")
public class RiskConsequenceDetailsHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="history_id")
    private long historyId;
    @Column(name="id")
    private long id;
    @Column(name="version")
    private long version;
    @Column(name="status")
    private String status;
    @Column(name="active")
    private int active;
    @Column(name="change_id")
    private Long changeId;
    @Column(name="consequence_value")
    private String consequenceValue;
    @Column(name="cause_conq_id")
    private long causeConqId;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by")
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time")
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    public RiskConsequenceDetailsHistory() {
    }

    public RiskConsequenceDetailsHistory(RiskConsequenceDetails riskConsequenceDetails) {
        this.id = riskConsequenceDetails.getId();
        this.version = riskConsequenceDetails.getVersion();
        this.status = riskConsequenceDetails.getStatus();
        this.owner = riskConsequenceDetails.getOwner();
        this.createdBy = riskConsequenceDetails.getCreatedBy();
        this.updatedBy = riskConsequenceDetails.getUpdatedBy();
        this.createdTime = riskConsequenceDetails.getCreatedTime();
        this.updatedTime = riskConsequenceDetails.getUpdatedTime();
        this.causeConqId = riskConsequenceDetails.getCauseConqId();
        this.consequenceValue = riskConsequenceDetails.getConsequenceValue();
        this.active = riskConsequenceDetails.getActive();
    }

    public long getHistoryId() {
        return this.historyId;
    }

    public void setHistoryId(long historyId) {
        this.historyId = historyId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getConsequenceValue() {
        return this.consequenceValue;
    }

    public void setConsequenceValue(String consequenceValue) {
        this.consequenceValue = consequenceValue;
    }

    public long getCauseConqId() {
        return this.causeConqId;
    }

    public void setCauseConqId(long causeConqId) {
        this.causeConqId = causeConqId;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }
}

