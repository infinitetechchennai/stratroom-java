/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.MeetingManagement
 *  com.estrat.service.db.bean.po.MeetingUserEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.MeetingManagement;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class MeetingUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="meeting_id", nullable=false)
    private MeetingManagement meetingManagementId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public MeetingManagement getMeetingManagementId() {
        return this.meetingManagementId;
    }

    public void setMeetingManagementId(MeetingManagement meetingManagementId) {
        this.meetingManagementId = meetingManagementId;
    }

    public EmployeeProfilePo getEmpId() {
        return this.empId;
    }

    public void setEmpId(EmployeeProfilePo empId) {
        this.empId = empId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeetingUserEmbeddedId)) {
            return false;
        }
        MeetingUserEmbeddedId that = (MeetingUserEmbeddedId)o;
        return Objects.equals(this.getMeetingManagementId(), that.getMeetingManagementId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getMeetingManagementId(), this.getEmpId());
    }
}

