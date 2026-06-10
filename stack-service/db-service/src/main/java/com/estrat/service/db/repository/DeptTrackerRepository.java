/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptTracker
 *  com.estrat.service.db.repository.DeptTrackerRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.DeptTracker;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeptTrackerRepository
extends JpaRepository<DeptTracker, Long> {
    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId ")
    public List<DeptTracker> findBy(@Param(value="deptId") long var1);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId and d.parentId=:parentId and d.active=:active")
    public DeptTracker findBy(@Param(value="deptId") long var1, @Param(value="parentId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.parentId=:parentId ")
    public List<DeptTracker> findByParent(@Param(value="parentId") long var1);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId  and (((d.endDate BETWEEN :startDate AND :endDate)  OR (d.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN d.startDate AND d.endDate)  OR (:endDate BETWEEN d.startDate AND d.endDate)))")
    public List<DeptTracker> findBy(@Param(value="deptId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.parentId=:parentId  and (((d.endDate BETWEEN :startDate AND :endDate)  OR (d.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN d.startDate AND d.endDate)  OR (:endDate BETWEEN d.startDate AND d.endDate)))")
    public List<DeptTracker> findByParent(@Param(value="parentId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId and d.parentId=:parentId and d.pageId=:pageId and d.active=:active")
    public DeptTracker findBy(@Param(value="deptId") long var1, @Param(value="parentId") long var3, @Param(value="pageId") long var5, @Param(value="active") int var7);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId and d.pageId=:pageId and d.active=:active")
    public DeptTracker findByPage(@Param(value="deptId") long var1, @Param(value="pageId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId and d.active=:active and d.pageName is NULL")
    public DeptTracker findBy(@Param(value="deptId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT d FROM DeptTracker d WHERE  (d.deptId=:deptId OR d.parentId=:deptId) and (((d.endDate BETWEEN :startDate AND :endDate)  OR (d.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN d.startDate AND d.endDate)  OR (:endDate BETWEEN d.startDate AND d.endDate)))")
    public List<DeptTracker> findByAllList(@Param(value="deptId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId OR d.parentId=:deptId")
    public List<DeptTracker> findByAllList(@Param(value="deptId") long var1);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId and d.parentId=:parentId and d.active=:active and d.pageName is NULL")
    public DeptTracker findByNoPage(@Param(value="deptId") long var1, @Param(value="parentId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId=:deptId  and ( (((d.endDate BETWEEN :startDate AND :endDate)  OR (d.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN d.startDate AND d.endDate)  OR (:endDate BETWEEN d.startDate AND d.endDate))) OR d.endDate is NULL)")
    public List<DeptTracker> findByPresent(@Param(value="deptId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT d FROM DeptTracker d WHERE  d.deptId IN :deptId ")
    public List<DeptTracker> findBydeptId(@Param(value="deptId") List<Long> var1);
}

