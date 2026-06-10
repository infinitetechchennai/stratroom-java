/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskPlanDTO;
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

