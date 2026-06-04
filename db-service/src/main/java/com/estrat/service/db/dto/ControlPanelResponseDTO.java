/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelCustomPerformance
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.estrat.service.db.dto.ControlPanelResponseDTO
 *  com.estrat.service.db.dto.ControlPanelSecurityDTO
 *  com.estrat.service.db.dto.ControlPanelThemeDTO
 *  com.estrat.service.db.dto.CustomPerformance
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.ControlPanelCustomPerformance;
import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.estrat.service.db.dto.ControlPanelSecurityDTO;
import com.estrat.service.db.dto.ControlPanelThemeDTO;
import com.estrat.service.db.dto.CustomPerformance;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ControlPanelResponseDTO {
    private boolean flag;
    private ControlPanelThemeDTO controlPanelThemeDTO;
    private CustomPerformance customPerformance;
    private ControlPanelSecurityDTO controlPanelSecurityDTO;
    private ControlPanelCustomPerformance controlPanelCustomPerformance;
    private ControlPanelGeneralDTO controlPanelGeneralDTO;
    private String message;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public ControlPanelThemeDTO getControlPanelThemeDTO() {
        return this.controlPanelThemeDTO;
    }

    public void setControlPanelThemeDTO(ControlPanelThemeDTO controlPanelThemeDTO) {
        this.controlPanelThemeDTO = controlPanelThemeDTO;
    }

    public ControlPanelSecurityDTO getControlPanelSecurityDTO() {
        return this.controlPanelSecurityDTO;
    }

    public void setControlPanelSecurityDTO(ControlPanelSecurityDTO controlPanelSecurityDTO) {
        this.controlPanelSecurityDTO = controlPanelSecurityDTO;
    }

    public ControlPanelGeneralDTO getControlPanelGeneralDTO() {
        return this.controlPanelGeneralDTO;
    }

    public void setControlPanelGeneralDTO(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        this.controlPanelGeneralDTO = controlPanelGeneralDTO;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CustomPerformance getCustomPerformance() {
        return this.customPerformance;
    }

    public void setCustomPerformance(CustomPerformance customPerformance) {
        this.customPerformance = customPerformance;
    }

    public ControlPanelCustomPerformance getControlPanelCustomPerformance() {
        return this.controlPanelCustomPerformance;
    }

    public void setControlPanelCustomPerformance(ControlPanelCustomPerformance controlPanelCustomPerformance) {
        this.controlPanelCustomPerformance = controlPanelCustomPerformance;
    }
}

