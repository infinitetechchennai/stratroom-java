/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskEventHistory
 *  com.estrat.backend.db.dao.RiskEventHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskEventHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskEventHistoryRepository
extends JpaRepository<RiskEventHistory, Long> {
    @Query(value="SELECT r FROM RiskEventHistory r WHERE r.riskEventId = :riskId ORDER BY r.version DESC")
    public List<RiskEventHistory> findAllByRiskEventId(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskEventHistory r WHERE r.riskEventId = :riskId AND r.version = :version")
    public Optional<RiskEventHistory> findByRiskEventIdAndVersion(@Param(value="riskId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT COUNT(r) FROM RiskEventHistory r WHERE r.riskEventId = :riskId")
    public long countByRiskId(@Param(value="riskId") Long var1);
}

