/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.DepartmentChartDTO
 *  com.estrat.service.user.dto.DepartmentResponseDetailsDTO
 *  com.estrat.service.user.dto.DeptImportDTO
 *  com.estrat.service.user.dto.Employee
 *  com.estrat.service.user.dto.EmployeeDTO
 *  com.estrat.service.user.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.service.user.dto.EmployeePreferencesDTO
 *  com.estrat.service.user.dto.EmployeeResponseDTO
 *  com.estrat.service.user.dto.FindDTO
 *  com.estrat.service.user.dto.LicenseResponseDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.UserController
 *  com.estrat.service.user.service.EmployeeService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.DepartmentChartDTO;
import com.estrat.service.user.dto.DepartmentResponseDetailsDTO;
import com.estrat.service.user.dto.DeptImportDTO;
import com.estrat.service.user.dto.Employee;
import com.estrat.service.user.dto.EmployeeDTO;
import com.estrat.service.user.dto.EmployeeDepartmentMappingDTO;
import com.estrat.service.user.dto.EmployeePreferencesDTO;
import com.estrat.service.user.dto.EmployeeResponseDTO;
import com.estrat.service.user.dto.FindDTO;
import com.estrat.service.user.dto.LicenseResponseDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.service.EmployeeService;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private EmployeeService employeeService;

    @ResponseBody
    @RequestMapping(value={"/createEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO createEmployee(@RequestBody EmployeeDTO employee, HttpServletRequest request) {
        return this.employeeService.createEmployee(employee);
    }

    @ResponseBody
    @RequestMapping(value={"/creatBulkEmployee"}, method={RequestMethod.POST})
    public boolean creatBulkeEmployee(@RequestBody List<EmployeeDTO> employees) {
        return this.employeeService.createBulkEmployee(employees);
    }

    @ResponseBody
    @RequestMapping(value={"/updateEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO updateEmployee(@RequestBody EmployeeDTO employee, HttpServletRequest request) {
        return this.employeeService.updateEmployee(employee);
    }

    @ResponseBody
    @RequestMapping(value={"/resetPassword"}, method={RequestMethod.POST})
    public EmployeeResponseDTO resetPassword(@RequestBody EmployeeDTO employee) {
        return this.employeeService.resetPassword(employee);
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/removeEmployee"}, method={RequestMethod.GET})
    public EmployeeResponseDTO removeEmployee(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        return this.employeeService.removeEmployee(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/updateParentEmpId"}, method={RequestMethod.POST})
    public EmployeeResponseDTO updateParentEmpId(@RequestBody EmployeeDTO employeeDTO) {
        return this.employeeService.updateParentEmpId(employeeDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/reporteeList/{empId}"}, method={RequestMethod.GET})
    public List<EmployeeDTO> reporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getAllReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/allReporteeList/{empId}"}, method={RequestMethod.GET})
    public List<EmployeeDTO> allReporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getAllReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/allDeptReporteeList/{empId}"}, method={RequestMethod.GET})
    public List<EmployeeDTO> allDeptReporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getAllDeptReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/employeeList"}, method={RequestMethod.GET})
    public EmployeeDTO getEmployeeList(@PathVariable(value="empId") String empId, HttpServletRequest request) throws RequestException {
        return this.employeeService.getEmployeeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/getEmployeeId"}, method={RequestMethod.POST})
    public EmployeeDTO getEmployeeId(@RequestBody EmployeeDTO employee) {
        return this.employeeService.getEmployeeId(employee);
    }

    @ResponseBody
    @RequestMapping(value={"/employeeDetails/{empId}"}, method={RequestMethod.GET})
    public EmployeeDTO getEmployeeDetails(@PathVariable(value="empId") String empId) {
        return this.employeeService.getEmployeeDetails(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/getProfileDetails/{empId}"}, method={RequestMethod.GET})
    public Employee getProfileDetails(@PathVariable(value="empId") String empId) {
        return this.employeeService.getProfileDetails(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/checkEmail"}, method={RequestMethod.GET})
    public Map<String, Object> checkEmail(@RequestParam(value="email") String email, @RequestParam(value="empId", required=false) String empId, HttpServletRequest request) {
        return this.employeeService.checkEmail(email, empId);
    }

    @ResponseBody
    @RequestMapping(value={"/employeePreference"}, method={RequestMethod.POST})
    public EmployeePreferencesDTO employeePreference(@RequestBody EmployeePreferencesDTO preferencesDTO) {
        return this.employeeService.createPreference(preferencesDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/getPreferences"}, method={RequestMethod.GET})
    public EmployeePreferencesDTO getPreferences(@RequestParam(value="pageName") String pageName, @RequestParam(value="pageId") Long pageId) {
        return this.employeeService.getPreferenceDetails(pageName, pageId);
    }

    @ResponseBody
    @RequestMapping(value={"/organization/employeeList"}, method={RequestMethod.GET})
    public List<EmployeeDTO> getOrgEmployeeList() {
        return this.employeeService.getOrgEmployeeList();
    }

    @ResponseBody
    @RequestMapping(value={"/departmentList"}, method={RequestMethod.GET})
    public List<String> getDepartmentList() {
        return this.employeeService.getDepartmentList();
    }

    @ResponseBody
    @RequestMapping(value={"/getOrgUserCount"}, method={RequestMethod.GET})
    public Long getOrgUserCount(@RequestParam(value="orgId") long orgId) {
        return this.employeeService.getOrgUserCount(orgId);
    }

    @GetMapping(value={"/currencyList"})
    public ResponseEntity<List<Map<String, Object>>> currencyList() throws RequestException {
        return new ResponseEntity((Object)this.employeeService.getCurrencyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/validateLicense"})
    public ResponseEntity<LicenseResponseDTO> validateLicense() throws RequestException {
        return new ResponseEntity((Object)this.employeeService.validateLicense(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value={"/org/employeeList"}, method={RequestMethod.GET})
    public List<EmployeeDTO> getOrgEmployeeList(@RequestParam(value="orgId") long orgId) {
        return this.employeeService.getOrgEmployeeListByOrgId(orgId);
    }

    @ResponseBody
    @RequestMapping(value={"/orgDepartmentList"}, method={RequestMethod.GET})
    public List<String> orgDepartmentList(@RequestParam(value="name") String name) {
        return this.employeeService.getOrgDepartmentList(name);
    }

    @ResponseBody
    @RequestMapping(value={"/departmentByEmployeeList/{deptId}"}, method={RequestMethod.GET})
    public List<EmployeeDepartmentMappingDTO> departmentByEmployeeList(@PathVariable(value="deptId") String deptId) {
        return this.employeeService.departmentByEmployeeList(deptId);
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/departmentByEmployeeList"}, method={RequestMethod.GET})
    public DepartmentResponseDetailsDTO departmentByEmployeeList(@PathVariable(value="empId") String empId, @RequestParam(value="year", required=false) String year, HttpServletRequest request) throws RequestException {
        return this.employeeService.departmentByEmployeeListChart(empId, year);
    }

    @ResponseBody
    @RequestMapping(value={"/addDepartmentMapping"}, method={RequestMethod.POST})
    public DepartmentChartDTO addDepartmentMapping(@RequestBody DepartmentChartDTO departmentChartDTO, HttpServletRequest request) {
        return this.employeeService.addDepartmentChartDTO(departmentChartDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/getDepartmentMapping/{deptId}"}, method={RequestMethod.GET})
    public DepartmentChartDTO getDepartmentMapping(@PathVariable(value="deptId") long deptId, HttpServletRequest request) {
        return this.employeeService.getDepartmentMapping(deptId);
    }

    @ResponseBody
    @RequestMapping(value={"/addDepartmentMapping"}, method={RequestMethod.PUT})
    public DepartmentChartDTO updateDepartmentMapping(@RequestBody DepartmentChartDTO departmentChartDTO, HttpServletRequest request) {
        return this.employeeService.updateDepartmentChartDTO(departmentChartDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteDepartmentMapping/{deptId}"}, method={RequestMethod.GET})
    public EmployeeResponseDTO updateDepartmentMapping(@PathVariable(value="deptId") long deptId, HttpServletRequest request) {
        return this.employeeService.deleteDepartmentChartDTO(deptId);
    }

    @ResponseBody
    @RequestMapping(value={"/createBulkDeptMapping"}, method={RequestMethod.POST})
    public boolean createBulkDeptMapping(@RequestBody List<DeptImportDTO> deptImportDTOS) {
        return this.employeeService.createBulkDeptMapping(deptImportDTOS);
    }

    @ResponseBody
    @RequestMapping(value={"/findProfileByName"}, method={RequestMethod.GET})
    public Employee findProfileByName(@RequestBody FindDTO findDTO, HttpServletRequest request) {
        return this.employeeService.findProfileByName(findDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/checkDept"}, method={RequestMethod.GET})
    public Map<String, Object> checkDept(@RequestBody FindDTO findDTO, HttpServletRequest request) {
        return this.employeeService.findByDeptName(findDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/checkDeptEmail"}, method={RequestMethod.GET})
    public Map<String, Object> checkDeptEmail(@RequestParam(value="email") String email, HttpServletRequest request) {
        return this.employeeService.getDepartmentChart(email);
    }

    @ResponseBody
    @RequestMapping(value={"/designationList"}, method={RequestMethod.GET})
    public List<Employee> getDesignationList(@RequestParam(value="name", required=false) String name, @RequestParam(value="datePeriod", required=false) String datePeriod) {
        String date = datePeriod.replace("%20", "");
        return this.employeeService.getDesignationList(name, date);
    }

    @ResponseBody
    @RequestMapping(value={"/updateDepartmentParentId/{deptId}"}, method={RequestMethod.PUT})
    public DepartmentChartDTO updateDepartmentParent(@PathVariable(value="deptId") Long deptId, @RequestParam(value="deptParentId") Long deptParentId, @RequestParam(value="updatedBy") Long updatedBy, HttpServletRequest request) {
        return this.employeeService.updateDepartmentParent(deptId.longValue(), deptParentId.longValue(), updatedBy.longValue());
    }

    @ResponseBody
    @RequestMapping(value={"/checkParentEmployee/{orgId}"}, method={RequestMethod.GET})
    public List<Employee> checkParentEmployee(@PathVariable(value="orgId", required=false) String orgId) {
        return this.employeeService.checkParentEmployee(orgId);
    }

    @ResponseBody
    @RequestMapping(value={"/checkDepartmentChart/{orgId}"}, method={RequestMethod.GET})
    public List<DepartmentChartDTO> checkDepartmentChart(@PathVariable(value="orgId", required=false) String orgId) {
        return this.employeeService.checkDepartmentChart(orgId);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteEmployee/{empId}"}, method={RequestMethod.GET})
    public EmployeeResponseDTO deleteEmployee(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        return this.employeeService.deleteEmployee(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteOrgDept/{deptId}"}, method={RequestMethod.GET})
    public EmployeeResponseDTO deleteOrgDept(@PathVariable(value="deptId") String deptId, HttpServletRequest request) {
        return this.employeeService.deleteOrgDept(deptId);
    }
}

