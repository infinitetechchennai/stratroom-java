/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.RiskActivitiesDTO
 *  com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.scorecard.dto.RiskCommentsDTO
 *  com.estrat.scorecard.dto.RiskDTO
 *  com.estrat.scorecard.dto.RiskMonitoringDTO
 *  com.estrat.scorecard.dto.RiskPlanDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.RiskActivitiesDTO;
import com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO;
import com.estrat.scorecard.dto.RiskCommentsDTO;
import com.estrat.scorecard.dto.RiskDTO;
import com.estrat.scorecard.dto.RiskMonitoringDTO;
import com.estrat.scorecard.dto.RiskPlanDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskResponseDTO {
    private boolean flag;
    private RiskDTO riskDTO;
    private RiskPlanDTO riskPlanDTO;
    private RiskActivitiesDTO riskActivitiesDTO;
    private RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO;
    private RiskCommentsDTO riskCommentsDTO;
    private RiskMonitoringDTO riskMonitoringDTO;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public RiskDTO getRiskDTO() {
        return this.riskDTO;
    }

    public void setRiskDTO(RiskDTO riskDTO) {
        this.riskDTO = riskDTO;
    }

    public RiskPlanDTO getRiskPlanDTO() {
        return this.riskPlanDTO;
    }

    public void setRiskPlanDTO(RiskPlanDTO riskPlanDTO) {
        this.riskPlanDTO = riskPlanDTO;
    }

    public RiskActivitiesDTO getRiskActivitiesDTO() {
        return this.riskActivitiesDTO;
    }

    public void setRiskActivitiesDTO(RiskActivitiesDTO riskActivitiesDTO) {
        this.riskActivitiesDTO = riskActivitiesDTO;
    }

    public RiskCauseAndConsequenceDTO getRiskCauseAndConsequenceDTO() {
        return this.riskCauseAndConsequenceDTO;
    }

    public void setRiskCauseAndConsequenceDTO(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        this.riskCauseAndConsequenceDTO = riskCauseAndConsequenceDTO;
    }

    public RiskCommentsDTO getRiskCommentsDTO() {
        return this.riskCommentsDTO;
    }

    public void setRiskCommentsDTO(RiskCommentsDTO riskCommentsDTO) {
        this.riskCommentsDTO = riskCommentsDTO;
    }

    public RiskMonitoringDTO getRiskMonitoringDTO() {
        return this.riskMonitoringDTO;
    }

    public void setRiskMonitoringDTO(RiskMonitoringDTO riskMonitoringDTO) {
        this.riskMonitoringDTO = riskMonitoringDTO;
    }
}

