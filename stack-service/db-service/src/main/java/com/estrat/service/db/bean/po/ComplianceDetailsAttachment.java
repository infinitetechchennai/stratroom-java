/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceDetails
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.OneToOne
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ComplianceDetails;
import com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="compliance_details_attachment", schema="orgstructure")
public class ComplianceDetailsAttachment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
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
    @Column(name="filename")
    private String file;
    @Column(name="uniquereference")
    private String uniqueFileReference;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @OneToOne
    @JoinColumn(name="complaindetal_id", nullable=false)
    private ComplianceDetails complianceDetails;

    public ComplianceDetailsAttachment() {
    }

    public ComplianceDetailsAttachment(ComplianceDetailsAttachmentDTO attachmentsDto) {
        this.id = attachmentsDto.getId();
        this.createdBy = attachmentsDto.getCreatedBy();
        this.createdTime = attachmentsDto.getCreatedTime();
        this.name = attachmentsDto.getName();
        this.size = attachmentsDto.getSize();
        this.type = attachmentsDto.getType();
        this.file = attachmentsDto.getFile();
        this.updatedBy = attachmentsDto.getUpdatedBy();
        this.updatedTime = attachmentsDto.getUpdatedTime();
        if (attachmentsDto.getComplainDetalid() != null) {
            ComplianceDetails complaindetail = new ComplianceDetails();
            complaindetail.setId(attachmentsDto.getComplainDetalid().longValue());
            this.complianceDetails = complaindetail;
        }
        this.uniqueFileReference = attachmentsDto.getUniqueFileReference();
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

    public ComplianceDetails getComplianceDetails() {
        return this.complianceDetails;
    }

    public void setComplianceDetails(ComplianceDetails complianceDetails) {
        this.complianceDetails = complianceDetails;
    }
}

