/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SchedulerBatchDetails
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="scheduler_batch_details", schema="orgstructure")
public class SchedulerBatchDetails {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="orgId")
    private long orgId;
    @Column(name="uploaded_by")
    private long uploadedBy;
    @Column(name="scheduler_type")
    private String schedulerType;
    @Column(name="backup_file_path")
    private String backupFilePath;
    @Column(name="backup_path")
    private String backupPath;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="current_batch_time")
    private LocalDateTime currentBatchTime;
    @Column(name="next_batch_time")
    private LocalDateTime nextBatchTime;

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
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

    public LocalDateTime getNextBatchTime() {
        return this.nextBatchTime;
    }

    public void setNextBatchTime(LocalDateTime nextBatchTime) {
        this.nextBatchTime = nextBatchTime;
    }

    public LocalDateTime getCurrentBatchTime() {
        return this.currentBatchTime;
    }

    public void setCurrentBatchTime(LocalDateTime currentBatchTime) {
        this.currentBatchTime = currentBatchTime;
    }

    public long getUploadedBy() {
        return this.uploadedBy;
    }

    public void setUploadedBy(long uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public String getSchedulerType() {
        return this.schedulerType;
    }

    public void setSchedulerType(String schedulerType) {
        this.schedulerType = schedulerType;
    }

    public String getBackupFilePath() {
        return this.backupFilePath;
    }

    public void setBackupFilePath(String backupFilePath) {
        this.backupFilePath = backupFilePath;
    }

    public String getBackupPath() {
        return this.backupPath;
    }

    public void setBackupPath(String backupPath) {
        this.backupPath = backupPath;
    }
}

