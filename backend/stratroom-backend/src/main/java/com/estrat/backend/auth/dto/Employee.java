/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.dto.DeptDetails
 *  com.estrat.backend.auth.dto.Employee
 *  com.estrat.backend.auth.dto.OrganizationDetails
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.annotation.JsonProperty
 */
package com.estrat.backend.auth.dto;

import com.estrat.backend.auth.dto.DeptDetails;
import com.estrat.backend.auth.dto.OrganizationDetails;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class Employee {
    @JsonProperty(value="id")
    private long empId;
    private boolean canMaintain;
    private String scoreCardLandingUrl;
    private String initiativeLandingUrl;
    private String kpiLandingUrl;
    private String appraisalUrl;
    private long deptId = 1L;
    private OrganizationDetails orgDetails;
    private String userName;
    @JsonProperty(value="dept")
    private String department;
    private String password;
    @JsonProperty(value="name")
    private String firstName;
    private String lastName;
    private int userRole = 0;
    @JsonProperty(value="image")
    private String profileImage;
    @JsonProperty(value="pid")
    private long parentEmpId;
    private String parentEmployeeName;
    @JsonProperty(value="children")
    private List<Employee> reporteeList;
    private Long allRepoteeCount;
    private Employee parentEmployee;
    private List<Employee> parentEmployeeList;
    @JsonProperty(value="title")
    private String title;
    private String location;
    private String phoneNumber;
    private String currency;
    private String currencySymbol;
    @JsonProperty(value="email")
    private String emailAddress;
    private String userRoleName;
    private int userAccess;
    private DeptDetails deptDetails;

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getParentEmployeeName() {
        return this.parentEmployeeName;
    }

    public void setParentEmployeeName(String parentEmployeeName) {
        this.parentEmployeeName = parentEmployeeName;
    }

    public Long getAllRepoteeCount() {
        return this.allRepoteeCount;
    }

    public void setAllRepoteeCount(Long allRepoteeCount) {
        this.allRepoteeCount = allRepoteeCount;
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

    public Employee getParentEmployee() {
        return this.parentEmployee;
    }

    public void setParentEmployee(Employee parentEmployee) {
        this.parentEmployee = parentEmployee;
    }

    public List<Employee> getReporteeList() {
        return this.reporteeList;
    }

    public void setReporteeList(List<Employee> reporteeList) {
        this.reporteeList = reporteeList;
    }

    public List<Employee> getParentEmployeeList() {
        return this.parentEmployeeList;
    }

    public void setParentEmployeeList(List<Employee> parentEmployeeList) {
        this.parentEmployeeList = parentEmployeeList;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public boolean isCanMaintain() {
        return this.canMaintain;
    }

    public void setCanMaintain(boolean canMaintain) {
        this.canMaintain = canMaintain;
    }

    public String getScoreCardLandingUrl() {
        return this.scoreCardLandingUrl;
    }

    public void setScoreCardLandingUrl(String scoreCardLandingUrl) {
        this.scoreCardLandingUrl = scoreCardLandingUrl;
    }

    public String getInitiativeLandingUrl() {
        return this.initiativeLandingUrl;
    }

    public void setInitiativeLandingUrl(String initiativeLandingUrl) {
        this.initiativeLandingUrl = initiativeLandingUrl;
    }

    public String getKpiLandingUrl() {
        return this.kpiLandingUrl;
    }

    public void setKpiLandingUrl(String kpiLandingUrl) {
        this.kpiLandingUrl = kpiLandingUrl;
    }

    public String getAppraisalUrl() {
        return this.appraisalUrl;
    }

    public void setAppraisalUrl(String appraisalUrl) {
        this.appraisalUrl = appraisalUrl;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCurrency() {
        return this.currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCurrencySymbol() {
        return this.currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }

    public OrganizationDetails getOrgDetails() {
        return this.orgDetails;
    }

    public void setOrgDetails(OrganizationDetails orgDetails) {
        this.orgDetails = orgDetails;
    }

    public String getUserRoleName() {
        return this.userRoleName;
    }

    public void setUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
    }

    public int getUserAccess() {
        return this.userAccess;
    }

    public void setUserAccess(int userAccess) {
        this.userAccess = userAccess;
    }

    public DeptDetails getDeptDetails() {
        return this.deptDetails;
    }

    public void setDeptDetails(DeptDetails deptDetails) {
        this.deptDetails = deptDetails;
    }
}

