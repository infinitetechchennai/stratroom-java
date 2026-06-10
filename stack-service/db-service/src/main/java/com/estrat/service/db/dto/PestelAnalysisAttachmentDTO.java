/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PestelAnalysisAttachment
 *  com.estrat.service.db.dto.PestelAnalysisAttachmentDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.PestelAnalysisAttachment;
import java.time.LocalDateTime;

public class PestelAnalysisAttachmentDTO {
    private long id;
    private long pestelAnalysisId;
    private int active = 0;
    private long createdBy;
    private long updatedBy;
    private String name;
    private String size;
    private String type;
    private String file;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public PestelAnalysisAttachmentDTO() {
    }

    public PestelAnalysisAttachmentDTO(PestelAnalysisAttachment pestelAnalysisAttachment) {
        this.id = pestelAnalysisAttachment.getId();
        this.pestelAnalysisId = pestelAnalysisAttachment.getPestelAnalysisId().getId();
        this.active = pestelAnalysisAttachment.getActive();
        this.createdBy = pestelAnalysisAttachment.getCreatedBy();
        this.updatedBy = pestelAnalysisAttachment.getUpdatedBy();
        this.name = pestelAnalysisAttachment.getName();
        this.size = pestelAnalysisAttachment.getSize();
        this.type = pestelAnalysisAttachment.getType();
        this.file = pestelAnalysisAttachment.getFile();
        this.createdTime = pestelAnalysisAttachment.getCreatedTime();
        this.updatedTime = pestelAnalysisAttachment.getUpdatedTime();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPestelAnalysisId() {
        return this.pestelAnalysisId;
    }

    public void setPestelAnalysisId(long pestelAnalysisId) {
        this.pestelAnalysisId = pestelAnalysisId;
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
}

