/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskActivities
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanUserMapping
 *  com.estrat.backend.db.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonIdentityInfo
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.annotation.ObjectIdGenerators$PropertyGenerator
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.RiskActivities;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskPlanUserMapping;
import com.estrat.backend.db.dto.RiskPlanDTO;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Where;

@Entity
@Table(name="risk_plan", schema="orgstructure")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
@JsonIgnoreProperties(ignoreUnknown=true)
public class RiskPlan {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="risk_id")
    private RiskDetails riskId;
    @Column(name="risk_plan_value")
    private String riskPlanValue;
    @Column(name="type_flag")
    private String typeFlag;
    @Column(name="active")
    private int active = 0;
    @Column(name="status")
    private String status;
    @Column(name="version")
    private Long version;
    @Column(name="change_id")
    private Long changeId;
    @OneToMany(mappedBy="id.riskPlanId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<RiskPlanUserMapping> ownerList;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @OneToMany(mappedBy="riskPlanId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskActivities> riskActivitiesList;

    public RiskPlan() {
    }

    public RiskPlan(RiskPlanDTO riskPlanDTO) {
        this.id = riskPlanDTO.getId();
        RiskDetails riskDetails = new RiskDetails();
        riskDetails.setId(riskPlanDTO.getRiskId());
        this.riskId = riskDetails;
        this.active = riskPlanDTO.getActive();
        this.typeFlag = riskPlanDTO.getTypeFlag();
        this.createdBy = riskPlanDTO.getCreatedBy();
        this.updatedBy = riskPlanDTO.getUpdatedBy();
        this.createdTime = riskPlanDTO.getCreatedTime();
        this.updatedTime = riskPlanDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskPlanValue = mapper.writeValueAsString((Object)riskPlanDTO.getRiskPlanValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (StringUtils.isNotEmpty((CharSequence)riskPlanDTO.getMultipleOwners())) {
            Set ownerList = Arrays.asList(riskPlanDTO.getMultipleOwners().split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new RiskPlanUserMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setOwnerList(ownerList);
        } else {
            this.setOwnerList(Collections.emptySet());
        }
    }

    public Set<RiskPlanUserMapping> getOwnerList() {
        return this.ownerList;
    }

    public void setOwnerList(Set<RiskPlanUserMapping> ownerList) {
        this.ownerList = ownerList;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RiskDetails getRiskId() {
        return this.riskId;
    }

    public void setRiskId(RiskDetails riskId) {
        this.riskId = riskId;
    }

    public String getRiskPlanValue() {
        return this.riskPlanValue;
    }

    public void setRiskPlanValue(String riskPlanValue) {
        this.riskPlanValue = riskPlanValue;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public List<RiskActivities> getRiskActivitiesList() {
        return this.riskActivitiesList;
    }

    public void setRiskActivitiesList(List<RiskActivities> riskActivitiesList) {
        this.riskActivitiesList = riskActivitiesList;
    }

    public String getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(String typeFlag) {
        this.typeFlag = typeFlag;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RiskPlan)) {
            return false;
        }
        RiskPlan that = (RiskPlan)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }
}

