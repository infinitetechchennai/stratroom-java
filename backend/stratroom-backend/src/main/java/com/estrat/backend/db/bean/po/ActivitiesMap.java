/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.bean.po.ActivitiesMap
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="activities_map", schema="orgstructure")
public class ActivitiesMap {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="activities_id", nullable=false)
    private ActivitiesDetails activitiesId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_ID", referencedColumnName="emp_id", nullable=false, unique=true)
    private EmployeeProfilePo employeeProfilePos;

    public ActivitiesMap() {
    }

    public ActivitiesMap(ActivitiesDetails activitiesDetails, long empId) {
        this.activitiesId = activitiesDetails;
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(empId);
        this.employeeProfilePos = employeeProfilePo;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ActivitiesDetails getActivitiesId() {
        return this.activitiesId;
    }

    public void setActivitiesId(ActivitiesDetails activitiesId) {
        this.activitiesId = activitiesId;
    }

    public EmployeeProfilePo getEmployeeProfilePos() {
        return this.employeeProfilePos;
    }

    public void setEmployeeProfilePos(EmployeeProfilePo employeeProfilePos) {
        this.employeeProfilePos = employeeProfilePos;
    }
}

