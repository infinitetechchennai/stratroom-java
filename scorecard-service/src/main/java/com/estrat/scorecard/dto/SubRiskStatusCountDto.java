/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.RiskDTO
 *  com.estrat.scorecard.dto.SubRiskStatusCountDto
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.RiskDTO;
import java.util.List;

public class SubRiskStatusCountDto {
    private long id;
    private long low;
    private long medium;
    private long high;
    private long extreme;
    private String departmentName;
    private List<RiskDTO> lowRisk;
    private List<RiskDTO> mediumRisk;
    private List<RiskDTO> highRisk;
    private List<RiskDTO> veryhighRisk;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getLow() {
        return this.low;
    }

    public void setLow(long low) {
        this.low = low;
    }

    public long getMedium() {
        return this.medium;
    }

    public void setMedium(long medium) {
        this.medium = medium;
    }

    public long getHigh() {
        return this.high;
    }

    public void setHigh(long high) {
        this.high = high;
    }

    public long getExtreme() {
        return this.extreme;
    }

    public void setExtreme(long extreme) {
        this.extreme = extreme;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<RiskDTO> getLowRisk() {
        return this.lowRisk;
    }

    public void setLowRisk(List<RiskDTO> lowRisk) {
        this.lowRisk = lowRisk;
    }

    public List<RiskDTO> getMediumRisk() {
        return this.mediumRisk;
    }

    public void setMediumRisk(List<RiskDTO> mediumRisk) {
        this.mediumRisk = mediumRisk;
    }

    public List<RiskDTO> getHighRisk() {
        return this.highRisk;
    }

    public void setHighRisk(List<RiskDTO> highRisk) {
        this.highRisk = highRisk;
    }

    public List<RiskDTO> getVeryhighRisk() {
        return this.veryhighRisk;
    }

    public void setVeryhighRisk(List<RiskDTO> veryhighRisk) {
        this.veryhighRisk = veryhighRisk;
    }
}

