/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgDetails;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProfilePoRepo
extends JpaRepository<EmployeeProfilePo, Long> {
    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName=:firstName and e.orgId.id=:orgId and e.status=:status")
    public EmployeeProfilePo findByFirstName(@Param(value="firstName") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.empId=:empId and e.status=:status")
    public EmployeeProfilePo getOne(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.empId=:empId and e.department=:department and e.status=:status")
    public EmployeeProfilePo getOne(@Param(value="empId") long var1, @Param(value="department") String var3, @Param(value="status") String var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE   e.department=:department and e.status=:status")
    public EmployeeProfilePo getOneByDepartment(@Param(value="department") String var1, @Param(value="status") String var2);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.emailAddress=:email and e.orgId.id=:orgId and e.status=:status")
    public EmployeeProfilePo findByEmail(@Param(value="email") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.emailAddress=:email")
    public EmployeeProfilePo findByEmail(@Param(value="email") String var1);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.emailAddress=:email and e.status='Active'")
    public List<EmployeeProfilePo> findByEmailstatus(@Param(value="email") String var1);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName=:firstName and e.orgId.id=:orgId and e.status=:status")
    public List<EmployeeProfilePo> findAll(@Param(value="firstName") String var1, @Param(value="orgId") long var2, @Param(value="status") String var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName=:firstName and e.orgId.id=:orgId")
    public List<EmployeeProfilePo> findAll(@Param(value="firstName") String var1, @Param(value="orgId") long var2);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.parentEmpId=:empId and e.status=:status")
    public List<EmployeeProfilePo> findAll(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.parentEmpId=:empId")
    public List<EmployeeProfilePo> findAllnostatus(@Param(value="empId") long var1);

    @Query(value="WITH RECURSIVE EmployeeCTE AS ( SELECT emp.emp_id, emp.parent_emp_id FROM orgstructure.employee_details emp WHERE parent_emp_id = :empId AND status = 'Active' UNION ALL SELECT e.emp_id, e.parent_emp_id FROM orgstructure.employee_details e INNER JOIN EmployeeCTE ecte ON e.parent_emp_id = ecte.emp_id WHERE e.status = 'Active') SELECT * FROM EmployeeCTE ORDER BY parent_emp_id, emp_id", nativeQuery=true)
    public List<EmployeeProfilePo> findEmployeeHierarchyByEmpIdmysql(@Param(value="empId") Long var1);

    @Query(value="WITH EmployeeCTE AS ( SELECT emp.emp_id, emp.parent_emp_id FROM orgstructure.employee_details emp WHERE parent_emp_id = :empId AND status = 'Active' UNION ALL SELECT e.emp_id, e.parent_emp_id FROM orgstructure.employee_details e INNER JOIN EmployeeCTE ecte ON e.parent_emp_id = ecte.emp_id WHERE e.status = 'Active') SELECT * FROM EmployeeCTE ORDER BY parent_emp_id, emp_id", nativeQuery=true)
    public List<EmployeeProfilePo> findEmployeeHierarchyByEmpIdsql(@Param(value="empId") Long var1);

    @Query(value="WITH RECURSIVE EmployeeCTE AS (     SELECT emp.emp_id, emp.parent_emp_id     FROM orgstructure.employee_details emp     WHERE parent_emp_id = :empId AND status = 'Active'     UNION ALL     SELECT e.emp_id, e.parent_emp_id     FROM orgstructure.employee_details e     INNER JOIN EmployeeCTE ecte ON e.parent_emp_id = ecte.emp_id     WHERE e.status = 'Active')SELECT emp_id FROM EmployeeCTE ORDER BY parent_emp_id, emp_id", nativeQuery=true)
    public List<Long> findEmployeeIdHierarchyByEmpIdmysql(@Param(value="empId") Long var1);

    @Query(value="WITH  EmployeeCTE AS (     SELECT emp.emp_id, emp.parent_emp_id     FROM orgstructure.employee_details emp     WHERE parent_emp_id = :empId AND status = 'Active'     UNION ALL     SELECT e.emp_id, e.parent_emp_id     FROM orgstructure.employee_details e     INNER JOIN EmployeeCTE ecte ON e.parent_emp_id = ecte.emp_id     WHERE e.status = 'Active')SELECT emp_id FROM EmployeeCTE ORDER BY parent_emp_id, emp_id", nativeQuery=true)
    public List<Long> findEmployeeIdHierarchyByEmpIdsql(@Param(value="empId") Long var1);

    @Query(value="SELECT DISTINCT e.title FROM EmployeeProfilePo e WHERE  e.title IS NOT NULL and e.orgId.id=:orgId and  e.status=:status and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllDesignationList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="status") String var5);

    @Query(value="SELECT DISTINCT e.title FROM EmployeeProfilePo e WHERE  e.title IS NOT NULL and e.title LIKE :title and e.orgId.id=:orgId and e.status=:status and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllDesignationList(@Param(value="orgId") long var1, @Param(value="title") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="status") String var6);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) and  e.status=:status and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="status") String var5, @Param(value="notInEmpId") long var6);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) and e.status=:status and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="status") String var6, @Param(value="notInEmpId") long var7);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<EmployeeProfilePo> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="notInEmpId") long var6);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId  IN (:empId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<EmployeeProfilePo> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="empId") List<Long> var6);

    @Query(value="SELECT DISTINCT e.firstName  FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllFirstNameListString(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="notInEmpId") long var6);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<EmployeeProfilePo> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="notInEmpId") long var5);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId  IN (:empId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<EmployeeProfilePo> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="empId") List<Long> var5);

    @Query(value="SELECT DISTINCT  e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)))")
    public List<String> findAllFirstNameListString(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="notInEmpId") long var5);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) and  e.status=:status")
    public List<String> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="status") String var3, @Param(value="notInEmpId") long var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<EmployeeProfilePo> findAllFirstNameListNoStatus(@Param(value="orgId") long var1, @Param(value="notInEmpId") long var3);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId IN (:empId) ")
    public List<EmployeeProfilePo> findAllFirstNameListNoStatus(@Param(value="orgId") long var1, @Param(value="empId") List<Long> var3);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) and e.status=:status")
    public List<String> findAllFirstNameList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="status") String var4, @Param(value="notInEmpId") long var5);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<EmployeeProfilePo> findAllFirstNameListNoStatus(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="notInEmpId") long var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId IN (:empId) ")
    public List<EmployeeProfilePo> findAllFirstNameListNoStatus(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="empId") List<Long> var4);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.emailAddress=:email and e.orgId.id=:orgId and e.status='Active'")
    public Optional<EmployeeProfilePo> findByEmail(@Param(value="email") String var1, @Param(value="orgId") long var2);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<String> findAllFirstNameListNoStatusString(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="notInEmpId") long var4);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<String> findAllFirstNameListNoStatusString(@Param(value="orgId") long var1, @Param(value="notInEmpId") long var3);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.parentEmpId=:empId and e.status='Active'")
    public List<Long> getReporteeList(@Param(value="empId") long var1);

    @Query(value="SELECT DISTINCT e.empId FROM EmployeeProfilePo e WHERE  parentEmpId IN (:empId) and e.status='Active'")
    public List<Long> getReporteeList(@Param(value="empId") List<Long> var1);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.parentEmpId =:empId  and e.status='Active'")
    public List<EmployeeProfilePo> findChildList(@Param(value="empId") Long var1);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.orgId.id=:orgId and e.parentEmpId =:pid and e.status=:status and e.empId NOT IN (:empId)")
    public List<EmployeeProfilePo> checkParentEmployee(@Param(value="orgId") long var1, @Param(value="pid") long var3, @Param(value="empId") long var5, @Param(value="status") String var7);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.status=:status and e.empId IN (:empId)")
    public List<EmployeeProfilePo> employeeList(@Param(value="empId") List<Long> var1, @Param(value="status") String var2);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE   e.parentEmpId =:empId  and e.status='Active' and e.orgId.id=:orgId")
    public List<EmployeeProfilePo> employeeListwithorg(@Param(value="empId") Long var1, @Param(value="orgId") long var2);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)) OR e.status='Active')")
    public List<Long> findAllFirstNameListByIdList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="notInEmpId") long var6);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)) OR e.status='Active')")
    public List<Long> findAllFirstNameListByIdList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="notInEmpId") long var5);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId  IN (:empId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)) OR e.status='Active')")
    public List<Long> findAllFirstNameListByIdList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5, @Param(value="empId") List<Long> var6);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId  IN (:empId)  and (((e.updatedDate BETWEEN :startDate AND :endDate)  OR (e.createdDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN e.createdDate AND e.updatedDate)  OR (:endDate BETWEEN e.createdDate AND e.updatedDate)) OR e.status='Active')")
    public List<Long> findAllFirstNameListByIdList(@Param(value="orgId") long var1, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="empId") List<Long> var5);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE e.empId in (:empId) or e.parentEmpId in (:empId) and e.status='Active'")
    public List<EmployeeProfilePo> findNodeAndChildList(@Param(value="empId") List<Long> var1);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<Long> findAllFirstNameListNoStatusByIdList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="notInEmpId") long var4);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId NOT IN (:notInEmpId) ")
    public List<Long> findAllFirstNameListNoStatusByIdList(@Param(value="orgId") long var1, @Param(value="notInEmpId") long var3);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.firstName LIKE :firstName and e.orgId.id=:orgId and e.empId IN (:empId) ")
    public List<Long> findAllFirstNameListNoStatusByIdList(@Param(value="orgId") long var1, @Param(value="firstName") String var3, @Param(value="empId") List<Long> var4);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL and e.orgId.id=:orgId and e.empId IN (:empId) ")
    public List<Long> findAllFirstNameListNoStatusByIdList(@Param(value="orgId") long var1, @Param(value="empId") List<Long> var3);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE  e.deptId.id=:deptId")
    public List<EmployeeProfilePo> findAll(@Param(value="deptId") long var1);

    @Query(value="SELECT e.empId FROM EmployeeProfilePo e WHERE e.orgId.id=:orgId and e.deptId.id=:deptId")
    public List<Long> findAllByDeptId(@Param(value="orgId") long var1, @Param(value="deptId") long var3);

    @Query(value="SELECT COALESCE(MAX(emp.org_id), 0) + 1 FROM orgstructure.employee_details emp", nativeQuery=true)
    public Long findMaxOrgId();

    public Optional<EmployeeProfilePo> findByEmailAddressAndStatusAndEmpIdNot(String var1, String var2, Long var3);

    @Query(value="SELECT DISTINCT e.department FROM EmployeeProfilePo e WHERE e.status = 'Active' AND e.department IS NOT NULL AND e.orgId = :orgId")
    public List<String> findDistinctDepartmentsByOrgId(@Param(value="orgId") Long var1);

    @Query(value="SELECT DISTINCT e.title FROM EmployeeProfilePo e WHERE e.title IS NOT NULL AND e.orgId = :orgId")
    public List<String> findDistinctTitlesByOrgId(@Param(value="orgId") Long var1);

    @Query(value="SELECT DISTINCT e.title FROM EmployeeProfilePo e WHERE e.title IS NOT NULL AND e.orgId = :orgId AND e.title LIKE :search")
    public List<String> findDistinctTitlesByOrgIdAndTitleLike(@Param(value="orgId") Long var1, @Param(value="search") String var2);

    public List<EmployeeProfilePo> findByEmpIdOrParentEmpIdAndStatus(Long var1, Long var2, String var3);

    @Query(value="SELECT e FROM EmployeeProfilePo e WHERE e.empId IN :empIds OR (e.parentEmpId IN :parentEmpIds AND e.status = :status)")
    public List<EmployeeProfilePo> findByEmpIdInOrParentEmpIdInAndStatusList(@Param(value="empIds") List<Long> var1, @Param(value="parentEmpIds") List<Long> var2, @Param(value="status") String var3);

    public List<EmployeeProfilePo> findByOrgId_IdAndStatus(Long var1, String var2);

    public List<EmployeeProfilePo> findByOrgId_IdAndStatusAndEmpIdNot(Long var1, String var2, Long var3);

    public List<EmployeeProfilePo> findByOrgId_IdAndParentEmpIdAndStatusAndEmpIdNot(Long var1, Long var2, String var3, Long var4);

    public List<EmployeeProfilePo> findByFirstNameAndStatus(String var1, String var2);

    public List<EmployeeProfilePo> findByFirstNameAndStatusAndOrgId(String var1, String var2, OrgDetails var3);

    public List<EmployeeProfilePo> findByFirstNameAndLastNameAndStatusAndOrgId(String var1, String var2, String var3, OrgDetails var4);

    public List<EmployeeProfilePo> findByFirstNameAndLastNameAndStatus(String var1, String var2, String var3);

    public List<EmployeeProfilePo> findByEmailAddressAndStatus(String var1, String var2);

    public Long countByOrgIdAndStatus(OrgDetails var1, String var2);

    public List<EmployeeProfilePo> findByEmpIdIn(List<Long> var1);

    public EmployeeProfilePo findByEmpId(Long var1);

    @Query(value="SELECT DISTINCT e.firstName FROM EmployeeProfilePo e WHERE  e.firstName IS NOT NULL  and e.empId IN (:empIds) and e.status='Active' ")
    public List<String> findAllFirstNameLists(@Param(value="empIds") List<Long> var1);
}

