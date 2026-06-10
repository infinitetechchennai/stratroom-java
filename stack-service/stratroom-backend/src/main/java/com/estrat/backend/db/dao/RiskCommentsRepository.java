/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskComments
 *  com.estrat.backend.db.dao.RiskCommentsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskComments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskCommentsRepository
extends JpaRepository<RiskComments, Long> {
    @Query(value="SELECT r FROM RiskComments r WHERE r.riskId = :riskId AND r.active =0")
    public List<RiskComments> findAllByRiskDetailsId(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskComments r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active")
    public List<RiskComments> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskComments r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active AND r.commentType=0 AND r.fromPage =:fromPage")
    public List<RiskComments> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="fromPage") String var3);

    @Query(value="SELECT r FROM RiskComments r WHERE r.commentsParendId = :parendId AND r.active =0")
    public List<RiskComments> findAllByParenId(@Param(value="parendId") Long var1);

    @Query(value="SELECT r FROM RiskComments r WHERE r.riskId = :riskId AND r.commentType=0 AND r.active =0")
    public List<RiskComments> findAllByRiskDetailsIdNoparend(@Param(value="riskId") Long var1);

    @Query(value="SELECT r FROM RiskComments r WHERE r.riskId = :riskId AND r.commentType=0 AND r.active =0 AND r.version<= :version")
    public List<RiskComments> findAllByRiskDetailsIdNoparendWithVersion(@Param(value="riskId") Long var1, @Param(value="version") Long var2);
}

