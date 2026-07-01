/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.UserRoleManagement
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.UserDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.UserRoleManagement;
import com.estrat.backend.db.dto.DeptDetails;
import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {
    private long userId;
    private String deptIds;
    private String departments;
    private String phoneNumber;
    private String emailAddress;
    private String location;
    private String profileImage;
    private String name;
    private long orgId;
    private String userRole;
    private String designation;
    private String status;
    private String loginStatus;
    private String password;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Long createdBy;
    private Long updatedBy;
    private int userAccess = 1;
    private String userCategory;
    public String userType;
    private String userUniqId;
    public List<DeptDetails> departmentList;
    public String deptValue;
    public Long roleId;
    private Long parentEmpId;

    public UserDTO() {
    }

    public UserDTO(UserRoleManagement userRoleManagement) {
        this.userId = userRoleManagement.getEmpId();
        this.orgId = userRoleManagement.getOrgId() != null ? userRoleManagement.getOrgId() : 0L;
        this.name = userRoleManagement.getName();
        this.userRole = userRoleManagement.getRole();
        this.departments = userRoleManagement.getDepartment();
        if (userRoleManagement.getProfileImage() != null) {
            this.profileImage = userRoleManagement.getProfileImage();
        }
        this.location = userRoleManagement.getLocation();
        this.emailAddress = userRoleManagement.getEmailAddress();
        this.phoneNumber = userRoleManagement.getPhoneNumber();
        this.designation = userRoleManagement.getDesignation();
        this.status = userRoleManagement.getStatus();
        this.loginStatus = userRoleManagement.getLoginStatus();
        this.createdDate = userRoleManagement.getCreatedDate();
        this.updatedDate = userRoleManagement.getUpdatedDate();
        this.createdBy = userRoleManagement.getCreatedBy() != null ? userRoleManagement.getCreatedBy() : 0L;
        this.updatedBy = userRoleManagement.getUpdatedBy() != null ? userRoleManagement.getUpdatedBy() : 0L;
        this.userAccess = userRoleManagement.getUserAccess();
        this.roleId = userRoleManagement.getRoleId();
        this.userCategory = userRoleManagement.getUserCategory();
        this.userType = userRoleManagement.getUserType();
        this.userUniqId = userRoleManagement.getUserUniqId();
    }

    public long getUserId() {
        return this.userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getDeptIds() {
        return this.deptIds;
    }

    public void setDeptIds(String deptIds) {
        this.deptIds = deptIds;
    }

    public String getDepartments() {
        return this.departments;
    }

    public void setDepartments(String departments) {
        this.departments = departments;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getUserRole() {
        return this.userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLoginStatus() {
        return this.loginStatus;
    }

    public void setLoginStatus(String loginStatus) {
        this.loginStatus = loginStatus;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return this.updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
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

    public List<DeptDetails> getDepartmentList() {
        return this.departmentList;
    }

    public void setDepartmentList(List<DeptDetails> departmentList) {
        this.departmentList = departmentList;
    }

    public int getUserAccess() {
        return this.userAccess;
    }

    public void setUserAccess(int userAccess) {
        this.userAccess = userAccess;
    }

    public String getDeptValue() {
        return this.deptValue;
    }

    public void setDeptValue(String deptValue) {
        this.deptValue = deptValue;
    }

    public Long getRoleId() {
        return this.roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getUserCategory() {
        return this.userCategory;
    }

    public void setUserCategory(String userCategory) {
        this.userCategory = userCategory;
    }

    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUserUniqId() {
        return this.userUniqId;
    }

    public void setUserUniqId(String userUniqId) {
        this.userUniqId = userUniqId;
    }

    public Long getParentEmpId() {
        return parentEmpId;
    }

    public void setParentEmpId(Long parentEmpId) {
        this.parentEmpId = parentEmpId;
    }
}
