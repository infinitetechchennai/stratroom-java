/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskEvent
 *  com.estrat.service.db.dao.RiskEventRepository
 *  org.springframework.data.domain.Page
 *  org.springframework.data.domain.Pageable
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.RiskEvent;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RiskEventRepository
extends JpaRepository<RiskEvent, Long> {
    @Query(value="SELECT r FROM RiskEvent r WHERE   r.pageId=:pageId  and r.status=:status")
    public List<RiskEvent> findByPageId(@Param(value="pageId") Long var1, @Param(value="status") String var2);

    public List<RiskEvent> findByDepartmentId(Long var1);

    @Query(value="SELECT r FROM RiskEvent r  WHERE   r.createdBy IN (:empIds)")
    public List<RiskEvent> findAllByEmpIds(@Param(value="empIds") List<String> var1);

    @Query(value="SELECT r FROM RiskEvent r WHERE   r.pageId IN (:pageIds)")
    public List<RiskEvent> findAllByPageIds(@Param(value="pageIds") List<Long> var1);

    @Query(value="SELECT r FROM RiskEvent r WHERE r.pageId IN (:pageIds)")
    public Page<RiskEvent> findAllByPageIdswithlimit(@Param(value="pageIds") List<Long> var1, Pageable var2);

    @Query(value="SELECT r FROM RiskEvent r WHERE  r.departmentId IN (:deptIds)")
    public List<RiskEvent> findAllByDeptIds(@Param(value="deptIds") List<Long> var1);

    @Query(value="SELECT r FROM RiskEvent r WHERE   r.pageId IN (:pageIds) AND (r.incidentDate BETWEEN :startDate AND :endDate)")
    public List<RiskEvent> findAllByPageIdsANDDateRanges(@Param(value="pageIds") List<Long> var1, @Param(value="startDate") String var2, @Param(value="endDate") String var3);

    @Query(value="SELECT r FROM RiskEvent r WHERE r.pageId IN (:pageIds) AND ((r.createdAt BETWEEN :startDate AND :endDate) OR (r.updatedAt BETWEEN :startDate AND :endDate)) ")
    public Page<RiskEvent> findAllByPageIdsANDDateRanges(@Param(value="pageIds") List<Long> var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3, Pageable var4);

    @Query(value="SELECT r FROM RiskEvent r WHERE r.changeId = :changeId")
    public List<RiskEvent> findByChangeId(@Param(value="changeId") Long var1);

    @Query(value="SELECT r FROM RiskEvent r WHERE   r.pageId=:pageId  and (r.status !='DRAFT' OR r.status IS NULL) ")
    public List<RiskEvent> findByPageIdNoDraft(@Param(value="pageId") Long var1);
}

