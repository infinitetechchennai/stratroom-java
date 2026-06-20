/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.SubInitiativesMap
 *  com.estrat.backend.db.dto.SubInitiativesMapDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.SubInitiativesMap;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class SubInitiativesMapDTO {
    private long id;
    private long subInitiativeId;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active;
    private long empId;
    private EmployeeProfilePo employeeProfilePos;

    public SubInitiativesMapDTO() {
    }

    public SubInitiativesMapDTO(SubInitiativesMap subInitiativesMap) {
        this.id = subInitiativesMap.getId();
        this.subInitiativeId = subInitiativesMap.getSubInitiativeId().getId();
        this.empId = subInitiativesMap.getEmployeeProfilePos().getEmpId();
        this.employeeProfilePos = subInitiativesMap.getEmployeeProfilePos();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(long subInitiativeId) {
        this.subInitiativeId = subInitiativeId;
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

    public EmployeeProfilePo getEmployeeProfilePos() {
        return this.employeeProfilePos;
    }

    public void setEmployeeProfilePos(EmployeeProfilePo employeeProfilePos) {
        this.employeeProfilePos = employeeProfilePos;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }
}

