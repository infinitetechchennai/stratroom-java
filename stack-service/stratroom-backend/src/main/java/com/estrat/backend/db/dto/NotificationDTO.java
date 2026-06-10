/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.NotificationDetails
 *  com.estrat.backend.db.dto.NotificationDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.NotificationDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class NotificationDTO {
    private long id;
    private Map<String, Object> notificationValue;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String status;
    private long targetValue;
    private String notificationType;
    private LocalDateTime meetingTime;

    public NotificationDTO() {
    }

    public NotificationDTO(NotificationDetails notificationDetails) {
        LocalDateTime timeUTC;
        this.id = notificationDetails.getId();
        this.active = notificationDetails.getActive();
        this.owner = notificationDetails.getOwner();
        this.createdBy = notificationDetails.getCreatedBy();
        this.updatedBy = notificationDetails.getUpdatedBy();
        if (Objects.nonNull(notificationDetails.getCreatedTime())) {
            LocalDateTime createdTime = notificationDetails.getCreatedTime();
            this.createdTime = timeUTC = createdTime.atZone(ZoneOffset.UTC).toLocalDateTime();
        }
        if (Objects.nonNull(notificationDetails.getUpdatedTime())) {
            LocalDateTime updatedTime = notificationDetails.getUpdatedTime();
            this.updatedTime = timeUTC = updatedTime.atZone(ZoneOffset.UTC).toLocalDateTime();
        }
        this.meetingTime = notificationDetails.getMeetingTime();
        this.status = notificationDetails.getStatus();
        this.targetValue = notificationDetails.getTargetValue();
        this.notificationType = notificationDetails.getNotificationType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.notificationValue = (Map)mapper.readValue(notificationDetails.getNotificationValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public LocalDateTime getMeetingTime() {
        return this.meetingTime;
    }

    public void setMeetingTime(LocalDateTime meetingTime) {
        this.meetingTime = meetingTime;
    }

    public long getTargetValue() {
        return this.targetValue;
    }

    public void setTargetValue(long targetValue) {
        this.targetValue = targetValue;
    }

    public String getNotificationType() {
        return this.notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNotificationValue(Map<String, Object> notificationValue) {
        this.notificationValue = notificationValue;
    }

    public Map<String, Object> getNotificationValue() {
        return this.notificationValue;
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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

