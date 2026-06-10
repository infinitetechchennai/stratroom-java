/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelSecurity
 *  com.estrat.backend.db.dao.ControlPanelSecurityRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ControlPanelSecurity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlPanelSecurityRepository
extends JpaRepository<ControlPanelSecurity, Long> {
    @Query(value="SELECT c FROM ControlPanelSecurity c WHERE  c.orgId=:orgId")
    public ControlPanelSecurity findAllByOrgId(@Param(value="orgId") Long var1);
}

