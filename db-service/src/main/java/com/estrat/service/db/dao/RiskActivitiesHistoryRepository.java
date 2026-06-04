/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskActivities
 *  com.estrat.service.db.bean.po.RiskActivitiesHistory
 *  com.estrat.service.db.dao.RiskActivitiesHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.RiskActivities;
import com.estrat.service.db.bean.po.RiskActivitiesHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskActivitiesHistoryRepository
extends JpaRepository<RiskActivitiesHistory, Long> {
    public List<RiskActivitiesHistory> findByRiskActivitiesIdAndVersion(RiskActivities var1, long var2);

    @Query(value="SELECT r FROM RiskActivitiesHistory r WHERE r.riskPlanId = :planId AND r.version <= :version AND r.active=0")
    public List<RiskActivitiesHistory> findByRiskIdAndVersion(@Param(value="planId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT r FROM RiskActivitiesHistory r WHERE r.riskActivitiesId.id = :activeId ")
    public List<RiskActivitiesHistory> findAllByactiveId(@Param(value="activeId") Long var1);
}

