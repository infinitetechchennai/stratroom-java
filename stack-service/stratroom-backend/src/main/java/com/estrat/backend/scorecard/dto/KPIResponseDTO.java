/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.KPIResponseDTO
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.KPIDTO;
import com.estrat.backend.scorecard.dto.SubKPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPIResponseDTO {
    private List<KPIDTO> kpidtoList;
    private String actual;
    private String target;
    private String budget;
    private List<SubKPIDTO> subkpidtoList;
    private Map<String, Object> values;

    public List<KPIDTO> getKpidtoList() {
        return this.kpidtoList;
    }

    public void setKpidtoList(List<KPIDTO> kpidtoList) {
        this.kpidtoList = kpidtoList;
    }

    public String getActual() {
        return this.actual;
    }

    public void setActual(String actual) {
        this.actual = actual;
    }

    public String getTarget() {
        return this.target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getBudget() {
        return this.budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public List<SubKPIDTO> getSubkpidtoList() {
        return this.subkpidtoList;
    }

    public void setSubkpidtoList(List<SubKPIDTO> subkpidtoList) {
        this.subkpidtoList = subkpidtoList;
    }

    public Map<String, Object> getValues() {
        return this.values;
    }

    public void setValues(Map<String, Object> values) {
        this.values = values;
    }
}

