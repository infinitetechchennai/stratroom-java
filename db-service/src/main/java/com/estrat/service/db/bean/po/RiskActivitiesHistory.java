/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskActivities
 *  com.estrat.service.db.bean.po.RiskActivitiesHistory
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.RiskActivities;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="risk_activities_history", schema="orgstructure")
public class RiskActivitiesHistory {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="risk_activities_id")
    private RiskActivities riskActivitiesId;
    @Column(name="risk_activities_value")
    private String riskActivitiesValue;
    @Column(name="riskplanid")
    private long riskPlanId;
    @Column(name="version")
    private long version;
    @Column(name="change_id")
    private long changeId;
    @Column(name="status")
    private String status;
    @Column(name="active")
    private int active;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;

    public RiskActivitiesHistory() {
    }

    public RiskActivitiesHistory(RiskActivities riskActivities) {
        this.riskPlanId = riskActivities.getRiskPlanId().getId();
        this.riskActivitiesId = riskActivities;
        this.riskActivitiesValue = riskActivities.getRiskActivitiesValue();
        this.version = riskActivities.getVersion();
        this.changeId = riskActivities.getChangeId();
        this.status = riskActivities.getStatus();
        this.createdTime = riskActivities.getCreatedTime();
        this.active = riskActivities.getActive();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RiskActivities getRiskActivitiesId() {
        return this.riskActivitiesId;
    }

    public void setRiskActivitiesId(RiskActivities riskActivitiesId) {
        this.riskActivitiesId = riskActivitiesId;
    }

    public String getRiskActivitiesValue() {
        return this.riskActivitiesValue;
    }

    public void setRiskActivitiesValue(String riskActivitiesValue) {
        this.riskActivitiesValue = riskActivitiesValue;
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

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public long getRiskPlanId() {
        return this.riskPlanId;
    }

    public void setRiskPlanId(long riskPlanId) {
        this.riskPlanId = riskPlanId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }
}

