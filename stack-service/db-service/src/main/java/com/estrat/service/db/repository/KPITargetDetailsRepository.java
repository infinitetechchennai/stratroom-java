/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KpiTargetDetailsPo
 *  com.estrat.service.db.repository.KPITargetDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.KpiTargetDetailsPo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KPITargetDetailsRepository
extends JpaRepository<KpiTargetDetailsPo, Long> {
    @Query(value="SELECT k FROM KpiTargetDetailsPo k WHERE k.id.kpiId = :id")
    public List<KpiTargetDetailsPo> findAllByKPIId(@Param(value="id") Long var1);
}

