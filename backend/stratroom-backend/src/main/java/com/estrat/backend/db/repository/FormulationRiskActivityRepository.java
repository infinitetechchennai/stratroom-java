/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationRiskActivities
 *  com.estrat.backend.db.repository.FormulationRiskActivityRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.FormulationRiskActivities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulationRiskActivityRepository
extends JpaRepository<FormulationRiskActivities, Long> {
}

