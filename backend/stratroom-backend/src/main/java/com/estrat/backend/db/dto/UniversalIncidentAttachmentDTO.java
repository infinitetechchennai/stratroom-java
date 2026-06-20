/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.UniversalIncidentAttachment
 *  com.estrat.backend.db.dto.UniversalIncidentAttachmentDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.UniversalIncidentAttachment;
import java.time.LocalDateTime;

public class UniversalIncidentAttachmentDTO {
    private long id;
    private Long createdBy;
    private Long updatedBy;
    private String name;
    private String size;
    private String type;
    private String file;
    private String uniqueFileReference;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long incidentId;

    public UniversalIncidentAttachmentDTO() {
    }

    public UniversalIncidentAttachmentDTO(UniversalIncidentAttachment incidentAttachment) {
        this.id = incidentAttachment.getId();
        this.createdBy = incidentAttachment.getCreatedBy();
        this.createdTime = incidentAttachment.getCreatedTime();
        this.name = incidentAttachment.getName();
        this.size = incidentAttachment.getSize();
        this.type = incidentAttachment.getType();
        this.file = incidentAttachment.getFile();
        this.updatedBy = incidentAttachment.getUpdatedBy();
        this.updatedTime = incidentAttachment.getUpdatedTime();
        this.incidentId = incidentAttachment.getIncidentId();
        this.uniqueFileReference = incidentAttachment.getUniqueFileReference();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return this.size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFile() {
        return this.file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getUniqueFileReference() {
        return this.uniqueFileReference;
    }

    public void setUniqueFileReference(String uniqueFileReference) {
        this.uniqueFileReference = uniqueFileReference;
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

    public Long getIncidentId() {
        return this.incidentId;
    }

    public void setIncidentId(Long incidentId) {
        this.incidentId = incidentId;
    }
}

