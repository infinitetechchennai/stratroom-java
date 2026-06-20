/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationRiskActivities
 *  com.estrat.backend.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.backend.db.dto.FormulationRiskActivitiesDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
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
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.FormulationSubRiskDetails;
import com.estrat.backend.db.dto.FormulationRiskActivitiesDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="formulation_risk_activities", schema="orgstructure")
public class FormulationRiskActivities {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="activity_value")
    private String activityValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @ManyToOne
    @JoinColumn(name="sub_risk_id")
    private FormulationSubRiskDetails subRiskId;

    public FormulationRiskActivities() {
    }

    public FormulationRiskActivities(FormulationRiskActivitiesDTO riskActivitiesDTO) {
        this.id = riskActivitiesDTO.getId();
        this.createdTime = riskActivitiesDTO.getCreatedTime() == null ? LocalDateTime.now() : riskActivitiesDTO.getCreatedTime();
        this.updatedTime = riskActivitiesDTO.getUpdatedTime() == null ? LocalDateTime.now() : riskActivitiesDTO.getUpdatedTime();
        this.createdBy = riskActivitiesDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskActivitiesDTO.getCreatedBy();
        long l = this.updatedBy = riskActivitiesDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskActivitiesDTO.getUpdatedBy();
        if (riskActivitiesDTO.getSubRiskId() != 0L) {
            FormulationSubRiskDetails subRiskDetails = new FormulationSubRiskDetails();
            subRiskDetails.setId(riskActivitiesDTO.getSubRiskId());
            this.subRiskId = subRiskDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activityValue = mapper.writeValueAsString((Object)riskActivitiesDTO.getActivityValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public FormulationSubRiskDetails getSubRiskId() {
        return this.subRiskId;
    }

    public void setSubRiskId(FormulationSubRiskDetails subRiskId) {
        this.subRiskId = subRiskId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getActivityValue() {
        return this.activityValue;
    }

    public void setActivityValue(String activityValue) {
        this.activityValue = activityValue;
    }
}

