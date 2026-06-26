/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.UserDeptMapping
 *  com.estrat.backend.db.dao.EmployeeDAO
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.backend.db.dao.KPIDAO
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.UserDTO
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.backend.db.repository.UserDeptMappingRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.UserRoleManagementService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping;
import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.UserDeptMapping;
import com.estrat.backend.db.dao.EmployeeDAO;
import com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.backend.db.dao.KPIDAO;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.UserDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.backend.db.repository.UserDeptMappingRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.UserRoleManagementService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentDetailsService {
    @Autowired
    protected DepartmentDetailsRepository detailsRepository;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMapping;
    @Autowired
    protected DeptMultipleOwnersMappingRepository departmentOwnerMapping;
    @Autowired
    protected UserDeptMappingRepository userDeptMappingRepository;
    @Autowired
    protected EmployeeDAO employeeDAO;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected UserRoleManagementService userRoleManagementService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected EmployeeDepartmentMappingRepository employeeDepartmentMapping;
    @Autowired
    protected KPIDAO kpidao;

    public DepartmentDetails findByName(String name) {
        return this.detailsRepository.findByName(name, "Active");
    }

    public DepartmentDetails save(DepartmentDetails departmentDetails) {
        return (DepartmentDetails)this.detailsRepository.save(departmentDetails);
    }

    public List<DeptDetails> findAll() {
        List<DepartmentDetails> dbList = this.detailsRepository.findAll("Active");
        List<DeptDetails> deptDetailsList = dbList.stream().map(dbValue -> new DeptDetails(dbValue)).collect(Collectors.toList());
        return deptDetailsList;
    }

    public List<DepartmentChartDTO> findbyDeptIds(List<String> deptList) {
        List<DepartmentChartMapping> dbList = this.departmentChartMapping.getalldeptmapping(deptList);
        List<DepartmentChartDTO> deptDetailsList = dbList.stream().map(dbValue -> new DepartmentChartDTO(dbValue)).collect(Collectors.toList());
        return deptDetailsList;
    }

    public List<DeptDetails> findAllByOrgId(long orgId, String datePeriod, String name) {
        List<DepartmentDetails> dbList = new ArrayList();
        List dbListIdList = new ArrayList();
        List<DeptDetails> result = new ArrayList();
        if (datePeriod != null && !datePeriod.isEmpty()) {
            DepartmentChartMapping department;
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
            Long deptId = this.employeeService.superUserDeptId();
            List deptID = this.departmentChartMapping.getAllDepartmentByParentId(deptId);
            List deptIDList = null;
            deptIDList = deptID.isEmpty() ? ((department = this.departmentChartMapping.getOne(deptId)).getDeptParentId() == 0L ? this.departmentChartMapping.getAllDepartmentByDate(deptId, this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate)) : this.departmentChartMapping.getAllDepartmentByDate(this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate))) : this.departmentChartMapping.getAllDepartmentByDate(this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate));
            if (!deptIDList.isEmpty()) {
                dbListIdList = name != null ? this.detailsRepository.findAllByOrgIdByIds(orgId, "Active", deptIDList, "%" + name + "%") : this.detailsRepository.findAllByOrgIdIds(orgId, "Active", deptIDList);
            }
        } else {
            List deptIDList = this.departmentChartMapping.getAllDepartmentByOrgId(Long.valueOf(orgId), 0);
            if (name != null) {
                Long deptId = this.employeeService.superUserDeptId();
                dbListIdList = deptIDList.isEmpty() ? this.detailsRepository.findAllByOrgIdIds(deptId.longValue(), orgId, "Active", "%" + name + "%") : this.detailsRepository.findAllByOrgIdAndDeptIds(deptId.longValue(), orgId, "Active", "%" + name + "%", deptIDList);
            } else {
                Long deptId = this.employeeService.superUserDeptId();
                dbListIdList = deptIDList.isEmpty() ? this.detailsRepository.findAllByOrgIdIds(deptId.longValue(), orgId, "Active") : this.detailsRepository.findAllByOrgIdAndDeptIds(deptId.longValue(), orgId, "Active", deptIDList);
            }
        }
        if (!dbListIdList.isEmpty()) {
            List deptIdList = this.departmentChartMapping.getAllDeptId(dbListIdList);
            dbList = this.detailsRepository.findAll(deptIdList);
            result = dbList.stream().map(dbValue -> {
                DepartmentChartMapping chartMapping;
                DeptDetails dep = new DeptDetails(dbValue);
                Optional departmentChart = this.departmentChartMapping.findById(dep.getId());
                if (departmentChart.isPresent() && (chartMapping = (DepartmentChartMapping)departmentChart.get()).getActive() != 0) {
                    dep.setStatus("InActive");
                }
                return dep;
            }).collect(Collectors.toList());
            return result;
        }
        return new ArrayList<DeptDetails>();
    }

    public List<DeptDetails> findAllByOrgId(long orgId) {
        List<DepartmentDetails> dbList = null;
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(orgId);
        if (controlPanelGeneral != null
                && controlPanelGeneral.getImplementationType() != null
                && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
            List ids = this.departmentChartMapping.getAllDepartmentByOrgId(Long.valueOf(orgId), 0);
            dbList = this.detailsRepository.findAll(ids);
        } else {
            dbList = this.detailsRepository.findAllByOrgId(orgId, "Active");
        }
        if (!dbList.isEmpty()) {
            return dbList.stream().map(dbValue -> new DeptDetails(dbValue)).collect(Collectors.toList());
        }
        return new ArrayList<DeptDetails>();
    }

    public List<String> getDesignationList() {
        return this.employeeDAO.getDesignationList();
    }

    public DeptDetails findByDeptName(long orgId, String name) {
        DeptDetails deptDetails = null;
        DepartmentDetails dbList = this.detailsRepository.findByName(name, orgId, "Active");
        deptDetails = dbList != null ? new DeptDetails(dbList) : new DeptDetails();
        return deptDetails;
    }

    public DeptDetails findByDeptUniqueId(long orgId, String uniqueId) {
        DeptDetails deptDetails = null;
        DepartmentDetails dbList = this.detailsRepository.findByDeptUniqueId(uniqueId, orgId, "Active");
        deptDetails = dbList != null ? new DeptDetails(dbList) : new DeptDetails();
        return deptDetails;
    }

    public DeptDetails findById(Long id) {
        DeptDetails deptDetails = null;
        DepartmentDetails dbList = this.detailsRepository.findById(id, "Active");
        deptDetails = dbList != null ? new DeptDetails(dbList) : new DeptDetails();
        return deptDetails;
    }

    public DepartmentDetails findByDeptNameWithOrgId(long orgId, String name) {
        return this.detailsRepository.findByName(name, orgId, "Active");
    }

    public static LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
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

    public List<DeptDetails> findAllByEmpId(long empId, String datePeriod, String name) {
        List<DepartmentDetails> dbList = new ArrayList();
        List<DeptDetails> result = new ArrayList();
        boolean checkstatus = false;
        EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(Long.valueOf(empId));
        UserDTO userRoleManagement = this.userRoleManagementService.findById(Long.valueOf(employeeProfilePo.getEmpId()));
        if (datePeriod != null && !datePeriod.isEmpty()) {
            DepartmentChartMapping department;
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
            Long deptId = this.employeeService.superUserDeptId();
            if (employeeProfilePo.getDeptId() != null && deptId.longValue() == employeeProfilePo.getDeptId().getId()) {
                checkstatus = true;
            }
            if (!checkstatus && userRoleManagement != null && userRoleManagement.getUserRole() != null
                    && (userRoleManagement.getUserRole().equalsIgnoreCase("Super User")
                        || userRoleManagement.getUserRole().equalsIgnoreCase("Admin"))) {
                checkstatus = true;
            }
            List deptIDList = null;
            List deptID = this.departmentChartMapping.getAllDepartmentByParentId(deptId);
            deptIDList = checkstatus ? (!deptID.isEmpty() ? ((department = this.departmentChartMapping.getOne(deptId)).getDeptParentId() == 0L ? this.departmentChartMapping.getAllDepartmentByDateByOrg(deptId, Long.valueOf(employeeProfilePo.getOrgId().getId()), this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate)) : this.departmentChartMapping.getAllDepartmentByDateByOrg(Long.valueOf(employeeProfilePo.getOrgId().getId()), this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate))) : this.departmentChartMapping.getAllDepartmentByDateByOrg(Long.valueOf(employeeProfilePo.getOrgId().getId()), this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate))) : this.employeeDAO.getDepartmentIdList(employeeProfilePo.getDeptId().getId());
            if (!deptIDList.isEmpty()) {
                dbList = name != null ? this.detailsRepository.findAllByDeptIds(deptIDList, "%" + name + "%") : this.detailsRepository.findAllByDeptIds(deptIDList);
            }
        } else {
            Long deptId = this.employeeService.superUserDeptId();
            if (employeeProfilePo.getDeptId() != null && deptId.longValue() == employeeProfilePo.getDeptId().getId()) {
                checkstatus = true;
            }
            if (!checkstatus && userRoleManagement != null && userRoleManagement.getUserRole() != null
                    && (userRoleManagement.getUserRole().equalsIgnoreCase("Super User")
                        || userRoleManagement.getUserRole().equalsIgnoreCase("Admin"))) {
                checkstatus = true;
            }
            if (checkstatus) {
                Long orgId = employeeProfilePo.getOrgId().getId();
                List deptIDList = this.departmentChartMapping.getAllDepartmentByOrgId(orgId, 0);
                dbList = name != null ? (deptIDList.isEmpty() ? this.detailsRepository.findAllByOrgId(deptId.longValue(), orgId.longValue(), "Active", "%" + name + "%") : this.detailsRepository.findAllByOrgIdAndDeptIdLIST(deptId.longValue(), orgId.longValue(), "Active", "%" + name + "%", deptIDList)) : (deptIDList.isEmpty() ? this.detailsRepository.findAllByOrgId(deptId.longValue(), orgId.longValue(), "Active") : this.detailsRepository.findAllByOrgIdAndDeptIdLIST(deptId.longValue(), orgId.longValue(), "Active", deptIDList));
            } else if (employeeProfilePo.getDeptId() != null) {
                List deptIDList = this.employeeDAO.getDepartmentIdList(employeeProfilePo.getDeptId().getId());
                if (name != null) {
                    if (!deptIDList.isEmpty()) {
                        dbList = this.detailsRepository.findAllByOrgIdAndDeptIdLIST("Active", "%" + name + "%", deptIDList);
                    }
                } else if (!deptIDList.isEmpty()) {
                    dbList = this.detailsRepository.findAllByOrgIdAndDeptIdLIST("Active", deptIDList);
                }
            }
        }
        if (!dbList.isEmpty()) {
            result = dbList.stream().map(dbValue -> {
                DepartmentChartMapping chartMapping;
                DeptDetails dep = new DeptDetails(dbValue);
                Optional departmentChart = this.departmentChartMapping.findById(dep.getId());
                if (departmentChart.isPresent() && (chartMapping = (DepartmentChartMapping)departmentChart.get()).getActive() != 0) {
                    dep.setStatus("InActive");
                }
                return dep;
            }).collect(Collectors.toList());
            return result;
        }
        return new ArrayList<DeptDetails>();
    }

    public List<Long> getDeptList(long empId) {
        List deptIds = this.employeeDepartmentMapping.departmentByDeptIdList(empId, "Active");
        System.out.println(" empl deptIds >> " + deptIds);
        List deptId_list = this.userDeptMappingRepository.findAllDeptIdByEmpId(Long.valueOf(empId));
        System.out.println("user mapping dept ::: " + deptId_list);
        HashSet dept_set = new HashSet();
        if (Objects.nonNull(deptIds) && deptIds.size() > 0) {
            dept_set.addAll(deptIds);
        }
        if (Objects.nonNull(deptId_list) && deptId_list.size() > 0) {
            dept_set.addAll(deptId_list);
        }
        return new ArrayList<Long>(dept_set);
    }

    public List<DeptDetails> ownerMappingDepartmentList(long empId) {
        List<DepartmentDetails> dbList = new ArrayList();
        List<DeptDetails> result = new ArrayList();
        EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(Long.valueOf(empId));
        List<Long> deptIds = this.employeeDepartmentMapping.departmentByDeptIdList(employeeProfilePo.getEmpId(), "Active");
        if (Objects.isNull(deptIds) && deptIds.isEmpty()) {
            deptIds = new ArrayList<Long>();
        }
        if (Objects.nonNull(employeeProfilePo.getDeptId())) {
            deptIds.add(employeeProfilePo.getDeptId().getId());
        } else {
            List departmentMapping = this.departmentOwnerMapping.getOwnerList(Long.valueOf(employeeProfilePo.getEmpId()));
            if (Objects.nonNull(departmentMapping) && departmentMapping.size() > 0) {
                deptIds.add(((DeptMultipleOwnersMapping)departmentMapping.get(0)).getDeptId());
            }
        }
        if (deptIds != null && !deptIds.isEmpty()) {
            dbList = this.detailsRepository.findAllByDeptIds(deptIds);
        }
        if (!dbList.isEmpty()) {
            result = dbList.stream().map(dbValue -> {
                DeptDetails dep = new DeptDetails(dbValue);
                return dep;
            }).collect(Collectors.toList());
            return result;
        }
        return new ArrayList<DeptDetails>();
    }

    public DeptDetails findByOwner() {
        DeptDetails deptDetails = null;
        EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(Long.valueOf(UserThreadLocal.get()));
        if (employeeProfilePo.getDeptId() != null && employeeProfilePo.getDeptId().getDeptUniqueID() != null) {
            return new DeptDetails(employeeProfilePo.getDeptId());
        }
        Optional deptMultipleOwnersMapping = this.departmentChartMapping.findOwner(Long.valueOf(employeeProfilePo.getEmpId()), 0);
        if (deptMultipleOwnersMapping.isPresent()) {
            DepartmentDetails dbList = this.detailsRepository.findById(((DepartmentChartMapping)deptMultipleOwnersMapping.get()).getDeptId(), "Active");
            deptDetails = dbList != null ? new DeptDetails(dbList) : new DeptDetails();
        }
        return deptDetails;
    }

    public Long findByOwner(Long deptId) {
        List<UserDeptMapping> userDeptMapping;
        Long deptDetails = null;
        List<DeptMultipleOwnersMapping> deptMultipleOwnersMapping = this.departmentOwnerMapping.getDeptList(deptId);
        if (deptMultipleOwnersMapping != null) {
            for (DeptMultipleOwnersMapping deptMultipleOwnersMappingdata : deptMultipleOwnersMapping) {
                if (deptMultipleOwnersMappingdata.getEmpId() == null) continue;
                deptDetails = deptMultipleOwnersMappingdata.getEmpId();
            }
        }
        if (Objects.isNull(deptDetails) && (userDeptMapping = this.userDeptMappingRepository.findAllByDeptId(deptId)) != null) {
            for (UserDeptMapping userdept : userDeptMapping) {
                if (userdept.getEmpId() == null) continue;
                deptDetails = userdept.getEmpId();
            }
        }
        return deptDetails;
    }

    public List<DeptDetails> childList() {
        List<DepartmentDetails> dbList = new ArrayList();
        List<DeptDetails> result = new ArrayList();
        ArrayList deptIdList = new ArrayList();
        String empIdRaw = UserThreadLocal.get();
        if (empIdRaw == null || empIdRaw.isBlank()) {
            empIdRaw = UserThreadLocal.get("SUPER_USER_ID");
        }
        if (empIdRaw == null || empIdRaw.isBlank()) {
            return new ArrayList<>();
        }
        long empId = Long.parseLong(empIdRaw.trim());
        List userDeptMapping = this.userDeptMappingRepository.findAllByIdEmpId(Long.valueOf(empId));
        Long departmentId = 0L;
        if (Objects.nonNull(userDeptMapping)) {
            List departmentMapping = this.departmentOwnerMapping.getOwnerList(Long.valueOf(empId));
            if (Objects.nonNull(departmentMapping) && departmentMapping.size() > 0) {
                departmentId = ((DeptMultipleOwnersMapping)departmentMapping.get(0)).getDeptId();
            } else {
                List<EmployeeDepartmentMapping> empDeptMappings = this.employeeDepartmentMapping.findByEmpId(
                        empId, "Active");
                if (empDeptMappings != null && !empDeptMappings.isEmpty()) {
                    departmentId = empDeptMappings.get(0).getDeptId();
                }
            }
        }
        if (departmentId == 0L) {
            try {
                EmployeeProfilePo profile = this.employeeService.getEmployeeProfile(empId);
                if (profile != null && profile.getDeptId() != null) {
                    departmentId = profile.getDeptId().getId();
                }
            } catch (Exception ignored) {
                // fall through
            }
        }
        List<Long> deptIds = new ArrayList();
        if (departmentId != 0L) {
            deptIds = this.kpidao.getChildDepartmentList(departmentId.longValue(), deptIdList);
            deptIds.add(departmentId);
        } else if (Objects.nonNull(userDeptMapping) && !userDeptMapping.isEmpty()) {
            deptIds = this.kpidao.getChildDepartmentList(((UserDeptMapping)userDeptMapping.get(0)).getDeptId().longValue(), deptIdList);
        }
        if (deptIds != null && !deptIds.isEmpty()) {
            dbList = this.detailsRepository.findAllByDeptIds(deptIds);
        }
        if (!dbList.isEmpty()) {
            result = dbList.stream().map(dbValue -> {
                DeptDetails dep = new DeptDetails(dbValue);
                return dep;
            }).collect(Collectors.toList());
            return result;
        }
        try {
            String orgIdRaw = UserThreadLocal.get("USER_ORG_ID");
            if (orgIdRaw != null && !orgIdRaw.isBlank()) {
                return this.findAllByOrgId(Long.parseLong(orgIdRaw.trim()));
            }
        } catch (Exception ignored) {
            // fall through
        }
        return new ArrayList<DeptDetails>();
    }

    public List<DepartmentChartDTO> departmentimmedReportees(Long deptId) {
        List<DepartmentChartMapping> deptList = this.departmentChartMapping.getAllDepartmentByORGWithNoParentIdANDNotINDeptId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), deptId, 0);
        List<DepartmentChartDTO> departmentChartDTOs = new ArrayList<DepartmentChartDTO>();
        if (deptList != null) {
            departmentChartDTOs = deptList.stream().map(val -> new DepartmentChartDTO(val)).collect(Collectors.toList());
        }
        return departmentChartDTOs;
    }
}

