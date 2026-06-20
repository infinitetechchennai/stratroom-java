/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationInitiatives
 *  com.estrat.backend.db.bean.po.FormulationSubInitiatives
 *  com.estrat.backend.db.bean.po.ProjectFormulation
 *  com.estrat.backend.db.dto.FormulationInitiativesDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
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
 *  org.apache.commons.collections4.CollectionUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.FormulationSubInitiatives;
import com.estrat.backend.db.bean.po.ProjectFormulation;
import com.estrat.backend.db.dto.FormulationInitiativesDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
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
import org.apache.commons.collections4.CollectionUtils;

@Entity
@Table(name="formulation_initiatives", schema="orgstructure")
public class FormulationInitiatives {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="initiative_value")
    private String initiativeValue;
    @Column(name="impact_kpi_id")
    private Long impactId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @ManyToOne
    @JoinColumn(name="formulation_id")
    private ProjectFormulation formulationId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="department")
    private String department;
    @Column(name="department_id")
    private Long departmentId;
    @OneToMany(mappedBy="initiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<FormulationSubInitiatives> subInitiativeList;

    public FormulationInitiatives() {
    }

    public FormulationInitiatives(FormulationInitiativesDTO initiativesDTO, boolean flag) {
        this.id = initiativesDTO.getId();
        this.createdTime = initiativesDTO.getCreatedTime() == null ? LocalDateTime.now() : initiativesDTO.getCreatedTime();
        this.updatedTime = initiativesDTO.getUpdatedTime() == null ? LocalDateTime.now() : initiativesDTO.getUpdatedTime();
        this.createdBy = initiativesDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : initiativesDTO.getCreatedBy();
        this.updatedBy = initiativesDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : initiativesDTO.getUpdatedBy();
        this.active = initiativesDTO.getActive();
        this.owner = initiativesDTO.getOwner();
        this.impactId = initiativesDTO.getImpactId();
        this.startDate = initiativesDTO.getStartDate();
        this.endDate = initiativesDTO.getEndDate();
        this.departmentId = initiativesDTO.getDepartmentId();
        String department = Objects.nonNull(initiativesDTO.getInitiativeValue().get("department")) ? initiativesDTO.getInitiativeValue().get("department").toString() : "";
        String string = this.department = initiativesDTO.getDepartment() == null ? department : initiativesDTO.getDepartment();
        if (initiativesDTO.getFormulationId() != 0L) {
            ProjectFormulation projectFormulation = new ProjectFormulation();
            projectFormulation.setId(initiativesDTO.getFormulationId());
            this.formulationId = projectFormulation;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.initiativeValue = mapper.writeValueAsString((Object)initiativesDTO.getInitiativeValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList()) && flag) {
            this.subInitiativeList = initiativesDTO.getSubInitiativeList().stream().map(initiaitve -> new FormulationSubInitiatives(initiaitve)).collect(Collectors.toList());
        }
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public ProjectFormulation getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(ProjectFormulation formulationId) {
        this.formulationId = formulationId;
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

    public List<FormulationSubInitiatives> getSubInitiativeList() {
        return this.subInitiativeList;
    }

    public void setSubInitiativeList(List<FormulationSubInitiatives> subInitiativeList) {
        this.subInitiativeList = subInitiativeList;
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
}

