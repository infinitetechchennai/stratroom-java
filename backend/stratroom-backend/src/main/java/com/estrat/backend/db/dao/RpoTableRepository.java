/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RpoTable
 *  com.estrat.backend.db.dao.RpoTableRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RpoTable;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RpoTableRepository
extends JpaRepository<RpoTable, Long> {
    @Query(value="SELECT s FROM RpoTable s WHERE s.owner=:empId OR s.createBy=:empId ")
    public List<RpoTable> findAllByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT s FROM RpoTable s WHERE s.pageId.id =:pageId")
    public List<RpoTable> findAllByPageId(@Param(value="pageId") Long var1);

    @Query(value="SELECT s FROM RpoTable s  WHERE   s.createBy IN (:empIds) ")
    public List<RpoTable> findAllByEmpIds(@Param(value="empIds") List<Long> var1);

    @Query(value="SELECT s FROM RpoTable s WHERE s.pageId.id IN (:pageIds) AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<RpoTable> findAllByRpoPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT s FROM RpoTable s WHERE  s.deptId IN (:deptIds)")
    public List<RpoTable> findAllByDeptIds(@Param(value="deptIds") List<Long> var1);

    @Query(value="SELECT s FROM RpoTable s WHERE   s.pageId.id =:pageId AND s.status=:status AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<RpoTable> findAllByPageANDDate(@Param(value="pageId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3, String var4);

    @Query(value="SELECT r FROM RpoTable r WHERE r.changeId = :changeId")
    public List<RpoTable> findByChangeId(@Param(value="changeId") Long var1);

    @Query(value="SELECT s FROM RpoTable s WHERE   s.pageId.id =:pageId AND (s.status !='DRAFT'OR s.status IS NULL) AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<RpoTable> findAllByPageANDDateNoDraft(@Param(value="pageId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);
}

