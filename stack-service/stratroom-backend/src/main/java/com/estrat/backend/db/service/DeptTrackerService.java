/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.DeptTracker
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dao.EmployeeDAO
 *  com.estrat.backend.db.dto.ChildTrackerDTO
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.OrgTrackerDTO
 *  com.estrat.backend.db.repository.ChildTrackerRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.repository.DeptTrackerRepository
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.DeptTrackerService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.PageService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.ChildTracker;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.DeptTracker;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dao.EmployeeDAO;
import com.estrat.backend.db.dto.ChildTrackerDTO;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.OrgTrackerDTO;
import com.estrat.backend.db.repository.ChildTrackerRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.repository.DeptTrackerRepository;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DepartmentDetailsService;
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
public class DeptTrackerService {
    @Autowired
    protected DeptTrackerRepository deptTrackerRepository;
    @Autowired
    protected DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMappingRepository;
    @Autowired
    protected EmployeeDAO employeeDAO;
    @Autowired
    protected PageService pageService;
    @Autowired
    protected EmployeeProfilePoRepo employeeProfilePoRepo;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentDetailsService departmentDetailService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected ChildTrackerRepository childTrackerRepository;

    public void saveDeptTrack(DepartmentChartDTO departmentChartDTO, Long whoIsID) {
        DeptTracker deptTracker = new DeptTracker();
        deptTracker.setActive(0);
        deptTracker.setCreatedTime(LocalDateTime.now());
        deptTracker.setDeptId(departmentChartDTO.getDeptId().longValue());
        deptTracker.setParentId(departmentChartDTO.getDeptParentId());
        deptTracker.setRemoveOrAddUserId(whoIsID);
        if (departmentChartDTO.getOwner() != null) {
            deptTracker.setOwner(departmentChartDTO.getOwner());
        }
        deptTracker.setType("Add");
        deptTracker.setStartDate(new Date());
        this.deptTrackerRepository.save(deptTracker);
    }

    public void saveOrUpdateDeptTrack(DepartmentChartDTO departmentChartDTO, Long whoIsID) {
        Boolean status = true;
        Boolean statusCheck = false;
        DeptTracker findTracker = this.deptTrackerRepository.findByNoPage(departmentChartDTO.getDeptId().longValue(), departmentChartDTO.getDeptParentId().longValue(), 0);
        if (findTracker == null) {
            DeptTracker checkTracker = this.deptTrackerRepository.findBy(departmentChartDTO.getDeptId().longValue(), 0);
            if (checkTracker != null) {
                if (checkTracker.getParentId() != 0L) {
                    checkTracker.setEndDate(new Date());
                    checkTracker.setActive(1);
                    this.deptTrackerRepository.save(checkTracker);
                    statusCheck = true;
                } else {
                    status = false;
                }
            }
        } else {
            status = false;
        }
        if (status.booleanValue()) {
            DeptTracker deptTracker = new DeptTracker();
            deptTracker.setActive(0);
            deptTracker.setCreatedTime(LocalDateTime.now());
            deptTracker.setDeptId(departmentChartDTO.getDeptId().longValue());
            deptTracker.setParentId(departmentChartDTO.getDeptParentId());
            if (departmentChartDTO.getOwner() != null) {
                deptTracker.setOwner(departmentChartDTO.getOwner());
            }
            deptTracker.setRemoveOrAddUserId(whoIsID);
            if (statusCheck.booleanValue()) {
                deptTracker.setType("Add");
            } else {
                deptTracker.setType("Update");
            }
            deptTracker.setStartDate(new Date());
            this.deptTrackerRepository.save(deptTracker);
        }
    }

