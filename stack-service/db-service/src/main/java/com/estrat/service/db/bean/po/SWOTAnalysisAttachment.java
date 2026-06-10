/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SWOTAnalysis
 *  com.estrat.service.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.SWOTAnalysis;
import com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="swot_analysis_attachment", schema="orgstructure")
public class SWOTAnalysisAttachment {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @ManyToOne
    @JoinColumn(name="swot_analysis_id")
    private SWOTAnalysis swotAnalysisId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
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

    public SWOTAnalysisAttachment() {
    }

    public SWOTAnalysisAttachment(SWOTAnalysisAttachmentDTO swotAnalysisAttachment) {
        this.id = swotAnalysisAttachment.getId();
        SWOTAnalysis swotAnalysis = new SWOTAnalysis();
        swotAnalysis.setId(swotAnalysisAttachment.getSwotAnalysisId());
        this.swotAnalysisId = swotAnalysis;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public SWOTAnalysis getSwotAnalysisId() {
        return this.swotAnalysisId;
    }

    public void setSwotAnalysisId(SWOTAnalysis swotAnalysisId) {
        this.swotAnalysisId = swotAnalysisId;
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

