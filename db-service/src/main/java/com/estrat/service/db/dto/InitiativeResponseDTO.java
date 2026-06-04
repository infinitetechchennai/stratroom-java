/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.InitiativesDTO
 *  com.estrat.service.db.dto.SubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.dto.InitiativesDTO;
import com.estrat.service.db.dto.SubInitiativesDTO;
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

