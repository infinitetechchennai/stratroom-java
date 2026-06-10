/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ApproversHistory
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Modifying
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 *  org.springframework.transaction.annotation.Transactional
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ApproversHistory;
import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ApproversHistoryRepository
extends JpaRepository<ApproversHistory, Long> {
    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId  and ah.changeId= :changeId and ah.version= :version ORDER BY ah.actionDate DESC")
    public List<ApproversHistory> findAllByWorkflowId(@Param(value="workflowId") Long var1, @Param(value="changeId") Long var2, @Param(value="version") Long var3);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId  and ah.changeId= :changeId  ORDER BY ah.actionDate DESC")
    public List<ApproversHistory> findAllByWorkflowId(@Param(value="workflowId") Long var1, @Param(value="changeId") Long var2);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId AND ah.actionTaken = 'IN PROGRESS' and ah.changeId= :changeId  and ah.version= :version ORDER BY ah.approver.approverOrder ASC")
    public Optional<ApproversHistory> findCurrentPendingApprover(@Param(value="workflowId") Long var1, @Param(value="changeId") Long var2, @Param(value="version") Long var3);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId AND ah.actionTaken = 'REJECTED' and ah.changeId= :changeId  and ah.version= :version ORDER BY ah.approver.approverOrder ASC")
    public Optional<ApproversHistory> findCurrentRejectApprover(@Param(value="workflowId") Long var1, @Param(value="changeId") Long var2, @Param(value="version") Long var3);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.approver.aprovalRoleId = :approverId ORDER BY ah.actionDate DESC")
    public List<ApproversHistory> findAllByApproverId(@Param(value="approverId") Long var1);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.approver.id = :approverId AND ah.actionTaken = :status ORDER BY ah.actionDate DESC")
    public List<ApproversHistory> findAllByApproverIdAndStatus(@Param(value="approverId") Long var1, @Param(value="status") String var2);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId AND ah.approver.approverOrder > :currentOrder and ah.changeId= :changeId and ah.version= :version ORDER BY ah.approver.approverOrder ASC")
    public Optional<ApproversHistory> findNextApprover(@Param(value="workflowId") Long var1, @Param(value="currentOrder") Integer var2, @Param(value="changeId") Long var3, @Param(value="version") Long var4);

    @Query(value="SELECT ah FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId AND ah.actionTaken = 'REJECTED' and ah.changeId= :changeId  and ah.version= :version AND ah.actionBy=:actionBy ORDER BY ah.approver.approverOrder ASC")
    public Optional<ApproversHistory> findCurrentRejectApprover(@Param(value="workflowId") Long var1, @Param(value="changeId") Long var2, @Param(value="version") Long var3, @Param(value="actionBy") Long var4);

    @Modifying
    @Transactional
    @Query(value="DELETE FROM ApproversHistory ah WHERE ah.workflow.id = :workflowId")
    public void deleteByWorkflowId(@Param(value="workflowId") Long var1);

    public boolean existsByWorkflowAndApproverAndActionTakenAndChangeIdAndVersion(ControlPanelWorkFlow var1, ControlPanelWorkFlowApproverMapping var2, String var3, Long var4, Long var5);
}

