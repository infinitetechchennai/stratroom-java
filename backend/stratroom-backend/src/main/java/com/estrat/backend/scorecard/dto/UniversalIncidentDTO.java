/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.UniversalIncidentAttachmentDTO
 *  com.estrat.backend.scorecard.dto.UniversalIncidentDTO
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.UniversalIncidentAttachmentDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class UniversalIncidentDTO {
    private Long id;
    private Map<String, Object> incidentValue;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long departmentId;
    private long pageId;
    private List<UniversalIncidentAttachmentDTO> incidentAttachment;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, Object> getIncidentValue() {
        return this.incidentValue;
    }

    public void setIncidentValue(Map<String, Object> incidentValue) {
        this.incidentValue = incidentValue;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public List<UniversalIncidentAttachmentDTO> getIncidentAttachment() {
        return this.incidentAttachment;
    }

    public void setIncidentAttachment(List<UniversalIncidentAttachmentDTO> incidentAttachment) {
        this.incidentAttachment = incidentAttachment;
    }
}

