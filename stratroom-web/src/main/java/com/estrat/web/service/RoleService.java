/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.ModuleDTO
 *  com.estrat.web.dto.ModulePrivilegeMappingDTO
 *  com.estrat.web.dto.PrivilegeDTO
 *  com.estrat.web.dto.RoleDTO
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.service.RoleService$1
 *  com.estrat.web.service.RoleService$10
 *  com.estrat.web.service.RoleService$11
 *  com.estrat.web.service.RoleService$12
 *  com.estrat.web.service.RoleService$13
 *  com.estrat.web.service.RoleService$2
 *  com.estrat.web.service.RoleService$3
 *  com.estrat.web.service.RoleService$4
 *  com.estrat.web.service.RoleService$5
 *  com.estrat.web.service.RoleService$6
 *  com.estrat.web.service.RoleService$7
 *  com.estrat.web.service.RoleService$8
 *  com.estrat.web.service.RoleService$9
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.ModuleDTO;
import com.estrat.web.dto.ModulePrivilegeMappingDTO;
import com.estrat.web.dto.PrivilegeDTO;
import com.estrat.web.dto.RoleDTO;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RoleService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${userservice.employee.role.save}")
    private String saveRoleUrl;
    @Value(value="${userservice.employee.role.retrieve}")
    private String retrieveRoleUrl;
    @Value(value="${userservice.remove.role.url}")
    private String removeRoleUrl;
    @Value(value="${userservice.user.role.remove}")
    private String removeUserRoleUrl;
    @Value(value="${userservice.user.role.assign}")
    private String roleAssignUrl;
    @Value(value="${userservice.roleList}")
    private String roleListUrl;
    @Value(value="${userservice.moduleList}")
    private String moduleListUrl;
    @Value(value="${userservice.privilegeList}")
    private String privListUrl;
    @Value(value="${userservice.user.rolelist.url}")
    private String userRoleListUrl;
    @Value(value="${userservice.user.permission.url}")
    private String permissionUrl;
    @Value(value="${userservice.user.module.rolelist.url}")
    private String userModuleRoleListUrl;
    @Value(value="${userservice.menus.url}")
    private String userUrl;
    @Autowired
    private RequestSessionUtil sessionUtil;

    public RoleDTO saveRoleDetails(RoleDTO roleDTO) {
        return (RoleDTO)this.restTemplate.postForObject(this.saveRoleUrl, roleDTO, RoleDTO.class);
    }

    public RoleDTO updateRoleDetails(RoleDTO roleDTO) {
        return (RoleDTO)this.restTemplate.putForObject(this.saveRoleUrl, roleDTO, RoleDTO.class);
    }

    public List<RoleDTO> getRoleList(String type, String empId) {
        String url = this.roleListUrl + "/" + empId;
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RoleDTO getRoleDetails(String roleId) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("roleId", roleId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.retrieveRoleUrl).buildAndExpand(urlVaiables).toUriString();
        return (RoleDTO)this.restTemplate.getForObject(roleUrl, RoleDTO.class);
    }

    public boolean removeRoleDetails(String roleId, Long empId) {
        HashMap urlVariables = new HashMap();
        urlVariables.put("roleId", roleId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.removeRoleUrl).queryParam("empId", new Object[]{empId}).buildAndExpand(urlVariables).toUriString();
        return (Boolean)this.restTemplate.getForObject(roleUrl, Boolean.class);
    }

    public boolean removeUserRole(String empId, String roleId) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.removeUserRoleUrl).queryParam("roleId", new Object[]{roleId}).buildAndExpand(urlVaiables).toUriString();
        return (Boolean)this.restTemplate.getForObject(roleUrl, Boolean.class);
    }

    public boolean assignRoleUser(RoleDTO roleDTO) {
        return (Boolean)this.restTemplate.postForObject(this.roleAssignUrl, roleDTO, Boolean.class);
    }

    public List<PrivilegeDTO> getPrivilegeList() {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(this.privListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ModuleDTO> getModuleList() {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List moduleList = (List)this.restTemplate.getForObject(this.moduleListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return RoleUtil.filterModules((List)moduleList, (List)UserThreadLocal.get().getLicenseResponseDTO().getModuleList());
    }

    public List<RoleDTO> getUserRoleList(String empId) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.userRoleListUrl).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, List<String>> getUserPermissions(String empId) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.permissionUrl).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        Map permissionMap = (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return RoleUtil.filterPermissionModules((Map)permissionMap, (List)UserThreadLocal.get().getLicenseResponseDTO().getModuleList());
    }

    public List<Employee> getUserModuleRoleList(String moduleName) {
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.userModuleRoleListUrl).queryParam("moduleName", new Object[]{moduleName}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map getParticularModulePermission(String empId, String moduleName) {
        String url = this.userUrl + "/user/modulePermissions/{empId}";
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("moduleName", new Object[]{moduleName}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference<Map<String, Object>> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, parameterizedTypeReference);
    }

    public Map getdefaultRoles() {
        String url = this.userUrl + "/defaultRoles";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference<Map<String, Object>> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {};
        return (Map)this.restTemplate.getForObject(roleUrl, parameterizedTypeReference);
    }

    public Map getCustomRoles() {
        String url = this.userUrl + "/rolesList";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public boolean updatePermissions(FindDTO findDTO) {
        String url = this.userUrl + "/updatePermissions";
        return (Boolean)this.restTemplate.putForObject(url, findDTO, Boolean.class);
    }

    public boolean deletePermissions(FindDTO findDTO) {
        String url = this.userUrl + "/deletePermissions";
        return (Boolean)this.restTemplate.putForObject(url, findDTO, Boolean.class);
    }

    public List<ModulePrivilegeMappingDTO> checkPermissions(HttpServletRequest request) {
        String url = this.userUrl + "/checkPermission";
        FindDTO findDTO = new FindDTO();
        findDTO.setEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.putForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, List<String>> getTempUserPermissions(String empId) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)this.permissionUrl).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        Map permissionMap = (Map)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return permissionMap;
    }

    public List<ModulePrivilegeMappingDTO> checkPermissions(Long empId) {
        String url = this.userUrl + "/checkPermission";
        FindDTO findDTO = new FindDTO();
        findDTO.setEmpId(empId);
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.putForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Employee> moduleAccessUserList(String moduleName, String tagName) {
        String url = this.userUrl + "/user/moduleAccessUserList";
        String roleUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("moduleName", new Object[]{moduleName}).queryParam("tagName", new Object[]{tagName}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(roleUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


