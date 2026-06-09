/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.InitiativesTrackerDTO
 */
package com.estrat.scorecard.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class InitiativesTrackerDTO {
    private Long id;
    private String initiativesId;
    private Long departmentId;
    private Long orgId;
    private LocalDateTime end_date;
    private String actual;
    private String target;
    private LocalDateTime created_dt;
    private Date updated_dt;
    private Long createdBy;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitiativesId() {
        return this.initiativesId;
    }

    public void setInitiativesId(String initiativesId) {
        this.initiativesId = initiativesId;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public LocalDateTime getEnd_date() {
        return this.end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }

    public String getActual() {
        return this.actual;
    }

    public void setActual(String actual) {
        this.actual = actual;
    }

    public String getTarget() {
        return this.target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreated_dt() {
        return this.created_dt;
    }

    public void setCreated_dt(LocalDateTime created_dt) {
        this.created_dt = created_dt;
    }

    public Date getUpdated_dt() {
        return this.updated_dt;
    }

    public void setUpdated_dt(Date updated_dt) {
        this.updated_dt = updated_dt;
    }
}

