/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePreferences
 *  com.estrat.service.db.bean.po.PreferenceDetails
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

import com.estrat.service.db.bean.po.EmployeePreferences;
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
@Table(name="preference_details", schema="orgstructure")
public class PreferenceDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="page_id", nullable=false)
    private EmployeePreferences pageId;
    @Column(name="preference_name")
    private String preferenceName;
    @Column(name="enabled")
    private String enabled;

    public PreferenceDetails() {
    }

    public PreferenceDetails(EmployeePreferences page) {
        this.pageId = page;
    }

    public EmployeePreferences getPageId() {
        return this.pageId;
    }

    public void setPageId(EmployeePreferences pageId) {
        this.pageId = pageId;
    }

    public String getPreferenceName() {
        return this.preferenceName;
    }

    public void setPreferenceName(String preferenceName) {
        this.preferenceName = preferenceName;
    }

    public String getEnabled() {
        return this.enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

