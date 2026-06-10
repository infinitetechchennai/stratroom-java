/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIEntrys
 *  com.estrat.service.db.dao.KPIEntrysRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.KPIEntrys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KPIEntrysRepository
extends JpaRepository<KPIEntrys, Long> {
    public KPIEntrys findTopByKpiIdOrderByIdDesc(Long var1);

    @Query(value="SELECT s FROM KPIEntrys s WHERE s.kpiId = :kpiId ORDER BY s.id DESC")
    public KPIEntrys findTopBySubKpiId(@Param(value="kpiId") Long var1);
}

