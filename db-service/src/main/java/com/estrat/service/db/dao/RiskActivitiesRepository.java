/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskActivities
 *  com.estrat.service.db.dao.RiskActivitiesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.RiskActivities;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskActivitiesRepository
extends JpaRepository<RiskActivities, Long> {
    @Query(value="SELECT r FROM RiskActivities r WHERE r.riskPlanId.id = :riskPlanId AND r.active =0")
    public List<RiskActivities> findAllByRiskPlanId(@Param(value="riskPlanId") Long var1);

    @Query(value="SELECT r FROM RiskActivities r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active")
    public List<RiskActivities> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskActivities r WHERE r.changeId = :changeId")
    public List<RiskActivities> findByChangeId(@Param(value="changeId") Long var1);
}

