/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.Employee
 *  com.estrat.backend.user.dto.FindDTO
 *  com.estrat.backend.user.dto.ModuleDTO
 *  com.estrat.backend.user.dto.ModulePrivilegeMappingDTO
 *  com.estrat.backend.user.dto.PrivilegeDTO
 *  com.estrat.backend.user.dto.RoleDTO
 *  com.estrat.backend.user.resource.RoleController
 *  com.estrat.backend.user.service.RoleService
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
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.Employee;
import com.estrat.backend.user.dto.FindDTO;
import com.estrat.backend.user.dto.ModuleDTO;
import com.estrat.backend.user.dto.ModulePrivilegeMappingDTO;
import com.estrat.backend.user.dto.PrivilegeDTO;
import com.estrat.backend.user.dto.RoleDTO;
import com.estrat.backend.user.service.RoleService;
import java.util.List;
import java.util.Map;
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

    @PostMapping(value={"/roleDetails"})
    public ResponseEntity<RoleDTO> saveRoleDetails(@RequestBody RoleDTO roleDTO) {
        return new ResponseEntity((Object)this.roleService.saveRoleDetails(roleDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/roleDetails"})
    public ResponseEntity<RoleDTO> updateRoleDetails(@RequestBody RoleDTO roleDTO) {
        return new ResponseEntity((Object)this.roleService.updateRoleDetails(roleDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/roleDetails/{roleId}"})
    public ResponseEntity<RoleDTO> getRoleDetails(@PathVariable(value="roleId") String roleId) {
        return new ResponseEntity((Object)this.roleService.getRoleDetails(roleId), HttpStatus.OK);
    }

    @GetMapping(value={"/removeRoleDetails/{roleId}"})
    public ResponseEntity<Boolean> removeRoleDetails(@PathVariable(value="roleId") String roleId, @RequestParam(value="empId") String empId) {
        return new ResponseEntity((Object)this.roleService.removeRoleDetails(roleId, empId), HttpStatus.OK);
    }

    @GetMapping(value={"/user/removeRole/{empId}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="empId") String empId, @RequestParam(value="roleId") String roleId) {
        return new ResponseEntity((Object)this.roleService.removeUserRole(empId, roleId), HttpStatus.OK);
    }

    @PostMapping(value={"/user/assignRole"})
    public ResponseEntity<Boolean> assignRoleToUser(@RequestBody RoleDTO roleDTO) {
        return new ResponseEntity((Object)this.roleService.assignRoleUser(roleDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> getRoleList(@PathVariable(value="empId") String empId, @RequestParam(value="type") String type) {
        return new ResponseEntity((Object)this.roleService.getRoleList(empId, type), HttpStatus.OK);
    }

    @GetMapping(value={"/moduleList"})
    public ResponseEntity<List<ModuleDTO>> moduleList() {
        return new ResponseEntity((Object)this.roleService.getModuleList(), HttpStatus.OK);
    }

    @GetMapping(value={"/privilegeList"})
    public ResponseEntity<List<PrivilegeDTO>> privilegeList() {
        return new ResponseEntity((Object)this.roleService.getPrivilegeList(), HttpStatus.OK);
    }

    @GetMapping(value={"/user/roleList/{empId}"})
    public ResponseEntity<List<RoleDTO>> userRoleList(@PathVariable(value="empId") String empId) {
        return new ResponseEntity((Object)this.roleService.getUserRoleList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/user/permissions/{empId}"})
    public ResponseEntity<Map<String, List<String>>> userPermissions(@PathVariable(value="empId") String empId) {
        return new ResponseEntity((Object)this.roleService.getUserPermissions(Long.valueOf(empId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/user/modulePermissions/{empId}"})
    public ResponseEntity<Map<String, Object>> modulePermissions(@PathVariable(value="empId") String empId, @RequestParam(value="moduleName") String moduleName) {
        return new ResponseEntity((Object)this.roleService.getParticularModulePermission(empId, moduleName), HttpStatus.OK);
    }

    @GetMapping(value={"/defaultRoles"})
    public ResponseEntity<Map<String, Object>> defaultRoles() {
        return new ResponseEntity((Object)this.roleService.getdefaultRoles(), HttpStatus.OK);
    }

    @GetMapping(value={"/rolesList"})
    public ResponseEntity<Map<String, Object>> rolesList() {
        return new ResponseEntity((Object)this.roleService.getCustomRoles(), HttpStatus.OK);
    }

    @PutMapping(value={"/updatePermissions"})
    public ResponseEntity<Boolean> updatePermissions(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.updatePermissions(findDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/deletePermissions"})
    public ResponseEntity<Boolean> deletePermissions(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.deletePermissions(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleRoleUserList"})
    public ResponseEntity<List<Employee>> moduleRoleUserList(@RequestParam(value="moduleName") String moduleName) {
        return new ResponseEntity((Object)this.roleService.getUserModuleRoleList(moduleName), HttpStatus.OK);
    }

    @PutMapping(value={"/checkPermission"})
    public ResponseEntity<List<ModulePrivilegeMappingDTO>> checkPermission(@RequestBody FindDTO findDTO) {
        return new ResponseEntity((Object)this.roleService.checkPermission(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/user/moduleAccessUserList"})
    public ResponseEntity<List<Employee>> moduleAccessUserList(@RequestParam(value="moduleName") String moduleName, @RequestParam(value="tagName", required=false) String tagName) {
        return new ResponseEntity((Object)this.roleService.moduleAccessUserList(moduleName, tagName), HttpStatus.OK);
    }
}

