/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.TaskDetails
 *  com.estrat.service.db.dto.TaskDetailsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.TaskDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

public class TaskDetailsDTO {
    private long id;
    private Map<String, Object> taskValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long taskCategoryId;
    private String priority;
    private String status;
    private Date startDate;
    private Date endDate;
    private List<Employee> multipleOwerlist;
    private List<Employee> multipleUserlist;

    public TaskDetailsDTO() {
    }

    public TaskDetailsDTO(TaskDetails taskdetails) {
        this.id = taskdetails.getId();
        this.owner = taskdetails.getOwner();
        this.createdBy = taskdetails.getCreatedBy();
        this.updatedBy = taskdetails.getUpdatedBy();
        this.createdTime = taskdetails.getCreatedTime();
        this.updatedTime = taskdetails.getUpdatedTime();
        this.active = taskdetails.getActive();
        this.taskCategoryId = taskdetails.getTaskCategoryId();
        this.priority = taskdetails.getPriority();
        this.status = taskdetails.getStatus();
        this.startDate = taskdetails.getStartDate();
        this.endDate = taskdetails.getEndDate();
        ObjectMapper mapper = new ObjectMapper();
        if (taskdetails.getTaskValue() != null) {
            try {
                this.taskValue = (Map)mapper.readValue(taskdetails.getTaskValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        if (CollectionUtils.isNotEmpty((Collection)taskdetails.getOwnerList())) {
            this.multipleOwerlist = taskdetails.getOwnerList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
        if (CollectionUtils.isNotEmpty((Collection)taskdetails.getUserList())) {
            this.multipleUserlist = taskdetails.getUserList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getTaskValue() {
        return this.taskValue;
    }

    public void setTaskValue(Map<String, Object> taskValue) {
        this.taskValue = taskValue;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getTaskCategoryId() {
        return this.taskCategoryId;
    }

    public void setTaskCategoryId(long taskCategoryId) {
        this.taskCategoryId = taskCategoryId;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
    }

    public List<Employee> getMultipleUserlist() {
        return this.multipleUserlist;
    }

    public void setMultipleUserlist(List<Employee> multipleUserlist) {
        this.multipleUserlist = multipleUserlist;
    }
}

