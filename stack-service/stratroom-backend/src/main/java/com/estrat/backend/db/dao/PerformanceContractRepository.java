/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PerformanceContract
 *  com.estrat.backend.db.dao.PerformanceContractRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.PerformanceContract;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformanceContractRepository
extends JpaRepository<PerformanceContract, Long> {
    @Query(value="SELECT p FROM PerformanceContract p WHERE (p.owner=:empId OR p.createdBy=:empId)")
    public List<PerformanceContract> findAllByEmpIds(@Param(value="empId") Long var1);

    @Query(value="SELECT p FROM PerformanceContract p WHERE p.scorecardId=:scorecardId ")
    public PerformanceContract findAllByScorecardId(@Param(value="scorecardId") Long var1);
}

