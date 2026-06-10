/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ProcessEnabler
 *  com.estrat.service.db.dao.ProcessEnablerRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ProcessEnabler;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessEnablerRepository
extends JpaRepository<ProcessEnabler, Long> {
    @Query(value="SELECT s FROM ProcessEnabler s WHERE s.owner=:empId OR s.createBy=:empId ")
    public List<ProcessEnabler> findAllByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE s.pageId.id =:pageId")
    public List<ProcessEnabler> findAllByPageId(@Param(value="pageId") Long var1);

    @Query(value="SELECT s FROM ProcessEnabler s  WHERE   s.createBy IN (:empIds) ")
    public List<ProcessEnabler> findAllByEmpIds(@Param(value="empIds") List<Long> var1);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE s.pageId.id IN (:pageIds)AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<ProcessEnabler> findAllByposPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE s.pageId.id IN (:pageIds)")
    public List<ProcessEnabler> findAllByposPageIds(@Param(value="pageIds") List<Long> var1);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE  s.deptId IN (:deptIds)")
    public List<ProcessEnabler> findAllByDeptIds(@Param(value="deptIds") List<Long> var1);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE   s.pageId.id =:pageId AND s.status=:status AND (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<ProcessEnabler> findAllByPageANDDate(@Param(value="pageId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3, String var4);

    @Query(value="SELECT s FROM ProcessEnabler s WHERE   s.pageId.id =:pageId AND (s.status !='DRAFT' OR s.status IS NULL) AND (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<ProcessEnabler> findAllByPageANDDateNoDRAFT(@Param(value="pageId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT r FROM ProcessEnabler r WHERE r.changeId = :changeId")
    public List<ProcessEnabler> findByChangeId(@Param(value="changeId") Long var1);
}

