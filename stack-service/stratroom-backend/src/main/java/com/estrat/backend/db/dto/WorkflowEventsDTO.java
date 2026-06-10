/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.WorkflowEventsDTO
 */
package com.estrat.backend.db.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class WorkflowEventsDTO {
    private Long id;
    private String eventTitle;
    private String submittedBy;
    private LocalDateTime submittedOn;
    private String status;
    private String currentApprover;
    private Map<String, Object> details;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventTitle() {
        return this.eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getSubmittedBy() {
        return this.submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public LocalDateTime getSubmittedOn() {
        return this.submittedOn;
    }

    public void setSubmittedOn(LocalDateTime submittedOn) {
        this.submittedOn = submittedOn;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentApprover() {
        return this.currentApprover;
    }

    public void setCurrentApprover(String currentApprover) {
        this.currentApprover = currentApprover;
    }

    public Map<String, Object> getDetails() {
        return this.details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }
}

