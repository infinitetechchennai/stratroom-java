/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.NotificationEntity
 *  com.estrat.service.db.dao.NotificationQueueRepository
 *  com.estrat.service.db.service.EmailService
 *  com.estrat.service.db.service.NotificationSender
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Scheduled
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.NotificationEntity;
import com.estrat.service.db.dao.NotificationQueueRepository;
import com.estrat.service.db.service.EmailService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class NotificationSender {
    @Autowired
    private NotificationQueueRepository notificationRepository;
    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate=60000L)
    public void processNotifications() {
        List notifications = this.notificationRepository.findBySentFalse();
        notifications.forEach(arg_0 -> this.sendAndMarkNotification(arg_0));
        this.notificationRepository.saveAll((Iterable)notifications);
    }

    private void sendAndMarkNotification(NotificationEntity notificationEntity) {
        String message = this.buildMessage(notificationEntity);
        String subject = this.buildSubject(notificationEntity);
        this.emailService.sendMail(notificationEntity.getEmployeeEmail(), subject, message);
        notificationEntity.setSent(true);
    }

    private String buildMessage(NotificationEntity notificationEntity) {
        String fullName = notificationEntity.getEmployeeFullName();
        String kpiDetails = "This email is information on the achievement of KPIs/Work Plans for the month " + notificationEntity.getMonthYear() + ".\n\nKPI/Work Plan " + notificationEntity.getKpiName() + " Division/Unit " + notificationEntity.getDepartmentName() + " ";
        if (notificationEntity.getNotificationType() == 1) {
            return "Dear " + fullName + ",\n\n" + kpiDetails + "has Red Status.\n\nThe achievement value is " + notificationEntity.getActualValue() + " and the target Value is " + notificationEntity.getTargetValue() + ".\n\nThank You.\n Performance Management System\n\n Notes:\n\nIf the status does not reflect the actual data, the achievement should be adjusted to the latest value.";
        }
        return "Dear " + fullName + ",\n\n" + kpiDetails + "has the same Value as previous month or has not been filled in.\n\nThank You.\n Performance Management System\n\n Notes:\n\nIf the status does not reflect the actual data, the achievement should be adjusted to the latest value.";
    }

    private String buildSubject(NotificationEntity notificationEntity) {
        if (notificationEntity.getNotificationType() == 1) {
            return "KPI Turn Red Notification " + notificationEntity.getMonthYear();
        }
        return "Monthly Data not Updated " + notificationEntity.getMonthYear();
    }
}

