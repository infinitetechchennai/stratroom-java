/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceArea
 *  com.estrat.service.db.bean.po.ComplianceDetails
 *  com.estrat.service.db.dto.ComplianceAreaDTO
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ComplianceDetails;
import com.estrat.service.db.dto.ComplianceAreaDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="compliance_area", schema="orgstructure")
public class ComplianceArea {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="name")
    private String name;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
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

    public List<ComplianceDetails> getComplainsDetailsList() {
        return this.complainsDetailsList;
    }

    public void setComplainsDetailsList(List<ComplianceDetails> complainsDetailsList) {
        this.complainsDetailsList = complainsDetailsList;
    }
}

