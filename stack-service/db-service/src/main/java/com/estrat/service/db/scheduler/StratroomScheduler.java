/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.scheduler.StratroomScheduler
 *  com.estrat.service.db.service.NotificationBatchService
 *  com.estrat.service.db.service.SchedulerBatchService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Scheduled
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.scheduler;

import com.estrat.service.db.service.NotificationBatchService;
import com.estrat.service.db.service.SchedulerBatchService;
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
    private SchedulerBatchService schedulerBatchService;
    @Autowired
    private NotificationBatchService notificationBatchService;

    @Scheduled(cron="0 0 0 * * ?")
    public void runScriptBackup() {
        this.log.error((Object)("script backup :: check Execution Time Start :: " + new Date(System.currentTimeMillis())));
        try {
            this.schedulerBatchService.checkBatchDetails();
        }
        catch (Exception e) {
            this.log.error((Object)"Exception occured while processing script batch", (Throwable)e);
        }
        this.log.error((Object)("script backup :: check Execution Time end :: " + new Date(System.currentTimeMillis())));
    }

    @Scheduled(cron="0 0 0 * * *")
    public void initiateNotificationBatch() {
        this.log.error((Object)("Data batch started :: " + new Date(System.currentTimeMillis())));
        try {
            this.notificationBatchService.sendNotification();
        }
        catch (Exception e) {
            this.log.error((Object)"Exception occured while processing notification batch", (Throwable)e);
        }
        this.log.error((Object)("Data batch Ended :: " + new Date(System.currentTimeMillis())));
    }
}

