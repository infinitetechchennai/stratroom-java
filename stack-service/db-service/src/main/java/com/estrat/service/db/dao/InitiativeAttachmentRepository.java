/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativeAttachment
 *  com.estrat.service.db.dao.InitiativeAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.InitiativeAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InitiativeAttachmentRepository
extends JpaRepository<InitiativeAttachment, Long> {
    @Query(value="SELECT s FROM InitiativeAttachment s WHERE s.initiativesId.id =:initId")
    public List<InitiativeAttachment> findAllByInitId(@Param(value="initId") Long var1);

    @Query(value="SELECT t FROM InitiativeAttachment t WHERE t.createdBy=:empId  AND t.active =:active")
    public List<InitiativeAttachment> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

