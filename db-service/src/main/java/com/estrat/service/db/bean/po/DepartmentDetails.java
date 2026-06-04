/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.DepartmentDetailsHistory
 *  com.estrat.service.db.dto.DeptDetails
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.DepartmentDetailsHistory;
import com.estrat.service.db.dto.DeptDetails;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="org_department_details", schema="orgstructure")
public class DepartmentDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="dept_id")
    private long id;
    @Column(name="dept_unique_id")
    private String deptUniqueID;
    @Column(name="dept_name")
    private String name;
    @Column(name="status")
    private String status;
    @Column(name="orgId")
    private Long orgId;

    public DepartmentDetails() {
    }

    public DepartmentDetails(DeptDetails deptDetails) {
        if (Long.valueOf(deptDetails.getId()) != null) {
            this.id = deptDetails.getId();
        }
        this.name = deptDetails.getName();
        this.status = deptDetails.getStatus();
        this.orgId = deptDetails.getOrgId();
        this.deptUniqueID = deptDetails.getDeptID();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public DepartmentDetails(DepartmentDetailsHistory deptDetailsHistory) {
        this.id = deptDetailsHistory.getDeptId();
        this.name = deptDetailsHistory.getName();
        this.status = deptDetailsHistory.getStatus();
        this.orgId = deptDetailsHistory.getOrgId();
        this.deptUniqueID = deptDetailsHistory.getDeptUniqueID();
    }
}

