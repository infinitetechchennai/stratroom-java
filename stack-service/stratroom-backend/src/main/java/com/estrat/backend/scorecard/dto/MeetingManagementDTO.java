/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.Employee
 *  com.estrat.backend.scorecard.dto.MeetingManagementDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.Employee;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MeetingManagementDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> meetingManagementValue;
    private LocalDateTime meetingTime;
    private List<Employee> multipleOwerlist;
    private long pageId;
    private String pageName;
    private boolean recommendationmethod;

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
    }

    public LocalDateTime getMeetingTime() {
        return this.meetingTime;
    }

    public void setMeetingTime(LocalDateTime meetingTime) {
        this.meetingTime = meetingTime;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public Map<String, Object> getMeetingManagementValue() {
        return this.meetingManagementValue;
    }

    public void setMeetingManagementValue(Map<String, Object> meetingManagementValue) {
        this.meetingManagementValue = meetingManagementValue;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public boolean isRecommendationmethod() {
        return this.recommendationmethod;
    }

    public void setRecommendationmethod(boolean recommendationmethod) {
        this.recommendationmethod = recommendationmethod;
    }
}

