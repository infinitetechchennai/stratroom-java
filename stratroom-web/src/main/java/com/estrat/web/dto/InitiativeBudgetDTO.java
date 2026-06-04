/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.InitiativeBudgetDTO
 */
package com.estrat.web.dto;

import java.math.BigDecimal;
import java.util.Date;

public class InitiativeBudgetDTO {
    private Long id;
    private String initiativeId;
    private Date endDate;
    private BigDecimal totalAssetBudget;
    private BigDecimal totalRealizationAsset;
    private BigDecimal totalLiabilitiesBudget;
    private BigDecimal totalRealizationLiabilities;
    private BigDecimal totalBudget;
    private BigDecimal totalRealizationBudget;
    private BigDecimal totalAssetBudgetRealization_percent;
    private BigDecimal totalLiabilitiesRealization_percent;
    private BigDecimal totalBudgetRealization_percent;
    private Date createdDt;
    private Date updatedDt;
    private String deptId;

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

    public BigDecimal getTotalAssetBudgetRealization_percent() {
        return this.totalAssetBudgetRealization_percent;
    }

    public void setTotalAssetBudgetRealization_percent(BigDecimal totalAssetBudgetRealization_percent) {
        this.totalAssetBudgetRealization_percent = totalAssetBudgetRealization_percent;
    }

    public BigDecimal getTotalLiabilitiesRealization_percent() {
        return this.totalLiabilitiesRealization_percent;
    }

    public void setTotalLiabilitiesRealization_percent(BigDecimal totalLiabilitiesRealization_percent) {
        this.totalLiabilitiesRealization_percent = totalLiabilitiesRealization_percent;
    }

    public BigDecimal getTotalBudgetRealization_percent() {
        return this.totalBudgetRealization_percent;
    }

    public void setTotalBudgetRealization_percent(BigDecimal totalBudgetRealization_percent) {
        this.totalBudgetRealization_percent = totalBudgetRealization_percent;
    }

    public String getDeptId() {
        return this.deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }
}

