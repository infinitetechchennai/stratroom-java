/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KpiDetailsAttachments
 *  com.estrat.backend.db.dto.KpiDetailsAttachmentsDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.KpiDetailsAttachments;
import java.time.LocalDateTime;

public class KpiDetailsAttachmentsDTO {
    private long id;
    private long createdBy;
    private long updatedBy;
    private Long kpiDataId;
    private String name;
    private String size;
    private String type;
    private String file;
    private String uniqueFileReference;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long kpiId;

    public KpiDetailsAttachmentsDTO() {
    }

    public KpiDetailsAttachmentsDTO(KpiDetailsAttachments kpiDetailsAttachments) {
        this.id = kpiDetailsAttachments.getId();
        this.createdBy = kpiDetailsAttachments.getCreatedBy();
        this.createdTime = kpiDetailsAttachments.getCreatedTime();
        this.name = kpiDetailsAttachments.getName();
        this.size = kpiDetailsAttachments.getSize();
        this.type = kpiDetailsAttachments.getType();
        this.file = kpiDetailsAttachments.getFile();
        this.updatedBy = kpiDetailsAttachments.getUpdatedBy();
        this.updatedTime = kpiDetailsAttachments.getUpdatedTime();
        this.kpiDataId = kpiDetailsAttachments.getKpiDataId();
        this.kpiId = kpiDetailsAttachments.getKpiId();
        this.uniqueFileReference = kpiDetailsAttachments.getUniqueFileReference();
    }

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

    public Long getKpiDataId() {
        return this.kpiDataId;
    }

    public void setKpiDataId(Long kpiDataId) {
        this.kpiDataId = kpiDataId;
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

    public Long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(Long kpiId) {
        this.kpiId = kpiId;
    }

    public String getUniqueFileReference() {
        return this.uniqueFileReference;
    }

    public void setUniqueFileReference(String uniqueFileReference) {
        this.uniqueFileReference = uniqueFileReference;
    }
}

