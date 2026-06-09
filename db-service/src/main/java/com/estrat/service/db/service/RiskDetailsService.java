/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.DepartmentChartMapping
 *  com.estrat.service.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.RiskCustomScore
 *  com.estrat.service.db.bean.po.RiskDetails
 *  com.estrat.service.db.bean.po.RiskEvent
 *  com.estrat.service.db.bean.po.RiskOptions
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.service.db.dao.PageRepository
 *  com.estrat.service.db.dao.RiskDetailsRepository
 *  com.estrat.service.db.dao.RiskEventRepository
 *  com.estrat.service.db.dao.RiskPlanMappingRepository
 *  com.estrat.service.db.dao.RiskPlanRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.estrat.service.db.dto.RiskCustomScoreDto
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskDashBoardResponseDTO
 *  com.estrat.service.db.dto.RiskEventDTO
 *  com.estrat.service.db.dto.RiskEventFrequencyCountDto
 *  com.estrat.service.db.dto.RiskEventNameCountDto
 *  com.estrat.service.db.dto.RiskMonitoringDTO
 *  com.estrat.service.db.dto.RiskOptionsDto
 *  com.estrat.service.db.dto.RiskPlanDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.service.db.repository.EmployeeProfilePoRepo
 *  com.estrat.service.db.repository.RiskCustomScoreRepository
 *  com.estrat.service.db.repository.RiskOptionRepository
 *  com.estrat.service.db.resource.util.RiskUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ControlPanelGeneralService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RiskDetailsService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.data.domain.Page
 *  org.springframework.data.domain.PageRequest
 *  org.springframework.data.domain.Pageable
 *  org.springframework.data.domain.Sort
 *  org.springframework.data.domain.Sort$Direction
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.DepartmentChartMapping;
import com.estrat.service.db.bean.po.DeptMultipleOwnersMapping;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.bean.po.RiskCustomScore;
import com.estrat.service.db.bean.po.RiskDetails;
import com.estrat.service.db.bean.po.RiskEvent;
import com.estrat.service.db.bean.po.RiskOptions;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.service.db.dao.PageRepository;
import com.estrat.service.db.dao.RiskDetailsRepository;
import com.estrat.service.db.dao.RiskEventRepository;
import com.estrat.service.db.dao.RiskPlanMappingRepository;
import com.estrat.service.db.dao.RiskPlanRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.estrat.service.db.dto.RiskCustomScoreDto;
import com.estrat.service.db.dto.RiskDTO;
import com.estrat.service.db.dto.RiskDashBoardResponseDTO;
import com.estrat.service.db.dto.RiskEventDTO;
import com.estrat.service.db.dto.RiskEventFrequencyCountDto;
import com.estrat.service.db.dto.RiskEventNameCountDto;
import com.estrat.service.db.dto.RiskMonitoringDTO;
import com.estrat.service.db.dto.RiskOptionsDto;
import com.estrat.service.db.dto.RiskPlanDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.service.db.repository.EmployeeProfilePoRepo;
import com.estrat.service.db.repository.RiskCustomScoreRepository;
import com.estrat.service.db.repository.RiskOptionRepository;
import com.estrat.service.db.resource.util.RiskUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ControlPanelGeneralService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.UserRoleManagementService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class RiskDetailsService {
    private Logger log = LoggerFactory.getLogger(RiskDetailsService.class);
    @Autowired
    protected RiskDetailsRepository riskDetailsRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private RiskPlanMappingRepository riskPlanMappingRepository;
    @Autowired
    private RiskCustomScoreRepository riskCustomScoreRepository;
    @Autowired
    private RiskOptionRepository riskOptionRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    private EmployeeDepartmentMappingRepository departmentMappingRepository;
    @Autowired
    private PageRepository pageRepository;
    @Autowired
    private RiskEventRepository riskEventRepository;
    @Autowired
    private EmployeeProfilePoRepo employeeProfilePoRepo;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    protected RiskPlanRepository riskPlanRepository;
    @Autowired
    protected StagingChangeRepository stagingChangeRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    protected ControlPanelGeneralService generalService;
    @Autowired
    protected DeptMultipleOwnersMappingRepository deptMultipleOwnersMapping;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMappingRepo;

    public Optional<RiskDetails> findById(long id) {
        return this.riskDetailsRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public RiskResponseDTO deleteRiskDetails(Optional<RiskDetails> riskDetails) {
        RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
        if (riskDetails.isPresent()) {
            RiskDetails riskDetails1 = riskDetails.get();
            riskDetails1.setActive(1);
            riskDetails1.getRiskPlanList();
            riskDetails1.getRiskCauseAndConsequenceList();
            riskDetails1.getRiskCommentsList();
            riskDetails1.getRiskMonitoringList();
            this.riskDetailsRepository.save(riskDetails1);
            riskResponseDTO.setFlag(true);
            this.dbCache.remove((Object)("findImpactedRiskDetails" + riskDetails1.getImpactId()), "dbCache");
            this.dbCache.remove((Object)("retrieveRiskDetailsByEmpId" + UserThreadLocal.get()), "dbCache");
            return riskResponseDTO;
        }
        riskResponseDTO.setFlag(false);
        return riskResponseDTO;
    }

    public RiskResponseDTO save(RiskDetails riskDetails) {
        RiskDetails riskDetailsResponse = (RiskDetails)this.riskDetailsRepository.save(riskDetails);
        RiskResponseDTO responseDTO = new RiskResponseDTO();
        responseDTO.setFlag(true);
        RiskDTO riskDTO = new RiskDTO(riskDetailsResponse, false);
        responseDTO.setRiskDTO(riskDTO);
        this.dbCache.remove((Object)("findImpactedRiskDetails" + riskDetails.getImpactId()), "dbCache");
        this.dbCache.remove((Object)("retrieveRiskDetailsByEmpId" + UserThreadLocal.get()), "dbCache");
        return responseDTO;
    }

    public List<RiskDTO> riskCodeList(long empId, String dateRange) {
        List dbList = null;
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            dbList = this.riskDetailsRepository.findAllByEmpIdANDDate(Long.valueOf(empId), 0, firstDate, secondDate);
        } else {
            dbList = this.riskDetailsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        }
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, false);
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskDTO> riskListByEmpId(long empId, String dateRange) {
        List dbList = null;
        List<Long> idList = new ArrayList<Long>();
        System.out.println("Date Range in Risk :" + dateRange);
        Employee employee = this.employeeService.getProfileDetails(empId);
        ControlPanelGeneralDTO controlPanelGeneralDTO = this.generalService.findByOrgId(employee.getOrgDetails().getOrgId());
        if (controlPanelGeneralDTO.getImplementationType().equalsIgnoreCase("Department")) {
            List<Long> deptIdListList;
            if (employee.getDeptDetails() != null) {
                deptIdListList = this.departmentMappingRepository.departmentByDeptIdList(empId, "Active");
                if (!deptIdListList.isEmpty()) {
                    idList = this.departmentChartMappingRepo.findOwnerIDList((List)deptIdListList);
                    System.out.println("List 1 = " + idList);
                    idList.addAll(this.departmentMappingRepository.departmentByEmployeeIdList(deptIdListList, "Active"));
                    System.out.println("List 2 = " + idList);
                    idList.addAll(this.deptMultipleOwnersMapping.getEmpIdListByDeptId(deptIdListList));
                    System.out.println("List 3 = " + idList);
                    idList.add(empId);
                    System.out.println("List 4 = " + idList);
                } else {
                    deptIdListList = new ArrayList<Long>();
                    deptIdListList.add(employee.getDeptDetails().getId());
                    idList = this.departmentChartMappingRepo.findOwnerIDList(deptIdListList);
                    System.out.println("List 5 = " + idList);
                    idList.addAll(this.departmentMappingRepository.departmentByEmployeeIdList(deptIdListList, "Active"));
                    System.out.println("List 6 = " + idList);
                    idList.addAll(this.deptMultipleOwnersMapping.getEmpIdListByDeptId(deptIdListList));
                    System.out.println("List 7 = " + idList);
                    idList.add(empId);
                    System.out.println("List 8 = " + idList);
                }
            } else {
                deptIdListList = this.departmentMappingRepository.departmentByDeptIdList(empId, "Active");
                if (!deptIdListList.isEmpty()) {
                    idList = this.departmentChartMappingRepo.findOwnerIDList(deptIdListList);
                    System.out.println("List 11 = " + idList);
                    idList.addAll(this.departmentMappingRepository.departmentByEmployeeIdList(deptIdListList, "Active"));
                    System.out.println("List 12 = " + idList);
                    idList.addAll(this.deptMultipleOwnersMapping.getEmpIdListByDeptId(deptIdListList));
                    System.out.println("List 13 = " + idList);
                    idList.add(empId);
                    System.out.println("List 14 = " + idList);
                } else {
                    List ownerList = this.deptMultipleOwnersMapping.getOwnerList(Long.valueOf(employee.getEmpId()));
                    if (!ownerList.isEmpty()) {
                        idList = this.departmentMappingRepository.departmentByEmployeeIdList(((DeptMultipleOwnersMapping)ownerList.get(0)).getDeptId().longValue(), "Active");
                        System.out.println("List 15 = " + idList);
                        if (idList.isEmpty()) {
                            idList.add(((DeptMultipleOwnersMapping)ownerList.get(0)).getEmpId());
                            System.out.println("List 16 = " + idList);
                        }
                    }
                }
            }
        } else {
            idList.add(empId);
        }
        System.out.println("Employee IDs : " + idList);
        if (idList.isEmpty()) {
            return Collections.emptyList();
        }
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            dbList = this.riskDetailsRepository.findAllByEmpIdANDDate(idList, 0, firstDate, secondDate);
        } else {
            dbList = this.riskDetailsRepository.findAllByEmpId(idList, 0);
        }
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, false);
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskDTO> findAllByRiskIDs(String riskIds) {
        List ownerList = this.riskDetailsRepository.findOwnerByRiskIds(Lists.transform(Arrays.asList(riskIds.split("\\,")), (Function)Longs.stringConverter()), 0);
        List childs = this.employeeService.getReporteeListId(ownerList);
        HashSet finalList = new HashSet();
        finalList.addAll(ownerList);
        finalList.addAll(childs);
        List dbList = this.riskDetailsRepository.findAllByEmpIds(new ArrayList(finalList), 0);
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, false);
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskCustomScoreDto> findAllRiskCustomScore() {
        List dbList = this.riskCustomScoreRepository.findAll();
        List<RiskCustomScoreDto> riskList = dbList.stream().map(dbValue -> new RiskCustomScoreDto(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskOptionsDto> findAllRiskOptions() {
        List dbList = this.riskOptionRepository.findAll();
        List<RiskOptionsDto> riskList = dbList.stream().map(dbValue -> new RiskOptionsDto(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public Boolean addRiskOptions(RiskOptionsDto riskoptions) {
        List riskOption = this.riskOptionRepository.findbyunique(riskoptions.getValue(), riskoptions.getType());
        if (riskOption.size() != 0) {
            return false;
        }
        RiskOptions risk_option = new RiskOptions(riskoptions);
        this.riskOptionRepository.save(risk_option);
        return true;
    }

    public Boolean updateRiskCustomScore(RiskCustomScoreDto riskscore) {
        RiskCustomScore riskScoreList = this.riskCustomScoreRepository.findbyunique(riskscore.getPriority());
        if (Objects.nonNull(riskScoreList)) {
            if (riskscore.getDescription() != null) {
                riskScoreList.setDescription(riskscore.getDescription());
            } else if (riskscore.getScore() != null) {
                riskScoreList.setScore(riskscore.getScore());
            }
        } else {
            return false;
        }
        this.riskCustomScoreRepository.save(riskScoreList);
        return true;
    }

    public List<RiskDTO> findAllByRiskIDList(String riskIds, String dateRange) {
        Collection dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in RiskMonitor :" + dateRange);
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            dbList = this.riskDetailsRepository.findByRiskIdsANDDateRanges(Lists.transform(Arrays.asList(riskIds.split("\\,")), (Function)Longs.stringConverter()), 0, firstDate, secondDate);
        }
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, true);
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public RiskDTO findAllByRiskID(String riskId) {
        Optional dbList = this.riskDetailsRepository.findByIdAndActive(Long.valueOf(Long.parseLong(riskId)), 0);
        if (dbList.isPresent()) {
            RiskDTO riskDTO = new RiskDTO((RiskDetails)dbList.get(), true);
            this.riskUtil.populateAddtionalDetails(riskDTO, true);
            return riskDTO;
        }
        return new RiskDTO();
    }

    public List<RiskDTO> findAllByEmpIds(long empId) {
        List childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List dbList = this.riskDetailsRepository.findAllByEmpIds(childs, 0);
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, false);
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskDTO> findAll(long empId, String pageId, String dateRange, boolean flag) {
        List dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        this.log.error((Object)("Date Range in Risk :" + dateRange));
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
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
            dbList = pageId != null && !pageId.isEmpty() ? this.riskDetailsRepository.findAllByPageANDDate(0, Long.valueOf(pageId), firstDate, secondDate) : this.riskDetailsRepository.findAllByEmpIdANDDate(Long.valueOf(empId), 0, firstDate, secondDate);
        } else {
            dbList = pageId != null && StringUtils.isNotEmpty((CharSequence)pageId) ? this.riskDetailsRepository.findAllByPageId(0, Long.valueOf(pageId)) : this.riskDetailsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        }
        String date_range = dateRange;
        List nonApprovedChanges = this.stagingChangeRepository.findPendingChangesTableName("risk_details");
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            boolean hasPendingChanges = nonApprovedChanges.stream().anyMatch(change -> change.getRecordId().equals(dbValue.getId()));
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            if (hasPendingChanges) {
                riskDTO.setDraft("Draft");
            }
            if (StringUtils.isEmpty((CharSequence)date_range)) {
                this.riskUtil.populateAddtionalDetails(riskDTO, true);
            } else if (flag) {
                this.riskUtil.populateAddtionalDetails(riskDTO, true);
            } else {
                this.riskUtil.populateAddtionalDetails(riskDTO, false);
            }
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskDTO> findAllView(String pageId, String dateRange, boolean flag) {
        Collection dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        this.log.error((Object)("Date Range in Risk :" + dateRange));
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
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
            if (pageId != null && !pageId.isEmpty()) {
                dbList = this.riskDetailsRepository.findAllByPageANDDate(0, Long.valueOf(pageId), firstDate, secondDate);
            }
        } else if (pageId != null && StringUtils.isNotEmpty((CharSequence)pageId)) {
            dbList = this.riskDetailsRepository.findAllByPageId(0, Long.valueOf(pageId));
        }
        String date_range = dateRange;
        List<RiskDTO> riskList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            if (StringUtils.isEmpty((CharSequence)date_range)) {
                this.riskUtil.populateAddtionalDetails(riskDTO, true);
            } else if (flag) {
                this.riskUtil.populateAddtionalDetails(riskDTO, true);
            } else {
                this.riskUtil.populateAddtionalDetails(riskDTO, false);
            }
            return riskDTO;
        }).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskDTO> findImpactedRiskDetails(long kpiId) {
        System.out.println("enter in kpi id");
        String kpiIdStr = String.valueOf(kpiId);
        List dbList = this.riskDetailsRepository.findAllByEmpId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")), 0);
        ObjectMapper mapper = new ObjectMapper();
        return dbList.stream().filter(riskDetails -> this.isKpiImpacted(this.parseRiskValue(riskDetails.getRiskValue(), mapper), kpiIdStr)).map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            this.riskUtil.populateAddtionalDetails(riskDTO, false);
            return riskDTO;
        }).collect(Collectors.toList());
    }

    private Map<String, Object> parseRiskValue(String riskValueJson, ObjectMapper mapper) {
        if (riskValueJson == null || riskValueJson.isEmpty()) {
            return Collections.emptyMap();
        }
        try {
            return (Map)mapper.readValue(riskValueJson, Map.class);
        }
        catch (Exception e) {
            return Collections.emptyMap();
        }
    }

    private boolean isKpiImpacted(Map<String, Object> riskValue, String kpiId) {
        Object impactKpiObj = riskValue.get("impactkpiId");
        if (impactKpiObj == null) {
            return false;
        }
        if (impactKpiObj instanceof String) {
            return Arrays.stream(((String)impactKpiObj).split(",")).map(String::trim).anyMatch(kpiId::equals);
        }
        return false;
    }

    public List<RiskDetails> findAllByPageId(long pageId) {
        return this.riskDetailsRepository.findAllByPageId(Long.valueOf(pageId));
    }

    public List<RiskDTO> findAllByDeptId(long deptId) {
        List dbList = this.riskDetailsRepository.findAllByDeptId(Long.valueOf(deptId), 0);
        List<RiskDTO> kpiList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, false);
            riskDTO.setPageName(dbValue.getPageId().getPageName());
            return riskDTO;
        }).collect(Collectors.toList());
        return kpiList;
    }

    public void saveSetDate() {
        List dbList = this.riskDetailsRepository.findAll();
        Date firstDate = null;
        Date secondDate = null;
        for (RiskDetails riskDetails : dbList) {
            RiskDTO riskDTO = new RiskDTO(riskDetails, false);
            String startDate = null;
            String endDate = null;
            if (riskDTO.getRiskValue().containsKey("dateRaised")) {
                startDate = riskDTO.getRiskValue().get("dateRaised").toString();
            }
            if (riskDTO.getRiskValue().containsKey("dateCompleted")) {
                endDate = riskDTO.getRiskValue().get("dateCompleted").toString();
            }
            if (startDate != null && endDate != null) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            riskDTO.setRaisedDate(firstDate);
            riskDTO.setCompletedDate(secondDate);
            RiskDetails card = new RiskDetails(riskDTO);
            this.riskDetailsRepository.save(card);
        }
    }

    public String getDefaultPageUrl(long pageId) {
        List riskDetails = this.riskDetailsRepository.findAllByPageId(Long.valueOf(pageId));
        if (!riskDetails.isEmpty()) {
            if (riskDetails.get(0) != null) {
                return String.join((CharSequence)"?pageId=", "dashboard/" + ((RiskDetails)riskDetails.get(0)).getCreatedBy(), String.valueOf(((RiskDetails)riskDetails.get(0)).getPageId().getId()));
            }
            return "";
        }
        return "";
    }

    public RiskEventDTO findByEventId(long id) throws JsonParseException, JsonMappingException, IOException {
        Optional event = this.riskEventRepository.findById(id);
        if (event.isPresent()) {
            RiskEventDTO eventDto = new RiskEventDTO((RiskEvent)event.get());
            return eventDto;
        }
        return new RiskEventDTO();
    }

    public Boolean deleteEvent(long id) {
        Optional event = this.riskEventRepository.findById(id);
        if (event.isPresent()) {
            this.riskEventRepository.delete(event.get());
            return true;
        }
        return false;
    }

    public List<RiskEventDTO> findByEventPageId(long id, String status) {
        Date endDate;
        Date startDate;
        List eventlist = null;
        eventlist = status != null && status.equalsIgnoreCase("DRAFT") ? this.riskEventRepository.findByPageId(Long.valueOf(id), status) : this.riskEventRepository.findByPageIdNoDraft(Long.valueOf(id));
        String datePeriod = UserThreadLocal.get((String)"DATE_PERIOD");
        System.out.println("Risk Event datePeriod: " + datePeriod);
        if (datePeriod == null || datePeriod.isEmpty()) {
            System.err.println("DATE_PERIOD is null or empty");
            return Collections.emptyList();
        }
        String[] dateRange = datePeriod.split("-");
        if (dateRange.length != 2) {
            System.err.println("DATE_PERIOD is not in the correct format");
            return Collections.emptyList();
        }
        SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
        try {
            startDate = inputFormat.parse(dateRange[0].trim());
            endDate = inputFormat.parse(dateRange[1].trim());
        }
        catch (ParseException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
        return eventlist.stream().map(dbValue -> {
            RiskEventDTO riskEventDTO = null;
            try {
                riskEventDTO = new RiskEventDTO(dbValue);
                if (dbValue.getDepartmentId() != null) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(dbValue.getDepartmentId());
                    riskEventDTO.setDepartmentName(deptData.getDeptName());
                }
            }
            catch (IOException e) {
                e.printStackTrace();
            }
            return riskEventDTO;
        }).filter(riskEventDTO -> {
            if (riskEventDTO.getIncidentDate() != null) {
                try {
                    if (riskEventDTO.getIncidentDate() != null && !riskEventDTO.getIncidentDate().isEmpty()) {
                        Date incidentDate = inputFormat.parse(riskEventDTO.getIncidentDate());
                        return !incidentDate.before(startDate) && !incidentDate.after(endDate);
                    }
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            return false;
        }).collect(Collectors.toList());
    }

    public List<RiskEventDTO> findByEventDepartmentId(long id) {
        List eventlist = this.riskEventRepository.findByDepartmentId(Long.valueOf(id));
        if (eventlist != null) {
            return eventlist.stream().map(val -> {
                try {
                    return new RiskEventDTO(val);
                }
                catch (JsonParseException e) {
                    e.printStackTrace();
                }
                catch (JsonMappingException e) {
                    e.printStackTrace();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public RiskEvent riskeventadd(RiskEventDTO riskeventdto) throws JsonProcessingException {
        RiskEvent event = new RiskEvent(riskeventdto);
        RiskEvent eventResponse = (RiskEvent)this.riskEventRepository.save(event);
        return eventResponse;
    }

    public List<RiskEventDTO> findAllByRiskEventEmpIds(long empId) {
        List childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List empName = this.employeeProfilePoRepo.findAllFirstNameLists(childs);
        List dbList = this.riskEventRepository.findAllByEmpIds(empName);
        List<RiskEventDTO> riskEventList = dbList.stream().map(dbValue -> {
            RiskEventDTO riskEventDTO = null;
            try {
                riskEventDTO = new RiskEventDTO(dbValue);
                if (dbValue.getDepartmentId() != null) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(dbValue.getDepartmentId());
                    riskEventDTO.setDepartmentName(deptData.getDeptName());
                }
            }
            catch (JsonParseException e) {
                e.printStackTrace();
            }
            catch (JsonMappingException e) {
                e.printStackTrace();
            }
            catch (IOException e) {
                e.printStackTrace();
            }
            return riskEventDTO;
        }).collect(Collectors.toList());
        return riskEventList;
    }

    public List<RiskEventDTO> findAllByRiskEventIDList(String pageIds, String dateRange) {
        List pagIds = Lists.transform(Arrays.asList(pageIds.split("\\,")), (Function)Longs.stringConverter());
        List eventList = this.riskEventRepository.findAllByPageIds(pagIds);
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date endDate;
            Date startDate;
            String[] dateRanges;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            String[] stringArray = dateRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
            if (dateRanges.length < 2) {
                return Collections.emptyList();
            }
            String firstDate = dateRanges[0].trim();
            String secondDate = dateRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                startDate = dateFormat.parse(firstDate);
                endDate = dateFormat.parse(secondDate);
            }
            catch (ParseException e) {
                e.printStackTrace();
                return Collections.emptyList();
            }
            return eventList.stream().map(dbValue -> {
                RiskEventDTO riskEventDTO = null;
                try {
                    DepartmentChartMapping deptData;
                    riskEventDTO = new RiskEventDTO(dbValue);
                    if (dbValue.getDepartmentId() != null && (deptData = this.deptMappingDetailRepository.getOne(dbValue.getDepartmentId())) != null) {
                        riskEventDTO.setDepartmentName(deptData.getDeptName());
                    }
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
                return riskEventDTO;
            }).filter(riskEventDTO -> {
                if (riskEventDTO.getIncidentDate() != null) {
                    try {
                        if (riskEventDTO.getIncidentDate() != null && !riskEventDTO.getIncidentDate().isEmpty()) {
                            Date incidentDate = dateFormat.parse(riskEventDTO.getIncidentDate());
                            return !incidentDate.before(startDate) && !incidentDate.after(endDate);
                        }
                    }
                    catch (ParseException e) {
                        e.printStackTrace();
                    }
                }
                return false;
            }).collect(Collectors.toList());
        }
        return eventList.stream().map(t -> {
            try {
                return new RiskEventDTO(t);
            }
            catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        }).collect(Collectors.toList());
    }

    public List<RiskEventDTO> findRiskEventIdListDept(String deptIds) {
        List deptIdList = Arrays.stream(deptIds.split(",")).map(Long::valueOf).collect(Collectors.toList());
        List riskEventList = this.riskEventRepository.findAllByDeptIds(deptIdList);
        ArrayList<RiskEventDTO> riskDtoList = new ArrayList<RiskEventDTO>();
        if (riskEventList != null && !riskEventList.isEmpty()) {
            riskEventList.forEach(dbValue -> {
                try {
                    Optional pagename;
                    RiskEventDTO eventDTO = new RiskEventDTO(dbValue);
                    if (dbValue.getPageId() != null && (pagename = this.pageRepository.findByIdAndActive(dbValue.getPageId())).isPresent()) {
                        eventDTO.setPageName(((PagesDetails)pagename.get()).getPageName());
                        riskDtoList.add(eventDTO);
                    }
                }
                catch (JsonParseException | JsonMappingException e) {
                    e.printStackTrace();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
        return riskDtoList;
    }

    public List<RiskDTO> findRiskStatusCountList(String pageIds, String dateRange) {
        List eventList = null;
        List pagIds = Lists.transform(Arrays.asList(pageIds.split("\\,")), (Function)Longs.stringConverter());
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            if (Objects.nonNull(dateRange = dateRange.replace("%20", ""))) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                System.out.println("startDate:: " + startDate + " :::: endDate :: " + endDate);
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            eventList = this.riskDetailsRepository.findAllByPageIdsANDDateRanges(0, pagIds, firstDate, secondDate);
        } else {
            eventList = this.riskDetailsRepository.findAllByPageIds(pagIds, 0);
        }
        return eventList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, true);
            this.riskUtil.populateAddtionalDetails(riskDTO, true);
            return riskDTO;
        }).collect(Collectors.toList());
    }

    public List<RiskDTO> findAllByRiskPageIDList(String pageIds, String dateRange) {
        Collection eventList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        this.log.error((Object)("Date Range in Risk :" + dateRange));
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            eventList = this.riskDetailsRepository.findAllByPageIdsANDDateRanges(0, Lists.transform(Arrays.asList(pageIds.split("\\,")), (Function)Longs.stringConverter()), firstDate, secondDate);
        }
        return eventList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, true);
            List riskPlanList = this.riskPlanRepository.findAllByRiskDetailsIdANDTypeFlag(Long.valueOf(riskDTO.getId()), "RiskMonitoring");
            List monitoringDetails = riskPlanList.stream().map(monitoring -> {
                RiskMonitoringDTO riskMonitorDTO = new RiskMonitoringDTO(monitoring, Boolean.valueOf(false));
                Map riskMOValue = riskMonitorDTO.getRiskMonitoringValue();
                HashMap<String, String> newMonitoring = new HashMap<String, String>();
                newMonitoring.put("mitigation", riskMOValue.getOrDefault("mitigation", "").toString());
                newMonitoring.put("person", riskMOValue.getOrDefault("person", "").toString());
                newMonitoring.put("targettime", riskMOValue.getOrDefault("targettime", "").toString());
                newMonitoring.put("changestime", riskMOValue.getOrDefault("changestime", "").toString());
                return newMonitoring;
            }).collect(Collectors.toList());
            riskDTO.getRiskValue().put("RiskMonitoring", monitoringDetails);
            this.riskUtil.populateAddtionalDetails(riskDTO, true);
            return riskDTO;
        }).collect(Collectors.toList());
    }

    public List<RiskDTO> findAllByErmRiskEmpIds(long empId) {
        List childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List dbList = this.riskDetailsRepository.findAllByEmpIds(childs, 0);
        return dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, true);
            List riskPlanList = this.riskPlanRepository.findAllByRiskDetailsIdANDTypeFlag(Long.valueOf(riskDTO.getId()), "RiskMonitoring");
            List monitoringDetails = riskPlanList.stream().map(monitoring -> {
                RiskMonitoringDTO riskMonitorDTO = new RiskMonitoringDTO(monitoring, Boolean.valueOf(false));
                Map riskMOValue = riskMonitorDTO.getRiskMonitoringValue();
                HashMap<String, String> newMonitoring = new HashMap<String, String>();
                newMonitoring.put("mitigation", riskMOValue.getOrDefault("mitigation", "").toString());
                newMonitoring.put("person", riskMOValue.getOrDefault("person", "").toString());
                newMonitoring.put("targettime", riskMOValue.getOrDefault("targettime", "").toString());
                newMonitoring.put("changestime", riskMOValue.getOrDefault("changestime", "").toString());
                return newMonitoring;
            }).collect(Collectors.toList());
            riskDTO.getRiskValue().put("riskMonitoring", monitoringDetails);
            this.riskUtil.populateAddtionalDetails(riskDTO, true);
            return riskDTO;
        }).collect(Collectors.toList());
    }

    public List<RiskEventNameCountDto> findRiskEventFreCountList(String pageIds, String dateRange, String limit) {
        List eventList = null;
        List pagIds = Lists.transform(Arrays.asList(pageIds.split("\\,")), (Function)Longs.stringConverter());
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            Object startDate = null;
            String endDate = null;
            String[] dataRanges = null;
            dateRange = dateRange.replace("%20", "");
            if (Objects.nonNull(dateRange = dateRange.replace("%2520", ""))) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                startDate = dataRanges[0].trim();
                endDate = dataRanges[1].trim();
                System.out.println("startDate:: " + (String)startDate + " :::: endDate :: " + endDate);
            }
            if (limit.equalsIgnoreCase("All")) {
                eventList = this.riskEventRepository.findAllByPageIdsANDDateRanges(pagIds, startDate, endDate);
            } else {
                int limits = Integer.parseInt(limit);
                PageRequest pageable = PageRequest.of((int)0, (int)limits, (Sort)Sort.by((Sort.Direction)Sort.Direction.ASC, (String[])new String[]{"id"}));
                Page resultPage = this.riskEventRepository.findAllByPageIdsANDDateRanges(pagIds, this.getFirstDateTime(firstDate), this.getSecondDateTime(secondDate), (Pageable)pageable);
                eventList = resultPage.getContent();
            }
        } else if (limit.equalsIgnoreCase("All")) {
            eventList = this.riskEventRepository.findAllByPageIds(pagIds);
        } else {
            int limits = Integer.parseInt(limit);
            PageRequest pageable = PageRequest.of((int)0, (int)limits, (Sort)Sort.by((Sort.Direction)Sort.Direction.ASC, (String[])new String[]{"id"}));
            eventList = this.riskEventRepository.findAllByPageIdswithlimit(pagIds, (Pageable)pageable).getContent();
        }
        List riskEveDto = eventList.stream().map(dbValue -> {
            RiskEventDTO riskEventDTO = null;
            try {
                riskEventDTO = new RiskEventDTO(dbValue);
            }
            catch (JsonParseException e) {
                e.printStackTrace();
            }
            catch (JsonMappingException e) {
                e.printStackTrace();
            }
            catch (IOException e) {
                e.printStackTrace();
            }
            return riskEventDTO;
        }).collect(Collectors.toList());
        HashMap<String, Map> deptNameCounts = new HashMap<String, Map>();
        for (RiskEventDTO record : riskEveDto) {
            String name = record.getIncident();
            System.out.println("name :: " + name);
            if (record.getIncident().trim().isEmpty()) continue;
            Map nameCounts = deptNameCounts.getOrDefault(record.getDepartmentId().toString(), new HashMap());
            nameCounts.put(name, nameCounts.getOrDefault(name, 0) + 1);
            deptNameCounts.put(record.getDepartmentId().toString(), nameCounts);
        }
        List<RiskEventNameCountDto> nameCountDtos = deptNameCounts.entrySet().stream().map(entry -> {
            RiskEventNameCountDto dto = new RiskEventNameCountDto();
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf((String)entry.getKey()));
            dto.setId(Long.valueOf((String)entry.getKey()));
            dto.setDepartmentName(deptData.getDeptName());
            List frequencyCounts = ((Map)entry.getValue()).entrySet().stream().map(nameEntry -> {
                RiskEventFrequencyCountDto countDto = new RiskEventFrequencyCountDto();
                countDto.setName((String)nameEntry.getKey());
                countDto.setCount(Long.valueOf(((Integer)nameEntry.getValue()).intValue()));
                countDto.setId(Long.valueOf((String)entry.getKey()));
                countDto.setDepartmentName(deptData.getDeptName());
                return countDto;
            }).collect(Collectors.toList());
            if (limit.equalsIgnoreCase("All")) {
                dto.setIncidentCounts(frequencyCounts);
            } else {
                int limits = Integer.parseInt(limit);
                List topLevel = frequencyCounts.stream().sorted(Comparator.comparingLong(RiskEventFrequencyCountDto::getCount).reversed()).limit(limits).collect(Collectors.toList());
                dto.setIncidentCounts(topLevel);
            }
            return dto;
        }).collect(Collectors.toList());
        return nameCountDtos;
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

    public List<RiskDTO> findAllRiskDashboardBYDeptId(long deptId) {
        List dbList = this.riskDetailsRepository.findAllByDeptId(Long.valueOf(deptId), 0);
        List<RiskDTO> kpiList = dbList.stream().map(dbValue -> {
            RiskDTO riskDTO = new RiskDTO(dbValue, true);
            riskDTO.setPageName(dbValue.getPageId().getPageName());
            return riskDTO;
        }).collect(Collectors.toList());
        return kpiList;
    }

    public RiskDashBoardResponseDTO buildRiskDashboard(List<RiskDTO> riskList) {
        HashMap<String, Integer> categoryCount = new HashMap<String, Integer>();
        HashMap<String, Integer> statusCount = new HashMap<String, Integer>();
        HashMap likelihoodCount = new HashMap();
        HashMap<String, Integer> treatmentCount = new HashMap<String, Integer>();
        Long tottreatment = 0L;
        Long totMonitoring = 0L;
        Long totplans = 0L;
        for (RiskDTO risk : riskList) {
            if (risk == null || risk.getRiskValue() == null) continue;
            String category = (String)risk.getRiskValue().get("riskcategory");
            category = category == null || category.trim().isEmpty() ? "UNKNOWN" : category;
            categoryCount.put(category, categoryCount.getOrDefault(category, 0) + 1);
            String status = risk.getRiskValue().get("riskStatus").toString();
            status = status == null || status.trim().isEmpty() ? "UNKNOWN" : status;
            statusCount.put(status, statusCount.getOrDefault(status, 0) + 1);
            if (risk.getRiskTreatmentList() != null) {
                System.out.println("enter in treeatment is non null");
                for (RiskPlanDTO treatment : risk.getRiskTreatmentList()) {
                    System.out.println("treatment :: " + treatment);
                    if (treatment == null || treatment.getRiskPlanValue() == null) continue;
                    String action = (String)treatment.getRiskPlanValue().get("action");
                    System.out.println("action :: " + action);
                    action = action == null || action.trim().isEmpty() ? "UNKNOWN" : action;
                    treatmentCount.put(action, treatmentCount.getOrDefault(action, 0) + 1);
                    System.out.println("treatmentCount :: " + treatmentCount);
                }
            }
            tottreatment = tottreatment + (long)(risk.getRiskTreatmentList() != null ? risk.getRiskTreatmentList().size() : 0);
            totMonitoring = totMonitoring + (long)(risk.getRiskMonitoringList() != null ? risk.getRiskMonitoringList().size() : 0);
            totplans = totplans + (long)(risk.getRiskPlanList() != null ? risk.getRiskPlanList().size() : 0);
        }
        RiskDashBoardResponseDTO response = new RiskDashBoardResponseDTO();
        response.setTotalRisk(riskList != null ? (long)riskList.size() : 0L);
        response.setTotalMonitoring(totMonitoring.longValue());
        response.setTotalTreatment(tottreatment.longValue());
        response.setTotalPlan(totplans.longValue());
        response.setMessage("Risk Dashboard Data");
        response.setRiskDTO(riskList);
        response.setCategoryCount(categoryCount);
        response.setStatusCount(statusCount);
        response.setTreatmentSrategyCount(treatmentCount);
        return response;
    }
}

