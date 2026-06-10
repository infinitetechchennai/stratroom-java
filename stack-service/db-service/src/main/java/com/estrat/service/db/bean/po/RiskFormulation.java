/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationRiskDetails
 *  com.estrat.service.db.bean.po.RiskFormulation
 *  com.estrat.service.db.bean.po.RiskFormulationUserMapping
 *  com.estrat.service.db.dto.RiskFormulationDTO
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

import com.estrat.service.db.bean.po.FormulationRiskDetails;
import com.estrat.service.db.bean.po.RiskFormulationUserMapping;
import com.estrat.service.db.dto.RiskFormulationDTO;
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
@Table(name="risk_formulation", schema="orgstructure")
public class RiskFormulation {
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
    private List<FormulationRiskDetails> riskList;
    @OneToMany(mappedBy="id.riskFormulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private Set<RiskFormulationUserMapping> employeeList;

    public RiskFormulation() {
    }

    public RiskFormulation(RiskFormulationDTO riskFormulationDTO) {
        this.id = riskFormulationDTO.getId();
        this.createdTime = riskFormulationDTO.getCreatedTime() == null ? LocalDateTime.now() : riskFormulationDTO.getCreatedTime();
        this.updatedTime = riskFormulationDTO.getUpdatedTime() == null ? LocalDateTime.now() : riskFormulationDTO.getUpdatedTime();
        this.createdBy = riskFormulationDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskFormulationDTO.getCreatedBy();
        this.updatedBy = riskFormulationDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskFormulationDTO.getUpdatedBy();
        this.approvedBy = riskFormulationDTO.getApprovedBy();
        this.status = riskFormulationDTO.getStatus() == null ? "Pending" : riskFormulationDTO.getStatus();
    }

    public Set<RiskFormulationUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<RiskFormulationUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public List<FormulationRiskDetails> getRiskList() {
        return this.riskList;
    }

    public void setRiskList(List<FormulationRiskDetails> riskList) {
        this.riskList = riskList;
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

