/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativesBudget
 *  com.estrat.backend.db.dto.InitiativeBudgetDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.InitiativeBudgetDTO;
import java.math.BigDecimal;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="initiatives_budget", schema="orgstructure")
public class InitiativesBudget {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name="initiative_id")
    private String initiativeId;
    @Column(name="end_date")
    private Date endDate;
    @Column(name="total_asset_budget")
    private BigDecimal totalAssetBudget;
    @Column(name="total_realization_asset")
    private BigDecimal totalRealizationAsset;
    @Column(name="total_liabilities_budget")
    private BigDecimal totalLiabilitiesBudget;
    @Column(name="total_realization_liabilities")
    private BigDecimal totalRealizationLiabilities;
    @Column(name="total_budget")
    private BigDecimal totalBudget;
    @Column(name="total_realization_budget")
    private BigDecimal totalRealizationBudget;
    @Column(name="created_dt", columnDefinition="DATETIME DEFAULT CURRENT_TIMESTAMP", updatable=false)
    private Date createdDt;
    @Column(name="updated_dt", columnDefinition="DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedDt;
    @Column(name="org_id")
    private Long orgId;
    @Column(name="created_by")
    private Long createdBy;

    public InitiativesBudget(InitiativeBudgetDTO initiativeBudget) {
        this.id = initiativeBudget.getId();
        this.initiativeId = initiativeBudget.getInitiativeId();
        this.endDate = initiativeBudget.getEndDate();
        this.totalAssetBudget = initiativeBudget.getTotalAssetBudget();
        this.totalRealizationAsset = initiativeBudget.getTotalRealizationAsset();
        this.totalLiabilitiesBudget = initiativeBudget.getTotalLiabilitiesBudget();
        this.totalRealizationLiabilities = initiativeBudget.getTotalRealizationLiabilities();
        this.totalBudget = initiativeBudget.getTotalBudget();
        this.totalRealizationBudget = initiativeBudget.getTotalRealizationBudget();
        this.createdDt = initiativeBudget.getCreatedDt();
        this.updatedDt = initiativeBudget.getUpdatedDt();
    }

    public InitiativesBudget() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(String initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getTotalAssetBudget() {
        return this.totalAssetBudget;
    }

    public void setTotalAssetBudget(BigDecimal totalAssetBudget) {
        this.totalAssetBudget = totalAssetBudget;
    }

    public BigDecimal getTotalRealizationAsset() {
        return this.totalRealizationAsset;
    }

    public void setTotalRealizationAsset(BigDecimal totalRealizationAsset) {
        this.totalRealizationAsset = totalRealizationAsset;
    }

    public BigDecimal getTotalLiabilitiesBudget() {
        return this.totalLiabilitiesBudget;
    }

    public void setTotalLiabilitiesBudget(BigDecimal totalLiabilitiesBudget) {
        this.totalLiabilitiesBudget = totalLiabilitiesBudget;
    }

    public BigDecimal getTotalRealizationLiabilities() {
        return this.totalRealizationLiabilities;
    }

    public void setTotalRealizationLiabilities(BigDecimal totalRealizationLiabilities) {
        this.totalRealizationLiabilities = totalRealizationLiabilities;
    }

    public BigDecimal getTotalBudget() {
        return this.totalBudget;
    }

    public void setTotalBudget(BigDecimal totalBudget) {
        this.totalBudget = totalBudget;
    }

    public BigDecimal getTotalRealizationBudget() {
        return this.totalRealizationBudget;
    }

    public void setTotalRealizationBudget(BigDecimal totalRealizationBudget) {
        this.totalRealizationBudget = totalRealizationBudget;
    }

    public Date getCreatedDt() {
        return this.createdDt;
    }

    public void setCreatedDt(Date createdDt) {
        this.createdDt = createdDt;
    }

    public Date getUpdatedDt() {
        return this.updatedDt;
    }

    public void setUpdatedDt(Date updatedDt) {
        this.updatedDt = updatedDt;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}

