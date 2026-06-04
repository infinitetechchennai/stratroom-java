/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.InitiativeResponseDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class InitiativeResponseDTO {
    private boolean flag;
    private InitiativesDTO initiativesDTO;
    private SubInitiativesDTO subInitiativesDTO;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public InitiativesDTO getInitiativesDTO() {
        return this.initiativesDTO;
    }

    public void setInitiativesDTO(InitiativesDTO initiativesDTO) {
        this.initiativesDTO = initiativesDTO;
    }

    public SubInitiativesDTO getSubInitiativesDTO() {
        return this.subInitiativesDTO;
    }

    public void setSubInitiativesDTO(SubInitiativesDTO subInitiativesDTO) {
        this.subInitiativesDTO = subInitiativesDTO;
    }
}

