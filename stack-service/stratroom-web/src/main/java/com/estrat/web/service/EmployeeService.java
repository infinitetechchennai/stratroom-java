/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.DashBoardDepartmentResponseDTO
 *  com.estrat.web.dto.DepartmentChartDTO
 *  com.estrat.web.dto.DepartmentResponseDetailsDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.DeptImportDTO
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.web.dto.EmployeePreferencesDTO
 *  com.estrat.web.dto.EmployeeResponseDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.LicenseResponseDTO
 *  com.estrat.web.dto.LoginDTO
 *  com.estrat.web.dto.LoginResponseDTO
 *  com.estrat.web.dto.OrganizationDetails
 *  com.estrat.web.dto.TokenResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmailService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.EmployeeService$1
 *  com.estrat.web.service.EmployeeService$10
 *  com.estrat.web.service.EmployeeService$11
 *  com.estrat.web.service.EmployeeService$12
 *  com.estrat.web.service.EmployeeService$13
 *  com.estrat.web.service.EmployeeService$14
 *  com.estrat.web.service.EmployeeService$15
 *  com.estrat.web.service.EmployeeService$16
 *  com.estrat.web.service.EmployeeService$17
 *  com.estrat.web.service.EmployeeService$2
 *  com.estrat.web.service.EmployeeService$3
 *  com.estrat.web.service.EmployeeService$4
 *  com.estrat.web.service.EmployeeService$5
 *  com.estrat.web.service.EmployeeService$6
 *  com.estrat.web.service.EmployeeService$7
 *  com.estrat.web.service.EmployeeService$8
 *  com.estrat.web.service.EmployeeService$9
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.DashBoardDepartmentResponseDTO;
import com.estrat.web.dto.DepartmentChartDTO;
import com.estrat.web.dto.DepartmentResponseDetailsDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.DeptImportDTO;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.EmployeeDepartmentMappingDTO;
import com.estrat.web.dto.EmployeePreferencesDTO;
import com.estrat.web.dto.EmployeeResponseDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.LicenseResponseDTO;
import com.estrat.web.dto.LoginDTO;
import com.estrat.web.dto.LoginResponseDTO;
import com.estrat.web.dto.OrganizationDetails;
import com.estrat.web.dto.TokenResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmailService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserPrincipal;
import com.estrat.web.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class EmployeeService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${userservice.employee.create.url}")
    private String createEmpUrl;
    @Value(value="${userservice.employee.edit.url}")
    private String editEmpUrl;
    @Value(value="${userservice.employee.remove.url}")
    private String removeEmpUrl;
    @Value(value="${authservice.validate.user}")
    private String authUrl;
    @Value(value="${authservice.url}")
    private String refreshUrl;
    @Value(value="${dbservice.getempId.url}")
    private String getEmpUrl;
    @Value(value="${dbservice.employeeprofile.url}")
    private String profileUrl;
    @Value(value="${userservice.updateparentId.url}")
    private String updateParentIdUrl;
    @Value(value="${userservice.employee.create.url}")
    private String userUrl;
    @Value(value="${userservice.employee.create.bulk.url}")
    private String createBulkEmpUrl;
    @Value(value="${userservice.employeepreference.url}")
    private String empPreferenceUrl;
    @Value(value="${userservice.fetchpreference.url}")
    private String retrievePreferenceUrl;
    @Value(value="${userservice.menus.url}")
    private String orgurl;
    @Value(value="${userservice.user.orgcount.url}")
    private String orgCountUrl;
    @Value(value="${userservice.organization.employeelist.url}")
    private String orgEmpListUrl;
    @Value(value="${userservice.currencylist.url}")
    private String currencyListUrl;
    @Value(value="${chartservice.orgchart.url}")
    private String orgChartUrl;
    @Value(value="${server.port}")
    String port;
    @Value(value="${saml.sso.auth.host}")
    String hostName;
    @Value(value="${server.servlet.context-path}")
    private String contextPath;
    @Autowired
    private EmailService emailService;
    @Autowired
    private RequestSessionUtil requestSessionUtil;

    public EmployeeResponseDTO createEmployee(EmployeeDTO employeeDTO) {
        if (employeeDTO.getDepartment() != null && !employeeDTO.getDepartment().isEmpty() || employeeDTO.getDeptUniqueId() != null && !employeeDTO.getDeptUniqueId().isEmpty()) {
            DeptDetails deptDetails = new DeptDetails();
            deptDetails.setOrgId(employeeDTO.getOrgDetails().getId());
            if (employeeDTO.getDepartment() != null && !employeeDTO.getDepartment().isEmpty()) {
                deptDetails.setName(employeeDTO.getDepartment());
            }
            if (employeeDTO.getDeptUniqueId() != null && !employeeDTO.getDeptUniqueId().isEmpty()) {
                deptDetails.setDeptID(employeeDTO.getDeptUniqueId());
            }
            employeeDTO.setDeptDetails(deptDetails);
        } else {
            employeeDTO.setDeptDetails(null);
        }
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.createEmpUrl, employeeDTO, EmployeeResponseDTO.class);
    }

    public boolean createBulkEmployee(List<EmployeeDTO> employees) {
        return (Boolean)this.restTemplate.postForObject(this.createBulkEmpUrl, employees, Boolean.class);
    }

    public EmployeeResponseDTO editEmployee(EmployeeDTO employeeDTO) {
        if (employeeDTO.getDepartment() != null && !employeeDTO.getDepartment().isEmpty() || employeeDTO.getDeptUniqueId() != null && !employeeDTO.getDeptUniqueId().isEmpty()) {
            DeptDetails deptDetails = new DeptDetails();
            deptDetails.setOrgId(employeeDTO.getOrgDetails().getId());
            if (employeeDTO.getDepartment() != null && !employeeDTO.getDepartment().isEmpty()) {
                deptDetails.setName(employeeDTO.getDepartment());
            }
            if (employeeDTO.getDeptUniqueId() != null && !employeeDTO.getDeptUniqueId().isEmpty()) {
                deptDetails.setDeptID(employeeDTO.getDeptUniqueId());
            }
            employeeDTO.setDeptDetails(deptDetails);
        } else {
            employeeDTO.setDeptDetails(null);
        }
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.editEmpUrl, employeeDTO, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO removeEmployee(String empId) {
        return (EmployeeResponseDTO)this.restTemplate.getForObject(this.removeEmpUrl + empId + "/removeEmployee", EmployeeResponseDTO.class);
    }

    public List<EmployeeDTO> getReporteeList(long empID) {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.removeEmpUrl + "reporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> getAllReporteeList(long empID) {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.removeEmpUrl + "allReporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> getAllDeptReporteeList(long empID) {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.removeEmpUrl + "allDeptReporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public LoginResponseDTO authoriseUser(LoginDTO loginDTO) throws RequestException {
        return (LoginResponseDTO)this.restTemplate.postForObject(this.authUrl, loginDTO, LoginResponseDTO.class);
    }

    public EmployeeDTO getEmployeeId(EmployeeDTO employeeDTO) {
        return (EmployeeDTO)this.restTemplate.postForObject(this.getEmpUrl, employeeDTO, EmployeeDTO.class);
    }

    public EmployeeResponseDTO updateParentEmpId(EmployeeDTO employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.updateParentIdUrl, employeeDTO, EmployeeResponseDTO.class);
    }

    public Employee getProfileDetails() {
        long empId = Long.valueOf(UserThreadLocal.get().getProfile().getEmpId());
        String url = UriComponentsBuilder.fromHttpUrl((String)this.profileUrl).buildAndExpand(new Object[]{empId}).toUriString();
        return (Employee)this.restTemplate.getForObject(url, Employee.class);
    }

    public Map<String, Object> checkEmail(String email, String empId) {
        String emaiCheckurl = this.removeEmpUrl + "/checkEmail";
        String url = UriComponentsBuilder.fromHttpUrl((String)emaiCheckurl).queryParam("email", new Object[]{email}).queryParam("empId", new Object[]{empId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return map;
    }

    public EmployeeDTO getEmployeeDetails(String empId) {
        String getEmpDetailsUrl = this.removeEmpUrl + "/employeeDetails/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)getEmpDetailsUrl).buildAndExpand(new Object[]{empId}).toUriString();
        return (EmployeeDTO)this.restTemplate.getForObject(url, EmployeeDTO.class);
    }

    public EmployeePreferencesDTO createPreference(EmployeePreferencesDTO employeePreferencesDTO) {
        return (EmployeePreferencesDTO)this.restTemplate.postForObject(this.empPreferenceUrl, employeePreferencesDTO, EmployeePreferencesDTO.class);
    }

    public EmployeePreferencesDTO getPreferenceDetails(String pageName, Long pageId) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrievePreferenceUrl).queryParam("pageName", new Object[]{pageName}).queryParam("pageId", new Object[]{pageId}).toUriString();
        return (EmployeePreferencesDTO)this.restTemplate.getForObject(url, EmployeePreferencesDTO.class);
    }

    public TokenResponseDTO refreshToken() throws RequestException {
        String url = String.join((CharSequence)"/", this.refreshUrl, "generateToken");
        TokenResponseDTO tokenResponse = (TokenResponseDTO)this.restTemplate.getForObject(url, TokenResponseDTO.class);
        return tokenResponse;
    }

    public TokenResponseDTO validateToken() {
        String url = String.join((CharSequence)"/", this.refreshUrl, "validateToken");
        TokenResponseDTO tokenResponse = (TokenResponseDTO)this.restTemplate.getForObject(url, TokenResponseDTO.class);
        return tokenResponse;
    }

    public OrganizationDetails findByName(String name) {
        String url1 = this.orgurl + "/orgdetails";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("name", new Object[]{name}).toUriString();
        OrganizationDetails organizationDetails = (OrganizationDetails)this.restTemplate.getForObject(url, OrganizationDetails.class);
        return organizationDetails;
    }

    public OrganizationDetails findByOrgId(Long id) {
        String url1 = this.orgurl + "/orgdetails/" + id;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        OrganizationDetails organizationDetails = (OrganizationDetails)this.restTemplate.getForObject(url, OrganizationDetails.class);
        return organizationDetails;
    }

    public List<Employee> getOrgEmployeeList() {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.orgEmpListUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> getCurrencyList() {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.currencyListUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Long getOrgUserCount(long orgId) {
        UriComponentsBuilder componentsBuilder = UriComponentsBuilder.fromHttpUrl((String)this.orgCountUrl);
        return (Long)this.restTemplate.getForObject(componentsBuilder.queryParam("orgId", new Object[]{orgId}).toUriString(), Long.class);
    }

    public List<String> getDepartmentList() {
        String deptUrl = this.orgChartUrl + "/departmentList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public LicenseResponseDTO validateLicense() {
        String url = this.orgChartUrl + "/validateLicense";
        UserThreadLocal.get().getCommonHeaders().put("PRELOGINAPI", "TRUE");
        return (LicenseResponseDTO)this.restTemplate.getForObject(url, LicenseResponseDTO.class);
    }

    public Map<String, Object> forgotPassword(UserPrincipal userPrincipal) throws RequestException {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserName(userPrincipal.getUserName());
        loginDTO.setPassWord("FORGOT_PASSWORD");
        loginDTO.setSsoLogin(true);
        LoginResponseDTO loginResponseDTO = this.authoriseUser(loginDTO);
        StringBuffer buffer = new StringBuffer();
        buffer.append("https://").append(this.hostName).append(":").append(this.port).append(this.contextPath).append("/validateLink?token=" + loginResponseDTO.getAccessToken());
        this.emailService.sendMail(userPrincipal.getUserName(), "Reset Password", buffer.toString());
        HashMap<String, Object> response = new HashMap<String, Object>();
        response.put("result", "email has been sent to reset password");
        return response;
    }

    public EmployeeResponseDTO resetPassword(Employee employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(String.join((CharSequence)"", this.orgChartUrl, "resetPassword"), employeeDTO, EmployeeResponseDTO.class);
    }

    public List<Employee> getOrgEmployeeListByOrgId(Long orgId) {
        String orgEmpListUrl = this.removeEmpUrl + "org/employeeList";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("orgId", new Object[]{orgId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Integer> getYearsForDropdown() {
        String url = this.orgChartUrl + "/years";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<String> getOrgDepartmentList(String name) {
        String deptUrl = this.orgChartUrl + "/orgDepartmentList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).queryParam("name", new Object[]{name}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<EmployeeDepartmentMappingDTO> departmentByEmployeeList(String deptId) {
        String orgEmpListUrl = this.orgurl + "/departmentByEmployeeList/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DashBoardDepartmentResponseDTO departmentByEmployeeListChart(String empId) throws RequestException {
        DashBoardDepartmentResponseDTO dashBoardResponseDTO = new DashBoardDepartmentResponseDTO();
        dashBoardResponseDTO.setNodeList(this.departmentByEmployeeListChartDetails(empId));
        return dashBoardResponseDTO;
    }

    public DashBoardDepartmentResponseDTO departmentByEmployeeListChart(String empId, String year) throws RequestException {
        DashBoardDepartmentResponseDTO dashBoardResponseDTO = new DashBoardDepartmentResponseDTO();
        dashBoardResponseDTO.setNodeList(this.departmentByEmployeeListChartDetails(empId, year));
        return dashBoardResponseDTO;
    }

    public DepartmentResponseDetailsDTO departmentByEmployeeListChartDetails(String empId, String year) throws RequestException {
        String orgEmpListUrl = this.orgurl + "/" + empId + "/departmentByEmployeeList";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("year", new Object[]{year}).toUriString();
        return (DepartmentResponseDetailsDTO)this.restTemplate.getForObject(url, DepartmentResponseDetailsDTO.class);
    }

    public DepartmentResponseDetailsDTO departmentByEmployeeListChartDetails(String empId) throws RequestException {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (DepartmentResponseDetailsDTO)this.restTemplate.getForObject(this.orgurl + "/" + empId + "/departmentByEmployeeList", (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DepartmentChartDTO addDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        String orgEmpListUrl = this.orgurl + "/addDepartmentMapping";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.postForObject(url, departmentChartDTO, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO updateDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        String orgEmpListUrl = this.orgurl + "/addDepartmentMapping";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.putForObject(url, departmentChartDTO, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO updateDepartmentParent(long deptId, long deptParentId, long updatedBy) {
        String orgEmpListUrl = this.orgurl + "/updateDepartmentParentId/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("deptParentId", new Object[]{deptParentId}).queryParam("updatedBy", new Object[]{updatedBy}).toUriString();
        return (DepartmentChartDTO)this.restTemplate.putForObject(url, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO getDepartmentMapping(long deptId) {
        String orgEmpListUrl = this.orgurl + "/getDepartmentMapping/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.getForObject(url, DepartmentChartDTO.class);
    }

    public EmployeeResponseDTO deleteDepartmentChartDTO(long deptId) {
        String orgEmpListUrl = this.orgurl + "/deleteDepartmentMapping/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (EmployeeResponseDTO)this.restTemplate.getForObject(url, EmployeeResponseDTO.class);
    }

    public boolean createBulkDeptMapping(List<DeptImportDTO> deptImportDTOS) {
        String createBulkDeptUrl = this.orgurl + "/createBulkDeptMapping";
        return (Boolean)this.restTemplate.postForObject(createBulkDeptUrl, deptImportDTOS, Boolean.class);
    }

    public Employee findProfileByName(FindDTO findDTO) {
        String url = this.orgurl + "/findProfileByName";
        return (Employee)this.restTemplate.getForObject(url, findDTO, Employee.class);
    }

    public Map<String, Object> findByDeptName(FindDTO findDTO) {
        String url = this.orgurl + "/checkDept";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> getDepartmentChart(String email) {
        String url = this.orgurl + "/checkDeptEmail";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("email", new Object[]{email}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> getDesignationList(String name, String datePeriod) {
        String deptUrl = this.orgChartUrl + "/designationList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).queryParam("name", new Object[]{name}).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> checkParentEmployee(Long orgId) {
        String deptUrl = this.orgChartUrl + "/checkParentEmployee/" + orgId;
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DepartmentChartDTO> checkDepartmentChart(Long orgId) {
        String deptUrl = this.orgChartUrl + "/checkDepartmentChart/" + orgId;
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Employee getProfileDetails(String empUId) {
        long empId = Long.valueOf(empUId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.profileUrl).buildAndExpand(new Object[]{empId}).toUriString();
        return (Employee)this.restTemplate.getForObject(url, Employee.class);
    }

    public EmployeeResponseDTO deleteEmployee(String empId) {
        String deleteUrl = this.orgChartUrl + "/deleteEmployee/" + empId;
        return (EmployeeResponseDTO)this.restTemplate.getForObject(deleteUrl, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO deleteOrgDept(String depId) {
        String deleteUrl = this.orgChartUrl + "/deleteOrgDept/" + depId;
        return (EmployeeResponseDTO)this.restTemplate.getForObject(deleteUrl, EmployeeResponseDTO.class);
    }
}


