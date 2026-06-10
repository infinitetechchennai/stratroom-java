/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.Employee
 *  com.estrat.backend.user.dto.FindDTO
 *  com.estrat.backend.user.dto.ModuleDTO
 *  com.estrat.backend.user.dto.ModulePrivilegeMappingDTO
 *  com.estrat.backend.user.dto.PrivilegeDTO
 *  com.estrat.backend.user.dto.RoleDTO
 *  com.estrat.backend.user.service.RoleService
 *  com.estrat.backend.user.service.RoleService$1
 *  com.estrat.backend.user.service.RoleService$10
 *  com.estrat.backend.user.service.RoleService$11
 *  com.estrat.backend.user.service.RoleService$2
 *  com.estrat.backend.user.service.RoleService$3
 *  com.estrat.backend.user.service.RoleService$4
 *  com.estrat.backend.user.service.RoleService$5
 *  com.estrat.backend.user.service.RoleService$6
 *  com.estrat.backend.user.service.RoleService$7
 *  com.estrat.backend.user.service.RoleService$8
 *  com.estrat.backend.user.service.RoleService$9
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.Employee;
import com.estrat.backend.user.dto.FindDTO;
import com.estrat.backend.user.dto.ModuleDTO;
import com.estrat.backend.user.dto.ModulePrivilegeMappingDTO;
import com.estrat.backend.user.dto.PrivilegeDTO;
import com.estrat.backend.user.dto.RoleDTO;
import com.estrat.backend.user.service.RoleService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RoleService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${dbservice.employee.role.save}")
    private String saveRoleUrl;
    @Value(value="${dbservice.employee.role.retrieve}")
    private String retrieveRoleUrl;
    @Value(value="${dbservice.remove.role.url}")
    private String removeRoleUrl;
    @Value(value="${dbservice.user.role.remove}")
    private String removeUserRoleUrl;
    @Value(value="${dbservice.user.role.assign}")
    private String roleAssignUrl;
    @Value(value="${dbservice.roleList}")
    private String roleListUrl;
    @Value(value="${dbservice.moduleList}")
    private String moduleListUrl;
    @Value(value="${dbservice.privilegeList}")
    private String privListUrl;
    @Value(value="${dbservice.user.rolelist.url}")
    private String userRoleListUrl;
    @Value(value="${dbservice.user.permission.url}")
    private String permissionUrl;
    @Value(value="${dbservice.user.module.rolelist.url}")
    private String userModuleRoleListUrl;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public RoleDTO saveRoleDetails(RoleDTO roleDTO) {
        return (RoleDTO)this.restTemplate.postForObject(this.saveRoleUrl, (Object)roleDTO, RoleDTO.class);
    }

    public RoleDTO updateRoleDetails(RoleDTO roleDTO) {
        return (RoleDTO)this.restTemplate.putForObject(this.saveRoleUrl, (Object)roleDTO, RoleDTO.class);
    }

    public List<RoleDTO> getRoleList(String empId, String type) {
        String url = this.roleListUrl + "/" + empId;
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RoleDTO getRoleDetails(String roleId) {
        HashMap<String, String> urlVaiables = new HashMap<String, String>();
        urlVaiables.put("roleId", roleId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.retrieveRoleUrl).buildAndExpand(urlVaiables).toUriString();
        return (RoleDTO)this.restTemplate.getForObject(roleUrl, RoleDTO.class);
    }

    public boolean removeRoleDetails(String roleId, String empId) {
        HashMap<String, String> urlVaiables = new HashMap<String, String>();
        urlVaiables.put("roleId", roleId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.removeRoleUrl).queryParam("empId", new Object[]{empId}).buildAndExpand(urlVaiables).toUriString();
        return (Boolean)this.restTemplate.getForObject(roleUrl, Boolean.class);
    }

    public boolean removeUserRole(String empId, String roleId) {
        HashMap<String, String> urlVaiables = new HashMap<String, String>();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.removeUserRoleUrl).queryParam("roleId", new Object[]{roleId}).buildAndExpand(urlVaiables).toUriString();
        return (Boolean)this.restTemplate.getForObject(roleUrl, Boolean.class);
    }

    public boolean assignRoleUser(RoleDTO roleDTO) {
        return (Boolean)this.restTemplate.postForObject(this.roleAssignUrl, (Object)roleDTO, Boolean.class);
    }

    public List<PrivilegeDTO> getPrivilegeList() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.privListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ModuleDTO> getModuleList() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(this.moduleListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RoleDTO> getUserRoleList(String empId) {
        HashMap<String, String> urlVaiables = new HashMap<String, String>();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.userRoleListUrl).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> getUserModuleRoleList(String moduleName) {
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.userModuleRoleListUrl).queryParam("moduleName", new Object[]{moduleName}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, List<String>> getUserPermissions(long empId) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.permissionUrl).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> getParticularModulePermission(String empId, String moduleName) {
        String url = this.dbUrl + "/user/modulePermissions/{empId}";
        HashMap<String, String> urlVariables = new HashMap<String, String>();
        urlVariables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("moduleName", new Object[]{moduleName}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> getdefaultRoles() {
        String url = this.dbUrl + "/defaultRoles";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> getCustomRoles() {
        String url = this.dbUrl + "/rolesList";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public boolean updatePermissions(FindDTO findDTO) {
        String url = this.dbUrl + "/updatePermissions";
        return (Boolean)this.restTemplate.putForObject(url, (Object)findDTO, Boolean.class);
    }

    public boolean deletePermissions(FindDTO findDTO) {
        String url = this.dbUrl + "/deletePermissions";
        return (Boolean)this.restTemplate.putForObject(url, (Object)findDTO, Boolean.class);
    }

    public List<ModulePrivilegeMappingDTO> checkPermission(FindDTO findDTO) {
        String url = this.dbUrl + "/checkPermission";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.putForObject(url, (Object)findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> moduleAccessUserList(String moduleName, String tagName) {
        String url = this.dbUrl + "/user/moduleAccessUserList";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("moduleName", new Object[]{moduleName}).queryParam("tagName", new Object[]{tagName}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

