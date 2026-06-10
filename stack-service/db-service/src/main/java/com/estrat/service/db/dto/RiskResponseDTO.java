/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.RiskActivitiesDTO
 *  com.estrat.service.db.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.service.db.dto.RiskCommentsDTO
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskMonitoringDTO
 *  com.estrat.service.db.dto.RiskPlanDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.dto.RiskActivitiesDTO;
import com.estrat.service.db.dto.RiskCauseAndConsequenceDTO;
import com.estrat.service.db.dto.RiskCommentsDTO;
import com.estrat.service.db.dto.RiskDTO;
import com.estrat.service.db.dto.RiskMonitoringDTO;
import com.estrat.service.db.dto.RiskPlanDTO;

public class RiskResponseDTO {
    private boolean flag;
    private String message;
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

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public RiskResponseDTO(String message, RiskDTO riskDTO) {
        this.message = message;
        this.riskDTO = riskDTO;
    }

    public RiskResponseDTO() {
    }
}

