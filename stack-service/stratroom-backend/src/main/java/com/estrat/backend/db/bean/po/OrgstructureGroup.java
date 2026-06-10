/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgGroupMemberMapping
 *  com.estrat.backend.db.bean.po.OrgGroupUserMapping
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  com.estrat.backend.db.dto.OrgstructureGroupDTO
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

import com.estrat.backend.db.bean.po.OrgGroupMemberMapping;
import com.estrat.backend.db.bean.po.OrgGroupUserMapping;
import com.estrat.backend.db.dto.OrgstructureGroupDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
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
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="orgstructure_group", schema="orgstructure")
public class OrgstructureGroup {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
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
    @Column(name="groupValue")
    private String groupValue;
    @OneToMany(mappedBy="id.orgstructureGroupId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<OrgGroupUserMapping> employeeList;
    @OneToMany(mappedBy="id.orgstructureGroupId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<OrgGroupMemberMapping> employeeMemberList;

    public OrgstructureGroup() {
    }

    public OrgstructureGroup(OrgstructureGroupDTO groupDTO) {
        String multipleMembers;
        String multipleOwners;
        this.id = groupDTO.getId();
        this.active = groupDTO.getActive();
        this.owner = groupDTO.getOwner();
        this.createdBy = groupDTO.getCreatedBy();
        this.updatedBy = groupDTO.getUpdatedBy();
        this.createdTime = groupDTO.getCreatedTime();
        this.updatedTime = groupDTO.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.groupValue = mapper.writeValueAsString((Object)groupDTO.getGroupValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String string = multipleOwners = groupDTO.getGroupValue().get("multipleOwners") != null ? groupDTO.getGroupValue().get("multipleOwners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new OrgGroupUserMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setEmployeeList(userList);
        } else {
            this.setEmployeeList(Collections.emptySet());
        }
        String string2 = multipleMembers = groupDTO.getGroupValue().get("multipleMembers") != null ? groupDTO.getGroupValue().get("multipleMembers").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleMembers)) {
            Set userList = Arrays.asList(multipleMembers.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new OrgGroupMemberMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setEmployeeMemberList(userList);
        } else {
            this.setEmployeeMemberList(Collections.emptySet());
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getGroupValue() {
        return this.groupValue;
    }

    public void setGroupValue(String groupValue) {
        this.groupValue = groupValue;
    }

    public Set<OrgGroupUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<OrgGroupUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public Set<OrgGroupMemberMapping> getEmployeeMemberList() {
        return this.employeeMemberList;
    }

    public void setEmployeeMemberList(Set<OrgGroupMemberMapping> employeeMemberList) {
        this.employeeMemberList = employeeMemberList;
    }
}

