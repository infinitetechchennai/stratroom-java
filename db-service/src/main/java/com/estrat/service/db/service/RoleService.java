/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.ModuleDetailsPo
 *  com.estrat.service.db.bean.po.ModulePrivillageMapping
 *  com.estrat.service.db.bean.po.PrivilegeDetailsPo
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.bean.po.RoleUserEmbeddedId
 *  com.estrat.service.db.bean.po.RoleUserMapping
 *  com.estrat.service.db.bean.po.Roles
 *  com.estrat.service.db.bean.po.UserRoleManagement
 *  com.estrat.service.db.dao.ModulePrivilegeMappingDAO
 *  com.estrat.service.db.dao.ModulePrivilegeMappingRepo
 *  com.estrat.service.db.dao.RolesRepository
 *  com.estrat.service.db.dao.UserRoleManagementRepository
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.FindDTO
 *  com.estrat.service.db.dto.ModuleDTO
 *  com.estrat.service.db.dto.ModulePrivilegeMappingDTO
 *  com.estrat.service.db.dto.PrivilegeDTO
 *  com.estrat.service.db.dto.RoleDTO
 *  com.estrat.service.db.repository.EmployeeProfilePoRepo
 *  com.estrat.service.db.repository.ModuleRepository
 *  com.estrat.service.db.repository.PrivilegeRepository
 *  com.estrat.service.db.repository.RoleRepository
 *  com.estrat.service.db.repository.RoleUserMappingRepository
 *  com.estrat.service.db.resource.util.RoleUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RoleService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.ModuleDetailsPo;
