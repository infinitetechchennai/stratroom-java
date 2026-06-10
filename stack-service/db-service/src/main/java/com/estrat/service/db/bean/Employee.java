/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.OrganizationDetails
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.service.db.dto.OrgStructureDetailsDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.annotation.JsonProperty
 */
package com.estrat.service.db.bean;

import com.estrat.service.db.bean.OrganizationDetails;
import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDepartmentMappingDTO;
import com.estrat.service.db.dto.OrgStructureDetailsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class Employee {
    @JsonProperty(value="id")
    private long empId;
    private boolean canMaintain;
    private String scoreCardLandingUrl;
    private String initiativeLandingUrl;
    private String kpiLandingUrl;
    private String riskLandingUrl;
    private String appraisalUrl;
    private DeptDetails deptDetails;
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
    private String parentEmail;
    List<EmployeeDepartmentMappingDTO> departmentMappingList;
    private List<OrgStructureDetailsDTO> orgStructureDetails;
    private Date startDate;
    private LocalDateTime createdDate;
    private String message;
    private String status;
    private String userRoleName;
    private String deptUniqueId;
    private Long superCreatedBy;
    private String createVia;
    private int userAccess;

    public Employee() {
    }

    public Employee(EmployeeProfilePo employeeProfilePo, Boolean flag, Boolean imageFlag) {
        this.empId = employeeProfilePo.getEmpId();
        this.deptDetails = new DeptDetails(employeeProfilePo.getDeptId());
        this.orgDetails = new OrganizationDetails(employeeProfilePo.getOrgId());
        this.firstName = employeeProfilePo.getFirstName();
        this.lastName = employeeProfilePo.getLastName();
        this.userRole = employeeProfilePo.getUserRole();
        this.title = employeeProfilePo.getTitle();
        this.location = employeeProfilePo.getLocation();
        this.emailAddress = employeeProfilePo.getEmailAddress();
        this.location = employeeProfilePo.getLocation();
        this.department = employeeProfilePo.getDepartment();
        this.phoneNumber = employeeProfilePo.getPhoneNumber();
        this.currency = employeeProfilePo.getCurrency();
        this.currencySymbol = employeeProfilePo.getCurrencySymbol();
        this.createVia = employeeProfilePo.getCreateVia();
    }

    public Employee(EmployeeProfilePo employeeProfilePo, Boolean flag) {
        this.empId = employeeProfilePo.getEmpId();
        if (employeeProfilePo.getDeptId() != null) {
            this.deptDetails = new DeptDetails(employeeProfilePo.getDeptId());
        }
        this.orgDetails = new OrganizationDetails(employeeProfilePo.getOrgId());
        this.firstName = employeeProfilePo.getFirstName();
        this.lastName = employeeProfilePo.getLastName();
        this.userRole = employeeProfilePo.getUserRole();
        this.profileImage = employeeProfilePo.getProfileImage();
        this.title = employeeProfilePo.getTitle();
        this.location = employeeProfilePo.getLocation();
        this.emailAddress = employeeProfilePo.getEmailAddress();
        this.parentEmpId = employeeProfilePo.getParentEmpId();
        this.location = employeeProfilePo.getLocation();
        this.department = employeeProfilePo.getDepartment();
        this.phoneNumber = employeeProfilePo.getPhoneNumber();
        this.currency = employeeProfilePo.getCurrency();
        this.currencySymbol = employeeProfilePo.getCurrencySymbol();
        this.createVia = employeeProfilePo.getCreateVia();
        if (flag.booleanValue()) {
            this.departmentMappingList = employeeProfilePo.getDepartmentMappings() != null ? employeeProfilePo.getDepartmentMappings().stream().map(departmentMapping -> new EmployeeDepartmentMappingDTO(departmentMapping)).collect(Collectors.toList()) : null;
        }
    }

    public Employee(EmployeeProfilePo employeeProfilePo) {
        this.empId = employeeProfilePo.getEmpId();
        if (employeeProfilePo.getDeptId() != null) {
            this.deptDetails = new DeptDetails(employeeProfilePo.getDeptId());
        }
        this.orgDetails = employeeProfilePo != null && employeeProfilePo.getOrgId() != null ? new OrganizationDetails(employeeProfilePo.getOrgId()) : null;
        this.firstName = employeeProfilePo.getFirstName();
        this.lastName = employeeProfilePo.getLastName();
        this.userRole = employeeProfilePo.getUserRole();
        this.profileImage = employeeProfilePo.getProfileImage();
        this.title = employeeProfilePo.getTitle();
        this.location = employeeProfilePo.getLocation();
        this.emailAddress = employeeProfilePo.getEmailAddress();
        this.parentEmpId = employeeProfilePo.getParentEmpId();
        this.location = employeeProfilePo.getLocation();
        this.createdDate = employeeProfilePo.getCreatedDate();
        this.department = employeeProfilePo.getDepartment();
        this.phoneNumber = employeeProfilePo.getPhoneNumber();
        this.currency = employeeProfilePo.getCurrency();
        this.currencySymbol = employeeProfilePo.getCurrencySymbol();
        this.createVia = employeeProfilePo.getCreateVia();
        this.departmentMappingList = employeeProfilePo.getDepartmentMappings() != null ? employeeProfilePo.getDepartmentMappings().stream().map(departmentMapping -> new EmployeeDepartmentMappingDTO(departmentMapping)).collect(Collectors.toList()) : null;
    }

    public Employee(EmployeeProfilePo employeeProfilePo, String status) {
        this.empId = employeeProfilePo.getEmpId();
        this.firstName = employeeProfilePo.getFirstName();
        this.userRole = employeeProfilePo.getUserRole();
        this.title = employeeProfilePo.getTitle();
        this.location = employeeProfilePo.getLocation();
        this.status = employeeProfilePo.getStatus();
        this.location = employeeProfilePo.getLocation();
        this.department = employeeProfilePo.getDepartment();
        this.createVia = employeeProfilePo.getCreateVia();
    }

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

    public DeptDetails getDeptDetails() {
        return this.deptDetails;
    }

    public void setDeptDetails(DeptDetails deptDetails) {
        this.deptDetails = deptDetails;
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

    public String getRiskLandingUrl() {
        return this.riskLandingUrl;
    }

    public void setRiskLandingUrl(String riskLandingUrl) {
        this.riskLandingUrl = riskLandingUrl;
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

    public String getParentEmail() {
        return this.parentEmail;
    }

    public void setParentEmail(String parentEmail) {
        this.parentEmail = parentEmail;
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

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String toString() {
        return "Employee [empId=" + this.empId + ", canMaintain=" + this.canMaintain + ", scoreCardLandingUrl=" + this.scoreCardLandingUrl + ", initiativeLandingUrl=" + this.initiativeLandingUrl + ", kpiLandingUrl=" + this.kpiLandingUrl + ", riskLandingUrl=" + this.riskLandingUrl + ", appraisalUrl=" + this.appraisalUrl + ", deptDetails=" + this.deptDetails + ", orgDetails=" + this.orgDetails + ", userName=" + this.userName + ", department=" + this.department + ", password=" + this.password + ", firstName=" + this.firstName + ", lastName=" + this.lastName + ", userRole=" + this.userRole + ", profileImage=" + this.profileImage + ", parentEmpId=" + this.parentEmpId + ", parentEmployeeName=" + this.parentEmployeeName + ", reporteeList=" + this.reporteeList + ", allRepoteeCount=" + this.allRepoteeCount + ", parentEmployee=" + this.parentEmployee + ", parentEmployeeList=" + this.parentEmployeeList + ", title=" + this.title + ", location=" + this.location + ", phoneNumber=" + this.phoneNumber + ", currency=" + this.currency + ", currencySymbol=" + this.currencySymbol + ", emailAddress=" + this.emailAddress + ", newEmailAddress=" + this.newEmailAddress + ", parentEmail=" + this.parentEmail + ", departmentMappingList=" + this.departmentMappingList + ", orgStructureDetails=" + this.orgStructureDetails + ", startDate=" + this.startDate + ", createdDate=" + this.createdDate + ", message=" + this.message + ", status=" + this.status + ", userRoleName=" + this.userRoleName + ", deptUniqueId=" + this.deptUniqueId + ", superCreatedBy=" + this.superCreatedBy + ", createVia=" + this.createVia + ", userAccess=" + this.userAccess + "]";
    }

    public Employee(long empId, boolean canMaintain, String scoreCardLandingUrl, String initiativeLandingUrl, String kpiLandingUrl, String riskLandingUrl, String appraisalUrl, DeptDetails deptDetails, OrganizationDetails orgDetails, String userName, String department, String password, String firstName, String lastName, int userRole, String profileImage, long parentEmpId, String parentEmployeeName, List<Employee> reporteeList, Long allRepoteeCount, Employee parentEmployee, List<Employee> parentEmployeeList, String title, String location, String phoneNumber, String currency, String currencySymbol, String emailAddress, String newEmailAddress, String parentEmail, List<EmployeeDepartmentMappingDTO> departmentMappingList, List<OrgStructureDetailsDTO> orgStructureDetails, Date startDate, LocalDateTime createdDate, String message, String status, String userRoleName, String deptUniqueId, Long superCreatedBy, String createVia, int userAccess) {
        this.empId = empId;
        this.canMaintain = canMaintain;
        this.scoreCardLandingUrl = scoreCardLandingUrl;
        this.initiativeLandingUrl = initiativeLandingUrl;
        this.kpiLandingUrl = kpiLandingUrl;
        this.riskLandingUrl = riskLandingUrl;
        this.appraisalUrl = appraisalUrl;
        this.deptDetails = deptDetails;
        this.orgDetails = orgDetails;
        this.userName = userName;
        this.department = department;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
        this.profileImage = profileImage;
        this.parentEmpId = parentEmpId;
        this.parentEmployeeName = parentEmployeeName;
        this.reporteeList = reporteeList;
        this.allRepoteeCount = allRepoteeCount;
        this.parentEmployee = parentEmployee;
        this.parentEmployeeList = parentEmployeeList;
        this.title = title;
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.currency = currency;
        this.currencySymbol = currencySymbol;
        this.emailAddress = emailAddress;
        this.newEmailAddress = newEmailAddress;
        this.parentEmail = parentEmail;
        this.departmentMappingList = departmentMappingList;
        this.orgStructureDetails = orgStructureDetails;
        this.startDate = startDate;
        this.createdDate = createdDate;
        this.message = message;
        this.status = status;
        this.userRoleName = userRoleName;
        this.deptUniqueId = deptUniqueId;
        this.superCreatedBy = superCreatedBy;
        this.createVia = createVia;
        this.userAccess = userAccess;
    }
}

