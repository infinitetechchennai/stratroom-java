/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeePerformanceForm
 *  com.estrat.backend.db.dto.EmployeePerformanceFormDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.EmployeePerformanceFormDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="employee_performanceform", schema="orgstructure")
public class EmployeePerformanceForm {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="performanceform_value")
    private String performanceFormValue;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="total_self")
    private int totalSelf = 0;
    @Column(name="total_manager")
    private int totalManager = 0;
    @Column(name="total_consensual")
    private int totalConsensual = 0;
    @Column(name="deptid")
    private long deptId;

    public EmployeePerformanceForm() {
    }

    public EmployeePerformanceForm(EmployeePerformanceFormDTO performance) {
        this.id = performance.getId();
        this.createdBy = performance.getCreatedBy();
        this.updatedBy = performance.getUpdatedBy();
        this.owner = performance.getOwner();
        this.createdTime = performance.getCreatedTime();
        this.updatedTime = performance.getUpdatedTime();
        this.deptId = performance.getDeptId();
        this.totalSelf = performance.getTotalSelf();
        this.totalManager = performance.getTotalManager();
        this.totalConsensual = performance.getTotalConsensual();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.performanceFormValue = mapper.writeValueAsString((Object)performance.getPerformanceFormValue());
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

    public String getPerformanceFormValue() {
        return this.performanceFormValue;
    }

    public void setPerformanceFormValue(String performanceFormValue) {
        this.performanceFormValue = performanceFormValue;
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

    public int getTotalSelf() {
        return this.totalSelf;
    }

    public void setTotalSelf(int totalSelf) {
        this.totalSelf = totalSelf;
    }

    public int getTotalManager() {
        return this.totalManager;
    }

    public void setTotalManager(int totalManager) {
        this.totalManager = totalManager;
    }

    public int getTotalConsensual() {
        return this.totalConsensual;
    }

    public void setTotalConsensual(int totalConsensual) {
        this.totalConsensual = totalConsensual;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }
}

