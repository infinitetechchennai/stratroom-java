/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationSubInitiatives
 *  com.estrat.service.db.repository.FormulationSubInitiativesRespository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.FormulationSubInitiatives;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulationSubInitiativesRespository
extends JpaRepository<FormulationSubInitiatives, Long> {
}

