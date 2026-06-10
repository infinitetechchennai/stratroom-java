/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgTracker
 *  com.estrat.backend.db.repository.OrgTrackerRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.OrgTracker;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgTrackerRepository
extends JpaRepository<OrgTracker, Long> {
    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId ")
    public List<OrgTracker> findBy(@Param(value="empId") long var1);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId and o.parentId=:parentId and o.active=:active and o.pageName is null")
    public OrgTracker findBy(@Param(value="empId") long var1, @Param(value="parentId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.parentId=:parentId ")
    public List<OrgTracker> findByParent(@Param(value="parentId") long var1);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId and o.active=:active and (((o.endDate BETWEEN :startDate AND :endDate)  OR (o.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN o.startDate AND o.endDate)  OR (:endDate BETWEEN o.startDate AND o.endDate)))")
    public OrgTracker findBy(@Param(value="empId") long var1, @Param(value="active") int var3, @Param(value="startDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.parentId=:parentId  and (((o.endDate BETWEEN :startDate AND :endDate)  OR (o.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN o.startDate AND o.endDate)  OR (:endDate BETWEEN o.startDate AND o.endDate)))")
    public List<OrgTracker> findByParent(@Param(value="parentId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId and o.parentId=:parentId and  o.pageId=:pageId and  o.active=:active ")
    public OrgTracker findBy(@Param(value="empId") long var1, @Param(value="parentId") long var3, @Param(value="pageId") long var5, @Param(value="active") int var7);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId  and o.pageId=:pageId and  o.active=:active ")
    public OrgTracker findPageBy(@Param(value="empId") long var1, @Param(value="pageId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId  and (((o.endDate BETWEEN :startDate AND :endDate)  OR (o.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN o.startDate AND o.endDate)  OR (:endDate BETWEEN o.startDate AND o.endDate)))")
    public List<OrgTracker> findByList(@Param(value="empId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId and o.active=:active and o.pageName is NULL")
    public OrgTracker findByNoPageName(@Param(value="empId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT o FROM OrgTracker o WHERE  (o.empId=:empId OR o.parentId=:empId)  and (((o.endDate BETWEEN :startDate AND :endDate)  OR (o.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN o.startDate AND o.endDate)  OR (:endDate BETWEEN o.startDate AND o.endDate)))")
    public List<OrgTracker> findByAllList(@Param(value="empId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId OR o.parentId=:empId")
    public List<OrgTracker> findByAllList(@Param(value="empId") long var1);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId and o.active=:active and o.pageName is NULL")
    public List<OrgTracker> findByNoPageNameList(@Param(value="empId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT o FROM OrgTracker o WHERE  o.empId=:empId  and ( (((o.endDate BETWEEN :startDate AND :endDate)  OR (o.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN o.startDate AND o.endDate)  OR (:endDate BETWEEN o.startDate AND o.endDate))) OR o.endDate is NULL )")
    public List<OrgTracker> findByListANDPresent(@Param(value="empId") long var1, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);
}

