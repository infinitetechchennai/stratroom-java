/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskCauseAndConsequenceHistory
 *  com.estrat.backend.db.dao.RiskCauseAndConsequenceHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskCauseAndConsequenceHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskCauseAndConsequenceHistoryRepository
extends JpaRepository<RiskCauseAndConsequenceHistory, Long> {
    @Query(value="SELECT r FROM RiskCauseAndConsequenceHistory r WHERE r.riskId = :riskId AND r.version <= :version AND r.active=0")
    public List<RiskCauseAndConsequenceHistory> findByRiskIdAndVersion(@Param(value="riskId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT r FROM RiskCauseAndConsequenceHistory r WHERE r.riskCauseAndConsequenceId = :causeId ")
    public List<RiskCauseAndConsequenceHistory> findAllBycauseId(@Param(value="causeId") Long var1);
}

