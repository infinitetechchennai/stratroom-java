/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeePreferences
 *  com.estrat.backend.db.bean.po.PreferenceDetails
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PreferenceDetails;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="employee_preferences", schema="orgstructure")
public class EmployeePreferences {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="id")
    private long id;
    @Column(name="page_name")
    private String pageName;
    @Column(name="status")
    private String status;
    @Column(name="emp_id")
    private long empId;
    @OneToMany(mappedBy="pageId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<PreferenceDetails> preferenceList;

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public Set<PreferenceDetails> getPreferenceList() {
        return this.preferenceList;
    }

    public void setPreferenceList(Set<PreferenceDetails> preferenceList) {
        this.preferenceList = preferenceList;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

