/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.DepartmentChartDTO
 *  com.estrat.backend.user.dto.DepartmentResponseDetailsDTO
 *  com.estrat.backend.user.dto.DeptImportDTO
 *  com.estrat.backend.user.dto.Employee
 *  com.estrat.backend.user.dto.EmployeeDTO
 *  com.estrat.backend.user.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.backend.user.dto.EmployeePreferencesDTO
 *  com.estrat.backend.user.dto.EmployeeResponseDTO
 *  com.estrat.backend.user.dto.FindDTO
 *  com.estrat.backend.user.dto.LicenseResponseDTO
 *  com.estrat.backend.user.dto.OrganizationDetails
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.service.EmployeeService
 *  com.estrat.backend.user.service.EmployeeService$1
 *  com.estrat.backend.user.service.EmployeeService$10
 *  com.estrat.backend.user.service.EmployeeService$11
 *  com.estrat.backend.user.service.EmployeeService$12
 *  com.estrat.backend.user.service.EmployeeService$13
 *  com.estrat.backend.user.service.EmployeeService$14
 *  com.estrat.backend.user.service.EmployeeService$15
 *  com.estrat.backend.user.service.EmployeeService$16
 *  com.estrat.backend.user.service.EmployeeService$17
 *  com.estrat.backend.user.service.EmployeeService$2
 *  com.estrat.backend.user.service.EmployeeService$3
 *  com.estrat.backend.user.service.EmployeeService$4
 *  com.estrat.backend.user.service.EmployeeService$5
 *  com.estrat.backend.user.service.EmployeeService$6
 *  com.estrat.backend.user.service.EmployeeService$7
 *  com.estrat.backend.user.service.EmployeeService$8
 *  com.estrat.backend.user.service.EmployeeService$9
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.DepartmentChartDTO;
import com.estrat.backend.user.dto.DepartmentResponseDetailsDTO;
import com.estrat.backend.user.dto.DeptImportDTO;
import com.estrat.backend.user.dto.Employee;
import com.estrat.backend.user.dto.EmployeeDTO;
import com.estrat.backend.user.dto.EmployeeDepartmentMappingDTO;
import com.estrat.backend.user.dto.EmployeePreferencesDTO;
import com.estrat.backend.user.dto.EmployeeResponseDTO;
import com.estrat.backend.user.dto.FindDTO;
import com.estrat.backend.user.dto.LicenseResponseDTO;
import com.estrat.backend.user.dto.OrganizationDetails;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.EmployeeService;
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
    @Value(value="${dbservice.employee.create.url}")
    private String createEmpUrl;
    @Value(value="${dbservice.employee.edit.url}")
    private String editEmpUrl;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbservice.getempId.url}")
    private String getEmpUrl;
    @Value(value="${dbservice.employeedetails.url}")
    private String getEmpDetailsUrl;
    @Value(value="${dbservice.employeeprofile.url}")
    private String profileUrl;
    @Value(value="${dbservice.updateparentId.url}")
    private String updateParentIdUrl;
    @Value(value="${dbservice.employee.create.bulk.url}")
    private String createBulkEmpUrl;
    @Value(value="${dbservice.employeepreference.url}")
    private String empPreferenceUrl;
    @Value(value="${dbservice.fetchpreference.url}")
    private String retrievePreferenceUrl;

    public EmployeeResponseDTO createEmployee(EmployeeDTO employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.createEmpUrl, (Object)employeeDTO, EmployeeResponseDTO.class);
    }

    public boolean createBulkEmployee(List<EmployeeDTO> employees) {
        return (Boolean)this.restTemplate.postForObject(this.createBulkEmpUrl, employees, Boolean.class);
    }

    public EmployeeResponseDTO updateEmployee(EmployeeDTO employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.editEmpUrl, (Object)employeeDTO, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO resetPassword(EmployeeDTO employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(String.join((CharSequence)"/", this.dbUrl, "resetPassword"), (Object)employeeDTO, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO updateParentEmpId(EmployeeDTO employeeDTO) {
        return (EmployeeResponseDTO)this.restTemplate.postForObject(this.updateParentIdUrl, (Object)employeeDTO, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO removeEmployee(String empID) {
        return (EmployeeResponseDTO)this.restTemplate.getForObject(this.dbUrl + empID + "/removeEmployee", EmployeeResponseDTO.class);
    }

    public List<EmployeeDTO> getReporteeList(long empID) {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.dbUrl + "reporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<EmployeeDTO> getAllReporteeList(long empID) {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.dbUrl + "allReporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<EmployeeDTO> getAllDeptReporteeList(long empID) {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.dbUrl + "allDeptReporteeList/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public EmployeeDTO getEmployeeList(String empId) throws RequestException {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (EmployeeDTO)this.restTemplate.getForObject(this.dbUrl + empId + "/employeeList", (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public EmployeeDTO getEmployeeId(EmployeeDTO employeeDTO) {
        return (EmployeeDTO)this.restTemplate.postForObject(this.getEmpUrl, (Object)employeeDTO, EmployeeDTO.class);
    }

    public EmployeeDTO getEmployeeDetails(String empId) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getEmpDetailsUrl).buildAndExpand(new Object[]{empId}).toUriString();
        return (EmployeeDTO)this.restTemplate.getForObject(url, EmployeeDTO.class);
    }

    public Employee getProfileDetails(String empId) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.profileUrl).buildAndExpand(new Object[]{empId}).toUriString();
        return (Employee)this.restTemplate.getForObject(url, Employee.class);
    }

    public Map<String, Object> checkEmail(String email, String empId) {
        String emaiCheckurl = this.dbUrl + "/checkEmail";
        String url = UriComponentsBuilder.fromHttpUrl((String)emaiCheckurl).queryParam("email", new Object[]{email}).queryParam("empId", new Object[]{empId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return map;
    }

    public EmployeePreferencesDTO createPreference(EmployeePreferencesDTO employeePreferencesDTO) {
        return (EmployeePreferencesDTO)this.restTemplate.postForObject(this.empPreferenceUrl, (Object)employeePreferencesDTO, EmployeePreferencesDTO.class);
    }

    public EmployeePreferencesDTO getPreferenceDetails(String pageName, Long pageId) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrievePreferenceUrl).queryParam("pageName", new Object[]{pageName}).queryParam("pageId", new Object[]{pageId}).toUriString();
        return (EmployeePreferencesDTO)this.restTemplate.getForObject(url, EmployeePreferencesDTO.class);
    }

    public OrganizationDetails getOrganizationDetails(String name) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrievePreferenceUrl).queryParam("name", new Object[]{name}).toUriString();
        return (OrganizationDetails)this.restTemplate.getForObject(url, OrganizationDetails.class);
    }

    public List<String> getDepartmentList() {
        String deptUrl = this.dbUrl + "/departmentList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<String> getOrgDepartmentList(String name) {
        String deptUrl = this.dbUrl + "/orgDepartmentList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).queryParam("name", new Object[]{name}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<EmployeeDTO> getOrgEmployeeList() {
        String orgEmpListUrl = this.dbUrl + "/organization/employeeList";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> getCurrencyList() {
        String currencyUrl = this.dbUrl + "/currencyList";
        String url = UriComponentsBuilder.fromHttpUrl((String)currencyUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Long getOrgUserCount(long orgId) {
        UriComponentsBuilder componentsBuilder = UriComponentsBuilder.fromHttpUrl((String)(this.dbUrl + "/getOrgUserCount"));
        return (Long)this.restTemplate.getForObject(componentsBuilder.queryParam("orgId", new Object[]{orgId}).toUriString(), Long.class);
    }

    public LicenseResponseDTO validateLicense() {
        String url = this.dbUrl + "/validateLicense";
        return (LicenseResponseDTO)this.restTemplate.getForObject(url, LicenseResponseDTO.class);
    }

    public List<EmployeeDTO> getOrgEmployeeListByOrgId(long orgId) {
        String orgEmpListUrl = this.dbUrl + "/org/employeeList";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("orgId", new Object[]{orgId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<EmployeeDepartmentMappingDTO> departmentByEmployeeList(String deptId) {
        String orgEmpListUrl = this.dbUrl + "/departmentByEmployeeList/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DepartmentResponseDetailsDTO departmentByEmployeeListChart(String empId) throws RequestException {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (DepartmentResponseDetailsDTO)this.restTemplate.getForObject(this.dbUrl + empId + "/departmentByEmployeeList", (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DepartmentResponseDetailsDTO departmentByEmployeeListChart(String empId, String year) throws RequestException {
        String orgEmpListUrl = this.dbUrl + empId + "/departmentByEmployeeList";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("year", new Object[]{year}).toUriString();
        return (DepartmentResponseDetailsDTO)this.restTemplate.getForObject(url, DepartmentResponseDetailsDTO.class);
    }

    public DepartmentChartDTO addDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        String orgEmpListUrl = this.dbUrl + "/addDepartmentMapping";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.postForObject(url, (Object)departmentChartDTO, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO updateDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        String orgEmpListUrl = this.dbUrl + "/addDepartmentMapping";
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.putForObject(url, (Object)departmentChartDTO, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO updateDepartmentParent(long deptId, long deptParentId, long updatedBy) {
        String orgEmpListUrl = this.dbUrl + "/updateDepartmentParentId/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).queryParam("deptParentId", new Object[]{deptParentId}).queryParam("updatedBy", new Object[]{updatedBy}).toUriString();
        return (DepartmentChartDTO)this.restTemplate.putForObject(url, DepartmentChartDTO.class);
    }

    public DepartmentChartDTO getDepartmentMapping(long deptId) {
        String orgEmpListUrl = this.dbUrl + "/getDepartmentMapping/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (DepartmentChartDTO)this.restTemplate.getForObject(url, DepartmentChartDTO.class);
    }

    public EmployeeResponseDTO deleteDepartmentChartDTO(long deptId) {
        String orgEmpListUrl = this.dbUrl + "/deleteDepartmentMapping/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)orgEmpListUrl).toUriString();
        return (EmployeeResponseDTO)this.restTemplate.getForObject(url, EmployeeResponseDTO.class);
    }

    public boolean createBulkDeptMapping(List<DeptImportDTO> deptImportDTOS) {
        String createBulkDeptUrl = this.dbUrl + "/createBulkDeptMapping";
        return (Boolean)this.restTemplate.postForObject(createBulkDeptUrl, deptImportDTOS, Boolean.class);
    }

    public Employee findProfileByName(FindDTO findDTO) {
        String url = this.dbUrl + "/findProfileByName";
        return (Employee)this.restTemplate.getForObject(url, (Object)findDTO, Employee.class);
    }

    public Map<String, Object> findByDeptName(FindDTO findDTO) {
        String url = this.dbUrl + "/checkDept";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(url, (Object)findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> getDepartmentChart(String email) {
        String url = this.dbUrl + "/checkDeptEmail";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("email", new Object[]{email}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> getDesignationList(String name, String datePeriod) {
        String deptUrl = this.dbUrl + "/designationList";
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).queryParam("name", new Object[]{name}).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> checkParentEmployee(String orgId) {
        String deptUrl = this.dbUrl + "/checkParentEmployee/" + orgId;
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DepartmentChartDTO> checkDepartmentChart(String orgId) {
        String deptUrl = this.dbUrl + "/checkDepartmentChart/" + orgId;
        String url = UriComponentsBuilder.fromHttpUrl((String)deptUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public EmployeeResponseDTO deleteEmployee(String empID) {
        return (EmployeeResponseDTO)this.restTemplate.getForObject(this.dbUrl + "/deleteEmployee/" + empID, EmployeeResponseDTO.class);
    }

    public EmployeeResponseDTO deleteOrgDept(String deptId) {
        return (EmployeeResponseDTO)this.restTemplate.getForObject(this.dbUrl + "/deleteOrgDept/" + deptId, EmployeeResponseDTO.class);
    }
}

