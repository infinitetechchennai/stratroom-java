/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SWOTAnalysis
 *  com.estrat.backend.db.dao.SwotAnalysisRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.SWOTAnalysis;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SwotAnalysisRepository
extends JpaRepository<SWOTAnalysis, Long> {
    @Query(value="SELECT s FROM SWOTAnalysis s WHERE (s.owner=:empId OR s.createdBy=:empId) AND s.active =:active AND s.flagType =:type")
    public List<SWOTAnalysis> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="type") String var3);

    @Query(value="SELECT s FROM SWOTAnalysis s WHERE (s.owner=:empId OR s.createdBy=:empId) AND s.active =:active AND s.flagType =:type AND s.pageId.id =:pageId")
    public List<SWOTAnalysis> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="type") String var3, @Param(value="pageId") Long var4);

    @Query(value="SELECT s FROM SWOTAnalysis s WHERE s.pageId.id =:pageId")
    public List<SWOTAnalysis> findAllByPageId(@Param(value="pageId") Long var1);
}

