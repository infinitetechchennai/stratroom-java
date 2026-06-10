/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PestelAnalysis
 *  com.estrat.backend.db.dao.PestelAnalysisRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.PestelAnalysis;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PestelAnalysisRepository
extends JpaRepository<PestelAnalysis, Long> {
    @Query(value="SELECT p FROM PestelAnalysis p WHERE   (p.owner=:empId OR p.createdBy=:empId) AND p.active =:active AND p.flagType =:type")
    public List<PestelAnalysis> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="type") String var3);

    @Query(value="SELECT p FROM PestelAnalysis p WHERE   (p.owner=:empId OR p.createdBy=:empId) AND p.active =:active AND p.flagType =:type AND p.pageId.id =:pageId")
    public List<PestelAnalysis> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="type") String var3, @Param(value="pageId") Long var4);

    @Query(value="SELECT p FROM PestelAnalysis p WHERE  p.pageId.id =:pageId")
    public List<PestelAnalysis> findAllByPageId(@Param(value="pageId") Long var1);
}

