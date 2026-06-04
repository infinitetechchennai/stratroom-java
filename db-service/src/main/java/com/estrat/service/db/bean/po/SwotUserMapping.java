/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.SWOTAnalysis
 *  com.estrat.service.db.bean.po.SwotUserEmbeddedId
 *  com.estrat.service.db.bean.po.SwotUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.SWOTAnalysis;
import com.estrat.service.db.bean.po.SwotUserEmbeddedId;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="swot_user_mapping", schema="orgstructure")
public class SwotUserMapping {
    @EmbeddedId
    private SwotUserEmbeddedId id;

    public SwotUserMapping() {
    }

    public SwotUserMapping(SWOTAnalysis swotAnalysis, String empId) {
        SwotUserEmbeddedId embeddedId = new SwotUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setSwotId(swotAnalysis);
        this.id = embeddedId;
    }

    public SwotUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(SwotUserEmbeddedId id) {
        this.id = id;
    }
}

