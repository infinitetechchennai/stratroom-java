/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.UserRoleManagement
 *  com.estrat.service.db.dto.UserDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.UserDTO;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="user_role_management", schema="orgstructure")
public class UserRoleManagement {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="emp_id")
    private long empId;
    @Column(name="dept_id")
    private long deptId;
    @Column(name="org_id")
    private long orgId;
    @Column(name="name")
    private String name;
    @Column(name="profile_image")
    private String profileImage;
    @Column(name="department")
    private String department;
    @Column(name="location")
    private String location;
    @Column(name="email_address")
    private String emailAddress;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name="created_date", updatable=false)
    private LocalDateTime createdDate;
    @Column(name="updated_date")
    private LocalDateTime updatedDate;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="status")
    private String status;
    @Column(name="login_status")
    private String loginStatus;
    @Column(name="designation")
    private String designation;
    @Column(name="role")
    private String role;
    @Column(name="active")
    private int active;
    @Column(name="userAccess", updatable=false)
    private int userAccess = 1;
    @Column(name="role_id")
    public Long roleId;
    @Column(name="user_category")
    private String userCategory;
    @Column(name="user_type")
    private String userType;
    @Column(name="user_uniqid")
    private String userUniqId;

    public UserRoleManagement() {
    }

    public UserRoleManagement(UserDTO userDTO) {
        this.empId = userDTO.getUserId();
        this.orgId = userDTO.getOrgId();
        this.name = userDTO.getName();
        this.role = userDTO.getUserRole();
        this.profileImage = userDTO.getProfileImage();
        this.designation = userDTO.getDesignation();
        this.location = userDTO.getLocation();
        this.emailAddress = userDTO.getEmailAddress();
        this.phoneNumber = userDTO.getPhoneNumber();
        this.status = userDTO.getStatus();
        this.loginStatus = userDTO.getLoginStatus();
        this.createdDate = userDTO.getCreatedDate();
        this.updatedDate = userDTO.getUpdatedDate();
        this.createdBy = userDTO.getCreatedBy();
        this.updatedBy = userDTO.getUpdatedBy();
        this.roleId = userDTO.getRoleId();
        this.userCategory = userDTO.getUserCategory();
        this.userType = userDTO.getUserType();
        this.userUniqId = userDTO.getUserUniqId();
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

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public int getUserAccess() {
        return this.userAccess;
    }

    public void setUserAccess(int userAccess) {
        this.userAccess = userAccess;
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
}

