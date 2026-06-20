/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.backend.db.dto.SWOTAnalysisAttachmentDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.SWOTAnalysisAttachment;
import java.time.LocalDateTime;

public class SWOTAnalysisAttachmentDTO {
    private long id;
    private long swotAnalysisId;
    private int active = 0;
    private Long createdBy;
    private Long updatedBy;
    private String name;
    private String size;
    private String type;
    private String file;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public SWOTAnalysisAttachmentDTO() {
    }

    public SWOTAnalysisAttachmentDTO(SWOTAnalysisAttachment swotAnalysisAttachment) {
        this.id = swotAnalysisAttachment.getId();
        this.swotAnalysisId = swotAnalysisAttachment.getSwotAnalysisId().getId();
        this.active = swotAnalysisAttachment.getActive();
        this.createdBy = swotAnalysisAttachment.getCreatedBy();
        this.updatedBy = swotAnalysisAttachment.getUpdatedBy();
        this.name = swotAnalysisAttachment.getName();
        this.size = swotAnalysisAttachment.getSize();
        this.type = swotAnalysisAttachment.getType();
        this.file = swotAnalysisAttachment.getFile();
        this.createdTime = swotAnalysisAttachment.getCreatedTime();
        this.updatedTime = swotAnalysisAttachment.getUpdatedTime();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSwotAnalysisId() {
        return this.swotAnalysisId;
    }

    public void setSwotAnalysisId(long swotAnalysisId) {
        this.swotAnalysisId = swotAnalysisId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

