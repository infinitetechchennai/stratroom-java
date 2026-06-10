/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMappingHis
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="dept_owner_mapping_his", schema="orgstructure")
public class DeptMultipleOwnersMappingHis {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="empId")
    private Long empId;
    @Column(name="deptId")
    private Long deptId;
    @Column(name="year")
    private Integer year;

    public DeptMultipleOwnersMappingHis() {
    }

    public DeptMultipleOwnersMappingHis(Long empId, Long deptId, Integer year) {
        this.empId = empId;
        this.deptId = deptId;
        this.year = year;
    }

    public DeptMultipleOwnersMappingHis(DeptMultipleOwnersMapping entity, Integer year) {
        this.empId = entity.getEmpId();
        this.deptId = entity.getDeptId();
        this.year = year;
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

    public Integer getYear() {
        return this.year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}

