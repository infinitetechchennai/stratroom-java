/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.ChildParentEmp
 */
package com.estrat.service.db.bean;

import java.util.Date;

public class ChildParentEmp {
    private long empId;
    private String empName;
    private String deptName;
    private long empParentId;
    private String empParentName;
    private Long empImmediateParentId;
    private String empImmediateParentName;
    private Date fromDate;
    private Date toDate;

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return this.empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public long getEmpParentId() {
        return this.empParentId;
    }

    public void setEmpParentId(long empParentId) {
        this.empParentId = empParentId;
    }

    public String getEmpParentName() {
        return this.empParentName;
    }

    public void setEmpParentName(String empParentName) {
        this.empParentName = empParentName;
    }

    public Long getEmpImmediateParentId() {
        return this.empImmediateParentId;
    }

    public void setEmpImmediateParentId(Long empImmediateParentId) {
        this.empImmediateParentId = empImmediateParentId;
    }

    public String getEmpImmediateParentName() {
        return this.empImmediateParentName;
    }

    public void setEmpImmediateParentName(String empImmediateParentName) {
        this.empImmediateParentName = empImmediateParentName;
    }

    public Date getFromDate() {
        return this.fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return this.toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }
}

