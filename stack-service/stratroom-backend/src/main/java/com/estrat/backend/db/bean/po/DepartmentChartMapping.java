/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DepartmentChartMappingHistory
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.DepartmentChartMappingHistory;
import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="department_chart_details", schema="orgstructure")
public class DepartmentChartMapping {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="deptId")
    private Long deptId;
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
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @OneToMany(mappedBy="deptId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="status='Active'")
    List<EmployeeDepartmentMapping> employeeDepartmentMappingList;
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

    public DepartmentChartMapping() {
    }

    public DepartmentChartMapping(DepartmentChartDTO departmentChartMapping) {
        this.deptId = departmentChartMapping.getDeptId();
        this.deptName = departmentChartMapping.getDeptName();
        this.deptParentId = departmentChartMapping.getDeptParentId();
        if (departmentChartMapping.getScorecardPageId() != null) {
            this.scorecardPageId = departmentChartMapping.getScorecardPageId();
        }
        if (departmentChartMapping.getInitiativePageId() != null) {
            this.initiativePageId = departmentChartMapping.getInitiativePageId();
        }
        if (departmentChartMapping.getRiskPageId() != null) {
            this.riskPageId = departmentChartMapping.getRiskPageId();
        }
        if (departmentChartMapping.getKpiId() != null) {
            this.kpiId = departmentChartMapping.getKpiId();
        }
        this.active = departmentChartMapping.getActive();
        this.orgId = departmentChartMapping.getOrgId();
        this.createdBy = departmentChartMapping.getCreatedBy();
        this.updatedBy = departmentChartMapping.getUpdatedBy();
        this.createdTime = departmentChartMapping.getCreatedTime();
        this.updatedTime = departmentChartMapping.getUpdatedTime();
        this.deptImage = departmentChartMapping.getDeptImage();
        this.deptUniqueId = departmentChartMapping.getDeptUniqueId();
        this.owner = departmentChartMapping.getOwner();
        if (departmentChartMapping.getEmailAddress() != null) {
            this.emailAddress = departmentChartMapping.getEmailAddress();
        }
    }

    public DepartmentChartMapping(DepartmentChartMappingHistory departmentChartMappingHistory) {
        this.deptId = departmentChartMappingHistory.getDeptId();
        this.deptName = departmentChartMappingHistory.getDeptName();
        this.deptParentId = departmentChartMappingHistory.getDeptParentId();
        this.scorecardPageId = departmentChartMappingHistory.getScorecardPageId();
        this.initiativePageId = departmentChartMappingHistory.getInitiativePageId();
        this.riskPageId = departmentChartMappingHistory.getRiskPageId();
        this.kpiId = departmentChartMappingHistory.getKpiId();
        this.active = departmentChartMappingHistory.getActive();
        this.orgId = departmentChartMappingHistory.getOrgId();
        this.createdBy = departmentChartMappingHistory.getCreatedBy();
        this.updatedBy = departmentChartMappingHistory.getUpdatedBy();
        this.createdTime = departmentChartMappingHistory.getCreatedTime();
        this.updatedTime = departmentChartMappingHistory.getUpdatedTime();
        this.deptImage = departmentChartMappingHistory.getDeptImage();
        this.deptUniqueId = departmentChartMappingHistory.getDeptUniqueId();
        this.owner = departmentChartMappingHistory.getOwner();
        this.emailAddress = departmentChartMappingHistory.getEmailAddress();
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
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

    public List<EmployeeDepartmentMapping> getEmployeeDepartmentMappingList() {
        return this.employeeDepartmentMappingList;
    }

    public void setEmployeeDepartmentMappingList(List<EmployeeDepartmentMapping> employeeDepartmentMappingList) {
        this.employeeDepartmentMappingList = employeeDepartmentMappingList;
    }

    public Long getScorecardPageId() {
        return this.scorecardPageId;
    }

    public void setScorecardPageId(Long scorecardPageId) {
        this.scorecardPageId = scorecardPageId;
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

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }
}

