/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubKPI
 *  com.estrat.service.db.dto.SubKPIDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.SubKPIDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="subkpi", schema="orgstructure")
public class SubKPI {
    @Id
    @Column(name="ID")
    private long id;
    @Column(name="org_id")
    private long orgId;
    @Column(name="sub_kpi_name")
    private String subKpiName;
    @Column(name="sub_kpi_id_sequence", updatable=false)
    private Long subKpiIdSequence;
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
    @Column(name="subkpi_value")
    private String subKpiValue;
    @Column(name="subkpi_id")
    private String subKpiId;
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
    @Column(name="kpi_id")
    private long kpiId;
    @Column(name="objective_id")
    private long objectiveId;

    public SubKPI() {
    }

    public SubKPI(SubKPIDTO SubKpiDTO) {
        this.id = SubKpiDTO.getId();
        this.createdTime = SubKpiDTO.getCreatedTime();
        this.updatedTime = SubKpiDTO.getUpdatedTime();
        this.active = SubKpiDTO.getActive();
        this.owner = SubKpiDTO.getOwner();
        this.createdBy = SubKpiDTO.getCreatedBy();
        this.updatedBy = SubKpiDTO.getUpdatedBy();
        this.subKpiId = SubKpiDTO.getSubKpiId();
        this.includeReportee = SubKpiDTO.isIncludeReportee();
        this.customReportees = SubKpiDTO.getCustomReportees();
        this.startDate = SubKpiDTO.getStartDate();
        this.endDate = SubKpiDTO.getEndDate();
        this.actType = SubKpiDTO.getActType();
        this.orgId = SubKpiDTO.getOrgId();
        this.kpiId = SubKpiDTO.getKpiId();
        this.objectiveId = SubKpiDTO.getObjectiveId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subKpiName = Objects.nonNull(SubKpiDTO.getSubKpiValue().get("subMeasureName")) ? SubKpiDTO.getSubKpiValue().get("subMeasureName").toString() : "";
            this.subKpiValue = mapper.writeValueAsString((Object)SubKpiDTO.getSubKpiValue());
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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getSubKpiName() {
        return this.subKpiName;
    }

    public void setSubKpiName(String subKpiName) {
        this.subKpiName = subKpiName;
    }

    public Long getSubKpiIdSequence() {
        return this.subKpiIdSequence;
    }

    public void setSubKpiIdSequence(Long subKpiIdSequence) {
        this.subKpiIdSequence = subKpiIdSequence;
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

    public String getSubKpiValue() {
        return this.subKpiValue;
    }

    public void setSubKpiValue(String subKpiValue) {
        this.subKpiValue = subKpiValue;
    }

    public String getSubKpiId() {
        return this.subKpiId;
    }

    public void setSubKpiId(String subKpiId) {
        this.subKpiId = subKpiId;
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

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }
}

