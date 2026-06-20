/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="employee_department_mapping", schema="orgstructure")
public class EmployeeDepartmentMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private Integer active = 0;
    @Column(name="status")
    private String status;
    @Column(name="empId")
    private Long empId;
    @Column(name="firstName")
    private String firstName;
    @Column(name="deptId")
    private Long deptId;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;

    public EmployeeDepartmentMapping() {
    }

    public EmployeeDepartmentMapping(EmployeeDepartmentMappingDTO employeeDepartmentMapping) {
        this.id = employeeDepartmentMapping.getId();
        this.active = employeeDepartmentMapping.getActive();
        this.status = employeeDepartmentMapping.getStatus();
        this.empId = employeeDepartmentMapping.getEmpId();
        this.deptId = employeeDepartmentMapping.getDeptId();
        this.startDate = employeeDepartmentMapping.getStartDate();
        this.endDate = employeeDepartmentMapping.getEndDate();
        this.createdTime = employeeDepartmentMapping.getCreatedTime();
        this.updatedTime = employeeDepartmentMapping.getUpdatedTime();
        this.createdBy = employeeDepartmentMapping.getCreatedBy();
        this.updatedBy = employeeDepartmentMapping.getUpdatedBy();
        this.firstName = employeeDepartmentMapping.getFirstName();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getActive() {
        return this.active;
    }

    public void setActive(Integer active) {
        this.active = active;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getEmpId() {
        return this.empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
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

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}

