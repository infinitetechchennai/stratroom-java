/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ModulePrivillageMapping
 *  com.estrat.service.db.dao.ModulePrivilegeMappingRepo
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ModulePrivillageMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ModulePrivilegeMappingRepo
extends JpaRepository<ModulePrivillageMapping, Long> {
    @Query(value="SELECT m FROM ModulePrivillageMapping m WHERE m.roleId =:roleId AND m.moduleName=:moduleName AND m.tagName=:tagName  ")
    public Optional<ModulePrivillageMapping> findBy(@Param(value="roleId") Long var1, @Param(value="moduleName") String var2, @Param(value="tagName") String var3);

    @Query(value="SELECT m FROM ModulePrivillageMapping m WHERE m.roleId =:roleId AND m.moduleName=:moduleName")
    public List<ModulePrivillageMapping> findBy(@Param(value="roleId") Long var1, @Param(value="moduleName") String var2);

    @Query(value="SELECT m FROM ModulePrivillageMapping m WHERE m.roleId =:roleId ")
    public List<ModulePrivillageMapping> findBy(@Param(value="roleId") Long var1);

    @Query(value="SELECT m FROM ModulePrivillageMapping m WHERE m.roleId =:roleId AND m.moduleName=:moduleName AND (m.privilegeCreate ='TRUE' OR m.privilegeUpdate ='TRUE' OR m.privilegeView = 'TRUE' OR  m.privilegeDelete = 'TRUE')")
    public List<ModulePrivillageMapping> checkAccess(@Param(value="roleId") Long var1, @Param(value="moduleName") String var2);

    @Query(value="SELECT m FROM ModulePrivillageMapping m WHERE m.roleId =:roleId AND m.moduleName=:moduleName AND m.tagName=:tagName AND (m.privilegeCreate ='TRUE' OR m.privilegeUpdate ='TRUE' OR m.privilegeView = 'TRUE' OR  m.privilegeDelete = 'TRUE')")
    public List<ModulePrivillageMapping> checkAccess(@Param(value="roleId") Long var1, @Param(value="moduleName") String var2, @Param(value="tagName") String var3);
}

