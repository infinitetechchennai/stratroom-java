/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskAttachment
 *  com.estrat.backend.db.dao.RiskAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskAttachmentRepository
extends JpaRepository<RiskAttachment, Long> {
    @Query(value="SELECT s FROM RiskAttachment s WHERE s.riskId.id =:riskId")
    public List<RiskAttachment> findAllByRiskId(@Param(value="riskId") Long var1);

    @Query(value="SELECT t FROM RiskAttachment t WHERE t.createdBy=:empId  AND t.active =:active")
    public List<RiskAttachment> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

