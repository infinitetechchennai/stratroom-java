/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.dao.ComplianceDetailsAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ComplianceDetailsAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplianceDetailsAttachmentRepository
extends JpaRepository<ComplianceDetailsAttachment, Long> {
    @Query(value="SELECT a FROM ComplianceDetailsAttachment a WHERE a.complianceDetails.id =:complainId")
    public ComplianceDetailsAttachment findAllByComplainDetailId(@Param(value="complainId") Long var1);
}

