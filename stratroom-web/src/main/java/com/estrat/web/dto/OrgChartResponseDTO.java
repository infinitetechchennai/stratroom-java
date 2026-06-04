/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.OrgChartResponseDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.annotation.JsonProperty
 */
package com.estrat.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class OrgChartResponseDTO {
    @JsonProperty(value="id")
    private long empId;
    @JsonIgnore
    private long deptId;
    @JsonIgnore
    private long orgId;
    @JsonProperty(value="name")
    private String firstName;
    @JsonProperty(value="img")
    private String profileImage;
    @JsonProperty(value="pid")
    private long parentEmpId;
    @JsonProperty(value="title")
    private String title;
    @JsonProperty(value="email")
    private String emailAddress;

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public long getParentEmpId() {
        return this.parentEmpId;
    }

    public void setParentEmpId(long parentEmpId) {
        this.parentEmpId = parentEmpId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}

