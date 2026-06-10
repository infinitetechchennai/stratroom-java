/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.DepartmentDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentDetailsRepository
extends JpaRepository<DepartmentDetails, Long> {
    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.name=:deptName and c.status=:status")
    public DepartmentDetails findByName(@Param(value="deptName") String var1, @Param(value="status") String var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.name=:deptName and c.orgId=:orgId and c.status=:status")
    public DepartmentDetails findByName(@Param(value="deptName") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.deptUniqueID=:deptId and c.name=:deptName and c.orgId=:orgId and c.status=:status")
    public DepartmentDetails findBy(@Param(value="deptId") String var1, @Param(value="deptName") String var2, @Param(value="orgId") long var3, @Param(value="status") String var5);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status")
    public List<DepartmentDetails> findAllByOrgId(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.id=:id and c.status=:status")
    public DepartmentDetails findById(@Param(value="id") Long var1, @Param(value="status") String var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.status=:status")
    public List<DepartmentDetails> findAll(@Param(value="status") String var1);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status and c.id not in (:id)")
    public List<String> getAllDepartmentsByOrgId(@Param(value="orgId") Long var1, @Param(value="id") Long var2, @Param(value="status") String var3);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status ")
    public List<String> getAllDepartmentsByOrgId(@Param(value="orgId") Long var1, @Param(value="status") String var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status and c.id  in (:id)")
    public List<DepartmentDetails> findAllByOrgId(@Param(value="orgId") long var1, @Param(value="status") String var3, @Param(value="id") List<Long> var4);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status and c.id  in (:id) and  c.name LIKE :search")
    public List<DepartmentDetails> findAllByOrgId(@Param(value="orgId") long var1, @Param(value="status") String var3, @Param(value="id") List<Long> var4, @Param(value="search") String var5);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.name LIKE :search")
    public List<DepartmentDetails> findAllByOrgId(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="search") String var6);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.name LIKE :search and c.id  in (:id)")
    public List<DepartmentDetails> findAllByOrgIdAndDeptIdLIST(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="search") String var6, @Param(value="id") List<Long> var7);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.id  in (:id)")
    public List<DepartmentDetails> findAllByOrgIdAndDeptIdLIST(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="id") List<Long> var6);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.id  in (:id)")
    public List<DepartmentDetails> findAllByDeptIds(@Param(value="id") List<Long> var1);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.id  in (:id) and  c.name LIKE :search")
    public List<DepartmentDetails> findAllByDeptIds(@Param(value="id") List<Long> var1, @Param(value="search") String var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.status=:status and c.name LIKE :search and c.id  in (:id)")
    public List<DepartmentDetails> findAllByOrgIdAndDeptIdLIST(@Param(value="status") String var1, @Param(value="search") String var2, @Param(value="id") List<Long> var3);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.status=:status and  c.id  in (:id)")
    public List<DepartmentDetails> findAllByOrgIdAndDeptIdLIST(@Param(value="status") String var1, @Param(value="id") List<Long> var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.deptUniqueID=:deptUniqueId and c.orgId=:orgId and c.status=:status")
    public DepartmentDetails findByDeptUniqueId(@Param(value="deptUniqueId") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT COUNT(orgId) FROM DepartmentDetails c WHERE c.orgId=:orgId")
    public int countDeptList(@Param(value="orgId") long var1);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.deptUniqueID=:deptUniqueId and c.orgId=:orgId")
    public DepartmentDetails findByDeptUniqueIdANDOrgID(@Param(value="deptUniqueId") String var1, @Param(value="orgId") long var2);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.name=:deptName and c.orgId=:orgId and c.status=:status")
    public List<DepartmentDetails> findByNameList(@Param(value="deptName") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status and c.id  in (:id) and  c.name LIKE :search")
    public List<Long> findAllByOrgIdByIds(@Param(value="orgId") long var1, @Param(value="status") String var3, @Param(value="id") List<Long> var4, @Param(value="search") String var5);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE  c.orgId=:orgId and c.status=:status and c.id  in (:id)")
    public List<Long> findAllByOrgIdIds(@Param(value="orgId") long var1, @Param(value="status") String var3, @Param(value="id") List<Long> var4);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.name LIKE :search")
    public List<Long> findAllByOrgIdIds(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="search") String var6);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.name LIKE :search and c.id  in (:id)")
    public List<Long> findAllByOrgIdAndDeptIds(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="search") String var6, @Param(value="id") List<Long> var7);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status")
    public List<Long> findAllByOrgIdIds(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5);

    @Query(value="SELECT c.id FROM DepartmentDetails c WHERE c.id NOT IN (:deptId) and c.orgId=:orgId and c.status=:status and c.id  in (:id)")
    public List<Long> findAllByOrgIdAndDeptIds(@Param(value="deptId") long var1, @Param(value="orgId") long var3, @Param(value="status") String var5, @Param(value="id") List<Long> var6);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE  c.id  in (:id)")
    public List<DepartmentDetails> findAll(@Param(value="id") List<Long> var1);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.orgId=:orgId and c.status=:status")
    public List<DepartmentDetails> findAllByOrgId(@Param(value="orgId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM DepartmentDetails c WHERE c.deptUniqueID=:deptId and c.name=:deptName and c.orgId=:orgId")
    public DepartmentDetails findByDetails(@Param(value="deptId") String var1, @Param(value="deptName") String var2, @Param(value="orgId") long var3);

    @Query(value="SELECT DISTINCT o.name FROM DepartmentDetails o WHERE o.status = 'Active' AND o.orgId = :orgId AND o.name LIKE :search")
    public List<String> findDistinctDeptNamesByOrgIdAndDeptNameLike(@Param(value="orgId") Long var1, @Param(value="search") String var2);
}

