/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KpiDetailsAttachments
 *  com.estrat.backend.db.dao.KpiDetailsAttachmentsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.KpiDetailsAttachments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KpiDetailsAttachmentsRepository
extends JpaRepository<KpiDetailsAttachments, Long> {
    @Query(value="SELECT a FROM KpiDetailsAttachments a WHERE a.kpiId =:kpiId")
    public List<KpiDetailsAttachments> findAllAttachment(@Param(value="kpiId") Long var1);
}

