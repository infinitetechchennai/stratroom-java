/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.KPIDTO
 *  com.estrat.scorecard.dto.ObjectivesDTO
 *  com.estrat.scorecard.dto.PageDTO
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.scorecard.dto.ScoreCardResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.KPIDTO;
import com.estrat.scorecard.dto.ObjectivesDTO;
import com.estrat.scorecard.dto.PageDTO;
import com.estrat.scorecard.dto.ScoreCardDTO;
import com.estrat.scorecard.dto.ScoreCardDetailsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ScoreCardResponseDTO {
    private boolean flag;
    private ScoreCardDTO cardDTO;
    private String statusLight;
    private String thresholdResult;
    private List<ScoreCardDTO> scoreCardList;
    private ObjectivesDTO objectivesDTO;
    private KPIDTO kpidto;
    private PageDTO pageDTO;
    private ScoreCardDetailsDTO cardDetailsDTO;

    public String getThresholdResult() {
        return this.thresholdResult;
    }

    public void setThresholdResult(String thresholdResult) {
        this.thresholdResult = thresholdResult;
    }

    public String getStatusLight() {
        return this.statusLight;
    }

    public void setStatusLight(String statusLight) {
        this.statusLight = statusLight;
    }

    public List<ScoreCardDTO> getScoreCardList() {
        return this.scoreCardList;
    }

    public void setScoreCardList(List<ScoreCardDTO> scoreCardList) {
        this.scoreCardList = scoreCardList;
    }

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

