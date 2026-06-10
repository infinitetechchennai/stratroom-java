/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DepartmentChartMappingHistory
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  javax.persistence.UniqueConstraint
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="department_chart_details_his", schema="orgstructure", uniqueConstraints={@UniqueConstraint(columnNames={"deptId", "year"})})
public class DepartmentChartMappingHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id", nullable=false)
    private Long id;
    @Column(name="deptId", nullable=false)
    private Long deptId;
    @Column(name="year", nullable=false)
    private Integer year;
    @Column(name="dept_name")
    private String deptName;
    @Column(name="deptParentId")
    private Long deptParentId;
    @Column(name="orgId")
    private Long orgId;
    @Column(name="scorecardPageId")
    private Long scorecardPageId;
    @Column(name="active")
    private int active;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="initiativePageId")
    private Long initiativePageId;
    @Column(name="riskPageId")
    private Long riskPageId;
    @Column(name="kpiId")
    private Long kpiId;
    @Column(name="deptImage")
    private String deptImage;
    @Column(name="owner")
    private Long owner;
    @Column(name="emailAddress")
    private String emailAddress;
    @Column(name="deptUniqueId")
    private String deptUniqueId;

    public DepartmentChartMappingHistory() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public Integer getYear() {
        return this.year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Long getDeptParentId() {
        return this.deptParentId;
    }

    public void setDeptParentId(Long deptParentId) {
        this.deptParentId = deptParentId;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Long getScorecardPageId() {
        return this.scorecardPageId;
    }

    public void setScorecardPageId(Long scorecardPageId) {
        this.scorecardPageId = scorecardPageId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public Long getInitiativePageId() {
        return this.initiativePageId;
    }

    public void setInitiativePageId(Long initiativePageId) {
        this.initiativePageId = initiativePageId;
    }

    public Long getRiskPageId() {
        return this.riskPageId;
    }

    public void setRiskPageId(Long riskPageId) {
        this.riskPageId = riskPageId;
    }

    public Long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(Long kpiId) {
        this.kpiId = kpiId;
    }

    public String getDeptImage() {
        return this.deptImage;
    }

    public void setDeptImage(String deptImage) {
        this.deptImage = deptImage;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }

    public DepartmentChartMappingHistory(DepartmentChartMapping source, Integer year) {
        this.deptId = source.getDeptId();
        this.year = year;
        this.deptName = source.getDeptName();
        this.deptParentId = source.getDeptParentId();
        this.orgId = source.getOrgId();
        this.scorecardPageId = source.getScorecardPageId();
        this.active = source.getActive();
        this.createdBy = source.getCreatedBy();
        this.updatedBy = source.getUpdatedBy();
        this.createdTime = source.getCreatedTime();
        this.updatedTime = source.getUpdatedTime();
        this.initiativePageId = source.getInitiativePageId();
        this.riskPageId = source.getRiskPageId();
        this.kpiId = source.getKpiId();
        this.deptImage = source.getDeptImage();
        this.owner = source.getOwner();
        this.emailAddress = source.getEmailAddress();
        this.deptUniqueId = source.getDeptUniqueId();
    }
}

