/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanHistory
 *  com.fasterxml.jackson.annotation.JsonIdentityInfo
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.annotation.ObjectIdGenerators$PropertyGenerator
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.RiskPlan;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="risk_plan_history", schema="orgstructure")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties(ignoreUnknown=true)
public class RiskPlanHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="history_id")
    private long historyId;
    @Column(name="risk_plan_id")
    private long riskPlanId;
    @Column(name="risk_id")
    private long riskId;
    @Column(name="risk_plan_value")
    private String riskPlanValue;
    @Column(name="type_flag")
    private String typeFlag;
    @Column(name="active")
    private int active;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="version")
    private Long version;
    @Column(name="change_id")
    private Long changeId;
    @Column(name="status")
    private String status;

    public RiskPlanHistory() {
    }

    public RiskPlanHistory(RiskPlan riskPlan) {
        this.riskPlanId = riskPlan.getId();
        this.riskId = riskPlan.getRiskId().getId();
        this.riskPlanValue = riskPlan.getRiskPlanValue();
        this.typeFlag = riskPlan.getTypeFlag();
        this.active = riskPlan.getActive();
        this.createdBy = riskPlan.getCreatedBy();
        this.updatedBy = riskPlan.getUpdatedBy();
        this.createdTime = riskPlan.getCreatedTime();
        this.updatedTime = riskPlan.getUpdatedTime();
        this.version = riskPlan.getVersion();
        this.changeId = riskPlan.getChangeId();
        this.status = riskPlan.getStatus();
    }

    public long getHistoryId() {
        return this.historyId;
    }

    public void setHistoryId(long historyId) {
        this.historyId = historyId;
    }

    public long getRiskPlanId() {
        return this.riskPlanId;
    }

    public void setRiskPlanId(long riskPlanId) {
        this.riskPlanId = riskPlanId;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public String getRiskPlanValue() {
        return this.riskPlanValue;
    }

    public void setRiskPlanValue(String riskPlanValue) {
        this.riskPlanValue = riskPlanValue;
    }

    public String getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(String typeFlag) {
        this.typeFlag = typeFlag;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

