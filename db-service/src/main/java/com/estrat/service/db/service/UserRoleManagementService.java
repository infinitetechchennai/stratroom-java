/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.DepartmentChartMapping
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.EmployeeCredentialsPo
 *  com.estrat.service.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.OrgDetails
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.bean.po.RoleUserMapping
 *  com.estrat.service.db.bean.po.UserDeptMapping
 *  com.estrat.service.db.bean.po.UserRoleManagement
 *  com.estrat.service.db.dao.EmployeeDAO
 *  com.estrat.service.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.service.db.dao.UserRoleManagementRepository
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.FindDTO
 *  com.estrat.service.db.dto.UserDTO
 *  com.estrat.service.db.exception.InputValidationException
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.service.db.repository.EmployeeProfilePoRepo
 *  com.estrat.service.db.repository.RoleRepository
 *  com.estrat.service.db.repository.RoleUserMappingRepository
 *  com.estrat.service.db.repository.UserDeptMappingRepository
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.OrgDetailsService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.DepartmentChartMapping;
import com.estrat.service.db.bean.po.DepartmentDetails;
import com.estrat.service.db.bean.po.EmployeeCredentialsPo;
import com.estrat.service.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.OrgDetails;
import com.estrat.service.db.bean.po.RoleDetailsPo;
import com.estrat.service.db.bean.po.RoleUserMapping;
import com.estrat.service.db.bean.po.UserDeptMapping;
import com.estrat.service.db.bean.po.UserRoleManagement;
import com.estrat.service.db.dao.EmployeeDAO;
import com.estrat.service.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.service.db.dao.UserRoleManagementRepository;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.FindDTO;
import com.estrat.service.db.dto.UserDTO;
import com.estrat.service.db.exception.InputValidationException;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.service.db.repository.EmployeeProfilePoRepo;
import com.estrat.service.db.repository.RoleRepository;
import com.estrat.service.db.repository.RoleUserMappingRepository;
import com.estrat.service.db.repository.UserDeptMappingRepository;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.OrgDetailsService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleManagementService {
    @Autowired
    protected RoleRepository roleRepository;
    @Autowired
    protected UserRoleManagementRepository userRoleManagementRepository;
    @Autowired
    protected OrgDetailsService orgDetailsService;
    @Autowired
    protected EmployeeProfilePoRepo profilePoRepo;
    @Autowired
    protected EmployeeDAO employeeDAO;
    @Autowired
    protected RoleUserMappingRepository roleusermappingrepo;
    @Autowired
    protected AuditDetailsService auditService;
    @Autowired
    protected UserDeptMappingRepository userDeptMappingRepository;
    @Autowired
    protected DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected EmployeeDepartmentMappingRepository employeeDepartmentMappingRepository;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMappingRepository;
    @Autowired
    protected DeptMultipleOwnersMappingRepository multipleOwnersMappingRepository;

    public UserDTO saveUserRole(UserDTO userDTO) {
        DepartmentDetails departmentDetails;
        boolean status = false;
        UserRoleManagement check = this.userRoleManagementRepository.findBy(userDTO.getEmailAddress(), userDTO.getStatus(), 0);
        if (check != null) {
            throw new InputValidationException("Email already exist");
        }
        RoleDetailsPo roledetails = (RoleDetailsPo)this.roleRepository.getOne(userDTO.getRoleId());
        if (roledetails != null) {
            userDTO.setUserRole(roledetails.getRoleName());
        }
        UserRoleManagement userRoleManagement = new UserRoleManagement(userDTO);
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo(userDTO);
        employeeProfilePo.setCreateVia("UserModule");
        this.populateDept(employeeProfilePo, userDTO);
        EmployeeProfilePo profilePo = new EmployeeProfilePo();
        EmployeeProfilePo profilePo_exist = this.profilePoRepo.findByEmail(userDTO.getEmailAddress(), userDTO.getOrgId(), "Active");
        if (profilePo_exist == null) {
            EmployeeProfilePo profilePo_add;
            employeeProfilePo.setCreatedDate(LocalDateTime.now());
            profilePo = profilePo_add = (EmployeeProfilePo)this.profilePoRepo.save(employeeProfilePo);
            this.updateOwner(profilePo);
            status = true;
        } else {
            profilePo = profilePo_exist;
            this.updateProfile(employeeProfilePo, profilePo);
        }
        EmployeeCredentialsPo employeeCredentialsPo = new EmployeeCredentialsPo();
        employeeCredentialsPo.setDeptId(profilePo.getDeptId());
        employeeCredentialsPo.setEmpId(profilePo.getEmpId());
        employeeCredentialsPo.setEmailAddress(profilePo.getEmailAddress());
        employeeCredentialsPo.setOrgId(profilePo.getOrgId());
        employeeCredentialsPo.setPassword(userDTO.getPassword());
        employeeCredentialsPo.setStatus("Active");
        employeeCredentialsPo.setUserName(profilePo.getEmailAddress());
        this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
        userRoleManagement.setUserAccess(1);
        userRoleManagement.setEmpId(profilePo.getEmpId());
        userRoleManagement.setActive(0);
        UserRoleManagement roleManagement = (UserRoleManagement)this.userRoleManagementRepository.save(userRoleManagement);
        UserDTO response = new UserDTO(roleManagement);
        List userDeptMappingList = this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(profilePo.getEmpId()));
        ArrayList<String> deptIds = null;
        if (userDeptMappingList != null && userDeptMappingList.isEmpty()) {
            deptIds = new ArrayList<String>(Arrays.asList(userDTO.getDeptIds().split("\\,")));
            for (String string : deptIds) {
                if (!StringUtils.isNotEmpty((CharSequence)string)) continue;
                departmentDetails = this.departmentDetailsRepository.findById(Long.valueOf(string), "Active");
                UserDeptMapping userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                this.userDeptMappingRepository.save(userDeptMapping);
                this.updateDeptMapping(Long.valueOf(response.getUserId()), string, Long.valueOf(response.getCreatedBy()), response.getName());
            }
        } else {
            this.userDeptMappingRepository.deleteAll((Iterable)userDeptMappingList);
            deptIds = new ArrayList<String>(Arrays.asList(userDTO.getDeptIds().split("\\,")));
            for (String string : deptIds) {
                if (!StringUtils.isNotEmpty((CharSequence)string)) continue;
                departmentDetails = this.departmentDetailsRepository.findById(Long.valueOf(string), "Active");
                Optional checkDeptMapping = this.userDeptMappingRepository.findByIds(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                if (!checkDeptMapping.isPresent()) {
                    UserDeptMapping userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                    this.userDeptMappingRepository.save(userDeptMapping);
                }
                this.updateDeptMapping(Long.valueOf(response.getUserId()), string, Long.valueOf(response.getCreatedBy()), response.getName());
            }
        }
        if (status) {
            this.auditService.saveAudit("User", response.getUserId(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Created");
        } else {
            this.auditService.saveAudit("User", response.getUserId(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Modified");
        }
        if (roledetails != null && roledetails.getRoleId() != 0L) {
            List roleUserMappings = this.roleusermappingrepo.findAllByIdEmpId(profilePo);
            if (!roleUserMappings.isEmpty() && roleUserMappings != null) {
                for (RoleUserMapping roleUserMapping : roleUserMappings) {
                    this.roleusermappingrepo.delete((Object)roleUserMapping);
                }
            }
        } else {
            throw new InputValidationException("Role doesn't exist");
        }
        RoleUserMapping roleUserMapping = new RoleUserMapping(Long.valueOf(roledetails.getRoleId()), Long.valueOf(profilePo.getEmpId()));
        this.roleusermappingrepo.save(roleUserMapping);
        this.auditService.saveAudit("User", profilePo.getEmpId(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Role Assigned");
        response.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(response.getUserId()))));
        return response;
    }

    public void populateDept(EmployeeProfilePo employeeProfilePo, UserDTO userDTO) {
        employeeProfilePo.setOrgId((OrgDetails)this.orgDetailsService.findById(userDTO.getOrgId()).get());
    }

    public void updateProfile(EmployeeProfilePo employeeProfilePo, EmployeeProfilePo updateProfile) {
        updateProfile.setFirstName(employeeProfilePo.getFirstName());
        updateProfile.setLocation(employeeProfilePo.getLocation());
        updateProfile.setPhoneNumber(employeeProfilePo.getPhoneNumber());
        updateProfile.setStatus(employeeProfilePo.getStatus());
        updateProfile.setProfileImage(employeeProfilePo.getProfileImage());
        updateProfile.setUpdatedDate(LocalDateTime.now());
        updateProfile.setCreateVia(employeeProfilePo.getCreateVia());
        this.profilePoRepo.saveAndFlush((Object)updateProfile);
        this.updateOwner(updateProfile);
    }

    public void updateOwner(EmployeeProfilePo updateProfile) {
        List employeeDepartmentMappingList = this.employeeDepartmentMappingRepository.findByEmpId(updateProfile.getEmpId());
        for (EmployeeDepartmentMapping employeeDepartmentMapping : employeeDepartmentMappingList) {
            employeeDepartmentMapping.setFirstName(updateProfile.getFirstName());
            this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping);
        }
    }

    public List<UserDTO> getUserList(FindDTO findDTO) {
        List dbList = null;
        dbList = findDTO.getOrgId() != 0L && findDTO.getRoles() != null && findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty() && !findDTO.getRoles().isEmpty() && findDTO.getStatus() != null ? this.userRoleManagementRepository.findBy(findDTO.getOrgId(), findDTO.getDeptIds(), findDTO.getRoles(), findDTO.getStatus(), 0) : this.userRoleManagementRepository.findBy(findDTO.getOrgId(), 0);
        return dbList.stream().map(dbValue -> {
            UserDTO userDTO = new UserDTO(dbValue);
            userDTO.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(userDTO.getUserId()))));
            return userDTO;
        }).collect(Collectors.toList());
    }

    public List<UserDTO> getFindUserList(FindDTO findDTO) {
        List empIds = null;
        if (findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty()) {
            empIds = this.userDeptMappingRepository.findAllByDeptIds(findDTO.getDeptIds());
        }
        List dbList = null;
        dbList = findDTO.getRoles() != null && findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty() && !findDTO.getRoles().isEmpty() && findDTO.getStatus() != null ? (findDTO.getStatus().equalsIgnoreCase("All") ? this.userRoleManagementRepository.findBy(findDTO.getOrgId(), 0) : this.userRoleManagementRepository.findByEmpId(findDTO.getOrgId(), empIds, findDTO.getRoles(), findDTO.getStatus(), 0)) : (findDTO.getRoles() != null && !findDTO.getRoles().isEmpty() && findDTO.getDeptIds() == null && findDTO.getStatus() == null ? this.userRoleManagementRepository.findByOrgIdANDRoles(findDTO.getOrgId(), findDTO.getRoles(), 0) : (findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty() && findDTO.getRoles() == null && findDTO.getStatus() == null ? this.userRoleManagementRepository.findByOrgIdANDEmpIds(findDTO.getOrgId(), empIds, 0) : (findDTO.getStatus() != null && findDTO.getDeptIds() == null && findDTO.getRoles() == null ? (findDTO.getStatus().equalsIgnoreCase("All") ? this.userRoleManagementRepository.findBy(findDTO.getOrgId(), 0) : this.userRoleManagementRepository.findByStatus(findDTO.getOrgId(), findDTO.getStatus(), 0)) : (findDTO.getRoles() != null && !findDTO.getRoles().isEmpty() && findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty() && findDTO.getStatus() == null ? this.userRoleManagementRepository.findByDeptIdAndRoles(findDTO.getOrgId(), empIds, findDTO.getRoles(), 0) : (findDTO.getRoles() != null && !findDTO.getRoles().isEmpty() && findDTO.getDeptIds() == null && findDTO.getStatus() != null ? (findDTO.getStatus().equalsIgnoreCase("All") ? this.userRoleManagementRepository.findByOrgIdANDRoles(findDTO.getOrgId(), findDTO.getRoles(), 0) : this.userRoleManagementRepository.findByRolesANDStatus(findDTO.getOrgId(), findDTO.getRoles(), findDTO.getStatus(), 0)) : (findDTO.getRoles() == null && findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty() && findDTO.getStatus() != null ? (findDTO.getStatus().equalsIgnoreCase("All") ? this.userRoleManagementRepository.findByOrgIdANDEmpIds(findDTO.getOrgId(), empIds, 0) : this.userRoleManagementRepository.findByDeptIdAndStatus(findDTO.getOrgId(), empIds, findDTO.getStatus(), 0)) : this.userRoleManagementRepository.findBy(findDTO.getOrgId(), 0)))))));
        return dbList.stream().map(dbValue -> {
            UserDTO userDTO = new UserDTO(dbValue);
            userDTO.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(userDTO.getUserId()))));
            return userDTO;
        }).collect(Collectors.toList());
    }

    public List<UserDTO> getSearchUserList(FindDTO findDTO) {
        List empIds = null;
        Collection dbList = null;
        if (findDTO.getDeptIds() != null && !findDTO.getDeptIds().isEmpty()) {
            empIds = this.userDeptMappingRepository.findAllByDeptIds(findDTO.getDeptIds());
            dbList = this.userRoleManagementRepository.findByOrgIdANDEmpIds(findDTO.getOrgId(), empIds, 0);
        } else if (findDTO.getRoles() != null && !findDTO.getRoles().isEmpty()) {
            dbList = this.userRoleManagementRepository.findByOrgIdANDRoles(findDTO.getOrgId(), findDTO.getRoles(), 0);
        } else if (findDTO.getStatus() != null) {
            dbList = this.userRoleManagementRepository.findByStatus(findDTO.getOrgId(), findDTO.getStatus(), 0);
        } else if (findDTO.getNames() != null) {
            dbList = this.userRoleManagementRepository.findByNames(findDTO.getOrgId(), findDTO.getNames(), 0);
        } else if (findDTO.getDesignations() != null) {
            dbList = this.userRoleManagementRepository.findByDesignations(findDTO.getOrgId(), findDTO.getDesignations(), 0);
        }
        return dbList.stream().map(dbValue -> {
            UserDTO userDTO = new UserDTO(dbValue);
            userDTO.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(userDTO.getUserId()))));
            return userDTO;
        }).collect(Collectors.toList());
    }

    public Set<DeptDetails> updateDeptList(Long empId) {
        ArrayList ids = new ArrayList();
        ids.addAll(this.userDeptMappingRepository.findAllDeptIdByEmpId(empId));
        ids.addAll(this.multipleOwnersMappingRepository.findAllDeptIdByEmpId(empId));
        if (ids.isEmpty()) {
            return new HashSet<DeptDetails>();
        }
        List departmentDetailsList = this.departmentDetailsRepository.findAll(ids);
        if (!departmentDetailsList.isEmpty()) {
            return departmentDetailsList.stream().map(dept -> new DeptDetails(dept)).collect(Collectors.toSet());
        }
        return new HashSet<DeptDetails>();
    }

    public UserDTO updateUserRole(UserDTO userDTO) {
        Object roledetails;
        EmployeeCredentialsPo employeeCredentialsPo;
        UserRoleManagement userRoleManagement = new UserRoleManagement(userDTO);
        userRoleManagement.setActive(0);
        userRoleManagement.setUserAccess(1);
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo(userDTO);
        employeeProfilePo.setCreateVia("UserModule");
        this.populateDept(employeeProfilePo, userDTO);
        EmployeeProfilePo profilePo = new EmployeeProfilePo();
        EmployeeProfilePo profilePo_exist = this.profilePoRepo.findByEmail(userDTO.getEmailAddress(), userDTO.getOrgId(), "Active");
        if (profilePo_exist == null) {
            EmployeeProfilePo profilePo_add;
            employeeProfilePo.setCreatedDate(LocalDateTime.now());
            profilePo = profilePo_add = (EmployeeProfilePo)this.profilePoRepo.save(employeeProfilePo);
            this.updateOwner(profilePo);
        } else {
            profilePo = profilePo_exist;
            this.updateProfile(employeeProfilePo, profilePo);
        }
        UserRoleManagement userroleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(userDTO.getUserId()));
        if (!userroleManagement.getRole().equals(userDTO.getUserRole())) {
            this.auditService.saveAudit("User", profilePo.getEmpId(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Role Assigned");
        }
        List userDeptMappingList = this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(profilePo.getEmpId()));
        if (userDTO.getDeptIds() != null && !userDTO.getDeptIds().isEmpty() || userDTO.getDeptValue() != null && !userDTO.getDeptValue().isEmpty()) {
            ArrayList<String> deptIds;
            Optional employeeDepartmentMapping;
            UserDeptMapping userDeptMapping;
            Object departmentDetails;
            if (userDTO.getDeptValue() != null) {
                Long deptId;
                ArrayList<String> deptUniqueIdList;
                if (userDeptMappingList != null && !userDeptMappingList.isEmpty()) {
                    deptUniqueIdList = new ArrayList<String>(Arrays.asList(userDTO.getDeptValue().split("\\,")));
                    for (String deptUniqueId : deptUniqueIdList) {
                        if (!StringUtils.isNotEmpty((CharSequence)deptUniqueId) || (departmentDetails = this.departmentDetailsRepository.findByDeptUniqueIdANDOrgID(deptUniqueId, userDTO.getOrgId())) == null) continue;
                        userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                        this.userDeptMappingRepository.save(userDeptMapping);
                        deptId = departmentDetails.getId();
                        this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), deptId.toString(), Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                    }
                } else {
                    for (Object userDeptMapping2 : userDeptMappingList) {
                        employeeDepartmentMapping = this.employeeDepartmentMappingRepository.findByEmpIDAndDeptId(userDeptMapping2.getEmpId().longValue(), userDeptMapping2.getDeptId().longValue(), "Active");
                        if (employeeDepartmentMapping.isPresent()) {
                            this.employeeDepartmentMappingRepository.delete(employeeDepartmentMapping.get());
                        }
                        this.userDeptMappingRepository.delete(userDeptMapping2);
                    }
                    deptUniqueIdList = new ArrayList<String>(Arrays.asList(userDTO.getDeptValue().split("\\,")));
                    for (String deptUniqueId : deptUniqueIdList) {
                        if (!StringUtils.isNotEmpty((CharSequence)deptUniqueId) || (departmentDetails = this.departmentDetailsRepository.findByDeptUniqueIdANDOrgID(deptUniqueId, userDTO.getOrgId())) == null) continue;
                        userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                        this.userDeptMappingRepository.save(userDeptMapping);
                        deptId = departmentDetails.getId();
                        this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), deptId.toString(), Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                    }
                }
            } else if (userDeptMappingList != null && !userDeptMappingList.isEmpty()) {
                for (Object userDeptMapping2 : userDeptMappingList) {
                    employeeDepartmentMapping = this.employeeDepartmentMappingRepository.findByEmpIDAndDeptId(userDeptMapping2.getEmpId().longValue(), userDeptMapping2.getDeptId().longValue(), "Active");
                    if (employeeDepartmentMapping.isPresent()) {
                        this.employeeDepartmentMappingRepository.delete(employeeDepartmentMapping.get());
                    }
                    this.userDeptMappingRepository.delete(userDeptMapping2);
                }
                deptIds = new ArrayList<String>(Arrays.asList(userDTO.getDeptIds().split("\\,")));
                for (String departmentId : deptIds) {
                    if (!StringUtils.isNotEmpty((CharSequence)departmentId)) continue;
                    departmentDetails = this.departmentDetailsRepository.findById(Long.valueOf(departmentId), "Active");
                    userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                    this.userDeptMappingRepository.save(userDeptMapping);
                    this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), departmentId, Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                }
            } else {
                deptIds = new ArrayList<String>(Arrays.asList(userDTO.getDeptIds().split("\\,")));
                for (String departmentId : deptIds) {
                    if (!StringUtils.isNotEmpty((CharSequence)departmentId)) continue;
                    departmentDetails = this.departmentDetailsRepository.findById(Long.valueOf(departmentId), "Active");
                    userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                    this.userDeptMappingRepository.save(userDeptMapping);
                    this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), departmentId, Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                }
            }
        }
        if ((employeeCredentialsPo = this.employeeDAO.getEmployeeCredentialsWithNoStatus(Long.valueOf(profilePo.getEmpId()))) == null) {
            employeeCredentialsPo = new EmployeeCredentialsPo();
            employeeCredentialsPo.setPassword(userDTO.getPassword());
            employeeCredentialsPo.setCreatedDate(LocalDateTime.now());
        } else {
            employeeCredentialsPo.setUpdatedDate(LocalDateTime.now());
        }
        employeeCredentialsPo.setDeptId(profilePo.getDeptId());
        employeeCredentialsPo.setEmpId(profilePo.getEmpId());
        employeeCredentialsPo.setEmailAddress(profilePo.getEmailAddress());
        employeeCredentialsPo.setOrgId(profilePo.getOrgId());
        if (userDTO.getLoginStatus() != null && userDTO.getLoginStatus().equalsIgnoreCase("Access")) {
            employeeCredentialsPo.setStatus("Active");
        } else {
            employeeCredentialsPo.setStatus(userDTO.getStatus());
        }
        employeeCredentialsPo.setUserName(profilePo.getEmailAddress());
        this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
        if (userDTO.getRoleId() != null) {
            roledetails = (RoleDetailsPo)this.roleRepository.getOne(userDTO.getRoleId());
            if (roledetails != null) {
                userRoleManagement.setRole(roledetails.getRoleName());
                userRoleManagement.setRoleId(Long.valueOf(roledetails.getRoleId()));
            }
        } else {
            roledetails = this.roleRepository.getRoleinfo(userDTO.getOrgId(), 0, userDTO.getUserRole());
            if (roledetails != null && roledetails.size() > 0 && ((RoleDetailsPo)roledetails.get(0)).getRoleId() != 0L) {
                userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roledetails.get(0)).getRoleId()));
                userRoleManagement.setRole(((RoleDetailsPo)roledetails.get(0)).getRoleName());
                List roleUserMappings = this.roleusermappingrepo.findAllByIdEmpId(profilePo);
                if (!roleUserMappings.isEmpty() && roleUserMappings != null) {
                    for (RoleUserMapping roleUserMapping : roleUserMappings) {
                        this.roleusermappingrepo.delete((Object)roleUserMapping);
                    }
                }
                RoleUserMapping roleusermap = new RoleUserMapping(Long.valueOf(((RoleDetailsPo)roledetails.get(0)).getRoleId()), Long.valueOf(profilePo.getEmpId()));
                this.roleusermappingrepo.save(roleusermap);
            } else {
                throw new InputValidationException("Role doesn't exist");
            }
        }
        UserRoleManagement responseRole = (UserRoleManagement)this.userRoleManagementRepository.save(userRoleManagement);
        UserDTO response = new UserDTO(responseRole);
        this.updateRole(response);
        response.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(response.getUserId()))));
        this.auditService.saveAudit("User", response.getUserId(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Modified");
        return response;
    }

    public void removeUserRole(Long id) {
        UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(id);
        EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo)this.profilePoRepo.getOne(id);
        employeeProfilePo.setStatus("InActive");
        this.profilePoRepo.save(employeeProfilePo);
        this.userDeptMappingRepository.deleteAll((Iterable)this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(employeeProfilePo.getEmpId())));
        EmployeeCredentialsPo employeeCredentialsPo = this.employeeDAO.getEmployeeCredentialsWithNoStatus(id);
        employeeCredentialsPo.setStatus("InActive");
        this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
        userRoleManagement.setActive(1);
        this.deleteOwnerMapping(id);
        this.roleusermappingrepo.deleterolemap(Long.valueOf(employeeProfilePo.getUserRole()), Long.valueOf(employeeProfilePo.getEmpId()));
        this.auditService.saveAudit("User", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "User Deleted");
        this.userRoleManagementRepository.save(userRoleManagement);
    }

    public UserDTO findById(Long id) {
        UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(id);
        if (userRoleManagement != null) {
            UserDTO response = new UserDTO(userRoleManagement);
            response.setDepartmentList(new ArrayList(this.updateDeptList(Long.valueOf(response.getUserId()))));
            return response;
        }
        return null;
    }

    public void deleteOwnerMapping(Long id) {
        List departmentChartMappings = this.departmentChartMappingRepository.findOwnerList(id);
        if (!departmentChartMappings.isEmpty()) {
            for (DepartmentChartMapping departmentChartMapping : departmentChartMappings) {
                departmentChartMapping.setEmailAddress(null);
                departmentChartMapping.setOwner(null);
            }
        }
    }

    public void createBulkUser(UserDTO userDTO, Long userId) {
        userDTO.setCreatedDate(LocalDateTime.now());
        UserRoleManagement check = this.userRoleManagementRepository.findBy(userDTO.getEmailAddress(), userDTO.getStatus(), 0);
        if (check != null) {
            userDTO.setUpdatedDate(LocalDateTime.now());
            userDTO.setUpdatedBy(userDTO.getCreatedBy());
            userDTO.setUserId(check.getEmpId());
            this.updateUserRole(userDTO);
        } else {
            List roledetails;
            UserRoleManagement userRoleManagement = new UserRoleManagement(userDTO);
            EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo(userDTO);
            employeeProfilePo.setCreateVia("UserModule");
            this.populateDept(employeeProfilePo, userDTO);
            EmployeeProfilePo profilePo = (EmployeeProfilePo)this.profilePoRepo.save(employeeProfilePo);
            this.updateOwner(profilePo);
            EmployeeCredentialsPo employeeCredentialsPo = this.employeeDAO.getEmployeeCredentialsWithNoStatus(Long.valueOf(profilePo.getEmpId()));
            if (employeeCredentialsPo == null) {
                employeeCredentialsPo = new EmployeeCredentialsPo();
                employeeCredentialsPo.setPassword(userDTO.getPassword());
            }
            employeeCredentialsPo.setDeptId(profilePo.getDeptId());
            employeeCredentialsPo.setEmpId(profilePo.getEmpId());
            employeeCredentialsPo.setEmailAddress(profilePo.getEmailAddress());
            employeeCredentialsPo.setOrgId(profilePo.getOrgId());
            employeeCredentialsPo.setStatus("Active");
            employeeCredentialsPo.setUserName(profilePo.getEmailAddress());
            this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
            userRoleManagement.setEmpId(profilePo.getEmpId());
            userRoleManagement.setUserAccess(1);
            if (userDTO.getDeptValue() != null && !userDTO.getDeptValue().isEmpty()) {
                ArrayList<String> deptUniqueIdList;
                List userDeptMappingList = this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(profilePo.getEmpId()));
                if (userDeptMappingList == null && userDeptMappingList.isEmpty()) {
                    deptUniqueIdList = new ArrayList<String>(Arrays.asList(userDTO.getDeptValue().split("\\,")));
                    for (String deptUniqueId : deptUniqueIdList) {
                        DepartmentDetails departmentDetails;
                        if (!StringUtils.isNotEmpty((CharSequence)deptUniqueId) || (departmentDetails = this.departmentDetailsRepository.findByDeptUniqueIdANDOrgID(deptUniqueId, userDTO.getOrgId())) == null) continue;
                        UserDeptMapping userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                        this.userDeptMappingRepository.save(userDeptMapping);
                        Long deptId = departmentDetails.getId();
                        this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), deptId.toString(), Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                    }
                } else {
                    this.userDeptMappingRepository.deleteAll((Iterable)userDeptMappingList);
                    deptUniqueIdList = new ArrayList<String>(Arrays.asList(userDTO.getDeptValue().split("\\,")));
                    for (String deptUniqueId : deptUniqueIdList) {
                        DepartmentDetails departmentDetails;
                        if (!StringUtils.isNotEmpty((CharSequence)deptUniqueId) || (departmentDetails = this.departmentDetailsRepository.findByDeptUniqueIdANDOrgID(deptUniqueId, userDTO.getOrgId())) == null) continue;
                        UserDeptMapping userDeptMapping = new UserDeptMapping(Long.valueOf(profilePo.getEmpId()), Long.valueOf(departmentDetails.getId()));
                        this.userDeptMappingRepository.save(userDeptMapping);
                        Long deptId = departmentDetails.getId();
                        this.updateDeptMapping(Long.valueOf(profilePo.getEmpId()), deptId.toString(), Long.valueOf(userDTO.getUserId()), profilePo.getFirstName());
                    }
                }
            }
            if ((roledetails = this.roleRepository.getRoleinfo(userDTO.getOrgId(), 0, userDTO.getUserRole())) == null || roledetails.size() <= 0 || ((RoleDetailsPo)roledetails.get(0)).getRoleId() == 0L) {
                throw new InputValidationException("Role doesn't exist");
            }
            userRoleManagement.setRole(((RoleDetailsPo)roledetails.get(0)).getRoleName());
            userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roledetails.get(0)).getRoleId()));
            RoleUserMapping roleusermap = new RoleUserMapping(Long.valueOf(((RoleDetailsPo)roledetails.get(0)).getRoleId()), Long.valueOf(profilePo.getEmpId()));
            this.roleusermappingrepo.save(roleusermap);
            this.auditService.saveAudit("User", profilePo.getEmpId(), userId.longValue(), "User Role Assigned");
            UserDTO response = new UserDTO((UserRoleManagement)this.userRoleManagementRepository.save(userRoleManagement));
            this.auditService.saveAudit("User", response.getUserId(), userId.longValue(), "User Created");
        }
    }

    public void saveUserRoleManagement(Employee employee, String type) {
        Optional check = this.userRoleManagementRepository.findById(employee.getEmpId());
        if (!check.isPresent()) {
            check = this.userRoleManagementRepository.findByEmail(Long.valueOf(employee.getOrgDetails().getOrgId()), employee.getEmailAddress(), 0);
        }
        if (!check.isPresent()) {
            EmployeeProfilePo employeeProfilePo;
            List roleUserMappings;
            UserDeptMapping userDeptMapping;
            UserRoleManagement userRoleManagement = new UserRoleManagement();
            userRoleManagement.setActive(0);
            if (type.equalsIgnoreCase("Create")) {
                userRoleManagement.setStatus("Active");
            } else if (type.equalsIgnoreCase("Update")) {
                userRoleManagement.setStatus("Active");
            } else {
                userRoleManagement.setStatus("Inactive");
            }
            Optional roleDetailsPo = this.roleRepository.getRole(employee.getOrgDetails().getOrgId(), 0, "User");
            if (roleDetailsPo.isPresent()) {
                userRoleManagement.setRole(((RoleDetailsPo)roleDetailsPo.get()).getRoleName());
                userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roleDetailsPo.get()).getRoleId()));
            }
            userRoleManagement.setEmpId(employee.getEmpId());
            userRoleManagement.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
            userRoleManagement.setUpdatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
            userRoleManagement.setCreatedDate(LocalDateTime.now());
            userRoleManagement.setUpdatedDate(LocalDateTime.now());
            userRoleManagement.setDesignation(employee.getTitle());
            userRoleManagement.setLocation(employee.getLocation());
            userRoleManagement.setName(employee.getFirstName());
            userRoleManagement.setProfileImage(employee.getProfileImage());
            userRoleManagement.setEmailAddress(employee.getEmailAddress());
            userRoleManagement.setOrgId(employee.getOrgDetails().getOrgId());
            userRoleManagement.setPhoneNumber(employee.getPhoneNumber());
            userRoleManagement.setLoginStatus("Enable");
            userRoleManagement.setUserAccess(1);
            this.userRoleManagementRepository.save(userRoleManagement);
            if (employee.getDeptDetails() != null && (userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpIdANDDeptId(Long.valueOf(employee.getEmpId()), Long.valueOf(employee.getDeptDetails().getId()))) == null) {
                userDeptMapping = new UserDeptMapping();
                userDeptMapping.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
                userDeptMapping.setEmpId(Long.valueOf(employee.getEmpId()));
                this.userDeptMappingRepository.save(userDeptMapping);
            }
            if (!(roleUserMappings = this.roleusermappingrepo.findAllByIdEmpId(employeeProfilePo = this.employeeDAO.getEmployeeProfile(Long.valueOf(userRoleManagement.getEmpId())))).isEmpty()) {
                for (RoleUserMapping roleUserMapping : roleUserMappings) {
                    this.roleusermappingrepo.delete((Object)roleUserMapping);
                }
            }
            RoleUserMapping userMapping = new RoleUserMapping(userRoleManagement.getRoleId(), Long.valueOf(userRoleManagement.getEmpId()));
            this.roleusermappingrepo.save(userMapping);
        } else {
            EmployeeProfilePo employeeProfilePo;
            List roleUserMappings;
            UserDeptMapping userDeptMapping;
            Optional roleDetailsPo;
            UserRoleManagement userRoleManagement = (UserRoleManagement)check.get();
            if (userRoleManagement.getEmpId() != employee.getEmpId()) {
                this.userRoleManagementRepository.delete((Object)userRoleManagement);
                userRoleManagement = new UserRoleManagement();
            }
            userRoleManagement.setActive(0);
            userRoleManagement.setUserAccess(1);
            if (type.equalsIgnoreCase("Create")) {
                userRoleManagement.setStatus("Active");
            } else if (type.equalsIgnoreCase("Update")) {
                userRoleManagement.setStatus("Active");
            } else {
                userRoleManagement.setStatus("Inactive");
            }
            if (userRoleManagement.getRoleId() == null && userRoleManagement.getRole() == null) {
                roleDetailsPo = this.roleRepository.getRole(employee.getOrgDetails().getOrgId(), 0, "User");
                if (roleDetailsPo.isPresent()) {
                    userRoleManagement.setRole(((RoleDetailsPo)roleDetailsPo.get()).getRoleName());
                    userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roleDetailsPo.get()).getRoleId()));
                }
            } else {
                roleDetailsPo = this.roleRepository.getRole(employee.getOrgDetails().getOrgId(), 0, userRoleManagement.getRole());
                if (roleDetailsPo.isPresent()) {
                    userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roleDetailsPo.get()).getRoleId()));
                }
            }
            userRoleManagement.setEmpId(employee.getEmpId());
            userRoleManagement.setUpdatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
            userRoleManagement.setUpdatedDate(LocalDateTime.now());
            userRoleManagement.setDesignation(employee.getTitle());
            userRoleManagement.setLocation(employee.getLocation());
            userRoleManagement.setName(employee.getFirstName());
            userRoleManagement.setProfileImage(employee.getProfileImage());
            userRoleManagement.setEmailAddress(employee.getEmailAddress());
            userRoleManagement.setOrgId(employee.getOrgDetails().getOrgId());
            userRoleManagement.setPhoneNumber(employee.getPhoneNumber());
            userRoleManagement.setLoginStatus("Enable");
            this.userRoleManagementRepository.save(userRoleManagement);
            if (employee.getDeptDetails() != null && (userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpIdANDDeptId(Long.valueOf(employee.getEmpId()), Long.valueOf(employee.getDeptDetails().getId()))) == null) {
                userDeptMapping = new UserDeptMapping();
                userDeptMapping.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
                userDeptMapping.setEmpId(Long.valueOf(employee.getEmpId()));
                this.userDeptMappingRepository.save(userDeptMapping);
            }
            if (!(roleUserMappings = this.roleusermappingrepo.findAllByIdEmpId(employeeProfilePo = this.employeeDAO.getEmployeeProfile(Long.valueOf(userRoleManagement.getEmpId())))).isEmpty()) {
                for (RoleUserMapping roleUserMapping : roleUserMappings) {
                    this.roleusermappingrepo.delete((Object)roleUserMapping);
                }
            }
            RoleUserMapping userMapping = new RoleUserMapping(userRoleManagement.getRoleId(), Long.valueOf(userRoleManagement.getEmpId()));
            this.roleusermappingrepo.save(userMapping);
        }
    }

    public Long superUserId() {
        System.out.println("USER_ORG_ID === " + Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        Long userId = this.userRoleManagementRepository.findByID(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), 0, 0);
        if (userId != null) {
            return userId;
        }
        return 0L;
    }

    public void updateDeptMapping(Long empId, String departmentId, Long createdBy, String firstName) {
        List employeeDepartmentMappingList = this.employeeDepartmentMappingRepository.findByEmpId(empId.longValue(), "Active");
        if (employeeDepartmentMappingList != null && !employeeDepartmentMappingList.isEmpty()) {
            for (EmployeeDepartmentMapping empMapping : employeeDepartmentMappingList) {
                if (empMapping.getDeptId().toString().equalsIgnoreCase(departmentId)) continue;
                this.employeeService.saveDepartmentChartMapping(empId, Long.valueOf(departmentId), createdBy, firstName);
            }
        } else {
            this.employeeService.saveDepartmentChartMapping(empId, Long.valueOf(departmentId), createdBy, firstName);
        }
    }

    public String getUserRole(long empId) {
        String roleName = null;
        HashMap<String, String> role = new HashMap<String, String>();
        EmployeeProfilePo profilePo = (EmployeeProfilePo)this.profilePoRepo.findById(empId).get();
        List roleUserMappingList = this.roleusermappingrepo.findAllByIdEmpId(profilePo);
        for (RoleUserMapping roleUserMapping : roleUserMappingList) {
            role.put(roleUserMapping.getId().getRoleId().getRoleName(), roleUserMapping.getId().getRoleId().getRoleName());
        }
        if (role.containsKey("Super User")) {
            return (String)role.get("Super User");
        }
        if (role.containsKey("Admin")) {
            return (String)role.get("Admin");
        }
        if (role.containsKey("Owner")) {
            return (String)role.get("Owner");
        }
        if (role.containsKey("User")) {
            return (String)role.get("User");
        }
        return roleName;
    }

    public void updateRole(UserDTO userDTO) {
        EmployeeProfilePo employeeProfilePo = this.employeeDAO.getProfile(Long.valueOf(userDTO.getUserId()));
        List roleUserMappings = this.roleusermappingrepo.findAllByIdEmpId(employeeProfilePo);
        if (!roleUserMappings.isEmpty() && roleUserMappings != null) {
            for (RoleUserMapping roleUserMapping : roleUserMappings) {
                this.roleusermappingrepo.delete((Object)roleUserMapping);
            }
        }
        RoleUserMapping roleUserMapping = new RoleUserMapping(userDTO.roleId, Long.valueOf(userDTO.getUserId()));
        this.roleusermappingrepo.save(roleUserMapping);
    }

    public void removeRole(Long roleId) {
        List employeeProfilePo = this.userRoleManagementRepository.findByRoleId(roleId, 0);
        if (!employeeProfilePo.isEmpty()) {
            for (UserRoleManagement userRoleManagement : employeeProfilePo) {
                Optional roleDetailsPo = this.roleRepository.getRole(userRoleManagement.getOrgId(), 0, "User");
                if (!roleDetailsPo.isPresent()) continue;
                userRoleManagement.setRoleId(Long.valueOf(((RoleDetailsPo)roleDetailsPo.get()).getRoleId()));
                userRoleManagement.setRole(((RoleDetailsPo)roleDetailsPo.get()).getRoleName());
                this.userRoleManagementRepository.save(userRoleManagement);
                RoleUserMapping roleUserMap = new RoleUserMapping(userRoleManagement.getRoleId(), Long.valueOf(userRoleManagement.getEmpId()));
                this.roleusermappingrepo.save(roleUserMap);
            }
        }
    }
}

