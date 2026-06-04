/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationInitiatives
 *  com.estrat.service.db.repository.FormulationInitiativesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.FormulationInitiatives;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulationInitiativesRepository
extends JpaRepository<FormulationInitiatives, Long> {
    @Query(value="SELECT f FROM FormulationInitiatives f\tWHERE f.department=:dept AND f.formulationId.id=:formulationId")
    public List<FormulationInitiatives> findByDept(@Param(value="dept") String var1, @Param(value="formulationId") Long var2);

    @Query(value="SELECT f FROM FormulationInitiatives f WHERE f.formulationId.id=:formulationId OR f.owner=:owner")
    public List<FormulationInitiatives> findByOwnerFormulation(@Param(value="owner") Long var1, @Param(value="formulationId") Long var2);
}

