/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativesTracker
 *  com.estrat.service.db.dto.InitiativesTrackerDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.InitiativesTrackerDTO;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="initiatives_tracker", schema="orgstructure")
public class InitiativesTracker {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="Id")
    private Long id;
    @Column(name="initiative_id")
    private String initiative_id;
    @Column(name="org_id")
    private Long orgId;
    @Column(name="end_date")
    private LocalDateTime end_date;
    @Column(name="actual")
    private String actual;
    @Column(name="target")
    private String target;
    @Column(name="created_dt", updatable=false)
    private LocalDateTime created_dt;
    @Column(name="updated_dt")
    private LocalDateTime updated_dt;
    @Column(name="created_by")
    private Long createdBy;

    public InitiativesTracker(InitiativesTrackerDTO initiativesTracker) {
        this.id = initiativesTracker.getId();
        this.initiative_id = initiativesTracker.getInitiativesId();
        this.createdBy = initiativesTracker.getCreatedBy();
        this.created_dt = initiativesTracker.getCreated_dt();
        this.actual = initiativesTracker.getActual();
        this.target = initiativesTracker.getTarget();
        this.end_date = initiativesTracker.getEnd_date();
        this.orgId = initiativesTracker.getOrgId();
    }

    public InitiativesTracker() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitiative_id() {
        return this.initiative_id;
    }

    public void setInitiative_id(String initiative_id) {
        this.initiative_id = initiative_id;
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

    public LocalDateTime getCreated_dt() {
        return this.created_dt;
    }

    public void setCreated_dt(LocalDateTime created_dt) {
        this.created_dt = created_dt;
    }

    public LocalDateTime getUpdated_dt() {
        return this.updated_dt;
    }

    public void setUpdated_dt(LocalDateTime updated_dt) {
        this.updated_dt = updated_dt;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}

