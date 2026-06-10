/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.ProjectFormulationUserMapping
 *  com.estrat.service.db.bean.po.ProjectPlanning
 *  com.estrat.service.db.dto.ProjectPlanningDTO
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

import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.bean.po.ProjectFormulationUserMapping;
import com.estrat.service.db.dto.ProjectPlanningDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;
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

@Entity
@Table(name="project_planning", schema="orgstructure")
public class ProjectPlanning {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
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
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="planningvalue")
    private String planningValue;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="department_id")
    private Long departmentId;
    @Column(name="initiative_id")
    private Long initiativeId;
    @Column(name="initiativepage_id")
    private Long initiativePageId;
    @OneToMany(mappedBy="id.projectFormulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private Set<ProjectFormulationUserMapping> employeeList;

    public ProjectPlanning() {
    }

    public ProjectPlanning(ProjectPlanningDTO planing) {
        this.id = planing.getId();
        this.active = planing.getActive();
        this.owner = planing.getOwner();
        this.createdBy = planing.getCreatedBy();
        this.updatedBy = planing.getUpdatedBy();
        this.createdTime = planing.getCreatedTime();
        this.updatedTime = planing.getUpdatedTime();
        this.startDate = planing.getStartDate();
        this.endDate = planing.getEndDate();
        this.departmentId = planing.getDepartmentId();
        this.initiativePageId = planing.getInitiativePageId();
        Long pageId = planing.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(planing.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.planningValue = mapper.writeValueAsString((Object)planing.getPlanningValue());
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

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public String getPlanningValue() {
        return this.planningValue;
    }

    public void setPlanningValue(String planningValue) {
        this.planningValue = planningValue;
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

    public Long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(Long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Set<ProjectFormulationUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<ProjectFormulationUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public Long getInitiativePageId() {
        return this.initiativePageId;
    }

    public void setInitiativePageId(Long initiativePageId) {
        this.initiativePageId = initiativePageId;
    }
}

