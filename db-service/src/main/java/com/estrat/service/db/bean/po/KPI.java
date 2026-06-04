/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.SubKPI
 *  com.estrat.service.db.dto.KPIDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.SubKPI;
import com.estrat.service.db.dto.KPIDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.Where;

@Entity
@Table(name="kpi", schema="orgstructure")
public class KPI {
    @Column(name="org_id")
    private long orgId;
    @Id
    @Column(name="ID")
    private long id;
    @Column(name="kpi_name")
    private String kpiName;
    @Column(name="kpi_id_sequence", updatable=false)
    private Long kpiIdSequence;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="active")
    private int active;
    @Column(name="owner")
    private long owner;
    @Column(name="objective_id")
    private long objectiveId;
    @Column(name="kpi_value")
    private String kpiValue;
    @Column(name="kpi_id")
    private String kpiId;
    @Column(name="include_reportee")
    private boolean includeReportee;
    @Column(name="custom_repotees")
    private String customReportees;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="act_type")
    private int actType;
    @OneToMany(mappedBy="kpiId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<SubKPI> subKpiList;

    public KPI() {
    }

    public KPI(KPIDTO kpi) {
        this.id = kpi.getId();
        this.createdTime = kpi.getCreatedTime();
        this.updatedTime = kpi.getUpdatedTime();
        this.active = kpi.getActive();
        this.owner = kpi.getOwner();
        this.createdBy = kpi.getCreatedBy();
        this.updatedBy = kpi.getUpdatedBy();
        this.kpiId = kpi.getKpiId();
        this.objectiveId = kpi.getObjectiveId();
        this.includeReportee = kpi.isIncludeReportee();
        this.customReportees = kpi.getCustomReportees();
        this.startDate = kpi.getStartDate();
        this.endDate = kpi.getEndDate();
        this.actType = kpi.getActType();
        this.orgId = kpi.getOrgId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.kpiName = Objects.nonNull(kpi.getKpiValue().get("name")) ? kpi.getKpiValue().get("name").toString() : "";
            this.kpiValue = mapper.writeValueAsString((Object)kpi.getKpiValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public Long getKpiIdSequence() {
        return this.kpiIdSequence;
    }

    public void setKpiIdSequence(Long kpiIdSequence) {
        this.kpiIdSequence = kpiIdSequence;
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

    public String getKpiValue() {
        return this.kpiValue;
    }

    public void setKpiValue(String kpiValue) {
        this.kpiValue = kpiValue;
    }

    public String getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(String kpiId) {
        this.kpiId = kpiId;
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

    public int getActType() {
        return this.actType;
    }

    public void setActType(int actType) {
        this.actType = actType;
    }

    public List<SubKPI> getSubKpiList() {
        return this.subKpiList;
    }

    public void setSubKpiList(List<SubKPI> subKpiList) {
        this.subKpiList = subKpiList;
    }
}

