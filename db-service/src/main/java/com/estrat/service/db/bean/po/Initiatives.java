/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesDetails
 *  com.estrat.service.db.bean.po.Comments
 *  com.estrat.service.db.bean.po.InitiativeAttachment
 *  com.estrat.service.db.bean.po.InitiativeTask
 *  com.estrat.service.db.bean.po.Initiatives
 *  com.estrat.service.db.bean.po.Milestones
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.SubInitiatives
 *  com.estrat.service.db.dto.InitiativesDTO
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
 *  javax.persistence.OneToMany
 *  javax.persistence.OneToOne
 *  javax.persistence.Table
 *  javax.persistence.Transient
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ActivitiesDetails;
import com.estrat.service.db.bean.po.Comments;
import com.estrat.service.db.bean.po.InitiativeAttachment;
import com.estrat.service.db.bean.po.InitiativeTask;
import com.estrat.service.db.bean.po.Milestones;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.bean.po.SubInitiatives;
import com.estrat.service.db.dto.InitiativesDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="initiatives_details", schema="orgstructure")
public class Initiatives {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="initiative_value")
    private String initiativeValue;
    @Column(name="initiative_id_seq", updatable=false)
    private Long initiativeIdSeq;
    @Column(name="initiative_id")
    private String initiativeId;
    @Column(name="impact_kpi_id")
    private Long impactId;
    @Column(name="perspective_id")
    private Long perspectiveId;
    @Column(name="scorecard_id")
    private Long scorecardDetailId;
    @Column(name="objective_id")
    private Long objectiveId;
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @OneToMany(mappedBy="initiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<SubInitiatives> subInitiativeList;
    @OneToMany(mappedBy="activitiesInitiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<ActivitiesDetails> activitiesList;
    @OneToMany(mappedBy="commentsInitiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<Comments> commentsList;
    @OneToMany(mappedBy="milestonesInitiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<Milestones> mileStonesList;
    @OneToMany(mappedBy="initiativesId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<InitiativeAttachment> attachmentList;
    @OneToMany(mappedBy="initiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<InitiativeTask> taskList;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="department_id")
    private Long departmentId;
    @Transient
    private String endDatePeriod;

    public Initiatives() {
    }

    public Initiatives(InitiativesDTO initiativesDTO) {
        this.id = initiativesDTO.getId();
        this.createdTime = initiativesDTO.getCreatedTime();
        this.active = initiativesDTO.getActive();
        this.owner = initiativesDTO.getOwner();
        this.updatedTime = initiativesDTO.getUpdatedTime();
        this.createdBy = initiativesDTO.getCreatedBy();
        this.updatedBy = initiativesDTO.getUpdatedBy();
        this.impactId = initiativesDTO.getImpactId();
        this.startDate = initiativesDTO.getStartDate();
        this.endDate = initiativesDTO.getEndDate();
        this.endDatePeriod = initiativesDTO.getEndDatePeriod();
        this.scorecardDetailId = initiativesDTO.getScorecardDetailId();
        this.perspectiveId = initiativesDTO.getPerspectiveId();
        this.objectiveId = initiativesDTO.getObjectiveId();
        if (null != initiativesDTO.getInitiativeId()) {
            this.initiativeId = initiativesDTO.getInitiativeId();
        }
        if (initiativesDTO.getPageId() != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(initiativesDTO.getPageId());
            this.pageId = pagesDetails;
        }
        if (initiativesDTO.getDepartmentId() != null) {
            this.departmentId = initiativesDTO.getDepartmentId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.initiativeValue = mapper.writeValueAsString((Object)initiativesDTO.getInitiativeValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Long getInitiativeIdSeq() {
        return this.initiativeIdSeq;
    }

    public void setInitiativeIdSeq(Long initiativeIdSeq) {
        this.initiativeIdSeq = initiativeIdSeq;
    }

    public String getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(String initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public String getInitiativeValue() {
        return this.initiativeValue;
    }

    public void setInitiativeValue(String initiativeValue) {
        this.initiativeValue = initiativeValue;
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

    public List<SubInitiatives> getSubInitiativeList() {
        return this.subInitiativeList;
    }

    public void setSubInitiativeList(List<SubInitiatives> subInitiativeList) {
        this.subInitiativeList = subInitiativeList;
    }

    public List<ActivitiesDetails> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(List<ActivitiesDetails> activitiesList) {
        this.activitiesList = activitiesList;
    }

    public List<Comments> getCommentsList() {
        return this.commentsList;
    }

    public void setCommentsList(List<Comments> commentsList) {
        this.commentsList = commentsList;
    }

    public List<Milestones> getMileStonesList() {
        return this.mileStonesList;
    }

    public void setMileStonesList(List<Milestones> mileStonesList) {
        this.mileStonesList = mileStonesList;
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

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getEndDatePeriod() {
        return this.endDatePeriod;
    }

    public void setEndDatePeriod(String endDatePeriod) {
        this.endDatePeriod = endDatePeriod;
    }

    public Long getPerspectiveId() {
        return this.perspectiveId;
    }

    public void setPerspectiveId(Long perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Long getScorecardDetailId() {
        return this.scorecardDetailId;
    }

    public void setScorecardDetailId(Long scorecardDetailId) {
        this.scorecardDetailId = scorecardDetailId;
    }

    public Long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(Long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public List<InitiativeAttachment> getAttachmentList() {
        return this.attachmentList;
    }

    public void setAttachmentList(List<InitiativeAttachment> attachmentList) {
        this.attachmentList = attachmentList;
    }

    public List<InitiativeTask> getTaskList() {
        return this.taskList;
    }

    public void setTaskList(List<InitiativeTask> taskList) {
        this.taskList = taskList;
    }

    public String toString() {
        return "Initiatives [id=" + this.id + ", initiativeValue=" + this.initiativeValue + ", initiativeIdSeq=" + this.initiativeIdSeq + ", initiativeId=" + this.initiativeId + ", impactId=" + this.impactId + ", perspectiveId=" + this.perspectiveId + ", scorecardDetailId=" + this.scorecardDetailId + ", objectiveId=" + this.objectiveId + ", pageId=" + this.pageId + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", active=" + this.active + ", owner=" + this.owner + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", subInitiativeList=" + this.subInitiativeList + ", activitiesList=" + this.activitiesList + ", commentsList=" + this.commentsList + ", mileStonesList=" + this.mileStonesList + ", attachmentList=" + this.attachmentList + ", taskList=" + this.taskList + ", startDate=" + this.startDate + ", endDate=" + this.endDate + ", departmentId=" + this.departmentId + ", endDatePeriod=" + this.endDatePeriod + "]";
    }
}

