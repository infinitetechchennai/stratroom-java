/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditManagement
 *  com.estrat.backend.db.bean.po.AuditManagementAttachment
 *  com.estrat.backend.db.dto.AuditManagementAttachmentDTO
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

import com.estrat.backend.db.bean.po.AuditManagement;
import com.estrat.backend.db.dto.AuditManagementAttachmentDTO;
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
@Table(name="auditmanagement_attachment", schema="orgstructure")
public class AuditManagementAttachment {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @ManyToOne
    @JoinColumn(name="auditmanagementid")
    private AuditManagement auditManagementId;
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
    @Column(name="uniquereference")
    private String uniqueFileReference;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    public AuditManagementAttachment() {
    }

    public AuditManagementAttachment(AuditManagementAttachmentDTO auditAttachmentDto) {
        this.id = auditAttachmentDto.getId();
        AuditManagement init = new AuditManagement();
        init.setId(auditAttachmentDto.getAuditManagementId());
        this.auditManagementId = init;
        this.active = auditAttachmentDto.getActive();
        this.createdBy = auditAttachmentDto.getCreatedBy();
        this.updatedBy = auditAttachmentDto.getUpdatedBy();
        this.name = auditAttachmentDto.getName();
        this.size = auditAttachmentDto.getSize();
        this.type = auditAttachmentDto.getType();
        this.file = auditAttachmentDto.getFile();
        this.createdTime = auditAttachmentDto.getCreatedTime();
        this.updatedTime = auditAttachmentDto.getUpdatedTime();
        this.fileName = auditAttachmentDto.getFileName();
        this.uniqueFileReference = auditAttachmentDto.getUniqueFileReference();
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

    public AuditManagement getAuditManagementId() {
        return this.auditManagementId;
    }

    public void setAuditManagementId(AuditManagement auditManagementId) {
        this.auditManagementId = auditManagementId;
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
}

