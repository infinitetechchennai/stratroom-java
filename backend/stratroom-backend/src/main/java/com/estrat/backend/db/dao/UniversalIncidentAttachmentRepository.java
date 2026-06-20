/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.UniversalIncidentAttachment
 *  com.estrat.backend.db.dao.UniversalIncidentAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.UniversalIncidentAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversalIncidentAttachmentRepository
extends JpaRepository<UniversalIncidentAttachment, Long> {
    @Query(value="SELECT u FROM UniversalIncidentAttachment u WHERE u.incidentId =:incidentId")
    public List<UniversalIncidentAttachment> findAllAttachment(@Param(value="incidentId") Long var1);
}

