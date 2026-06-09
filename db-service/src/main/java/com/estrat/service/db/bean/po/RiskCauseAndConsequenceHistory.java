/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.RiskCauseAndConsequence;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="risk_cause_consequence_history", schema="orgstructure")
public class RiskCauseAndConsequenceHistory {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="risk_cause_id")
    private long riskCauseAndConsequenceId;
    @Column(name="risk_id")
    private long riskId;
    @Column(name="cause_consequence_value")
    private String causeAndConsequenceValue;
    @Column(name="active")
    private int active;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by")
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time")
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="version")
    private long version;
    @Column(name="change_id")
    private long changeId;
    @Column(name="status")
    private String status;

    public RiskCauseAndConsequenceHistory() {
    }

    public RiskCauseAndConsequenceHistory(RiskCauseAndConsequence riskCauseAndConsequence) {
        this.riskCauseAndConsequenceId = riskCauseAndConsequence.getId();
        this.riskId = riskCauseAndConsequence.getRiskId().getId();
        this.causeAndConsequenceValue = riskCauseAndConsequence.getCauseAndConsequenceValue();
        this.active = riskCauseAndConsequence.getActive();
        this.owner = riskCauseAndConsequence.getOwner();
        this.createdBy = riskCauseAndConsequence.getCreatedBy();
        this.updatedBy = riskCauseAndConsequence.getUpdatedBy();
        this.createdTime = riskCauseAndConsequence.getCreatedTime();
        this.updatedTime = riskCauseAndConsequence.getUpdatedTime();
        this.version = riskCauseAndConsequence.getVersion();
        this.changeId = riskCauseAndConsequence.getChangeId();
        this.status = riskCauseAndConsequence.getStatus();
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

    public String getCauseAndConsequenceValue() {
        return this.causeAndConsequenceValue;
    }

    public void setCauseAndConsequenceValue(String causeAndConsequenceValue) {
        this.causeAndConsequenceValue = causeAndConsequenceValue;
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

    public long getRiskCauseAndConsequenceId() {
        return this.riskCauseAndConsequenceId;
    }

    public void setRiskCauseAndConsequenceId(long riskCauseAndConsequenceId) {
        this.riskCauseAndConsequenceId = riskCauseAndConsequenceId;
    }
}

