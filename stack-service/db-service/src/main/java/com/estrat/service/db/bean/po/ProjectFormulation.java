/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationInitiatives
 *  com.estrat.service.db.bean.po.ProjectFormulation
 *  com.estrat.service.db.bean.po.ProjectFormulationUserMapping
 *  com.estrat.service.db.dto.ProjectFormulationDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationInitiatives;
import com.estrat.service.db.bean.po.ProjectFormulationUserMapping;
import com.estrat.service.db.dto.ProjectFormulationDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="project_formulation", schema="orgstructure")
public class ProjectFormulation {
    @Id
    @GenericGenerator(name="formulationKey", strategy="assigned")
    @GeneratedValue(generator="formulationKey")
    @Column(name="id")
    private long id;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="approved_by")
    private long approvedBy;
    @Column(name="status")
    private String status;
    @OneToMany(mappedBy="formulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<FormulationInitiatives> initiativesList;
    @OneToMany(mappedBy="id.projectFormulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private Set<ProjectFormulationUserMapping> employeeList;

    public ProjectFormulation() {
    }

    public ProjectFormulation(ProjectFormulationDTO projectFormulationDTO) {
        this.id = projectFormulationDTO.getId();
        this.createdTime = projectFormulationDTO.getCreatedTime() == null ? LocalDateTime.now() : projectFormulationDTO.getCreatedTime();
        this.updatedTime = projectFormulationDTO.getUpdatedTime() == null ? LocalDateTime.now() : projectFormulationDTO.getUpdatedTime();
        this.createdBy = projectFormulationDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : projectFormulationDTO.getCreatedBy();
        this.updatedBy = projectFormulationDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : projectFormulationDTO.getUpdatedBy();
        this.approvedBy = projectFormulationDTO.getApprovedBy();
        this.status = projectFormulationDTO.getStatus() == null ? "Pending" : projectFormulationDTO.getStatus();
    }

    public Set<ProjectFormulationUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<ProjectFormulationUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public List<FormulationInitiatives> getInitiativesList() {
        return this.initiativesList;
    }

    public void setInitiativesList(List<FormulationInitiatives> initiativesList) {
        this.initiativesList = initiativesList;
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

    public long getApprovedBy() {
        return this.approvedBy;
    }

    public void setApprovedBy(long approvedBy) {
        this.approvedBy = approvedBy;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

