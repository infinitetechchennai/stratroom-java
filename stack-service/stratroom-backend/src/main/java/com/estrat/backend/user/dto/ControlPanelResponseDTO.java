/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.dto.ControlPanelSecurityDTO
 *  com.estrat.backend.user.dto.ControlPanelThemeDTO
 */
package com.estrat.backend.user.dto;

import com.estrat.backend.user.dto.ControlPanelGeneralDTO;
import com.estrat.backend.user.dto.ControlPanelSecurityDTO;
import com.estrat.backend.user.dto.ControlPanelThemeDTO;

public class ControlPanelResponseDTO {
    private boolean flag;
    private ControlPanelGeneralDTO controlPanelGeneralDTO;
    private ControlPanelThemeDTO controlPanelThemeDTO;
    private ControlPanelSecurityDTO controlPanelSecurityDTO;
    private String message;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public ControlPanelGeneralDTO getControlPanelGeneralDTO() {
        return this.controlPanelGeneralDTO;
    }

    public void setControlPanelGeneralDTO(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        this.controlPanelGeneralDTO = controlPanelGeneralDTO;
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

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

