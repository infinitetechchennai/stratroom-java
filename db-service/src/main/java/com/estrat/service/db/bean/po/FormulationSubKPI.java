/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationKPI
 *  com.estrat.service.db.bean.po.FormulationSubKPI
 *  com.estrat.service.db.dto.FormulationSubKPIDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationKPI;
import com.estrat.service.db.dto.FormulationSubKPIDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="formulation_subkpi", schema="orgstructure")
public class FormulationSubKPI {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="subkpi_name")
    private String subkpiName;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @ManyToOne
    @JoinColumn(name="kpi_id")
    private FormulationKPI kpiId;
    @Column(name="objective_id")
    private long objectiveId;
    @Column(name="subkpi_value")
    private String subkpiValue;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="owner")
    private Long owner;

    public FormulationSubKPI() {
    }

    public FormulationSubKPI(FormulationSubKPIDTO subkpi, FormulationKPI formulationKpi) {
        this.id = subkpi.getId();
        this.createdTime = subkpi.getCreatedTime() == null ? LocalDateTime.now() : subkpi.getCreatedTime();
        this.updatedTime = subkpi.getUpdatedTime() == null ? LocalDateTime.now() : subkpi.getUpdatedTime();
        this.createdBy = subkpi.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : subkpi.getCreatedBy();
        this.updatedBy = subkpi.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : subkpi.getUpdatedBy();
        this.objectiveId = subkpi.getObjectiveId();
        this.kpiId = formulationKpi;
        this.owner = subkpi.getOwner() == null ? Long.valueOf(UserThreadLocal.get()) : subkpi.getOwner();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subkpiName = Objects.nonNull(subkpi.getSubkpiValue().get("name")) ? subkpi.getSubkpiValue().get("name").toString() : "";
            this.subkpiValue = mapper.writeValueAsString((Object)subkpi.getSubkpiValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSubkpiName() {
        return this.subkpiName;
    }

    public void setSubkpiName(String subkpiName) {
        this.subkpiName = subkpiName;
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

    public FormulationKPI getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(FormulationKPI kpiId) {
        this.kpiId = kpiId;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public String getSubkpiValue() {
        return this.subkpiValue;
    }

    public void setSubkpiValue(String subkpiValue) {
        this.subkpiValue = subkpiValue;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }
}

