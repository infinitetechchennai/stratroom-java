/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.Objectives
 *  com.estrat.service.db.bean.po.ScoreCard
 *  com.estrat.service.db.dto.ObjectivesDTO
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
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.ScoreCard;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
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
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="objectives", schema="orgstructure")
public class Objectives {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="objective_id_seq", updatable=false)
    private Long objectiveIdSeq;
    @Column(name="active")
    private int active = 0;
    @Column(name="objectives_val")
    private String objectiveValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @ManyToOne
    @JoinColumn(name="score_card_id")
    private ScoreCard scoreCardId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @OneToMany(cascade={CascadeType.ALL}, mappedBy="objectiveId", fetch=FetchType.LAZY)
    @Where(clause="active=0")
    private List<KPI> kpiList;
    @Column(name="objectives_id")
    private String objectiveId;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;

    public Objectives() {
    }

    public Objectives(ObjectivesDTO objectives) {
        this.id = objectives.getId();
        ScoreCard scoreCard = new ScoreCard();
        scoreCard.setId(objectives.getScoreCardId());
        this.scoreCardId = scoreCard;
        this.active = objectives.getActive();
        this.createdTime = objectives.getCreatedTime();
        this.createdBy = objectives.getCreatedBy();
        this.updatedBy = objectives.getUpdatedBy();
        this.objectiveId = objectives.getObjectiveId();
        this.kpiList = objectives.getKpiList() != null ? objectives.getKpiList().stream().map(kpi -> new KPI(kpi)).collect(Collectors.toList()) : null;
        this.owner = objectives.getOwner();
        this.updatedTime = objectives.getUpdatedTime();
        this.startDate = objectives.getStartDate();
        this.endDate = objectives.getEndDate();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.objectiveValue = mapper.writeValueAsString((Object)objectives.getObjectivesValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getObjectiveIdSeq() {
        return this.objectiveIdSeq;
    }

    public void setObjectiveIdSeq(Long objectiveIdSeq) {
        this.objectiveIdSeq = objectiveIdSeq;
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

    public ScoreCard getScoreCardId() {
        return this.scoreCardId;
    }

    public void setScoreCardId(ScoreCard scoreCardId) {
        this.scoreCardId = scoreCardId;
    }

    public String getObjectiveValue() {
        return this.objectiveValue;
    }

    public void setObjectiveValue(String objectiveValue) {
        this.objectiveValue = objectiveValue;
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

    public List<KPI> getKpiList() {
        return this.kpiList;
    }

    public void setKpiList(List<KPI> kpiList) {
        this.kpiList = kpiList;
    }

    public String getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(String objectiveId) {
        this.objectiveId = objectiveId;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

