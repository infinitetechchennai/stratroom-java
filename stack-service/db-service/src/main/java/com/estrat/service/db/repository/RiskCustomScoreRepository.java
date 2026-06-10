/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskCustomScore
 *  com.estrat.service.db.repository.RiskCustomScoreRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.RiskCustomScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskCustomScoreRepository
extends JpaRepository<RiskCustomScore, Integer> {
    @Query(value="SELECT * FROM orgstructure.risk_custom_score c WHERE  c.priority =:priority", nativeQuery=true)
    public RiskCustomScore findbyunique(@Param(value="priority") int var1);
}

