/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationRiskDetails
 *  com.estrat.backend.db.repository.FormulationRiskRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.FormulationRiskDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulationRiskRepository
extends JpaRepository<FormulationRiskDetails, Long> {
    @Query(value="SELECT  * FROM formulation_risk_details \tWHERE department=:dept AND formulation_id=:formulationId", nativeQuery=true)
    public List<FormulationRiskDetails> findByDept(@Param(value="dept") String var1, @Param(value="formulationId") Long var2);
}

