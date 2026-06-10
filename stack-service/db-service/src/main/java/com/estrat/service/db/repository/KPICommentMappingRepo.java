/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPICommentMapping
 *  com.estrat.service.db.repository.KPICommentMappingRepo
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.KPICommentMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KPICommentMappingRepo
extends JpaRepository<KPICommentMapping, Long> {
    @Query(value="SELECT c.empId FROM KPICommentMapping c WHERE  c.commentId=:cmdId")
    public List<Long> findAllByCmdId(@Param(value="cmdId") Long var1);

    @Query(value="SELECT c FROM KPICommentMapping c WHERE  c.commentId=:cmdId AND c.empId =:empId")
    public KPICommentMapping findByCmdIdANDEmpId(@Param(value="empId") Long var1, @Param(value="cmdId") Long var2);
}

