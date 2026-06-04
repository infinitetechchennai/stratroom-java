/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MemberController
 *  com.estrat.web.dto.DashBoardDepartmentResponseDTO
 *  com.estrat.web.dto.DepartmentChartDTO
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.web.dto.EmployeePreferencesDTO
 *  com.estrat.web.dto.EmployeeResponseDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.HomePreferencesDTO
 *  com.estrat.web.dto.LoginDTO
 *  com.estrat.web.dto.LoginResponseDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.TokenResponseDTO
 *  com.estrat.web.exception.AuthorizationException
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.formbeans.ProfileFormBean
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.DashBoardPreferencesService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.util.KPIReaderUtil
 *  com.estrat.web.util.OrgChartReaderUtil
 *  com.estrat.web.util.PasswordEncoder
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.TempUserLocal
 *  com.estrat.web.util.TempUserPrincipal
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Controller
 *  org.springframework.ui.Model
 *  org.springframework.web.bind.annotation.CrossOrigin
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.ModelAttribute
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.DashBoardDepartmentResponseDTO;
import com.estrat.web.dto.DepartmentChartDTO;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.EmployeeDepartmentMappingDTO;
import com.estrat.web.dto.EmployeePreferencesDTO;
import com.estrat.web.dto.EmployeeResponseDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.HomePreferencesDTO;
import com.estrat.web.dto.LoginDTO;
import com.estrat.web.dto.LoginResponseDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.TokenResponseDTO;
import com.estrat.web.exception.AuthorizationException;
import com.estrat.web.exception.RequestException;
import com.estrat.web.formbeans.ProfileFormBean;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.DashBoardPreferencesService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.KPIReaderUtil;
import com.estrat.web.util.OrgChartReaderUtil;
import com.estrat.web.util.PasswordEncoder;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.TempUserLocal;
import com.estrat.web.util.TempUserPrincipal;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserPrincipal;
import com.estrat.web.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@Controller
@CrossOrigin(origins={"*"})
public class MemberController {
    private static final Logger LOGGER = Logger.getLogger(MemberController.class);
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIReaderUtil kpiReaderUtil;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;
    @Autowired
    private PageService pageService;
    @Autowired
    private OrgChartReaderUtil orgChartReaderUtil;
    @Autowired
    private AuditTrailService auditTrailService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    private RoleService roleService;

    @RequestMapping(value={"/"}, method={RequestMethod.GET})
    public String index(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/index";
    }

    @RequestMapping(value={"/index"}, method={RequestMethod.GET})
    public String indexPage(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/index";
    }

    @RequestMapping(value={"/logout"}, method={RequestMethod.GET})
    public String logout(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        LOGGER.debug("custom logout called");
        request.getSession().invalidate();
        return "pages/index";
    }

    @RequestMapping(value={"/authfail"}, method={RequestMethod.GET, RequestMethod.POST})
    public String authfail(@RequestParam(value="validate", required=false) String validate, HttpServletRequest request, HttpServletResponse response) {
        if (TempUserLocal.get() != null) {
            request.setAttribute("loginFlag", TempUserLocal.get());
        }
        request.getSession().invalidate();
        return "pages/index";
    }

