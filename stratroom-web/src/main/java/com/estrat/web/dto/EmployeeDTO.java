/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.web.dto.OrgStructureDetailsDTO
 *  com.estrat.web.dto.OrganizationDetails
 *  com.fasterxml.jackson.annotation.JsonProperty
 */
package com.estrat.web.dto;

import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDepartmentMappingDTO;
import com.estrat.web.dto.OrgStructureDetailsDTO;
import com.estrat.web.dto.OrganizationDetails;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class EmployeeDTO {
    @JsonProperty(value="id")
    private long empId;
    private boolean canMaintain;
    private String scoreCardLandingUrl;
    private String initiativeLandingUrl;
    private String kpiLandingUrl;
    private String riskLandingUrl;
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
    private String newEmailAddress;
    private DeptDetails deptDetails;
    List<EmployeeDepartmentMappingDTO> departmentMappingList;
    private List<OrgStructureDetailsDTO> orgStructureDetails;
    private String message;
    private String userRoleName;
    private String deptUniqueId;
    private Long superCreatedBy;
    private String createVia;
    private int userAccess;

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

    public String getNewEmailAddress() {
        return this.newEmailAddress;
    }

    public void setNewEmailAddress(String newEmailAddress) {
        this.newEmailAddress = newEmailAddress;
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

    public String getRiskLandingUrl() {
        return this.riskLandingUrl;
    }

    public void setRiskLandingUrl(String riskLandingUrl) {
        this.riskLandingUrl = riskLandingUrl;
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

    public DeptDetails getDeptDetails() {
        return this.deptDetails;
    }

    public void setDeptDetails(DeptDetails deptDetails) {
        this.deptDetails = deptDetails;
    }

    public List<EmployeeDepartmentMappingDTO> getDepartmentMappingList() {
        return this.departmentMappingList;
    }

    public void setDepartmentMappingList(List<EmployeeDepartmentMappingDTO> departmentMappingList) {
        this.departmentMappingList = departmentMappingList;
    }

    public List<OrgStructureDetailsDTO> getOrgStructureDetails() {
        return this.orgStructureDetails;
    }

    public void setOrgStructureDetails(List<OrgStructureDetailsDTO> orgStructureDetails) {
        this.orgStructureDetails = orgStructureDetails;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserRoleName() {
        return this.userRoleName;
    }

    public void setUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
    }

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }

    public Long getSuperCreatedBy() {
        return this.superCreatedBy;
    }

    public void setSuperCreatedBy(Long superCreatedBy) {
        this.superCreatedBy = superCreatedBy;
    }

    public String getCreateVia() {
        return this.createVia;
    }

    public void setCreateVia(String createVia) {
        this.createVia = createVia;
    }

    public int getUserAccess() {
        return this.userAccess;
    }

    public void setUserAccess(int userAccess) {
        this.userAccess = userAccess;
    }
}

