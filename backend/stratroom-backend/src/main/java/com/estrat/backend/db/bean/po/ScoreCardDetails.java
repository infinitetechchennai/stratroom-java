/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.bean.po.ScoreCardDetails
 *  com.estrat.backend.db.dto.ScoreCardDetailsDTO
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
 *  javax.persistence.ManyToMany
 *  javax.persistence.ManyToOne
 *  javax.persistence.OrderBy
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.bean.po.ScoreCard;
import com.estrat.backend.db.dto.ScoreCardDetailsDTO;
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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import org.hibernate.annotations.Where;

@Entity
@Table(name="score_card_details", schema="orgstructure")
public class ScoreCardDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="score_card_details_val")
    private String scoreCardDetailsValue;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_Time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="score_name")
    private String scorecardName;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @ManyToMany(mappedBy="scoreCardDetailsId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    @OrderBy(value="id ASC")
    private List<ScoreCard> scoreCardList;
    @Column(name="department_id")
    private Long departmentId;

    public ScoreCardDetails() {
    }

    public ScoreCardDetails(ScoreCardDetailsDTO scoreCardDetailsDTO) {
        this.id = scoreCardDetailsDTO.getId();
        this.active = scoreCardDetailsDTO.getActive();
        this.owner = scoreCardDetailsDTO.getOwner();
        Long pageId = scoreCardDetailsDTO.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(scoreCardDetailsDTO.getPageId().longValue());
            this.pageId = pagesDetails;
        }
        if (scoreCardDetailsDTO.getDepartmentId() != null) {
            this.departmentId = scoreCardDetailsDTO.getDepartmentId();
        }
        this.createdBy = scoreCardDetailsDTO.getCreatedBy();
        this.updatedBy = scoreCardDetailsDTO.getUpdatedBy();
        this.createdTime = scoreCardDetailsDTO.getCreatedTime();
        this.updatedTime = scoreCardDetailsDTO.getUpdatedTime();
        this.scorecardName = scoreCardDetailsDTO.getScorecardName();
        this.startDate = scoreCardDetailsDTO.getStartDate();
        this.endDate = scoreCardDetailsDTO.getEndDate();
        this.scoreCardList = scoreCardDetailsDTO.getScoreCardDTOS() != null ? scoreCardDetailsDTO.getScoreCardDTOS().stream().map(obj -> new ScoreCard(obj)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.scoreCardDetailsValue = mapper.writeValueAsString((Object)scoreCardDetailsDTO.getScoreCardDetailsValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
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

    public String getScoreCardDetailsValue() {
        return this.scoreCardDetailsValue;
    }

    public void setScoreCardDetailsValue(String scoreCardDetailsValue) {
        this.scoreCardDetailsValue = scoreCardDetailsValue;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
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

    public String getScorecardName() {
        return this.scorecardName;
    }

    public void setScorecardName(String scorecardName) {
        this.scorecardName = scorecardName;
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

    public List<ScoreCard> getScoreCardList() {
        return this.scoreCardList;
    }

    public void setScoreCardList(List<ScoreCard> scoreCardList) {
        this.scoreCardList = scoreCardList;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}

