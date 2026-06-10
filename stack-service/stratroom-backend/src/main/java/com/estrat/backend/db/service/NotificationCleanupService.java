/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dao.NotificationQueueRepository
 *  com.estrat.backend.db.service.NotificationCleanupService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Scheduled
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.dao.NotificationQueueRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class NotificationCleanupService {
    @Autowired
    private NotificationQueueRepository notificationRepository;

    @Scheduled(cron="0 0 2 * * ?")
    public void cleanUpOldNotifications() {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3L);
        int deletedCount = this.notificationRepository.deleteBySentTrueAndDateOfNotificationBefore(threeDaysAgo);
        System.out.println("Deleted " + deletedCount + " old notifications from the database.");
    }
}

