/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.bean.po.SubInitiatives
 *  com.estrat.backend.db.bean.po.SubInitiativesMap
 *  com.estrat.backend.db.dto.SubInitiativesDTO
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
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.bean.po.SubInitiativesMap;
import com.estrat.backend.db.dto.SubInitiativesDTO;
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
@Table(name="sub_initiatives_details", schema="orgstructure")
public class SubInitiatives {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="sub_initiative_value")
    private String subInitiativeValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @Column(name="initiative_id")
    private long initiativeId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @OneToMany(mappedBy="subInitiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<ActivitiesDetails> activitiesList;
    @OneToMany(mappedBy="subInitiativeId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<SubInitiativesMap> subInitiativesMaps;

    public SubInitiatives() {
    }

    public SubInitiatives(SubInitiativesDTO subInitiativesDTO) {
        this.id = subInitiativesDTO.getId();
        this.initiativeId = subInitiativesDTO.getInitiativeId();
        this.active = subInitiativesDTO.getActive();
        this.createdTime = subInitiativesDTO.getCreatedTime();
        this.createdBy = subInitiativesDTO.getCreatedBy();
        this.updatedBy = subInitiativesDTO.getUpdatedBy();
        this.owner = subInitiativesDTO.getOwner();
        this.updatedTime = subInitiativesDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subInitiativeValue = mapper.writeValueAsString((Object)subInitiativesDTO.getSubInitiativeValue());
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

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public String getSubInitiativeValue() {
        return this.subInitiativeValue;
    }

    public void setSubInitiativeValue(String subInitiativeValue) {
        this.subInitiativeValue = subInitiativeValue;
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

    public Set<SubInitiativesMap> getSubInitiativesMaps() {
        return this.subInitiativesMaps;
    }

    public void setSubInitiativesMaps(Set<SubInitiativesMap> subInitiativesMaps) {
        this.subInitiativesMaps = subInitiativesMaps;
    }

    public List<ActivitiesDetails> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(List<ActivitiesDetails> activitiesList) {
        this.activitiesList = activitiesList;
    }
}

