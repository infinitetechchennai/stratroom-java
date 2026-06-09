/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.TaskDetails
 *  com.estrat.service.db.bean.po.TaskUserEmbeddedId
 *  com.estrat.service.db.bean.po.TaskUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.TaskDetails;
import com.estrat.service.db.bean.po.TaskUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="task_user_mapping", schema="orgstructure")
public class TaskUserMapping {
    @EmbeddedId
    private TaskUserEmbeddedId id;

    public TaskUserMapping() {
    }

    public TaskUserMapping(TaskDetails taskDetails, String empId) {
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

