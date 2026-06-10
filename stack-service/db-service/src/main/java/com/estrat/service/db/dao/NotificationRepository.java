/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.NotificationDetails
 *  com.estrat.service.db.dao.NotificationRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.NotificationDetails;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository
extends JpaRepository<NotificationDetails, Long> {
    @Query(value="SELECT n FROM NotificationDetails n where n.id = :id  AND n.active = :active")
    public Optional<NotificationDetails> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT n FROM NotificationDetails n WHERE n.owner=:empId AND n.active =:active order by n.createdTime desc")
    public List<NotificationDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT n FROM NotificationDetails n WHERE n.owner=:owner AND  n.notificationType=:type AND n.targetValue=:targetId AND n.active=0")
    public List<NotificationDetails> findAllByEntityAndOwner(@Param(value="owner") Long var1, @Param(value="type") String var2, @Param(value="targetId") long var3);

    @Query(value="SELECT n FROM NotificationDetails n WHERE n.owner=:owner AND  n.notificationType=:type  AND n.active=0")
    public List<NotificationDetails> findAllByTypeAndOwner(@Param(value="owner") Long var1, @Param(value="type") String var2);

    @Query(value="SELECT n FROM NotificationDetails n WHERE n.meetingTime BETWEEN :currentTime AND :endtime AND n.notificationType='Meeting' AND n.meetingTime IS NOT NULL AND n.active=0 and n.owner=:owner")
    public List<NotificationDetails> findAllByMeetingTime(@Param(value="currentTime") LocalDateTime var1, @Param(value="endtime") LocalDateTime var2, @Param(value="owner") Long var3);
}

