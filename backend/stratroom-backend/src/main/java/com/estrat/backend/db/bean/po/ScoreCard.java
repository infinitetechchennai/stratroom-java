/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.bean.po.ScoreCardDetails
 *  com.estrat.backend.db.dto.ScoreCardDTO
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
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.bean.po.ScoreCardDetails;
import com.estrat.backend.db.dto.ScoreCardDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import org.hibernate.annotations.Where;

@Entity
@Table(name="score_card", schema="orgstructure")
public class ScoreCard {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="score_card_val")
    private String scoreCardValue;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="Created_Time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="score_name")
    private String scorecardName;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @OneToMany(mappedBy="scoreCardId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<Objectives> objectiveList;
    @Column(name="include_reportee")
    @jakarta.persistence.Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
    private boolean includeReportee;
    @Column(name="custom_repotees")
    private String customReportees;
    @Column(name="perspective_id")
    private String perspectiveId;
    @Column(name="perspective_id_seq", updatable=false)
    private Long perspectiveIdSeq;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @ManyToOne
    @JoinColumn(name="scoreCardDetailsId")
    private ScoreCardDetails scoreCardDetailsId;

    public ScoreCard() {
    }

    public ScoreCard(ScoreCardDTO scoreCard) {
        Long detailsId;
        this.id = scoreCard.getId();
        this.scorecardName = scoreCard.getScorecardName();
        this.createdTime = scoreCard.getCreatedTime();
        this.active = scoreCard.getActive();
        this.objectiveList = scoreCard.getObjectiveList() != null ? scoreCard.getObjectiveList().stream().map(obj -> new Objectives(obj)).collect(Collectors.toList()) : null;
        this.owner = scoreCard.getOwner();
        this.updatedTime = scoreCard.getUpdatedTime();
        this.createdBy = scoreCard.getCreatedBy();
        this.updatedBy = scoreCard.getUpdatedBy();
        this.includeReportee = scoreCard.isIncludeReportee();
        this.customReportees = scoreCard.getCustomReportees();
        this.perspectiveId = scoreCard.getPerspectiveId();
        this.perspectiveIdSeq = scoreCard.getPerspectiveIdSeq();
        this.startDate = scoreCard.getStartDate();
        this.endDate = scoreCard.getEndDate();
        Long pageId = scoreCard.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(scoreCard.getPageId());
            this.pageId = pagesDetails;
        }
        if ((detailsId = Long.valueOf(scoreCard.getScoreCardDetailsId())) != null && detailsId != 0L) {
            ScoreCardDetails scoreCardDetails = new ScoreCardDetails();
            scoreCardDetails.setId(detailsId);
            this.scoreCardDetailsId = scoreCardDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardValue = mapper.writeValueAsString((Object)scoreCard.getScoreCardValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
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

    public String getScorecardName() {
        return this.scorecardName;
    }

    public void setScorecardName(String scorecardName) {
        this.scorecardName = scorecardName;
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

    public List<Objectives> getObjectiveList() {
        return this.objectiveList;
    }

    public void setObjectiveList(List<Objectives> objectiveList) {
        this.objectiveList = objectiveList;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public String getPerspectiveId() {
        return this.perspectiveId;
    }

    public void setPerspectiveId(String perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Long getPerspectiveIdSeq() {
        return this.perspectiveIdSeq;
    }

    public void setPerspectiveIdSeq(Long perspectiveIdSeq) {
        this.perspectiveIdSeq = perspectiveIdSeq;
    }

    public boolean isIncludeReportee() {
        return this.includeReportee;
    }

    public void setIncludeReportee(boolean includeReportee) {
        this.includeReportee = includeReportee;
    }

    public String getCustomReportees() {
        return this.customReportees;
    }

    public void setCustomReportees(String customReportees) {
        this.customReportees = customReportees;
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

    public ScoreCardDetails getScoreCardDetailsId() {
        return this.scoreCardDetailsId;
    }

    public void setScoreCardDetailsId(ScoreCardDetails scoreCardDetailsId) {
        this.scoreCardDetailsId = scoreCardDetailsId;
    }
}

