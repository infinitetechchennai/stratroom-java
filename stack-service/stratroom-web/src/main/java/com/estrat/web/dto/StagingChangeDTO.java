/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ApproversHistoryDTO
 *  com.estrat.web.dto.StagingChangeDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ApproversHistoryDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class StagingChangeDTO {
    private Long id;
    private String eventTitle;
    private String status;
    private LocalDateTime submittedOn;
    private String submittedBy;
    private boolean isSubmitter;
    private String tableName;
    private boolean isCurrentApprover;
    private boolean isPreviousApprover;
    private String currentPendingApprover;
    private String nextApprover;
    private List<ApproversHistoryDTO> approverHistory;
    private Map<String, Object> oldValue;
    private Map<String, Object> newValue;
    private long version;
    private long parentId;
    private String conditionType;
    private long approvedVersion;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventTitle() {
        return this.eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedOn() {
        return this.submittedOn;
    }

    public void setSubmittedOn(LocalDateTime submittedOn) {
        this.submittedOn = submittedOn;
    }

    public String getSubmittedBy() {
        return this.submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public boolean isSubmitter() {
        return this.isSubmitter;
    }

    public void setSubmitter(boolean isSubmitter) {
        this.isSubmitter = isSubmitter;
    }

    public boolean isCurrentApprover() {
        return this.isCurrentApprover;
    }

    public void setCurrentApprover(boolean isCurrentApprover) {
        this.isCurrentApprover = isCurrentApprover;
    }

    public boolean isPreviousApprover() {
        return this.isPreviousApprover;
    }

    public void setPreviousApprover(boolean isPreviousApprover) {
        this.isPreviousApprover = isPreviousApprover;
    }

    public String getCurrentPendingApprover() {
        return this.currentPendingApprover;
    }

    public void setCurrentPendingApprover(String currentPendingApprover) {
        this.currentPendingApprover = currentPendingApprover;
    }

    public String getNextApprover() {
        return this.nextApprover;
    }

    public void setNextApprover(String nextApprover) {
        this.nextApprover = nextApprover;
    }

    public List<ApproversHistoryDTO> getApproverHistory() {
        return this.approverHistory;
    }

    public void setApproverHistory(List<ApproversHistoryDTO> approverHistory) {
        this.approverHistory = approverHistory;
    }

    public Map<String, Object> getOldValue() {
        return this.oldValue;
    }

    public void setOldValue(Map<String, Object> oldValue) {
        this.oldValue = oldValue;
    }

    public Map<String, Object> getNewValue() {
        return this.newValue;
    }

    public void setNewValue(Map<String, Object> newValue) {
        this.newValue = newValue;
    }

    public long getVersion() {
        return this.version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public String getTableName() {
        return this.tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
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
}

