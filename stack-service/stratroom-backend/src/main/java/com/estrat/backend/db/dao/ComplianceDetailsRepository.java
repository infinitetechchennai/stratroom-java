/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceDetails
 *  com.estrat.backend.db.dao.ComplianceDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ComplianceDetails;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplianceDetailsRepository
extends JpaRepository<ComplianceDetails, Long> {
    @Query(value="SELECT c FROM ComplianceDetails c WHERE c.complainAreaId=:areaId AND c.pageId.id=:pageId   OR (c.lastAssessmentDate BETWEEN :startDate AND :endDate    OR c.nextReviewDate BETWEEN :startDate AND :endDate    OR c.actionDueDate BETWEEN :startDate AND :endDate    OR c.lastAuditDate BETWEEN :startDate AND :endDate)")
    public List<ComplianceDetails> findAllByIdWithDateRange(@Param(value="areaId") long var1, @Param(value="pageId") long var3, @Param(value="startDate") Date var5, @Param(value="endDate") Date var6);

    @Query(value="SELECT c FROM ComplianceDetails c WHERE c.complainAreaId=:areaId AND c.pageId.id=:pageId ")
    public List<ComplianceDetails> findAllByPageId(@Param(value="areaId") long var1, @Param(value="pageId") long var3);

    @Query(value="SELECT c FROM ComplianceDetails c WHERE c.complainAreaId=:areaId ")
    public List<ComplianceDetails> findAllByAreaId(@Param(value="areaId") long var1);
}

