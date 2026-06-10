/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.StagingChange
 *  com.estrat.backend.db.dao.StagingChangeRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.StagingChange;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StagingChangeRepository
extends JpaRepository<StagingChange, Long> {
    @Query(value="SELECT s FROM StagingChange s WHERE s.changeId=:changeId AND s.parentId=0 AND  s.status != 'PENDING'")
    public Optional<StagingChange> findBychangeId(@Param(value="changeId") Long var1);

    @Query(value="SELECT s FROM StagingChange s WHERE s.submittedBy=:submittedBy AND s.parentId=0  AND  s.status != 'PENDING'")
    public List<StagingChange> findAllBySubmittedBy(@Param(value="submittedBy") Long var1);

    @Query(value="SELECT s FROM StagingChange s WHERE s.workflowId=:workflowId")
    public List<StagingChange> findAllByWorkflowId(Long var1);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName=:table AND s.status=:status AND s.submittedBy=:empId")
    public List<StagingChange> findAllByStatusAndTable(@Param(value="table") String var1, @Param(value="status") String var2, @Param(value="empId") Long var3);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName=:table AND s.status != 'APPROVED' AND s.submittedBy=:empId")
    public List<StagingChange> findAllByNotApproved(@Param(value="table") String var1, @Param(value="empId") Long var2);

    @Query(value="SELECT sc FROM StagingChange sc WHERE sc.parentRecordId = :parentRecordId AND sc.tableName = :tableName AND sc.status NOT IN :excludedStatuses")
    public Optional<StagingChange> findByParentRecordIdAndTableNameAndStatusNotIn(@Param(value="parentRecordId") Long var1, @Param(value="tableName") String var2, @Param(value="excludedStatuses") List<String> var3);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName=:table AND s.status != 'APPROVED' AND s.recordId=:recordId")
    public List<StagingChange> getStagingChangeWRecordId(@Param(value="table") String var1, @Param(value="recordId") Long var2);

    @Query(value="SELECT s FROM StagingChange s WHERE s.status != 'APPROVED' AND (s.parentRecordId=:parentrecordId OR s.parentId=:parentchangeId)")
    public List<StagingChange> getStagingChangeWChangeRecordId(@Param(value="parentrecordId") Long var1, @Param(value="parentchangeId") Long var2);

    @Query(value="SELECT s FROM StagingChange s WHERE s.parentId=:parendId")
    public List<StagingChange> findAllByParenId(@Param(value="parendId") Long var1);

    @Query(value="SELECT sc FROM StagingChange sc WHERE sc.recordId = :recordId AND sc.tableName = :tableName AND sc.status != :status")
    public List<StagingChange> findByRecordIdAndTableNameAndStatusNot(@Param(value="recordId") long var1, @Param(value="tableName") String var3, @Param(value="status") String var4);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName = :tableName AND s.recordId = :recordId ORDER BY s.approvedVersion  DESC")
    public Optional<StagingChange> findLatestApprovedChange(@Param(value="tableName") String var1, @Param(value="recordId") Long var2);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName = :tableName AND s.recordId = :recordId AND s.status = 'APPROVED' AND s.submittedBy=:submittedBy AND s.parentId=0ORDER BY s.approvedVersion  ASC")
    public List<StagingChange> findAllApprovedVersions(@Param(value="tableName") String var1, @Param(value="submittedBy") Long var2, @Param(value="recordId") Long var3);

    @Query(value="SELECT s FROM StagingChange s WHERE s.recordId = :recordId AND s.tableName = :tableName AND s.status != 'APPROVED' AND s.status != 'REJECTED'")
    public List<StagingChange> findPendingChanges(@Param(value="recordId") Long var1, @Param(value="tableName") String var2);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName = :tableName AND s.status != 'APPROVED' AND s.status != 'REJECTED'")
    public List<StagingChange> findPendingChangesTableName(@Param(value="tableName") String var1);

    @Query(value="SELECT s FROM StagingChange s WHERE s.tableName = :tableName AND s.status = :status ORDER BY s.createdAt DESC")
    public List<StagingChange> findByTableNameAndStatus(@Param(value="tableName") String var1, @Param(value="status") String var2);
}

