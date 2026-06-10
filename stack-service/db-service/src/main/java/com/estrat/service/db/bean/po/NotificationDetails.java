/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.NotificationDetails
 *  com.estrat.service.db.dto.NotificationDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.NotificationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="notification_details", schema="orgstructure")
public class NotificationDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="notification_value")
    private String notificationValue;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="status")
    private String status;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="meeting_time")
    private LocalDateTime meetingTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="target_id")
    private long targetValue;
    @Column(name="type")
    private String notificationType;

    public NotificationDetails() {
    }

    public NotificationDetails(NotificationDTO notificationDTO) {
        ZonedDateTime timeUTC;
        ZonedDateTime timeDefault;
        this.id = notificationDTO.getId();
        this.active = notificationDTO.getActive();
        this.owner = notificationDTO.getOwner();
        this.createdBy = notificationDTO.getCreatedBy();
        this.updatedBy = notificationDTO.getUpdatedBy();
        if (Objects.nonNull(notificationDTO.getCreatedTime())) {
            LocalDateTime createdTime = notificationDTO.getCreatedTime();
            timeDefault = createdTime.atZone(ZoneId.systemDefault());
            timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
            this.createdTime = timeUTC.toLocalDateTime();
        }
        if (Objects.nonNull(notificationDTO.getUpdatedTime())) {
            LocalDateTime updatedTime = notificationDTO.getUpdatedTime();
            timeDefault = updatedTime.atZone(ZoneId.systemDefault());
            timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
            this.updatedTime = timeUTC.toLocalDateTime();
        }
        this.meetingTime = notificationDTO.getMeetingTime();
        this.status = notificationDTO.getStatus();
        this.targetValue = notificationDTO.getTargetValue();
        this.notificationType = notificationDTO.getNotificationType();
        this.meetingTime = notificationDTO.getMeetingTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.notificationValue = mapper.writeValueAsString((Object)notificationDTO.getNotificationValue());
        }
        catch (JsonProcessingException e) {
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

    public String getNotificationValue() {
        return this.notificationValue;
    }

    public void setNotificationValue(String notificationValue) {
        this.notificationValue = notificationValue;
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

