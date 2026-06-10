/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubKPIEntrys
 *  com.estrat.backend.db.dao.SubKPIEntrysRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.SubKPIEntrys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubKPIEntrysRepository
extends JpaRepository<SubKPIEntrys, Long> {
    public SubKPIEntrys findTopBySubkpiIdOrderByIdDesc(Long var1);

    @Query(value="SELECT s FROM SubKPIEntrys s WHERE s.subkpiId = :subkpiId ORDER BY s.id DESC")
    public SubKPIEntrys findTopBySubKpiId(@Param(value="subkpiId") Long var1);
}

