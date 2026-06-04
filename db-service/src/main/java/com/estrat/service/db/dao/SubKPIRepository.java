/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubKPI
 *  com.estrat.service.db.dao.SubKPIRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.SubKPI;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubKPIRepository
extends JpaRepository<SubKPI, Long> {
    @Query(value="SELECT t FROM SubKPI t where t.id = :id  AND t.active = :active")
    public Optional<SubKPI> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT dt.departmentId FROM SubKPI t, Objectives o, ScoreCard sc, ScoreCardDetails dt where dt.id=sc.scoreCardDetailsId.id and sc.id=o.scoreCardId.id and o.id=t.objectiveId and t.id = :id  AND t.active = :active")
    public String findDeptbyKPI(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM SubKPI t where t.objectiveId=:objId AND t.active = :active")
    public List<SubKPI> findByObjIdAndActive(@Param(value="objId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT MAX(k.id) FROM SubKPI k")
    public Long maxsubkpi();

    @Query(value="SELECT * FROM subkpi sk WHERE sk.kpi_id IN (SELECT k.id FROM kpi k WHERE k.objective_id IN (SELECT o.id FROM objectives o WHERE o.score_card_id IN (SELECT s.id FROM score_card s WHERE s.scoreCardDetailsId = :scorecardId))) AND sk.active = :active", nativeQuery=true)
    public List<SubKPI> findSubKPIByScorecardId(@Param(value="scorecardId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT sk FROM subkpi sk WHERE sk.kpi_id IN (SELECT k.id FROM kpi k WHERE k.objective_id IN (SELECT o.id FROM objectives o WHERE o.score_card_id IN (SELECT s.id FROM score_card s WHERE s.scoreCardDetailsId = :scorecardId))) AND sk.active = :active", nativeQuery=true)
    public List<SubKPI> findSubKPIBySubKpiNameANDDeptIds(@Param(value="scorecardId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT sk FROM SubKPI sk WHERE  sk.subKpiName=:kpiName AND sk.active=:active AND sk.orgId=:orgId AND sk.kpiId IN (   SELECT k.id FROM KPI k WHERE k.objectiveId IN (   \tSELECT o.id FROM Objectives o WHERE o.scoreCardId.id IN (   \t\tSELECT s.id FROM ScoreCard s WHERE s.scoreCardDetailsId.id IN (   \t\t\tSELECT dtl.id FROM ScoreCardDetails dtl WHERE dtl.departmentId IN :deptIds      \t\t )    \t)  \t)  ) ")
    public List<SubKPI> subkpiListBySubKpiNameANDDeptIds(@Param(value="deptIds") List<Long> var1, @Param(value="kpiName") String var2, @Param(value="active") int var3, @Param(value="orgId") Long var4);
}

