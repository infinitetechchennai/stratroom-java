/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgTracker
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.OrgTrackerDTO
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.repository.OrgTrackerRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.DeptTrackerService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.OrgTrackerService
 *  com.estrat.backend.db.service.PageService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgTracker;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.OrgTrackerDTO;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.repository.OrgTrackerRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.DeptTrackerService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.PageService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrgTrackerService {
    @Autowired
    protected OrgTrackerRepository orgTrackerRepository;
    @Autowired
    private EmployeeProfilePoRepo employeeDAO;
    @Autowired
    private PageService pageService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DeptTrackerService deptTrackerService;

    public void saveOrgTrack(Employee employee, Long whoIsID) {
        Boolean status = true;
        Boolean statusCheck = false;
        OrgTracker findTracker = this.orgTrackerRepository.findBy(employee.getEmpId(), employee.getParentEmpId(), 0);
        if (findTracker == null) {
            List<OrgTracker> checkTrackerList = this.orgTrackerRepository.findByNoPageNameList(employee.getEmpId(), 0);
            for (OrgTracker checkTracker : checkTrackerList) {
                if (checkTracker == null) continue;
                checkTracker.setEndDate(new Date());
                checkTracker.setActive(1);
                this.orgTrackerRepository.save(checkTracker);
                statusCheck = true;
            }
        } else {
            status = false;
        }
        if (status.booleanValue()) {
            OrgTracker orgTracker = new OrgTracker();
            orgTracker.setActive(0);
            orgTracker.setCreatedTime(LocalDateTime.now());
            orgTracker.setEmpId(employee.getEmpId());
            orgTracker.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
            orgTracker.setParentId(Long.valueOf(employee.getParentEmpId()));
            orgTracker.setRemoveOrAddUserId(whoIsID);
            if (statusCheck.booleanValue()) {
                orgTracker.setType("Add");
            } else {
                orgTracker.setType("Update");
            }
            orgTracker.setStartDate(new Date());
            this.orgTrackerRepository.save(orgTracker);
        }
    }

    public void saveOrUpdateAtImportTrack(Employee employee, Long whoIsID) {
        Boolean status = true;
        Boolean statusCheck = false;
        OrgTracker findTracker = this.orgTrackerRepository.findBy(employee.getEmpId(), employee.getParentEmpId(), 0);
        if (findTracker == null) {
            List<OrgTracker> checkTrackerList = this.orgTrackerRepository.findByNoPageNameList(employee.getEmpId(), 0);
            for (OrgTracker checkTracker : checkTrackerList) {
                if (checkTracker != null && checkTracker.getParentId() != 0L) {
                    checkTracker.setEndDate(new Date());
                    checkTracker.setActive(1);
                    this.orgTrackerRepository.save(checkTracker);
                    statusCheck = true;
                    continue;
                }
                status = true;
            }
        } else {
            status = false;
        }
        if (status.booleanValue()) {
            OrgTracker orgTracker = new OrgTracker();
            orgTracker.setActive(0);
            orgTracker.setCreatedTime(LocalDateTime.now());
            orgTracker.setEmpId(employee.getEmpId());
            orgTracker.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
            orgTracker.setParentId(Long.valueOf(employee.getParentEmpId()));
            orgTracker.setRemoveOrAddUserId(whoIsID);
            if (statusCheck.booleanValue()) {
                orgTracker.setType("Add");
            } else {
                orgTracker.setType("Update");
            }
            orgTracker.setStartDate(new Date());
            this.orgTrackerRepository.save(orgTracker);
        }
    }

    public void updateOrgTrack(Employee employee, Long whoIsID) {
        OrgTracker findTracker = this.orgTrackerRepository.findBy(employee.getEmpId(), employee.getParentEmpId(), 0);
        if (findTracker == null) {
            List<OrgTracker> checkTrackerList = this.orgTrackerRepository.findByNoPageNameList(employee.getEmpId(), 0);
            for (OrgTracker checkTracker : checkTrackerList) {
                if (checkTracker == null) continue;
                checkTracker.setEndDate(new Date());
                checkTracker.setActive(1);
                this.orgTrackerRepository.save(checkTracker);
            }
        } else {
            findTracker.setEndDate(new Date());
            findTracker.setActive(1);
            this.orgTrackerRepository.save(findTracker);
        }
        OrgTracker orgTracker = new OrgTracker();
        orgTracker.setActive(0);
        orgTracker.setCreatedTime(LocalDateTime.now());
        orgTracker.setEmpId(employee.getEmpId());
        orgTracker.setOrgId(Long.valueOf(employee.getOrgDetails().getOrgId()));
        orgTracker.setParentId(Long.valueOf(employee.getParentEmpId()));
        orgTracker.setRemoveOrAddUserId(whoIsID);
        orgTracker.setType("Update");
        orgTracker.setStartDate(new Date());
        this.orgTrackerRepository.save(orgTracker);
    }

    public void deleteOrgTrack(Employee employee, Long whoIsID) {
        OrgTracker findTracker = this.orgTrackerRepository.findBy(employee.getEmpId(), employee.getParentEmpId(), 0);
        if (findTracker == null) {
            List<OrgTracker> checkTrackerList = this.orgTrackerRepository.findByNoPageNameList(employee.getEmpId(), 0);
            for (OrgTracker checkTracker : checkTrackerList) {
                if (checkTracker == null) continue;
                checkTracker.setEndDate(new Date());
                checkTracker.setActive(1);
                this.orgTrackerRepository.save(checkTracker);
            }
        } else {
            findTracker.setEndDate(new Date());
            findTracker.setActive(1);
            this.orgTrackerRepository.save(findTracker);
        }
    }

    public List<OrgTrackerDTO> findAll(String firstName, String dateRange) {
        ArrayList<OrgTrackerDTO> trackerDTOList = new ArrayList<OrgTrackerDTO>();
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
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
        String _orgStr = UserThreadLocal.get("USER_ORG_ID");
        long orgId = (_orgStr != null && !"null".equals(_orgStr)) ? Long.parseLong(_orgStr) : 1L;
        List<EmployeeProfilePo> employeeProfilePos = this.employeeDAO.findAll(firstName, orgId);
        for (EmployeeProfilePo profilePo : employeeProfilePos) {
            List<OrgTracker> tracker = null;
            tracker = dateRange != null ? this.orgTrackerRepository.findByListANDPresent(profilePo.getEmpId(), this.getDateTime(firstDate, "start"), this.getDateTime(secondDate, "end")) : this.orgTrackerRepository.findBy(profilePo.getEmpId());
            if (tracker.isEmpty()) continue;
            List trackerDTOS = tracker.stream().map(dbValue -> {
                OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                this.populateAdditionalDetails(orgTrackerDTO);
                return orgTrackerDTO;
            }).collect(Collectors.toList());
            trackerDTOList.addAll(trackerDTOS);
        }
        return trackerDTOList;
    }

    public void populateAdditionalDetails(OrgTrackerDTO orgTrackerDTO) {
        Optional checkParentProfilePo;
        Optional employeeProfilePo = this.employeeDAO.findById(orgTrackerDTO.getEmpId());
        if (employeeProfilePo.isPresent()) {
            EmployeeProfilePo profilePo = (EmployeeProfilePo)employeeProfilePo.get();
            orgTrackerDTO.setOwnerName(profilePo.getFirstName());
            orgTrackerDTO.setEmail(profilePo.getEmailAddress());
            orgTrackerDTO.setDesignation(profilePo.getTitle());
        }
        if (orgTrackerDTO.getParentId() != 0L && (checkParentProfilePo = this.employeeDAO.findById(orgTrackerDTO.getParentId())).isPresent()) {
            orgTrackerDTO.setParentName(((EmployeeProfilePo)checkParentProfilePo.get()).getFirstName());
        }
        orgTrackerDTO.setFromDate(this.getDateString(orgTrackerDTO.getStartDate()));
        if (orgTrackerDTO.getEndDate() != null) {
            orgTrackerDTO.setToDate(this.getDateString(orgTrackerDTO.getEndDate()));
        } else {
            orgTrackerDTO.setToDate("Present");
        }
    }

    public List<OrgTrackerDTO> findAll(String dateRange) {
        ArrayList<OrgTrackerDTO> trackerDTOList = new ArrayList<OrgTrackerDTO>();
        List<String> designationList = this.employeeService.getDesignationListString("", dateRange);
        String _orgStr = UserThreadLocal.get("USER_ORG_ID");
        long orgId = (_orgStr != null && !"null".equals(_orgStr)) ? Long.parseLong(_orgStr) : 1L;
        for (String designation : designationList) {
            List<EmployeeProfilePo> employeeProfilePos = this.employeeDAO.findAll(designation, orgId, "Active");
            for (EmployeeProfilePo profilePo : employeeProfilePos) {
                List<OrgTracker> tracker = this.orgTrackerRepository.findBy(profilePo.getEmpId());
                if (tracker.isEmpty()) continue;
                List trackerDTOS = tracker.stream().map(dbValue -> {
                    OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                    this.populateAdditionalDetails(orgTrackerDTO);
                    return orgTrackerDTO;
                }).collect(Collectors.toList());
                trackerDTOList.addAll(trackerDTOS);
            }
        }
        return trackerDTOList;
    }

    public String getDateString(Date date) {
        SimpleDateFormat month_date = new SimpleDateFormat("dd/MM/yyyy");
        String monthName = month_date.format(date);
        return monthName;
    }

    public void saveTrack(Long pageId, Long whoIsID) {
        Optional pagesDetails = this.pageService.findById(pageId.longValue());
        if (pagesDetails.isPresent()) {
            EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(whoIsID);
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(employeeProfilePo.getOrgId().getId());
            if (controlPanelGeneral != null
                    && controlPanelGeneral.getImplementationType() != null
                    && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Employee")) {
                OrgTracker orgTracker = new OrgTracker();
                orgTracker.setActive(0);
                orgTracker.setCreatedTime(LocalDateTime.now());
                orgTracker.setEmpId(employeeProfilePo.getEmpId());
                orgTracker.setOrgId(Long.valueOf(employeeProfilePo.getOrgId().getId()));
                orgTracker.setParentId(Long.valueOf(employeeProfilePo.getParentEmpId()));
                orgTracker.setRemoveOrAddUserId(whoIsID);
                orgTracker.setPageName(((PagesDetails)pagesDetails.get()).getPageName());
                orgTracker.setPageId(Long.valueOf(((PagesDetails)pagesDetails.get()).getId()));
                orgTracker.setType("Add");
                orgTracker.setStartDate(new Date());
                this.orgTrackerRepository.save(orgTracker);
            } else {
                this.deptTrackerService.saveTrack(pageId, whoIsID);
            }
        }
    }

    public void updateTrack(Long pageId, Long whoIsID) {
        Boolean status = true;
        Boolean statusCheck = false;
        Optional pagesDetails = this.pageService.findById(pageId.longValue());
        if (pagesDetails.isPresent()) {
            EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(whoIsID);
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(employeeProfilePo.getOrgId().getId());
            if (controlPanelGeneral != null
                    && controlPanelGeneral.getImplementationType() != null
                    && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Employee")) {
                OrgTracker findTracker = this.orgTrackerRepository.findBy(employeeProfilePo.getEmpId(), employeeProfilePo.getParentEmpId(), ((PagesDetails)pagesDetails.get()).getId(), 0);
                if (findTracker == null) {
                    OrgTracker checkTracker = this.orgTrackerRepository.findPageBy(employeeProfilePo.getEmpId(), ((PagesDetails)pagesDetails.get()).getId(), 0);
                    if (checkTracker != null) {
                        checkTracker.setEndDate(new Date());
                        checkTracker.setActive(1);
                        this.orgTrackerRepository.save(checkTracker);
                        statusCheck = true;
                    }
                } else {
                    findTracker.setEndDate(new Date());
                    findTracker.setActive(1);
                    this.orgTrackerRepository.save(findTracker);
                }
                OrgTracker orgTracker = new OrgTracker();
                orgTracker.setActive(0);
                orgTracker.setCreatedTime(LocalDateTime.now());
                orgTracker.setEmpId(employeeProfilePo.getEmpId());
                orgTracker.setOrgId(Long.valueOf(employeeProfilePo.getOrgId().getId()));
                orgTracker.setParentId(Long.valueOf(employeeProfilePo.getParentEmpId()));
                orgTracker.setRemoveOrAddUserId(whoIsID);
                orgTracker.setPageName(((PagesDetails)pagesDetails.get()).getPageName());
                orgTracker.setPageId(Long.valueOf(((PagesDetails)pagesDetails.get()).getId()));
                if (statusCheck.booleanValue()) {
                    orgTracker.setType("Add");
                } else {
                    orgTracker.setType("Update");
                }
                orgTracker.setStartDate(new Date());
                this.orgTrackerRepository.save(orgTracker);
            } else {
                this.deptTrackerService.updateTrack(pageId, whoIsID);
            }
        }
    }

    public void deleteTrack(Long pageId, Long whoIsID) {
        Optional pagesDetails = this.pageService.findById(pageId.longValue());
        if (pagesDetails.isPresent()) {
            EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(whoIsID);
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(employeeProfilePo.getOrgId().getId());
            if (controlPanelGeneral != null
                    && controlPanelGeneral.getImplementationType() != null
                    && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Employee")) {
                OrgTracker findTracker = this.orgTrackerRepository.findBy(employeeProfilePo.getEmpId(), employeeProfilePo.getParentEmpId(), ((PagesDetails)pagesDetails.get()).getId(), 0);
                if (findTracker == null) {
                    OrgTracker checkTracker = this.orgTrackerRepository.findPageBy(employeeProfilePo.getEmpId(), ((PagesDetails)pagesDetails.get()).getId(), 0);
                    if (checkTracker != null) {
                        checkTracker.setEndDate(new Date());
                        checkTracker.setActive(1);
                        this.orgTrackerRepository.save(checkTracker);
                    }
                } else {
                    findTracker.setEndDate(new Date());
                    findTracker.setActive(1);
                    this.orgTrackerRepository.save(findTracker);
                }
            } else {
                this.deptTrackerService.deleteTrack(pageId, whoIsID);
            }
        }
    }

    public Date getDateTime(Date date, String type) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        if (type.equalsIgnoreCase("start")) {
            calendar.set(11, 0);
            calendar.set(12, 0);
            calendar.set(13, 0);
            calendar.set(14, 0);
        } else {
            calendar.set(11, 23);
            calendar.set(12, 59);
            calendar.set(13, 59);
            calendar.set(14, 59);
        }
        Date dateTime = calendar.getTime();
        return dateTime;
    }

    public void clearOrgTracker(Long id, String type) {
        List<OrgTracker> orgTrackers = null;
        orgTrackers = type == null ? this.orgTrackerRepository.findBy(id.longValue()) : this.orgTrackerRepository.findByAllList(id.longValue());
        if (!orgTrackers.isEmpty()) {
            for (OrgTracker orgTracker : orgTrackers) {
                this.orgTrackerRepository.delete(orgTracker);
            }
        }
    }

    public List<OrgTrackerDTO> orgTrackSearchList(String firstName, String dateRange) {
        ArrayList<OrgTrackerDTO> trackerDTOList = new ArrayList<OrgTrackerDTO>();
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
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
        List<EmployeeProfilePo> employeeProfilePos = this.employeeDAO.findAll(firstName, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        for (EmployeeProfilePo profilePo : employeeProfilePos) {
            List<OrgTracker> tracker = null;
            tracker = dateRange != null ? this.orgTrackerRepository.findByAllList(profilePo.getEmpId(), this.getDateTime(firstDate, "start"), this.getDateTime(secondDate, "end")) : this.orgTrackerRepository.findByAllList(profilePo.getEmpId());
            if (tracker.isEmpty()) continue;
            List trackerDTOS = tracker.stream().map(dbValue -> {
                OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                this.populateAdditionalDetails(orgTrackerDTO);
                return orgTrackerDTO;
            }).collect(Collectors.toList());
            trackerDTOList.addAll(trackerDTOS);
        }
        return trackerDTOList;
    }
}

