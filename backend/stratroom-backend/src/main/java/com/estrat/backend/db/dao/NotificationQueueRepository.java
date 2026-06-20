/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.NotificationEntity
 *  com.estrat.backend.db.dao.NotificationQueueRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.NotificationEntity;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationQueueRepository
extends JpaRepository<NotificationEntity, Long> {
    public List<NotificationEntity> findBySentFalse();

    public NotificationEntity findByKpiIdAndNotificationTypeAndDateOfNotification(String var1, Integer var2, LocalDate var3);

    public int deleteBySentTrueAndDateOfNotificationBefore(LocalDate var1);
}

