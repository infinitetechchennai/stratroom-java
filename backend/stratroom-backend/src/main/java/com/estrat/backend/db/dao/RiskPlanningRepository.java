/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskPlanning
 *  com.estrat.backend.db.dao.RiskPlanningRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskPlanning;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskPlanningRepository
extends JpaRepository<RiskPlanning, Long> {
    @Query(value="SELECT p FROM RiskPlanning p where p.id = :id  AND p.active = :active")
    public Optional<RiskPlanning> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT p FROM RiskPlanning p WHERE   p.pageId.id =:pageId AND p.active =:active")
    public List<RiskPlanning> findAllByPageId(@Param(value="pageId") long var1, @Param(value="active") int var3);
}

