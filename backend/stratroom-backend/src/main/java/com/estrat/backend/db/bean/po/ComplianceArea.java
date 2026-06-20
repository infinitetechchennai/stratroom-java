/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceArea
 *  com.estrat.backend.db.bean.po.ComplianceDetails
 *  com.estrat.backend.db.dto.ComplianceAreaDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
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
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ComplianceDetails;
import com.estrat.backend.db.dto.ComplianceAreaDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="compliance_area", schema="orgstructure")
public class ComplianceArea {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="name")
    private String name;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @OneToMany(mappedBy="complainAreaId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<ComplianceDetails> complainsDetailsList;

    public ComplianceArea() {
    }

    public ComplianceArea(ComplianceAreaDTO complianceAreaDTO) {
        this.id = complianceAreaDTO.getId();
        this.name = complianceAreaDTO.getName();
        this.createdBy = complianceAreaDTO.getCreatedBy();
        this.updatedBy = complianceAreaDTO.getUpdatedBy();
        this.createdTime = complianceAreaDTO.getCreatedTime();
        this.updatedTime = complianceAreaDTO.getUpdatedTime();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<ComplianceDetails> getComplainsDetailsList() {
        return this.complainsDetailsList;
    }

    public void setComplainsDetailsList(List<ComplianceDetails> complainsDetailsList) {
        this.complainsDetailsList = complainsDetailsList;
    }
}

