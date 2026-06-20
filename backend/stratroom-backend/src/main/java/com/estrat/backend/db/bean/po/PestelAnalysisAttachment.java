/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PestelAnalysis
 *  com.estrat.backend.db.bean.po.PestelAnalysisAttachment
 *  com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PestelAnalysis;
import com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="pestel_analysis_attachment", schema="orgstructure")
public class PestelAnalysisAttachment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @ManyToOne
    @JoinColumn(name="pestel_analysis_id")
    private PestelAnalysis pestelAnalysisId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="name")
    private String name;
    @Column(name="size")
    private String size;
    @Column(name="type")
    private String type;
    @Column(name="file")
    private String file;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    public PestelAnalysisAttachment() {
    }

    public PestelAnalysisAttachment(PestelAnalysisAttachmentDTO pestelAnalysisAttachment) {
        this.id = pestelAnalysisAttachment.getId();
        PestelAnalysis pestelAnalysis = new PestelAnalysis();
        pestelAnalysis.setId(pestelAnalysisAttachment.getPestelAnalysisId());
        this.pestelAnalysisId = pestelAnalysis;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public PestelAnalysis getPestelAnalysisId() {
        return this.pestelAnalysisId;
    }

    public void setPestelAnalysisId(PestelAnalysis pestelAnalysisId) {
        this.pestelAnalysisId = pestelAnalysisId;
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

