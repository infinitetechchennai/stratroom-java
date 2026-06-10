/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.backend.db.dao.RiskCauseAndConsequenceRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskCauseAndConsequence;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskCauseAndConsequenceRepository
extends JpaRepository<RiskCauseAndConsequence, Long> {
    @Query(value="SELECT r FROM RiskCauseAndConsequence r WHERE r.riskId.id = :riskId AND r.active =:active")
    public List<RiskCauseAndConsequence> findAllByRiskDetailsId(@Param(value="riskId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskCauseAndConsequence r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active")
    public List<RiskCauseAndConsequence> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskCauseAndConsequence r WHERE r.riskId.id = :riskId")
    public List<RiskCauseAndConsequence> findAllByRiskDetailsByRiskId(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskCauseAndConsequence r WHERE r.changeId = :changeId")
    public List<RiskCauseAndConsequence> findByChangeId(@Param(value="changeId") Long var1);
}

