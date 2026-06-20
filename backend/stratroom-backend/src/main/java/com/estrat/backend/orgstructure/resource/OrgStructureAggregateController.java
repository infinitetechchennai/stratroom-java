package com.estrat.backend.orgstructure.resource;

import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.RoleService;
import com.estrat.backend.orgstructure.dto.OrgStructureAggregateDTO;
import java.util.LinkedHashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Backend-for-Frontend aggregate endpoint for the Org Structure page.
 *
 * Collapses the individual org structure calls (years, allDepartmentList,
 * modulePermissions, org/employeeList, getDepartmentMapping) into a single
 * round trip. Each section is fetched independently and a failure in one does
 * not fail the whole response, so the page degrades gracefully.
 *
 * The underlying endpoints are left untouched and continue to work on their own.
 */
@RestController
@RequestMapping(value = {"/org/structure"})
public class OrgStructureAggregateController {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrgStructureAggregateController.class);
    private static final String DEFAULT_MODULES = "Scorecard,Risk";

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private RoleService roleService;

    @GetMapping(value = {"/aggregate"})
    public ResponseEntity<OrgStructureAggregateDTO> aggregate(@RequestParam(value = "orgId") long orgId, @RequestParam(value = "empId") Long empId, @RequestParam(value = "deptId", required = false) Long deptId, @RequestParam(value = "moduleNames", required = false) String moduleNames) {
        OrgStructureAggregateDTO response = new OrgStructureAggregateDTO();
        try {
            response.setYears(this.employeeService.getYearsForDropdown());
        }
        catch (Exception e) {
            LOGGER.error("Org structure aggregate: failed to load years", (Throwable)e);
        }
        try {
            response.setDepartmentList(this.departmentDetailsService.findAll());
        }
        catch (Exception e) {
            LOGGER.error("Org structure aggregate: failed to load department list", (Throwable)e);
        }
        try {
            response.setEmployeeList(this.employeeService.getEmployeeListbyOrgId(orgId));
        }
        catch (Exception e) {
            LOGGER.error("Org structure aggregate: failed to load employee list for orgId {}", (Object)orgId, (Object)e);
        }
        try {
            response.setModulePermissions(this.resolveModulePermissions(empId, moduleNames));
        }
        catch (Exception e) {
            LOGGER.error("Org structure aggregate: failed to load module permissions for empId {}", (Object)empId, (Object)e);
        }
        if (deptId != null) {
            try {
                response.setDepartmentMapping(this.employeeService.getDepartmentMapping(deptId));
            }
            catch (Exception e) {
                LOGGER.error("Org structure aggregate: failed to load department mapping for deptId {}", (Object)deptId, (Object)e);
            }
        }
        return new ResponseEntity<OrgStructureAggregateDTO>(response, HttpStatus.OK);
    }

    private Map<String, Object> resolveModulePermissions(Long empId, String moduleNames) {
        LinkedHashMap<String, Object> permissions = new LinkedHashMap<String, Object>();
        String names = StringUtils.isBlank((CharSequence)moduleNames) ? DEFAULT_MODULES : moduleNames;
        for (String rawModule : names.split(",")) {
            String moduleName = this.normalizeModuleName(rawModule);
            if (StringUtils.isBlank((CharSequence)moduleName)) continue;
            try {
                permissions.put(moduleName, this.roleService.getParticularModulePermission(empId, moduleName));
            }
            catch (Exception e) {
                LOGGER.error("Org structure aggregate: failed to load permission for module {}", (Object)moduleName, (Object)e);
            }
        }
        return permissions;
    }

    private String normalizeModuleName(String moduleName) {
        if (moduleName == null) {
            return null;
        }
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)moduleName.trim(), (String[])searchArray, (String[])replaceArray);
        if (result.contains("Initiatives")) {
            result = "Initiatives & Projects";
        } else if (result.contains("Templates") || result.contains("Template")) {
            result = "Template";
        }
        return result;
    }
}
