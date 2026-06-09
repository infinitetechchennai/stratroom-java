/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ApprovalRequestDTO
 */
package com.estrat.scorecard.dto;

public class ApprovalRequestDTO {
    private String comments;
    private String status;
    private String priority;
    private int complete;

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public int getComplete() {
        return this.complete;
    }

    public void setComplete(int complete) {
        this.complete = complete;
    }
}

