/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.dto.PageDTO
 *  com.estrat.service.db.dto.ScoreCardDTO
 *  com.estrat.service.db.dto.ScoreCardDetailsDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.estrat.service.db.dto.PageDTO;
import com.estrat.service.db.dto.ScoreCardDTO;
import com.estrat.service.db.dto.ScoreCardDetailsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ScoreCardResponseDTO {
    private boolean flag;
    private ScoreCardDTO cardDTO;
    private ObjectivesDTO objectivesDTO;
    private KPIDTO kpidto;
    private PageDTO pageDTO;
    private ScoreCardDetailsDTO cardDetailsDTO;

    public ObjectivesDTO getObjectivesDTO() {
        return this.objectivesDTO;
    }

    public void setObjectivesDTO(ObjectivesDTO objectivesDTO) {
        this.objectivesDTO = objectivesDTO;
    }

    public KPIDTO getKpidto() {
        return this.kpidto;
    }

    public void setKpidto(KPIDTO kpidto) {
        this.kpidto = kpidto;
    }

    public ScoreCardDTO getCardDTO() {
        return this.cardDTO;
    }

    public void setCardDTO(ScoreCardDTO cardDTO) {
        this.cardDTO = cardDTO;
    }

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public PageDTO getPageDTO() {
        return this.pageDTO;
    }

    public void setPageDTO(PageDTO pageDTO) {
        this.pageDTO = pageDTO;
    }

    public ScoreCardDetailsDTO getCardDetailsDTO() {
        return this.cardDetailsDTO;
    }

    public void setCardDetailsDTO(ScoreCardDetailsDTO cardDetailsDTO) {
        this.cardDetailsDTO = cardDetailsDTO;
    }
}

