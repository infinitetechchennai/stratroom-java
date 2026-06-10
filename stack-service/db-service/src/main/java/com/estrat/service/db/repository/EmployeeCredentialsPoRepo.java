/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeCredentialsPo
 *  com.estrat.service.db.repository.EmployeeCredentialsPoRepo
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.EmployeeCredentialsPo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeCredentialsPoRepo
extends JpaRepository<EmployeeCredentialsPo, Long> {
    @Query(value="SELECT e FROM EmployeeCredentialsPo e WHERE  e.empId=:empId")
    public List<EmployeeCredentialsPo> getOnewostatus(@Param(value="empId") long var1);

    @Query(value="SELECT e FROM EmployeeCredentialsPo e WHERE  e.empId=:empId  and e.status=:status")
    public EmployeeCredentialsPo getOnestatus(@Param(value="empId") long var1, @Param(value="status") String var3);

    public Optional<EmployeeCredentialsPo> findByUserNameAndStatus(String var1, String var2);

    public Optional<EmployeeCredentialsPo> findByEmailAddressAndStatus(String var1, String var2);

    public Optional<EmployeeCredentialsPo> findByUserNameOrEmailAddress(String var1, String var2);

    @Query(value="SELECT e FROM EmployeeCredentialsPo e WHERE (e.userName = :userName OR e.emailAddress = :emailAddress) AND e.status = :status")
    public Optional<EmployeeCredentialsPo> findByUserNameOrEmailAddressAndStatus(@Param(value="userName") String var1, @Param(value="emailAddress") String var2, @Param(value="status") String var3);

    public Optional<EmployeeCredentialsPo> findByUserNameAndPasswordAndStatus(String var1, String var2, String var3);

    public Optional<EmployeeCredentialsPo> findByEmailAddressAndPasswordAndStatus(String var1, String var2, String var3);

    public long countByEmailAddressOrUserNameAndStatus(String var1, String var2, String var3);
}

