/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.bean.po.TaskDetails
 *  com.estrat.service.db.dto.TaskCategorysDTO
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
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.TaskDetails;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="task_categorys", schema="orgstructure")
public class TaskCategorys {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="task_category_value")
    private String taskCategoryValue;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="deptid")
    private long deptId;
    @Column(name="pageid")
    private long pageId;
    @Column(name="type")
    private String type;
    @OneToMany(mappedBy="taskCategoryId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<TaskDetails> taskDetailsList;

    public TaskCategorys() {
    }

    public TaskCategorys(TaskCategorysDTO taskCategorysDTO) {
        this.id = taskCategorysDTO.getId();
        this.active = taskCategorysDTO.getActive();
        this.owner = taskCategorysDTO.getOwner();
        this.createdBy = taskCategorysDTO.getCreatedBy();
        this.updatedBy = taskCategorysDTO.getUpdatedBy();
        this.createdTime = taskCategorysDTO.getCreatedTime();
        this.updatedTime = taskCategorysDTO.getUpdatedTime();
        this.deptId = taskCategorysDTO.getDeptId();
        this.pageId = taskCategorysDTO.getPageId();
        this.type = taskCategorysDTO.getType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.taskCategoryValue = mapper.writeValueAsString((Object)taskCategorysDTO.getTaskCategoryValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaskCategoryValue() {
        return this.taskCategoryValue;
    }

    public void setTaskCategoryValue(String taskCategoryValue) {
        this.taskCategoryValue = taskCategoryValue;
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

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public List<TaskDetails> getTaskDetailsList() {
        return this.taskDetailsList;
    }

    public void setTaskDetailsList(List<TaskDetails> taskDetailsList) {
        this.taskDetailsList = taskDetailsList;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

