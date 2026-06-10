/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelGeneral
 *  com.estrat.service.db.dao.ControlPanelGeneralRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ControlPanelGeneral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlPanelGeneralRepository
extends JpaRepository<ControlPanelGeneral, Long> {
    @Query(value="SELECT c FROM ControlPanelGeneral c WHERE  c.orgId=:orgId")
    public ControlPanelGeneral findAllByOrgId(@Param(value="orgId") Long var1);
}

