/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskPlanHistory
 *  com.estrat.backend.db.dao.RiskPlanHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskPlanHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskPlanHistoryRepository
extends JpaRepository<RiskPlanHistory, Long> {
    public List<RiskPlanHistory> findByRiskPlanId(Long var1);

    @Query(value="SELECT r FROM RiskPlanHistory r WHERE r.riskId = :riskId AND r.version <= :version AND r.typeFlag=:typeFlag AND r.active=0")
    public List<RiskPlanHistory> findByRiskIdAndVersion(@Param(value="riskId") Long var1, @Param(value="version") Long var2, @Param(value="typeFlag") String var3);
}

