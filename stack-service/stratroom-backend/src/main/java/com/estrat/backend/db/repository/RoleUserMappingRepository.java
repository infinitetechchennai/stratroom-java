/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.RoleDetailsPo
 *  com.estrat.backend.db.bean.po.RoleUserEmbeddedId
 *  com.estrat.backend.db.bean.po.RoleUserMapping
 *  com.estrat.backend.db.repository.RoleUserMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Modifying
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 *  org.springframework.transaction.annotation.Transactional
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.RoleDetailsPo;
import com.estrat.backend.db.bean.po.RoleUserEmbeddedId;
import com.estrat.backend.db.bean.po.RoleUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleUserMappingRepository
extends JpaRepository<RoleUserMapping, RoleUserEmbeddedId> {
    public List<RoleUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);

    public void deleteByIdRoleId(RoleDetailsPo var1);

    public List<RoleUserMapping> findAllByIdRoleId(RoleDetailsPo var1);

    @Modifying
    @Transactional
    @Query(value="DELETE FROM RoleUserMapping rl WHERE rl.id.roleId.roleId = :roleId AND rl.id.empId.empId = :empId")
    public void deleterolemap(@Param(value="roleId") Long var1, @Param(value="empId") Long var2);

    @Query(value="SELECT rl FROM RoleUserMapping rl  WHERE rl.id.roleId.roleId=:roleId")
    public List<RoleUserMapping> findAll(@Param(value="roleId") Long var1);

    @Query(value="SELECT rl FROM RoleUserMapping rl  WHERE rl.id.empId.empId=:empId")
    public List<RoleUserMapping> findAllEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT rl FROM RoleUserMapping rl  WHERE rl.id.empId.empId in (:empId)")
    public List<RoleUserMapping> findAll(@Param(value="empId") List<Long> var1);
}

