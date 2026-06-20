/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIComments
 *  com.estrat.backend.db.dao.KPICommentsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.KPIComments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KPICommentsRepository
extends JpaRepository<KPIComments, Long> {
    @Query(value="SELECT t FROM KPIComments t WHERE t.commentsKpiId = :id AND active =:active AND t.commentType=0")
    public List<KPIComments> findAllByKPIId(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPIComments t WHERE (t.owner=:empId OR t.createdBy=:empId) AND t.active =:active AND t.commentType=0")
    public List<KPIComments> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM KPIComments t WHERE t.commentsParendId = :parendId AND t.active =0")
    public List<KPIComments> findAllByParenId(@Param(value="parendId") Long var1);
}