    @RequestMapping(value={"/updateProfile"}, method={RequestMethod.POST})
    public String updateProfile(@ModelAttribute(value="profileFormBean") ProfileFormBean profileFormBean, HttpServletRequest request, HttpServletResponse response) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmailAddress(profileFormBean.getEmailAddress());
        employeeDTO.setEmpId(profileFormBean.getEmpId());
        employeeDTO.setFirstName(profileFormBean.getFirstName());
        employeeDTO.setDepartment(profileFormBean.getDepartment());
        if (profileFormBean.getDeptUniqueId() != null) {
            employeeDTO.setDeptUniqueId(profileFormBean.getDeptUniqueId());
        } else {
            Employee employee = this.employeeService.getProfileDetails();
            if (employee.getDeptDetails().getDeptID() != null) {
                employeeDTO.setDeptUniqueId(employee.getDeptDetails().getDeptID());
            }
        }
        employeeDTO.setLocation(profileFormBean.getLocation());
        if (!UserThreadLocal.get().getProfile().getPassword().equals(profileFormBean.getPassword())) {
            employeeDTO.setPassword(new PasswordEncoder().encodedPassword(profileFormBean.getPassword()));
        } else {
            employeeDTO.setPassword(profileFormBean.getPassword());
        }
        employeeDTO.setProfileImage(profileFormBean.getProfileImage());
        employeeDTO.setTitle(profileFormBean.getTitle());
        employeeDTO.setParentEmpId((long)profileFormBean.getParentEmpId());
        this.editEmployee(employeeDTO, request);
        return "pages/organization/org_structure_new";
    }

    @RequestMapping(value={"/login"}, method={RequestMethod.GET})
    public String login(Model model, HttpServletRequest request, HttpServletResponse response) throws RequestException {
        System.out.println("======> INSIDE MEMBER CONTROLLER LOGIN");
        try {
            request.getSession().setAttribute("audittrailPgFlag", "");
            request.getSession().setAttribute("controlPgFlag", "");
            request.getSession().setAttribute("orgPgFlag", "");
            request.getSession().setAttribute("userrolePgFlag", "");
            String empId = this.sessionUtil.getSessionId(request);
            
            HomePreferencesDTO homepreferences = null;
            try {
                homepreferences = this.dashBoardPreferencesService.retrieveHomePagePreferences(Long.valueOf(empId));
            } catch (Exception e) {
                LOGGER.warn("Could not retrieve home page preferences, falling back to default landing page: " + e.getMessage());
            }

            if (homepreferences != null && homepreferences.getPageId() > 0L) {
                PageDTO page = this.pageService.checkPageType(String.valueOf(homepreferences.getPageId()));
                if (page != null) {
                    model.addAttribute("dashboardId", page.getId());
                    model.addAttribute("pageEmpId", this.sessionUtil.getSessionId(request));
                    if (page.getPageType().equalsIgnoreCase("Cockpit") || page.getPageType().equalsIgnoreCase("Charts") || page.getPageType().equalsIgnoreCase("StrategyMap")) {
                        return "pages/dashboard/whiteboard";
                    }
                    return "pages/dashboard/dashboard";
                }
                return "pages/organization/landing_page";
            }
            if (homepreferences != null && homepreferences.getPageId() == 0L) {
                if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Organisation")) {
                    request.getSession().setAttribute("orgPgFlag", true);
                    return "pages/organization/org_structure_new";
                }
                if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Control Panel")) {
                    request.getSession().setAttribute("controlPgFlag", true);
                    return "pages/organization/controlpanel";
                }
                if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Audit Trail")) {
                    request.getSession().setAttribute("audittrailPgFlag", true);
                    return "pages/organization/audittrailpage";
                }
                if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("User Role")) {
                    request.getSession().setAttribute("userrolePgFlag", true);
                    return "pages/organization/userrolemanagement";
                }
            }
            return "pages/organization/org_structure_new";
        } catch (Throwable t) {
            t.printStackTrace();
            return "pages/organization/org_structure_new"; // Fallback directly instead of crashing
        }
    }

    @ResponseBody
    @RequestMapping(value={"/createEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO createUser(@RequestBody EmployeeDTO employee, HttpServletRequest request) {
        EmployeeResponseDTO employeeResponseDTO;
        PasswordEncoder encoder = new PasswordEncoder();
        employee.setPassword(encoder.encodedPassword("changeme"));
        employee.setOrgDetails(UserThreadLocal.get().getProfile().getOrgDetails());
        if (this.sessionUtil.getCheckSuper(request).booleanValue()) {
            employee.setSuperCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        }
        if ((employeeResponseDTO = this.employeeService.createEmployee(employee)) != null) {
            Employee profle = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profle);
        }
        return employeeResponseDTO;
    }

    @RequestMapping(value={"/createBulkEmployee"}, method={RequestMethod.POST})
    public ResponseEntity<Map> createBulkEmployee(WebRequest webRequest, @RequestParam(value="employeedata", required=true) MultipartFile employeedata, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.orgChartReaderUtil.readuserDetails(employeedata.getInputStream(), type);
        }
        catch (Exception e) {
            e.printStackTrace();
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value={"/updateParentEmpId/{empId}"}, method={RequestMethod.GET})
    public EmployeeResponseDTO updateParentEmpId(@PathVariable(value="empId") String empId, @RequestParam(value="parentEmpId", required=true) String parentEmpId, HttpServletRequest request) {
        EmployeeDTO check;
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        EmployeeDTO employee = new EmployeeDTO();
        employee.setEmpId(Long.valueOf(empId).longValue());
        employee.setParentEmpId(Long.valueOf(parentEmpId).longValue());
        if (this.sessionUtil.getCheckSuper(request).booleanValue()) {
            employee.setSuperCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        }
        if ((check = this.employeeService.getEmployeeDetails(empId)).getParentEmpId() != 0L) {
            return this.employeeService.updateParentEmpId(employee);
        }
        employeeResponseDTO.setMessageFlag("Now change this user parent totally collapse");
        return employeeResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/editEmployee"}, method={RequestMethod.POST})
    public EmployeeResponseDTO editEmployee(@RequestBody EmployeeDTO employee, HttpServletRequest request) {
        EmployeeResponseDTO employeeResponseDTO;
        employee.setOrgDetails(UserThreadLocal.get().getProfile().getOrgDetails());
        if (this.sessionUtil.getCheckSuper(request).booleanValue()) {
            employee.setSuperCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        }
        if ((employeeResponseDTO = this.employeeService.editEmployee(employee)).isUpdateFlag()) {
            Employee profle = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profle);
        }
        return employeeResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/{empId}/removeEmployee"}, method={RequestMethod.DELETE})
    public EmployeeResponseDTO removeEmployee(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        EmployeeResponseDTO employeeResponseDTO = this.employeeService.removeEmployee(empId);
        if (employeeResponseDTO != null) {
            Employee profle = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profle);
        }
        return employeeResponseDTO;
    }

    @RequestMapping(value={"/dataManagementHome"}, method={RequestMethod.GET})
    public String dataManagementHome(Model model, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/importkpidetails";
    }

    @RequestMapping(value={"/saveData"}, method={RequestMethod.POST})
    public String saveTableData(WebRequest webRequest, @RequestParam(value="tableData", required=true) MultipartFile tableData, @RequestParam(value="dtoType", required=true) String dtoType) {
        try {
            boolean flag = this.kpiReaderUtil.readFileDetails(tableData.getInputStream(), dtoType);
            if (flag) {
                webRequest.setAttribute("uploadSuccess", "Data Imported successfully", 0);
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "success";
    }

    @ResponseBody
    @RequestMapping(value={"/checkEmail"}, method={RequestMethod.GET})
    public Map checkEmail(@RequestParam(value="email") String email, @RequestParam(value="empId", required=false) String empId, HttpServletRequest request) {
        return this.employeeService.checkEmail(email, empId);
    }

    @ResponseBody
    @RequestMapping(value={"/employeeDetails/{empId}"}, method={RequestMethod.GET})
    public EmployeeDTO getEmployeeDetails(@PathVariable(value="empId") String empId) {
        return this.employeeService.getEmployeeDetails(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/employeeDetailsById/{empId}"}, method={RequestMethod.GET})
    public EmployeeDTO employeeDetailsById(@PathVariable(value="empId") String empId) {
        return this.employeeService.getEmployeeDetails(empId);
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
    @RequestMapping(value={"/generateToken"}, method={RequestMethod.POST})
    public TokenResponseDTO generateToken(@RequestBody LoginDTO loginDTO) throws RequestException {
        if (UserThreadLocal.get() != null && UserThreadLocal.get().getLicenseResponseDTO() == null || !UserThreadLocal.get().getLicenseResponseDTO().isValidationSuccess()) {
            // empty if block
        }
        loginDTO.setPassWord(new PasswordEncoder().encodedPassword(loginDTO.getPassWord()));
        LoginResponseDTO loginResponseDTO = this.employeeService.authoriseUser(loginDTO);
        System.out.println(loginResponseDTO.getAccessToken());
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        tokenResponseDTO.setExpireAt(loginResponseDTO.getExpireAt());
        tokenResponseDTO.setRefreshToken(loginResponseDTO.getRefreshToken());
        tokenResponseDTO.setToken(loginResponseDTO.getAccessToken());
        return tokenResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/refreshToken"}, method={RequestMethod.GET})
    public TokenResponseDTO refreshToken(HttpServletRequest request) throws RequestException {
        if (UserThreadLocal.get().getLicenseResponseDTO() == null || !UserThreadLocal.get().getLicenseResponseDTO().isValidationSuccess()) {
            // empty if block
        }
        UserThreadLocal.get().getCommonHeaders().put("REFRESH_TOKEN", request.getHeader("REFRESH_TOKEN"));
        TokenResponseDTO tokenResponseDTO = this.employeeService.refreshToken();
        TokenResponseDTO responseDTO = new TokenResponseDTO();
        responseDTO.setExpireAt(tokenResponseDTO.getExpireAt());
        responseDTO.setToken(tokenResponseDTO.getToken());
        return responseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/organization/employeeList"}, method={RequestMethod.GET})
    public List<Employee> getOrgEmployeeList() {
        return this.employeeService.getOrgEmployeeList();
    }

    @GetMapping(value={"/currencyList"})
    public ResponseEntity<List<Map>> currencyList() throws RequestException {
        return new ResponseEntity(this.employeeService.getCurrencyList(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value={"/getProfile"}, method={RequestMethod.GET})
    public Employee getProfile(HttpServletRequest request, HttpServletResponse response) {
        return this.employeeService.getProfileDetails();
    }

    @ResponseBody
    @RequestMapping(value={"/departmentList"}, method={RequestMethod.GET})
    public List<String> getDepartmentList() {
        return this.employeeService.getDepartmentList();
    }

    @ResponseBody
    @RequestMapping(value={"/forgotPassword"}, method={RequestMethod.POST})
    public Map forgotPassword(@RequestBody UserPrincipal userPrincipal) throws RequestException {
        return this.employeeService.forgotPassword(userPrincipal);
    }

    @ResponseBody
    @RequestMapping(value={"/resetPassword"}, method={RequestMethod.POST})
    public EmployeeResponseDTO resetPassword(@RequestBody UserPrincipal userPrincipal) throws RequestException {
        UserThreadLocal.get().setJwtToken(userPrincipal.getJwtToken());
        TokenResponseDTO responseDTO = null;
        try {
            responseDTO = this.employeeService.validateToken();
        }
        catch (Exception e) {
            LOGGER.error("Exception Occured ", (Throwable)e);
            responseDTO = new TokenResponseDTO();
            responseDTO.setValidationSuccess(false);
        }
        if (responseDTO.isValidationSuccess()) {
            Map userInfo = responseDTO.getUserInfo();
            String decryptUserInfo = userInfo.get("decryptUserInfo").toString();
            String empId = decryptUserInfo.split("#")[0];
            Employee employee = new Employee();
            PasswordEncoder passwordEncoder = new PasswordEncoder();
            employee.setPassword(passwordEncoder.encodedPassword(userPrincipal.getPassword()));
            employee.setEmpId(empId);
            return this.employeeService.resetPassword(employee);
        }
        if (responseDTO.isTokenExpired()) {
            this.auditTrailService.clearLogOutUser();
            throw new AuthorizationException("AU001", "Jwt Token Expired");
        }
        return new EmployeeResponseDTO();
    }

    @RequestMapping(value={"/validateLink"}, method={RequestMethod.GET})
    public String validateLink(@RequestParam(value="token") String token) {
        UserThreadLocal.get().setJwtToken(token);
        TokenResponseDTO responseDTO = null;
        try {
            responseDTO = this.employeeService.validateToken();
        }
        catch (Exception e) {
            LOGGER.error("Exception Occured ", (Throwable)e);
            responseDTO = new TokenResponseDTO();
            responseDTO.setValidationSuccess(false);
        }
        if (responseDTO.isValidationSuccess()) {
            return "pages/organization/resetpage";
        }
        return "pages/organization/expiredpage";
    }

    @ResponseBody
    @RequestMapping(value={"/org/employeeList"}, method={RequestMethod.GET})
    public List<Employee> getOrgEmployeeListByOrgId() {
        TokenResponseDTO responseDTO = null;
        String orgId = null;
        try {
            responseDTO = this.employeeService.validateToken();
            Map userInfo = responseDTO.getUserInfo();
            String decryptUserInfo = userInfo.get("decryptUserInfo").toString();
            orgId = decryptUserInfo.split("#")[5];
        }
        catch (Exception e) {
            LOGGER.error("Exception Occured ", (Throwable)e);
        }
        return this.employeeService.getOrgEmployeeListByOrgId(Long.valueOf(orgId));
    }

    @ResponseBody
    @RequestMapping(value={"/org/years"}, method={RequestMethod.GET})
    public ResponseEntity<List<Integer>> getYearsForDropdown() {
        List years = this.employeeService.getYearsForDropdown();
        return ResponseEntity.ok(years);
    }

    @RequestMapping(value={"/checkHomePageFlag"}, method={RequestMethod.GET})
    public ResponseEntity<Map> checkHomePageFlag(HttpServletRequest request, HttpServletResponse response) throws RequestException {
        HashMap<String, Boolean> stringObjectMap = new HashMap<String, Boolean>();
        HomePreferencesDTO homepreferences = this.dashBoardPreferencesService.retrieveHomePagePreferences(Long.valueOf(this.sessionUtil.getSessionId(request)));
        if (homepreferences != null && homepreferences.getPageId() == 0L) {
            if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Organisation")) {
                stringObjectMap.put("orgPgFlag", true);
            } else if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Control Panel")) {
                stringObjectMap.put("controlPgFlag", true);
            } else if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("Audit Trail")) {
                stringObjectMap.put("audittrailPgFlag", true);
            } else if (homepreferences.getPageName() != null && homepreferences.getPageName().equalsIgnoreCase("User Role")) {
                stringObjectMap.put("userrolePgFlag", true);
            }
        }
        return new ResponseEntity(stringObjectMap, HttpStatus.OK);
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
    @RequestMapping(value={"/departmentChart/{ownerId}"}, method={RequestMethod.GET})
    public DashBoardDepartmentResponseDTO departmentByEmployeeList(@PathVariable(value="ownerId") String ownerId, @RequestParam(value="year", required=false) String year, HttpServletRequest request) throws RequestException {
        return this.employeeService.departmentByEmployeeListChart(ownerId, year);
    }

    @ResponseBody
    @RequestMapping(value={"/addDepartmentMapping"}, method={RequestMethod.POST})
    public DepartmentChartDTO addDepartmentMapping(@RequestBody DepartmentChartDTO departmentChartDTO, HttpServletRequest request) {
        departmentChartDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        departmentChartDTO.setOrgId(Long.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()));
        if (this.sessionUtil.getCheckSuper(request).booleanValue()) {
            departmentChartDTO.setSuperCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        }
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
        departmentChartDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        departmentChartDTO.setOrgId(Long.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()));
        if (this.sessionUtil.getCheckSuper(request).booleanValue()) {
            departmentChartDTO.setSuperCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        }
        return this.employeeService.updateDepartmentChartDTO(departmentChartDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteDepartmentMapping/{deptId}"}, method={RequestMethod.DELETE})
    public EmployeeResponseDTO updateDepartmentMapping(@PathVariable(value="deptId") long deptId, HttpServletRequest request) {
        return this.employeeService.deleteDepartmentChartDTO(deptId);
    }

    @RequestMapping(value={"/createBulkDeptMapping"}, method={RequestMethod.POST})
    public ResponseEntity<Map> createBulkDeptMapping(WebRequest webRequest, @RequestParam(value="deptdata", required=true) MultipartFile deptdata, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.orgChartReaderUtil.readDeptDetails(deptdata.getInputStream(), type);
        }
        catch (Exception e) {
            e.printStackTrace();
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value={"/findProfileByName"}, method={RequestMethod.GET})
    public Employee findProfileByName(@RequestParam(value="firstName") String firstName, HttpServletRequest request) {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        findDTO.setName(firstName.toLowerCase());
        return this.employeeService.findProfileByName(findDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/checkDept"}, method={RequestMethod.GET})
    public Map checkDept(@RequestParam(value="deptName") String deptName, HttpServletRequest request) {
        FindDTO findDTO = new FindDTO();
        findDTO.setName(deptName);
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return this.employeeService.findByDeptName(findDTO);
    }

    @ResponseBody
    @RequestMapping(value={"/checkDeptEmail"}, method={RequestMethod.GET})
    public Map checkDeptEmail(@RequestParam(value="email") String email, HttpServletRequest request) {
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
    public DepartmentChartDTO updateDepartmentParent(@PathVariable(value="deptId") Long deptId, @RequestParam(value="deptParentId") Long deptParentId, HttpServletRequest request) {
        DepartmentChartDTO chartDTO = new DepartmentChartDTO();
        DepartmentChartDTO check = this.employeeService.getDepartmentMapping(deptId.longValue());
        if (check.getDeptParentId() != 0L) {
            return this.employeeService.updateDepartmentParent(deptId.longValue(), deptParentId.longValue(), Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()).longValue());
        }
        chartDTO.setMessageFlag("Now change this user parent totally collapse");
        return chartDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/checkParentEmployee/{orgId}"}, method={RequestMethod.GET})
    public List<Employee> checkParentEmployee(@PathVariable(value="orgId", required=false) String orgId) {
        return this.employeeService.checkParentEmployee(Long.valueOf(orgId));
    }

    @ResponseBody
    @RequestMapping(value={"/updateSessionEmployee/{empId}"}, method={RequestMethod.GET})
    public Employee find(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        Employee employee = this.employeeService.getProfileDetails(empId);
        TempUserPrincipal principal = new TempUserPrincipal();
        principal.setProfile(employee);
        principal.setLicenseResponseDTO(this.employeeService.validateLicense());
        Map permissions = RoleUtil.filterPermissionModules((Map)this.roleService.getTempUserPermissions(empId), (List)this.employeeService.validateLicense().getModuleList());
        principal.setUserPermissions(permissions);
        TempUserThreadLocal.set((TempUserPrincipal)principal);
        request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
        request.getSession().setAttribute("principal", UserThreadLocal.get());
        request.getSession().setAttribute("tempUserId", empId);
        if (employee.getDeptDetails().getDeptID() != null) {
            request.getSession().setAttribute("tempdeptId", employee.getDeptDetails().getDeptID());
            request.getSession().setAttribute("tempdeptIdField", employee.getDeptDetails().getId());
        } else if (employee.getDeptId() != 0L) {
            request.getSession().setAttribute("tempdeptId", employee.getDeptDetails().getDeptID());
            request.getSession().setAttribute("tempdeptIdField", employee.getDeptDetails().getId());
        }
        return employee;
    }

    @ResponseBody
    @RequestMapping(value={"/homeView"}, method={RequestMethod.GET})
    public String updateSession(HttpServletRequest request) {
        request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
        request.getSession().removeAttribute("tempUserId");
        request.getSession().removeAttribute("tempdeptId");
        request.getSession().removeAttribute("tempdeptIdField");
        return "pages/organization/org_structure_new";
    }

    @ResponseBody
    @RequestMapping(value={"/deleteEmployee/{empId}"}, method={RequestMethod.DELETE})
    public EmployeeResponseDTO deleteEmployee(@PathVariable(value="empId") String empId, HttpServletRequest request) {
        return this.employeeService.deleteEmployee(empId);
    }

    @ResponseBody
    @RequestMapping(value={"/deleteOrgDept/{deptId}"}, method={RequestMethod.DELETE})
    public EmployeeResponseDTO deleteOrgDept(@PathVariable(value="deptId") String deptId, HttpServletRequest request) {
        return this.employeeService.deleteOrgDept(deptId);
    }
}

