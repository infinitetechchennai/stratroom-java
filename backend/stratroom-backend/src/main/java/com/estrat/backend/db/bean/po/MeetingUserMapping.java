/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.MeetingManagement
 *  com.estrat.backend.db.bean.po.MeetingUserEmbeddedId
 *  com.estrat.backend.db.bean.po.MeetingUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.MeetingManagement;
import com.estrat.backend.db.bean.po.MeetingUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="meeting_user_mapping", schema="orgstructure")
public class MeetingUserMapping {
    @EmbeddedId
    private MeetingUserEmbeddedId id;

    public MeetingUserMapping() {
    }

    public MeetingUserMapping(MeetingManagement meetingManagement, String empId) {
        MeetingUserEmbeddedId embeddedId = new MeetingUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setMeetingManagementId(meetingManagement);
        this.id = embeddedId;
    }

    public MeetingUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(MeetingUserEmbeddedId id) {
        this.id = id;
    }
}

