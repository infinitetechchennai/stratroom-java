/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePagesLinkDetails
 *  com.estrat.service.db.dao.EmployeePagesLinkDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.EmployeePagesLinkDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeePagesLinkDetailsRepository
extends JpaRepository<EmployeePagesLinkDetails, Long> {
    @Query(value="SELECT e FROM EmployeePagesLinkDetails e WHERE e.empId=:empId AND e.active =:active")
    public List<EmployeePagesLinkDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT e FROM EmployeePagesLinkDetails e WHERE e.empId=:empId AND e.active =:active AND e.type =:pageType")
    public EmployeePagesLinkDetails findAllByEmpIdAndPageType(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageType") String var3);

    @Query(value="SELECT e FROM EmployeePagesLinkDetails e WHERE e.empId=:empId AND  e.type =:pageType")
    public EmployeePagesLinkDetails findAllByEmpIdAndPageType(@Param(value="empId") Long var1, @Param(value="pageType") String var2);

    @Query(value="SELECT e FROM EmployeePagesLinkDetails e WHERE e.empId=:empId")
    public List<EmployeePagesLinkDetails> findAllByEmpId(@Param(value="empId") Long var1);
}

