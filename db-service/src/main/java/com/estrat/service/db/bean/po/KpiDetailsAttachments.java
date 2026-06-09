/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KpiDetailsAttachments
 *  com.estrat.service.db.dto.KpiDetailsAttachmentsDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.KpiDetailsAttachmentsDTO;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="kpidetail_attachment", schema="orgstructure")
public class KpiDetailsAttachments {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="kpidata_id")
    private Long kpiDataId;
    @Column(name="name")
    private String name;
    @Column(name="size")
    private String size;
    @Column(name="type")
    private String type;
    @Column(name="filename")
    private String file;
    @Column(name="uniquereference")
    private String uniqueFileReference;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="kpi_id")
    private Long kpiId;

    public KpiDetailsAttachments() {
    }

    public KpiDetailsAttachments(KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDto) {
        this.id = kpiDetailsAttachmentsDto.getId();
        this.createdBy = kpiDetailsAttachmentsDto.getCreatedBy();
        this.createdTime = kpiDetailsAttachmentsDto.getCreatedTime();
        this.name = kpiDetailsAttachmentsDto.getName();
        this.size = kpiDetailsAttachmentsDto.getSize();
        this.type = kpiDetailsAttachmentsDto.getType();
        this.file = kpiDetailsAttachmentsDto.getName();
        this.updatedBy = kpiDetailsAttachmentsDto.getUpdatedBy();
        this.updatedTime = kpiDetailsAttachmentsDto.getUpdatedTime();
        this.kpiDataId = kpiDetailsAttachmentsDto.getKpiDataId();
        this.kpiId = kpiDetailsAttachmentsDto.getKpiId();
        this.uniqueFileReference = kpiDetailsAttachmentsDto.getUniqueFileReference();
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

