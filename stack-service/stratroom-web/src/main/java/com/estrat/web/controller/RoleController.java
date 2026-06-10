/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RoleController
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.LicenseResponseDTO
 *  com.estrat.web.dto.ModuleDTO
 *  com.estrat.web.dto.ModulePrivilegeMappingDTO
 *  com.estrat.web.dto.OrgLicenseResponseDTO
 *  com.estrat.web.dto.PrivilegeDTO
 *  com.estrat.web.dto.RoleDTO
 *  com.estrat.web.privilege.Privilege
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.LicenseResponseDTO;
import com.estrat.web.dto.ModuleDTO;
import com.estrat.web.dto.ModulePrivilegeMappingDTO;
import com.estrat.web.dto.OrgLicenseResponseDTO;
import com.estrat.web.dto.PrivilegeDTO;
import com.estrat.web.dto.RoleDTO;
import com.estrat.web.privilege.Privilege;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/role"})
    public ResponseEntity<RoleDTO> saveRoleDetails(@RequestBody RoleDTO roleDTO, HttpServletRequest request) {
        roleDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.roleService.saveRoleDetails(roleDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/role"})
    public ResponseEntity<RoleDTO> updateRoleDetails(@RequestBody RoleDTO roleDTO, HttpServletRequest request) {
        roleDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.roleService.updateRoleDetails(roleDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/role/{roleId}"})
    public ResponseEntity<RoleDTO> getRoleDetails(@PathVariable(value="roleId") String roleId) {
        return new ResponseEntity(this.roleService.getRoleDetails(roleId), HttpStatus.OK);
    }

    @GetMapping(value={"/removeRole/{roleId}"})
    public ResponseEntity<Boolean> removeRoleDetails(@PathVariable(value="roleId") String roleId, HttpServletRequest request) {
        return new ResponseEntity(this.roleService.removeRoleDetails(roleId, Long.valueOf(this.sessionUtil.getSessionId(request))), HttpStatus.OK);
    }

    @GetMapping(value={"/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> getRoleList(@PathVariable(value="empId") String empId, @RequestParam(value="type") String type) {
        return new ResponseEntity(this.roleService.getRoleList(type, empId), HttpStatus.OK);
    }

    @GetMapping(value={"/user/permissions"})
    public ResponseEntity<Map<String, List<String>>> userPermissions(HttpServletRequest request) {
        return new ResponseEntity(this.roleService.getUserPermissions(UserThreadLocal.get().getProfile().getEmpId()), HttpStatus.OK);
    }

    @GetMapping(value={"/user/modulePermissions"})
    public ResponseEntity<Map<String, Object>> modulePermissions(@RequestParam(value="moduleName") String moduleName, HttpServletRequest request) {
        return new ResponseEntity(this.roleService.getParticularModulePermission(UserThreadLocal.get().getProfile().getEmpId(), moduleName), HttpStatus.OK);
    }

    @GetMapping(value={"/defaultRoles"})
    public ResponseEntity<Map<String, Object>> defaultRoles() {
        return new ResponseEntity(this.roleService.getdefaultRoles(), HttpStatus.OK);
    }

    @GetMapping(value={"/rolesList"})
    public ResponseEntity<Map<String, Object>> rolesList() {
        return new ResponseEntity(this.roleService.getCustomRoles(), HttpStatus.OK);
    }

    @PutMapping(value={"/updatePermissions/{roleId}"})
    public ResponseEntity<Boolean> updatePermissions(@PathVariable(value="roleId") Long roleId, @RequestParam(value="moduleName") String moduleName, @RequestParam(value="tagName") String tagName, @RequestParam(value="privilegeName", required=false) String privilegeName) {
        FindDTO findDTO = new FindDTO();
        findDTO.setRoleId(roleId);
        findDTO.setModuleName(moduleName);
        findDTO.setTagName(tagName);
        if (privilegeName != null) {
            findDTO.setPrivilegeName(privilegeName);
        }
        return new ResponseEntity(this.roleService.updatePermissions(findDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deletePermissions/{roleId}"})
    public ResponseEntity<Boolean> deletePermissions(@PathVariable(value="roleId") Long roleId, @RequestParam(value="moduleName") String moduleName, @RequestParam(value="tagName") String tagName, @RequestParam(value="privilegeName", required=false) String privilegeName) {
        FindDTO findDTO = new FindDTO();
        findDTO.setRoleId(roleId);
        findDTO.setModuleName(moduleName);
        findDTO.setTagName(tagName);
        if (privilegeName != null) {
            findDTO.setPrivilegeName(privilegeName);
        }
        return new ResponseEntity(this.roleService.deletePermissions(findDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/checkPermission"})
    public ResponseEntity<List<ModulePrivilegeMappingDTO>> checkPermission(HttpServletRequest request) {
        return new ResponseEntity(this.roleService.checkPermissions(request), HttpStatus.OK);
    }

    @GetMapping(value={"/user/removeRole/{empId}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="empId") String empId, @RequestParam(value="roleId") String roleId) {
        return new ResponseEntity(this.roleService.removeUserRole(empId, roleId), HttpStatus.OK);
    }

    @PostMapping(value={"/user/assignRole"})
    public ResponseEntity<Boolean> assignRoleToUser(@RequestBody RoleDTO roleDTO) {
        return new ResponseEntity(this.roleService.assignRoleUser(roleDTO), HttpStatus.OK);
    }

    @Privilege(modules={"Access Control"}, privleges={"View", "Create", "Update", "Delete"}, matchAll=false)
    @GetMapping(value={"/moduleList"})
    public ResponseEntity<List<ModuleDTO>> moduleList() {
        return new ResponseEntity(this.roleService.getModuleList(), HttpStatus.OK);
    }

    @Privilege(modules={"Access Control"}, privleges={"View", "Create", "Update", "Delete"}, matchAll=false)
    @GetMapping(value={"/privilegeList"})
    public ResponseEntity<List<PrivilegeDTO>> privilegeList() {
        return new ResponseEntity(this.roleService.getPrivilegeList(), HttpStatus.OK);
    }

    @Privilege(modules={"Access Control"}, privleges={"View", "Create", "Update", "Delete"}, matchAll=false)
    @GetMapping(value={"/user/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> userRoleList(@PathVariable(value="empId") String empId) {
        return new ResponseEntity(this.roleService.getUserRoleList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/user/licenseDetails"})
    public ResponseEntity<OrgLicenseResponseDTO> licenseDetails(HttpServletRequest request) {
        Object empId = null;
        LicenseResponseDTO licenseDetails = UserThreadLocal.get().getLicenseResponseDTO();
        List moduleList = this.roleService.getModuleList();
        List licenseModuleList = licenseDetails.getModuleList();
        List updatedModules = ((java.util.List<com.estrat.web.dto.ModuleDTO>)moduleList).stream().map(module -> {
            module.setEnabled(licenseModuleList.contains(module.getModuleName()));
            return module;
        }).collect(Collectors.toList());
        OrgLicenseResponseDTO licenseResponseDTO = new OrgLicenseResponseDTO();
        licenseResponseDTO.setExpiryDate(licenseDetails.getExpiryDate());
        licenseResponseDTO.setModuleList(updatedModules);
        licenseResponseDTO.setOrganization(licenseDetails.getOrganization());
        licenseResponseDTO.setTotalAllowedUsers(licenseDetails.getTotalAllowedUsers());
        licenseResponseDTO.setDeviceList(licenseDetails.getDeviceList());
        licenseResponseDTO.setValidationSuccess(true);
        return new ResponseEntity(licenseResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleRoleUserList"})
    public ResponseEntity<List<Employee>> moduleRoleUserList(@RequestParam(value="moduleName") String moduleName) {
        return new ResponseEntity(this.roleService.getUserModuleRoleList(moduleName), HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleAccessUserList"})
    public ResponseEntity<List<Employee>> moduleAccessUserList(@RequestParam(value="moduleName") String moduleName, @RequestParam(value="tagName", required=false) String tagName) {
        return new ResponseEntity(this.roleService.moduleAccessUserList(moduleName, tagName), HttpStatus.OK);
    }
}

