/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.RiskFormulation
 *  com.estrat.backend.db.bean.po.RiskFormulationEmbeddedId
 *  com.estrat.backend.db.bean.po.RiskFormulationUserMapping
 *  com.estrat.backend.db.repository.RiskFormulationMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.RiskFormulation;
import com.estrat.backend.db.bean.po.RiskFormulationEmbeddedId;
import com.estrat.backend.db.bean.po.RiskFormulationUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskFormulationMappingRepository
extends JpaRepository<RiskFormulationUserMapping, RiskFormulationEmbeddedId> {
    public List<RiskFormulationUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);

    public void deleteByIdRiskFormulationId(RiskFormulation var1);
}

