/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ComplianceDetailsAttachment;
import java.time.LocalDateTime;

public class ComplianceDetailsAttachmentDTO {
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
    private Long complainDetalId;

    public ComplianceDetailsAttachmentDTO() {
    }

    public ComplianceDetailsAttachmentDTO(ComplianceDetailsAttachment attachmentsDto) {
        this.id = attachmentsDto.getId();
        this.createdBy = attachmentsDto.getCreatedBy();
        this.createdTime = attachmentsDto.getCreatedTime();
        this.name = attachmentsDto.getName();
        this.size = attachmentsDto.getSize();
        this.type = attachmentsDto.getType();
        this.file = attachmentsDto.getFile();
        this.updatedBy = attachmentsDto.getUpdatedBy();
        this.updatedTime = attachmentsDto.getUpdatedTime();
        this.complainDetalId = attachmentsDto.getComplianceDetails().getId();
        this.uniqueFileReference = attachmentsDto.getUniqueFileReference();
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

    public Long getComplainDetalid() {
        return this.complainDetalId;
    }

    public void setComplainDetalid(Long complainDetalid) {
        this.complainDetalId = complainDetalid;
    }
}

