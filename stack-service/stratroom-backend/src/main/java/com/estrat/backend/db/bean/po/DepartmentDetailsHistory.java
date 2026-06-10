/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.DepartmentDetailsHistory
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  javax.persistence.UniqueConstraint
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.DepartmentDetails;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="org_department_details_his", schema="orgstructure", uniqueConstraints={@UniqueConstraint(columnNames={"dept_id", "year"})})
public class DepartmentDetailsHistory {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="dept_id", nullable=false)
    private long deptId;
    @Column(name="dept_unique_id")
    private String deptUniqueID;
    @Column(name="dept_name")
    private String name;
    @Column(name="status")
    private String status;
    @Column(name="orgId")
    private Long orgId;
    @Column(name="year", nullable=false)
    private Integer year;

    public DepartmentDetailsHistory() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public String getDeptUniqueID() {
        return this.deptUniqueID;
    }

    public void setDeptUniqueID(String deptUniqueID) {
        this.deptUniqueID = deptUniqueID;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Integer getYear() {
        return this.year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public DepartmentDetailsHistory(DepartmentDetails departmentDetails, Integer year) {
        this.deptId = departmentDetails.getId();
        this.deptUniqueID = departmentDetails.getDeptUniqueID();
        this.name = departmentDetails.getName();
        this.status = departmentDetails.getStatus();
        this.orgId = departmentDetails.getOrgId();
        this.year = year;
    }
}

