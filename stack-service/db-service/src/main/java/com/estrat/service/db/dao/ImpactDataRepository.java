/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ImpactData
 *  com.estrat.service.db.dao.ImpactDataRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ImpactData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpactDataRepository
extends JpaRepository<ImpactData, Long> {
    @Query(value="SELECT s FROM ImpactData s WHERE s.impactId =:impactId")
    public List<ImpactData> findAllByImpactId(@Param(value="impactId") Long var1);
}

