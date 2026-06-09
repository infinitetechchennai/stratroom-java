/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ApprovalResponseDTO
 */
package com.estrat.scorecard.dto;

public class ApprovalResponseDTO {
    private String message;
    private String nextApprover;

    public ApprovalResponseDTO() {
    }

    public ApprovalResponseDTO(String message, String nextApprover) {
        this.message = message;
        this.nextApprover = nextApprover;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNextApprover() {
        return this.nextApprover;
    }

    public void setNextApprover(String nextApprover) {
        this.nextApprover = nextApprover;
    }
}

