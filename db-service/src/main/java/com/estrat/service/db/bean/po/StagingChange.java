/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.StagingChange
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="staging_changes", schema="orgstructure")
public class StagingChange {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="change_id")
    private Long changeId;
    @Column(name="table_name", nullable=false)
    private String tableName;
    @Column(name="record_id", nullable=false)
    private Long recordId;
    @Column(name="column_name", nullable=false)
    private String columnName;
    @Column(name="old_value")
    private String oldValue;
    @Column(name="new_value")
    private String newValue;
    @Column(name="status", nullable=false)
    private String status;
    @Column(name="type")
    private String type;
    @Column(name="submitted_by")
    private Long submittedBy;
    @Column(name="workflow_id")
    private Long workflowId;
    @Column(name="created_at", nullable=false)
    private LocalDateTime createdAt;
    @Column(name="updated_at")
    private LocalDateTime updatedAt;
    @Column(name="comments")
    private String comments;
    @Column(name="version")
    private long version;
    @Column(name="parent_id")
    private long parentId = 0L;
    @Column(name="parent_record_id")
    private long parentRecordId = 0L;
    @Column(name="condition_type")
    private String conditionType;
    @Column(name="approved_version")
    private long approvedVersion;

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }

    public String getTableName() {
        return this.tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Long getRecordId() {
        return this.recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public String getColumnName() {
        return this.columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getOldValue() {
        return this.oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return this.newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getSubmittedBy() {
        return this.submittedBy;
    }

    public void setSubmittedBy(Long submittedBy) {
        this.submittedBy = submittedBy;
    }

    public Long getWorkflowId() {
        return this.workflowId;
    }

    public void setWorkflowId(Long workflowId) {
        this.workflowId = workflowId;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public long getParentId() {
        return this.parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public String getConditionType() {
        return this.conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public long getApprovedVersion() {
        return this.approvedVersion;
    }

    public void setApprovedVersion(long approvedVersion) {
        this.approvedVersion = approvedVersion;
    }

    public long getParentRecordId() {
        return this.parentRecordId;
    }

    public void setParentRecordId(long parentRecordId) {
        this.parentRecordId = parentRecordId;
    }

    public String toString() {
        return "StagingChange [changeId=" + this.changeId + ", tableName=" + this.tableName + ", recordId=" + this.recordId + ", columnName=" + this.columnName + ", oldValue=" + this.oldValue + ", newValue=" + this.newValue + ", status=" + this.status + ", type=" + this.type + ", submittedBy=" + this.submittedBy + ", workflowId=" + this.workflowId + ", createdAt=" + this.createdAt + ", updatedAt=" + this.updatedAt + ", comments=" + this.comments + ", version=" + this.version + ", parentId=" + this.parentId + ", parentRecordId=" + this.parentRecordId + ", conditionType=" + this.conditionType + ", approvedVersion=" + this.approvedVersion + "]";
    }
}

