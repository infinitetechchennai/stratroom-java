/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.dao.OrgDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.OrgDetails;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgDetailsRepository
extends JpaRepository<OrgDetails, Long> {
    @Query(value="SELECT o FROM OrgDetails o where o.name = :name  AND o.status = :active")
    public OrgDetails findByName(@Param(value="name") String var1, @Param(value="active") String var2);

    public Optional<OrgDetails> findByNameAndStatus(String var1, String var2);
}

