/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Milestones
 *  com.estrat.backend.db.dto.MilestonesDTO
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

import com.estrat.backend.db.dto.MilestonesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="milestones_details", schema="orgstructure")
public class Milestones {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="milestones_value")
    private String milestonesValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @Column(name="initiative_id")
    private long milestonesInitiativeId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;

    public Milestones() {
    }

    public Milestones(MilestonesDTO milestonesDTO) {
        this.id = milestonesDTO.getId();
        this.milestonesInitiativeId = milestonesDTO.getInitiativeId();
        this.active = milestonesDTO.getActive();
        this.createdTime = milestonesDTO.getCreatedTime();
        this.createdBy = milestonesDTO.getCreatedBy();
        this.updatedBy = milestonesDTO.getUpdatedBy();
        this.owner = milestonesDTO.getOwner();
        this.updatedTime = milestonesDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.milestonesValue = mapper.writeValueAsString((Object)milestonesDTO.getMileStonesValue());
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

    public String getMilestonesValue() {
        return this.milestonesValue;
    }

    public void setMilestonesValue(String milestonesValue) {
        this.milestonesValue = milestonesValue;
    }

    public long getMilestonesInitiativeId() {
        return this.milestonesInitiativeId;
    }

    public void setMilestonesInitiativeId(long milestonesInitiativeId) {
        this.milestonesInitiativeId = milestonesInitiativeId;
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
}

