/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskDashBoardResponseDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.dto.RiskDTO;
import java.util.List;
import java.util.Map;

public class RiskDashBoardResponseDTO {
    private long totalRisk;
    private long totalTreatment;
    private long totalMonitoring;
    private long totalPlan;
    private String message;
    private List<RiskDTO> riskDTO;
    private Map<String, Integer> categoryCount;
    private Map<String, Integer> statusCount;
    private Map<String, Integer> likelihoodCount;
    private Map<String, Integer> treatmentSrategyCount;

    public long getTotalRisk() {
        return this.totalRisk;
    }

    public void setTotalRisk(long totalRisk) {
        this.totalRisk = totalRisk;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<RiskDTO> getRiskDTO() {
        return this.riskDTO;
    }

    public void setRiskDTO(List<RiskDTO> riskDTO) {
        this.riskDTO = riskDTO;
    }

    public Map<String, Integer> getCategoryCount() {
        return this.categoryCount;
    }

    public void setCategoryCount(Map<String, Integer> categoryCount) {
        this.categoryCount = categoryCount;
    }

    public Map<String, Integer> getStatusCount() {
        return this.statusCount;
    }

    public void setStatusCount(Map<String, Integer> statusCount) {
        this.statusCount = statusCount;
    }

    public Map<String, Integer> getLikelihoodCount() {
        return this.likelihoodCount;
    }

    public void setLikelihoodCount(Map<String, Integer> likelihoodCount) {
        this.likelihoodCount = likelihoodCount;
    }

    public Map<String, Integer> getTreatmentSrategyCount() {
        return this.treatmentSrategyCount;
    }

    public void setTreatmentSrategyCount(Map<String, Integer> treatmentSrategyCount) {
        this.treatmentSrategyCount = treatmentSrategyCount;
    }

    public long getTotalTreatment() {
        return this.totalTreatment;
    }

    public void setTotalTreatment(long totalTreatment) {
        this.totalTreatment = totalTreatment;
    }

    public long getTotalMonitoring() {
        return this.totalMonitoring;
    }

    public void setTotalMonitoring(long totalMonitoring) {
        this.totalMonitoring = totalMonitoring;
    }

    public long getTotalPlan() {
        return this.totalPlan;
    }

    public void setTotalPlan(long totalPlan) {
        this.totalPlan = totalPlan;
    }
}

