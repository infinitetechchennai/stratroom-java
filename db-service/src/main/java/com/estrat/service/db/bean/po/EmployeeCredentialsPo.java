/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.EmployeeCredentialsPo
 *  com.estrat.service.db.bean.po.OrgDetails
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.DepartmentDetails;
import com.estrat.service.db.bean.po.OrgDetails;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="employee_credentials", schema="orgstructure")
public class EmployeeCredentialsPo {
    @Id
    @Column(name="emp_id")
    private long empId;
    @ManyToOne
    @JoinColumn(name="org_id", referencedColumnName="org_id")
    private OrgDetails orgId;
    @ManyToOne
    @JoinColumn(name="dept_id", referencedColumnName="dept_id")
    private DepartmentDetails deptId;
    @Column(name="user_name")
    private String userName;
    @Column(name="password")
    private String password;
    @Column(name="status")
    private String status;
    @Column(name="email_address")
    private String emailAddress;
    @Column(name="created_date", updatable=false)
    private LocalDateTime createdDate;
    @Column(name="updated_date")
    private LocalDateTime updatedDate;

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public DepartmentDetails getDeptId() {
        return this.deptId;
    }

    public void setDeptId(DepartmentDetails deptId) {
        this.deptId = deptId;
    }

    public OrgDetails getOrgId() {
        return this.orgId;
    }

    public void setOrgId(OrgDetails orgId) {
        this.orgId = orgId;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return this.updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

