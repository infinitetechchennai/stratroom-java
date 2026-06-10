/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.dao.RiskPlanRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.RiskPlan;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskPlanRepository
extends JpaRepository<RiskPlan, Long> {
    @Query(value="SELECT r FROM RiskPlan r WHERE r.riskId.id = :riskId AND r.active =0")
    public List<RiskPlan> findAllByRiskDetailsId(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskPlan r LEFT JOIN r.ownerList o WHERE   (o.id.empId.empId = :empId OR r.createdBy = :empId) AND r.active =:active")
    public List<RiskPlan> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskPlan r WHERE r.riskId.id = :riskId AND  r.typeFlag =:typeFlag AND r.active =0")
    public List<RiskPlan> findAllByRiskDetailsIdANDTypeFlag(@Param(value="riskId") Long var1, @Param(value="typeFlag") String var2);

    @Query(value="SELECT r FROM RiskPlan r LEFT JOIN r.ownerList o WHERE  (o.id.empId.empId = :empId OR r.createdBy = :empId) AND r.active =:active AND  r.typeFlag =:typeFlag")
    public List<RiskPlan> findAllByEmpIdANDTypeFlag(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="typeFlag") String var3);

    @Query(value="SELECT r FROM RiskPlan r LEFT JOIN r.ownerList o WHERE  (o.id.empId.empId IN (:empIds) OR r.createdBy IN (:empIds)) AND r.active =:active AND  r.typeFlag =:typeFlag")
    public List<RiskPlan> findAllByEmpId(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2, @Param(value="typeFlag") String var3);

    @Query(value="SELECT r FROM RiskPlan r WHERE r.riskId.id IN (:riskId) AND  (((r.updatedTime BETWEEN :startDate AND :endDate)  OR (r.createdTime BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.createdTime AND r.updatedTime)  OR (:endDate BETWEEN r.createdTime AND r.updatedTime))) AND  r.typeFlag =:typeFlag AND r.active =0  ")
    public List<RiskPlan> findAllByRiskIds(@Param(value="riskId") List<Long> var1, @Param(value="typeFlag") String var2, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4);

    @Query(value="SELECT r FROM RiskPlan r WHERE r.changeId = :changeId")
    public List<RiskPlan> findByChangeId(@Param(value="changeId") Long var1);
}

