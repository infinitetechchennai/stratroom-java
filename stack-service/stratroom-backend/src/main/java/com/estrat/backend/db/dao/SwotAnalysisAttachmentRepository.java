/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.backend.db.dao.SwotAnalysisAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.SWOTAnalysisAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SwotAnalysisAttachmentRepository
extends JpaRepository<SWOTAnalysisAttachment, Long> {
    @Query(value="SELECT s FROM SWOTAnalysisAttachment s WHERE s.swotAnalysisId.id =:swotId")
    public List<SWOTAnalysisAttachment> findAllBySwotId(@Param(value="swotId") Long var1);
}

