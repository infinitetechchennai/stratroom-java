/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MasterValue
 *  com.estrat.backend.db.dao.MasterValueRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.MasterValue;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterValueRepository
extends JpaRepository<MasterValue, Long> {
    @Query(value="SELECT m FROM MasterValue m WHERE m.type = :type")
    public List<MasterValue> findAllByType(@Param(value="type") String var1);
}

