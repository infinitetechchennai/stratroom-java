/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.TaskStatusResponseDTO
 */
package com.estrat.backend.scorecard.dto;

public class TaskStatusResponseDTO {
    private long pageId;
    private long totalTask;
    private long totalInProgress;
    private long totalComplete;
    private long deptId;

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public long getTotalTask() {
        return this.totalTask;
    }

    public void setTotalTask(long totalTask) {
        this.totalTask = totalTask;
    }

    public long getTotalInProgress() {
        return this.totalInProgress;
    }

    public void setTotalInProgress(long totalInProgress) {
        this.totalInProgress = totalInProgress;
    }

    public long getTotalComplete() {
        return this.totalComplete;
    }

    public void setTotalComplete(long totalComplete) {
        this.totalComplete = totalComplete;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }
}

