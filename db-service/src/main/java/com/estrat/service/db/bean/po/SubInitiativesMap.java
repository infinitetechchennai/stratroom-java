/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.SubInitiatives
 *  com.estrat.service.db.bean.po.SubInitiativesMap
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

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.SubInitiatives;
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
@Table(name="sub_initiatives_map", schema="orgstructure")
public class SubInitiativesMap {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
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

