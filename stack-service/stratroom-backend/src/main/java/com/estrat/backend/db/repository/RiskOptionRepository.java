/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskOptions
 *  com.estrat.backend.db.repository.RiskOptionRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.RiskOptions;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskOptionRepository
extends JpaRepository<RiskOptions, Integer> {
    @Query(value="SELECT * FROM orgstructure.risk_options c WHERE  c.value =:value and c.type_val=:type", nativeQuery=true)
    public List<RiskOptions> findbyunique(@Param(value="value") String var1, @Param(value="type") String var2);
}

