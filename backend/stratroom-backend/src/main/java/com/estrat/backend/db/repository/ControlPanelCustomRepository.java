/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelCustomPerformance
 *  com.estrat.backend.db.repository.ControlPanelCustomRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.ControlPanelCustomPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlPanelCustomRepository
extends JpaRepository<ControlPanelCustomPerformance, Long> {
}

