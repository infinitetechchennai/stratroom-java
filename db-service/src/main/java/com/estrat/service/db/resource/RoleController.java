/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.dto.FindDTO
 *  com.estrat.service.db.dto.ModuleDTO
 *  com.estrat.service.db.dto.ModulePrivilegeMappingDTO
 *  com.estrat.service.db.dto.PrivilegeDTO
 *  com.estrat.service.db.dto.RoleDTO
 *  com.estrat.service.db.exception.InputValidationException
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RoleController
 *  com.estrat.service.db.resource.util.RoleUtil
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.RoleService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.dto.FindDTO;
import com.estrat.service.db.dto.ModuleDTO;
import com.estrat.service.db.dto.ModulePrivilegeMappingDTO;
import com.estrat.service.db.dto.PrivilegeDTO;
import com.estrat.service.db.dto.RoleDTO;
import com.estrat.service.db.exception.InputValidationException;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.RoleUtil;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.RoleService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private RoleUtil roleUtil;

    @PostMapping(value={"/roleDetails"})
    public ResponseEntity<RoleDTO> saveRoleDetails(@RequestBody RoleDTO roleDTO) throws RequestException {
        Optional roleDetailsPo = this.roleService.findByRoleName(roleDTO.getRoleName(), Long.valueOf(roleDTO.getOrgId()));
        if (roleDetailsPo.isPresent()) {
            throw new InputValidationException("Duplicate RoleName Provided!");
        }
        roleDTO.setCreatedTime(LocalDateTime.now());
        roleDTO.setModuleList(this.roleUtil.getModuleList(roleDTO.getRoleType()));
        RoleDTO roleDTO1 = this.roleService.saveRoleDetails(roleDTO);
        return new ResponseEntity((Object)roleDTO1, HttpStatus.OK);
    }

    @PutMapping(value={"/roleDetails"})
    public ResponseEntity<RoleDTO> updateRoleDetails(@RequestBody RoleDTO roleDTO) {
        roleDTO.setUpdatedTime(LocalDateTime.now());
        RoleDTO roleDTO1 = this.roleService.updateRoles(roleDTO);
        return new ResponseEntity((Object)roleDTO1, HttpStatus.OK);
    }

    @GetMapping(value={"/roleDetails/{roleId}"})
    public ResponseEntity<RoleDTO> getRoleDetails(@PathVariable(value="roleId") String roleId) {
        return new ResponseEntity((Object)this.roleService.getRoleDetails(roleId), HttpStatus.OK);
    }

    @GetMapping(value={"/removeRoleDetails/{roleId}"})
    public ResponseEntity<Boolean> removeRoleDetails(@PathVariable(value="roleId") String roleId, @RequestParam(value="empId") String empId) {
        this.auditService.updateAudit("Role", Long.valueOf(roleId).longValue(), Long.valueOf(empId).longValue(), "Role Deleted");
        return new ResponseEntity((Object)this.roleService.removeRoleDetails(roleId), HttpStatus.OK);
    }

    @GetMapping(value={"/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> getRoleList(@PathVariable(value="empId") String empId, @RequestParam(value="type") String type) {
        return new ResponseEntity((Object)this.roleService.getRoleList(type, Long.valueOf(empId)), HttpStatus.OK);
    }

    @GetMapping(value={"/user/permissions/{empId}"})
    public ResponseEntity<Map<String, Set<String>>> userPermissions(@PathVariable(value="empId") String empId) {
        return new ResponseEntity((Object)this.roleService.getUserPermissions(Long.valueOf(empId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/user/modulePermissions/{empId}"})
    public ResponseEntity<Map<String, Object>> modulePermissions(@PathVariable(value="empId") String empId, @RequestParam(value="moduleName") String moduleName) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)moduleName, (String[])searchArray, (String[])replaceArray);
        if (result.contains("Initiatives")) {
            result = "Initiatives & Projects";
        } else if (result.contains("Templates") || result.contains("Template")) {
            result = "Template";
        }
        return new ResponseEntity((Object)this.roleService.getParticularModulePermission(Long.valueOf(empId), result), HttpStatus.OK);
    }

    @PutMapping(value={"updatePermissions"})
    public ResponseEntity<Boolean> updatePermissions(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.updatePermissions(findDTO), HttpStatus.OK);
    }

    @PutMapping(value={"deletePermissions"})
    public ResponseEntity<Boolean> deletePermissions(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.deletePermissions(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/defaultRoles"})
    public ResponseEntity<Map<String, Object>> defaultRoles() {
        return new ResponseEntity((Object)this.roleService.getdefaultRoles(), HttpStatus.OK);
    }

    @GetMapping(value={"/checkRoles"})
    public ResponseEntity<Boolean> checkRoles() {
        this.roleService.checkRoles();
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/moduleList"})
    public ResponseEntity<List<ModuleDTO>> moduleList() {
        return new ResponseEntity((Object)this.roleService.getModuleList(), HttpStatus.OK);
    }

    @GetMapping(value={"/privilegeList"})
    public ResponseEntity<List<PrivilegeDTO>> privilegeList() {
        return new ResponseEntity((Object)this.roleService.getPrivilegeList(), HttpStatus.OK);
    }

    @GetMapping(value={"/user/removeRole/{empId}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="empId") String empId, @RequestParam(value="roleId") String roleId) {
        return new ResponseEntity((Object)this.roleService.removeUserRole(empId, roleId), HttpStatus.OK);
    }

    @PostMapping(value={"/user/assignRole"})
    public ResponseEntity<Boolean> assignRoleToUser(@RequestBody RoleDTO roleDTO) {
        return new ResponseEntity((Object)this.roleService.assignRoleUser(roleDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/user/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> userRoleList(@PathVariable(value="empId") String empId) {
        return new ResponseEntity((Object)this.roleService.getUserRoleList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleRoleUserList"})
    public ResponseEntity<List<Employee>> moduleRoleUserList(@RequestParam(value="moduleName") String moduleName) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)moduleName, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.roleService.moduleRoleUserList(result), HttpStatus.OK);
    }

    @GetMapping(value={"/updateRole/{empId}"})
    public ResponseEntity<Boolean> userRoleList(@PathVariable(value="empId") Long empId) {
        this.roleService.checkRoles(empId.longValue());
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/delete/{roleId}"})
    public ResponseEntity<Boolean> delete(@PathVariable(value="roleId") Long roleId) {
        this.roleService.deleteRoles(roleId);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/rolesList"})
    public ResponseEntity<Map<String, Object>> rolesList() {
        return new ResponseEntity((Object)this.roleService.getCustomRoles(), HttpStatus.OK);
    }

    @PutMapping(value={"/checkPermission"})
    public ResponseEntity<List<ModulePrivilegeMappingDTO>> checkPermission(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.checkPermission(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/checkRolesAll"})
    public ResponseEntity<Boolean> checkRolesAll() {
        this.roleService.checkAllRoles();
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PostMapping(value={"/checkroleDetails"})
    public ResponseEntity<RoleDTO> checkRoleDetails(@RequestBody RoleDTO roleDTO) throws RequestException {
        Optional roleDetailsPo = this.roleService.findByRoleName(roleDTO.getRoleName(), Long.valueOf(roleDTO.getOrgId()));
        if (roleDetailsPo.isPresent()) {
            throw new InputValidationException("Duplicate RoleName Provided!");
        }
        return new ResponseEntity((Object)roleDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleAccessUserList"})
    public ResponseEntity<List<Employee>> moduleAccessUserList(@RequestParam(value="moduleName") String moduleName, @RequestParam(value="tagName", required=false) String tagName) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String resultModule = StringUtils.replaceEach((String)moduleName, (String[])searchArray, (String[])replaceArray);
        if (resultModule.contains("Initiatives")) {
            resultModule = "Initiatives & Projects";
        }
        String resultTag = StringUtils.replaceEach((String)tagName, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.roleService.moduleAccessUserList(resultModule, resultTag), HttpStatus.OK);
    }
}

