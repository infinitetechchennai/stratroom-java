/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskDetailsHistory
 *  com.estrat.service.db.dao.RiskDetailsHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Modifying
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.RiskDetailsHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskDetailsHistoryRepository
extends JpaRepository<RiskDetailsHistory, Long> {
    @Query(value="SELECT r FROM RiskDetailsHistory r WHERE r.riskDetailId = :riskId AND r.id IN (    SELECT MAX(r2.id) FROM RiskDetailsHistory r2     WHERE r2.riskDetailId = :riskId     GROUP BY r2.version) ORDER BY r.version DESC")
    public List<RiskDetailsHistory> findAllByRiskId(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskDetailsHistory r WHERE r.riskDetailId = :riskId AND r.version = :version AND r.active=0")
    public Optional<RiskDetailsHistory> findByRiskIdAndVersion(@Param(value="riskId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT COUNT(r) FROM RiskDetailsHistory r WHERE r.riskDetailId = :riskId")
    public long countByRiskId(@Param(value="riskId") Long var1);

    @Modifying
    @Query(value="DELETE FROM RiskDetailsHistory r WHERE r.riskDetailId = :riskId")
    public void deleteByRiskId(@Param(value="riskId") Long var1);
}

