/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.OrgStructureDetails
 *  com.estrat.service.db.repository.OrgStructureDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.OrgStructureDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgStructureDetailsRepository
extends JpaRepository<OrgStructureDetails, Long> {
    @Query(value="SELECT c FROM OrgStructureDetails c WHERE  c.empId=:empId and c.status=:status")
    public OrgStructureDetails findByMapping(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM OrgStructureDetails c WHERE  c.empId=:empId")
    public List<OrgStructureDetails> findList(@Param(value="empId") long var1);
}

