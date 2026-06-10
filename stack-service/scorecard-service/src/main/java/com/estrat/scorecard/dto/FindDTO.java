/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.FindDTO
 */
package com.estrat.scorecard.dto;

public class FindDTO {
    private String DateRange;
    private Long performedBy;
    private String action;
    private long orgId;

    public String getDateRange() {
        return this.DateRange;
    }

    public void setDateRange(String dateRange) {
        this.DateRange = dateRange;
    }

    public Long getPerformedBy() {
        return this.performedBy;
    }

    public void setPerformedBy(Long performedBy) {
        this.performedBy = performedBy;
    }

    public String getAction() {
        return this.action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }
}