    public List<ChildTrackerDTO> getChildTrackers(Long orgid, Long type, Long upgrade) {
        List deptdetails;
        String dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        String[] dateStrings = dateRange.split("-");
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String from_dtstrString = null;
        String to_dtstrString = null;
        try {
            Date frm_date = dateFormat.parse(dateStrings[0]);
            Date to_date = dateFormat.parse(dateStrings[1]);
            from_dtstrString = outputFormat.format(frm_date);
            to_dtstrString = outputFormat.format(to_date);
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        if (upgrade != null && upgrade == 1L && (deptdetails = this.departmentDetailService.ownerMappingDepartmentList(orgid.longValue())) != null && deptdetails.size() > 0) {
            orgid = ((DeptDetails)deptdetails.get(0)).getId();
        }
        List<ChildTracker> childTrackers = this.childTrackerRepository.findByListParent(orgid, from_dtstrString, to_dtstrString);
        List<ChildTrackerDTO> childTrackerDTOs = childTrackers.stream().map(val -> new ChildTrackerDTO(val)).collect(Collectors.toList());
        return childTrackerDTOs;
    }

    public List<ChildTrackerDTO> getChildTrackers(Long orgid, Long type) {
        String dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        String[] dateStrings = dateRange.split("-");
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String from_dtstrString = null;
        String to_dtstrString = null;
        try {
            Date frm_date = dateFormat.parse(dateStrings[0]);
            Date to_date = dateFormat.parse(dateStrings[1]);
            from_dtstrString = outputFormat.format(frm_date);
            to_dtstrString = outputFormat.format(to_date);
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        List<ChildTracker> childTrackers = this.childTrackerRepository.findByListParent(orgid, from_dtstrString, to_dtstrString);
        List<ChildTrackerDTO> childTrackerDTOs = childTrackers.stream().map(val -> new ChildTrackerDTO(val)).collect(Collectors.toList());
        return childTrackerDTOs;
    }

    public void updateDeptTrack(DepartmentChartDTO departmentChartDTO, Long whoIsID) {
        Boolean status = true;
        Boolean statusCheck = false;
        DeptTracker findTracker = null;
        if (departmentChartDTO.getDeptId() != null && departmentChartDTO.getDeptParentId() != null) {
            findTracker = this.deptTrackerRepository.findByNoPage(departmentChartDTO.getDeptId().longValue(), departmentChartDTO.getDeptParentId().longValue(), 0);
        }
        if (findTracker == null) {
            DeptTracker checkTracker = this.deptTrackerRepository.findBy(departmentChartDTO.getDeptId().longValue(), 0);
            if (checkTracker != null) {
                checkTracker.setEndDate(new Date());
                checkTracker.setActive(1);
                this.deptTrackerRepository.save(checkTracker);
                statusCheck = true;
            }
        } else {
            findTracker.setEndDate(new Date());
            findTracker.setActive(1);
            this.deptTrackerRepository.save(findTracker);
        }
        DeptTracker deptTracker = new DeptTracker();
        deptTracker.setActive(0);
        deptTracker.setCreatedTime(LocalDateTime.now());
        deptTracker.setDeptId(departmentChartDTO.getDeptId().longValue());
        deptTracker.setParentId(departmentChartDTO.getDeptParentId());
        if (departmentChartDTO.getOwner() != null) {
            deptTracker.setOwner(departmentChartDTO.getOwner());
        }
        deptTracker.setRemoveOrAddUserId(whoIsID);
        if (statusCheck.booleanValue()) {
            deptTracker.setType("Add");
        } else {
            deptTracker.setType("Update");
        }
        deptTracker.setStartDate(new Date());
        this.deptTrackerRepository.save(deptTracker);
    }

    public void deleteDeptTrack(DepartmentChartDTO departmentChartDTO, Long whoIsID) {
        List<DeptTracker> findTracker = this.deptTrackerRepository.findBy(departmentChartDTO.getDeptId().longValue());
        for (DeptTracker deptTracker : findTracker) {
            if (deptTracker == null) continue;
            deptTracker.setEndDate(new Date());
            deptTracker.setActive(1);
            this.deptTrackerRepository.save(deptTracker);
        }
    }

    public List<OrgTrackerDTO> findAll(String title, String dateRange, String id) {
        DepartmentChartMapping departmentChartMappings;
        DepartmentDetails departmentDetails;
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
        if ((departmentDetails = this.departmentDetailsRepository.findByDetails(id, title, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue())) != null && (departmentChartMappings = this.departmentChartMappingRepository.getOne(Long.valueOf(departmentDetails.getId()))) != null) {
            List<DeptTracker> tracker = null;
            tracker = dateRange != null && !dateRange.isEmpty() ? this.deptTrackerRepository.findByPresent(departmentChartMappings.getDeptId().longValue(), this.getDateTime(firstDate, "start"), this.getDateTime(secondDate, "end")) : this.deptTrackerRepository.findBy(departmentChartMappings.getDeptId().longValue());
            if (!tracker.isEmpty()) {
                List trackerDTOSs = tracker.stream().map(dbValue -> {
                    OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                    this.populateAdditionalDept(orgTrackerDTO, "self", departmentChartMappings);
                    return orgTrackerDTO;
                }).collect(Collectors.toList());
                trackerDTOList.addAll(trackerDTOSs);
            }
        }
        return trackerDTOList;
    }

    public List<OrgTrackerDTO> findAll(String dateRange) {
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
        Long deptId = this.employeeService.superUserDeptId();
        List<DepartmentDetails> deptDetailsList = this.departmentDetailsRepository.findAllByOrgId(deptId.longValue(), Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "Active");
        for (DepartmentDetails departmentDetails : deptDetailsList) {
            DepartmentChartMapping departmentChartMappings;
            if (departmentDetails == null || (departmentChartMappings = this.departmentChartMappingRepository.getOne(Long.valueOf(departmentDetails.getId()))) == null) continue;
            List<DeptTracker> tracker = null;
            tracker = dateRange != null && !dateRange.isEmpty() ? this.deptTrackerRepository.findBy(departmentChartMappings.getDeptId().longValue(), this.getDateTime(firstDate, "start"), this.getDateTime(secondDate, "end")) : this.deptTrackerRepository.findBy(departmentChartMappings.getDeptId().longValue());
            if (tracker.isEmpty()) continue;
            List trackerDTOSs = tracker.stream().map(dbValue -> {
                OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                this.populateAdditionalDept(orgTrackerDTO, "self", departmentChartMappings);
                return orgTrackerDTO;
            }).collect(Collectors.toList());
            trackerDTOList.addAll(trackerDTOSs);
        }
        return trackerDTOList;
    }

    public void populateAdditionalDept(OrgTrackerDTO orgTrackerDTO, String type, DepartmentChartMapping departmentChartMapping) {
        DepartmentDetails departmentDetails = (DepartmentDetails)this.departmentDetailsRepository.findById(orgTrackerDTO.getDeptId()).get();
        if (orgTrackerDTO.getParentId() != 0L) {
            orgTrackerDTO.setParentName(((DepartmentDetails)this.departmentDetailsRepository.findById(orgTrackerDTO.getParentId()).get()).getName());
        }
        if (departmentDetails != null) {
            Optional employeeProfilePo;
            if (orgTrackerDTO.getOwner() != null) {
                Optional employeeProfilePo2 = this.employeeProfilePoRepo.findById(orgTrackerDTO.getOwner());
                if (employeeProfilePo2.isPresent()) {
                    orgTrackerDTO.setOwnerName(((EmployeeProfilePo)employeeProfilePo2.get()).getFirstName());
                }
            } else if (departmentChartMapping.getOwner() != null && (employeeProfilePo = this.employeeProfilePoRepo.findById(departmentChartMapping.getOwner())).isPresent()) {
                orgTrackerDTO.setOwnerName(((EmployeeProfilePo)employeeProfilePo.get()).getFirstName());
            }
            orgTrackerDTO.setEmail(this.employeeService.getEmails(Long.valueOf(departmentDetails.getId())));
            orgTrackerDTO.setDesignation(departmentDetails.getName());
            orgTrackerDTO.setFromDate(this.getDateString(orgTrackerDTO.getStartDate()));
            if (orgTrackerDTO.getEndDate() != null) {
                orgTrackerDTO.setToDate(this.getDateString(orgTrackerDTO.getEndDate()));
            } else {
                orgTrackerDTO.setToDate("Present");
            }
        }
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
            DepartmentChartMapping departmentChart = this.departmentChartMappingRepository.getOne(((PagesDetails)pagesDetails.get()).getDeptId());
            if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
                DeptTracker deptTracker = new DeptTracker();
                deptTracker.setActive(0);
                deptTracker.setCreatedTime(LocalDateTime.now());
                if (departmentChart != null) {
                    deptTracker.setDeptId(departmentChart.getDeptId().longValue());
                    deptTracker.setParentId(departmentChart.getDeptParentId());
                    if (departmentChart.getOwner() != null) {
                        deptTracker.setOwner(departmentChart.getOwner());
                    }
                } else {
                    deptTracker.setDeptId(Long.valueOf(0L).longValue());
                    deptTracker.setParentId(Long.valueOf(0L));
                }
                deptTracker.setOrgId(Long.valueOf(employeeProfilePo.getOrgId().getId()));
                deptTracker.setRemoveOrAddUserId(whoIsID);
                deptTracker.setPageName(((PagesDetails)pagesDetails.get()).getPageName());
                deptTracker.setPageId(Long.valueOf(((PagesDetails)pagesDetails.get()).getId()));
                deptTracker.setType("Add");
                deptTracker.setStartDate(new Date());
                this.deptTrackerRepository.save(deptTracker);
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
            DepartmentChartMapping departmentChart = null;
            if (((PagesDetails)pagesDetails.get()).getDeptId() != 0L) {
                departmentChart = this.departmentChartMappingRepository.getOne(((PagesDetails)pagesDetails.get()).getDeptId());
            }
            if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
                DeptTracker findTracker = null;
                findTracker = departmentChart != null ? this.deptTrackerRepository.findBy(departmentChart.getDeptId().longValue(), departmentChart.getDeptParentId().longValue(), pageId.longValue(), 0) : this.deptTrackerRepository.findBy(Long.valueOf(0L).longValue(), Long.valueOf(0L).longValue(), pageId.longValue(), 0);
                if (findTracker == null) {
                    DeptTracker checkTracker = null;
                    checkTracker = departmentChart != null ? this.deptTrackerRepository.findByPage(departmentChart.getDeptId().longValue(), pageId.longValue(), 0) : this.deptTrackerRepository.findByPage(Long.valueOf(0L).longValue(), pageId.longValue(), 0);
                    if (checkTracker != null) {
                        checkTracker.setEndDate(new Date());
                        checkTracker.setActive(1);
                        this.deptTrackerRepository.save(checkTracker);
                        statusCheck = true;
                    }
                } else {
                    status = false;
                }
                if (status.booleanValue()) {
                    DeptTracker deptTracker = new DeptTracker();
                    deptTracker.setActive(0);
                    deptTracker.setCreatedTime(LocalDateTime.now());
                    if (departmentChart != null) {
                        deptTracker.setDeptId(departmentChart.getDeptId().longValue());
                        deptTracker.setParentId(departmentChart.getDeptParentId());
                        if (departmentChart.getOwner() != null) {
                            deptTracker.setOwner(departmentChart.getOwner());
                        }
                    } else {
                        deptTracker.setDeptId(Long.valueOf(0L).longValue());
                        deptTracker.setParentId(Long.valueOf(0L));
                    }
                    deptTracker.setOrgId(Long.valueOf(employeeProfilePo.getOrgId().getId()));
                    deptTracker.setPageName(((PagesDetails)pagesDetails.get()).getPageName());
                    deptTracker.setPageId(Long.valueOf(((PagesDetails)pagesDetails.get()).getId()));
                    deptTracker.setRemoveOrAddUserId(whoIsID);
                    if (statusCheck.booleanValue()) {
                        deptTracker.setType("Add");
                    } else {
                        deptTracker.setType("Update");
                    }
                    deptTracker.setStartDate(new Date());
                    this.deptTrackerRepository.save(deptTracker);
                }
            }
        }
    }

