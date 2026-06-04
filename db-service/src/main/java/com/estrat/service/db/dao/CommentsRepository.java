/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Comments
 *  com.estrat.service.db.dao.CommentsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.Comments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentsRepository
extends JpaRepository<Comments, Long> {
    @Query(value="SELECT t FROM Comments t WHERE t.commentsInitiativeId =:initiativesId AND t.commentType=0")
    public List<Comments> findAllByInitiativesId(@Param(value="initiativesId") Long var1);

    @Query(value="SELECT t FROM Comments t WHERE t.owner=:empId AND t.active =:active AND t.commentType=0")
    public List<Comments> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Comments t WHERE t.commentsParendId = :parendId AND t.active =0")
    public List<Comments> findAllByParenId(@Param(value="parendId") Long var1);
}

