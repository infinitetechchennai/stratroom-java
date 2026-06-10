/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditManagementAttachment
 *  com.estrat.service.db.dao.AuditManagementAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.AuditManagementAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditManagementAttachmentRepository
extends JpaRepository<AuditManagementAttachment, Long> {
    @Query(value="SELECT s FROM AuditManagementAttachment s WHERE s.auditManagementId.id =:initId")
    public List<AuditManagementAttachment> findAllByAuditId(@Param(value="initId") Long var1);

    @Query(value="SELECT t FROM AuditManagementAttachment t WHERE t.createdBy=:empId  AND t.active =:active")
    public List<AuditManagementAttachment> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

