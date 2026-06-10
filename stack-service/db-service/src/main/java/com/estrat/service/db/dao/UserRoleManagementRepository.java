/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.UserRoleManagement
 *  com.estrat.service.db.dao.UserRoleManagementRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.UserRoleManagement;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleManagementRepository
extends JpaRepository<UserRoleManagement, Long> {
    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND (u.deptId IN (:deptId) OR u.role IN (:role) OR u.status =:status )")
    public List<UserRoleManagement> findBy(@Param(value="orgId") Long var1, @Param(value="deptId") List<Long> var2, @Param(value="role") List<String> var3, @Param(value="status") String var4, @Param(value="active") int var5);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.empId IN (:empIds) AND u.role IN (:role) AND u.status =:status ")
    public List<UserRoleManagement> findByEmpId(@Param(value="orgId") Long var1, @Param(value="empIds") List<Long> var2, @Param(value="role") List<String> var3, @Param(value="status") String var4, @Param(value="active") int var5);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active")
    public List<UserRoleManagement> findBy(@Param(value="orgId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND  u.emailAddress =:email")
    public Optional<UserRoleManagement> findByEmail(@Param(value="orgId") Long var1, @Param(value="email") String var2, @Param(value="active") int var3);

    @Query(value="SELECT u.empId FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.userAccess =:userAccess")
    public long findByID(@Param(value="orgId") Long var1, @Param(value="active") int var2, @Param(value="userAccess") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.empId =:empId AND u.status=:status AND u.active =:active")
    public UserRoleManagement findBy(@Param(value="empId") Long var1, @Param(value="status") String var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.empId =:empId")
    public UserRoleManagement findByID(@Param(value="empId") Long var1);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.emailAddress =:email AND u.status=:status AND u.active =:active")
    public UserRoleManagement findBy(@Param(value="email") String var1, @Param(value="status") String var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.status=:status AND u.active =:active")
    public List<UserRoleManagement> findByStatus(@Param(value="orgId") Long var1, @Param(value="status") String var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.empId IN (:empIds) ")
    public List<UserRoleManagement> findByOrgIdANDEmpIds(@Param(value="orgId") Long var1, @Param(value="empIds") List<Long> var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.role IN (:role)")
    public List<UserRoleManagement> findByOrgIdANDRoles(@Param(value="orgId") Long var1, @Param(value="role") List<String> var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.empId IN (:empIds) AND u.role IN (:role)")
    public List<UserRoleManagement> findByDeptIdAndRoles(@Param(value="orgId") Long var1, @Param(value="empIds") List<Long> var2, @Param(value="role") List<String> var3, @Param(value="active") int var4);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND  u.empId IN (:empIds) AND u.status =:status ")
    public List<UserRoleManagement> findByDeptIdAndStatus(@Param(value="orgId") Long var1, @Param(value="empIds") List<Long> var2, @Param(value="status") String var3, @Param(value="active") int var4);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND u.role IN (:role) AND u.status =:status ")
    public List<UserRoleManagement> findByRolesANDStatus(@Param(value="orgId") Long var1, @Param(value="role") List<String> var2, @Param(value="status") String var3, @Param(value="active") int var4);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND  u.name IN (:names) ")
    public List<UserRoleManagement> findByNames(@Param(value="orgId") Long var1, @Param(value="names") List<String> var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.orgId =:orgId AND u.active =:active AND  u.designation IN (:designations) ")
    public List<UserRoleManagement> findByDesignations(@Param(value="orgId") Long var1, @Param(value="designations") List<String> var2, @Param(value="active") int var3);

    @Query(value="SELECT u FROM UserRoleManagement u WHERE u.roleId =:roleId AND u.active =:active ")
    public List<UserRoleManagement> findByRoleId(@Param(value="roleId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT u.empId FROM UserRoleManagement u WHERE u.status ='Active' AND u.orgId =:orgId AND u.active =:active AND u.userAccess =1")
    public List<Long> userIdList(@Param(value="orgId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT u.empId FROM UserRoleManagement u WHERE u.empId IN (:empIds) AND u.userAccess =1")
    public List<Long> userIdListByEmpIDs(@Param(value="empIds") List<Long> var1);
}

