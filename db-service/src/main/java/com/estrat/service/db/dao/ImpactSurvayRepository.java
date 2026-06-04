/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ImpactSurvay
 *  com.estrat.service.db.dao.ImpactSurvayRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ImpactSurvay;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpactSurvayRepository
extends JpaRepository<ImpactSurvay, Long> {
    @Query(value="SELECT s FROM ImpactSurvay s WHERE s.owner=:empId OR s.createBy=:empId ")
    public List<ImpactSurvay> findAllByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT s FROM ImpactSurvay s WHERE s.pageId.id =:pageId")
    public List<ImpactSurvay> findAllByPageId(@Param(value="pageId") Long var1);

    @Query(value="SELECT s FROM ImpactSurvay s WHERE  s.departmentId IN (:deptIds) ")
    public List<ImpactSurvay> findAllByDeptIds(@Param(value="deptIds") List<Long> var1);

    @Query(value="SELECT s FROM ImpactSurvay s WHERE s.pageId.id IN (:pageIds)AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<ImpactSurvay> findAllByImpactPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT s FROM ImpactSurvay s WHERE   s.pageId.id =:pageId AND  (((s.updateTime BETWEEN :startDate AND :endDate)  OR (s.createTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.createTime AND s.updateTime)  OR (:endDate BETWEEN s.createTime AND s.updateTime))) order  by s.id asc")
    public List<ImpactSurvay> findAllByPageANDDate(@Param(value="pageId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);
}

