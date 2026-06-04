/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.dao.KPIRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.KPI;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KPIRepository
extends JpaRepository<KPI, Long> {
    @Query(value="SELECT t FROM KPI t where t.id = :id  AND t.active = :active")
    public Optional<KPI> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT dt.departmentId FROM KPI t, Objectives o, ScoreCard sc, ScoreCardDetails dt where dt.id=sc.scoreCardDetailsId.id and sc.id=o.scoreCardId.id and o.id=t.objectiveId and t.id = :id  AND t.active = :active")
    public String findDeptbyKPI(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPI t where t.owner = :empId AND t.active = :active")
    public List<KPI> findByOwnerAndActive(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPI t where t.createdBy = :empId AND t.active = :active")
    public List<KPI> findAllByEmpIdAndActive(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPI t where t.objectiveId=:objId AND t.active = :active")
    public List<KPI> findByObjIdAndActive(@Param(value="objId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPI t WHERE t.kpiName =:kpiName  AND t.active = 0 AND t.owner=:empId")
    public List<KPI> findByKpiNameAndOwnerId(@Param(value="kpiName") String var1, @Param(value="empId") Long var2);

    @Query(value="SELECT t FROM KPI t WHERE t.orgId =:orgId  AND t.active = 0 AND t.kpiId=:kpiId")
    public List<KPI> findByOrgIdAndKpiId(@Param(value="orgId") Long var1, @Param(value="kpiId") String var2);

    @Query(value="SELECT t FROM KPI t where t.orgId = :orgId AND t.active = 0")
    public List<KPI> findAllByOrgId(@Param(value="orgId") Long var1);

    @Query(value="SELECT t FROM KPI t where t.active = :active")
    public List<KPI> findAll(@Param(value="active") int var1);

    @Query(value="SELECT t FROM KPI t where t.createdBy = :empId AND t.active = :active AND t.kpiName = :kpiName")
    public List<KPI> findByName(@Param(value="empId") Long var1, @Param(value="kpiName") String var2, @Param(value="active") int var3);

    @Query(value="SELECT k FROM KPI k where k.objectiveId=:objId AND k.active = :active AND (((k.endDate BETWEEN :startDate AND :endDate)  OR (k.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN k.startDate AND k.endDate)  OR (:endDate BETWEEN k.startDate AND k.endDate))  OR  ((k.endDate >= :startDate) AND (k.startDate <= :endDate)))")
    public List<KPI> findByObjIdAndActiveByDate(@Param(value="objId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM KPI t where t.createdBy IN (:empIds) AND t.active = :active")
    public List<KPI> findAllByEmpIds(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT k FROM KPI k where k.objectiveId in (SELECT id FROM Objectives o where o.scoreCardId.id in (SELECT id FROM ScoreCard s where s.scoreCardDetailsId.id = :scorecardId)) AND k.active = :active")
    public List<KPI> findByScorecardId(@Param(value="scorecardId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPI t where t.orgId = :orgId AND t.active = 0 AND t.actType = 1")
    public List<KPI> findAllByOrgIdAndAct(@Param(value="orgId") Long var1);

    @Query(value="SELECT k FROM KPI k where k.objectiveId in (SELECT id FROM Objectives o where o.scoreCardId.id in (SELECT id FROM ScoreCard s where s.scoreCardDetailsId.id in (select dtl.id from ScoreCardDetails dtl where dtl.departmentId = :deptId))) AND k.active = :active")
    public List<KPI> findByDeptId(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT k FROM KPI k where k.objectiveId in (SELECT id FROM Objectives o where o.scoreCardId.id in (SELECT id FROM ScoreCard s where s.scoreCardDetailsId.id in (select dtl.id from ScoreCardDetails dtl where dtl.departmentId = :deptId))) AND k.active = :active AND (((k.endDate BETWEEN :startDate AND :endDate)  OR (k.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN k.startDate AND k.endDate)  OR (:endDate BETWEEN k.startDate AND k.endDate))  OR  ((k.endDate >= :startDate) AND (k.startDate <= :endDate)))")
    public List<KPI> findByDeptIdbydate(@Param(value="deptId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT k FROM KPI k where k.kpiId =:kpiId AND k.objectiveId in (SELECT id FROM Objectives o where o.scoreCardId.id in (SELECT id FROM ScoreCard s where s.scoreCardDetailsId.id in (select dtl.id from ScoreCardDetails dtl where dtl.departmentId = :deptId))) AND k.active = :active AND k.orgId = :orgId")
    public List<KPI> findByDeptIdandkpiId(@Param(value="deptId") Long var1, @Param(value="active") int var2, @Param(value="kpiId") String var3, @Param(value="orgId") Long var4);

    @Query(value="SELECT MAX(k.id) FROM KPI k")
    public Long maxkpi();

    @Query(value="SELECT k  FROM KPI k   WHERE k.kpiName  = :kpiName   AND k.orgId     = :orgId   AND k.active    = :active   AND k.objectiveId IN (     SELECT o.id     FROM Objectives o     WHERE o.scoreCardId.id IN (       SELECT s.id       FROM ScoreCard s       WHERE s.scoreCardDetailsId.id IN (         SELECT dtl.id         FROM ScoreCardDetails dtl         WHERE dtl.departmentId IN :deptIds       )    )  )")
    public List<KPI> kpiListByDeptsAndKpiNameAndOrg(@Param(value="deptIds") List<Long> var1, @Param(value="kpiName") String var2, @Param(value="active") int var3, @Param(value="orgId") Long var4);
}

