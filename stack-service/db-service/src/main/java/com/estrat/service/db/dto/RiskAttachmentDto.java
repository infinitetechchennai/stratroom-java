/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskAttachment
 *  com.estrat.service.db.dto.RiskAttachmentDto
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.RiskAttachment;
import java.time.LocalDateTime;

public class RiskAttachmentDto {
    private long id;
    private long riskId;
    private int active = 0;
    private long createdBy;
    private long updatedBy;
    private String name;
    private String fileName;
    private String size;
    private String type;
    private String file;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String uniqueFileReference;

    public RiskAttachmentDto() {
    }

    public RiskAttachmentDto(RiskAttachment attachment) {
        this.id = attachment.getId();
        this.riskId = attachment.getRiskId().getId();
        this.active = attachment.getActive();
        this.createdBy = attachment.getCreatedBy();
        this.updatedBy = attachment.getUpdatedBy();
        this.name = attachment.getName();
        this.size = attachment.getSize();
        this.type = attachment.getType();
        this.file = attachment.getFile();
        this.createdTime = attachment.getCreatedTime();
        this.updatedTime = attachment.getUpdatedTime();
        this.fileName = attachment.getFileName();
        this.uniqueFileReference = attachment.getUniqueFileReference();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

    public String getUniqueFileReference() {
        return this.uniqueFileReference;
    }

    public void setUniqueFileReference(String uniqueFileReference) {
        this.uniqueFileReference = uniqueFileReference;
    }
}

