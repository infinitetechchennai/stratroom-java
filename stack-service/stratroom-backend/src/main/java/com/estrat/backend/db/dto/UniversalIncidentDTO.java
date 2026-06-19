/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.UniversalIncident
 *  com.estrat.backend.db.dto.UniversalIncidentAttachmentDTO
 *  com.estrat.backend.db.dto.UniversalIncidentDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.UniversalIncident;
import com.estrat.backend.db.dto.UniversalIncidentAttachmentDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

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

    public UniversalIncidentDTO() {
    }

    public UniversalIncidentDTO(UniversalIncident incident) {
        this.id = incident.getId();
        this.owner = incident.getOwner();
        this.createdBy = incident.getCreatedBy();
        this.updatedBy = incident.getUpdatedBy();
        this.createdTime = incident.getCreatedTime();
        this.updatedTime = incident.getUpdatedTime();
        this.active = incident.getActive();
        this.departmentId = incident.getDepartmentId();
        this.pageId = incident.getPageId();
        ObjectMapper mapper = new ObjectMapper();
        if (incident.getIncidentValue() != null) {
            try {
                this.incidentValue = JsonUtil.parseMap(incident.getIncidentValue());
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

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

