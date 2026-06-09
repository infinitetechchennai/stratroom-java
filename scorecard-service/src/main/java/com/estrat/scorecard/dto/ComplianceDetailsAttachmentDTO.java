/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ComplianceDetailsAttachmentDTO
 */
package com.estrat.scorecard.dto;

import java.time.LocalDateTime;

public class ComplianceDetailsAttachmentDTO {
    private long id;
    private long createdBy;
    private long updatedBy;
    private String name;
    private String size;
    private String type;
    private String file;
    private String uniqueFileReference;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long complainDetalId;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Long getComplainDetalId() {
        return this.complainDetalId;
    }

    public void setComplainDetalId(Long complainDetalId) {
        this.complainDetalId = complainDetalId;
    }
}

