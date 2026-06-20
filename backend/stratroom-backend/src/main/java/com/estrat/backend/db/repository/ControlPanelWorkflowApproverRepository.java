/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.backend.db.repository.ControlPanelWorkflowApproverRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ControlPanelWorkflowApproverRepository
extends JpaRepository<ControlPanelWorkFlowApproverMapping, Long> {
    public List<ControlPanelWorkFlowApproverMapping> findByWorkflowId(Long var1);

    public List<ControlPanelWorkFlowApproverMapping> findByaprovalRoleId(Long var1);
}

