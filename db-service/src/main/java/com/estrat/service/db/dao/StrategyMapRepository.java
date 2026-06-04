/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.StrategyMap
 *  com.estrat.service.db.dao.StrategyMapRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.StrategyMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StrategyMapRepository
extends JpaRepository<StrategyMap, Long> {
    @Query(value="SELECT s FROM StrategyMap s WHERE s.pageId.id =:pageId")
    public StrategyMap findAllByPageId(@Param(value="pageId") long var1);
}

