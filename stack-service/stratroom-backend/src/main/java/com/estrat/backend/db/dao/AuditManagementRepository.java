/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditManagement
 *  com.estrat.backend.db.dao.AuditManagementRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.AuditManagement;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditManagementRepository
extends JpaRepository<AuditManagement, Long> {
    @Query(value="SELECT p FROM AuditManagement p where p.id = :id  AND p.active = :active")
    public Optional<AuditManagement> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT p FROM AuditManagement p WHERE p.active =:active AND p.pageId.id =:pageId AND (((p.endDate BETWEEN :startDate AND :endDate)  OR (p.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN p.startDate AND p.endDate)  OR (:endDate BETWEEN p.startDate AND p.endDate))) ORDER By p.endDate desc")
    public List<AuditManagement> findAllByEmpId(@Param(value="active") int var1, @Param(value="pageId") long var2, @Param(value="startDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT p FROM AuditManagement p WHERE   p.pageId.id =:pageId AND p.active =:active")
    public List<AuditManagement> findAllByPageId(@Param(value="pageId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT p FROM AuditManagement p WHERE   p.departmentId =:deptId AND p.active =:active")
    public List<AuditManagement> findAllByDeptId(@Param(value="deptId") long var1, @Param(value="active") int var3);
}

