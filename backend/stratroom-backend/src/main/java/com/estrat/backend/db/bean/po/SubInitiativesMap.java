/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.SubInitiatives
 *  com.estrat.backend.db.bean.po.SubInitiativesMap
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

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.SubInitiatives;
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
@Table(name="sub_initiatives_map", schema="orgstructure")
public class SubInitiativesMap {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="sub_initiative_id", nullable=false)
    private SubInitiatives subInitiativeId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id", referencedColumnName="emp_id", nullable=false, unique=true)
    private EmployeeProfilePo employeeProfilePos;

    public SubInitiativesMap() {
    }

    public SubInitiativesMap(SubInitiatives subInitiatives, long empId) {
        this.subInitiativeId = subInitiatives;
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

    public SubInitiatives getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(SubInitiatives subInitiativeId) {
        this.subInitiativeId = subInitiativeId;
    }

    public EmployeeProfilePo getEmployeeProfilePos() {
        return this.employeeProfilePos;
    }

    public void setEmployeeProfilePos(EmployeeProfilePo employeeProfilePos) {
        this.employeeProfilePos = employeeProfilePos;
    }
}

