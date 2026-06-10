/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.ChildParent
 */
package com.estrat.service.db.bean;

import java.io.Serializable;
import java.util.Date;

public class ChildParent
implements Serializable {
    private static final long serialVersionUID = 1L;
    private long deptId;
    private String deptName;
    private long deptParentId;
    private String deptParentName;
    private Long deptImmediateParentId;
    private String deptImmediateParentName;
    private Date fromDate;
    private Date toDate;

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public long getDeptParentId() {
        return this.deptParentId;
    }

    public void setDeptParentId(long deptParentId) {
        this.deptParentId = deptParentId;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptParentName() {
        return this.deptParentName;
    }

    public void setDeptParentName(String deptParentName) {
        this.deptParentName = deptParentName;
    }

    public String getDeptImmediateParentName() {
        return this.deptImmediateParentName;
    }

    public void setDeptImmediateParentName(String deptImmediateParentName) {
        this.deptImmediateParentName = deptImmediateParentName;
    }

    public Long getDeptImmediateParentId() {
        return this.deptImmediateParentId;
    }

    public void setDeptImmediateParentId(Long deptImmediateParentId) {
        this.deptImmediateParentId = deptImmediateParentId;
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

