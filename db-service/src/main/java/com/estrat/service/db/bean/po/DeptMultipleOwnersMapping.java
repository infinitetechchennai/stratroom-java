/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.service.db.bean.po.DeptMultipleOwnersMappingHis
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.DeptMultipleOwnersMappingHis;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="dept_owner_mapping", schema="orgstructure")
public class DeptMultipleOwnersMapping {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="empId")
    private Long empId;
    @Column(name="deptId")
    private Long deptId;

    public DeptMultipleOwnersMapping() {
    }

    public DeptMultipleOwnersMapping(Long empId, Long deptId) {
        this.empId = empId;
        this.deptId = deptId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getEmpId() {
        return this.empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public DeptMultipleOwnersMapping(DeptMultipleOwnersMappingHis history) {
        this.id = history.getId();
        this.empId = history.getEmpId();
        this.deptId = history.getDeptId();
    }
}

