/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.OrganizationDetails
 *  com.estrat.backend.db.bean.po.OrgDetails
 */
package com.estrat.backend.db.bean;

import com.estrat.backend.db.bean.po.OrgDetails;

public class OrganizationDetails {
    private long orgId;
    private String name;
    private String status;

    public OrganizationDetails() {
    }

    public OrganizationDetails(OrgDetails orgDetails) {
        this.orgId = orgDetails.getId();
        this.name = orgDetails.getName();
        this.status = orgDetails.getStatus();
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
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
}

