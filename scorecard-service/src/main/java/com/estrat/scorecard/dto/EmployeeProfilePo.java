/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.EmployeeProfilePo
 *  com.estrat.scorecard.dto.OrgDetails
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.OrgDetails;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class EmployeeProfilePo {
    private long empId;
    private OrgDetails orgId;
    private String firstName;
    private String lastName;
    private int userRole;
    private String profileImage;
    private long parentEmpId;
    private String department;
    private String title;
    private String location;
    private String emailAddress;
    private LocalDateTime createdDate;

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public OrgDetails getOrgId() {
        return this.orgId;
    }

    public void setOrgId(OrgDetails orgId) {
        this.orgId = orgId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getUserRole() {
        return this.userRole;
    }

    public void setUserRole(int userRole) {
        this.userRole = userRole;
    }

    public String getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public long getParentEmpId() {
        return this.parentEmpId;
    }

    public void setParentEmpId(long parentEmpId) {
        this.parentEmpId = parentEmpId;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}

