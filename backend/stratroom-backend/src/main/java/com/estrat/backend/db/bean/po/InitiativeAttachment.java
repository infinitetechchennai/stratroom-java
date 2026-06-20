/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativeAttachment
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.dto.InitiativeAttachmentDto
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

import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.dto.InitiativeAttachmentDto;
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
@Table(name="initiative_attachment", schema="orgstructure")
public class InitiativeAttachment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @ManyToOne
    @JoinColumn(name="initiativesid")
    private Initiatives initiativesId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
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

    public InitiativeAttachment() {
    }

    public InitiativeAttachment(InitiativeAttachmentDto initiativeAttachmentDto) {
        this.id = initiativeAttachmentDto.getId();
        Initiatives init = new Initiatives();
        init.setId(initiativeAttachmentDto.getInitiativesId());
        this.initiativesId = init;
        this.active = initiativeAttachmentDto.getActive();
        this.createdBy = initiativeAttachmentDto.getCreatedBy();
        this.updatedBy = initiativeAttachmentDto.getUpdatedBy();
        this.name = initiativeAttachmentDto.getName();
        this.size = initiativeAttachmentDto.getSize();
        this.type = initiativeAttachmentDto.getType();
        this.file = initiativeAttachmentDto.getFile();
        this.createdTime = initiativeAttachmentDto.getCreatedTime();
        this.updatedTime = initiativeAttachmentDto.getUpdatedTime();
        this.fileName = initiativeAttachmentDto.getFileName();
        this.uniqueFileReference = initiativeAttachmentDto.getUniqueFileReference();
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

    public Initiatives getInitiativesId() {
        return this.initiativesId;
    }

    public void setInitiativesId(Initiatives initiativesId) {
        this.initiativesId = initiativesId;
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

