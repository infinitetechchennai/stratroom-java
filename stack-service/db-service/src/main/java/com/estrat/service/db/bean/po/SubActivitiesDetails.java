/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubActivitiesDetails
 *  com.estrat.service.db.dto.SubActivitiesDTO
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

import com.estrat.service.db.dto.SubActivitiesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="subactivities_details", schema="orgstructure")
public class SubActivitiesDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="activities_value")
    private String activitiesValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @Column(name="activity_id")
    private long activitieId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;

    public SubActivitiesDetails() {
    }

    public SubActivitiesDetails(SubActivitiesDTO subactivitiesDTO) {
        this.id = subactivitiesDTO.getId();
        this.activitieId = subactivitiesDTO.getActivitieId();
        this.active = subactivitiesDTO.getActive();
        this.createdTime = subactivitiesDTO.getCreatedTime();
        this.createdBy = subactivitiesDTO.getCreatedBy();
        this.updatedBy = subactivitiesDTO.getUpdatedBy();
        this.owner = subactivitiesDTO.getOwner();
        this.updatedTime = subactivitiesDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activitiesValue = mapper.writeValueAsString((Object)subactivitiesDTO.getActivitiesValue());
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

    public String getActivitiesValue() {
        return this.activitiesValue;
    }

    public void setActivitiesValue(String activitiesValue) {
        this.activitiesValue = activitiesValue;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getActivitieId() {
        return this.activitieId;
    }

    public void setActivitieId(long activitieId) {
        this.activitieId = activitieId;
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
}

