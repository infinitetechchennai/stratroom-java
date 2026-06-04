/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditDetails
 *  com.estrat.service.db.dao.AuditDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.AuditDetails;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditDetailsRepository
extends JpaRepository<AuditDetails, Long> {
    @Query(value="SELECT a FROM AuditDetails a WHERE a.orgId =:orgId AND a.userId=:userId AND a.action=:action AND a.accessDate BETWEEN :fromDate AND :endDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndUserIdWithAction(@Param(value="orgId") Long var1, @Param(value="userId") Long var2, @Param(value="action") String var3, @Param(value="fromDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND a.userId=:userId AND a.action=:action  ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeANDAction(@Param(value="orgId") Long var1, @Param(value="userId") Long var2, @Param(value="action") String var3);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND a.userId=:userId AND  a.accessDate BETWEEN :fromDate AND :endDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndUserId(@Param(value="orgId") Long var1, @Param(value="userId") Long var2, @Param(value="fromDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND  a.action=:action AND a.accessDate BETWEEN :fromDate AND :endDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndAction(@Param(value="orgId") Long var1, @Param(value="action") String var2, @Param(value="fromDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT a FROM AuditDetails a WHERE a.orgId =:orgId AND  a.accessDate BETWEEN :fromDate AND :endDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRange(@Param(value="orgId") Long var1, @Param(value="fromDate") Date var2, @Param(value="endDate") Date var3);

    @Query(value="SELECT a FROM AuditDetails a WHERE a.orgId =:orgId  ORDER BY a.id DESC")
    public List<AuditDetails> findAllByOrderBy(@Param(value="orgId") Long var1);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND a.action=:action  ORDER BY a.id DESC")
    public List<AuditDetails> findAllByAction(@Param(value="orgId") Long var1, @Param(value="action") String var2);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND a.userId=:userId  ORDER BY a.id DESC")
    public List<AuditDetails> findAllByPerformedBy(@Param(value="orgId") Long var1, @Param(value="userId") Long var2);

    @Query(value="SELECT a FROM AuditDetails a WHERE a.orgId =:orgId AND a.userId=:userId AND a.action=:action AND a.accessDate =:accessDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndUserIdWithAction(@Param(value="orgId") Long var1, @Param(value="userId") Long var2, @Param(value="action") String var3, @Param(value="accessDate") Date var4);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND a.userId=:userId AND  a.accessDate =:accessDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndUserId(@Param(value="orgId") Long var1, @Param(value="userId") Long var2, @Param(value="accessDate") Date var3);

    @Query(value="SELECT a FROM AuditDetails a WHERE  a.orgId =:orgId AND  a.action=:action AND a.accessDate =:accessDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRangeAndAction(@Param(value="orgId") Long var1, @Param(value="action") String var2, @Param(value="accessDate") Date var3);

    @Query(value="SELECT a FROM AuditDetails a WHERE a.orgId =:orgId AND  a.accessDate =:accessDate ORDER BY a.id DESC")
    public List<AuditDetails> findAllByDateRange(@Param(value="orgId") Long var1, @Param(value="accessDate") Date var2);

    @Query(value="SELECT DISTINCT a.action FROM AuditDetails a")
    public List<String> getActionList();
}

