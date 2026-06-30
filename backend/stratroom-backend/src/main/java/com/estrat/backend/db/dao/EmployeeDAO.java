/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.EmployeeCredentialsPo
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.bean.po.OrgStructureDetails
 *  com.estrat.backend.db.config.LdapConfig
 *  com.estrat.backend.db.dao.EmployeeDAO
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.backend.db.dao.OrgDetailsRepository
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.exception.ExceptionLogHelper
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.repository.DeptTrackerRepository
 *  com.estrat.backend.db.repository.EmployeeCredentialsPoRepo
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.repository.OrgStructureDetailsRepository
 *  com.estrat.backend.db.repository.UserDeptMappingRepository
 *  com.estrat.backend.db.resource.util.CacheUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.dao.DataAccessException
 *  org.springframework.jdbc.core.JdbcTemplate
 *  org.springframework.ldap.core.LdapTemplate
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.EmployeeCredentialsPo;
import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgDetails;
import com.estrat.backend.db.bean.po.OrgStructureDetails;
import com.estrat.backend.db.config.LdapConfig;
import com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.backend.db.dao.OrgDetailsRepository;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.exception.ExceptionLogHelper;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.repository.DeptTrackerRepository;
import com.estrat.backend.db.repository.EmployeeCredentialsPoRepo;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.repository.OrgStructureDetailsRepository;
import com.estrat.backend.db.repository.UserDeptMappingRepository;
import com.estrat.backend.db.resource.util.CacheUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDAO {
    private Logger log = Logger.getLogger(EmployeeDAO.class);
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    EmployeeProfilePoRepo employeeProfilePoRepo;
    @Autowired
    EmployeeCredentialsPoRepo employeeCredentialsPoRepo;
    @Autowired
    OrgDetailsRepository orgDetailsRepo;
    @Autowired
    DepartmentDetailsRepository departmentDetailsRepo;
    @Autowired
    DeptTrackerRepository departmentTrackerRepo;
    @Autowired
    EmployeeDepartmentMappingRepository employeeDepartmentMappingRepo;
    @Autowired
    OrgStructureDetailsRepository orgStructureDetailsRepo;
    @Autowired
    DepartmentChartMappingRepository departmentChartMappingRepo;
    @Autowired
    UserDeptMappingRepository userDeptMappingRepo;
    @Autowired
    private CacheUtil cacheUtil;
    @Value(value="${ldap.user.dn}")
    private String ldapuserdn;
    @Value(value="${ldap.search.attribute}")
    private String ldapattribute;
    @Value(value="${authentication}")
    private String authentication;
    @Value(value="${datasource}")
    private String datasource;
    @Autowired
    private LdapConfig ldapConfig;

    public boolean authenticateUser(String username, String password) {
        return true;
    }

    public Employee getEmployee(EmployeeDTO employeeDTO) {
        EmployeeProfilePo empprofile = this.employeeProfilePoRepo.getOne(employeeDTO.getEmployeeId(), "Active");
        if (empprofile != null) {
            return new Employee(empprofile);
        }
        return new Employee();
    }

    public Employee getEmployeeInActive(EmployeeDTO employeeDTO) {
        EmployeeProfilePo empprofile = this.employeeProfilePoRepo.getOne(employeeDTO.getEmployeeId(), "InActive");
        return new Employee(empprofile);
    }

    public EmployeeCredentialsPo getEmployeeCredentials(long empId) {
        EmployeeCredentialsPo empprofile = this.employeeCredentialsPoRepo.getOnestatus(empId, "Active");
        return empprofile;
    }

    public EmployeeProfilePo createEmployeeProfile(Employee employee) {
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo(employee);
        employeeProfilePo.setCreatedDate(LocalDateTime.now());
        employeeProfilePo.setStatus("Active");
        EmployeeProfilePo profilePo = (EmployeeProfilePo)this.employeeProfilePoRepo.save(employeeProfilePo);
        return profilePo;
    }

    public void createEmployeeCredentials(EmployeeCredentialsPo employee) {
        employee.setCreatedDate(LocalDateTime.now());
        this.employeeCredentialsPoRepo.save(employee);
    }

    public OrgDetails mergeOrgDetails(OrgDetails orgDetails) {
        OrgDetails organizationDetails = (OrgDetails)this.orgDetailsRepo.save(orgDetails);
        return organizationDetails;
    }

    public DeptDetails mergeDeptDetails(DeptDetails deptDetails) {
        DepartmentDetails departmentDetails = new DepartmentDetails(deptDetails);
        DepartmentDetails departmentDetailsResponse = (DepartmentDetails)this.departmentDetailsRepo.save(departmentDetails);
        DeptDetails deptDetails1 = new DeptDetails(departmentDetailsResponse);
        return deptDetails1;
    }

    public void updateEmployeeProfile(Employee employee) {
        EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo)this.employeeProfilePoRepo.getOne(employee.getEmpId());
        if (employee.getDeptDetails() != null) {
            employeeProfilePo.setDeptId(new DepartmentDetails(employee.getDeptDetails()));
        }
        employeeProfilePo.setEmailAddress(employee.getEmailAddress());
        employeeProfilePo.setFirstName(employee.getFirstName());
        employeeProfilePo.setLastName(employee.getLastName());
        employeeProfilePo.setLocation(employee.getLocation());
        employeeProfilePo.setParentEmpId(employee.getParentEmpId());
        employeeProfilePo.setProfileImage(employee.getProfileImage());
        employeeProfilePo.setTitle(employee.getTitle());
        employeeProfilePo.setDepartment(employee.getDepartment());
        employeeProfilePo.setUserRole(employee.getUserRole());
        employeeProfilePo.setPhoneNumber(employee.getPhoneNumber());
        employeeProfilePo.setCurrency(employee.getCurrency());
        employeeProfilePo.setCurrencySymbol(employee.getCurrencySymbol());
        employeeProfilePo.setOrgId(new OrgDetails(employee.getOrgDetails()));
        employeeProfilePo.setUpdatedDate(LocalDateTime.now());
        employeeProfilePo.setStatus("Active");
        this.employeeProfilePoRepo.save(employeeProfilePo);
    }

    public void updateEmployeeCredentials(EmployeeCredentialsPo employee) {
        employee.setUpdatedDate(LocalDateTime.now());
        this.employeeCredentialsPoRepo.save(employee);
    }

    public void removeEmployeeCredentials(long employeeID) {
        EmployeeCredentialsPo employeeCredentialsPo = (EmployeeCredentialsPo)this.employeeCredentialsPoRepo.getOne(employeeID);
        employeeCredentialsPo.setStatus("InActive");
        this.employeeCredentialsPoRepo.save(employeeCredentialsPo);
    }

    public void removeEmployeeDepartmentMapping(long employeeID) {
        EmployeeDepartmentMapping employeeDepartmentMapping = (EmployeeDepartmentMapping)this.employeeDepartmentMappingRepo.getOne(employeeID);
        employeeDepartmentMapping.setStatus("InActive");
        employeeDepartmentMapping.setEndDate(new Date());
        employeeDepartmentMapping.setUpdatedTime(LocalDateTime.now());
        this.employeeDepartmentMappingRepo.save(employeeDepartmentMapping);
    }

    public void removeEmployeeOrgStructure(long employeeID) {
        OrgStructureDetails orgStructureDetails = (OrgStructureDetails)this.orgStructureDetailsRepo.getOne(employeeID);
        orgStructureDetails.setStatus("InActive");
        orgStructureDetails.setEndDate(new Date());
        orgStructureDetails.setUpdatedTime(LocalDateTime.now());
        this.orgStructureDetailsRepo.save(orgStructureDetails);
    }

    public void removeEmployeeProfile(long employeeID) {
        EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo)this.employeeProfilePoRepo.getOne(employeeID);
        employeeProfilePo.setStatus("InActive");
        employeeProfilePo.setUpdatedDate(LocalDateTime.now());
        this.employeeProfilePoRepo.save(employeeProfilePo);
        this.updateSuperVisorID(employeeID, employeeProfilePo.getParentEmpId());
        this.cacheUtil.removeEmployeeCache((Object)employeeProfilePo.getParentEmpId());
    }

    public void updateParentEmpID(long employeeID, long parentEmpId) {
        EmployeeProfilePo profilePo = this.employeeProfilePoRepo.getOne(employeeID, "Active");
        profilePo.setParentEmpId(parentEmpId);
        this.employeeProfilePoRepo.save(profilePo);
    }

    public void updateSuperVisorID(long employeeID, long parentEmpId) {
        return;
    }

    public String encodedPassword(String password) {
        String encodedPassword = null;
        try {
            this.log.debug((Object)"encodedPassword() \t encoding password encryption");
            MessageDigest md = MessageDigest.getInstance("SHA");
            md.reset();
            encodedPassword = Base64.getEncoder().encodeToString(md.digest(password.getBytes()));
            this.log.debug(("encodedPassword() \t the encoded password is " + encodedPassword));
        }
        catch (Exception e) {
            this.log.error(("Error occured while encryption " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return encodedPassword.trim();
    }

    public EmployeeCredentialsPo authenticateUser(EmployeeDTO employeeDTO) {
        EmployeeCredentialsPo credentialsPo = null;
        System.out.println("Authentication flag ::: " + employeeDTO.isSsoLogin());
        try {
            if ("ldap".equals(this.authentication) && !this.authenticateUser(employeeDTO.getUserName(), employeeDTO.getPassword())) {
                this.log.error((Object)"LDAP Authentication failure");
            } else if (employeeDTO.isSsoLogin()) {
                credentialsPo = this.employeeCredentialsPoRepo.findByUserNameAndStatus(employeeDTO.getUserName(), "Active").orElse(this.employeeCredentialsPoRepo.findByEmailAddressAndStatus(employeeDTO.getUserName(), "Active").orElse(null));
            } else {
                String encodedPassword = this.encodedPassword(employeeDTO.getPassword());
                Optional userOpt = this.employeeCredentialsPoRepo.findByUserNameOrEmailAddressAndStatus(employeeDTO.getUserName(), employeeDTO.getUserName(), "Active");
                if (userOpt.isPresent()) {
                    EmployeeCredentialsPo user = (EmployeeCredentialsPo)userOpt.get();
                    if ("Active".equals(user.getStatus()) && "ldap".equals(this.authentication)) {
                        credentialsPo = user;
                    } else if ("Active".equals(user.getStatus()) && (employeeDTO.getPassword().equals(user.getPassword()) || encodedPassword.equals(user.getPassword()))) {
                        credentialsPo = user;
                    }
                }
            }
        }
        catch (Exception e) {
            this.log.error((Object)"Exception in authenticateUser", (Throwable)e);
        }
        return credentialsPo;
    }

    public EmployeeCredentialsPo checkAuthenticateUserInActive(EmployeeDTO employeeDTO) {
        EmployeeCredentialsPo credentialsPo = null;
        try {
            credentialsPo = employeeDTO.isSsoLogin() ? (EmployeeCredentialsPo)this.employeeCredentialsPoRepo.findByUserNameAndStatus(employeeDTO.getUserName(), "InActive").orElse(this.employeeCredentialsPoRepo.findByEmailAddressAndStatus(employeeDTO.getUserName(), "InActive").orElse(null)) : (EmployeeCredentialsPo)this.employeeCredentialsPoRepo.findByUserNameAndPasswordAndStatus(employeeDTO.getUserName(), employeeDTO.getPassword(), "InActive").orElse(this.employeeCredentialsPoRepo.findByEmailAddressAndPasswordAndStatus(employeeDTO.getUserName(), employeeDTO.getPassword(), "InActive").orElse(null));
        }
        catch (Exception e) {
            this.log.error((Object)"Exception in checkAuthenticateUserInActive", (Throwable)e);
        }
        return credentialsPo;
    }

    public boolean resetPassword(Employee employee) {
        EmployeeCredentialsPo employeeCredentialsPo = (EmployeeCredentialsPo)this.employeeCredentialsPoRepo.getOne(employee.getEmpId());
        employeeCredentialsPo.setPassword(employee.getPassword());
        this.updateEmployeeCredentials(employeeCredentialsPo);
        return true;
    }

    public List<Employee> getReporteeList(long empId) {
        return this.getEmployeeChildList(Long.valueOf(empId));
    }

    public Employee getEmployeeID(String employeeName, long organizationId) {
        List empList;
        if (organizationId != 0L) {
            OrgDetails details = new OrgDetails();
            details.setId(organizationId);
            empList = this.employeeProfilePoRepo.findByFirstNameAndStatusAndOrgId(employeeName, "Active", details);
        } else {
            empList = this.employeeProfilePoRepo.findByFirstNameAndStatus(employeeName, "Active");
        }
        if (!empList.isEmpty()) {
            return new Employee((EmployeeProfilePo)empList.get(0));
        }
        return null;
    }

    public Employee getEmployeeIDByEmail(String emailAddress) {
        List empList = this.employeeProfilePoRepo.findByEmailAddressAndStatus(emailAddress, "Active");
        if (!empList.isEmpty()) {
            return new Employee((EmployeeProfilePo)empList.get(0));
        }
        return null;
    }

    public Employee getEmployeeIDByFullName(String firstName, String lastName, long organizationId) {
        List<EmployeeProfilePo> empList;
        if (organizationId != 0L) {
            OrgDetails details = new OrgDetails();
            details.setId(organizationId);
            empList = this.employeeProfilePoRepo.findByFirstNameAndLastNameAndStatusAndOrgId(firstName, lastName, "Active", details);
        } else {
            empList = this.employeeProfilePoRepo.findByFirstNameAndLastNameAndStatus(firstName, lastName, "Active");
        }
        if (!empList.isEmpty()) {
            return new Employee(empList.get(0));
        }
        return null;
    }

    public List<Employee> getEmployeeChildList(Long empId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAll(empId.longValue(), "Active");
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public List<Employee> getOrgEmployeeList(Long orgId) {
        return new java.util.ArrayList<>();
    }

    public List<Employee> getOrgEmployeeList(Long orgId, Long empId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAll(empId.longValue(), "Active");
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public List<Employee> getEmployeeListByOrgIdAndParentId(Long orgId, Long empId, Long parentId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAll(empId.longValue(), "Active");
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public List<Employee> getEmployeeListByParentId(Long parentId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAll(parentId.longValue(), "Active");
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public List<Employee> getEmployeeListByParentIdWithNoStatus(Long parentId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAllnostatus(parentId.longValue());
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public List<Employee> getEmployeeListByOrgIdAndParentId(Long orgId, Long parentId) {
        List<EmployeeProfilePo> poList = this.employeeProfilePoRepo.findAll(parentId.longValue(), "Active");
        List<Employee> employees = new ArrayList<>();
        for (EmployeeProfilePo po : poList) {
            employees.add(new Employee(po));
        }
        return employees;
    }

    public String getOrgMaxId() {
        try {
            Long maxId = this.employeeProfilePoRepo.findMaxOrgId();
            this.log.info(("maxId " + maxId));
            return maxId.toString();
        }
        catch (DataAccessException e) {
            this.log.error(("DataAccessException occurred: " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw e;
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public EmployeeProfilePo getEmployeeProfile(Long empId) {
        EmployeeProfilePo employeeProfilePo = this.employeeProfilePoRepo.getOne(empId.longValue(), "Active");
        return employeeProfilePo;
    }

    public EmployeeProfilePo getProfile(Long empId) {
        EmployeeProfilePo employeeProfilePo = (EmployeeProfilePo)this.employeeProfilePoRepo.getOne(empId);
        return employeeProfilePo;
    }

    public EmployeeProfilePo getEmployeeProfileByEmail1(String email) {
        List employeeProfilePo = this.employeeProfilePoRepo.findByEmailstatus(email);
        return employeeProfilePo == null || employeeProfilePo.isEmpty() ? null : (EmployeeProfilePo)employeeProfilePo.get(0);
    }

    public EmployeeProfilePo getEmployeeProfileByEmail(String email, long empId) {
        return null;
    }

    public boolean checkUserExist(String email) {
        try {
            long count = this.employeeCredentialsPoRepo.countByEmailAddressOrUserNameAndStatus(email, email, "Active");
            return count > 0L;
        }
        catch (DataAccessException e) {
            this.log.error(("DataAccessException occurred: " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw e;
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public boolean checkUserExistWithNoStatus(String email) {
        try {
            long count = this.employeeCredentialsPoRepo.countByEmailAddressOrUserNameAndStatus(email, email, "InActive");
            return count > 0L;
        }
        catch (DataAccessException e) {
            this.log.error(("DataAccessException occurred: " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw e;
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public OrgDetails getOrgDetails(String orgName) {
        try {
            return this.orgDetailsRepo.findByName(orgName, "Active");
        } catch (Exception e) {
            this.log.error("getOrgDetails failed for name=" + orgName + ": " + e.getMessage());
            return null;
        }
    }

    public Long getOrgUserCount(long orgId) {
        try {
            OrgDetails org = new OrgDetails();
            org.setId(orgId);
            return this.employeeProfilePoRepo.countByOrgIdAndStatus(org, "Active");
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return 0L;
        }
    }

    public List<String> getDepartmentList() {
        try {
            String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
            return this.employeeProfilePoRepo.findDistinctDepartmentsByOrgId(Long.valueOf(Long.parseLong(orgId)));
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return new ArrayList<String>();
        }
    }

    public List<OrgDetails> getOrgList() {
        try {
            return this.orgDetailsRepo.findAll();
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return new ArrayList<OrgDetails>();
        }
    }

    public List<String> getDesignationList() {
        try {
            String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
            return this.employeeProfilePoRepo.findDistinctTitlesByOrgId(Long.valueOf(Long.parseLong(orgId)));
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return new ArrayList<String>();
        }
    }

    public List<String> getDesignationList(String name) {
        try {
            String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
            String searchPattern = "%" + name + "%";
            return this.employeeProfilePoRepo.findDistinctTitlesByOrgIdAndTitleLike(Long.valueOf(Long.parseLong(orgId)), searchPattern);
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return new ArrayList<String>();
        }
    }

    public List<String> getOrgDepartmentList(String name) {
        try {
            String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
            String searchPattern = "%" + name + "%";
            return this.departmentDetailsRepo.findDistinctDeptNamesByOrgIdAndDeptNameLike(Long.valueOf(Long.parseLong(orgId)), searchPattern);
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            return new ArrayList<String>();
        }
    }

    public Map<String, Object> getEmployeeBasicDetails(long empId) {
        Map employeeBasicDetails = null;
        String query = "SELECT emp_id,first_name,last_name,last_name,last_name,location,profile_image,email_address,department,phone_number FROM  orgstructure.employee_details emp where emp.emp_id =?";
        try {
            ArrayList<Long> paramList = new ArrayList<Long>();
            paramList.add(empId);
            employeeBasicDetails = this.jdbcTemplate.queryForMap(query, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return employeeBasicDetails;
    }

    public EmployeeCredentialsPo getEmployeeCredentialsWithNoStatus(Long empId) {
        List employeeProfilePo = this.employeeCredentialsPoRepo.getOnewostatus(empId.longValue());
        return employeeProfilePo == null || employeeProfilePo.isEmpty() ? null : (EmployeeCredentialsPo)employeeProfilePo.get(0);
    }

    public List<Long> getEmpIdList(long empId) {
        List employeeList = new ArrayList();
        employeeList = this.employeeProfilePoRepo.findEmployeeIdHierarchyByEmpIdsql(Long.valueOf(empId));
        return employeeList;
    }

    public List<Employee> getEmpIdListEmp(long empId) {
        return new java.util.ArrayList<>();
    }

    public List<Long> getDepartmentIdList(long deptId) {
        List departmentlist = new ArrayList();
        departmentlist = this.departmentChartMappingRepo.getAllDepartmentidByParentId(Long.valueOf(deptId));
        return departmentlist;
    }

    public List<Employee> getEmployeeListByEmpIdList(List<Long> empIds) {
        try {
            List<EmployeeProfilePo> employeeList = this.employeeProfilePoRepo.findByEmpIdIn(empIds);
            if (!employeeList.isEmpty()) {
                return employeeList.stream().map(profilePo -> new Employee(profilePo, Boolean.valueOf(false))).collect(Collectors.toList());
            }
            this.log.info((Object)"No employees found for given empIds");
            return new ArrayList<Employee>();
        }
        catch (DataAccessException e) {
            this.log.error(("DataAccessException occurred: " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw e;
        }
        catch (Exception e) {
            this.log.error(("Exception occurred: " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public List<Long> getDesignationEmpIdList(long empId) {
        List<Long> employeeList = new ArrayList();
        String query = "SELECT  emp_id  FROM (SELECT * FROM orgstructure.employee_details ORDER BY parent_emp_id, emp_id) employee_sorted, (SELECT @pv := toreplace) initialisation WHERE  find_in_set(parent_emp_id, @pv) AND length(@pv := concat(@pv, ',', emp_id))";
        query = query.replace("toreplace", String.valueOf(empId));
        try {
            employeeList = this.jdbcTemplate.queryForList(query.toString(), Long.class);
            employeeList.add(empId);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return employeeList;
    }
}

