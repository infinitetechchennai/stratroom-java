/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.OrganizationDetails
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.dto.AuthenticateResponseDTO
 *  com.estrat.backend.db.dto.ChildTrackerDTO
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  com.estrat.backend.db.dto.DepartmentResponseDetailsDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.DeptImportDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.backend.db.dto.EmployeePreferencesDTO
 *  com.estrat.backend.db.dto.EmployeeResponseDTO
 *  com.estrat.backend.db.dto.FindDTO
 *  com.estrat.backend.db.dto.LicenseResponseDTO
 *  com.estrat.backend.db.exception.InputValidationException
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.DataServiceController
 *  com.estrat.backend.db.resource.util.CacheUtil
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.DeptTrackerService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.LicenseService
 *  com.estrat.backend.db.service.OrgTrackerService
 *  javax.persistence.OptimisticLockException
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.OrganizationDetails;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.dto.AuthenticateResponseDTO;
import com.estrat.backend.db.dto.ChildTrackerDTO;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DepartmentResponseDetailsDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.DeptImportDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO;
import com.estrat.backend.db.dto.EmployeePreferencesDTO;
import com.estrat.backend.db.dto.EmployeeResponseDTO;
import com.estrat.backend.db.dto.FindDTO;
import com.estrat.backend.db.dto.LicenseResponseDTO;
import com.estrat.backend.db.dto.LicenseModuleDTO;
import com.estrat.backend.db.dto.ModuleDTO;
import com.estrat.backend.db.dto.OrgLicenseResponseDTO;
import com.estrat.backend.db.exception.InputValidationException;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.CacheUtil;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.DeptTrackerService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.DbLicenseService;
import com.estrat.backend.db.service.OrgTrackerService;
import com.estrat.backend.db.service.RoleService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import jakarta.persistence.OptimisticLockException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class DataServiceController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DbLicenseService licenseService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private OrgTrackerService orgTrackerService;
    @Autowired
    private DeptTrackerService deptTrackerService;
    @Autowired
    private CacheUtil cacheUtil;
    private Logger log = LoggerFactory.getLogger(DataServiceController.class);

    @ResponseBody
    @RequestMapping(value={"/employeeDetails/{empId}"}, method={RequestMethod.GET})
    public Employee getEmployeeDetails(@PathVariable(value="empId") String empId) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
        return this.employeeService.getEmployee(employeeDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/employeeDetailsList"}, method={RequestMethod.GET})
    public List<Employee> getEmployeeDetails(@RequestParam(value="emplist[]") List<Long> empList) {
        return this.employeeService.getEmployee(empList);
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/removeEmployee"}, method={RequestMethod.GET})
    public EmployeeResponseDTO removeEmployee(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        EmployeeResponseDTO responseDTO = this.employeeService.removeEmployee(empId);
        if (responseDTO.isUpdateFlag()) {
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            this.log.debug("logged in employeeID " + loggedInEmpId);
            this.cacheUtil.removeEmployeeCache(loggedInEmpId);
        }
        return responseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/employeeList"}, method={RequestMethod.GET})
    public Employee getEmployeeList(@PathVariable(value="empId") long empId, HttpServletRequest request) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        return this.employeeService.getEmployeeList(employeeDTO);
    }

    // Historical org chart: the hierarchy as it stood on :asOf (YYYY-MM-DD). When asOf is
    // blank or unparseable it falls back to the current live tree.
    @ResponseBody
    @RequestMapping(value={"/{empId}/employeeListAsOf"}, method={RequestMethod.GET})
    public Employee getEmployeeListAsOf(@PathVariable(value="empId") long empId, @RequestParam(value="asOf", required=false) String asOf, HttpServletRequest request) {
        java.time.LocalDate asOfDate = null;
        if (asOf != null && !asOf.isEmpty()) {
            try {
                asOfDate = java.time.LocalDate.parse(asOf);
            } catch (Exception ignored) {
            }
        }
        if (asOfDate == null) {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeId(empId);
            return this.employeeService.getEmployeeList(employeeDTO);
        }
        return this.employeeService.getHistoricalOrgChart(empId, asOfDate);
    }

    @ResponseBody
    @RequestMapping(value={"/reporteeList/{empId}"}, method={RequestMethod.GET})
    public List<Employee> reporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/immediatereporteeList/{empId}"}, method={RequestMethod.GET})
    public List<Employee> immediatereporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getimmediateReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/allReporteeList/{empId}"}, method={RequestMethod.GET})
    public List<Employee> allReporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getAllReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/validateUser"}, method={RequestMethod.POST})
    public AuthenticateResponseDTO authenticateUser(@RequestBody EmployeeDTO employeeDTO) {
        return this.employeeService.authenticateUser(employeeDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/updateParentEmpId"}, method={RequestMethod.POST})
    public EmployeeResponseDTO updateParentEmpId(@RequestBody Employee employeeDTO) {
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        employeeResponseDTO.setUpdateFlag(this.employeeService.updateParentEmpID(employeeDTO));
        return employeeResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/createEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO createEmployee(@RequestBody Employee employee, HttpServletRequest request) throws InputValidationException {
        EmployeeResponseDTO responseDTO = this.employeeService.createEmployee(employee, "create");
        if (responseDTO == null) {
            throw new InputValidationException("Employee could not be created. Please check the details and try again.");
        }
        if (responseDTO.getEmployeeId() != 0L) {
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            this.log.debug("logged in employeeID " + loggedInEmpId);
            this.cacheUtil.removeEmployeeCache(loggedInEmpId);
        }
        return responseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/creatBulkEmployee"}, method={RequestMethod.POST})
    public boolean creatBulkeEmployee(@RequestBody List<Employee> employees, HttpServletRequest request) throws InputValidationException {
        HashMap<String, Employee> parentMap = new HashMap<String, Employee>();
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        int created = 0, updated = 0, skipped = 0, failed = 0;
        this.log.info("[User Import] received " + employees.size() + " employees, loggedInEmpId=" + loggedInEmpId);
        for (Employee employee : employees) {
            String email = employee.getEmailAddress();
            if (StringUtils.isEmpty((CharSequence)email)) {
                skipped++;
                this.log.warn("[User Import] skipping row without email");
                continue;
            }
            try {
                Employee existing = this.employeeService.resolveEmployeeForImport(email);
                if (existing == null && StringUtils.isNotEmpty((CharSequence)employee.getNewEmailAddress())) {
                    existing = this.employeeService.resolveEmployeeForImport(employee.getNewEmailAddress());
                }
                if (existing != null) {
                    this.enqueueBulkImportEmployee(parentMap, employee, existing);
                    updated++;
                    continue;
                }
                EmployeeResponseDTO employeeResponseDTO = this.employeeService.createEmployee(employee, "import");
                employee.setEmpId(employeeResponseDTO.getEmployeeId());
                employee.setParentEmail(employee.getParentEmployeeName());
                parentMap.put(String.valueOf(employeeResponseDTO.getEmployeeId()), employee);
                created++;
            } catch (InputValidationException ex) {
                if (ex.getMessage() != null && ex.getMessage().toLowerCase().contains("already exist")) {
                    Employee existing = this.employeeService.resolveEmployeeForImport(email);
                    if (existing != null) {
                        this.enqueueBulkImportEmployee(parentMap, employee, existing);
                        updated++;
                        continue;
                    }
                }
                failed++;
                this.log.error("[User Import] failed email=" + email + ": " + ex.getMessage());
            } catch (Exception ex) {
                failed++;
                this.log.error("[User Import] failed email=" + email + ": " + ex.getMessage());
            }
        }
        if (parentMap != null && !parentMap.isEmpty()) {
            for (String key : parentMap.keySet()) {
                try {
                    Employee updateEmployee = (Employee)parentMap.get(key);
                    if (Objects.nonNull(updateEmployee.getOrgDetails()) && updateEmployee.getOrgDetails().getName() != null) {
                        OrganizationDetails orgDetails = this.employeeService.getOrgDetails(updateEmployee.getOrgDetails().getName());
                        if (Objects.nonNull(orgDetails)) {
                            updateEmployee.setOrgDetails(orgDetails);
                        }
                    }
                    if (StringUtils.isNotEmpty((CharSequence)updateEmployee.getParentEmail())) {
                        String parentRef = updateEmployee.getParentEmail().trim();
                        Employee parentEmployee;
                        if (parentRef.contains("@")) {
                            parentEmployee = this.employeeService.resolveEmployeeForImport(parentRef);
                            if (parentEmployee == null) {
                                parentEmployee = this.employeeService.getEmployeeIDByEmail(parentRef);
                            }
                        } else {
                            long orgId = Objects.nonNull(updateEmployee.getOrgDetails()) ? updateEmployee.getOrgDetails().getOrgId() : 0L;
                            String[] parts = parentRef.split("\\s+", 2);
                            if (parts.length == 2) {
                                parentEmployee = this.employeeService.getEmployeeIDByFullName(parts[0], parts[1], orgId);
                                if (parentEmployee == null) {
                                    parentEmployee = this.employeeService.getEmployeeId(parts[0], orgId);
                                }
                            } else {
                                parentEmployee = this.employeeService.getEmployeeId(parts[0], orgId);
                            }
                        }
                        long resolvedParentId = parentEmployee != null ? parentEmployee.getEmpId() : 0L;
                        if (resolvedParentId == 0L) {
                            resolvedParentId = this.employeeService.superUserId();
                            this.log.warn("[Import] parent '" + parentRef + "' for " + updateEmployee.getEmailAddress() + " not found -> falling back to superUser empId=" + resolvedParentId);
                        } else {
                            this.log.info("[Import] parent lookup for " + updateEmployee.getEmailAddress() + " -> parentRef='" + parentRef + "' resolved to empId=" + resolvedParentId);
                        }
                        updateEmployee.setParentEmpId(resolvedParentId);
                    } else {
                        long rootParent = this.employeeService.superUserId();
                        this.log.info("[Import] no parent for " + updateEmployee.getEmailAddress() + " -> assigned to superUser empId=" + rootParent);
                        updateEmployee.setParentEmpId(rootParent);
                    }
                    if (StringUtils.isNotEmpty((CharSequence)updateEmployee.getNewEmailAddress())) {
                        updateEmployee.setEmailAddress(updateEmployee.getNewEmailAddress());
                    }
                    this.employeeService.updateEmployee(updateEmployee, "import");
                } catch (Exception ex) {
                    failed++;
                    this.log.error("[User Import] update pass failed for empId=" + key + ": " + ex.getMessage());
                }
            }
        }
        this.log.info("[User Import] done — created=" + created + " updated=" + updated + " skipped=" + skipped + " failed=" + failed);
        this.log.debug("logged in employeeID " + loggedInEmpId);
        this.cacheUtil.removeEmployeeCache(loggedInEmpId);
        if (created == 0 && updated == 0 && failed > 0) {
            throw new InputValidationException("Import failed: " + failed + " user row(s) could not be imported. If you re-import the same file, clear duplicate users first or contact support.");
        }
        return true;
    }

    private void enqueueBulkImportEmployee(HashMap<String, Employee> parentMap, Employee incoming, Employee existing) {
        incoming.setEmpId(existing.getEmpId());
        if (existing.getOrgDetails() != null) {
            incoming.setOrgDetails(existing.getOrgDetails());
        }
        incoming.setParentEmail(incoming.getParentEmployeeName());
        parentMap.put(String.valueOf(existing.getEmpId()), incoming);
    }

    @ResponseBody
    @RequestMapping(value={"/updateEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO updateEmployee(@RequestBody Employee employee, HttpServletRequest request) {
        EmployeeResponseDTO responseDTO = this.employeeService.updateEmployee(employee, "update");
        if (responseDTO.isUpdateFlag()) {
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            this.log.debug("logged in employeeID " + loggedInEmpId);
        }
        return responseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/resetPassword"}, method={RequestMethod.POST})
    public EmployeeResponseDTO resetPassword(@RequestBody Employee employee) {
        return this.employeeService.resetPassword(employee);
    }

    @ResponseBody
    @RequestMapping(value={"/getEmployeeId"}, method={RequestMethod.POST})
    public Employee getEmployeeId(@RequestBody Employee employee) {
        if (StringUtils.isNotEmpty((CharSequence)employee.getEmailAddress())) {
            return this.employeeService.getEmployeeIDByEmail(employee.getEmailAddress());
        }
        return this.employeeService.getEmployeeId(employee.getFirstName(), Objects.nonNull(employee.getOrgDetails()) ? employee.getOrgDetails().getOrgId() : 0L);
    }

    @ResponseBody
    @RequestMapping(value={"/getProfileDetails/{empId}"}, method={RequestMethod.GET})
    public Employee getProfileDetails(@PathVariable(value="empId") String empId) {
        return this.employeeService.getProfileDetails(Long.valueOf(empId).longValue());
    }

    @ResponseBody
    @RequestMapping(value={"/checkEmail"}, method={RequestMethod.GET})
    public Map<String, Object> checkEmail(@RequestParam(value="email") String email, @RequestParam(value="empId", required=false) Long empId, HttpServletRequest request) {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        if (empId != null) {
            EmployeeProfilePo employee1 = this.employeeService.getEmployeeProfileByEmail(email, empId.longValue());
            if (employee1 != null) {
                mapvalue.put("failure", "already exist this email");
            } else {
                mapvalue.put("success", "noMore email");
            }
        } else {
            EmployeeProfilePo employee = this.employeeService.getEmployeeProfileByEmail1(email);
            if (employee != null) {
                mapvalue.put("failure", "already exist this email");
            } else {
                mapvalue.put("success", "noMore email");
            }
        }
        return mapvalue;
    }

    @ResponseBody
    @RequestMapping(value={"/employeePreference"}, method={RequestMethod.POST})
    public EmployeePreferencesDTO employeePreference(@RequestBody EmployeePreferencesDTO preferencesDTO, HttpServletRequest request) throws InputValidationException, OptimisticLockException {
        return this.employeeService.mergeEmployeePreference(preferencesDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/getPreferences"}, method={RequestMethod.GET})
    public EmployeePreferencesDTO getPreferences(@RequestParam(value="pageName") String pageName, @RequestParam(value="pageId") Long pageId) {
        return this.employeeService.getPreferences(pageName, pageId);
    }

    @ResponseBody
    @RequestMapping(value={"/departmentList"}, method={RequestMethod.GET})
    public List<String> departmentList() {
        return this.employeeService.getDepartmentList();
    }

    @ResponseBody
    @RequestMapping(value={"/organization/employeeList"}, method={RequestMethod.GET})
    public List<Employee> getOrgEmployeeList() {
        return this.employeeService.getOrgEmployeeList();
    }

    @ResponseBody
    @RequestMapping(value={"/organization/employeeList/{empId}"}, method={RequestMethod.GET})
    public List<Long> getOrgEmployeeListOf(@PathVariable(value="empId") String empId) {
        return this.employeeService.getCompleteReporteeList(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/getOrgUserCount"}, method={RequestMethod.GET})
    public Long getOrgUserCount(@RequestParam(value="orgId") long orgId) {
        return this.employeeService.getOrgUserCount(orgId);
    }

    @GetMapping(value={"/validateLicense"})
    public ResponseEntity<LicenseResponseDTO> validateLicense() throws RequestException {
        return new ResponseEntity<>(this.licenseService.validateLicense(), HttpStatus.OK);
    }

    @GetMapping(value={"/licenseDetails"})
    public ResponseEntity<OrgLicenseResponseDTO> licenseDetails() {
        OrgLicenseResponseDTO response = new OrgLicenseResponseDTO();
        List<ModuleDTO> allModules = this.roleService.getModuleList();
        try {
            LicenseResponseDTO license = this.licenseService.validateLicense();
            response.setValidationSuccess(license.isValidationSuccess());
            response.setValidationMesssage(license.getValidationMesssage());
            response.setExpiryDate(license.getExpiryDate());
            response.setTotalAllowedUsers(license.getTotalAllowedUsers());
            response.setOrganization(license.getOrganization());
            response.setDeviceList(license.getDeviceList());
            List<String> licensed = license.getModuleList() != null ? license.getModuleList() : Collections.emptyList();
            response.setModuleList(this.buildLicensedModuleList(allModules, licensed));
        } catch (Exception e) {
            this.log.error("licenseDetails failed", e);
            response.setValidationSuccess(false);
            response.setValidationMesssage("Could not read license: " + e.getMessage());
            response.setModuleList(this.buildLicensedModuleList(allModules, Collections.emptyList()));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private List<LicenseModuleDTO> buildLicensedModuleList(List<ModuleDTO> allModules, List<String> licensedNames) {
        Set<String> seen = new LinkedHashSet<>();
        List<LicenseModuleDTO> modules = new ArrayList<>();
        for (ModuleDTO module : allModules) {
            String name = module.getModuleName();
            if (name == null || !seen.add(name)) {
                continue;
            }
            LicenseModuleDTO dto = new LicenseModuleDTO();
            dto.setModuleId(module.getModuleId());
            dto.setModuleName(name);
            dto.setTagName(module.getTagName());
            dto.setEnabled(licensedNames.contains(name));
            modules.add(dto);
        }
        return modules;
    }

    @ResponseBody
    @RequestMapping(value={"/organizationList"}, method={RequestMethod.GET})
    public List<OrganizationDetails> organizationList() {
        return this.employeeService.getOrgList();
    }

    @ResponseBody
    @RequestMapping(value={"/org/employeeList"}, method={RequestMethod.GET})
    public List<Employee> getEmployeeList(@RequestParam(value="orgId") long orgId) {
        return this.employeeService.getEmployeeListbyOrgId(orgId);
    }

    @ResponseBody
    @RequestMapping(value={"/orgDepartmentList"}, method={RequestMethod.GET})
    public List<String> orgDepartmentList(@RequestParam(value="name") String name) {
        return this.employeeService.getOrgDepartmentList(name);
    }

    @ResponseBody
    @RequestMapping(value={"/departmentByEmployeeList/{deptId}"}, method={RequestMethod.GET})
    public List<EmployeeDepartmentMappingDTO> departmentByEmployeeList(@PathVariable(value="deptId") String deptId) {
        return this.employeeService.departmentByEmployeeList(Long.valueOf(deptId));
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/departmentByEmployeeList"}, method={RequestMethod.GET})
    public DepartmentResponseDetailsDTO departmentByEmployeeList(@PathVariable(value="empId") long empId, @RequestParam(value="year", required=false) String year, HttpServletRequest request) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        Integer yearval = 0;
        if (Objects.nonNull(year) && !year.isEmpty() && year.matches("\\d+")) {
            yearval = Integer.parseInt(year);
        }
        return this.employeeService.departmentByEmployeeList(employeeDTO, yearval);
    }

    @ResponseBody
    @RequestMapping(value={"/years"}, method={RequestMethod.GET})
    public ResponseEntity<List<Integer>> getYearsForDropdown() {
        List<Integer> years = this.employeeService.getYearsForDropdown();
        return ResponseEntity.ok(years);
    }

    @ResponseBody
    @RequestMapping(value={"/addDepartmentMapping"}, method={RequestMethod.POST})
    public DepartmentChartDTO addDepartmentMapping(@RequestBody DepartmentChartDTO departmentChartDTO, HttpServletRequest request) throws InputValidationException {
        return this.employeeService.addDepartmentChartDTO(departmentChartDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/getDeptIdwithEmpId/{empId}"}, method={RequestMethod.GET})
    public Long getDepartmentwithEmpId(@PathVariable(value="empId") String empId, HttpServletRequest request) throws InputValidationException {
        return this.employeeService.getUserDeptMappingwithempid(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/getDepartmentMapping/{deptId}"}, method={RequestMethod.GET})
    public DepartmentChartDTO getDepartmentMapping(@PathVariable(value="deptId") long deptId, HttpServletRequest request) {
        return this.employeeService.getDepartmentMapping(Long.valueOf(deptId));
    }

    @ResponseBody
    @RequestMapping(value={"/addDepartmentMapping"}, method={RequestMethod.PUT})
    public DepartmentChartDTO updateDepartmentMapping(@RequestBody DepartmentChartDTO departmentChartDTO, HttpServletRequest request) {
        return this.employeeService.updateDepartmentChartDTO(departmentChartDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteDepartmentMapping/{deptId}"}, method={RequestMethod.GET})
    public EmployeeResponseDTO updateDepartmentMapping(@PathVariable(value="deptId") long deptId, HttpServletRequest request) {
        return this.employeeService.deleteDepartmentChartDTO(Long.valueOf(deptId));
    }

    @ResponseBody
    @RequestMapping(value={"/createBulkDeptMapping"}, method={RequestMethod.POST})
    public boolean createBulkDeptMapping(@RequestBody List<DeptImportDTO> deptImportDTOList, HttpServletRequest request) throws InputValidationException {
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        int imported = 0, skipped = 0;
        this.log.info("[Org Import] received {} departments, loggedInEmpId={}", deptImportDTOList.size(), loggedInEmpId);
        for (DeptImportDTO deptImportDTO : deptImportDTOList) {
            if (deptImportDTO.getOrgName() == null || deptImportDTO.getOrgName().isEmpty() || deptImportDTO.getDeptID() == null || deptImportDTO.getDeptID().isEmpty()) {
                this.log.warn("[Org Import] skipping row — missing orgName or deptID: {}", deptImportDTO.getDeptName());
                skipped++; continue;
            }
            this.log.info("[Org Import] processing deptID={} deptName={} parentDeptID={} ownerName={} emailAddress={}",
                    deptImportDTO.getDeptID(), deptImportDTO.getDeptName(), deptImportDTO.getParentDeptID(),
                    deptImportDTO.getOwnerName(), deptImportDTO.getEmailAddress());
            try {
                if (this.employeeService.createBulkDeptMapping(deptImportDTO, loggedInEmpId)) imported++; else skipped++;
            } catch (Exception ex) {
                skipped++;
                this.log.error("[Org Import] failed deptID={} deptName={}: {}", deptImportDTO.getDeptID(), deptImportDTO.getDeptName(), ex.getMessage());
            }
        }
        this.log.info("[Org Import] done — imported={} skipped={}", imported, skipped);
        if (loggedInEmpId != null && !"null".equals(loggedInEmpId)) {
            this.cacheUtil.removeEmployeeCache(loggedInEmpId);
        }
        if (imported == 0 && skipped > 0) {
            throw new InputValidationException("Import failed: 0 of " + skipped + " departments could be imported. Check that the Organization name in the Excel matches the system ('" + (deptImportDTOList.isEmpty() ? "" : deptImportDTOList.get(0).getOrgName()) + "').");
        }
        return true;
    }

    @ResponseBody
    @RequestMapping(value={"/findProfileByName"}, method={RequestMethod.GET})
    public Employee findProfileByName(@RequestBody FindDTO findDTO, HttpServletRequest request) throws InputValidationException {
        return this.employeeService.findProfileByName(findDTO.getName(), findDTO.getOrgId());
    }

    @ResponseBody
    @RequestMapping(value={"/checkDept"}, method={RequestMethod.GET})
    public Map<String, Object> checkDept(@RequestBody FindDTO findDTO, HttpServletRequest request) {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        if (findDTO.getOrgId() != null) {
            DeptDetails deptDetails = this.departmentDetailsService.findByDeptName(findDTO.getOrgId().longValue(), findDTO.getName());
            if (deptDetails != null && deptDetails.getName() != null) {
                mapvalue.put("failure", "already exist this department name");
            } else {
                mapvalue.put("success", "noMore department name");
            }
        }
        return mapvalue;
    }

    @ResponseBody
    @RequestMapping(value={"/checkDeptEmail"}, method={RequestMethod.GET})
    public Map<String, Object> checkDeptEmail(@RequestParam(value="email") String email, HttpServletRequest request) {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        DepartmentChartMapping employee1 = this.employeeService.getDepartmentChart(email);
        if (employee1 != null) {
            mapvalue.put("failure", "already exist this email");
        } else {
            mapvalue.put("success", "noMore email");
        }
        return mapvalue;
    }

    @ResponseBody
    @RequestMapping(value={"/createUser"}, method={RequestMethod.GET})
    public Map<String, Object> createUser(@RequestParam(value="email") String email, HttpServletRequest request) {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        DepartmentChartMapping employee1 = this.employeeService.getDepartmentChart(email);
        if (employee1 != null) {
            mapvalue.put("failure", "already exist this email");
        } else {
            mapvalue.put("success", "noMore email");
        }
        return mapvalue;
    }

    @ResponseBody
    @RequestMapping(value={"/designationList"}, method={RequestMethod.GET})
    public List<Employee> getDesignationList(@RequestParam(value="name", required=false) String name, @RequestParam(value="datePeriod", required=false) String datePeriod) {
        String date = datePeriod.replace("%20", "");
        return this.employeeService.getDesignationList(name, date);
    }

    @ResponseBody
    @RequestMapping(value={"/childtrackerlist"}, method={RequestMethod.GET})
    public List<ChildTrackerDTO> getchildtrackerList(@RequestParam(value="orgid", required=false) Long orgid, @RequestParam(value="orgtype", required=false) Long type, @RequestParam(value="upgrade", required=false) Long upgrade) {
        return this.deptTrackerService.getChildTrackers(orgid, type, upgrade);
    }

    @ResponseBody
    @RequestMapping(value={"/updateDepartmentParentId/{deptId}"}, method={RequestMethod.PUT})
    public DepartmentChartDTO updateDepartmentParent(@PathVariable(value="deptId") Long deptId, @RequestParam(value="deptParentId") Long deptParentId, @RequestParam(value="updatedBy") Long updatedBy, HttpServletRequest request) {
        return this.employeeService.updateDepartmentParent(deptId, deptParentId, updatedBy);
    }

    @ResponseBody
    @RequestMapping(value={"/checkParentEmployee/{orgId}"}, method={RequestMethod.GET})
    public List<Employee> getEmployeeList(@PathVariable(value="orgId", required=false) String orgId) {
        return this.employeeService.getEmployeeList(Long.valueOf(orgId));
    }

    @ResponseBody
    @RequestMapping(value={"/checkDepartmentChart/{orgId}"}, method={RequestMethod.GET})
    public List<DepartmentChartDTO> getDepartmentList(@PathVariable(value="orgId", required=false) String orgId) {
        return this.employeeService.getDepartmentList(Long.valueOf(orgId));
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

    @ResponseBody
    @RequestMapping(value={"/allDeptReporteeList/{empId}"}, method={RequestMethod.GET})
    public List<Employee> allDeptReporteeList(@PathVariable(value="empId") long empId) {
        return this.employeeService.getAllDeptReporteeList(empId);
    }
}

