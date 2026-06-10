/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.service.db.dto.EmployeeDepartmentMappingDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.EmployeeDepartmentMapping;
import java.time.LocalDateTime;
import java.util.Date;

public class EmployeeDepartmentMappingDTO {
    private long id;
    private int active = 0;
    private String status;
    private Long empId;
    private Long deptId;
    private Date startDate;
    private Date endDate;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private String firstName;

    public EmployeeDepartmentMappingDTO() {
    }

    public EmployeeDepartmentMappingDTO(EmployeeDepartmentMapping employeeDepartmentMapping) {
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
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

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}

