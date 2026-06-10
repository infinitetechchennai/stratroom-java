/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.dao.PageRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.PagesDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PageRepository
extends JpaRepository<PagesDetails, Long> {
    @Query(value="SELECT t FROM PagesDetails t where t.id = :id and t.active=0 ")
    public Optional<PagesDetails> findByIdAndActive(@Param(value="id") Long var1);

    @Query(value="SELECT t FROM PagesDetails t where  t.createdBy=:empId and t.pageName= :pagename  and t.active=0 ")
    public Optional<PagesDetails> findByNameAndActive(@Param(value="pagename") String var1, @Param(value="empId") Long var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy=:empId AND t.active =:active order by t.createdTime DESC ")
    public List<PagesDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy=:empId AND t.pageType= :pageType  AND t.active=0  AND t.defaultPage='Y'")
    public PagesDetails isDefaultPage(@Param(value="empId") Long var1, @Param(value="pageType") String var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy=:empId AND t.pageType= :pageType  AND t.active=0  AND t.defaultPage='Y'")
    public PagesDetails getDefaultPage(@Param(value="empId") Long var1, @Param(value="pageType") String var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy=:empId AND t.pageType= :pageType  AND t.active =:active ORDER BY t.createdTime DESC")
    public List<PagesDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="pageType") String var2, @Param(value="active") int var3);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId=:deptId AND t.active =:active order by t.createdTime DESC ")
    public List<PagesDetails> findAllByDeptId(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy=:empId order by t.createdTime DESC ")
    public List<PagesDetails> findAllByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId=:deptId order by t.createdTime DESC ")
    public List<PagesDetails> findAllByDeptId(@Param(value="deptId") Long var1);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.createdBy IN (:empId) AND t.active =:active order by t.createdTime DESC ")
    public List<PagesDetails> findAllByMultipleEmp(@Param(value="empId") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT t.id FROM PagesDetails t WHERE  t.createdBy IN (:empId) AND t.pageType= :pageType  AND t.active =:active ORDER BY t.createdTime DESC")
    public List<Long> findAllByEmpIds(@Param(value="empId") List<Long> var1, @Param(value="pageType") String var2, @Param(value="active") int var3);

    @Query(value="SELECT t.id FROM PagesDetails t WHERE  t.createdBy =:empId AND t.pageType= 'Standard_View'  AND t.active = 0 ORDER BY t.createdTime DESC")
    public List<Long> findAll(@Param(value="empId") Long var1);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId = :deptId AND t.pageType= :pageType  AND t.active =:active ORDER BY t.createdTime DESC")
    public List<PagesDetails> findAllByDeptId(@Param(value="deptId") Long var1, @Param(value="pageType") String var2, @Param(value="active") int var3);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId IN (:deptId) AND t.pageType= :pageType  AND t.active =:active ORDER BY t.createdTime DESC")
    public List<PagesDetails> findAllByDeptIdList(@Param(value="deptId") List<Long> var1, @Param(value="pageType") String var2, @Param(value="active") int var3);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId IN (:deptId)  AND t.active =:active ")
    public List<PagesDetails> findAllByDeptList(@Param(value="deptId") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId = :deptId AND t.pinned ='true' AND t.active =:active ORDER BY t.createdTime DESC")
    public List<PagesDetails> findAllByPinnedList(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM PagesDetails t WHERE  t.deptId = :deptId AND t.pageType= :pageType AND t.pinned ='true' AND t.active =:active ORDER BY t.createdTime DESC")
    public PagesDetails findAllByDeptIdPinned(@Param(value="deptId") Long var1, @Param(value="pageType") String var2, @Param(value="active") int var3);
}

