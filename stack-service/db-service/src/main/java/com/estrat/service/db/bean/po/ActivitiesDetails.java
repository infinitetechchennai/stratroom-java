/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesDetails
 *  com.estrat.service.db.bean.po.ActivitiesMap
 *  com.estrat.service.db.bean.po.SubActivitiesDetails
 *  com.estrat.service.db.dto.ActivitiesDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ActivitiesMap;
import com.estrat.service.db.bean.po.SubActivitiesDetails;
import com.estrat.service.db.dto.ActivitiesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="activities_details", schema="orgstructure")
public class ActivitiesDetails {
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
    @Column(name="initiative_id")
    private long activitiesInitiativeId;
    @Column(name="subinitiative_id")
    private long subInitiativeId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @OneToMany(mappedBy="activitiesId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<ActivitiesMap> activitiesMaps;
    @OneToMany(mappedBy="activitieId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<SubActivitiesDetails> subActivityList;

    public ActivitiesDetails() {
    }

    public ActivitiesDetails(ActivitiesDTO activitiesDTO) {
        this.id = activitiesDTO.getId();
        this.activitiesInitiativeId = activitiesDTO.getInitiativeId();
        this.active = activitiesDTO.getActive();
        this.createdTime = activitiesDTO.getCreatedTime();
        this.createdBy = activitiesDTO.getCreatedBy();
        this.updatedBy = activitiesDTO.getUpdatedBy();
        this.owner = activitiesDTO.getOwner();
        this.updatedTime = activitiesDTO.getUpdatedTime();
        this.subInitiativeId = activitiesDTO.getSubInitiativeId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activitiesValue = mapper.writeValueAsString((Object)activitiesDTO.getActivitiesValue());
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

    public String getActivitiesValue() {
        return this.activitiesValue;
    }

    public void setActivitiesValue(String activitiesValue) {
        this.activitiesValue = activitiesValue;
    }

    public long getActivitiesInitiativeId() {
        return this.activitiesInitiativeId;
    }

    public void setActivitiesInitiativeId(long activitiesInitiativeId) {
        this.activitiesInitiativeId = activitiesInitiativeId;
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

    public Set<ActivitiesMap> getActivitiesMaps() {
        return this.activitiesMaps;
    }

    public void setActivitiesMaps(Set<ActivitiesMap> activitiesMaps) {
        this.activitiesMaps = activitiesMaps;
    }

    public Long getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(Long subInitiativeId) {
        this.subInitiativeId = subInitiativeId;
    }

    public List<SubActivitiesDetails> getSubActivityList() {
        return this.subActivityList;
    }

    public void setSubActivityList(List<SubActivitiesDetails> subActivityList) {
        this.subActivityList = subActivityList;
    }
}

