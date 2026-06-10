/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmpCommentMapping
 *  com.estrat.backend.db.repository.EmpCommentMappingRepo
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.EmpCommentMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpCommentMappingRepo
extends JpaRepository<EmpCommentMapping, Long> {
    @Query(value="SELECT c.empId FROM EmpCommentMapping c WHERE  c.commentId=:cmdId")
    public List<Long> findAllByCmdId(@Param(value="cmdId") Long var1);

    @Query(value="SELECT c FROM EmpCommentMapping c WHERE  c.commentId=:cmdId AND c.empId =:empId")
    public EmpCommentMapping findByCmdIdANDEmpId(@Param(value="empId") Long var1, @Param(value="cmdId") Long var2);
}

