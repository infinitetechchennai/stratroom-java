/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MeetingManagement
 *  com.estrat.backend.db.dao.MeetingManagementRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.MeetingManagement;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingManagementRepository
extends JpaRepository<MeetingManagement, Long> {
    @Query(value="SELECT m FROM MeetingManagement m where m.id = :id  AND m.active = :active")
    public Optional<MeetingManagement> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT m FROM MeetingManagement m WHERE   (m.owner=:empId OR m.createdBy=:empId) AND m.active =:active")
    public List<MeetingManagement> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT m FROM MeetingManagement m WHERE   (m.owner=:empId OR m.createdBy=:empId) AND m.active =:active AND m.pageId.id =:pageId")
    public List<MeetingManagement> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3);

    @Query(value="SELECT m FROM MeetingManagement m WHERE   m.pageId.id =:pageId")
    public List<MeetingManagement> findAllByPageId(@Param(value="pageId") long var1);

    @Query(value="SELECT m FROM MeetingManagement m WHERE   (m.owner=:empId OR m.createdBy=:empId) AND m.active =:active AND (((m.endDate BETWEEN :startDate AND :endDate)  OR (m.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN m.startDate AND m.endDate)  OR (:endDate BETWEEN m.startDate AND m.endDate)))")
    public List<MeetingManagement> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT m FROM MeetingManagement m WHERE   (m.owner=:empId OR m.createdBy=:empId) AND m.active =:active AND m.pageId.id =:pageId AND (((m.endDate BETWEEN :startDate AND :endDate)  OR (m.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN m.startDate AND m.endDate)  OR (:endDate BETWEEN m.startDate AND m.endDate))) ORDER By m.endDate desc")
    public List<MeetingManagement> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3, @Param(value="startDate") Date var5, @Param(value="endDate") Date var6);
}