import com.estrat.service.db.bean.po.ModulePrivillageMapping;
import com.estrat.service.db.bean.po.PrivilegeDetailsPo;
import com.estrat.service.db.bean.po.RoleDetailsPo;
import com.estrat.service.db.bean.po.RoleUserEmbeddedId;
import com.estrat.service.db.bean.po.RoleUserMapping;
import com.estrat.service.db.bean.po.Roles;
import com.estrat.service.db.bean.po.UserRoleManagement;
import com.estrat.service.db.dao.ModulePrivilegeMappingDAO;
import com.estrat.service.db.dao.ModulePrivilegeMappingRepo;
import com.estrat.service.db.dao.RolesRepository;
import com.estrat.service.db.dao.UserRoleManagementRepository;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.FindDTO;
import com.estrat.service.db.dto.ModuleDTO;
import com.estrat.service.db.dto.ModulePrivilegeMappingDTO;
import com.estrat.service.db.dto.PrivilegeDTO;
import com.estrat.service.db.dto.RoleDTO;
import com.estrat.service.db.repository.EmployeeProfilePoRepo;
import com.estrat.service.db.repository.ModuleRepository;
import com.estrat.service.db.repository.PrivilegeRepository;
import com.estrat.service.db.repository.RoleRepository;
import com.estrat.service.db.repository.RoleUserMappingRepository;
import com.estrat.service.db.resource.util.RoleUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.UserRoleManagementService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class RoleService {
    private Logger logger = LoggerFactory.getLogger(RoleService.class);
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeProfilePoRepo profilePoRepo;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRoleManagementRepository userrepo;
    @Autowired
    private PrivilegeRepository privRepository;
    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private ModulePrivilegeMappingRepo modulePrivilegeMappingRepo;
    @Autowired
    private RoleUserMappingRepository roleUserMappingRepository;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private RoleUtil roleUtil;
    @Autowired
    private RolesRepository repository;
    @Autowired
    private ModulePrivilegeMappingDAO privilegeMappingDAO;
    @Autowired
    private UserRoleManagementService userRoleManagementService;
    @Autowired
    private UserRoleManagementRepository userRoleManagementRepository;

    public RoleDTO saveRoleDetails(RoleDTO roleDTO) {
        RoleDetailsPo roleDetailsPo = new RoleDetailsPo(roleDTO);
        roleDetailsPo.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        RoleDetailsPo role = (RoleDetailsPo)this.roleRepository.save(roleDetailsPo);
        this.auditService.saveAudit("Role", role.getRoleId(), role.getCreatedBy(), "Role Created");
        for (String empId : roleDTO.getEmployeeIDs()) {
            this.removeUserRoleByEmpId(Long.valueOf(empId));
            RoleUserMapping roleUserMapping = new RoleUserMapping(role, empId);
            this.roleUserMappingRepository.save(roleUserMapping);
            this.auditService.updateAudit("User", role.getRoleId(), Long.valueOf(empId).longValue(), "User Role Assigned");
        }
        this.updateModuleDetailsAndPrivileges(role, roleDTO);
        return new RoleDTO(role, true);
    }

    public RoleDTO updateRoles(RoleDTO roleDTO) {
        RoleDetailsPo roleDetailsPo = new RoleDetailsPo(roleDTO);
        roleDetailsPo.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        RoleDetailsPo role = (RoleDetailsPo)this.roleRepository.save(roleDetailsPo);
        this.roleUserMappingRepository.deleteByIdRoleId(roleDetailsPo);
        for (String empId : roleDTO.getEmployeeIDs()) {
            this.removeUserRoleByEmpId(Long.valueOf(empId));
            RoleUserMapping roleUserMapping = new RoleUserMapping(roleDetailsPo, empId);
            this.roleUserMappingRepository.save(roleUserMapping);
            UserRoleManagement user = this.userrepo.findByID(Long.valueOf(empId));
            user.setRoleId(Long.valueOf(roleDetailsPo.getRoleId()));
            user.setRole(roleDetailsPo.getRoleName());
            this.userrepo.saveAndFlush((Object)user);
            this.auditService.updateAudit("Role", role.getRoleId(), Long.valueOf(empId).longValue(), "Role Modified");
            this.auditService.updateAudit("User", roleDetailsPo.getRoleId(), Long.valueOf(empId).longValue(), "User Role Assigned");
        }
        return new RoleDTO(role, true);
    }

    private void updateModuleDetailsAndPrivileges(RoleDetailsPo role, RoleDTO roleDTO) {
        List moduleDTOS = roleDTO.getModuleList();
        if (!moduleDTOS.isEmpty()) {
            for (ModuleDTO moduleDTO : moduleDTOS) {
                if (moduleDTO.getPrivilegeList().isEmpty()) continue;
                Map stringObjectivesMap = moduleDTO.getPrivilegeList();
                ModulePrivillageMapping privilegeMapping = new ModulePrivillageMapping();
                privilegeMapping.setModuleId(Long.valueOf(moduleDTO.getModuleId()));
                privilegeMapping.setModuleName(moduleDTO.getModuleName());
                privilegeMapping.setTagName(moduleDTO.getTagName());
                privilegeMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                privilegeMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                privilegeMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                privilegeMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                privilegeMapping.setRoleId(Long.valueOf(role.getRoleId()));
                this.modulePrivilegeMappingRepo.save(privilegeMapping);
            }
        }
    }

    public List<RoleDTO> getRoleList(String type, Long empId) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId.longValue());
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        List roleDetails = null;
        if (type.equalsIgnoreCase("DEFAULT")) {
            List check = this.roleRepository.getRoleList(employee.getOrgDetails().getOrgId(), 0);
            if (check.isEmpty()) {
                this.saveUserRole(Long.valueOf(employee.getOrgDetails().getOrgId()), Long.valueOf(employee.getEmpId()));
            }
            roleDetails = this.roleRepository.getRoleList(employee.getOrgDetails().getOrgId(), 0);
        } else {
            roleDetails = this.roleRepository.getRoleList(employee.getOrgDetails().getOrgId(), 1);
        }
        if (CollectionUtils.isNotEmpty((Collection)roleDetails)) {
            return roleDetails.stream().map(role -> {
                RoleDTO roleDTO = new RoleDTO(role, false);
                roleDTO.setModulePrivilegeList(this.getModuleObject(Long.valueOf(roleDTO.getRoleId())));
                return roleDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public RoleDTO getRoleDetails(String roleId) {
        Optional result = this.roleRepository.findById(Long.valueOf(roleId));
        if (result.isPresent()) {
            RoleDTO roleDTO = new RoleDTO((RoleDetailsPo)result.get(), false);
            roleDTO.setEmployeeIDs(this.getUserList((RoleDetailsPo)result.get()));
            roleDTO.setModulePrivilegeList(this.getModuleObject(Long.valueOf(roleDTO.getRoleId())));
            return roleDTO;
        }
        return null;
    }

    public boolean removeRoleDetails(String roleId) {
        Optional result = this.roleRepository.findById(Long.valueOf(roleId));
        if (result.isPresent()) {
            RoleDetailsPo roleDetailsPo = (RoleDetailsPo)result.get();
            this.removeUserRole(Long.valueOf(roleDetailsPo.getRoleId()));
            this.userRoleManagementService.removeRole(Long.valueOf(roleDetailsPo.getRoleId()));
            roleDetailsPo.getEmployeeList();
            this.roleRepository.delete((Object)roleDetailsPo);
            return true;
        }
        return false;
    }

    public boolean removeUserRole(String empId, String roleId) {
        RoleUserEmbeddedId userEmbeddedId = new RoleUserEmbeddedId();
        EmployeeProfilePo profilePo = new EmployeeProfilePo();
        profilePo.setEmpId(Long.valueOf(empId).longValue());
        RoleDetailsPo roleDetailsPo = new RoleDetailsPo();
        roleDetailsPo.setRoleId(Long.valueOf(roleId).longValue());
        userEmbeddedId.setEmpId(profilePo);
        userEmbeddedId.setRoleId(roleDetailsPo);
        Optional result = this.roleUserMappingRepository.findById(userEmbeddedId);
        if (result.isPresent()) {
            this.roleUserMappingRepository.delete(result.get());
            return true;
        }
        return false;
    }

    public void removeUserRole(Long roleId) {
        List roleList = this.roleUserMappingRepository.findAll(roleId);
        for (RoleUserMapping role : roleList) {
            this.roleUserMappingRepository.delete((Object)role);
        }
    }

    public void removeUserRoleByEmpId(Long empId) {
        List roleList = this.roleUserMappingRepository.findAllEmpId(empId);
        for (RoleUserMapping role : roleList) {
            this.roleUserMappingRepository.delete((Object)role);
        }
    }

    public void saveUserRole(Long orgId, Long empId) {
        List roleList = this.repository.findAll();
        for (Roles role : roleList) {
            RoleDTO roleDTO = this.getRoleDTO(role.getRoleName(), empId);
            RoleDetailsPo roleDetailPo = new RoleDetailsPo(roleDTO);
            roleDetailPo.setOrgId(orgId);
            RoleDetailsPo roleDetailsPo = (RoleDetailsPo)this.roleRepository.save(roleDetailPo);
            this.updateModuleDetailsAndPrivileges(roleDetailsPo, roleDTO);
        }
    }

    public RoleDTO getRoleDTO(String role, Long empId) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setCreatedBy(empId.longValue());
        roleDTO.setRoleName(role);
        roleDTO.setRoleType(role);
        roleDTO.setType(0);
        roleDTO.setCreatedTime(LocalDateTime.now());
        roleDTO.setUpdatedTime(LocalDateTime.now());
        roleDTO.setModuleList(this.roleUtil.getModuleList(role));
        return roleDTO;
    }

    public boolean assignRoleUser(RoleDTO roleDTO) {
        RoleDetailsPo roleDetailsPo = new RoleDetailsPo();
        roleDetailsPo.setRoleId(roleDTO.getRoleId());
        this.roleUserMappingRepository.deleteByIdRoleId(roleDetailsPo);
        for (String empId : roleDTO.getEmployeeIDs()) {
            this.removeUserRoleByEmpId(Long.valueOf(empId));
            RoleUserMapping roleUserMapping = new RoleUserMapping(roleDetailsPo, empId);
            this.roleUserMappingRepository.save(roleUserMapping);
            this.auditService.updateAudit("User", roleDetailsPo.getRoleId(), Long.valueOf(empId).longValue(), "User Role Assigned");
        }
        return true;
    }

    public List<PrivilegeDTO> getPrivilegeList() {
        List privilegeDetailsPos = this.privRepository.getPrivilegeList();
        return privilegeDetailsPos.stream().map(privilege -> new PrivilegeDTO(privilege)).collect(Collectors.toList());
    }

    public List<ModuleDTO> getModuleList() {
        List mpDetailsPos = this.moduleRepository.getModuleList();
        return mpDetailsPos.stream().map(module -> new ModuleDTO(module)).collect(Collectors.toList());
    }

    public List<RoleDTO> getUserRoleList(String empId) {
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        List userRoles = this.roleUserMappingRepository.findAllByIdEmpId(employeeProfilePo);
        return userRoles.stream().map(role -> new RoleDTO(role.getId().getRoleId(), true)).collect(Collectors.toList());
    }

    public List<String> getUserList(RoleDetailsPo roleDetailsPo) {
        List userRoles = this.roleUserMappingRepository.findAllByIdRoleId(roleDetailsPo);
        HashSet ids = new HashSet();
        userRoles.stream().filter(mapping -> !ids.add(String.valueOf(mapping.getId().getEmpId().getEmpId()))).collect(Collectors.toSet());
        return new ArrayList<String>(ids);
    }

    public List<Employee> moduleRoleUserList(String moduleName) {
        ArrayList<Employee> employees = new ArrayList<Employee>();
        List modulePillageMappings = null;
        List userRoles = this.roleUserMappingRepository.findAll(this.userRoleManagementRepository.userIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), 0));
        for (RoleUserMapping roleUserMapping : userRoles) {
            modulePillageMappings = this.modulePrivilegeMappingRepo.checkAccess(Long.valueOf(roleUserMapping.getId().getRoleId().getRoleId()), moduleName);
            if (modulePillageMappings.isEmpty() || modulePillageMappings == null) continue;
            employees.add(this.getEmployeeBasicDetails(roleUserMapping.getId().getEmpId()));
        }
        return employees;
    }

    public List<PrivilegeDTO> updateRolePrivileges(Set<PrivilegeDetailsPo> rolePrivilegs, List<PrivilegeDetailsPo> privilegeDetailsPos) {
        if (CollectionUtils.isNotEmpty(rolePrivilegs)) {
            Map<Long, String> privMap = rolePrivilegs.stream().collect(Collectors.toMap(PrivilegeDetailsPo::getPrivilegeId, PrivilegeDetailsPo::getPrivilegeName));
            return privilegeDetailsPos.stream().map(privilege -> {
                PrivilegeDTO privilegeDTO = new PrivilegeDTO(privilege);
                privilegeDTO.setEnabled(privMap.containsKey(privilege.getPrivilegeId()));
                return privilegeDTO;
            }).collect(Collectors.toList());
        }
        return privilegeDetailsPos.stream().map(privilege -> {
            PrivilegeDTO privilegeDTO = new PrivilegeDTO(privilege);
            return privilegeDTO;
        }).collect(Collectors.toList());
    }

    public Map<String, Set<String>> getUserPermissions(long empId) {
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        List userRoles = this.roleUserMappingRepository.findAllByIdEmpId(employeeProfilePo);
        HashMap<String, Set<String>> finalPrivMap = new HashMap<String, Set<String>>();
        HashSet roleDTOS = new HashSet();
        for (RoleUserMapping roleUserMapping : userRoles) {
            RoleDetailsPo roleDetailsPo = roleUserMapping.getId().getRoleId();
            HashSet roleModules = new HashSet(this.privilegeMappingDAO.getModuleList());
            for (String moduleName : roleModules) {
                HashSet privNames = new HashSet(this.getPrivilegeNameList(Long.valueOf(roleDetailsPo.getRoleId()), moduleName));
                if (finalPrivMap.containsKey(moduleName)) {
                    Set existingPrivIds = (Set)finalPrivMap.get(moduleName);
                    existingPrivIds.addAll(privNames);
                    continue;
                }
                HashSet cloneSet = new HashSet();
                cloneSet.addAll(privNames);
                finalPrivMap.put(moduleName, cloneSet);
            }
        }
        this.logger.debug((Object)("user eligible privileges " + finalPrivMap));
        return finalPrivMap;
    }

    public List<Map<String, Object>> getModuleObject(Long roleId) {
        ArrayList<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        List module = this.privilegeMappingDAO.getModuleList();
        for (String moduleName : module) {
            HashMap<String, Object> moduleMap = new HashMap<String, Object>();
            moduleMap.put("moduleName", moduleName);
            moduleMap.put("roleId", roleId);
            List moduleTags = this.privilegeMappingDAO.getModuleTagList(moduleName);
            ArrayList tagMapList = new ArrayList();
            for (String tag : moduleTags) {
                HashMap<String, Object> tagObject = new HashMap<String, Object>();
                tagObject.put("tagName", tag);
                Optional modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(roleId, moduleName, tag);
                if (modulePrivilegeMapping.isPresent()) {
                    tagObject.put("privileges", this.privilegeMappingDAO.getPrivilegesListMap(roleId, moduleName, tag));
                }
                tagMapList.add(tagObject);
            }
            moduleMap.put("tagNameList", tagMapList);
            mapList.add(moduleMap);
        }
        return mapList;
    }

    public Map<String, Object> getParticularModulePermission(Long empId, String moduleName) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        List userRoles = this.roleUserMappingRepository.findAllByIdEmpId(employeeProfilePo);
        HashMap finalPrivMap = new HashMap();
        for (RoleUserMapping roleUserMapping : userRoles) {
            HashMap<String, Map> finalMap = new HashMap<String, Map>();
            RoleDetailsPo roleDetailsPo = roleUserMapping.getId().getRoleId();
            HashSet tagNameList = new HashSet(this.privilegeMappingDAO.getModuleTagList(moduleName));
            for (String tagName : tagNameList) {
                Optional modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(Long.valueOf(roleDetailsPo.getRoleId()), moduleName, tagName);
                if (!modulePrivilegeMapping.isPresent()) continue;
                finalMap.put(tagName, this.privilegeMappingDAO.getPrivilegesListMap(Long.valueOf(roleDetailsPo.getRoleId()), moduleName, tagName));
            }
            finalPrivMap.put(roleDetailsPo.getRoleName(), finalMap);
        }
        if (finalPrivMap.containsKey("Super User")) {
            result.put(moduleName, finalPrivMap.get("Super User"));
        } else if (finalPrivMap.containsKey("Admin")) {
            result.put(moduleName, finalPrivMap.get("Admin"));
        } else if (finalPrivMap.containsKey("Owner")) {
            result.put(moduleName, finalPrivMap.get("Owner"));
        } else if (finalPrivMap.containsKey("User")) {
            result.put(moduleName, finalPrivMap.get("User"));
        }
        this.logger.debug((Object)("user eligible privileges " + finalPrivMap));
        return result;
    }

    public boolean updatePermissions(FindDTO findDTO) {
        if (findDTO.getModuleName().contains("Initiatives")) {
            findDTO.setModuleName("Initiatives & Projects");
        }
        Boolean result = false;
        if (findDTO.getTagName().equalsIgnoreCase("All") || findDTO.getTagName().equalsIgnoreCase("all")) {
            result = this.updateModulePrivilege(findDTO);
        } else {
            RoleDetailsPo roleDetailsPo = (RoleDetailsPo)this.roleRepository.getOne(findDTO.getRoleId());
            Optional modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(findDTO.getRoleId(), findDTO.getModuleName(), findDTO.getTagName());
            if (modulePrivilegeMapping.isPresent()) {
                ModulePrivillageMapping privilageMapping = (ModulePrivillageMapping)modulePrivilegeMapping.get();
                if (findDTO.getPrivilegeName().equalsIgnoreCase("Create")) {
                    privilageMapping.setPrivilegeCreate("TRUE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("Update")) {
                    privilageMapping.setPrivilegeUpdate("TRUE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("View")) {
                    privilageMapping.setPrivilegeView("TRUE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("Delete")) {
                    privilageMapping.setPrivilegeDelete("TRUE");
                }
                this.modulePrivilegeMappingRepo.save(privilageMapping);
                result = true;
            } else {
                Map stringObjectivesMap = this.roleUtil.getPrivilegeList(roleDetailsPo.getRoleName(), findDTO.getModuleName(), findDTO.getTagName());
                ModulePrivillageMapping privilageMapping = new ModulePrivillageMapping();
                privilageMapping.setRoleId(findDTO.getRoleId());
                privilageMapping.setModuleName(findDTO.getModuleName());
                privilageMapping.setModuleId(Long.valueOf(this.moduleRepository.getModuleByName(findDTO.getModuleName(), findDTO.getTagName()).getModuleId()));
                privilageMapping.setTagName(findDTO.getTagName());
                privilageMapping.setActive(0);
                if (stringObjectivesMap.get("Create").toString().equalsIgnoreCase("NA")) {
                    privilageMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                } else {
                    privilageMapping.setPrivilegeCreate("TRUE");
                }
                if (stringObjectivesMap.get("Update").toString().equalsIgnoreCase("NA")) {
                    privilageMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                } else {
                    privilageMapping.setPrivilegeUpdate("TRUE");
                }
                if (stringObjectivesMap.get("View").toString().equalsIgnoreCase("NA")) {
                    privilageMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                } else {
                    privilageMapping.setPrivilegeView("TRUE");
                }
                if (stringObjectivesMap.get("Delete").toString().equalsIgnoreCase("NA")) {
                    privilageMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                } else {
                    privilageMapping.setPrivilegeDelete("TRUE");
                }
                this.modulePrivilegeMappingRepo.save(privilageMapping);
                result = true;
            }
        }
        return result;
    }

    public boolean updateModulePrivilege(FindDTO findDTO) {
        Boolean result = false;
        List modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(findDTO.getRoleId(), findDTO.getModuleName());
        RoleDetailsPo roleDetailsPo = (RoleDetailsPo)this.roleRepository.getOne(findDTO.getRoleId());
        if (modulePrivilegeMapping.isEmpty()) {
            List moduleDTOS = this.moduleRepository.getModuleListByName(findDTO.getModuleName());
            for (ModuleDetailsPo moduleDetailsPo : moduleDTOS) {
                Map stringObjectivesMap = this.roleUtil.getPrivilegeList(roleDetailsPo.getRoleName(), moduleDetailsPo.getModuleName(), moduleDetailsPo.getTagName());
                ModulePrivillageMapping modulePrivillageMapping = new ModulePrivillageMapping();
                modulePrivillageMapping.setModuleId(Long.valueOf(moduleDetailsPo.getModuleId()));
                modulePrivillageMapping.setModuleName(moduleDetailsPo.getModuleName());
                modulePrivillageMapping.setRoleId(findDTO.getRoleId());
                modulePrivillageMapping.setTagName(moduleDetailsPo.getTagName());
                if (stringObjectivesMap.get("Create").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeCreate("TRUE");
                }
                if (stringObjectivesMap.get("Update").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeUpdate("TRUE");
                }
                if (stringObjectivesMap.get("View").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeView("TRUE");
                }
                if (stringObjectivesMap.get("Delete").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeDelete("TRUE");
                }
                this.modulePrivilegeMappingRepo.save(modulePrivillageMapping);
                result = true;
            }
        } else {
            List moduleDTOS = this.moduleRepository.getModuleListByName(findDTO.getModuleName());
            for (ModuleDetailsPo moduleDetailsPo : moduleDTOS) {
                ModulePrivillageMapping modulePrivillageMapping;
                Map stringObjectivesMap;
                Optional check = this.modulePrivilegeMappingRepo.findBy(findDTO.getRoleId(), moduleDetailsPo.getModuleName(), moduleDetailsPo.getTagName());
                if (check.isPresent()) {
                    stringObjectivesMap = this.roleUtil.getPrivilegeList(roleDetailsPo.getRoleName(), moduleDetailsPo.getModuleName(), moduleDetailsPo.getTagName());
                    modulePrivillageMapping = (ModulePrivillageMapping)check.get();
                    modulePrivillageMapping.setModuleId(Long.valueOf(moduleDetailsPo.getModuleId()));
                    modulePrivillageMapping.setModuleName(moduleDetailsPo.getModuleName());
                    modulePrivillageMapping.setRoleId(findDTO.getRoleId());
                    modulePrivillageMapping.setTagName(moduleDetailsPo.getTagName());
                    if (stringObjectivesMap.get("Create").toString().equalsIgnoreCase("NA")) {
                        modulePrivillageMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                    } else {
                        modulePrivillageMapping.setPrivilegeCreate("TRUE");
                    }
                    if (stringObjectivesMap.get("Update").toString().equalsIgnoreCase("NA")) {
                        modulePrivillageMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                    } else {
                        modulePrivillageMapping.setPrivilegeUpdate("TRUE");
                    }
                    if (stringObjectivesMap.get("View").toString().equalsIgnoreCase("NA")) {
                        modulePrivillageMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                    } else {
                        modulePrivillageMapping.setPrivilegeView("TRUE");
                    }
                    if (stringObjectivesMap.get("Delete").toString().equalsIgnoreCase("NA")) {
                        modulePrivillageMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                    } else {
                        modulePrivillageMapping.setPrivilegeDelete("TRUE");
                    }
                    this.modulePrivilegeMappingRepo.save(modulePrivillageMapping);
                    result = true;
                    continue;
                }
                stringObjectivesMap = this.roleUtil.getPrivilegeList(roleDetailsPo.getRoleName(), moduleDetailsPo.getModuleName(), moduleDetailsPo.getTagName());
                modulePrivillageMapping = new ModulePrivillageMapping();
                modulePrivillageMapping.setModuleId(Long.valueOf(moduleDetailsPo.getModuleId()));
                modulePrivillageMapping.setModuleName(moduleDetailsPo.getModuleName());
                modulePrivillageMapping.setRoleId(findDTO.getRoleId());
                modulePrivillageMapping.setTagName(moduleDetailsPo.getTagName());
                if (stringObjectivesMap.get("Create").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeCreate("TRUE");
                }
                if (stringObjectivesMap.get("Update").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeUpdate("TRUE");
                }
                if (stringObjectivesMap.get("View").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeView("TRUE");
                }
                if (stringObjectivesMap.get("Delete").toString().equalsIgnoreCase("NA")) {
                    modulePrivillageMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                } else {
                    modulePrivillageMapping.setPrivilegeDelete("TRUE");
                }
                this.modulePrivilegeMappingRepo.save(modulePrivillageMapping);
            }
        }
        return result;
    }

    public boolean deletePermissions(FindDTO findDTO) {
        if (findDTO.getModuleName().contains("Initiatives")) {
            findDTO.setModuleName("Initiatives & Projects");
        }
        Boolean result = false;
        if (findDTO.getTagName().equalsIgnoreCase("All") || findDTO.getTagName().equalsIgnoreCase("all")) {
            result = this.deleteModulePrivilege(findDTO);
        } else {
            Optional modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(findDTO.getRoleId(), findDTO.getModuleName(), findDTO.getTagName());
            if (modulePrivilegeMapping.isPresent()) {
                this.logger.debug((Object)("user eligible privileges " + modulePrivilegeMapping.get()));
                ModulePrivillageMapping privilageMapping = (ModulePrivillageMapping)modulePrivilegeMapping.get();
                if (findDTO.getPrivilegeName().equalsIgnoreCase("Create")) {
                    privilageMapping.setPrivilegeCreate("FALSE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("Update")) {
                    privilageMapping.setPrivilegeUpdate("FALSE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("View")) {
                    privilageMapping.setPrivilegeView("FALSE");
                } else if (findDTO.getPrivilegeName().equalsIgnoreCase("Delete")) {
                    privilageMapping.setPrivilegeDelete("FALSE");
                }
                this.modulePrivilegeMappingRepo.save(privilageMapping);
                result = true;
            }
        }
        return result;
    }

    public boolean deleteModulePrivilege(FindDTO findDTO) {
        Boolean result = false;
        List modulePrivilegeMapping = this.modulePrivilegeMappingRepo.findBy(findDTO.getRoleId(), findDTO.getModuleName());
        if (!modulePrivilegeMapping.isEmpty()) {
            for (ModulePrivillageMapping module : modulePrivilegeMapping) {
                if (!module.getPrivilegeCreate().equalsIgnoreCase("NA")) {
                    module.setPrivilegeCreate("FALSE");
                }
                if (!module.getPrivilegeUpdate().equalsIgnoreCase("NA")) {
                    module.setPrivilegeUpdate("FALSE");
                }
                if (!module.getPrivilegeView().equalsIgnoreCase("NA")) {
                    module.setPrivilegeView("FALSE");
                }
                if (!module.getPrivilegeDelete().equalsIgnoreCase("NA")) {
                    module.setPrivilegeDelete("FALSE");
                }
                this.modulePrivilegeMappingRepo.save(module);
                result = true;
            }
        }
        return result;
    }

    public Map<String, Object> getdefaultRoles() {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("defaultRoles", this.privilegeMappingDAO.getDefaultRoles());
        return map;
    }

    public Map<String, Object> getCustomRoles() {
        HashMap<String, Object> map = new HashMap<String, Object>();
        List mapList = this.privilegeMappingDAO.getDefaultRoles(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        mapList.addAll(this.privilegeMappingDAO.getCustomRoles(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID"))));
        map.put("defaultRoles", mapList);
        return map;
    }

    public void checkRoles() {
        List roleDetailsPos = this.roleRepository.findAll();
        for (RoleDetailsPo roleDetailsPo : roleDetailsPos) {
            roleDetailsPo.setType(1);
            this.roleRepository.save(roleDetailsPo);
        }
    }

    public void checkRoles(long empId) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        EmployeeProfilePo employee = (EmployeeProfilePo)this.profilePoRepo.getOne(empId);
        List roles = this.repository.findAll();
        for (Roles roles1 : roles) {
            ModulePrivillageMapping privilegeMapping;
            Map stringObjectivesMap;
            List moduleDTOS;
            RoleDetailsPo result;
            RoleDetailsPo roleDetailsPo = null;
            roleDetailsPo = this.roleRepository.getRole(employee.getOrgId().getId(), empId, 0, roles1.getRoleName());
            if (roleDetailsPo != null) {
                roleDetailsPo.setType(0);
                roleDetailsPo.setOrgId(Long.valueOf(employee.getOrgId().getId()));
                roleDetailsPo.setCreatedBy(employee.getEmpId());
                roleDetailsPo.setStatus(0);
                roleDetailsPo.setCreatedTime(LocalDateTime.now());
                roleDetailsPo.setRoleName(roles1.getRoleName());
                result = (RoleDetailsPo)this.roleRepository.save(roleDetailsPo);
                moduleDTOS = this.roleUtil.getModuleList(roles1.getRoleName());
                if (moduleDTOS.isEmpty()) continue;
                for (ModuleDTO moduleDTO : moduleDTOS) {
                    stringObjectivesMap = this.roleUtil.getPrivilegeList(result.getRoleName(), moduleDTO.getModuleName(), moduleDTO.getTagName());
                    privilegeMapping = new ModulePrivillageMapping();
                    privilegeMapping.setModuleId(Long.valueOf(moduleDTO.getModuleId()));
                    privilegeMapping.setModuleName(moduleDTO.getModuleName());
                    privilegeMapping.setTagName(moduleDTO.getTagName());
                    privilegeMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                    privilegeMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                    privilegeMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                    privilegeMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                    privilegeMapping.setRoleId(Long.valueOf(result.getRoleId()));
                    this.modulePrivilegeMappingRepo.save(privilegeMapping);
                }
                continue;
            }
            roleDetailsPo = new RoleDetailsPo();
            roleDetailsPo.setType(0);
            roleDetailsPo.setOrgId(Long.valueOf(employee.getOrgId().getId()));
            roleDetailsPo.setCreatedBy(employee.getEmpId());
            roleDetailsPo.setStatus(0);
            roleDetailsPo.setCreatedTime(LocalDateTime.now());
            roleDetailsPo.setRoleName(roles1.getRoleName());
            result = (RoleDetailsPo)this.roleRepository.save(roleDetailsPo);
            moduleDTOS = this.roleUtil.getModuleList(roles1.getRoleName());
            if (moduleDTOS.isEmpty()) continue;
            for (ModuleDTO moduleDTO : moduleDTOS) {
                if (moduleDTO.getPrivilegeList().isEmpty()) continue;
                stringObjectivesMap = this.roleUtil.getPrivilegeList(result.getRoleName(), moduleDTO.getModuleName(), moduleDTO.getTagName());
                privilegeMapping = new ModulePrivillageMapping();
                privilegeMapping.setModuleId(Long.valueOf(moduleDTO.getModuleId()));
                privilegeMapping.setModuleName(moduleDTO.getModuleName());
                privilegeMapping.setTagName(moduleDTO.getTagName());
                privilegeMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                privilegeMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                privilegeMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                privilegeMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                privilegeMapping.setRoleId(Long.valueOf(result.getRoleId()));
                this.modulePrivilegeMappingRepo.save(privilegeMapping);
            }
        }
    }

    public void deleteRoles(Long roleId) {
        RoleDetailsPo roleDetailsPo = new RoleDetailsPo();
        roleDetailsPo.setRoleId(roleId.longValue());
        this.roleUserMappingRepository.deleteByIdRoleId(roleDetailsPo);
    }

    public List<ModulePrivilegeMappingDTO> checkPermission(FindDTO findDTO) {
        List modulePrivillageMapping;
        boolean result = false;
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(findDTO.getEmpId().longValue());
        Long roleId = null;
        List userRoles = this.roleUserMappingRepository.findAllByIdEmpId(employeeProfilePo);
        for (RoleUserMapping roleUserMapping : userRoles) {
            RoleDetailsPo roleDetailsPo = roleUserMapping.getId().getRoleId();
            if (roleDetailsPo.getRoleName().equalsIgnoreCase("Super User")) {
                roleId = roleDetailsPo.getRoleId();
                break;
            }
            if (roleDetailsPo.getRoleName().equalsIgnoreCase("Admin")) {
                roleId = roleDetailsPo.getRoleId();
                break;
            }
            if (roleDetailsPo.getRoleName().equalsIgnoreCase("Owner")) {
                roleId = roleDetailsPo.getRoleId();
                continue;
            }
            if (roleDetailsPo.getRoleName().equalsIgnoreCase("User")) {
                roleId = roleDetailsPo.getRoleId();
                continue;
            }
            roleId = roleDetailsPo.getRoleId();
        }
        if (CollectionUtils.isNotEmpty((Collection)(modulePrivillageMapping = this.modulePrivilegeMappingRepo.findBy(roleId)))) {
            return modulePrivillageMapping.stream().map(mapping -> new ModulePrivilegeMappingDTO(mapping)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public void checkAllRoles() {
        List roles = this.roleRepository.findAll();
        for (RoleDetailsPo roleDetailsPo : roles) {
            List moduleDTOS = this.roleUtil.getModuleList(roleDetailsPo.getRoleName());
            if (moduleDTOS.isEmpty()) continue;
            for (ModuleDTO moduleDTO : moduleDTOS) {
                Map stringObjectivesMap = this.roleUtil.getPrivilegeList(roleDetailsPo.getRoleName(), moduleDTO.getModuleName(), moduleDTO.getTagName());
                ModulePrivillageMapping privilegeMapping = new ModulePrivillageMapping();
                privilegeMapping.setModuleId(Long.valueOf(moduleDTO.getModuleId()));
                privilegeMapping.setModuleName(moduleDTO.getModuleName());
                privilegeMapping.setTagName(moduleDTO.getTagName());
                privilegeMapping.setPrivilegeCreate(stringObjectivesMap.get("Create").toString());
                privilegeMapping.setPrivilegeUpdate(stringObjectivesMap.get("Update").toString());
                privilegeMapping.setPrivilegeView(stringObjectivesMap.get("View").toString());
                privilegeMapping.setPrivilegeDelete(stringObjectivesMap.get("Delete").toString());
                privilegeMapping.setRoleId(Long.valueOf(roleDetailsPo.getRoleId()));
                this.modulePrivilegeMappingRepo.save(privilegeMapping);
            }
        }
    }

    public List<String> getPrivilegeNameList(Long roleId, String moduleName) {
        ArrayList<String> privileges = new ArrayList<String>();
        List privNames = this.privilegeMappingDAO.getPrivilegesListMap(roleId, moduleName);
        for (Map stringObjectMap : privNames) {
            if (stringObjectMap.get("privilegeCreate").toString().equalsIgnoreCase("TRUE")) {
                privileges.add("Create");
            }
            if (stringObjectMap.get("privilegeUpdate").toString().equalsIgnoreCase("TRUE")) {
                privileges.add("Update");
            }
            if (stringObjectMap.get("privilegeView").toString().equalsIgnoreCase("TRUE")) {
                privileges.add("View");
            }
            if (!stringObjectMap.get("privilegeDelete").toString().equalsIgnoreCase("TRUE")) continue;
            privileges.add("Delete");
        }
        return privileges;
    }

    public Optional<RoleDetailsPo> findByRoleName(String roleName, Long orgId) {
        return this.roleRepository.findByRoleName(orgId.longValue(), roleName, 1);
    }

    public List<Employee> moduleAccessUserList(String moduleName, String tagName) {
        ArrayList<Employee> employees = new ArrayList<Employee>();
        List modulePillageMappings = null;
        List userRoles = this.roleUserMappingRepository.findAll(this.userRoleManagementRepository.userIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), 0));
        for (RoleUserMapping roleUserMapping : userRoles) {
            modulePillageMappings = StringUtils.isNotEmpty((CharSequence)moduleName) && StringUtils.isNotEmpty((CharSequence)tagName) ? this.modulePrivilegeMappingRepo.checkAccess(Long.valueOf(roleUserMapping.getId().getRoleId().getRoleId()), moduleName, tagName) : this.modulePrivilegeMappingRepo.checkAccess(Long.valueOf(roleUserMapping.getId().getRoleId().getRoleId()), moduleName);
            if (modulePillageMappings.isEmpty() || modulePillageMappings == null) continue;
            employees.add(this.getEmployeeBasicDetails(roleUserMapping.getId().getEmpId()));
        }
        return employees;
    }

    public Employee getEmployeeBasicDetails(EmployeeProfilePo employeeProfilePo) {
        Employee employee = new Employee();
        employee.setEmpId(employeeProfilePo.getEmpId());
        employee.setFirstName(employeeProfilePo.getFirstName());
        employee.setLastName(employeeProfilePo.getLastName());
        employee.setProfileImage(employeeProfilePo.getProfileImage());
        employee.setEmailAddress(employeeProfilePo.getEmailAddress());
        return employee;
    }
}

