/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.RiskCommentsDTO
 *  com.estrat.backend.db.dto.RiskDTO
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.RiskUtil
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.PageService
 *  com.estrat.backend.db.service.RiskAttachmentService
 *  com.estrat.backend.db.service.RiskCauseAndConsequenceService
 *  com.estrat.backend.db.service.RiskCommentsService
 *  com.estrat.backend.db.service.RiskMonitoringService
 *  com.estrat.backend.db.service.RiskPlanService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 *  org.springframework.util.CollectionUtils
 */
package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.RiskCommentsDTO;
import com.estrat.backend.db.dto.RiskDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.KPIService;
import com.estrat.backend.db.service.PageService;
import com.estrat.backend.db.service.RiskAttachmentService;
import com.estrat.backend.db.service.RiskCauseAndConsequenceService;
import com.estrat.backend.db.service.RiskCommentsService;
import com.estrat.backend.db.service.RiskMonitoringService;
import com.estrat.backend.db.service.RiskPlanService;
import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

@Component
public class RiskUtil {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private RiskMonitoringService monitoringService;
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private RiskCommentsService riskCommentsService;
    @Autowired
    private PageService pageService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    private RiskCauseAndConsequenceService causeAndConsequenceService;
    @Autowired
    private RiskAttachmentService riskAttachmentService;

