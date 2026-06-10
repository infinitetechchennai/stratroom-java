/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MeetingManagementAttachment
 *  com.estrat.backend.db.dto.MeetingManagementAttachmentDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.MeetingManagementAttachment;
import java.time.LocalDateTime;

public class MeetingManagementAttachmentDTO {
    private long id;
    private long meetingManagementId;
    private int active = 0;
    private long createdBy;
    private long updatedBy;
    private String name;
    private String size;
    private String type;
    private String file;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public MeetingManagementAttachmentDTO() {
    }

    public MeetingManagementAttachmentDTO(MeetingManagementAttachment managementAttachment) {
        this.id = managementAttachment.getId();
        this.meetingManagementId = managementAttachment.getMeetingManagementId().getId();
        this.active = managementAttachment.getActive();
        this.createdBy = managementAttachment.getCreatedBy();
        this.updatedBy = managementAttachment.getUpdatedBy();
        this.name = managementAttachment.getName();
        this.size = managementAttachment.getSize();
        this.type = managementAttachment.getType();
        this.file = managementAttachment.getFile();
        this.createdTime = managementAttachment.getCreatedTime();
        this.updatedTime = managementAttachment.getUpdatedTime();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getMeetingManagementId() {
        return this.meetingManagementId;
    }

    public void setMeetingManagementId(long meetingManagementId) {
        this.meetingManagementId = meetingManagementId;
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

