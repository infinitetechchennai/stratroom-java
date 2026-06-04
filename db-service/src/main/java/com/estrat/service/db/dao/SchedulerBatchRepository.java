/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SchedulerBatchDetails
 *  com.estrat.service.db.dao.SchedulerBatchRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.SchedulerBatchDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerBatchRepository
extends JpaRepository<SchedulerBatchDetails, Long> {
    @Query(value="SELECT c FROM SchedulerBatchDetails c WHERE  c.orgId=:orgId")
    public SchedulerBatchDetails findByOrgId(@Param(value="orgId") Long var1);
}

