/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.TaskDetails
 *  com.estrat.backend.db.bean.po.TaskOwnerMapping
 *  com.estrat.backend.db.bean.po.TaskUserMapping
 *  com.estrat.backend.db.dto.TaskDetailsDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.TaskOwnerMapping;
import com.estrat.backend.db.bean.po.TaskUserMapping;
import com.estrat.backend.db.dto.TaskDetailsDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.apache.commons.lang3.StringUtils;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="task_details", schema="orgstructure")
public class TaskDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="task_value")
    private String taskValue;
    @Column(name="task_category_id")
    private long taskCategoryId;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="priority")
    private String priority;
    @Column(name="status")
    private String status;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;
    @OneToMany(mappedBy="id.taskDetailsId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<TaskUserMapping> userList;
    @OneToMany(mappedBy="id.taskDetailsId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<TaskOwnerMapping> ownerList;

    public TaskDetails() {
    }

    public TaskDetails(TaskDetailsDTO taskDTO) {
        String multipleOwners;
        String multipleUsers;
        this.id = taskDTO.getId();
        this.active = taskDTO.getActive();
        this.owner = taskDTO.getOwner();
        this.createdBy = taskDTO.getCreatedBy();
        this.updatedBy = taskDTO.getUpdatedBy();
        this.createdTime = taskDTO.getCreatedTime();
        this.updatedTime = taskDTO.getUpdatedTime();
        this.taskCategoryId = taskDTO.getTaskCategoryId();
        this.priority = taskDTO.getPriority();
        this.status = taskDTO.getStatus();
        this.startDate = taskDTO.getStartDate();
        this.endDate = taskDTO.getEndDate();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.taskValue = mapper.writeValueAsString((Object)taskDTO.getTaskValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String string = multipleUsers = taskDTO.getTaskValue().get("multipleUsers") != null ? taskDTO.getTaskValue().get("multipleUsers").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleUsers)) {
            Set userList = Arrays.asList(multipleUsers.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new TaskUserMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setUserList(userList);
        } else {
            this.setUserList(Collections.emptySet());
        }
        String string2 = multipleOwners = taskDTO.getTaskValue().get("multipleOwners") != null ? taskDTO.getTaskValue().get("multipleOwners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new TaskOwnerMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setOwnerList(userList);
        } else {
            this.setOwnerList(Collections.emptySet());
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaskValue() {
        return this.taskValue;
    }

    public void setTaskValue(String taskValue) {
        this.taskValue = taskValue;
    }

    public long getTaskCategoryId() {
        return this.taskCategoryId;
    }

    public void setTaskCategoryId(long taskCategoryId) {
        this.taskCategoryId = taskCategoryId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

    public Set<TaskUserMapping> getUserList() {
        return this.userList;
    }

    public void setUserList(Set<TaskUserMapping> userList) {
        this.userList = userList;
    }

    public Set<TaskOwnerMapping> getOwnerList() {
        return this.ownerList;
    }

    public void setOwnerList(Set<TaskOwnerMapping> ownerList) {
        this.ownerList = ownerList;
    }
}

