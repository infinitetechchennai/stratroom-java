/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  com.estrat.backend.db.dao.OrgstructureGroupRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.OrgstructureGroup;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrgstructureGroupRepository
extends JpaRepository<OrgstructureGroup, Long> {
    @Query(value="SELECT o FROM OrgstructureGroup o where o.id = :id  AND o.active = :active")
    public Optional<OrgstructureGroup> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT o FROM OrgstructureGroup o WHERE  o.active =:active")
    public List<OrgstructureGroup> findAllByActive(@Param(value="active") int var1);
}

