/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.StrategyFormulation
 *  com.estrat.service.db.repository.StrategyFormulationRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.StrategyFormulation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StrategyFormulationRepository
extends JpaRepository<StrategyFormulation, Long> {
    @Query(value="SELECT sf FROM StrategyFormulation sf WHERE sf.createdBy=:empId")
    public List<StrategyFormulation> findByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT sf FROM StrategyFormulation sf WHERE sf.pageId.id=:pageId")
    public List<StrategyFormulation> findByPageId(@Param(value="pageId") Long var1);
}

