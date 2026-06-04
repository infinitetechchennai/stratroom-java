/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptDetails
 *  com.estrat.service.db.dao.DeptDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.DeptDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeptDetailsRepository
extends JpaRepository<DeptDetails, Long> {
    @Query(value="SELECT e FROM DeptDetails e WHERE e.name=:deptName AND e.orgId =:orgId")
    public DeptDetails findByDeptDetailsByDeptNameAndOrgId(@Param(value="deptName") String var1, @Param(value="orgId") long var2);
}

