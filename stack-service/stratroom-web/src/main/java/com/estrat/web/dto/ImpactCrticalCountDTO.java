/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ImpactCrticalCountDTO
 */
package com.estrat.web.dto;

public class ImpactCrticalCountDTO {
    private Long id;
    private int critical;
    private int nonCritical;
    private int processCount;
    private double criticalPercentage;
    private double nonCriticalPercentage;
    private String departmentName;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCritical() {
        return this.critical;
    }

    public void setCritical(int critical) {
        this.critical = critical;
    }

    public int getNonCritical() {
        return this.nonCritical;
    }

    public void setNonCritical(int nonCritical) {
        this.nonCritical = nonCritical;
    }

    public int getProcessCount() {
        return this.processCount;
    }

    public void setProcessCount(int processCount) {
        this.processCount = processCount;
    }

    public double getCriticalPercentage() {
        return this.criticalPercentage;
    }

    public void setCriticalPercentage(double criticalPercentage) {
        this.criticalPercentage = criticalPercentage;
    }

    public double getNonCriticalPercentage() {
        return this.nonCriticalPercentage;
    }

    public void setNonCriticalPercentage(double nonCriticalPercentage) {
        this.nonCriticalPercentage = nonCriticalPercentage;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}