    public void deleteTrack(Long pageId, Long whoIsID) {
        Optional pagesDetails = this.pageService.findById(pageId.longValue());
        if (pagesDetails.isPresent()) {
            EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(whoIsID);
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(employeeProfilePo.getOrgId().getId());
            DepartmentChartMapping departmentChart = null;
            if (((PagesDetails)pagesDetails.get()).getDeptId() != 0L) {
                departmentChart = this.departmentChartMappingRepository.getOne(((PagesDetails)pagesDetails.get()).getDeptId());
            }
            if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
                DeptTracker findTracker = null;
                findTracker = departmentChart != null ? this.deptTrackerRepository.findBy(departmentChart.getDeptId().longValue(), departmentChart.getDeptParentId().longValue(), pageId.longValue(), 0) : this.deptTrackerRepository.findBy(Long.valueOf(0L).longValue(), Long.valueOf(0L).longValue(), pageId.longValue(), 0);
                if (findTracker == null) {
                    DeptTracker checkTracker = null;
                    checkTracker = departmentChart != null ? this.deptTrackerRepository.findByPage(departmentChart.getDeptId().longValue(), pageId.longValue(), 0) : this.deptTrackerRepository.findByPage(Long.valueOf(0L).longValue(), pageId.longValue(), 0);
                    if (checkTracker != null) {
                        checkTracker.setEndDate(new Date());
                        checkTracker.setActive(1);
                        this.deptTrackerRepository.save(checkTracker);
                    }
                } else {
                    findTracker.setEndDate(new Date());
                    findTracker.setActive(1);
                    this.deptTrackerRepository.save(findTracker);
                }
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

    public void clearDeptTracker(Long id, String type) {
        List<DeptTracker> deptTracker = null;
        deptTracker = type == null ? this.deptTrackerRepository.findBy(id.longValue()) : this.deptTrackerRepository.findByAllList(id.longValue());
        if (!deptTracker.isEmpty()) {
            for (DeptTracker dept : deptTracker) {
                this.deptTrackerRepository.delete(dept);
            }
        }
    }

    public List<OrgTrackerDTO> deptTrackSearchList(String title, String dateRange) {
        List<DepartmentDetails> departmentDetailsList;
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
        if (!(departmentDetailsList = this.departmentDetailsRepository.findByNameList(title, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue(), "Active")).isEmpty() && departmentDetailsList != null) {
            for (DepartmentDetails departmentDetails : departmentDetailsList) {
                DepartmentChartMapping departmentChartMappings = this.departmentChartMappingRepository.getOne(Long.valueOf(departmentDetails.getId()));
                if (departmentChartMappings == null) continue;
                List<DeptTracker> tracker = null;
                tracker = dateRange != null && !dateRange.isEmpty() ? this.deptTrackerRepository.findByAllList(departmentChartMappings.getDeptId().longValue(), this.getDateTime(firstDate, "start"), this.getDateTime(secondDate, "end")) : this.deptTrackerRepository.findByAllList(departmentChartMappings.getDeptId().longValue());
                if (tracker.isEmpty()) continue;
                List trackerDTOSs = tracker.stream().map(dbValue -> {
                    OrgTrackerDTO orgTrackerDTO = new OrgTrackerDTO(dbValue);
                    this.populateAdditionalDept(orgTrackerDTO, "self", departmentChartMappings);
                    return orgTrackerDTO;
                }).collect(Collectors.toList());
                trackerDTOList.addAll(trackerDTOSs);
            }
        }
        return trackerDTOList;
    }
}

