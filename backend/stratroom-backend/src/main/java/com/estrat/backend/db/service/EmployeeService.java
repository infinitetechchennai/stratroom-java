/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.OrganizationDetails
 *  com.estrat.backend.db.bean.po.ChildTracker
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.backend.db.bean.po.DeptTracker
 *  com.estrat.backend.db.bean.po.EmployeeCredentialsPo
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.bean.po.EmployeePagesLinkDetails
 *  com.estrat.backend.db.bean.po.EmployeePreferences
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.bean.po.OrgStructureDetails
 *  com.estrat.backend.db.bean.po.OrgTracker
 *  com.estrat.backend.db.bean.po.PreferenceDetails
 *  com.estrat.backend.db.bean.po.RoleUserMapping
 *  com.estrat.backend.db.bean.po.UserDeptMapping
 *  com.estrat.backend.db.bean.po.UserRoleManagement
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.EmployeeDAO
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.backend.db.dao.EmployeePagesLinkDetailsRepository
 *  com.estrat.backend.db.dao.OrgDetailsRepository
 *  com.estrat.backend.db.dao.UserRoleManagementRepository
 *  com.estrat.backend.db.dto.AuthenticateResponseDTO
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  com.estrat.backend.db.dto.DepartmentResponseDetailsDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.DeptImportDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO
 *  com.estrat.backend.db.dto.EmployeePreferencesDTO
 *  com.estrat.backend.db.dto.EmployeeResponseDTO
 *  com.estrat.backend.db.dto.UserDTO
 *  com.estrat.backend.db.exception.ExceptionLogHelper
 *  com.estrat.backend.db.exception.InputValidationException
 *  com.estrat.backend.db.repository.ChildTrackerRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingHisRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsHistoryRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingHisRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.backend.db.repository.DeptTrackerRepository
 *  com.estrat.backend.db.repository.EmployeeCredentialsPoRepo
 *  com.estrat.backend.db.repository.EmployeePreferenceRepository
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.repository.OrgStructureDetailsRepository
 *  com.estrat.backend.db.repository.OrgTrackerRepository
 *  com.estrat.backend.db.repository.RoleUserMappingRepository
 *  com.estrat.backend.db.repository.UserDeptMappingRepository
 *  com.estrat.backend.db.resource.util.CacheUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.DeptTrackerService
 *  com.estrat.backend.db.service.EmployeePagesLinkDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.InitiativesService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.OrgTrackerService
 *  com.estrat.backend.db.service.PageService
 *  com.estrat.backend.db.service.RiskDetailsService
 *  com.estrat.backend.db.service.RoleService
 *  com.estrat.backend.db.service.ScoreCardDetailsService
 *  com.estrat.backend.db.service.UserRoleManagementService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.dao.DataAccessException
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.OrganizationDetails;
import com.estrat.backend.db.bean.po.ChildTracker;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping;
import com.estrat.backend.db.bean.po.DeptTracker;
import com.estrat.backend.db.bean.po.EmployeeCredentialsPo;
import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.backend.db.bean.po.EmployeePagesLinkDetails;
import com.estrat.backend.db.bean.po.EmployeePreferences;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgDetails;
import com.estrat.backend.db.bean.po.OrgStructureDetails;
import com.estrat.backend.db.bean.po.OrgTracker;
import com.estrat.backend.db.bean.po.PreferenceDetails;
import com.estrat.backend.db.bean.po.RoleUserMapping;
import com.estrat.backend.db.bean.po.UserDeptMapping;
import com.estrat.backend.db.bean.po.UserRoleManagement;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.EmployeeDAO;
import com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.backend.db.dao.EmployeePagesLinkDetailsRepository;
import com.estrat.backend.db.dao.OrgDetailsRepository;
import com.estrat.backend.db.dao.UserRoleManagementRepository;
import com.estrat.backend.db.dto.AuthenticateResponseDTO;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DepartmentResponseDetailsDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.DeptImportDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.EmployeeDepartmentMappingDTO;
import com.estrat.backend.db.dto.EmployeePreferencesDTO;
import com.estrat.backend.db.dto.EmployeeResponseDTO;
import com.estrat.backend.db.dto.UserDTO;
import com.estrat.backend.db.exception.ExceptionLogHelper;
import com.estrat.backend.db.exception.InputValidationException;
import com.estrat.backend.db.repository.ChildTrackerRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingHisRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DepartmentDetailsHistoryRepository;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingHisRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.backend.db.repository.DeptTrackerRepository;
import com.estrat.backend.db.repository.EmployeeCredentialsPoRepo;
import com.estrat.backend.db.repository.EmployeePreferenceRepository;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.repository.OrgStructureDetailsRepository;
import com.estrat.backend.db.repository.OrgTrackerRepository;
import com.estrat.backend.db.repository.RoleUserMappingRepository;
import com.estrat.backend.db.repository.UserDeptMappingRepository;
import com.estrat.backend.db.resource.util.CacheUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.DeptTrackerService;
import com.estrat.backend.db.service.EmployeePagesLinkDetailsService;
import com.estrat.backend.db.service.InitiativesService;
import com.estrat.backend.db.service.KPIService;
import com.estrat.backend.db.service.OrgTrackerService;
import com.estrat.backend.db.service.PageService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.estrat.backend.db.service.RoleService;
import com.estrat.backend.db.service.ScoreCardDetailsService;
import com.estrat.backend.db.service.UserRoleManagementService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class EmployeeService {
    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private EmployeeProfilePoRepo employeeProfilePoRepo;
    @Autowired
    private UserRoleManagementRepository userRoleManagementRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private PageService pageService;
    @Autowired
    private EmployeePreferenceRepository preferenceRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private EmployeePagesLinkDetailsService pagesLinkDetailsService;
    @Autowired
    private EmployeeDepartmentMappingRepository employeeDepartmentMappingRepository;
    @Autowired
    private OrgStructureDetailsRepository orgStructureDetailsRepository;
    @Autowired
    private DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    private DepartmentDetailsHistoryRepository departmentDetailsHistoryRepository;
    @Autowired
    private DepartmentChartMappingRepository departmentChartMappingRepository;
    @Autowired
    private DepartmentChartMappingHisRepository departmentChartMappingHistoryRepository;
    @Autowired
    private ScoreCardDetailsService scoreCardDetailsService;
    @Autowired
    private InitiativesService initiativesService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private OrgTrackerService orgTrackerService;
    @Autowired
    private DeptTrackerService deptTrackerService;
    @Autowired
    private OrgDetailsRepository orgDetailsRepository;
    @Autowired
    private UserRoleManagementService userRoleManagementService;
    @Autowired
    private UserDeptMappingRepository userDeptMappingRepository;
    @Autowired
    private DeptMultipleOwnersMappingRepository deptMultipleOwnersMappingRepo;
    @Autowired
    private DeptMultipleOwnersMappingHisRepository deptMultipleOwnersMappingHisRepo;
    @Autowired
    private EmployeeCredentialsPoRepo employeeCredentialsPoRepo;
    @Autowired
    private RoleUserMappingRepository roleUserMappingRepository;
    @Autowired
    private EmployeePagesLinkDetailsRepository linkDetailsRepository;
    @Autowired
    private OrgTrackerRepository orgTrackerRepository;
    @Autowired
    private DeptTrackerRepository deptTrackerRepository;
    @Autowired
    private ChildTrackerRepository childTrackerRepository;
    private Logger log = Logger.getLogger(EmployeeService.class);

    public Employee getEmployee(EmployeeDTO employeeDTO) {
        UserRoleManagement userRoleManagement;
        if (this.dbCache.get((Object)employeeDTO.getEmployeeId(), "dbCache") != null) {
            UserRoleManagement userRoleManagement2;
            this.log.debug((Object)"getEmployee returned from cache");
            Employee employee = (Employee)this.dbCache.get((Object)employeeDTO.getEmployeeId(), "dbCache");
            if (employee.getEmpId() != 0L) {
                employee.setUserRoleName(this.userRoleManagementService.getUserRole(employee.getEmpId()));
            }
            if ((userRoleManagement2 = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()))) != null) {
                employee.setUserAccess(userRoleManagement2.getUserAccess());
            } else {
                employee.setUserAccess(1);
            }
            return employee;
        }
        Employee employee = this.employeeDAO.getEmployee(employeeDTO);
        EmployeeCredentialsPo credentialsPo = this.employeeDAO.getEmployeeCredentials(employeeDTO.getEmployeeId());
        if (credentialsPo != null && credentialsPo.getPassword() != null) {
            employee.setPassword(credentialsPo.getPassword());
        }
        this.log.debug((Object)"getEmployee populated into cache");
        this.dbCache.put((Object)employeeDTO.getEmployeeId(), (Object)employee, "dbCache");
        if (employee.getEmpId() != 0L) {
            employee.setUserRoleName(this.userRoleManagementService.getUserRole(employee.getEmpId()));
        }
        if ((userRoleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()))) != null) {
            employee.setUserAccess(userRoleManagement.getUserAccess());
        } else {
            employee.setUserAccess(1);
        }
        return employee;
    }

    public List<Employee> getEmployee(List<Long> empList) {
        List employeeProfilePos = this.employeeProfilePoRepo.employeeList(empList, "Active");
        List<Employee> employees = (List<Employee>)employeeProfilePos.stream().map(val -> new Employee((com.estrat.backend.db.bean.po.EmployeeProfilePo)val)).collect(java.util.stream.Collectors.toList());
        return employees;
    }

    public Employee getEmployeeByOrg(EmployeeDTO employeeDTO) {
        Employee employee = this.employeeDAO.getEmployee(employeeDTO);
        EmployeeCredentialsPo credentialsPo = this.employeeDAO.getEmployeeCredentials(employeeDTO.getEmployeeId());
        if (credentialsPo != null) {
            employee.setPassword(credentialsPo.getPassword());
        }
        return employee;
    }

    public EmployeeResponseDTO removeEmployee(String employeeID) {
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(Long.valueOf(employeeID).longValue());
        Employee employee = this.getEmployee(employeeDTO);
        List profilePos = this.employeeProfilePoRepo.findChildList(Long.valueOf(employee.getEmpId()));
        if (!profilePos.isEmpty()) {
            for (Object obj : profilePos) { EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo) obj;
                employeeProfilePo.setParentEmpId(employee.getParentEmpId());
                this.employeeProfilePoRepo.save(employeeProfilePo);
                this.updateChildTracker(Long.valueOf(employeeProfilePo.getEmpId()), Long.valueOf(employee.getEmpId()), Long.valueOf(employee.getParentEmpId()), "Employee");
            }
        }
        this.userRoleManagementService.saveUserRoleManagement(employee, "Delete");
        this.orgTrackerService.deleteOrgTrack(employee, Long.valueOf(UserThreadLocal.get()));
        this.auditService.deleteAudit("User", employee.getOrgDetails().getOrgId(), employee.getEmpId(), "Organisation Deleted");
        this.auditService.deleteAudit("User", employee.getOrgDetails().getOrgId(), employee.getEmpId(), "User Inactive");
        this.employeeDAO.removeEmployeeCredentials((long)Integer.valueOf(employeeID).intValue());
        this.employeeDAO.removeEmployeeProfile((long)Integer.valueOf(employeeID).intValue());
        this.updateChildTracker(Long.valueOf(employee.getEmpId()), Long.valueOf(employee.getParentEmpId()), null, "Employee");
        this.removeEmployeeDepartmentMapping(employeeID);
        this.removeOrgStructureDetails(employeeID);
        this.cacheUtil.removeEmployeeCache((Object)employeeID);
        employeeResponseDTO.setEmployeeId((long)Integer.valueOf(employeeID).intValue());
        employeeResponseDTO.setUpdateFlag(true);
        this.cacheUtil.removeEmployeeCache((Object)employeeID);
        return employeeResponseDTO;
    }

    public void removeEmployeeDepartmentMapping(String employeeID) {
        return;
    }

    public void removeOrgStructureDetails(String employeeID) {
        OrgStructureDetails orgStructureDetails = this.orgStructureDetailsRepository.findByMapping(Long.valueOf(employeeID).longValue(), "Active");
        if (orgStructureDetails != null) {  
            orgStructureDetails.setStatus("InActive");
            orgStructureDetails.setEndDate(new Date());
            orgStructureDetails.setUpdatedTime(LocalDateTime.now());
            this.orgStructureDetailsRepository.save(orgStructureDetails);
        }
    }

    public boolean updateParentEmpID(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(employee.getEmpId());
        Employee currentParentEmp = this.getEmployee(employeeDTO);
        Long oldparent = currentParentEmp.getParentEmpId();
        this.cacheUtil.removeEmployeeCache((Object)currentParentEmp.getParentEmpId());
        currentParentEmp.setParentEmpId(employee.getParentEmpId());
        this.employeeDAO.updateParentEmpID(currentParentEmp.getEmpId(), employee.getParentEmpId());
        this.orgTrackerService.updateOrgTrack(currentParentEmp, Long.valueOf(UserThreadLocal.get()));
        this.updateChildTracker(Long.valueOf(employee.getEmpId()), oldparent, Long.valueOf(employee.getParentEmpId()), "Employee");
        this.auditService.updateSuperAudit("User", employee.getSuperCreatedBy(), currentParentEmp.getOrgDetails().getOrgId(), employee.getEmpId(), "User Modified");
        this.cacheUtil.removeEmployeeCache((Object)employee.getEmpId());
        this.cacheUtil.removeEmployeeCache((Object)employee.getParentEmpId());
        return true;
    }

    // public Employee getEmployeeList(EmployeeDTO employeeDTO) {
    //     boolean superUserStatus = false;
    //     Employee employee = this.getEmployeeByOrg(employeeDTO);
    //     if (this.checkRole(employee)) {
    //         superUserStatus = true;
    //         Employee employeeRes = this.getSuperUserEmployeeHierarchyList(employee);
    //         if (employeeRes != null) {
    //             employeeRes.setParentEmpId(0L);
    //             employee = employeeRes;
    //             employee = this.getEmployeeHierarchyList(employee);
    //         } else {
    //             employee = this.getEmployeeHierarchyList(employee);
    //         }
    //     } else {
    //         if (!superUserStatus && !this.checkOrgAccess(employee)) {
    //             employee.setMessage("no OrgStructure Access");
    //         }
    //         employee = this.getEmployeeHierarchyList(employee);
    //     }
    //     if (superUserStatus && employee.getParentEmpId() != 0L) {
    //         employeeDTO.setEmployeeId(employee.getParentEmpId());
    //         Employee parentEmployee = this.getEmployee(employeeDTO);
    //         employee = this.buildParentObject(parentEmployee, employee);
    //     if (employee.getParentEmpId() != 0L) {
    //         long superUser = this.userRoleManagementService.superUserId();
    //         if (this.checkRole(employee)) {
    //             employeeDTO.setEmployeeId(employee.getParentEmpId());
    //             Employee parentEmployee2 = this.getEmployee(employeeDTO);
    //             employee = this.buildParentObject(parentEmployee, employee);
    //         } else if (employee.getParentEmpId() != superUser) {
    //             employeeDTO.setEmployeeId(employee.getParentEmpId());
    //             Employee parentEmployee3 = this.getEmployee(employeeDTO);
    //             employee = this.buildParentObjectStoppingAtSuperUser(parentEmployee, employee, superUser);
    //         } else {
    //             // Logged-in user reports to the system super-user account — hide that node.
    //             employee.setParentEmpId(0L);
    //         }
    //     }
    //     this.log.debug((Object)"employeeList populated into cache");
    //     return employee;
    // }
    // }


    public Employee getEmployeeList(EmployeeDTO employeeDTO) {
    boolean superUserStatus = false;
    Employee employee = this.getEmployeeByOrg(employeeDTO);
    if (this.checkRole(employee)) {
        superUserStatus = true;
        Employee employeeRes = this.getSuperUserEmployeeHierarchyList(employee);
        if (employeeRes != null) {
            employeeRes.setParentEmpId(0L);
            employee = employeeRes;
            employee = this.getEmployeeHierarchyList(employee);
        } else {
            employee = this.getEmployeeHierarchyList(employee);
        }
    } else {
        if (!superUserStatus && !this.checkOrgAccess(employee)) {
            employee.setMessage("no OrgStructure Access");
        }
        employee = this.getEmployeeHierarchyList(employee);
    }

    if (superUserStatus && employee.getParentEmpId() != 0L) {
        employeeDTO.setEmployeeId(employee.getParentEmpId());
        Employee parentEmployee = this.getEmployee(employeeDTO);
        employee = this.buildParentObject(parentEmployee, employee);
    }  // ← THIS closing brace was missing

    if (employee.getParentEmpId() != 0L) {
        long superUser = this.userRoleManagementService.superUserId();
        if (this.checkRole(employee)) {
            employeeDTO.setEmployeeId(employee.getParentEmpId());
            Employee parentEmployee2 = this.getEmployee(employeeDTO);
            employee = this.buildParentObject(parentEmployee2, employee);
        } else if (employee.getParentEmpId() != superUser) {
            employeeDTO.setEmployeeId(employee.getParentEmpId());
            Employee parentEmployee3 = this.getEmployee(employeeDTO);
            employee = this.buildParentObjectStoppingAtSuperUser(parentEmployee3, employee, superUser);
        } else {
            employee.setParentEmpId(0L);
        }
    }

    this.log.debug((Object)"employeeList populated into cache");
    return employee;
}
    // Rebuilds the org hierarchy exactly as it stood on :asOf, using the temporal rows in
    // org_structure_details (start_date/end_date). Employees who have since been deleted or
    // moved are restored to their position on that date. Returns the visible root (the
    // super-user's richest child), mirroring the live getEmployeeList shape.
    public Employee getHistoricalOrgChart(long empId, java.time.LocalDate asOf) {
        EmployeeProfilePo me = this.employeeProfilePoRepo.findByEmpId(Long.valueOf(empId));
        long orgId = (me != null && me.getOrgId() != null) ? me.getOrgId().getId() : 1L;
        long superUser = this.userRoleManagementService.superUserId();

        List<OrgStructureDetails> validRows = this.orgStructureDetailsRepository.findValidAsOf(orgId, asOf);
        if (validRows == null || validRows.isEmpty()) {
            return new Employee();
        }

        List<Long> empIds = new ArrayList<Long>();
        for (OrgStructureDetails row : validRows) {
            empIds.add(Long.valueOf(row.getEmpId()));
        }

        // Load profiles regardless of their current status — they were active on :asOf.
        List<EmployeeProfilePo> profiles = this.employeeProfilePoRepo.findByEmpIdIn(empIds);
        Map<Long, Employee> nodeMap = new HashMap<Long, Employee>();
        for (EmployeeProfilePo p : profiles) {
            nodeMap.put(Long.valueOf(p.getEmpId()), new Employee(p));
        }

        // Wire each node under the parent it reported to on :asOf; collect candidate roots.
        List<Employee> roots = new ArrayList<Employee>();
        for (OrgStructureDetails row : validRows) {
            Employee node = nodeMap.get(Long.valueOf(row.getEmpId()));
            if (node == null) continue;
            Long parentId = row.getParentId();
            boolean isRoot = parentId == null || parentId.longValue() == 0L
                    || parentId.longValue() == superUser || !nodeMap.containsKey(parentId);
            if (isRoot) {
                roots.add(node);
            } else {
                Employee parent = nodeMap.get(parentId);
                if (parent.getReporteeList() == null) {
                    parent.setReporteeList(new ArrayList<Employee>());
                }
                parent.getReporteeList().add(node);
            }
        }

        // The live tree shows the super-user's child that actually has reportees; do the same.
        Employee root = null;
        int best = -1;
        for (Employee r : roots) {
            int count = r.getReporteeList() == null ? 0 : r.getReporteeList().size();
            if (count > best) {
                best = count;
                root = r;
            }
        }
        if (root == null && !nodeMap.isEmpty()) {
            root = nodeMap.values().iterator().next();
        }
        if (root != null) {
            root.setParentEmpId(0L);
        }
        return root;
    }

    public boolean checkOrgAccess(Employee employee) {
        boolean status = false;
        if (employee.getParentEmpId() != 0L) {
            status = true;
        } else {
            List employeeProfilePos = this.employeeProfilePoRepo.findAll(employee.getEmpId(), "Active");
            if (!employeeProfilePos.isEmpty()) {
                status = true;
            }
        }
        return status;
    }

    public boolean checkRole(Employee employee) {
        UserDTO userRoleManagement;
        boolean status = false;
        if (employee.getEmpId() != 0L && (userRoleManagement = this.userRoleManagementService.findById(Long.valueOf(employee.getEmpId()))) != null && userRoleManagement.getUserRole() != null && ("Super User".equalsIgnoreCase(userRoleManagement.getUserRole()) || "Admin".equalsIgnoreCase(userRoleManagement.getUserRole()))) {
            status = true;
        }
        return status;
    }

    public List<Employee> getAllParentEmployeeList(long employeeId, List<Employee> employeeList) {
        if (this.dbCache.get((Object)(employeeId + "_parentEmployeeList"), "dbCache") != null) {
            this.log.debug((Object)"employeeList returned from cache");
            if (employeeList == null) {
                employeeList = new ArrayList<Employee>();
            }
            employeeList.addAll((List)this.dbCache.get((Object)(employeeId + "_parentEmployeeList"), "dbCache"));
            return employeeList;
        }
        employeeList = this.buildParentEmployeeList(employeeId, employeeList);
        this.log.debug((Object)"employeeList populated into cache");
        ArrayList<Employee> cacheList = new ArrayList<Employee>();
        cacheList.addAll(employeeList);
        this.dbCache.putWithLifeSpan((Object)(employeeId + "_parentEmployeeList"), cacheList, "dbCache");
        return employeeList;
    }

    public List<Employee> getReporteeList(long empId) {
        List reporteeList = null;
        UserRoleManagement superUser = this.userRoleManagementRepository.findByID(Long.valueOf(empId));
        if (superUser != null && superUser.getUserAccess() == 0) {
            reporteeList = this.employeeDAO.getOrgEmployeeList(Long.valueOf(superUser.getOrgId()), Long.valueOf(superUser.getEmpId()));
        } else {
            reporteeList = this.employeeDAO.getReporteeList(empId);
        }
        if (reporteeList == null) {
            reporteeList = new java.util.ArrayList<>();
        }
        return reporteeList;
    }

    public List<Employee> getimmediateReporteeList(long empId) {
        List reporteeList = null;
        reporteeList = this.employeeDAO.getReporteeList(empId);
        return reporteeList;
    }

    public List<Long> getCompleteReporteeList(String empId) {
        List reporteeList = null;
        reporteeList = this.employeeDAO.getEmpIdList(Long.parseLong(empId));
        return reporteeList;
    }

    public List<Employee> getCompleteEmpReporteeList(Long empId) {
        List reporteeList = null;
        reporteeList = this.employeeDAO.getEmpIdListEmp(empId.longValue());
        return reporteeList;
    }

    public List<Long> getReporteeListId(long empId) {
        List reporteeList = this.employeeProfilePoRepo.getReporteeList(empId);
        return reporteeList;
    }

    public List<Long> getReporteeListId(List<Long> empIds) {
        List reporteeList = this.employeeProfilePoRepo.getReporteeList(empIds);
        return reporteeList;
    }

    public List<Employee> getOrgEmployeeList() {
        String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        if (this.dbCache.get((Object)(orgId + "_orgEmployeeList"), "dbCache") != null) {
            this.log.debug((Object)"orgEmployeeList returned from cache");
            return (List)this.dbCache.get((Object)(orgId + "_orgEmployeeList"), "dbCache");
        }
        List orgEmployeeList = this.employeeDAO.getOrgEmployeeList(Long.valueOf(orgId));
        this.log.debug((Object)"orgEmployeeList populated into cache");
        this.dbCache.putWithLifeSpan((Object)(orgId + "_orgEmployeeList"), (Object)orgEmployeeList, "dbCache");
        return orgEmployeeList;
    }

    public List<Employee> getEmployeeListbyOrgId(long orgId) {
        return this.employeeDAO.getOrgEmployeeList(Long.valueOf(orgId), this.userRoleManagementService.superUserId());
    }

    public long superUserId() {
        return this.userRoleManagementService.superUserId();
    }

    public List<Employee> getAllReporteeList(long empId) {
        List<Employee> employeeList = new ArrayList<>();
        employeeList = this.buildAllReporteeList(empId, employeeList);
        return employeeList;
    }

    public Employee getEmployeeId(String employeeName, long orgId) {
        return this.employeeDAO.getEmployeeID(employeeName, orgId);
    }

    public Employee getEmployeeIDByEmail(String emailAddress) {
        return this.employeeDAO.getEmployeeIDByEmail(emailAddress);
    }

    /**
     * Resolves an employee for bulk user import — profile by email first, then credentials
     * (covers rows where credentials exist but profile email lookup missed).
     */
    public Employee resolveEmployeeForImport(String emailAddress) {
        if (StringUtils.isEmpty(emailAddress)) {
            return null;
        }
        String email = emailAddress.trim();
        Employee employee = this.getEmployeeIDByEmail(email);
        if (employee != null) {
            return employee;
        }
        java.util.Optional<EmployeeCredentialsPo> cred = this.employeeCredentialsPoRepo
                .findByUserNameOrEmailAddressAndStatus(email, email, "Active");
        if (!cred.isPresent()) {
            cred = this.employeeCredentialsPoRepo.findByUserNameOrEmailAddressAndStatus(email, email, "InActive");
        }
        if (cred.isPresent()) {
            java.util.Optional<EmployeeProfilePo> profile = this.employeeProfilePoRepo.findById(cred.get().getEmpId());
            if (profile.isPresent()) {
                return new Employee(profile.get());
            }
        }
        return null;
    }

    public Employee getEmployeeIDByFullName(String firstName, String lastName, long orgId) {
        return this.employeeDAO.getEmployeeIDByFullName(firstName, lastName, orgId);
    }

    public EmployeeResponseDTO createEmployee(Employee employee, String type) throws InputValidationException {
        EmployeeResponseDTO employeeResponseDTO = null;
        try {
            if (employee.getEmailAddress() != null && this.checkUserExist(employee.getEmailAddress())) {
                throw new InputValidationException("Email address or UserName already exist");
            }
            OrganizationDetails orgDetails = this.getOrgDetails(employee.getOrgDetails().getName());
            if (orgDetails == null && employee.getOrgDetails().getOrgId() > 0) {
                OrgDetails found = this.orgDetailsRepository.findById(employee.getOrgDetails().getOrgId()).orElse(null);
                if (found != null) orgDetails = new OrganizationDetails(found);
            }
            if (orgDetails == null) {
                throw new InputValidationException("Organization not found: " + employee.getOrgDetails().getName());
            }
            EmployeeProfilePo checkProfilePo = this.employeeProfilePoRepo.findByEmail(employee.getEmailAddress(), orgDetails.getOrgId(), "InActive");
            if (checkProfilePo != null) {
                employee.setEmpId(checkProfilePo.getEmpId());
                employee.setOrgDetails(orgDetails);
                this.updateInactiveEmployee(employee);
                employeeResponseDTO = new EmployeeResponseDTO();
                employeeResponseDTO.setEmployeeId(checkProfilePo.getEmpId());
            } else {
                this.populateOrgDetailsFromRequest(employee);
                this.populateDepartmentFromRequest(employee);
                employeeResponseDTO = new EmployeeResponseDTO();
                OrgDetails savedOrgDetails = this.employeeDAO.mergeOrgDetails(new OrgDetails(employee.getOrgDetails()));
                if (employee.getDeptDetails() != null) {
                    DeptDetails savedDeptDetails = this.employeeDAO.mergeDeptDetails(employee.getDeptDetails());
                    employee.getDeptDetails().setId(savedDeptDetails.getId());
                    employee.setDepartment(savedDeptDetails.getName());
                }
                employee.getOrgDetails().setOrgId(savedOrgDetails.getId());
                EmployeeProfilePo profilePo = this.employeeDAO.createEmployeeProfile(employee);
                if (employee.getSuperCreatedBy() != null) {
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), profilePo.getEmpId(), profilePo.getEmpId(), "Organisation Created");
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), profilePo.getEmpId(), profilePo.getEmpId(), "User Created");
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), profilePo.getEmpId(), profilePo.getEmpId(), "User Role Assigned");
                } else {
                    long actorId = this.safeActorId();
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "Organisation Created");
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "User Created");
                    this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "User Role Assigned");
                }
                employee.setEmpId(profilePo.getEmpId());
                employee.setParentEmpId(profilePo.getParentEmpId());
                EmployeeCredentialsPo employeeCredentialsPo = new EmployeeCredentialsPo();
                if (employee.getDeptDetails() != null) {
                    employeeCredentialsPo.setDeptId(new DepartmentDetails(employee.getDeptDetails()));
                }
                employeeCredentialsPo.setEmpId(profilePo.getEmpId());
                employeeCredentialsPo.setEmailAddress(employee.getEmailAddress());
                employeeCredentialsPo.setOrgId(new OrgDetails(employee.getOrgDetails()));
                employeeCredentialsPo.setPassword(employee.getPassword());
                employeeCredentialsPo.setStatus("Active");
                employeeCredentialsPo.setUserName(employee.getEmailAddress());
                this.employeeDAO.createEmployeeCredentials(employeeCredentialsPo);
                if (employee.getDeptDetails() != null) {
                    this.saveEmployeeMappingDetails(employee);
                    this.updateDepartmentMappingDetails(employee);
                }
                this.saveOrgStructureDetails(employee);
                if (!type.equalsIgnoreCase("import")) {
                    this.orgTrackerService.saveOrgTrack(employee, Long.valueOf(this.safeActorId()));
                }
                this.updateChildTracker(Long.valueOf(profilePo.getEmpId()), null, Long.valueOf(profilePo.getParentEmpId()), "Employee");
                this.userRoleManagementService.saveUserRoleManagement(employee, "Create");
                employeeResponseDTO.setEmployeeId(profilePo.getEmpId());
                this.cacheUtil.removeEmployeeCache((Object)employee.getParentEmpId());
            }
        }
        catch (InputValidationException e) {
            // Validation failures (e.g. duplicate email) propagate so the transaction rolls
            // back and the real message reaches the user.
            throw e;
        }
        catch (Exception e) {
            // Rethrow as a runtime exception so @Transactional rolls back any partial inserts
            // (profile/credentials). Swallowing here previously left phantom half-created
            // employees that then blocked retries with "email already exist".
            e.printStackTrace();
            throw new InputValidationException("Employee could not be created: " + e.getMessage());
        }
        return employeeResponseDTO;
    }

    private void populateOrgDetailsFromRequest(Employee employee) {
        OrganizationDetails organizationDetails = null;
        if (employee.getOrgDetails() != null) {
            organizationDetails = this.getOrgDetails(employee.getOrgDetails().getName());
            OrganizationDetails organizationDetails2 = organizationDetails = organizationDetails != null ? organizationDetails : employee.getOrgDetails();
            if (organizationDetails.getStatus() == null) {
                organizationDetails.setStatus("Active");
            }
            employee.setOrgDetails(organizationDetails);
        } else if (employee.getParentEmpId() != 0L) {
            Employee parentemployee = this.getProfileDetails(employee.getParentEmpId());
            employee.setOrgDetails(parentemployee.getOrgDetails());
        }
    }

    private void saveEmployeeMappingDetails(Employee employee) {
        Optional<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping> empdepartmentmapping = this.employeeDepartmentMappingRepository.findByEmpIDAndDeptId(employee.getEmpId(), employee.getDeptDetails().getId(), "Active");
        if (empdepartmentmapping.isPresent()) {
            empdepartmentmapping.get().setActive(0);
            empdepartmentmapping.get().setStartDate(new Date());
            empdepartmentmapping.get().setStatus("Active");
            empdepartmentmapping.get().setFirstName(employee.getFirstName());
            empdepartmentmapping.get().setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
            empdepartmentmapping.get().setCreatedBy(employee.getEmpId());
            empdepartmentmapping.get().setCreatedTime(LocalDateTime.now());
            empdepartmentmapping.get().setEmpId(Long.valueOf(employee.getEmpId()));
            this.employeeDepartmentMappingRepository.save((com.estrat.backend.db.bean.po.EmployeeDepartmentMapping)empdepartmentmapping.get());
        } else {
            EmployeeDepartmentMapping employeeDepartmentMapping = new EmployeeDepartmentMapping();
            employeeDepartmentMapping.setActive(0);
            employeeDepartmentMapping.setStartDate(new Date());
            employeeDepartmentMapping.setStatus("Active");
            employeeDepartmentMapping.setFirstName(employee.getFirstName());
            employeeDepartmentMapping.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
            employeeDepartmentMapping.setCreatedBy(employee.getEmpId());
            employeeDepartmentMapping.setCreatedTime(LocalDateTime.now());
            employeeDepartmentMapping.setEmpId(Long.valueOf(employee.getEmpId()));
            this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping);
        }
    }

    private void saveOrgStructureDetails(Employee employee) {
        OrgStructureDetails orgStructureDetails = new OrgStructureDetails();
        orgStructureDetails.setStartDate(new Date());
        orgStructureDetails.setStatus("Active");
        orgStructureDetails.setParentId(Long.valueOf(employee.getParentEmpId()));
        orgStructureDetails.setCreatedBy(employee.getEmpId());
        orgStructureDetails.setCreatedTime(LocalDateTime.now());
        orgStructureDetails.setEmpId(employee.getEmpId());
        this.orgStructureDetailsRepository.saveAndFlush(orgStructureDetails);
    }

    private void updateEmployeeMappingDetails(Employee employee) {
        Optional employeeDepartmentMapping = this.employeeDepartmentMappingRepository.findByEmpIDAndDeptId(employee.getEmpId(), employee.getDeptDetails().getId(), "Active");
        if (employeeDepartmentMapping.isPresent()) {
            UserDeptMapping userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpIdANDDeptId(((EmployeeDepartmentMapping)employeeDepartmentMapping.get()).getEmpId(), ((EmployeeDepartmentMapping)employeeDepartmentMapping.get()).getDeptId());
            if (userDeptMapping == null) {
                userDeptMapping = new UserDeptMapping();
                userDeptMapping.setEmpId(((EmployeeDepartmentMapping)employeeDepartmentMapping.get()).getEmpId());
                userDeptMapping.setEmpId(((EmployeeDepartmentMapping)employeeDepartmentMapping.get()).getDeptId());
                this.userDeptMappingRepository.save(userDeptMapping);
            }
        } else {
            this.saveEmployeeMappingDetails(employee);
            UserDeptMapping userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpIdANDDeptId(Long.valueOf(employee.getEmpId()), Long.valueOf(employee.getDeptDetails().getId()));
            if (userDeptMapping == null && employee.getDeptDetails().getDeptID() != null) {
                userDeptMapping = new UserDeptMapping();
                userDeptMapping.setEmpId(Long.valueOf(employee.getEmpId()));
                userDeptMapping.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
                this.userDeptMappingRepository.save(userDeptMapping);
            }
        }
    }

    private void updateDepartmentMappingDetails(Employee employee) {
        Optional updateDepartmentMapping = this.departmentChartMappingRepository.findById(employee.getDeptDetails().getId());
        if (!updateDepartmentMapping.isPresent()) {
            DepartmentDetails departmentDetails = (DepartmentDetails)this.departmentDetailsRepository.getOne(employee.getDeptDetails().getId());
            DepartmentChartMapping departmentChartMapping = new DepartmentChartMapping();
            departmentChartMapping.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
            departmentChartMapping.setDeptName(employee.getDeptDetails().getName());
            departmentChartMapping.setCreatedBy(employee.getEmpId());
            departmentChartMapping.setCreatedTime(LocalDateTime.now());
            departmentChartMapping.setDeptParentId(Long.valueOf(0L));
            departmentChartMapping.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
            departmentChartMapping.setDeptUniqueId(departmentDetails.getDeptUniqueID());
            this.departmentChartMappingRepository.save(departmentChartMapping);
            this.updateChildTracker(Long.valueOf(employee.getDeptDetails().getId()), null, Long.valueOf(0L), "Department");
        } else {
            DepartmentDetails departmentDetails = (DepartmentDetails)this.departmentDetailsRepository.getOne(((DepartmentChartMapping)updateDepartmentMapping.get()).getDeptId());
            DepartmentChartMapping departmentChartMapping = (DepartmentChartMapping)updateDepartmentMapping.get();
            departmentChartMapping.setUpdatedBy(employee.getEmpId());
            departmentChartMapping.setDeptName(departmentDetails.getName());
            departmentChartMapping.setUpdatedTime(LocalDateTime.now());
            departmentChartMapping.setDeptUniqueId(departmentDetails.getDeptUniqueID());
            this.departmentChartMappingRepository.save(departmentChartMapping);
        }
    }

    private void updateOrgStructureDetails(Employee employee) {
        OrgStructureDetails updateOrgStructureDetails = this.orgStructureDetailsRepository.findByMapping(employee.getEmpId(), "Active");
        if (updateOrgStructureDetails != null) {
            if (!updateOrgStructureDetails.getParentId().toString().equals(Long.valueOf(employee.getParentEmpId()).toString())) {
                updateOrgStructureDetails.setUpdatedBy(employee.getEmpId());
                updateOrgStructureDetails.setStatus("InActive");
                // Close the old parent link so the historical chart knows this reporting
                // line ended here; saveOrgStructureDetails then opens a new one from today.
                updateOrgStructureDetails.setEndDate(new Date());
                updateOrgStructureDetails.setUpdatedTime(LocalDateTime.now());
                this.orgStructureDetailsRepository.save(updateOrgStructureDetails);
                this.saveOrgStructureDetails(employee);
            }
        } else {
            this.saveOrgStructureDetails(employee);
        }
    }

    private void populateDepartmentFromRequest(Employee employee) {
        DeptDetails departmentDetails = null;
        if (employee.getOrgDetails() != null
                && employee.getDeptUniqueId() != null
                && !employee.getDeptUniqueId().isEmpty()) {
            DepartmentDetails byUniqueId = this.departmentDetailsRepository.findByDeptUniqueId(
                    employee.getDeptUniqueId(), employee.getOrgDetails().getOrgId(), "Active");
            if (byUniqueId != null) {
                employee.setDeptDetails(new DeptDetails(byUniqueId));
                employee.setDepartment(byUniqueId.getName());
                return;
            }
        }
        if (employee.getDeptDetails() != null && employee.getDeptDetails().getName() != "") {
            if (employee.getDeptDetails().getDeptID() != null && employee.getDeptDetails().getDeptID() != "") {
                departmentDetails = this.getDepartmentDetailsByDeptUniqueId(employee.getDeptDetails().getDeptID(), Long.valueOf(employee.getOrgDetails().getOrgId()));
                DeptDetails deptDetails = departmentDetails = departmentDetails != null ? departmentDetails : employee.getDeptDetails();
                if (departmentDetails.getStatus() == null) {
                    departmentDetails.setStatus("Active");
                    departmentDetails.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
                } else {
                    DepartmentChartMapping departmentChartMapping = this.departmentChartMappingRepository.getOne(Long.valueOf(departmentDetails.getId()));
                    departmentDetails.setName(departmentChartMapping.getDeptName());
                    departmentDetails.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
                }
            } else {
                departmentDetails = departmentDetails != null ? departmentDetails : employee.getDeptDetails();
                departmentDetails.setDeptID(this.getUniqueId(Long.valueOf(employee.getOrgDetails().getOrgId())));
                departmentDetails.setName(employee.getDeptDetails().getName());
                departmentDetails.setStatus("Active");
                departmentDetails.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
            }
            employee.setDeptDetails(departmentDetails);
        } else if (employee.getDepartment() != null && !employee.getDepartment().isEmpty() && employee.getDeptUniqueId() != null && !employee.getDeptUniqueId().isEmpty()) {
            DepartmentDetails checkDepartment = this.departmentDetailsRepository.findByDeptUniqueId(employee.getDeptUniqueId(), employee.getOrgDetails().getOrgId(), "Active");
            if (checkDepartment != null) {
                if (!checkDepartment.getName().equalsIgnoreCase(employee.getDepartment())) {
                    checkDepartment.setName(employee.getDepartment());
                }
                employee.setDeptDetails(new DeptDetails(checkDepartment));
            } else {
                DeptDetails dept = new DeptDetails();
                dept.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
                dept.setName(employee.getDepartment());
                dept.setDeptID(employee.getDeptUniqueId());
                dept.setStatus("Active");
                employee.setDeptDetails(dept);
            }
        } else if (employee.getDepartment() != null && !employee.getDepartment().isEmpty()) {
            DeptDetails dept = new DeptDetails();
            dept.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
            dept.setName(employee.getDepartment());
            dept.setDeptID(this.getUniqueId(Long.valueOf(employee.getOrgDetails().getOrgId())));
            dept.setStatus("Active");
            employee.setDeptDetails(dept);
        }
    }

    public boolean checkUserExist(String email) {
        return this.employeeDAO.checkUserExist(email);
    }

    public boolean checkUserExistWithNoStatus(String email) {
        return this.employeeDAO.checkUserExistWithNoStatus(email);
    }

    // The logged-in user id comes from a request-scoped thread local that may be null
    // (e.g. missing LOGGED_IN_EMPLOYEE_ID header). Parse it defensively so audit/tracker
    // writes never blow up the create/update flow with a NumberFormatException.
    private long safeActorId() {
        try {
            String v = UserThreadLocal.get();
            if (v != null && !v.isEmpty()) {
                return Long.parseLong(v);
            }
        } catch (NumberFormatException ignored) {
        }
        return 0L;
    }

    public EmployeeResponseDTO updateEmployee(Employee employee, String type) {
        this.cacheUtil.removeEmployeeCache((Object)employee.getEmpId());
        this.updateMandatoryFields(employee, "Active");
        this.populateDepartmentFromRequest(employee);
        OrgDetails savedOrgDetails = this.orgDetailsRepository.findById(employee.getOrgDetails().getOrgId())
                .orElseGet(() -> this.employeeDAO.mergeOrgDetails(new OrgDetails(employee.getOrgDetails())));
        if (employee.getDeptDetails() != null) {
            DeptDetails savedDeptDetails = this.employeeDAO.mergeDeptDetails(employee.getDeptDetails());
            employee.getDeptDetails().setId(savedDeptDetails.getId());
        }
        employee.getOrgDetails().setOrgId(savedOrgDetails.getId());
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        this.employeeDAO.updateEmployeeProfile(employee);
        if (employee.getSuperCreatedBy() != null) {
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), employee.getEmpId(), employee.getEmpId(), "Organisation Modified");
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), employee.getEmpId(), employee.getEmpId(), "User Modified");
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), employee.getEmpId(), employee.getEmpId(), "User Role Assigned");
        } else {
            long actorId = this.safeActorId();
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "Organisation Modified");
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "User Modified");
            this.auditService.saveSuperAudit("User", employee.getSuperCreatedBy(), actorId, actorId, "User Role Assigned");
        }
        EmployeeCredentialsPo employeeCredentialsPo = new EmployeeCredentialsPo();
        if (employee.getDeptDetails() != null) {
            employeeCredentialsPo.setDeptId(new DepartmentDetails(employee.getDeptDetails()));
        }
        employeeCredentialsPo.setEmpId(employee.getEmpId());
        employeeCredentialsPo.setEmailAddress(employee.getEmailAddress());
        employeeCredentialsPo.setOrgId(new OrgDetails(employee.getOrgDetails()));
        employeeCredentialsPo.setPassword(employee.getPassword());
        employeeCredentialsPo.setStatus("Active");
        employeeCredentialsPo.setUserName(employee.getEmailAddress());
        this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
        this.updateOrgStructureDetails(employee);
        if (employee.getDeptDetails() != null) {
            this.updateEmployeeMappingDetails(employee);
            this.updateDepartmentMappingDetails(employee);
        }
        employeeResponseDTO.setUpdateFlag(true);
        if (type.equalsIgnoreCase("import")) {
            this.orgTrackerService.saveOrUpdateAtImportTrack(employee, Long.valueOf(this.safeActorId()));
        } else {
            this.orgTrackerService.updateOrgTrack(employee, Long.valueOf(this.safeActorId()));
        }
        this.userRoleManagementService.saveUserRoleManagement(employee, "Update");
        this.cacheUtil.removeEmployeeCache((Object)employee.getParentEmpId());
        this.cacheUtil.removeEmployeeCache((Object)employee.getEmpId());
        return employeeResponseDTO;
    }

    public EmployeeResponseDTO resetPassword(Employee employee) {
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        employeeResponseDTO.setUpdateFlag(this.employeeDAO.resetPassword(employee));
        return employeeResponseDTO;
    }

    public AuthenticateResponseDTO authenticateUser(EmployeeDTO employeeDTO) {
        AuthenticateResponseDTO authenticateResponseDTO = new AuthenticateResponseDTO();
        EmployeeCredentialsPo credentialsPo = this.employeeDAO.authenticateUser(employeeDTO);
        if (credentialsPo != null) {
            authenticateResponseDTO.setAuthoriseFlag(true);
            employeeDTO.setEmployeeId(credentialsPo.getEmpId());
            Employee employee = this.getEmployee(employeeDTO);
            if (employee.getParentEmpId() != 0L) {
                employeeDTO.setEmployeeId(employee.getParentEmpId());
                employee.setParentEmployee(this.employeeDAO.getEmployee(employeeDTO));
            }
            employee.setReporteeList(this.getReporteeList(credentialsPo.getEmpId()));
            List allReporteeLit = this.getAllReporteeList(credentialsPo.getEmpId());
            employee.setAllRepoteeCount(Long.valueOf(allReporteeLit.size()));
            employee.setParentEmployeeList(this.getAllParentEmployeeList(credentialsPo.getEmpId(), null));
            authenticateResponseDTO.setEmployee(employee);
            authenticateResponseDTO.setOrgUserCount(this.employeeDAO.getOrgUserCount(employee.getOrgDetails().getOrgId()).longValue());
            authenticateResponseDTO.setUserPermissions(this.roleService.getUserPermissions(credentialsPo.getEmpId()));
        } else {
            EmployeeCredentialsPo checkAuthenticateUserInActive = this.employeeDAO.checkAuthenticateUserInActive(employeeDTO);
            if (checkAuthenticateUserInActive != null) {
                authenticateResponseDTO.setUserFlag(true);
            } else {
                authenticateResponseDTO.setUserFlag(false);
            }
            authenticateResponseDTO.setAuthoriseFlag(false);
        }
        return authenticateResponseDTO;
    }

    public int getOrgMaxId() {
        String orgmax = this.employeeDAO.getOrgMaxId();
        return Integer.parseInt(orgmax);
    }

    public Employee getProfileDetails(long empId) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        Employee employee = this.getProfileDetails(employeeDTO);
        if (employee.getParentEmpId() != 0L) {
            employeeDTO.setEmployeeId(employee.getParentEmpId());
            employee.setParentEmployee(this.employeeDAO.getEmployee(employeeDTO));
        }
        employee.setReporteeList(this.getReporteeList(empId));
        List allReporteeLit = this.getAllReporteeList(empId);
        employee.setAllRepoteeCount(Long.valueOf(allReporteeLit.size()));
        employee.setParentEmployeeList(this.getAllParentEmployeeList(empId, null));
        employee.setUserRoleName(this.userRoleManagementService.getUserRole(empId));
        UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()));
        if (userRoleManagement != null) {
            employee.setUserAccess(userRoleManagement.getUserAccess());
        } else {
            employee.setUserAccess(1);
        }
        return employee;
    }

    private void updateMandatoryFields(Employee employee, String type) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(employee.getEmpId());
        Employee dbEmployee = null;
        dbEmployee = type.equalsIgnoreCase("InActive") ? this.employeeDAO.getEmployeeInActive(employeeDTO) : this.getEmployee(employeeDTO);
        if (StringUtils.isEmpty((CharSequence)employee.getEmailAddress())) {
            employee.setEmailAddress(dbEmployee.getEmailAddress());
        }
        if (StringUtils.isEmpty((CharSequence)employee.getPassword())) {
            employee.setPassword(dbEmployee.getPassword());
        }
        if (StringUtils.isEmpty((CharSequence)employee.getProfileImage())) {
            employee.setProfileImage(dbEmployee.getProfileImage());
        }
        if (employee.getParentEmpId() == 0L && employee.getParentEmpId() != dbEmployee.getParentEmpId()) {
            employee.setParentEmpId(dbEmployee.getParentEmpId());
        }
        if (StringUtils.isEmpty((CharSequence)employee.getPhoneNumber())) {
            employee.setPhoneNumber(dbEmployee.getPhoneNumber());
        }
        if (StringUtils.isEmpty((CharSequence)employee.getLocation())) {
            employee.setLocation(dbEmployee.getLocation());
        }
        if (employee.getUserRole() == 0) {
            employee.setUserRole(dbEmployee.getUserRole());
        }
    }

    private Employee buildParentObject(Employee parentEmployee, Employee chileEmployee) {
        Employee result = null;
        parentEmployee.setCanMaintain(false);
        parentEmployee.setReporteeList(Arrays.asList(chileEmployee));
        parentEmployee.setScoreCardLandingUrl("");
        parentEmployee.setInitiativeLandingUrl("");
        parentEmployee.setKpiLandingUrl("");
        parentEmployee.setAppraisalUrl("");
        if (parentEmployee.getParentEmpId() != 0L) {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeId(parentEmployee.getParentEmpId());
            Employee currentParentEmployee = this.getEmployee(employeeDTO);
            result = this.buildParentObject(currentParentEmployee, parentEmployee);
        } else {
            result = parentEmployee;
        }
        return result;
    }

    /** Like buildParentObject but does not surface the org system super-user / super-admin node. */
    private Employee buildParentObjectStoppingAtSuperUser(Employee parentEmployee, Employee childEmployee, long superUserId) {
        // Never surface the super-admin / org root account (the seeded "amira@superadmin.com",
        // whose parent_emp_id = 0). When the next parent up is that root — or the configured
        // super-user id — stop climbing and make the child the visible top of the chart.
        //
        // The org root is identified by parent_emp_id = 0 rather than by role: mid-level managers
        // can also carry a "Super Admin"/"Super User" role, and the userAccess=0 row that
        // superUserId() relies on may be missing in the data (leaving superUserId() == 0), so the
        // root link is the only reliable signal.
        if (parentEmployee == null
                || parentEmployee.getParentEmpId() == 0L
                || (superUserId != 0L && parentEmployee.getEmpId() == superUserId)) {
            childEmployee.setParentEmpId(0L);
            return childEmployee;
        }
        parentEmployee.setCanMaintain(false);
        parentEmployee.setReporteeList(Arrays.asList(childEmployee));
        parentEmployee.setScoreCardLandingUrl("");
        parentEmployee.setInitiativeLandingUrl("");
        parentEmployee.setKpiLandingUrl("");
        parentEmployee.setAppraisalUrl("");
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(parentEmployee.getParentEmpId());
        Employee currentParentEmployee = this.getEmployee(employeeDTO);
        return this.buildParentObjectStoppingAtSuperUser(currentParentEmployee, parentEmployee, superUserId);
    }

    private Employee getEmployeeHierarchyList(Employee employee) {
        employee.setScoreCardLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(String.valueOf(employee.getEmpId()), "SCORECARD"));
        employee.setInitiativeLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(String.valueOf(employee.getEmpId()), "INITIATIVE"));
        employee.setKpiLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(String.valueOf(employee.getEmpId()), "KPI"));
        employee.setRiskLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(String.valueOf(employee.getEmpId()), "RISK"));
        employee.setAppraisalUrl("");
        List childList = this.getReporteeList(employee.getEmpId());
        if (!childList.isEmpty() && childList.size() != 0) {
            if (String.valueOf(employee.getEmpId()).equals(UserThreadLocal.get())) {
                employee.setCanMaintain(true);
            } else {
                employee.setCanMaintain(true);
            }
            employee.setReporteeList(childList);
            for (Employee employeeObj : (java.util.List<Employee>)(java.util.List<?>)childList) {
                if (employeeObj.getParentEmpId() == 0L) continue;
                this.getEmployeeHierarchyList(employeeObj);
            }
        } else {
            employee.setCanMaintain(true);
        }
        return employee;
    }

    private Employee getSuperUserEmployeeHierarchyList(Employee employee) {
        List finalEmps;
        long superUser = this.userRoleManagementService.superUserId();
        long empOrgId = employee.getOrgDetails() != null ? employee.getOrgDetails().getOrgId() : 1L;
        List<Employee> employees = (List<Employee>)(List<?>) this.employeeDAO.getEmployeeListByOrgIdAndParentId(Long.valueOf(empOrgId), Long.valueOf(superUser), Long.valueOf(0L));
        Employee result = null;
        for (Employee resultEmployee : (java.util.List<Employee>)(java.util.List<?>)employees) {
            finalEmps = this.employeeDAO.getEmployeeListByParentId(Long.valueOf(resultEmployee.getEmpId()));
            if (finalEmps.isEmpty()) continue;
            result = resultEmployee;
        }
        if (result == null) {
            for (Employee resultEmployee : (java.util.List<Employee>)(java.util.List<?>)employees) {
                finalEmps = this.employeeDAO.getEmployeeListByParentIdWithNoStatus(Long.valueOf(resultEmployee.getEmpId()));
                if (finalEmps.isEmpty()) continue;
                result = resultEmployee;
                break;
            }
        }
        if (result == null && !employees.isEmpty()) {
            result = employees.get(0);
        }
        return result;
    }

    public List<Employee> buildParentEmployeeList(long empId, List<Employee> employeeList) {
        if (employeeList == null) {
            employeeList = new ArrayList<Employee>();
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        Employee employee = this.employeeDAO.getEmployee(employeeDTO);
        employeeList.add((Employee)employee);
        if (employee.getParentEmpId() != 0L) {
            employeeList = this.buildParentEmployeeList(employee.getParentEmpId(), employeeList);
        }
        return employeeList;
    }

    public List<Employee> buildCompleteReporteeList(long empId, List<Employee> employeeList) {
        if (employeeList == null) {
            employeeList = new ArrayList<Employee>();
        }
        List<Employee> childList = (List<Employee>)(List<?>) this.getCompleteEmpReporteeList(Long.valueOf(empId));
        return employeeList;
    }

    public List<Employee> buildAllReporteeList(long empId, List<Employee> employeeList) {
        return new java.util.ArrayList<>();
    }

    public EmployeeProfilePo getEmployeeProfile(Long empId) {
        EmployeeProfilePo employeeProfilePo = null;
        try {
            employeeProfilePo = this.employeeDAO.getEmployeeProfile(empId);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        return employeeProfilePo;
    }

    public EmployeeProfilePo getEmployeeProfileByEmail1(String email) {
        EmployeeProfilePo employeeProfilePo = null;
        try {
            employeeProfilePo = this.employeeDAO.getEmployeeProfileByEmail1(email);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        return employeeProfilePo;
    }

    public EmployeeProfilePo getEmployeeProfileByEmail(String email, long empId) {
        EmployeeProfilePo employeeProfilePo = null;
        try {
            employeeProfilePo = this.employeeDAO.getEmployeeProfileByEmail(email, empId);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        return employeeProfilePo;
    }

    public OrganizationDetails getOrgDetails(String orgName) {
        OrgDetails orgDetails = this.employeeDAO.getOrgDetails(orgName);
        OrganizationDetails organizationDetails = orgDetails != null ? new OrganizationDetails(orgDetails) : null;
        return organizationDetails;
    }

    public DeptDetails getDepartmentDetails(String orgName, Long orgId) {
        DepartmentDetails departmentDetails = this.departmentDetailsRepository.findByName(orgName, orgId.longValue(), "Active");
        DeptDetails deptDetails = departmentDetails != null ? new DeptDetails(departmentDetails) : null;
        return deptDetails;
    }

    public DeptDetails getDepartmentDetailsByDeptUniqueId(String deptUniqueId, Long orgId) {
        DepartmentDetails departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(deptUniqueId, orgId.longValue(), "Active");
        DeptDetails deptDetails = departmentDetails != null ? new DeptDetails(departmentDetails) : null;
        return deptDetails;
    }

    public List<OrganizationDetails> getOrgList() {
        return new java.util.ArrayList<>();
    }

    public List<String> getDepartmentList() {
        return this.employeeDAO.getDepartmentList();
    }

    public List<String> getOrgDepartmentList(String name) {
        return this.employeeDAO.getOrgDepartmentList(name);
    }

    public List<String> getDesignationListString(String name, String datePeriod) {
        if (datePeriod != null && !datePeriod.isEmpty()) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            if (Objects.nonNull(datePeriod)) {
                String[] stringArray = dataRanges = datePeriod.contains("-") ? datePeriod.split("-") : datePeriod.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            List<String> designationList = new ArrayList();
            Long superUser = this.userRoleManagementService.superUserId();
            designationList = name != null && StringUtils.isNotEmpty((CharSequence)name) ? this.employeeProfilePoRepo.findAllFirstNameListString(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", firstDate.toInstant().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime(), secondDate.toInstant().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime(), superUser.longValue()) : this.employeeProfilePoRepo.findAllFirstNameListString(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), firstDate.toInstant().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime(), secondDate.toInstant().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime(), superUser.longValue());
            if (designationList.isEmpty()) {
                return new ArrayList<String>();
            }
            return designationList;
        }
        Long superUser = this.userRoleManagementService.superUserId();
        if (name != null && StringUtils.isNotEmpty((CharSequence)name)) {
            return this.employeeProfilePoRepo.findAllFirstNameListNoStatusString(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", superUser.longValue());
        }
        return this.employeeProfilePoRepo.findAllFirstNameListNoStatusString(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), superUser.longValue());
    }

    /*
     * WARNING - void declaration
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public List<Employee> getDesignationList(String name, String datePeriod) {
        List designationList = new ArrayList();
        List profileList = new ArrayList();
        ArrayList<Employee> arrayList = new ArrayList<Employee>();
        long loginEmpId = Long.valueOf(UserThreadLocal.get());
        if (datePeriod != null && !datePeriod.isEmpty()) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            if (Objects.nonNull(datePeriod)) {
                String[] stringArray = dataRanges = datePeriod.contains("-") ? datePeriod.split("-") : datePeriod.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            EmployeeDTO employee = new EmployeeDTO();
            employee.setEmployeeId(Long.valueOf(loginEmpId).longValue());
            Employee superUser = this.getEmployee(employee);
            if (superUser.getUserRoleName().contains("Super User")) {
                long superuserId = this.userRoleManagementService.superUserId();
                profileList = name != null && StringUtils.isNotEmpty((CharSequence)name) ? this.employeeProfilePoRepo.findAllFirstNameListByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate), superuserId) : this.employeeProfilePoRepo.findAllFirstNameListByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate), superuserId);
            } else {
                List empIdList = this.employeeDAO.getEmpIdList(loginEmpId);
                profileList = name != null && StringUtils.isNotEmpty((CharSequence)name) ? this.employeeProfilePoRepo.findAllFirstNameListByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate), empIdList) : this.employeeProfilePoRepo.findAllFirstNameListByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate), empIdList);
            }
            if (profileList.isEmpty()) return arrayList;
            designationList = this.employeeProfilePoRepo.findNodeAndChildList(profileList);
            List<Employee> list = (java.util.List<Employee>)(java.util.List<?>)designationList.stream().map(emp -> new Employee((EmployeeProfilePo)emp, "status")).collect(Collectors.toList());
            return list;
        }
        Long superUser = this.userRoleManagementService.superUserId();
        if (loginEmpId == superUser) {
            profileList = name != null && StringUtils.isNotEmpty((CharSequence)name) ? this.employeeProfilePoRepo.findAllFirstNameListNoStatusByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", superUser.longValue()) : this.employeeProfilePoRepo.findAllFirstNameListNoStatusByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), superUser.longValue());
        } else {
            List empIdList = this.employeeDAO.getEmpIdList(loginEmpId);
            profileList = name != null && StringUtils.isNotEmpty((CharSequence)name) ? this.employeeProfilePoRepo.findAllFirstNameListNoStatusByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "%" + name + "%", empIdList) : this.employeeProfilePoRepo.findAllFirstNameListNoStatusByIdList(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), empIdList);
        }
        if (profileList.isEmpty()) return arrayList;
        designationList = this.employeeProfilePoRepo.findNodeAndChildList(profileList);
        List<Employee> list = (java.util.List<Employee>)(java.util.List<?>)designationList.stream().map(emp -> new Employee((EmployeeProfilePo)emp, "status")).collect(Collectors.toList());
        return list;
    }

    public EmployeePreferencesDTO getPreferences(String pageName, Long pageId) {
        EmployeePreferencesDTO preferencesDTO = new EmployeePreferencesDTO();
        EmployeePreferences applicationPage = this.preferenceRepository.findPreferencesByEmpIdAndName(pageId.longValue(), UserThreadLocal.get(), pageName);
        if (applicationPage != null) {
            preferencesDTO.setPageName(applicationPage.getPageName());
            preferencesDTO.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
            preferencesDTO.setPageId(applicationPage.getId());
            if (CollectionUtils.isNotEmpty((Collection)applicationPage.getPreferenceList())) {
                Map<String, Object> preferenceObj = applicationPage.getPreferenceList().stream().collect(Collectors.toMap(PreferenceDetails::getPreferenceName, PreferenceDetails::getEnabled));
                preferencesDTO.setPreferences(preferenceObj);
            }
        }
        return preferencesDTO;
    }

    public EmployeePreferencesDTO mergeEmployeePreference(EmployeePreferencesDTO employeePreferencesDTO) {
        if (employeePreferencesDTO.getPageId() == 0L) {
            throw new InputValidationException("PageId cannot be empty or zero");
        }
        EmployeePreferences applicationPage = new EmployeePreferences();
        applicationPage.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
        applicationPage.setPageName(employeePreferencesDTO.getPageName());
        applicationPage.setStatus("Active");
        applicationPage.setId(employeePreferencesDTO.getPageId());
        this.updatePreferences(employeePreferencesDTO, applicationPage);
        EmployeePreferences updatedPage = (EmployeePreferences)this.preferenceRepository.save(applicationPage);
        EmployeePreferencesDTO preferencesDTO = new EmployeePreferencesDTO();
        if (CollectionUtils.isNotEmpty((Collection)updatedPage.getPreferenceList())) {
            Map<String, Object> preferenceObj = applicationPage.getPreferenceList().stream().collect(Collectors.toMap(PreferenceDetails::getPreferenceName, PreferenceDetails::getEnabled));
            preferencesDTO.setPreferences(preferenceObj);
        }
        preferencesDTO.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
        preferencesDTO.setPageId(updatedPage.getId());
        preferencesDTO.setPageName(updatedPage.getPageName());
        return preferencesDTO;
    }

    public EmployeePreferences updatePreferences(EmployeePreferencesDTO employeePreferencesDTO, EmployeePreferences applicationPage) {
        if (Objects.nonNull(employeePreferencesDTO.getPreferences()) && !employeePreferencesDTO.getPreferences().isEmpty()) {
            Set preferenceList = employeePreferencesDTO.getPreferences().entrySet().stream().map(preference -> {
                PreferenceDetails preferenceObject = new PreferenceDetails(applicationPage);
                preferenceObject.setPreferenceName((String)preference.getKey());
                preferenceObject.setEnabled(preference.getValue().toString());
                return preferenceObject;
            }).collect(Collectors.toSet());
            applicationPage.setPreferenceList(preferenceList);
        }
        return applicationPage;
    }

    public long getOrgUserCount(long orgId) {
        return this.employeeDAO.getOrgUserCount(orgId);
    }

    public List<EmployeeDepartmentMappingDTO> departmentByEmployeeList(Long deptId) {
        List<EmployeeDepartmentMapping> mappings =
            this.employeeDepartmentMappingRepository.departmentByEmployeeList(deptId, "Active");
        if (mappings == null || mappings.isEmpty()) {
            return new java.util.ArrayList<>();
        }
        return mappings.stream()
            .map(EmployeeDepartmentMappingDTO::new)
            .collect(java.util.stream.Collectors.toList());
    }

    public DepartmentResponseDetailsDTO departmentByEmployeeList(EmployeeDTO employeeDTO, Integer year) {
        Employee employee = this.getEmployeeByOrg(employeeDTO);
        DepartmentResponseDetailsDTO departmentResponse = this.resolveRootDepartmentForChart(employee);
        if (departmentResponse == null) {
            departmentResponse = new DepartmentResponseDetailsDTO();
            departmentResponse.setMessage("no OrgStructure Access");
            return departmentResponse;
        }

        boolean superUserStatus = false;
        if (this.checkRole(employee)) {
            superUserStatus = true;
            DepartmentResponseDetailsDTO superRes =
                this.getSuperUserDepartmentHierarchyList(departmentResponse, year);
            if (superRes != null) {
                departmentResponse = superRes;
                departmentResponse = this.getDepartmentHierarchyList(departmentResponse, null, year);
            } else {
                departmentResponse.setMessage("no OrgStructure Access");
            }
        } else {
            if (!superUserStatus && !this.checkDeptOrgAccess(departmentResponse, year)) {
                departmentResponse.setMessage("no OrgStructure Access");
            }
            departmentResponse = this.getDepartmentHierarchyList(departmentResponse, null, year);
        }

        if (superUserStatus && departmentResponse.getDeptParentId() != null && departmentResponse.getDeptParentId() != 0L) {
            DepartmentChartMapping parentMapping =
                this.departmentChartMappingRepository.getOne(departmentResponse.getDeptParentId(), 0);
            if (parentMapping != null) {
                DepartmentResponseDetailsDTO parentDepartment = new DepartmentResponseDetailsDTO(parentMapping);
                departmentResponse = this.buildParentObjectByDepartment(parentDepartment, departmentResponse);
            }
        }
        return departmentResponse;
    }

    private DepartmentResponseDetailsDTO resolveRootDepartmentForChart(Employee employee) {
        Optional<DepartmentChartMapping> ownedDept =
            this.departmentChartMappingRepository.findOwner(Long.valueOf(employee.getEmpId()), 0);
        if (ownedDept.isPresent()) {
            return new DepartmentResponseDetailsDTO(ownedDept.get());
        }

        if (employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
            DepartmentChartMapping mapping =
                this.departmentChartMappingRepository.getOne(Long.valueOf(employee.getDeptDetails().getId()), 0);
            if (mapping != null) {
                return new DepartmentResponseDetailsDTO(mapping);
            }
        }

        if (employee.getOrgDetails() != null) {
            List<DepartmentChartMapping> orgDepts = this.departmentChartMappingRepository.findAllDepartmentForOrg(
                Long.valueOf(employee.getOrgDetails().getOrgId()), 0);
            for (DepartmentChartMapping dept : orgDepts) {
                if (dept.getDeptParentId() == 0L) {
                    return new DepartmentResponseDetailsDTO(dept);
                }
            }
            if (!orgDepts.isEmpty()) {
                return new DepartmentResponseDetailsDTO(orgDepts.get(0));
            }
        }
        return null;
    }

    public boolean checkDeptOrgAccess(DepartmentResponseDetailsDTO detailsDTO, Integer year) {
        boolean status = false;
        if (detailsDTO.getDeptParentId() != 0L) {
            status = true;
        } else {
            List childList = this.getDepartmentReporteeList(detailsDTO.getDeptId(), year);
            if (!childList.isEmpty()) {
                status = true;
            }
        }
        return status;
    }

    private DepartmentResponseDetailsDTO getDepartmentHierarchyList(
        DepartmentResponseDetailsDTO departmentResponse,
        Map<Long, List<DepartmentChartMapping>> departmentList,
        Integer year) {
        if (departmentResponse == null) {
            return null;
        }

        String deptId = String.valueOf(departmentResponse.getDeptId());
        departmentResponse.setScoreCardLandingUrl(
            this.pagesLinkDetailsService.getDefaultPageURL(deptId, "SCORECARD"));
        departmentResponse.setInitiativeLandingUrl(
            this.pagesLinkDetailsService.getDefaultPageURL(deptId, "INITIATIVE"));
        departmentResponse.setKpiLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(deptId, "KPI"));
        departmentResponse.setRiskLandingUrl(this.pagesLinkDetailsService.getDefaultPageURL(deptId, "RISK"));
        departmentResponse.setAppraisalUrl("");
        departmentResponse.setCanMaintain(true);
        this.populateDepartmentOwnerName(departmentResponse);

        List<DepartmentResponseDetailsDTO> childList =
            this.getDepartmentChildList(departmentResponse.getDeptId(), year);
        if (!childList.isEmpty()) {
            departmentResponse.setChildren(childList);
            for (DepartmentResponseDetailsDTO child : childList) {
                this.getDepartmentHierarchyList(child, departmentList, year);
            }
        }
        return departmentResponse;
    }

    private void populateDepartmentOwnerName(DepartmentResponseDetailsDTO departmentResponse) {
        if (departmentResponse.getOwner() == null || departmentResponse.getOwner() == 0L) {
            return;
        }
        try {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeId(departmentResponse.getOwner().longValue());
            Employee owner = this.getEmployee(employeeDTO);
            if (owner != null && owner.getFirstName() != null) {
                String ownerName = owner.getFirstName();
                if (owner.getLastName() != null) {
                    ownerName = ownerName + " " + owner.getLastName();
                }
                departmentResponse.setOwnerName(ownerName);
            }
        } catch (Exception ignored) {
            // best-effort display name
        }
    }

    private DepartmentResponseDetailsDTO getSuperUserDepartmentHierarchyList(
        DepartmentResponseDetailsDTO departmentResponse, Integer year) {
        long orgId = departmentResponse.getDeptId() != null && departmentResponse.getDeptParentId() == 0L
            ? this.resolveOrgIdForDepartment(departmentResponse.getDeptId())
            : Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"));

        List<DepartmentChartMapping> orgDepts =
            this.departmentChartMappingRepository.findAllDepartmentForOrg(Long.valueOf(orgId), 0);
        DepartmentResponseDetailsDTO result = null;

        for (DepartmentChartMapping dept : orgDepts) {
            if (dept.getDeptParentId() == 0L) {
                List<DepartmentChartMapping> children =
                    this.departmentChartMappingRepository.getAllDepartmentByParentId(dept.getDeptId(), 0);
                if (!children.isEmpty()) {
                    result = new DepartmentResponseDetailsDTO(dept);
                    break;
                }
            }
        }

        if (result == null) {
            for (DepartmentChartMapping dept : orgDepts) {
                if (dept.getDeptParentId() == 0L) {
                    result = new DepartmentResponseDetailsDTO(dept);
                    break;
                }
            }
        }

        return result != null ? result : departmentResponse;
    }

    private long resolveOrgIdForDepartment(Long deptId) {
        DepartmentChartMapping mapping = this.departmentChartMappingRepository.getOne(deptId, 0);
        if (mapping != null && mapping.getOrgId() != null) {
            return mapping.getOrgId().longValue();
        }
        return Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"));
    }

    public List<Integer> getYearsForDropdown() {
        return new java.util.ArrayList<>();
    }

    public List<DepartmentResponseDetailsDTO> getDepartmentReporteeList(Long deptId, Integer year) {
        return this.getDepartmentChildList(deptId, year);
    }

    public List<EmployeeDepartmentMappingDTO> getMappingList(long deptId) {
        return this.departmentByEmployeeList(deptId);
    }

    public List<DepartmentResponseDetailsDTO> getDepartmentChildList(Long deptId, Integer year) {
        List<DepartmentChartMapping> mappings =
            this.departmentChartMappingRepository.getAllDepartmentByParentId(deptId, 0);
        if (mappings == null || mappings.isEmpty()) {
            return new java.util.ArrayList<>();
        }
        return mappings.stream()
            .map(DepartmentResponseDetailsDTO::new)
            .collect(java.util.stream.Collectors.toList());
    }

    public List<DepartmentResponseDetailsDTO> getAllDepartmentByORGWithNoParentId(List<String> deptIds) {
        if (deptIds == null || deptIds.isEmpty()) {
            return new java.util.ArrayList<>();
        }
        long orgId = Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"));
        List<DepartmentChartMapping> mappings = this.departmentChartMappingRepository
            .getAllDepartmentByORGWithNoParentId(deptIds, 0L, 0);
        if (mappings == null || mappings.isEmpty()) {
            return new java.util.ArrayList<>();
        }
        return mappings.stream()
            .map(DepartmentResponseDetailsDTO::new)
            .collect(java.util.stream.Collectors.toList());
    }

    private DepartmentResponseDetailsDTO buildParentObjectByDepartment(DepartmentResponseDetailsDTO parentDepartmentResponse, DepartmentResponseDetailsDTO departmentResponse) {
        DepartmentResponseDetailsDTO result = null;
        parentDepartmentResponse.setChildren(Arrays.asList(departmentResponse));
        if (parentDepartmentResponse.getDeptParentId() != 0L) {
            DepartmentChartMapping departmentDetails1 = this.departmentChartMappingRepository.getOne(parentDepartmentResponse.getDeptParentId(), 0);
            DepartmentResponseDetailsDTO currentParentDepartmentResponse = new DepartmentResponseDetailsDTO(departmentDetails1);
            result = this.buildParentObjectByDepartment(currentParentDepartmentResponse, parentDepartmentResponse);
        } else {
            result = parentDepartmentResponse;
        }
        return result;
    }

    public DepartmentChartDTO addDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        List employeeDepartmentMapping;
        Optional profilePo;
        if (departmentChartDTO.getOwner() != null) {
            this.saveRemoveOwner(departmentChartDTO.getOwner());
        }
        DepartmentDetails departmentDetails = null;
        if (StringUtils.isNotEmpty((CharSequence)departmentChartDTO.getDeptName()) && StringUtils.isNotEmpty((CharSequence)departmentChartDTO.getDeptUniqueId())) {
            departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(departmentChartDTO.getDeptUniqueId(), departmentChartDTO.getOrgId().longValue(), "Active");
            if (departmentDetails != null) {
                throw new InputValidationException("Department Unique Id already exist");
            }
            DepartmentDetails department = new DepartmentDetails();
            department.setName(departmentChartDTO.getDeptName());
            department.setOrgId(departmentChartDTO.getOrgId());
            department.setDeptUniqueID(departmentChartDTO.getDeptUniqueId());
            department.setStatus("Active");
            departmentDetails = (DepartmentDetails)this.departmentDetailsRepository.save(department);
            departmentChartDTO.setDeptId(Long.valueOf(departmentDetails.getId()));
        }
        DepartmentChartMapping departmentChartMapping = new DepartmentChartMapping(departmentChartDTO);
        departmentChartMapping.setCreatedTime(LocalDateTime.now());
        DepartmentChartDTO response = new DepartmentChartDTO((DepartmentChartMapping)this.departmentChartMappingRepository.save(departmentChartMapping));
        this.updateChildTracker(departmentChartMapping.getDeptId(), null, departmentChartMapping.getDeptParentId(), "Department");
        this.updateDeptMultipleOwner(response);
        if (departmentChartDTO.getEmailAddress() != null && (profilePo = this.employeeProfilePoRepo.findByEmail(departmentChartDTO.getEmailAddress(), departmentChartDTO.getOrgId().longValue())).isPresent()) {
            EmployeeProfilePo profilePo1 = (EmployeeProfilePo)profilePo.get();
            profilePo1.setDepartment(departmentChartDTO.getDeptName());
            profilePo1.setDeptId(departmentDetails);
            this.employeeProfilePoRepo.save(profilePo1);
        }
        if ((employeeDepartmentMapping = this.employeeDepartmentMappingRepository.departmentByEmployeeList(response.getDeptId().longValue(), "Active")).isEmpty()) {
            for (Long id : departmentChartDTO.getEmpIdList()) {
                EmployeeProfilePo employeeProfilePo = this.employeeDAO.getEmployeeProfile(id);
                if (employeeProfilePo == null) continue;
                this.saveDepartmentChartMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId(), Long.valueOf(response.getCreatedBy()), employeeProfilePo.getFirstName());
                this.saveUserDeptMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId());
            }
        } else {
            HashMap<Long, Long> idMap = new HashMap<Long, Long>();
            for (Long l : departmentChartDTO.getEmpIdList()) {
                idMap.put(l, l);
            }
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping employeeDepartmentMapping2 : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMapping) {
                if (!departmentChartDTO.getEmpIdList().isEmpty()) {
                    if (idMap.containsKey(employeeDepartmentMapping2.getEmpId())) {
                        idMap.remove(employeeDepartmentMapping2.getEmpId());
                        continue;
                    }
                    employeeDepartmentMapping2.setEndDate(new Date());
                    employeeDepartmentMapping2.setStatus("InActive");
                    employeeDepartmentMapping2.setUpdatedTime(LocalDateTime.now());
                    employeeDepartmentMapping2.setUpdatedBy(response.getCreatedBy());
                    this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping2);
                    this.deleteUserDeptMapping(employeeDepartmentMapping2.getEmpId(), employeeDepartmentMapping2.getDeptId());
                    continue;
                }
                employeeDepartmentMapping2.setEndDate(new Date());
                employeeDepartmentMapping2.setStatus("InActive");
                employeeDepartmentMapping2.setUpdatedTime(LocalDateTime.now());
                employeeDepartmentMapping2.setUpdatedBy(response.getCreatedBy());
                this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping2);
                this.deleteUserDeptMapping(employeeDepartmentMapping2.getEmpId(), employeeDepartmentMapping2.getDeptId());
            }
            for (Map.Entry entry : idMap.entrySet()) {
                EmployeeProfilePo employeeProfilePo = this.employeeDAO.getEmployeeProfile((Long)entry.getValue());
                if (employeeProfilePo == null) continue;
                this.saveDepartmentChartMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId(), Long.valueOf(response.getCreatedBy()), employeeProfilePo.getFirstName());
                this.saveUserDeptMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId());
            }
        }
        this.auditService.saveSuperAudit("Organisation", departmentChartDTO.getSuperCreatedBy(), departmentChartDTO.getDeptId().longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Department Created");
        this.updateChildTracker(departmentChartDTO.getDeptId(), null, departmentChartDTO.getDeptParentId(), "Department");
        this.deptTrackerService.saveDeptTrack(response, Long.valueOf(UserThreadLocal.get()));
        return response;
    }

    public DepartmentChartDTO getDepartmentMapping(Long depId) {
        DepartmentChartDTO response = new DepartmentChartDTO(this.departmentChartMappingRepository.getOne(depId, 0));
        return response;
    }

    public void saveDepartmentChartMapping(Long empId, Long deptId, Long createdBy, String name) {
        EmployeeDepartmentMapping employeeDepartmentMapping = new EmployeeDepartmentMapping();
        employeeDepartmentMapping.setDeptId(deptId);
        employeeDepartmentMapping.setEmpId(empId);
        employeeDepartmentMapping.setFirstName(name);
        employeeDepartmentMapping.setCreatedBy(createdBy.longValue());
        employeeDepartmentMapping.setCreatedTime(LocalDateTime.now());
        employeeDepartmentMapping.setStatus("Active");
        employeeDepartmentMapping.setStartDate(new Date());
        this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping);
    }

    public void saveUserDeptMapping(Long empId, Long deptId) {
        UserDeptMapping userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpIdANDDeptId(empId, deptId);
        if (userDeptMapping == null) {
            userDeptMapping = new UserDeptMapping();
            userDeptMapping.setEmpId(empId);
            userDeptMapping.setDeptId(deptId);
            this.userDeptMappingRepository.save(userDeptMapping);
        }
    }

    public void saveRemoveOwner(Long empId) {
        return;
    }

    public void deleteUserDeptMapping(Long empId, Long deptId) {
        return;
    }

    public void updateDeptMultipleOwner(DepartmentChartDTO response) {
        List deptMultipleOwnersMappingList = this.deptMultipleOwnersMappingRepo.getOwnerList(response.getOwner());
        if (!deptMultipleOwnersMappingList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping deptMultipleOwnersMapping : (java.util.List<com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping>)(java.util.List<?>)deptMultipleOwnersMappingList) {
                
            }
        }
        DeptMultipleOwnersMapping deptMultipleOwnersMapping = new DeptMultipleOwnersMapping(response.getOwner(), response.getDeptId());
        this.deptMultipleOwnersMappingRepo.save(deptMultipleOwnersMapping);
    }

    public DepartmentChartDTO updateDepartmentChartDTO(DepartmentChartDTO departmentChartDTO) {
        List employeeDepartmentMapping;
        Optional profilePo;
        if (departmentChartDTO.getOwner() != null) {
            this.saveRemoveOwner(departmentChartDTO.getOwner());
        }
        DepartmentDetails department = null;
        if (StringUtils.isNotEmpty((CharSequence)departmentChartDTO.getDeptName()) && (department = this.departmentDetailsRepository.findById(departmentChartDTO.getDeptId(), "Active")) != null) {
            DepartmentDetails department1;
            department.setName(departmentChartDTO.getDeptName());
            department.setOrgId(departmentChartDTO.getOrgId());
            department.setStatus("Active");
            department = department1 = (DepartmentDetails)this.departmentDetailsRepository.save(department);
            departmentChartDTO.setDeptId(Long.valueOf(department.getId()));
        }
        DepartmentChartMapping departmentChartMapping = new DepartmentChartMapping(departmentChartDTO);
        departmentChartMapping.setUpdatedTime(LocalDateTime.now());
        DepartmentChartDTO response = new DepartmentChartDTO((DepartmentChartMapping)this.departmentChartMappingRepository.save(departmentChartMapping));
        this.updateChildTracker(departmentChartMapping.getDeptId(), null, departmentChartMapping.getDeptParentId(), "Department");
        this.updateDeptMultipleOwner(response);
        if (departmentChartDTO.getEmailAddress() != null && (profilePo = this.employeeProfilePoRepo.findByEmail(departmentChartDTO.getEmailAddress(), departmentChartDTO.getOrgId().longValue())).isPresent()) {
            EmployeeProfilePo profilePo1 = (EmployeeProfilePo)profilePo.get();
            profilePo1.setDepartment(department.getName());
            profilePo1.setDeptId(department);
            this.employeeProfilePoRepo.save(profilePo1);
        }
        if ((employeeDepartmentMapping = this.employeeDepartmentMappingRepository.departmentByEmployeeList(departmentChartDTO.getDeptId().longValue(), "Active")).isEmpty()) {
            for (Long id : departmentChartDTO.getEmpIdList()) {
                EmployeeProfilePo employeeProfilePo = this.employeeDAO.getEmployeeProfile(id);
                if (employeeProfilePo == null) continue;
                this.saveDepartmentChartMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId(), Long.valueOf(response.getCreatedBy()), employeeProfilePo.getFirstName());
                this.saveUserDeptMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId());
            }
        } else {
            HashMap<Long, Long> idMap = new HashMap<Long, Long>();
            for (Long l : departmentChartDTO.getEmpIdList()) {
                idMap.put(l, l);
            }
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping employeeDepartmentMapping2 : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMapping) {
                if (!departmentChartDTO.getEmpIdList().isEmpty()) {
                    if (idMap.containsKey(employeeDepartmentMapping2.getEmpId())) {
                        idMap.remove(employeeDepartmentMapping2.getEmpId());
                        continue;
                    }
                    employeeDepartmentMapping2.setEndDate(new Date());
                    employeeDepartmentMapping2.setStatus("InActive");
                    employeeDepartmentMapping2.setUpdatedTime(LocalDateTime.now());
                    employeeDepartmentMapping2.setUpdatedBy(response.getCreatedBy());
                    this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping2);
                    this.deleteUserDeptMapping(employeeDepartmentMapping2.getEmpId(), employeeDepartmentMapping2.getDeptId());
                    continue;
                }
                employeeDepartmentMapping2.setEndDate(new Date());
                employeeDepartmentMapping2.setStatus("InActive");
                employeeDepartmentMapping2.setUpdatedTime(LocalDateTime.now());
                employeeDepartmentMapping2.setUpdatedBy(response.getCreatedBy());
                this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping2);
                this.deleteUserDeptMapping(employeeDepartmentMapping2.getEmpId(), employeeDepartmentMapping2.getDeptId());
            }
            for (Map.Entry entry : idMap.entrySet()) {
                EmployeeProfilePo employeeProfilePo = this.employeeDAO.getEmployeeProfile((Long)entry.getValue());
                if (employeeProfilePo == null) continue;
                this.saveDepartmentChartMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId(), Long.valueOf(response.getCreatedBy()), employeeProfilePo.getFirstName());
                this.saveUserDeptMapping(Long.valueOf(employeeProfilePo.getEmpId()), response.getDeptId());
            }
        }
        this.auditService.updateSuperAudit("Organisation", departmentChartDTO.getSuperCreatedBy(), departmentChartDTO.getDeptId().longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Department Modified");
        this.deptTrackerService.updateDeptTrack(response, Long.valueOf(UserThreadLocal.get()));
        return response;
    }

    public EmployeeResponseDTO deleteDepartmentChartDTO(Long deptId) {
        Optional departmentDetails;
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        DepartmentChartMapping departmentChartMapping = this.departmentChartMappingRepository.getOne(deptId, 0);
        DepartmentChartDTO departmentChartDTO = new DepartmentChartDTO(departmentChartMapping);
        if (departmentChartMapping != null) {
            departmentChartMapping.setActive(1);
            this.departmentChartMappingRepository.save(departmentChartMapping);
            this.updateChildTracker(departmentChartMapping.getDeptId(), departmentChartMapping.getDeptParentId(), null, "Department");
            List childList = this.departmentChartMappingRepository.getAllDepartmentByParentId(departmentChartMapping.getDeptId(), 0);
            if (!childList.isEmpty()) {
                for (com.estrat.backend.db.bean.po.DepartmentChartMapping updateChartMapping : (java.util.List<com.estrat.backend.db.bean.po.DepartmentChartMapping>)(java.util.List<?>)childList) {
                    updateChartMapping.setDeptParentId(departmentChartMapping.getDeptParentId());
                    this.departmentChartMappingRepository.save(updateChartMapping);
                    this.updateChildTracker(updateChartMapping.getDeptId(), departmentChartMapping.getDeptId(), departmentChartMapping.getDeptParentId(), "Department");
                }
            }
        }
        if ((departmentDetails = this.departmentDetailsRepository.findById(deptId)).isPresent()) {
            DepartmentDetails departmentDetails1 = (DepartmentDetails)departmentDetails.get();
            departmentDetails1.setStatus("InActive");
            this.departmentDetailsRepository.save(departmentDetails1);
        }
        this.auditService.deleteAudit("Organisation", departmentChartDTO.getDeptId().longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Department Deleted");
        this.deptTrackerService.deleteDeptTrack(departmentChartDTO, Long.valueOf(UserThreadLocal.get()));
        employeeResponseDTO.setUpdateFlag(true);
        return employeeResponseDTO;
    }

    public boolean createBulkDeptMapping(DeptImportDTO deptImportDTO, String createdBy) {
        EmployeeProfilePo ownerProfile = null;
        DepartmentDetails departmentDetails;
        boolean status = false;
        Long oldParent = null;
        if (StringUtils.isBlank(createdBy) || "null".equals(createdBy)) {
            createdBy = UserThreadLocal.get();
        }
        if (StringUtils.isBlank(createdBy) || "null".equals(createdBy)) {
            createdBy = "0";
        }
        OrganizationDetails organizationDetails = this.getOrgDetails(deptImportDTO.getOrgName());
        if (organizationDetails == null) {
            // org name from Excel didn't match — fall back to the creator's org
            com.estrat.backend.db.bean.po.EmployeeProfilePo creatorProfile =
                this.employeeProfilePoRepo.findById(Long.valueOf(createdBy)).orElse(null);
            if (creatorProfile != null && creatorProfile.getOrgId() != null) {
                OrgDetails fallback = this.orgDetailsRepository.findById(creatorProfile.getOrgId().getId()).orElse(null);
                if (fallback != null) {
                    organizationDetails = new OrganizationDetails(fallback);
                }
            }
            if (organizationDetails == null) {
                // last resort: first org in DB
                java.util.List<OrgDetails> all = this.orgDetailsRepository.findAll();
                if (!all.isEmpty()) organizationDetails = new OrganizationDetails(all.get(0));
            }
        }
        if (organizationDetails == null) {
            this.log.error("createBulkDeptMapping: cannot resolve org for '" + deptImportDTO.getOrgName() + "', skipping dept " + deptImportDTO.getDeptID());
            return false;
        }
        DepartmentChartDTO departmentChartDTO = new DepartmentChartDTO();
        departmentChartDTO.setActive(0);
        departmentChartDTO.setCreatedBy(Long.valueOf(createdBy).longValue());
        departmentChartDTO.setCreatedTime(LocalDateTime.now());
        departmentChartDTO.setOrgId(Long.valueOf(organizationDetails.getOrgId()));
        if (deptImportDTO.getEmailAddress() != null) {
            departmentChartDTO.setEmailAddress(deptImportDTO.getEmailAddress());
        }
        if ((departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(deptImportDTO.getDeptID(), organizationDetails.getOrgId(), "Active")) != null) {
            if (!departmentDetails.getName().equalsIgnoreCase(deptImportDTO.getDeptName())) {
                departmentDetails.setName(deptImportDTO.getDeptName());
                this.departmentDetailsRepository.save(departmentDetails);
                departmentChartDTO.setDeptName(deptImportDTO.getDeptName());
            } else {
                departmentChartDTO.setDeptName(departmentDetails.getName());
            }
            departmentChartDTO.setDeptId(Long.valueOf(departmentDetails.getId()));
            departmentChartDTO.setDeptUniqueId(departmentDetails.getDeptUniqueID());
            oldParent = departmentChartDTO.getDeptParentId();
        } else {
            DepartmentDetails departmentDetails1;
            departmentDetails = new DepartmentDetails();
            departmentDetails.setStatus("Active");
            departmentDetails.setOrgId(Long.valueOf(organizationDetails.getOrgId()));
            departmentDetails.setName(deptImportDTO.getDeptName());
            departmentDetails.setDeptUniqueID(deptImportDTO.getDeptID());
            departmentDetails = departmentDetails1 = (DepartmentDetails)this.departmentDetailsRepository.save(departmentDetails);
            departmentChartDTO.setDeptId(Long.valueOf(departmentDetails.getId()));
            departmentChartDTO.setDeptName(departmentDetails.getName());
            departmentChartDTO.setDeptUniqueId(departmentDetails.getDeptUniqueID());
            status = true;
        }
        if (org.apache.commons.lang3.StringUtils.isNotBlank(deptImportDTO.getParentDeptID())) {
            DeptDetails parentDept = this.getDepartmentDetailsByDeptUniqueId(
                    deptImportDTO.getParentDeptID(), Long.valueOf(organizationDetails.getOrgId()));
            if (parentDept != null) {
                departmentChartDTO.setDeptParentId(Long.valueOf(parentDept.getId()));
            } else {
                this.log.warn("createBulkDeptMapping: parent dept '" + deptImportDTO.getParentDeptID()
                        + "' not found for '" + deptImportDTO.getDeptID() + "', using root");
                departmentChartDTO.setDeptParentId(Long.valueOf(0L));
            }
        } else {
            departmentChartDTO.setDeptParentId(Long.valueOf(0L));
        }
        ownerProfile = this.resolveImportEmployeeProfile(
                deptImportDTO.getEmailAddress(), deptImportDTO.getOwnerName(), organizationDetails.getOrgId());
        if (ownerProfile != null) {
            departmentChartDTO.setOwner(Long.valueOf(ownerProfile.getEmpId()));
            this.saveRemoveOwner(departmentChartDTO.getOwner());
            ownerProfile.setDeptId(departmentDetails);
            ownerProfile.setDepartment(departmentDetails.getName());
            this.employeeProfilePoRepo.save(ownerProfile);
        }
        String memberEmail = deptImportDTO.getMember();
        if (memberEmail != null && !memberEmail.isEmpty() && !memberEmail.contains("@")) {
            EmployeeProfilePo memberProfile = this.resolveImportEmployeeProfile(null, memberEmail, organizationDetails.getOrgId());
            memberEmail = memberProfile != null ? memberProfile.getEmailAddress() : null;
        }
        this.updateDeptMap(departmentChartDTO, memberEmail);
        if (status) {
            this.auditService.saveSuperAudit("User", departmentChartDTO.getSuperCreatedBy(), departmentChartDTO.getDeptId().longValue(), Long.valueOf(createdBy).longValue(), "Department Created");
            this.deptTrackerService.saveOrUpdateDeptTrack(departmentChartDTO, Long.valueOf(createdBy));
        } else {
            this.auditService.updateSuperAudit("User", departmentChartDTO.getSuperCreatedBy(), departmentChartDTO.getDeptId().longValue(), Long.valueOf(createdBy).longValue(), "Department Updated");
            this.deptTrackerService.saveOrUpdateDeptTrack(departmentChartDTO, Long.valueOf(createdBy));
        }
        this.updateChildTracker(departmentChartDTO.getDeptId(), oldParent, departmentChartDTO.getDeptParentId(), "Department");
        return true;
    }

    private void updateDeptMap(DepartmentChartDTO departmentChartDTO, String emailList) {
        List employeeDepartmentMapping;
        EmployeeProfilePo employeeProfilePo;
        DepartmentChartMapping departmentChartMapping = new DepartmentChartMapping(departmentChartDTO);
        DepartmentChartMapping response = this.departmentChartMappingRepository.getOne(departmentChartDTO.getDeptId());
        if (response != null) {
            this.updateDepartmentChartDetails(response, departmentChartMapping);
            response = (DepartmentChartMapping)this.departmentChartMappingRepository.saveAndFlush(departmentChartMapping);
        } else {
            response = (DepartmentChartMapping)this.departmentChartMappingRepository.saveAndFlush(departmentChartMapping);
        }
        DepartmentChartDTO chartDTO = new DepartmentChartDTO(response);
        this.updateDeptMultipleOwner(chartDTO);
        HashMap<Long, Long> idMap = new HashMap<Long, Long>();
        if (emailList != null && !emailList.isEmpty()) {
            List<String> email = Arrays.asList(emailList.split("\\,"));
            for (String string : email) {
                employeeProfilePo = this.employeeProfilePoRepo.findByEmail(string, departmentChartDTO.getOrgId().longValue(), "Active");
                if (employeeProfilePo == null) continue;
                idMap.put(employeeProfilePo.getEmpId(), employeeProfilePo.getEmpId());
            }
        }
        if (!(employeeDepartmentMapping = this.employeeDepartmentMappingRepository.departmentByEmployeeList(chartDTO.getDeptId().longValue(), "Active")).isEmpty()) {
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping employeeDepartmentMapping2 : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMapping) {
                if (idMap.containsKey(employeeDepartmentMapping2.getEmpId())) {
                    idMap.remove(employeeDepartmentMapping2.getEmpId());
                    continue;
                }
                employeeDepartmentMapping2.setEndDate(new Date());
                employeeDepartmentMapping2.setStatus("InActive");
                employeeDepartmentMapping2.setUpdatedTime(LocalDateTime.now());
                employeeDepartmentMapping2.setUpdatedBy(chartDTO.getCreatedBy());
                this.employeeDepartmentMappingRepository.save(employeeDepartmentMapping2);
                this.deleteUserDeptMapping(employeeDepartmentMapping2.getEmpId(), employeeDepartmentMapping2.getDeptId());
            }
        }
        for (Map.Entry entry : idMap.entrySet()) {
            employeeProfilePo = this.employeeDAO.getEmployeeProfile((Long)entry.getValue());
            if (employeeProfilePo == null) continue;
            this.saveDepartmentChartMapping(Long.valueOf(employeeProfilePo.getEmpId()), chartDTO.getDeptId(), Long.valueOf(chartDTO.getCreatedBy()), employeeProfilePo.getFirstName());
            this.saveUserDeptMapping(Long.valueOf(employeeProfilePo.getEmpId()), chartDTO.getDeptId());
        }
    }

    private void updateDepartmentChartDetails(DepartmentChartMapping response, DepartmentChartMapping departmentChart) {
        if (response.getOwner() != null && departmentChart.getOwner() == null) {
            departmentChart.setOwner(response.getOwner());
        }
    }

    /**
     * Resolves an employee for org/dept Excel import by email or display name.
     * Uses first+last name when available so "James Harrington" does not collide with other James rows.
     */
    private EmployeeProfilePo resolveImportEmployeeProfile(String emailAddress, String displayName, long orgId) {
        if (emailAddress != null && !emailAddress.isEmpty()) {
            String email = emailAddress.trim();
            if (email.contains("@")) {
                return this.employeeProfilePoRepo.findByEmail(email, orgId, "Active");
            }
        }
        if (displayName == null || displayName.isEmpty()) {
            return null;
        }
        String name = displayName.trim();
        if (name.contains("@")) {
            return this.employeeProfilePoRepo.findByEmail(name, orgId, "Active");
        }
        OrgDetails org = new OrgDetails();
        org.setId(orgId);
        String[] parts = name.split("\\s+");
        if (parts.length >= 2) {
            String firstName = parts[0];
            String lastName = String.join(" ", java.util.Arrays.copyOfRange(parts, 1, parts.length));
            List<EmployeeProfilePo> fullNameMatches =
                    this.employeeProfilePoRepo.findByFirstNameAndLastNameAndStatusAndOrgId(firstName, lastName, "Active", org);
            if (fullNameMatches != null && !fullNameMatches.isEmpty()) {
                if (fullNameMatches.size() > 1) {
                    this.log.warn("[Org Import] multiple employees named '" + name + "' in org_id=" + orgId
                            + " — using emp_id=" + fullNameMatches.get(0).getEmpId());
                }
                return fullNameMatches.get(0);
            }
            // Full name provided but no match — skip owner (dept-first import: link after Users file).
            this.log.debug("[Org Import] owner '" + name + "' not found in org_id=" + orgId
                    + " — skipping until employee exists");
            return null;
        }
        List<EmployeeProfilePo> firstNameMatches =
                this.employeeProfilePoRepo.findByFirstNameAndStatusAndOrgId(parts[0], "Active", org);
        if (firstNameMatches != null && !firstNameMatches.isEmpty()) {
            if (firstNameMatches.size() > 1) {
                this.log.warn("[Org Import] ambiguous first name '" + parts[0] + "' (" + firstNameMatches.size()
                        + " matches) in org_id=" + orgId + " — using emp_id=" + firstNameMatches.get(0).getEmpId());
            }
            return firstNameMatches.get(0);
        }
        return null;
    }

    public Employee findProfileByName(String firstName, Long orgId) {
        Employee employee = null;
        EmployeeProfilePo employeeProfilePo = this.employeeProfilePoRepo.findByFirstName(firstName, orgId.longValue(), "Active");
        employee = employeeProfilePo != null ? new Employee(employeeProfilePo, Boolean.valueOf(false)) : new Employee();
        return employee;
    }

    public DepartmentChartMapping getDepartmentChart(String email) {
        return this.departmentChartMappingRepository.getOne(email, 0);
    }

    public String getEmails(Long deptId) {
        String email = null;
        List employeeDepartmentMappings = this.employeeDepartmentMappingRepository.departmentByEmployeeList(deptId.longValue(), "Active");
        if (!employeeDepartmentMappings.isEmpty()) {
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping departmentMapping : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMappings) {
                Optional employeeProfilePo = this.employeeProfilePoRepo.findById(departmentMapping.getEmpId());
                if (!employeeProfilePo.isPresent()) continue;
                if (email == null) {
                    email = ((EmployeeProfilePo)employeeProfilePo.get()).getEmailAddress();
                    continue;
                }
                email = email + ", " + ((EmployeeProfilePo)employeeProfilePo.get()).getEmailAddress();
            }
        }
        return email;
    }

    public DepartmentChartDTO updateDepartmentParent(Long deptId, Long deptParentId, Long updatedBy) {
        Optional departmentChartMapping = this.departmentChartMappingRepository.findById(deptId);
        HashMap child_mapping = new HashMap();
        if (departmentChartMapping.isPresent()) {
            DepartmentChartMapping departmentChart = (DepartmentChartMapping)departmentChartMapping.get();
            Long oldParent = departmentChart.getDeptParentId();
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("parentId", departmentChart.getDeptParentId());
            map.put("deptName", departmentChart.getDeptName());
            map.put("drillName", departmentChart.getDeptId() + "-" + departmentChart.getDeptName());
            child_mapping.put(departmentChart.getDeptId(), map);
            departmentChart.setUpdatedTime(LocalDateTime.now());
            departmentChart.setDeptParentId(deptParentId);
            departmentChart.setUpdatedBy(updatedBy.longValue());
            DepartmentChartDTO response = new DepartmentChartDTO((DepartmentChartMapping)this.departmentChartMappingRepository.save(departmentChart));
            this.updateChildTracker(departmentChart.getDeptId(), oldParent, deptParentId, "Department");
            this.deptTrackerService.updateDeptTrack(response, updatedBy);
            return response;
        }
        return new DepartmentChartDTO();
    }

    public void updateChildTracker(Long childId, Long oldParent, Long newParent, String type) {
        List childTrackerresult;
        String orgIdStr = UserThreadLocal.get((String)"USER_ORG_ID");
        String empIdStr = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
        long orgId = 0L;
        long empId = 0L;
        try { if (orgIdStr != null && !"null".equals(orgIdStr)) orgId = Long.parseLong(orgIdStr); } catch (Exception ignored) {}
        try { if (empIdStr != null && !"null".equals(empIdStr)) empId = Long.parseLong(empIdStr); } catch (Exception ignored) {}

        if (oldParent != null && (childTrackerresult = this.childTrackerRepository.findByListParentwoEndDate(oldParent, childId)) != null && childTrackerresult.size() > 0) {
            this.childTrackerRepository.updateParentwoEndDate(oldParent, childId);
        }
        if (newParent != null) {
            ChildTracker childTracker_new = new ChildTracker();
            childTracker_new.setChildId(childId);
            childTracker_new.setType(type);
            childTracker_new.setCreatedTime(LocalDateTime.now());
            childTracker_new.setCreatedBy(empId);
            childTracker_new.setOrgId(orgId);
            childTracker_new.setParentId(newParent);
            childTracker_new.setFromDate(new Date());
            this.childTrackerRepository.save(childTracker_new);
        }
    }

    public Map<Long, Map<String, Object>> childList(List<Long> deptId, Map<Long, Map<String, Object>> child_mapping, List<Long> childtreeList) {
        List departmentChartMapping = this.departmentChartMappingRepository.getAllDepartmentByListParentId(deptId, 0);
        if (departmentChartMapping != null && departmentChartMapping.size() > 0) {
            ArrayList<Long> setofParentList = new ArrayList<Long>();
            for (com.estrat.backend.db.bean.po.DepartmentChartMapping deptchart : (java.util.List<com.estrat.backend.db.bean.po.DepartmentChartMapping>)(java.util.List<?>)departmentChartMapping) {
                setofParentList.add(deptchart.getDeptId());
                HashMap<String, Object> map = new HashMap<String, Object>();
                map.put("parentId", deptchart.getDeptParentId());
                map.put("deptName", deptchart.getDeptName());
                map.put("drillName", deptchart.getDeptId() + "-" + deptchart.getDeptName());
                child_mapping.put(deptchart.getDeptId(), map);
                childtreeList.add(deptchart.getDeptId());
            }
            return this.childList(setofParentList, child_mapping, childtreeList);
        }
        return child_mapping;
    }

    public Long superUserDeptId() {
        EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo)this.employeeProfilePoRepo.getOne(this.userRoleManagementService.superUserId());
        if (employeeProfilePo != null && employeeProfilePo.getDeptId() != null) {
            DepartmentDetails departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(
                    employeeProfilePo.getDeptId().getDeptUniqueID(), employeeProfilePo.getOrgId().getId(), "Active");
            if (departmentDetails != null) {
                return departmentDetails.getId();
            }
        }
        return 0L;
    }

    public LocalDateTime getFirstDateTime(Date date) {
        String datePattern24Hrs = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat24Hrs = new SimpleDateFormat(datePattern24Hrs);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        Date dateTime = calendar.getTime();
        String dateTimeIn24Hrs = simpleDateFormat24Hrs.format(dateTime);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeIn24Hrs, formatter);
        return localDateTime;
    }

    public LocalDateTime getSecondDateTime(Date date) {
        String datePattern24Hrs = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat24Hrs = new SimpleDateFormat(datePattern24Hrs);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 23);
        calendar.set(12, 59);
        calendar.set(13, 59);
        calendar.set(14, 59);
        Date dateTime = calendar.getTime();
        String dateTimeIn24Hrs = simpleDateFormat24Hrs.format(dateTime);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeIn24Hrs, formatter);
        return localDateTime;
    }

    public EmployeeResponseDTO updateInactiveEmployee(Employee employee) {
        this.cacheUtil.removeEmployeeCache((Object)employee.getEmpId());
        this.updateMandatoryFields(employee, "InActive");
        this.populateDepartmentFromRequest(employee);
        OrgDetails savedOrgDetails = this.employeeDAO.mergeOrgDetails(new OrgDetails(employee.getOrgDetails()));
        employee.getOrgDetails().setOrgId(savedOrgDetails.getId());
        if (employee.getDeptDetails() != null) {
            DeptDetails savedDeptDetails = this.employeeDAO.mergeDeptDetails(employee.getDeptDetails());
            employee.getDeptDetails().setId(savedDeptDetails.getId());
        }
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        this.employeeDAO.updateEmployeeProfile(employee);
        this.auditService.updateSuperAudit("User", employee.getSuperCreatedBy(), employee.getEmpId(), employee.getEmpId(), "User Modified");
        EmployeeCredentialsPo employeeCredentialsPo = new EmployeeCredentialsPo();
        if (employee.getDeptDetails() != null) {
            employeeCredentialsPo.setDeptId(new DepartmentDetails(employee.getDeptDetails()));
        }
        employeeCredentialsPo.setEmpId(employee.getEmpId());
        employeeCredentialsPo.setEmailAddress(employee.getEmailAddress());
        employeeCredentialsPo.setOrgId(new OrgDetails(employee.getOrgDetails()));
        employeeCredentialsPo.setPassword(employee.getPassword());
        employeeCredentialsPo.setStatus("Active");
        employeeCredentialsPo.setUserName(employee.getEmailAddress());
        this.employeeDAO.updateEmployeeCredentials(employeeCredentialsPo);
        this.updateOrgStructureDetails(employee);
        if (employee.getDeptDetails() != null) {
            this.updateEmployeeMappingDetails(employee);
            this.updateDepartmentMappingDetails(employee);
        }
        employeeResponseDTO.setUpdateFlag(true);
        this.orgTrackerService.updateOrgTrack(employee, Long.valueOf(UserThreadLocal.get()));
        this.userRoleManagementService.saveUserRoleManagement(employee, "Update");
        this.updateChildTracker(Long.valueOf(employee.getEmpId()), null, Long.valueOf(employee.getParentEmpId()), "Employee");
        this.cacheUtil.removeEmployeeCache((Object)employee.getParentEmpId());
        this.cacheUtil.removeEmployeeCache((Object)employee.getEmpId());
        return employeeResponseDTO;
    }

    public String getUniqueId(Long orgId) {
        OrgDetails organizationDetails = (OrgDetails)this.orgDetailsRepository.getOne(orgId);
        String subString = organizationDetails.getName().substring(0, 3);
        long count = this.departmentDetailsRepository.countDeptList(orgId.longValue());
        return subString + count++;
    }

    public List<Employee> getEmployeeList(Long orgId) {
        return new java.util.ArrayList<>();
    }

    public List<DepartmentChartDTO> getDepartmentList(Long orgId) {
        return new java.util.ArrayList<>();
    }

    public EmployeeResponseDTO deleteEmployee(String employeeID) {
        EmployeeResponseDTO employeeResponseDTO = new EmployeeResponseDTO();
        long empId = Long.parseLong(employeeID);
        Optional<EmployeeProfilePo> profilePos = this.employeeProfilePoRepo.findById(Long.valueOf(empId));
        if (profilePos.isPresent()) {
            EmployeeProfilePo profile = profilePos.get();
            long parentEmpId = profile.getParentEmpId();

            // Reassign direct reportees to the deleted node's parent so the tree stays connected.
            List<EmployeeProfilePo> children = this.employeeProfilePoRepo.findChildList(Long.valueOf(empId));
            if (children != null) {
                for (EmployeeProfilePo child : children) {
                    child.setParentEmpId(parentEmpId);
                    this.employeeProfilePoRepo.save(child);
                }
            }

            // Clean up related mappings (these impls already work).
            this.userDeptMappingRepository.deleteAll((Iterable)this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(empId)));
            this.deleteEmployeeDepartmentMapping(employeeID);
            this.deleteOrgStructureDetails(employeeID);
            this.deleteRoleMapping(employeeID);
            this.deleteCredentialsPo(employeeID);
            this.deleteOrgTrack(new Employee(profile));

            // Soft-delete: the org tree is filtered by status='Active', so flipping the
            // status hides the employee while preserving referential history.
            this.deleteEmployeeProfile(employeeID);
        }
        employeeResponseDTO.setUpdateFlag(true);
        return employeeResponseDTO;
    }

    public void deleteEmployeeDepartmentMapping(String employeeID) {
        List employeeDepartmentMappingList = this.employeeDepartmentMappingRepository.findByEmpId(Long.valueOf(employeeID).longValue(), "Active");
        if (!employeeDepartmentMappingList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping employeeDepartmentMapping : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMappingList) {
                this.employeeDepartmentMappingRepository.delete(employeeDepartmentMapping);
            }
        }
    }

    public void deleteOrgTrack(Employee employee) {
        List orgTrackers = this.orgTrackerRepository.findByAllList(employee.getEmpId());
        if (!orgTrackers.isEmpty()) {
            for (com.estrat.backend.db.bean.po.OrgTracker orgTracker : (java.util.List<com.estrat.backend.db.bean.po.OrgTracker>)(java.util.List<?>)orgTrackers) {
                this.orgTrackerRepository.delete(orgTracker);
            }
        }
    }

    public void deleteDeptTrack(Long deptId) {
        List deptTrackers = this.deptTrackerRepository.findByAllList(deptId.longValue());
        if (!deptTrackers.isEmpty()) {
            for (com.estrat.backend.db.bean.po.DeptTracker orgTracker : (java.util.List<com.estrat.backend.db.bean.po.DeptTracker>)(java.util.List<?>)deptTrackers) {
                this.deptTrackerRepository.delete(orgTracker);
            }
        }
    }

    public void deleteOrgStructureDetails(String employeeID) {
        // End-date (not delete) so the historical org chart can still reconstruct the
        // hierarchy as it stood on any past date. Only the currently-active row is closed.
        List orgStructureDetailsList = this.orgStructureDetailsRepository.findList(Long.valueOf(employeeID).longValue());
        if (orgStructureDetailsList != null && !orgStructureDetailsList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.OrgStructureDetails orgStructureDetails : (java.util.List<com.estrat.backend.db.bean.po.OrgStructureDetails>)(java.util.List<?>)orgStructureDetailsList) {
                if (orgStructureDetails == null) continue;
                if ("Active".equalsIgnoreCase(orgStructureDetails.getStatus())) {
                    orgStructureDetails.setStatus("InActive");
                    orgStructureDetails.setEndDate(new Date());
                    orgStructureDetails.setUpdatedTime(LocalDateTime.now());
                    this.orgStructureDetailsRepository.save(orgStructureDetails);
                }
            }
        }
    }

    public void deleteDeptOwner(String employeeID) {
        List ownerList = this.deptMultipleOwnersMappingRepo.getOwnerList(Long.valueOf(employeeID));
        if (ownerList != null && !ownerList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping deptMultipleOwnersMapping : (java.util.List<com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping>)(java.util.List<?>)ownerList) {
                
            }
        }
    }

    public void deleteCredentialsPo(String employeeID) {
        List credsList = this.employeeCredentialsPoRepo.getOnewostatus(Long.valueOf(employeeID).longValue());
        if (credsList != null && !credsList.isEmpty()) {
            for (EmployeeCredentialsPo cred : (java.util.List<EmployeeCredentialsPo>)(java.util.List<?>)credsList) {
                cred.setStatus("InActive");
                this.employeeCredentialsPoRepo.save(cred);
            }
        }
    }

    public void deleteEmployeeProfile(String employeeID) {
        Optional<EmployeeProfilePo> profilePos = this.employeeProfilePoRepo.findById(Long.valueOf(Long.parseLong(employeeID)));
        if (profilePos.isPresent()) {
            EmployeeProfilePo profile = profilePos.get();
            profile.setStatus("InActive");
            this.employeeProfilePoRepo.save(profile);
        }
    }

    public void deleteEmployeePagesLinkDetails(String employeeID) {
        return;
    }

    public void deleteRoleMapping(String employeeID) {
        List roleMaps = this.roleUserMappingRepository.findAllEmpId(Long.valueOf(Long.parseLong(employeeID)));
        if (roleMaps != null && !roleMaps.isEmpty()) {
            this.roleUserMappingRepository.deleteAll((Iterable)roleMaps);
        }
    }

    public void deleteUserDeptMapping(String empId) {
        return;
    }

    public Long getUserDeptMappingwithempid(String empId) {
        List userDeptMappingList = this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(empId));
        if (userDeptMappingList != null && userDeptMappingList.size() > 0) {
            return ((UserDeptMapping)userDeptMappingList.get(0)).getDeptId();
        }
        EmployeeProfilePo profile = this.employeeProfilePoRepo.findByEmpId(Long.valueOf(Long.parseLong(empId)));
        if (profile.getDeptId() != null) {
            return profile.getDeptId().getId();
        }
        return null;
    }

    public EmployeeResponseDTO deleteOrgDept(String deptId) {
        return null;
    }

    public void deleteEmployeeDepartmentMappingByDeptID(String deptId) {
        List employeeDepartmentMappingList = this.employeeDepartmentMappingRepository.findByDeptId(Long.valueOf(deptId).longValue());
        if (!employeeDepartmentMappingList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.EmployeeDepartmentMapping employeeDepartmentMapping : (java.util.List<com.estrat.backend.db.bean.po.EmployeeDepartmentMapping>)(java.util.List<?>)employeeDepartmentMappingList) {
                this.employeeDepartmentMappingRepository.delete(employeeDepartmentMapping);
            }
        }
    }

    public void deleteDeptOwnerByDept(String deptId) {
        List deptList = this.deptMultipleOwnersMappingRepo.getDeptList(Long.valueOf(deptId));
        if (deptList != null && !deptList.isEmpty()) {
            for (com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping deptMultipleOwnersMapping : (java.util.List<com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping>)(java.util.List<?>)deptList) {
                
            }
        }
    }

    public void deleteUserDeptMappingByDeptId(String deptId) {
        return;
    }

    public void updateEmployeeDetails(String deptId) {
        return;
    }

    public List<Employee> getAllDeptReporteeList(long empId) {
        return new java.util.ArrayList<>();
    }

    public List<Employee> buildAllDeptReporteeList(long deptId) {
        List deptIds = this.employeeDAO.getDepartmentIdList(deptId);
        if (deptIds != null && !deptIds.isEmpty()) {
            List empIds = this.userRoleManagementRepository.userIdListByEmpIDs(this.departmentChartMappingRepository.findOwnerIDList(deptIds));
            List reporteeList = this.employeeDAO.getEmployeeListByEmpIdList(empIds);
            return reporteeList;
        }
        return new ArrayList<Employee>();
    }

    public Employee getProfileDetails(EmployeeDTO employeeDTO) {
        Employee employee = this.employeeDAO.getEmployee(employeeDTO);
        EmployeeCredentialsPo credentialsPo = this.employeeDAO.getEmployeeCredentials(employeeDTO.getEmployeeId());
        if (credentialsPo != null) {
            employee.setPassword(credentialsPo.getPassword());
        }
        employee.setUserRoleName(this.userRoleManagementService.getUserRole(employee.getEmpId()));
        UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()));
        if (userRoleManagement != null) {
            employee.setUserAccess(userRoleManagement.getUserAccess());
        } else {
            employee.setUserAccess(1);
        }
        return employee;
    }

    public Employee getEmployeeWithAllStatus(EmployeeDTO employeeDTO) {
        if (this.dbCache.get((Object)employeeDTO.getEmployeeId(), "dbCache") != null) {
            this.log.debug((Object)"getEmployee returned from cache");
            Employee employee = (Employee)this.dbCache.get((Object)employeeDTO.getEmployeeId(), "dbCache");
            employee.setUserRoleName(this.userRoleManagementService.getUserRole(employee.getEmpId()));
            UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()));
            if (userRoleManagement != null) {
                employee.setUserAccess(userRoleManagement.getUserAccess());
            } else {
                employee.setUserAccess(1);
            }
            return employee;
        }
        Employee employee = this.employeeDAO.getEmployee(employeeDTO);
        EmployeeCredentialsPo credentialsPo = this.employeeDAO.getEmployeeCredentialsWithNoStatus(Long.valueOf(employeeDTO.getEmployeeId()));
        if (credentialsPo != null) {
            employee.setPassword(credentialsPo.getPassword());
        }
        this.log.debug((Object)"getEmployee populated into cache");
        this.dbCache.put((Object)employeeDTO.getEmployeeId(), (Object)employee, "dbCache");
        employee.setUserRoleName(this.userRoleManagementService.getUserRole(employee.getEmpId()));
        UserRoleManagement userRoleManagement = this.userRoleManagementRepository.findByID(Long.valueOf(employee.getEmpId()));
        if (userRoleManagement != null) {
            employee.setUserAccess(userRoleManagement.getUserAccess());
        } else {
            employee.setUserAccess(1);
        }
        return employee;
    }
}