    public void formatDates(Map<String, Object> stringObjectsMap) {
        String dateRange;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
            knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
            knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
            Date firstDate = null;
            Date secondDate = null;
            for (SimpleDateFormat pattern : knownPatterns) {
                try {
                    firstDate = pattern.parse(startDate);
                    secondDate = pattern.parse(endDate);
                }
                catch (ParseException parseException) {}
            }
            stringObjectsMap.put("dateRange", String.join((CharSequence)"-", ((SimpleDateFormat)knownPatterns.get(1)).format(firstDate), ((SimpleDateFormat)knownPatterns.get(1)).format(secondDate)));
        }
    }

    public void formatDates(RiskDTO riskDTO) {
        ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
        knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
        knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
        String dateCompleted = Objects.nonNull(riskDTO.getRiskValue().get("dateCompleted")) ? riskDTO.getRiskValue().get("dateCompleted").toString() : "";
        String nextAssessment = Objects.nonNull(riskDTO.getRiskValue().get("nextAssessment")) ? riskDTO.getRiskValue().get("nextAssessment").toString() : "";
        String dateraised = Objects.nonNull(riskDTO.getRiskValue().get("dateRaised")) ? riskDTO.getRiskValue().get("dateRaised").toString() : "";
        Date completedDate = null;
        Date assessmentDate = null;
        Date raisedDate = null;
        for (SimpleDateFormat pattern : knownPatterns) {
            try {
                completedDate = pattern.parse(dateCompleted);
            }
            catch (ParseException parseException) {
                // empty catch block
            }
            try {
                assessmentDate = pattern.parse(nextAssessment);
            }
            catch (ParseException parseException) {
                // empty catch block
            }
            try {
                raisedDate = pattern.parse(dateraised);
            }
            catch (ParseException parseException) {}
        }
        riskDTO.getRiskValue().put("ch_dateCompleted", Objects.nonNull(completedDate) ? ((SimpleDateFormat)knownPatterns.get(1)).format(completedDate) : "");
        riskDTO.getRiskValue().put("ch_nextAssessment", Objects.nonNull(assessmentDate) ? ((SimpleDateFormat)knownPatterns.get(1)).format(assessmentDate) : "");
        riskDTO.getRiskValue().put("ch_dateRaised", Objects.nonNull(assessmentDate) ? ((SimpleDateFormat)knownPatterns.get(1)).format(assessmentDate) : "");
    }

    public void populateAddtionalDetails(RiskDTO riskDTO, boolean flag) {
        if (Objects.nonNull(riskDTO.getImpactId())) {
            Optional kpidto = this.kpiService.findById(riskDTO.getImpactId());
            if (kpidto.isPresent()) {
                riskDTO.getRiskValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
            } else {
                riskDTO.getRiskValue().put("impactDesc", "");
            }
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(riskDTO.getCreatedBy());
        Employee employee = this.employeeService.getEmployeeWithAllStatus(employeeDTO);
        if (employee == null) {
            employee = new Employee();
        }
        if (Objects.nonNull(riskDTO.getDepartmentId()) && riskDTO.getDepartmentId() != 0L) {
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(riskDTO.getDepartmentId());
            if (deptData != null) {
                riskDTO.getRiskValue().put("department", deptData.getDeptName());
            } else if (StringUtils.isBlank((String) riskDTO.getRiskValue().get("department"))) {
                DeptDetails deptDetails = this.departmentDetailsService.findById(riskDTO.getDepartmentId());
                if (deptDetails != null && StringUtils.isNotBlank(deptDetails.getName())) {
                    riskDTO.getRiskValue().put("department", deptDetails.getName());
                }
            }
        } else if (riskDTO.getCreatedBy() != 0L) {
            if (employee.getDeptDetails() != null) {
                riskDTO.setDepartmentId(Long.valueOf(employee.getDeptDetails().getId()));
                riskDTO.getRiskValue().put("department", employee.getDeptDetails().getName());
            } else if (riskDTO.getOwner() != 0L) {
                employeeDTO.setEmployeeId(riskDTO.getOwner());
                Employee owner = this.employeeService.getEmployeeWithAllStatus(employeeDTO);
                if (owner != null && owner.getDeptDetails() != null) {
                    riskDTO.setDepartmentId(Long.valueOf(owner.getDeptDetails().getId()));
                    riskDTO.getRiskValue().put("department", owner.getDeptDetails().getName());
                }
            }
        }
        riskDTO.getRiskValue().put("riskImage", employee.getProfileImage() != null ? employee.getProfileImage() : "");
        this.formatDates(riskDTO);
        if (flag) {
            if (riskDTO.getPageId() != 0L) {
                Optional<PagesDetails> page = this.pageService.findById(riskDTO.getPageId());
                page.ifPresent(pagesDetails -> riskDTO.setPageName(pagesDetails.getPageName()));
            }
            if (riskDTO.getDepartmentId() != null) {
                DeptDetails deptMeta = this.departmentDetailsService.findById(riskDTO.getDepartmentId());
                if (deptMeta != null && StringUtils.isNotBlank(deptMeta.getDeptID())) {
                    riskDTO.setDeptUniqueId(deptMeta.getDeptID());
                }
            }
            if (CollectionUtils.isEmpty((Collection)riskDTO.getRiskCauseAndConsequenceList())) {
                riskDTO.setRiskCauseAndConsequenceList(this.causeAndConsequenceService.findAllByRiskDetailsId(Long.valueOf(riskDTO.getId())));
            }
            riskDTO.setRiskPlanList(this.riskPlanService.findAllByRiskDetailsId(Long.valueOf(riskDTO.getId())));
            riskDTO.setRiskTreatmentList(this.riskPlanService.findAllByRiskDetailsIdTreatment(Long.valueOf(riskDTO.getId())));
            riskDTO.setRiskMonitoringList(this.monitoringService.findAllByRiskDetailsId(Long.valueOf(riskDTO.getId())));
            riskDTO.setRiskCommentsList(this.riskCommentsService.findAllByRiskDetailsId(Long.valueOf(riskDTO.getId()), Long.valueOf(0L)));
        }
    }

    public void populateAddtionalForHistory(RiskDTO riskDTO, boolean flag) {
        if (Objects.nonNull(riskDTO.getImpactId())) {
            Optional kpidto = this.kpiService.findById(riskDTO.getImpactId());
            if (kpidto.isPresent()) {
                riskDTO.getRiskValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
            } else {
                riskDTO.getRiskValue().put("impactDesc", "");
            }
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(riskDTO.getCreatedBy());
        Employee employee = this.employeeService.getEmployeeWithAllStatus(employeeDTO);
        if (Objects.nonNull(riskDTO.getDepartmentId()) && riskDTO.getDepartmentId() != 0L) {
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(riskDTO.getDepartmentId());
            if (deptData != null) {
                riskDTO.getRiskValue().put("department", deptData.getDeptName());
            }
        } else if (riskDTO.getCreatedBy() != 0L && employee != null && employee.getDeptDetails() != null) {
            riskDTO.setDepartmentId(Long.valueOf(employee.getDeptDetails().getId()));
            riskDTO.getRiskValue().put("department", employee.getDeptDetails().getName());
        }
        riskDTO.getRiskValue().put("riskImage", employee.getProfileImage());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MMM dd, yyyy");
        Date createdDate = Date.from(riskDTO.getCreatedTime().atZone(ZoneId.systemDefault()).toInstant());
        riskDTO.getRiskValue().put("ch_dateRaised", simpleDateFormat.format(createdDate));
        if (flag) {
            if (riskDTO.getPageId() != 0L) {
                Optional<PagesDetails> page = this.pageService.findById(riskDTO.getPageId());
                page.ifPresent(pagesDetails -> riskDTO.setPageName(pagesDetails.getPageName()));
            }
            if (riskDTO.getDepartmentId() != null) {
                DeptDetails deptMeta = this.departmentDetailsService.findById(riskDTO.getDepartmentId());
                if (deptMeta != null && StringUtils.isNotBlank(deptMeta.getDeptID())) {
                    riskDTO.setDeptUniqueId(deptMeta.getDeptID());
                }
            }
            if (CollectionUtils.isEmpty((Collection)riskDTO.getRiskCauseAndConsequenceList())) {
                riskDTO.setRiskCauseAndConsequenceList(this.causeAndConsequenceService.findAllByRiskVersion(Long.valueOf(riskDTO.getId()), riskDTO.getVersion()));
            }
            riskDTO.setRiskPlanList(this.riskPlanService.findByVersion(Long.valueOf(riskDTO.getId()), riskDTO.getVersion(), "RiskPlan"));
            riskDTO.setRiskTreatmentList(this.riskPlanService.findByVersion(Long.valueOf(riskDTO.getId()), riskDTO.getVersion(), "RiskTreatment"));
            riskDTO.setRiskMonitoringList(this.monitoringService.findAllByRiskVerson(Long.valueOf(riskDTO.getId()), riskDTO.getVersion()));
            riskDTO.setRiskCommentsList(this.riskCommentsService.findAllByRiskDetailsId(Long.valueOf(riskDTO.getId()), riskDTO.getVersion()));
        }
    }

    public void updateCommentsDetails(RiskCommentsDTO riskDTO) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (riskDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(riskDTO.getUpdatedBy());
        }
        Employee employee = this.employeeService.getEmployeeWithAllStatus(employeeDTO);
        riskDTO.getRiskCommentsValue().put("commentsImage", employee.getProfileImage());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
        DateFormatSymbols symbols = new DateFormatSymbols(Locale.getDefault());
        int hour = calendar.get(10);
        String hourValue = hour < 12 ? "AM" : "PM";
        String dayOfMonthStr = symbols.getWeekdays()[calendar.get(7)];
        String hourMin = String.join((CharSequence)":", String.valueOf(calendar.get(11)), String.valueOf(calendar.get(12)));
        riskDTO.getRiskCommentsValue().put("formattedTime", String.join((CharSequence)" ", dateFormat.format(new Date()), hourMin, hourValue, dayOfMonthStr));
        riskDTO.getRiskCommentsValue().put("formattedDateTime", this.getCurrentTimeUTC().toString());
    }

    public RiskDTO formatDateSave(RiskDTO riskDTO) {
        ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
        knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
        knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
        String dateCompleted = Objects.nonNull(riskDTO.getRiskValue().get("dateCompleted")) ? riskDTO.getRiskValue().get("dateCompleted").toString() : "";
        String dateraised = Objects.nonNull(riskDTO.getRiskValue().get("dateRaised")) ? riskDTO.getRiskValue().get("dateRaised").toString() : "";
        Date completedDate = null;
        Date raisedDate = null;
        for (SimpleDateFormat pattern : knownPatterns) {
            try {
                completedDate = pattern.parse(dateCompleted);
            }
            catch (ParseException parseException) {
                // empty catch block
            }
            try {
                raisedDate = pattern.parse(dateraised);
            }
            catch (ParseException parseException) {}
        }
        riskDTO.setRaisedDate(raisedDate);
        riskDTO.setCompletedDate(completedDate);
        return riskDTO;
    }

    public LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
    }
}

