/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.TaskDetails
 *  com.estrat.backend.db.bean.po.TaskOwnerMapping
 *  com.estrat.backend.db.bean.po.TaskUserEmbeddedId
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.TaskDetails;
import com.estrat.backend.db.bean.po.TaskUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="task_owner_mapping", schema="orgstructure")
public class TaskOwnerMapping {
    @EmbeddedId
    private TaskUserEmbeddedId id;

    public TaskOwnerMapping() {
    }

    public TaskOwnerMapping(TaskDetails taskDetails, String empId) {
        TaskUserEmbeddedId embeddedId = new TaskUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setTaskDetailsId(taskDetails);
        this.id = embeddedId;
    }

    public TaskUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(TaskUserEmbeddedId id) {
        this.id = id;
    }
}

