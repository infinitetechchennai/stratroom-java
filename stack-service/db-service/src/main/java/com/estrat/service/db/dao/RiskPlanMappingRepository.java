/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.bean.po.RiskPlanUserEmbeddedId
 *  com.estrat.service.db.bean.po.RiskPlanUserMapping
 *  com.estrat.service.db.dao.RiskPlanMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.RiskPlan;
import com.estrat.service.db.bean.po.RiskPlanUserEmbeddedId;
import com.estrat.service.db.bean.po.RiskPlanUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskPlanMappingRepository
extends JpaRepository<RiskPlanUserMapping, RiskPlanUserEmbeddedId> {
    public void deleteByIdRiskPlanId(RiskPlan var1);

    public List<RiskPlanUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);
}

