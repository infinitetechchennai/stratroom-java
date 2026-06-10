/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.batch.notifications.NotificationBatchService
 *  com.estrat.service.etl.batch.scheduler.StratroomScheduler
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Scheduled
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.batch.scheduler;

import com.estrat.service.etl.batch.notifications.NotificationBatchService;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StratroomScheduler {
    private Logger log = LoggerFactory.getLogger(StratroomScheduler.class);
    @Autowired
    private NotificationBatchService notificationBatchService;
    @Autowired
    private String cronExpressionKPISchedule;

    @Scheduled(fixedRate=1440000L)
    public void initiateNotificationBatch() {
        this.log.error("Data batch started :: " + new Date(System.currentTimeMillis()));
        this.notificationBatchService.sendNotification();
        this.log.error("Data batch Ended :: " + new Date(System.currentTimeMillis()));
    }

    @Scheduled(cron="#{cronExpressionKPISchedule}")
    public void kpiStatusNotification() {
        this.log.error("Data kpiStatusNotification batch started :: " + new Date(System.currentTimeMillis()));
        this.notificationBatchService.kpiStatusNotification();
        this.log.error("Data kpiStatusNotification batch Ended :: " + new Date(System.currentTimeMillis()));
    }
}

