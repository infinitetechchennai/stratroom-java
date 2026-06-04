/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskActivities
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.dto.RiskActivitiesDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
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

import com.estrat.service.db.bean.po.RiskPlan;
import com.estrat.service.db.dto.RiskActivitiesDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Objects;
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
@Table(name="risk_activities", schema="orgstructure")
public class RiskActivities {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="risk_plan_id")
    private RiskPlan riskPlanId;
    @Column(name="risk_activities_value")
    private String riskActivitiesValue;
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

    public RiskActivities() {
    }

    public RiskActivities(RiskActivitiesDTO riskActivitiesDTO) {
        this.id = riskActivitiesDTO.getId();
        RiskPlan riskPlan = new RiskPlan();
        riskPlan.setId(riskActivitiesDTO.getRiskPlanId());
        this.riskPlanId = riskPlan;
        this.active = riskActivitiesDTO.getActive();
        this.owner = riskActivitiesDTO.getOwner();
        this.createdBy = riskActivitiesDTO.getCreatedBy();
        this.updatedBy = riskActivitiesDTO.getUpdatedBy();
        this.createdTime = riskActivitiesDTO.getCreatedTime();
        this.updatedTime = riskActivitiesDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskActivitiesValue = mapper.writeValueAsString((Object)riskActivitiesDTO.getRiskActivitiesValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RiskPlan getRiskPlanId() {
        return this.riskPlanId;
    }

    public void setRiskPlanId(RiskPlan riskPlanId) {
        this.riskPlanId = riskPlanId;
    }

    public String getRiskActivitiesValue() {
        return this.riskActivitiesValue;
    }

    public void setRiskActivitiesValue(String riskActivitiesValue) {
        this.riskActivitiesValue = riskActivitiesValue;
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

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RiskActivities)) {
            return false;
        }
        RiskActivities that = (RiskActivities)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

