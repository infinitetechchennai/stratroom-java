/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesDetails
 *  com.estrat.service.db.bean.po.ActivitiesMap
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ActivitiesDetails;
import com.estrat.service.db.bean.po.EmployeeProfilePo;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="activities_map", schema="orgstructure")
public class ActivitiesMap {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
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

