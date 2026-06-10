/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.service.db.bean.po.RiskConsequenceDetails
 *  com.estrat.service.db.bean.po.RiskDetails
 *  com.estrat.service.db.dto.RiskCauseAndConsequenceDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
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
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.RiskConsequenceDetails;
import com.estrat.service.db.bean.po.RiskDetails;
import com.estrat.service.db.dto.RiskCauseAndConsequenceDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
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
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="risk_cause_consequence", schema="orgstructure")
public class RiskCauseAndConsequence {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="risk_id")
    private RiskDetails riskId;
    @Column(name="cause_consequence_value")
    private String causeAndConsequenceValue;
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
    @Column(name="version")
    private long version;
    @Column(name="change_id")
    private long changeId;
    @Column(name="status")
    private String status;
    @OneToMany(mappedBy="causeConqId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskConsequenceDetails> consequenceList;

    public RiskCauseAndConsequence() {
    }

    public RiskCauseAndConsequence(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        this.id = riskCauseAndConsequenceDTO.getId();
        RiskDetails riskDetails = new RiskDetails();
        riskDetails.setId(riskCauseAndConsequenceDTO.getRiskId());
        this.riskId = riskDetails;
        this.active = riskCauseAndConsequenceDTO.getActive();
        this.owner = riskCauseAndConsequenceDTO.getOwner();
        this.createdBy = riskCauseAndConsequenceDTO.getCreatedBy();
        this.updatedBy = riskCauseAndConsequenceDTO.getUpdatedBy();
        this.createdTime = riskCauseAndConsequenceDTO.getCreatedTime();
        this.updatedTime = riskCauseAndConsequenceDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.causeAndConsequenceValue = mapper.writeValueAsString((Object)riskCauseAndConsequenceDTO.getCauseAndConsequenceValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public List<RiskConsequenceDetails> getConsequenceList() {
        return this.consequenceList;
    }

    public void setConsequenceList(List<RiskConsequenceDetails> consequenceList) {
        this.consequenceList = consequenceList;
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

    public String getCauseAndConsequenceValue() {
        return this.causeAndConsequenceValue;
    }

    public void setCauseAndConsequenceValue(String causeAndConsequenceValue) {
        this.causeAndConsequenceValue = causeAndConsequenceValue;
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

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

