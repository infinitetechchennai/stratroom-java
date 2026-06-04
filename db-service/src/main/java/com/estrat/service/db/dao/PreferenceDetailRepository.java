/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PreferenceSubDetail
 *  com.estrat.service.db.dao.PreferenceDetailRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.PreferenceSubDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferenceDetailRepository
extends JpaRepository<PreferenceSubDetail, Long> {
    @Query(value="SELECT d FROM PreferenceSubDetail d WHERE d.daskboardId.id = :dashId")
    public List<PreferenceSubDetail> findAllByDashId(@Param(value="dashId") Long var1);

    @Query(value="SELECT d FROM PreferenceSubDetail d WHERE d.chartId.id = :chartId")
    public List<PreferenceSubDetail> findAllBychartIdId(@Param(value="chartId") Long var1);
}

