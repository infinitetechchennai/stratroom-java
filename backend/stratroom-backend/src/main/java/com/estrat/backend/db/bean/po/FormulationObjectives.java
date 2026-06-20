/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationKPI
 *  com.estrat.backend.db.bean.po.FormulationObjectives
 *  com.estrat.backend.db.bean.po.FormulationScoreCard
 *  com.estrat.backend.db.dto.FormulationObjectiveDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.FormulationKPI;
import com.estrat.backend.db.bean.po.FormulationScoreCard;
import com.estrat.backend.db.dto.FormulationObjectiveDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="formulation_objectives", schema="orgstructure")
public class FormulationObjectives {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="objectives_val")
    private String objectiveValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private Long owner;
    @ManyToOne
    @JoinColumn(name="score_card_id")
    private FormulationScoreCard scoreCardId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @OneToMany(cascade={CascadeType.ALL}, mappedBy="objectiveId", fetch=FetchType.LAZY)
    private List<FormulationKPI> kpiList;

    public FormulationObjectives() {
    }

    public FormulationObjectives(FormulationObjectiveDTO objectives, FormulationScoreCard formulationScoreCard) {
        this.id = objectives.getId();
        this.scoreCardId = formulationScoreCard;
        this.createdTime = objectives.getCreatedTime() == null ? LocalDateTime.now() : objectives.getCreatedTime();
        this.createdBy = objectives.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : objectives.getCreatedBy();
        this.updatedBy = objectives.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : objectives.getUpdatedBy();
        this.kpiList = objectives.getKpiList() != null ? objectives.getKpiList().stream().map(kpi -> new FormulationKPI(kpi, this)).collect(Collectors.toList()) : Collections.emptyList();
        this.updatedTime = objectives.getUpdatedTime() == null ? LocalDateTime.now() : objectives.getUpdatedTime();
        this.owner = objectives.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : objectives.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.objectiveValue = mapper.writeValueAsString((Object)objectives.getObjectivesValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
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

    public FormulationScoreCard getScoreCardId() {
        return this.scoreCardId;
    }

    public void setScoreCardId(FormulationScoreCard scoreCardId) {
        this.scoreCardId = scoreCardId;
    }

    public String getObjectiveValue() {
        return this.objectiveValue;
    }

    public void setObjectiveValue(String objectiveValue) {
        this.objectiveValue = objectiveValue;
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

    public List<FormulationKPI> getKpiList() {
        return this.kpiList;
    }

    public void setKpiList(List<FormulationKPI> kpiList) {
        this.kpiList = kpiList;
    }
}

