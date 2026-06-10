/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlPanelWorkFlowRepository
extends JpaRepository<ControlPanelWorkFlow, Long> {
    @Query(value="SELECT w FROM ControlPanelWorkFlow w WHERE w.type = :type AND w.department = :departmentId")
    public List<ControlPanelWorkFlow> findWorkflowsByTypeAndDepartment(String var1, Long var2);
}

