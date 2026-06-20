/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RoleDetailsPo
 *  com.estrat.backend.db.repository.RoleRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.RoleDetailsPo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository
extends JpaRepository<RoleDetailsPo, Long> {
    @Query(value="SELECT rd FROM RoleDetailsPo rd  WHERE rd.orgId =:orgId AND rd.type =:type")
    public List<RoleDetailsPo> getRoleList(@Param(value="orgId") long var1, @Param(value="type") int var3);

    @Query(value="SELECT rd FROM RoleDetailsPo rd  WHERE rd.orgId =:orgId AND rd.createdBy =:empId AND rd.roleName =:role AND type =:type")
    public RoleDetailsPo getRole(@Param(value="orgId") long var1, @Param(value="empId") long var3, @Param(value="type") int var5, @Param(value="role") String var6);

    @Query(value="SELECT rd FROM RoleDetailsPo rd  WHERE rd.orgId =:orgId AND rd.roleName =:role AND type =:type")
    public List<RoleDetailsPo> getRoleinfo(@Param(value="orgId") long var1, @Param(value="type") int var3, @Param(value="role") String var4);

    @Query(value="SELECT rd FROM RoleDetailsPo rd  WHERE rd.orgId =:orgId AND rd.roleName =:role AND type =:type")
    public Optional<RoleDetailsPo> getRole(@Param(value="orgId") long var1, @Param(value="type") int var3, @Param(value="role") String var4);

    @Query(value="SELECT rd FROM RoleDetailsPo rd  WHERE rd.orgId =:orgId AND rd.roleName =:roleName AND type =:type")
    public Optional<RoleDetailsPo> findByRoleName(@Param(value="orgId") long var1, @Param(value="roleName") String var3, @Param(value="type") int var4);
}

