/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePerformanceForm
 *  com.estrat.service.db.dto.EmployeePerformanceFormDTO
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.EmployeePerformanceFormDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="employee_performanceform", schema="orgstructure")
public class EmployeePerformanceForm {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="performanceform_value")
    private String performanceFormValue;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
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

