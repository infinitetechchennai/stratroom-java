/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskAttachment
 *  com.estrat.service.db.bean.po.RiskDetails
 *  com.estrat.service.db.dto.RiskAttachmentDto
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

import com.estrat.service.db.bean.po.RiskDetails;
import com.estrat.service.db.dto.RiskAttachmentDto;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="risk_attachment", schema="orgstructure")
public class RiskAttachment {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @ManyToOne
    @JoinColumn(name="riskid")
    private RiskDetails riskId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="name")
    private String name;
    @Column(name="file_name")
    private String fileName;
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
    @Column(name="uniquereference")
    private String uniqueFileReference;

    public RiskAttachment() {
    }

    public RiskAttachment(RiskAttachmentDto attachmentDto) {
        this.id = attachmentDto.getId();
        RiskDetails init = new RiskDetails();
        init.setId(attachmentDto.getRiskId());
        this.riskId = init;
        this.active = attachmentDto.getActive();
        this.createdBy = attachmentDto.getCreatedBy();
        this.updatedBy = attachmentDto.getUpdatedBy();
        this.name = attachmentDto.getName();
        this.size = attachmentDto.getSize();
        this.type = attachmentDto.getType();
        this.file = attachmentDto.getFile();
        this.createdTime = attachmentDto.getCreatedTime();
        this.updatedTime = attachmentDto.getUpdatedTime();
        this.fileName = attachmentDto.getFileName();
        this.uniqueFileReference = attachmentDto.getUniqueFileReference();
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

    public RiskDetails getRiskId() {
        return this.riskId;
    }

    public void setRiskId(RiskDetails riskId) {
        this.riskId = riskId;
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

