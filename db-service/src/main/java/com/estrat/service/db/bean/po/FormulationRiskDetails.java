/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationRiskDetails
 *  com.estrat.service.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.service.db.bean.po.RiskFormulation
 *  com.estrat.service.db.dto.FormulationRiskDTO
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
 *  org.apache.commons.collections4.CollectionUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationSubRiskDetails;
import com.estrat.service.db.bean.po.RiskFormulation;
import com.estrat.service.db.dto.FormulationRiskDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
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
import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="formulation_risk_details", schema="orgstructure")
public class FormulationRiskDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="risk_value")
    private String riskValue;
    @Column(name="department")
    private String department;
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
    @Column(name="impact_kpi_id")
    private Long impactId;
    @Column(name="department_id")
    private Long departmentId;
    @ManyToOne
    @JoinColumn(name="formulation_id", nullable=true)
    private RiskFormulation formulationId;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<FormulationSubRiskDetails> subRiskList;

    public FormulationRiskDetails() {
    }

    public FormulationRiskDetails(FormulationRiskDTO riskDTO) {
        this.id = riskDTO.getId();
        this.department = riskDTO.getDepartment();
        this.owner = riskDTO.getOwner();
        this.impactId = riskDTO.getImpactId();
        this.departmentId = riskDTO.getDepartmentId();
        this.createdTime = riskDTO.getCreatedTime() == null ? LocalDateTime.now() : riskDTO.getCreatedTime();
        this.updatedTime = riskDTO.getUpdatedTime() == null ? LocalDateTime.now() : riskDTO.getUpdatedTime();
        this.createdBy = riskDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskDTO.getCreatedBy();
        this.updatedBy = riskDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : riskDTO.getUpdatedBy();
        Long formulationId = riskDTO.getFormulationId();
        if (formulationId != null && formulationId != 0L) {
            RiskFormulation riskFormulation = new RiskFormulation();
            riskFormulation.setId(formulationId.longValue());
            this.formulationId = riskFormulation;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskValue = mapper.writeValueAsString((Object)riskDTO.getRiskValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getSubRiskList())) {
            this.subRiskList = riskDTO.getSubRiskList().stream().map(initiaitve -> new FormulationSubRiskDetails(initiaitve)).collect(Collectors.toList());
        }
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<FormulationSubRiskDetails> getSubRiskList() {
        return this.subRiskList;
    }

    public void setSubRiskList(List<FormulationSubRiskDetails> subRiskList) {
        this.subRiskList = subRiskList;
    }

    public RiskFormulation getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(RiskFormulation formulationId) {
        this.formulationId = formulationId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRiskValue() {
        return this.riskValue;
    }

    public void setRiskValue(String riskValue) {
        this.riskValue = riskValue;
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

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}

