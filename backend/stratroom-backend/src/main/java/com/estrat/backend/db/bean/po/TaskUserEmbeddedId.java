/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.TaskDetails
 *  com.estrat.backend.db.bean.po.TaskUserEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.TaskDetails;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class TaskUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="task_id", nullable=false)
    private TaskDetails taskDetailsId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public TaskDetails getTaskDetailsId() {
        return this.taskDetailsId;
    }

    public void setTaskDetailsId(TaskDetails taskDetailsId) {
        this.taskDetailsId = taskDetailsId;
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
        if (!(o instanceof TaskUserEmbeddedId)) {
            return false;
        }
        TaskUserEmbeddedId that = (TaskUserEmbeddedId)o;
        return Objects.equals(this.getTaskDetailsId(), that.getTaskDetailsId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getTaskDetailsId(), this.getEmpId());
    }
}

