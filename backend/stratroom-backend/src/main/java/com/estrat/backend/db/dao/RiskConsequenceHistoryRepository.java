/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory
 *  com.estrat.backend.db.dao.RiskConsequenceHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskConsequenceHistoryRepository
extends JpaRepository<RiskConsequenceDetailsHistory, Long> {
    @Query(value="SELECT r FROM RiskConsequenceDetailsHistory r WHERE r.causeConqId = :causeConqId AND r.version <= :version AND r.active=0")
    public List<RiskConsequenceDetailsHistory> findByRiskIdAndVersion(@Param(value="causeConqId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT r FROM RiskConsequenceDetailsHistory r WHERE r.id = :conceId ")
    public List<RiskConsequenceDetailsHistory> findAllByconcequId(@Param(value="conceId") Long var1);
}

