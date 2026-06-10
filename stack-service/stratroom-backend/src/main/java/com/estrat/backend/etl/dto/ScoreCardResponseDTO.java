/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.ScoreCardResponseDTO
 *  com.estrat.backend.etl.dto.ScoreCardResponseDTO$ScoreCardDetailsDTO
 */
package com.estrat.backend.etl.dto;

import com.estrat.backend.etl.dto.ScoreCardResponseDTO;

public class ScoreCardResponseDTO {
    private boolean flag;
    private String statusLight;
    private ScoreCardDetailsDTO cardDetailsDTO;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getStatusLight() {
        return this.statusLight;
    }

    public void setStatusLight(String statusLight) {
        this.statusLight = statusLight;
    }

    public ScoreCardDetailsDTO getCardDetailsDTO() {
        return this.cardDetailsDTO;
    }

    public void setCardDetailsDTO(ScoreCardDetailsDTO cardDetailsDTO) {
        this.cardDetailsDTO = cardDetailsDTO;
    }
}

