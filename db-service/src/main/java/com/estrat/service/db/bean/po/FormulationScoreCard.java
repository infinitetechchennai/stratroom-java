/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationObjectives
 *  com.estrat.service.db.bean.po.FormulationScoreCard
 *  com.estrat.service.db.bean.po.StrategyFormulation
 *  com.estrat.service.db.dto.FormulationScoreCardDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.core.JsonProcessingException
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationObjectives;
import com.estrat.service.db.bean.po.StrategyFormulation;
import com.estrat.service.db.dto.FormulationScoreCardDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="formulation_score_card", schema="orgstructure")
public class FormulationScoreCard {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="score_card_val")
    private String scoreCardValue;
    @OneToMany(mappedBy="scoreCardId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<FormulationObjectives> objectiveList;
    @ManyToOne
    @JoinColumn(name="formulation_id")
    private StrategyFormulation formulationId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="score_name")
    private String scorecardName;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="owner")
    private Long owner;

    public FormulationScoreCard() {
    }

    public FormulationScoreCard(StrategyFormulation formulation, FormulationScoreCardDTO scoreCard) {
        this.id = scoreCard.getId();
        this.scorecardName = scoreCard.getScorecardName();
        this.createdTime = scoreCard.getCreatedTime() == null ? LocalDateTime.now() : scoreCard.getCreatedTime();
        this.objectiveList = scoreCard.getObjectiveList() != null ? scoreCard.getObjectiveList().stream().map(obj -> new FormulationObjectives(obj, this)).collect(Collectors.toList()) : Collections.emptyList();
        this.updatedTime = scoreCard.getUpdatedTime() == null ? LocalDateTime.now() : scoreCard.getUpdatedTime();
        this.createdBy = scoreCard.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : scoreCard.getCreatedBy();
        this.updatedBy = scoreCard.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : scoreCard.getUpdatedBy();
        this.formulationId = formulation;
        this.owner = scoreCard.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : scoreCard.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardValue = mapper.writeValueAsString((Object)scoreCard.getScoreCardValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public StrategyFormulation getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(StrategyFormulation formulationId) {
        this.formulationId = formulationId;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getScoreCardValue() {
        return this.scoreCardValue;
    }

    public void setScoreCardValue(String scoreCardValue) {
        this.scoreCardValue = scoreCardValue;
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

    public String getScorecardName() {
        return this.scorecardName;
    }

    public void setScorecardName(String scorecardName) {
        this.scorecardName = scorecardName;
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

    public List<FormulationObjectives> getObjectiveList() {
        return this.objectiveList;
    }

    public void setObjectiveList(List<FormulationObjectives> objectiveList) {
        this.objectiveList = objectiveList;
    }
}

