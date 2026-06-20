/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationKPI
 *  com.estrat.backend.db.bean.po.FormulationObjectives
 *  com.estrat.backend.db.bean.po.FormulationSubKPI
 *  com.estrat.backend.db.dto.FormulationKPIDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
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
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.FormulationObjectives;
import com.estrat.backend.db.bean.po.FormulationSubKPI;
import com.estrat.backend.db.dto.FormulationKPIDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collections;
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

@Entity
@Table(name="formulation_kpi", schema="orgstructure")
public class FormulationKPI {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="kpi_name")
    private String kpiName;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @ManyToOne
    @JoinColumn(name="objective_id")
    private FormulationObjectives objectiveId;
    @Column(name="kpi_value")
    private String kpiValue;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="owner")
    private Long owner;
    @OneToMany(cascade={CascadeType.ALL}, mappedBy="kpiId", fetch=FetchType.LAZY)
    private List<FormulationSubKPI> subkpiList;

    public FormulationKPI() {
    }

    public FormulationKPI(FormulationKPIDTO kpi, FormulationObjectives formulationObjectives) {
        this.id = kpi.getId();
        this.createdTime = kpi.getCreatedTime() == null ? LocalDateTime.now() : kpi.getCreatedTime();
        this.updatedTime = kpi.getUpdatedTime() == null ? LocalDateTime.now() : kpi.getUpdatedTime();
        this.createdBy = kpi.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : kpi.getCreatedBy();
        this.updatedBy = kpi.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : kpi.getUpdatedBy();
        this.objectiveId = formulationObjectives;
        this.subkpiList = kpi.getSubKpiList() != null ? kpi.getSubKpiList().stream().map(newkpi -> new FormulationSubKPI(newkpi, this)).collect(Collectors.toList()) : Collections.emptyList();
        this.owner = kpi.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : kpi.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.kpiName = Objects.nonNull(kpi.getKpiValue().get("name")) ? kpi.getKpiValue().get("name").toString() : "";
            this.kpiValue = mapper.writeValueAsString((Object)kpi.getKpiValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
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

    public FormulationObjectives getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(FormulationObjectives objectiveId) {
        this.objectiveId = objectiveId;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
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

    public String getKpiValue() {
        return this.kpiValue;
    }

    public void setKpiValue(String kpiValue) {
        this.kpiValue = kpiValue;
    }

    public List<FormulationSubKPI> getSubkpiList() {
        return this.subkpiList;
    }

    public void setSubkpiList(List<FormulationSubKPI> subkpiList) {
        this.subkpiList = subkpiList;
    }
}

