/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.Initiatives
 *  com.estrat.service.db.bean.po.InitiativesBudget
 *  com.estrat.service.db.bean.po.InitiativesTracker
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.Objectives
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.ScoreCardDetails
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.ActivitiesMapRepository
 *  com.estrat.service.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.service.db.dao.InitiativeDAO
 *  com.estrat.service.db.dao.InitiativesRepository
 *  com.estrat.service.db.dao.PageRepository
 *  com.estrat.service.db.dao.ScoreCardDetailsRepository
 *  com.estrat.service.db.dao.SubInitiativesMapRepository
 *  com.estrat.service.db.dto.ActivitiesDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeBudgetDTO
 *  com.estrat.service.db.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.InitiativeTaskDto
 *  com.estrat.service.db.dto.InitiativesDTO
 *  com.estrat.service.db.dto.InitiativesTrackerDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.dto.ScoreCardDetailsDTO
 *  com.estrat.service.db.dto.SubActivitiesDTO
 *  com.estrat.service.db.dto.SubInitiativesDTO
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.repository.InitiativeBudgetRepository
 *  com.estrat.service.db.repository.InitiativeTrackerRepository
 *  com.estrat.service.db.resource.util.CacheUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ActivitiesService
 *  com.estrat.service.db.service.CommentService
 *  com.estrat.service.db.service.DepartmentDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.InitiativeAttachmentService
 *  com.estrat.service.db.service.InitiativeTaskService
 *  com.estrat.service.db.service.InitiativesService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.ObjectivesService
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.DepartmentDetails;
import com.estrat.service.db.bean.po.Initiatives;
import com.estrat.service.db.bean.po.InitiativesBudget;
import com.estrat.service.db.bean.po.InitiativesTracker;
import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.Objectives;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.bean.po.ScoreCardDetails;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.ActivitiesMapRepository;
import com.estrat.service.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.service.db.dao.InitiativeDAO;
import com.estrat.service.db.dao.InitiativesRepository;
import com.estrat.service.db.dao.PageRepository;
import com.estrat.service.db.dao.ScoreCardDetailsRepository;
import com.estrat.service.db.dao.SubInitiativesMapRepository;
import com.estrat.service.db.dto.ActivitiesDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeBudgetDTO;
import com.estrat.service.db.dto.InitiativeDashBoardResponseDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.InitiativeTaskDto;
import com.estrat.service.db.dto.InitiativesDTO;
import com.estrat.service.db.dto.InitiativesTrackerDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.estrat.service.db.dto.ScoreCardDetailsDTO;
import com.estrat.service.db.dto.SubActivitiesDTO;
import com.estrat.service.db.dto.SubInitiativesDTO;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import com.estrat.service.db.repository.InitiativeBudgetRepository;
import com.estrat.service.db.repository.InitiativeTrackerRepository;
import com.estrat.service.db.resource.util.CacheUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ActivitiesService;
import com.estrat.service.db.service.CommentService;
import com.estrat.service.db.service.DepartmentDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.InitiativeAttachmentService;
import com.estrat.service.db.service.InitiativeTaskService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.ObjectivesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
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
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Exception performing whole class analysis ignored.
 */
@Service
public class InitiativesService {
    @Autowired
    protected InitiativesRepository initiativesRepository;
    @Autowired
    protected InitiativeTrackerRepository initiativeTrackerRepository;
    @Autowired
    private InitiativeDAO initiativeDAO;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private EmployeeDepartmentMappingRepository departmentMappingRepository;
    @Autowired
    private PageRepository pageRepository;
    @Autowired
    private DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    private InitiativeBudgetRepository initiativeBudgetRepository;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    CommentService commentService;
    @Autowired
    private ObjectivesService objectivesService;
    @Autowired
    private ScoreCardDetailsRepository scoreCardDetailsRepository;
    @Autowired
    protected InitiativeAttachmentService initiativeAttachmentService;
    @Autowired
    private InitiativeTaskService initiativeTaskService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private ActivitiesMapRepository activitiesMapRepository;
    @Autowired
    private SubInitiativesMapRepository subInitiativesMapRepository;
    private Logger log = Logger.getLogger(InitiativesService.class);

    public Optional<Initiatives> findById(long id) {
        return this.initiativesRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public void delete(Initiatives initiatives) {
        this.initiativesRepository.delete((Object)initiatives);
    }

    public InitiativeResponseDTO save(Initiatives initiatives) {
        if (Objects.isNull(initiatives.getInitiativeId())) {
            this.createInitiativeId(initiatives);
        }
        Initiatives initResponse = (Initiatives)this.initiativesRepository.save(initiatives);
        InitiativeResponseDTO responseDTO = new InitiativeResponseDTO();
        responseDTO.setFlag(true);
        InitiativesDTO initiativesDTO = new InitiativesDTO(initResponse, false);
        if (initiativesDTO.getInitiativeValue().get("progressval") != null && "manual".equals(initiativesDTO.getInitiativeValue().get("statusType"))) {
            LocalDate now = LocalDate.now();
            if (initiatives.getEndDatePeriod() != null) {
                try {
                    long epochMilli = Long.parseLong(initiatives.getEndDatePeriod());
                    now = Instant.ofEpochMilli(epochMilli).atZone(ZoneId.systemDefault()).toLocalDate();
                }
                catch (Exception ex) {
                    this.log.error((Object)ex.getMessage());
                }
            }
            LocalDateTime startOfMonth = LocalDateTime.of(now.withDayOfMonth(1), LocalTime.MIN);
            LocalDateTime endOfMonth = LocalDateTime.of(now.withDayOfMonth(now.lengthOfMonth()), LocalTime.MAX).withNano(0);
            List initiativesTracker_list = this.initiativeTrackerRepository.findByInitiativeIdbtwDate(String.valueOf(initiativesDTO.getId()), initiativesDTO.getInitiativeId(), Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), startOfMonth, endOfMonth);
            if (initiativesTracker_list != null && initiativesTracker_list.size() > 0) {
                InitiativesTracker initiativesTracker = (InitiativesTracker)initiativesTracker_list.get(0);
                initiativesTracker.setActual(String.valueOf(initiativesDTO.getInitiativeValue().get("progressval")));
                this.initiativeTrackerRepository.save(initiativesTracker);
            } else {
                InitiativesTracker initiativesTracker = new InitiativesTracker();
                initiativesTracker.setActual(String.valueOf(initiativesDTO.getInitiativeValue().get("progressval")));
                initiativesTracker.setTarget(String.valueOf(0));
                initiativesTracker.setEnd_date(endOfMonth);
                if (initiativesDTO.getInitiativeId() != null && StringUtils.isNotEmpty((CharSequence)initiativesDTO.getInitiativeId())) {
                    initiativesTracker.setInitiative_id(String.valueOf(initiativesDTO.getInitiativeId()));
                } else {
                    initiativesTracker.setInitiative_id(String.valueOf(initiativesDTO.getId()));
                }
                initiativesTracker.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
                initiativesTracker.setCreated_dt(LocalDateTime.now());
                this.initiativeTrackerRepository.save(initiativesTracker);
            }
        }
        responseDTO.setInitiativesDTO(initiativesDTO);
        return responseDTO;
    }

    public Map<String, Long> saveTracker(List<InitiativesTrackerDTO> initiatives) {
        ArrayList<String> initiativeId = new ArrayList<String>();
        HashMap<String, Long> response = new HashMap<String, Long>();
        ArrayList<LocalDateTime> endDateList = new ArrayList<LocalDateTime>();
        for (InitiativesTrackerDTO initiativesTrackerDTO : initiatives) {
            LocalDateTime endDateWithoutNanos = initiativesTrackerDTO.getEnd_date().withNano(0);
            initiativeId.add(initiativesTrackerDTO.getInitiativesId());
            endDateList.add(endDateWithoutNanos);
        }
        List initTrackerResponse = this.initiativeTrackerRepository.findByListInitiativeIdwDate(initiativeId, endDateList, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        HashMap<String, InitiativesTracker> initiativetrackermap = new HashMap<String, InitiativesTracker>();
        if (initTrackerResponse != null && initTrackerResponse.size() > 0) {
            for (InitiativesTracker initiativesTracker : initTrackerResponse) {
                initiativetrackermap.put(initiativesTracker.getInitiative_id() + "|" + initiativesTracker.getEnd_date(), initiativesTracker);
            }
        }
        Long updatedcount = 0L;
        Long insertedcount = 0L;
        Long failedcount = 0L;
        Long successcount = 0L;
        for (InitiativesTrackerDTO initiativesTrackerDTO : initiatives) {
            Long l;
            Long l2;
            InitiativesTracker init;
            LocalDateTime endDateWithoutNanos = initiativesTrackerDTO.getEnd_date().withNano(0);
            if (initiativetrackermap.get(initiativesTrackerDTO.getInitiativesId() + "|" + endDateWithoutNanos) != null) {
                init = (InitiativesTracker)initiativetrackermap.get(initiativesTrackerDTO.getInitiativesId() + "|" + endDateWithoutNanos);
                init.setActual(initiativesTrackerDTO.getActual());
                init.setTarget(initiativesTrackerDTO.getTarget());
                init.setEnd_date(endDateWithoutNanos);
                init.setUpdated_dt(LocalDateTime.now());
                try {
                    this.initiativeTrackerRepository.save(init);
                    Long l3 = updatedcount;
                    l2 = updatedcount = Long.valueOf(updatedcount + 1L);
                }
                catch (Exception ex) {
                    this.log.error((Object)ex.getMessage());
                    l2 = failedcount;
                    l = failedcount = Long.valueOf(failedcount + 1L);
                }
                continue;
            }
            initiativesTrackerDTO.setEnd_date(endDateWithoutNanos);
            init = new InitiativesTracker(initiativesTrackerDTO);
            init.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
            try {
                this.initiativeTrackerRepository.save(init);
                Long ex = insertedcount;
                l2 = insertedcount = Long.valueOf(insertedcount + 1L);
            }
            catch (Exception ex) {
                this.log.error((Object)ex.getMessage());
                l2 = failedcount;
                l = failedcount = Long.valueOf(failedcount + 1L);
            }
        }
        successcount = updatedcount + insertedcount;
        response.put("no_of_processed", successcount);
        response.put("no_of_failed", failedcount);
        response.put("no_of_updated", updatedcount);
        response.put("no_of_created", insertedcount);
        return response;
    }

    public Map<String, Long> saveBudget(List<InitiativeBudgetDTO> initiatives) {
        ArrayList<String> initiativeId = new ArrayList<String>();
        HashMap<String, Long> response = new HashMap<String, Long>();
        ArrayList<Date> endDateList = new ArrayList<Date>();
        for (InitiativeBudgetDTO initiativeBudgetDTO : initiatives) {
            initiativeId.add(initiativeBudgetDTO.getInitiativeId());
            endDateList.add(initiativeBudgetDTO.getEndDate());
        }
        List initiativeBudgetResponse = this.initiativeBudgetRepository.findByListInitiativeIdwDate(initiativeId, endDateList, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
        HashMap<String, InitiativesBudget> initiativeBudgetmap = new HashMap<String, InitiativesBudget>();
        if (initiativeBudgetResponse != null && initiativeBudgetResponse.size() > 0) {
            for (InitiativesBudget initiativeBudget : initiativeBudgetResponse) {
                initiativeBudgetmap.put(initiativeBudget.getInitiativeId() + "|" + this.getUtilDate(initiativeBudget.getEndDate()), initiativeBudget);
            }
        }
        Long updatedcount = 0L;
        Long insertedcount = 0L;
        Long failedcount = 0L;
        Long successcount = 0L;
        for (InitiativeBudgetDTO initiativesbudgetDTO : initiatives) {
            Long l;
            Long l2;
            InitiativesBudget init;
            if (initiativeBudgetmap.get(initiativesbudgetDTO.getInitiativeId() + "|" + this.getUtilDate(initiativesbudgetDTO.getEndDate())) != null) {
                init = (InitiativesBudget)initiativeBudgetmap.get(initiativesbudgetDTO.getInitiativeId() + "|" + this.getUtilDate(initiativesbudgetDTO.getEndDate()));
                init.setTotalAssetBudget(initiativesbudgetDTO.getTotalAssetBudget());
                init.setTotalBudget(initiativesbudgetDTO.getTotalBudget());
                init.setTotalLiabilitiesBudget(initiativesbudgetDTO.getTotalLiabilitiesBudget());
                init.setTotalRealizationAsset(initiativesbudgetDTO.getTotalRealizationAsset());
                init.setTotalRealizationBudget(initiativesbudgetDTO.getTotalRealizationBudget());
                init.setTotalRealizationLiabilities(initiativesbudgetDTO.getTotalRealizationLiabilities());
                try {
                    this.initiativeBudgetRepository.save(init);
                    Long l3 = updatedcount;
                    l2 = updatedcount = Long.valueOf(updatedcount + 1L);
                }
                catch (Exception ex) {
                    this.log.error((Object)ex.getMessage());
                    l2 = failedcount;
                    l = failedcount = Long.valueOf(failedcount + 1L);
                }
                continue;
            }
            init = new InitiativesBudget(initiativesbudgetDTO);
            init.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
            try {
                this.initiativeBudgetRepository.save(init);
                Long ex = insertedcount;
                l2 = insertedcount = Long.valueOf(insertedcount + 1L);
            }
            catch (Exception ex) {
                this.log.error((Object)ex.getMessage());
                l2 = failedcount;
                l = failedcount = Long.valueOf(failedcount + 1L);
            }
        }
        successcount = updatedcount + insertedcount;
        response.put("no_of_processed", successcount);
        response.put("no_of_failed", failedcount);
        response.put("no_of_updated", updatedcount);
        response.put("no_of_created", insertedcount);
        return response;
    }

    public String getUtilDate(Date endDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        return dateFormat.format(endDate);
    }

    public List<InitiativesDTO> checkinitiativeListByEmpId(long empId, boolean loadFlag) {
        List employees = this.employeeService.getAllReporteeList(empId);
        List empList = employees.stream().map(val -> val.getEmpId()).collect(Collectors.toList());
        List dbList = this.initiativesRepository.findAllByEmpIds(empList, 0);
        return dbList.stream().map(dbValue -> new InitiativesDTO(dbValue, false)).collect(Collectors.toList());
    }

    public List<InitiativesDTO> checkinitiativeListByDeptId() {
        List deptDetails = this.departmentDetailsService.childList();
        List deptList = deptDetails.stream().map(val -> val.getId()).collect(Collectors.toList());
        List dbList = this.initiativesRepository.findAllBydeptIds(deptList, 0);
        return dbList.stream().map(dbValue -> new InitiativesDTO(dbValue, true)).collect(Collectors.toList());
    }

    public List<InitiativesDTO> findAll(long empId, boolean flag, String pageId, String dateRange) {
        List dbList = null;
        Object cacheKey = null;
        List kpiList = null;
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
        dbList = StringUtils.isNotEmpty((CharSequence)dateRange) ? (StringUtils.isNotEmpty((CharSequence)pageId) ? this.initiativesRepository.findAllByPageAndStartAndEndDate(0, Long.valueOf(pageId).longValue(), firstDate, secondDate) : this.initiativesRepository.findAllByEmpIdAndStartAndEndDate(Long.valueOf(empId), 0, firstDate, secondDate)) : this.initiativesRepository.findAllByEmpId(Long.valueOf(empId), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, flag);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                    this.populateTotalBudgetAndActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public List<InitiativesDTO> findAll(long empId, boolean flag, String pageId) {
        List dbList = null;
        List kpiList = null;
        dbList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.initiativesRepository.findAllByPage(0, Long.valueOf(pageId).longValue()) : this.initiativesRepository.findAllByEmpId(Long.valueOf(empId), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, flag);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                    this.populateTotalBudgetAndActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public List<InitiativesDTO> initiativesListByEmpId(long empId) {
        List<Object> kpiList = new ArrayList<InitiativesDTO>();
        List dbList = this.initiativesRepository.findAllByEmpId(Long.valueOf(empId), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, false);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public List<InitiativesDTO> initiativesListByDeptId(long deptId) throws ParseException {
        List initiativesDTOS = null;
        ArrayList<InitiativesDTO> initiatives_out = new ArrayList<InitiativesDTO>();
        List dbList = this.initiativesRepository.findAllByDeptId(Long.valueOf(deptId), 0);
        if (!dbList.isEmpty() && dbList != null) {
            initiativesDTOS = dbList.stream().map(dbValue -> new InitiativesDTO(dbValue, false)).collect(Collectors.toList());
        }
        for (InitiativesDTO initdto : initiativesDTOS) {
            try {
                this.populateActual(initdto);
            }
            catch (ParseException e) {
                e.printStackTrace();
            }
            InitiativesDTO initdto_temp = this.populateBudget(initdto);
            initiatives_out.add(initdto_temp);
        }
        return initiatives_out;
    }

    public List<Initiatives> findAllByPageId(long pageId) {
        return this.initiativesRepository.findAllByPageId(pageId);
    }

    public List<InitiativesDTO> findImpactedInitiatives(long kpiId) {
        System.out.println("enter in initive id");
        String kpiIdStr = String.valueOf(kpiId);
        List dbList = this.initiativesRepository.findAllByEmpId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")), 0);
        ObjectMapper mapper = new ObjectMapper();
        return dbList.stream().filter(initiative -> this.isKpiImpacted(this.parseRiskValue(initiative.getInitiativeValue(), mapper), kpiIdStr)).map(dbValue -> {
            InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, false);
            return initiativesDTO;
        }).collect(Collectors.toList());
    }

    private Map<String, Object> parseRiskValue(String initiativeValueJson, ObjectMapper mapper) {
        if (initiativeValueJson == null || initiativeValueJson.isEmpty()) {
            return Collections.emptyMap();
        }
        try {
            return (Map)mapper.readValue(initiativeValueJson, Map.class);
        }
        catch (Exception e) {
            return Collections.emptyMap();
        }
    }

    private boolean isKpiImpacted(Map<String, Object> riskValue, String kpiId) {
        Object impactKpiObj = riskValue.get("impactId");
        if (!(impactKpiObj instanceof List)) {
            return false;
        }
        List impactIds = (List)impactKpiObj;
        return impactIds.stream().map(Object::toString).anyMatch(kpiId::equals);
    }

    private void createInitiativeId(Initiatives initiatives) {
        if (initiatives.getId() == 0L) {
            String defaultStart = "1";
            String initiativeName = new InitiativesDTO(initiatives, false).getInitiativeValue().get("name").toString();
            String initiativePrefix = initiativeName.substring(0, 1);
            String initiativeId = String.join((CharSequence)"", initiativePrefix, defaultStart);
            if (this.initiativeDAO.checkIdExist(Long.valueOf(initiatives.getCreatedBy()), initiativeId)) {
                String maxId = this.initiativeDAO.getMaxId(Long.valueOf(initiatives.getCreatedBy()), initiativePrefix);
                initiatives.setInitiativeId(String.join((CharSequence)"", initiativePrefix, maxId));
                initiatives.setInitiativeIdSeq(Long.valueOf(maxId));
            } else {
                initiatives.setInitiativeId(initiativeId);
                initiatives.setInitiativeIdSeq(Long.valueOf(defaultStart));
            }
        }
    }

    public void populateActual(InitiativesDTO initiativesDTO) throws ParseException {
        if (Objects.nonNull(initiativesDTO.getId())) {
            String datePeriod = UserThreadLocal.get((String)"DATE_PERIOD");
            String[] daterange = datePeriod.split("-");
            SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
            Date startDate = inputFormat.parse(daterange[0]);
            Date endDate = inputFormat.parse(daterange[1]);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);
            calendar.set(11, 23);
            calendar.set(12, 59);
            calendar.set(13, 59);
            calendar.set(14, 999);
            endDate = calendar.getTime();
            if (initiativesDTO.getInitiativeId() != null) {
                List initiativesTracker_list = this.initiativeTrackerRepository.findByInitiativeIdwDate(String.valueOf(initiativesDTO.getId()), initiativesDTO.getInitiativeId(), endDate, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
                if (initiativesTracker_list != null && initiativesTracker_list.size() > 0) {
                    InitiativesTracker initiativesTracker = (InitiativesTracker)initiativesTracker_list.get(0);
                    initiativesDTO.getInitiativeValue().put("actualValue", initiativesTracker.getActual());
                    initiativesDTO.getInitiativeValue().put("progressval", initiativesTracker.getActual());
                    initiativesDTO.getInitiativeValue().put("targetValue", initiativesTracker.getTarget());
                    if (initiativesDTO.getInitiativeValue().get("actualValue") != null && !initiativesDTO.getInitiativeValue().get("actualValue").equals("0")) {
                        initiativesDTO.getInitiativeValue().put("blank", false);
                    } else {
                        initiativesDTO.getInitiativeValue().put("blank", true);
                    }
                } else {
                    initiativesDTO.getInitiativeValue().put("blank", true);
                }
            }
            initiativesDTO.setCommentsList(this.commentService.findAllByInitiativesId(Long.valueOf(initiativesDTO.getId())));
            List subInit = initiativesDTO.getSubInitiativeList();
            if (subInit != null) {
                for (SubInitiativesDTO initDto : subInit) {
                    initDto.setActivitiesList(this.activitiesService.findAllBySubInitiativesId(Long.valueOf(initDto.getId())));
                }
            }
            initiativesDTO.setAttachmentList(this.initiativeAttachmentService.findAll(initiativesDTO.getId()));
            initiativesDTO.setTaskList(this.initiativeTaskService.findAllByInitiativesId(Long.valueOf(initiativesDTO.getId())));
        }
    }

    public void populateActual(InitiativesDTO initiativesDTO, String dateRange) throws ParseException {
        if (Objects.nonNull(initiativesDTO.getId())) {
            String datePeriod = dateRange;
            datePeriod = datePeriod.replace("%20", "");
            String[] daterange = datePeriod.split("-");
            SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
            Date startDate = inputFormat.parse(daterange[0].trim());
            Date endDate = inputFormat.parse(daterange[1].trim());
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(endDate);
            calendar.set(11, 23);
            calendar.set(12, 59);
            calendar.set(13, 59);
            calendar.set(14, 999);
            endDate = calendar.getTime();
            if (initiativesDTO.getInitiativeId() != null) {
                List initiativesTracker_list = this.initiativeTrackerRepository.findByInitiativeIdwDate(String.valueOf(initiativesDTO.getId()), initiativesDTO.getInitiativeId(), endDate, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
                if (initiativesTracker_list != null && initiativesTracker_list.size() > 0) {
                    InitiativesTracker initiativesTracker = (InitiativesTracker)initiativesTracker_list.get(0);
                    initiativesDTO.getInitiativeValue().put("actualValue", initiativesTracker.getActual());
                    initiativesDTO.getInitiativeValue().put("progressval", initiativesTracker.getActual());
                    initiativesDTO.getInitiativeValue().put("targetValue", initiativesTracker.getTarget());
                    initiativesDTO.getInitiativeValue().put("blank", false);
                } else {
                    initiativesDTO.getInitiativeValue().put("blank", true);
                }
            }
            initiativesDTO.setCommentsList(this.commentService.findAllByInitiativesId(Long.valueOf(initiativesDTO.getId())));
            initiativesDTO.setAttachmentList(this.initiativeAttachmentService.findAll(initiativesDTO.getId()));
            initiativesDTO.setTaskList(this.initiativeTaskService.findAllByInitiativesId(Long.valueOf(initiativesDTO.getId())));
            List subInit = initiativesDTO.getSubInitiativeList();
            for (SubInitiativesDTO initDto : subInit) {
                initDto.setActivitiesList(this.activitiesService.findAllBySubInitiativesId(Long.valueOf(initDto.getId())));
            }
        }
    }

    public void populateTotalBudgetAndActual(InitiativesDTO initiativesDTO) throws ParseException {
        if (Objects.nonNull(initiativesDTO.getId())) {
            Double totalBudget = 0.0;
            Double totalActual = 0.0;
            List activityList = initiativesDTO.getActivitiesList();
            if (activityList != null) {
                for (ActivitiesDTO activitiesDTO : activityList) {
                    List subActivityList = activitiesDTO.getSubActivityList();
                    if (subActivityList != null) {
                        for (SubActivitiesDTO subActivitiesDTO : subActivityList) {
                            if (subActivitiesDTO.getActivitiesValue().containsKey("budget") && subActivitiesDTO.getActivitiesValue().get("budget").toString() != null && !subActivitiesDTO.getActivitiesValue().get("budget").toString().isEmpty()) {
                                totalBudget = totalBudget + this.parseBudget(subActivitiesDTO.getActivitiesValue().get("budget").toString());
                            }
                            if (!subActivitiesDTO.getActivitiesValue().containsKey("actual") || subActivitiesDTO.getActivitiesValue().get("actual").toString() == null || subActivitiesDTO.getActivitiesValue().get("actual").toString().isEmpty()) continue;
                            totalActual = totalActual + this.parseBudget(subActivitiesDTO.getActivitiesValue().get("actual").toString());
                        }
                    }
                    if (activitiesDTO.getActivitiesValue().containsKey("budget") && activitiesDTO.getActivitiesValue().get("budget").toString() != null && !activitiesDTO.getActivitiesValue().get("budget").toString().isEmpty()) {
                        totalBudget = totalBudget + this.parseBudget(activitiesDTO.getActivitiesValue().get("budget").toString());
                    }
                    if (!activitiesDTO.getActivitiesValue().containsKey("actual") || activitiesDTO.getActivitiesValue().get("actual").toString() == null || activitiesDTO.getActivitiesValue().get("actual").toString().isEmpty()) continue;
                    totalActual = totalActual + this.parseBudget(activitiesDTO.getActivitiesValue().get("actual").toString());
                }
            }
            initiativesDTO.getInitiativeValue().put("totalBudget", totalBudget);
            initiativesDTO.getInitiativeValue().put("totalActual", totalActual);
        }
    }

    public double parseBudget(String budgetStr) {
        return Double.parseDouble(budgetStr.replace(",", "").replaceFirst("\\.", "#").replaceAll("\\.", "").replace("#", "."));
    }

    public InitiativesDTO populateBudget(InitiativesDTO initiativesDTO) throws ParseException {
        if (Objects.nonNull(initiativesDTO.getId())) {
            List initiativesBudget_list;
            String datePeriod = UserThreadLocal.get((String)"DATE_PERIOD");
            String[] daterange = datePeriod.split("-");
            SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
            Date startDate = inputFormat.parse(daterange[0]);
            Date endDate = inputFormat.parse(daterange[1]);
            if (initiativesDTO.getInitiativeId() != null && (initiativesBudget_list = this.initiativeBudgetRepository.findByInitiativeIdwDate(String.valueOf(initiativesDTO.getInitiativeId()), endDate, Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")))) != null && initiativesBudget_list.size() > 0) {
                BigDecimal total_asset_budget = new BigDecimal(0);
                BigDecimal total_realization_asset = new BigDecimal(0);
                BigDecimal total_liabilities_budget = new BigDecimal(0);
                BigDecimal total_realization_liabilities = new BigDecimal(0);
                BigDecimal total_budget = new BigDecimal(0);
                BigDecimal total_realization_budget = new BigDecimal(0);
                for (InitiativesBudget initiativesBudget : initiativesBudget_list) {
                    if (initiativesBudget.getTotalAssetBudget() != null) {
                        total_asset_budget = initiativesBudget.getTotalAssetBudget().add(total_asset_budget);
                    }
                    if (initiativesBudget.getTotalRealizationAsset() != null) {
                        total_realization_asset = initiativesBudget.getTotalRealizationAsset().add(total_realization_asset);
                    }
                    if (initiativesBudget.getTotalBudget() != null) {
                        total_budget = initiativesBudget.getTotalBudget().add(total_budget);
                    }
                    if (initiativesBudget.getTotalRealizationBudget() != null) {
                        total_realization_budget = initiativesBudget.getTotalRealizationBudget().add(total_realization_budget);
                    }
                    if (initiativesBudget.getTotalLiabilitiesBudget() != null) {
                        total_liabilities_budget = initiativesBudget.getTotalLiabilitiesBudget().add(total_liabilities_budget);
                    }
                    if (initiativesBudget.getTotalRealizationLiabilities() == null) continue;
                    total_realization_liabilities = initiativesBudget.getTotalRealizationLiabilities().add(total_realization_liabilities);
                }
                BigDecimal asset_real_percent = total_asset_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_asset.divide(total_asset_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                BigDecimal budget_real_percent = total_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_budget.divide(total_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                BigDecimal liabilities_real_percent = total_liabilities_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_liabilities.divide(total_liabilities_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                InitiativeBudgetDTO initiativeBudgetDTO = new InitiativeBudgetDTO();
                initiativeBudgetDTO.setTotalAssetBudget(total_asset_budget);
                initiativeBudgetDTO.setTotalAssetBudgetRealization_percent(asset_real_percent);
                initiativeBudgetDTO.setTotalBudget(total_budget);
                initiativeBudgetDTO.setTotalBudgetRealization_percent(budget_real_percent);
                initiativeBudgetDTO.setTotalLiabilitiesBudget(total_liabilities_budget);
                initiativeBudgetDTO.setTotalLiabilitiesRealization_percent(liabilities_real_percent);
                initiativeBudgetDTO.setTotalRealizationAsset(total_realization_asset);
                initiativeBudgetDTO.setTotalRealizationBudget(total_realization_budget);
                initiativeBudgetDTO.setTotalRealizationLiabilities(total_realization_liabilities);
                initiativesDTO.setInitiativeBudget(initiativeBudgetDTO);
            }
        }
        return initiativesDTO;
    }

    public void populateImpactDesc(InitiativesDTO initiativesDTO) {
        Optional objOptional;
        Optional scoreCard;
        if (Objects.nonNull(initiativesDTO.getImpactId())) {
            Optional kpidto = this.kpiService.findById(initiativesDTO.getImpactId().longValue());
            if (kpidto.isPresent()) {
                initiativesDTO.getInitiativeValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
            }
            initiativesDTO.setPageName(((PagesDetails)this.pageRepository.findById(initiativesDTO.getPageId()).get()).getPageName());
            if (initiativesDTO.getDepartmentId() != null) {
                initiativesDTO.setDeptUniqueId(((DepartmentDetails)this.departmentDetailsRepository.findById(initiativesDTO.getDepartmentId()).get()).getDeptUniqueID());
            }
        }
        if (Objects.nonNull(initiativesDTO.getScorecardDetailId()) && (scoreCard = this.scoreCardDetailsRepository.findByIdAndActive(initiativesDTO.getScorecardDetailId(), 0)).isPresent()) {
            initiativesDTO.getInitiativeValue().put("scoreCardDetailDesc", new ScoreCardDetailsDTO((ScoreCardDetails)scoreCard.get()).getScorecardName());
        }
        if (Objects.nonNull(initiativesDTO.getPerspectiveId())) {
            // empty if block
        }
        if (Objects.nonNull(initiativesDTO.getObjectiveId()) && (objOptional = this.objectivesService.findById(initiativesDTO.getObjectiveId().longValue())).isPresent()) {
            initiativesDTO.getInitiativeValue().put("objectiveDesc", new ObjectivesDTO((Objectives)objOptional.get(), false).getObjectivesName());
        }
    }

    public InitiativeResponseDTO deleteByInitiativeId(long initiativeId) {
        Optional initiatives = this.findById(initiativeId);
        InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
        if (initiatives.isPresent()) {
            Initiatives initiative = (Initiatives)initiatives.get();
            initiative.getActivitiesList();
            initiative.getCommentsList();
            initiative.getMileStonesList();
            initiative.getSubInitiativeList();
            this.initiativesRepository.delete((Object)initiative);
            initiativeResponseDTO.setFlag(true);
            return initiativeResponseDTO;
        }
        initiativeResponseDTO.setFlag(false);
        return initiativeResponseDTO;
    }

    public InitiativeResponseDTO deleteByInitiativeObj(Initiatives initiative) {
        InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
        if (initiative != null) {
            initiative.getActivitiesList();
            initiative.getCommentsList();
            initiative.getMileStonesList();
            initiative.getSubInitiativeList();
            this.initiativesRepository.delete((Object)initiative);
            initiativeResponseDTO.setFlag(true);
            return initiativeResponseDTO;
        }
        initiativeResponseDTO.setFlag(false);
        return initiativeResponseDTO;
    }

    public List<InitiativesDTO> initiativesList() {
        List kpiList = null;
        List dbList = this.initiativesRepository.findAll(0);
        if (!dbList.isEmpty() && dbList != null) {
            for (Initiatives dbValue2 : dbList) {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue2, false);
                this.populateImpactDesc(initiativesDTO);
                if (!initiativesDTO.getInitiativeValue().containsKey("impactDesc")) continue;
                String name = initiativesDTO.getInitiativeValue().get("impactDesc").toString();
                List kpi = this.kpiService.findByName(Long.valueOf(initiativesDTO.getCreatedBy()), name);
                if (kpi.isEmpty() || kpi.get(0) == null) continue;
                initiativesDTO.setImpactId(Long.valueOf(((KPI)kpi.get(0)).getId()));
                this.initiativesRepository.save(new Initiatives(initiativesDTO));
            }
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, false);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public String getDefaultPageUrl(long pageId) {
        List initiatives = this.initiativesRepository.findAllByPageId(pageId);
        if (!initiatives.isEmpty()) {
            if (initiatives.get(0) != null) {
                return String.join((CharSequence)"?pageId=", "dashboard/" + ((Initiatives)initiatives.get(0)).getCreatedBy(), String.valueOf(((Initiatives)initiatives.get(0)).getPageId().getId()));
            }
            return "";
        }
        return "";
    }

    public List<InitiativesDTO> findAll(long empId) {
        List<Object> kpiList = new ArrayList<InitiativesDTO>();
        List childList = this.employeeService.getReporteeListId(empId);
        childList.add(empId);
        List dbList = this.initiativesRepository.findAllByEmpIds(childList, 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, false);
                if (initiativesDTO.getDepartmentId() != null) {
                    initiativesDTO.getInitiativeValue().put("departmentName", this.deptMappingDetailRepository.getOne(initiativesDTO.getDepartmentId()).getDeptName());
                } else {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    if (initiativesDTO.getCreatedBy() != 0L) {
                        employeeDTO.setEmployeeId(initiativesDTO.getCreatedBy());
                        initiativesDTO.setDepartmentId(Long.valueOf(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId()));
                        initiativesDTO.getInitiativeValue().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                    }
                }
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public List<InitiativesDTO> findInitiativeIds(String initiativeIds) {
        List<Object> kpiList = new ArrayList<InitiativesDTO>();
        List ownerList = this.initiativesRepository.findOwnerByInitiativeIds(Lists.transform(Arrays.asList(initiativeIds.split("\\,")), (Function)Longs.stringConverter()), 0);
        List childList = this.employeeService.getReporteeListId(ownerList);
        HashSet finalList = new HashSet();
        finalList.addAll(ownerList);
        finalList.addAll(childList);
        List dbList = this.initiativesRepository.findAllByEmpIds(new ArrayList(finalList), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, false);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        return kpiList;
    }

    public List<InitiativesDTO> findInitiativePageIdList(String pageIds, String dateRange) throws ParseException {
        List<Object> kpiList = new ArrayList();
        ArrayList<InitiativesDTO> initiatives_out = new ArrayList<InitiativesDTO>();
        Date[] dates = InitiativesService.extractDates((String)dateRange);
        Date firstDate = dates[0];
        Date secondDate = dates[1];
        List dbList = this.initiativesRepository.findAllByPageIds(Lists.transform(Arrays.asList(pageIds.split("\\,")), (Function)Longs.stringConverter()), 0, firstDate, secondDate);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, true);
                if (initiativesDTO.getDepartmentId() != null) {
                    initiativesDTO.getInitiativeValue().put("departmentName", this.deptMappingDetailRepository.getOne(initiativesDTO.getDepartmentId()).getDeptName());
                } else {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    if (initiativesDTO.getCreatedBy() != 0L) {
                        employeeDTO.setEmployeeId(initiativesDTO.getCreatedBy());
                        initiativesDTO.setDepartmentId(Long.valueOf(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId()));
                        initiativesDTO.getInitiativeValue().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                    }
                }
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        for (InitiativesDTO initdto : kpiList) {
            InitiativesDTO initdto_temp = this.populateBudget(initdto);
            initiatives_out.add(initdto_temp);
        }
        return initiatives_out;
    }

    public static Date[] extractDates(String dateRange) {
        if (Objects.nonNull(dateRange)) {
            String[] dataRanges;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
            if (dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    Date firstDate = dateFormat.parse(startDate);
                    Date secondDate = dateFormat.parse(endDate);
                    return new Date[]{firstDate, secondDate};
                }
                catch (ParseException e) {
                    throw new RuntimeException("Error parsing date range: " + e.getMessage(), e);
                }
            }
        }
        return null;
    }

    public List<InitiativesDTO> findInitiativeIdList(String initiativeIds, String dateRange) throws ParseException {
        List<Object> kpiList = new ArrayList();
        ArrayList<InitiativesDTO> initiatives_out = new ArrayList<InitiativesDTO>();
        List dbList = this.initiativesRepository.findByInitiativeIds(Lists.transform(Arrays.asList(initiativeIds.split("\\,")), (Function)Longs.stringConverter()), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, true);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO, dateRange);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        for (InitiativesDTO initdto : kpiList) {
            InitiativesDTO initdto_temp = this.populateBudget(initdto);
            initiatives_out.add(initdto_temp);
        }
        return initiatives_out;
    }

    public List<InitiativesDTO> findInitiativeIdListDept(String deptIds) throws ParseException {
        List<Object> kpiList = new ArrayList();
        ArrayList<InitiativesDTO> initiatives_out = new ArrayList<InitiativesDTO>();
        List dbList = this.initiativesRepository.findAllBydeptIds(Lists.transform(Arrays.asList(deptIds.split("\\,")), (Function)Longs.stringConverter()), 0);
        if (!dbList.isEmpty() && dbList != null) {
            kpiList = dbList.stream().map(dbValue -> {
                InitiativesDTO initiativesDTO = new InitiativesDTO(dbValue, true);
                this.populateImpactDesc(initiativesDTO);
                try {
                    this.populateActual(initiativesDTO);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                return initiativesDTO;
            }).collect(Collectors.toList());
        }
        for (InitiativesDTO initdto : kpiList) {
            InitiativesDTO initdto_temp = this.populateBudget(initdto);
            initiatives_out.add(initdto_temp);
        }
        return initiatives_out;
    }

    public List<InitiativesDTO> findAllByMappingList(long empId, boolean flag, String pageId, String dateRange) {
        System.out.println("enter in mapping List ");
        List departmentlist = new ArrayList();
        departmentlist = this.departmentDetailsService.getDeptList(empId);
        System.out.println("departmentlist :: " + departmentlist);
        List ownerList = this.deptMappingDetailRepository.findOwnerIDList(departmentlist);
        System.out.println("ownerList :: " + ownerList);
        List dbList = null;
        List kpiList = null;
        dbList = this.initiativesRepository.findAllBydeptIds(departmentlist, 0);
        System.out.println("dbList :: " + dbList);
        if (dbList != null && !dbList.isEmpty()) {
            kpiList = dbList.stream().map(dbValue -> {
                System.out.println("************strt******************");
                System.out.println("initive Ownser :: " + dbValue.getOwner());
                System.out.println("empId :: " + empId);
                if (dbValue.getOwner() != empId) {
                    InitiativesDTO matchInitiative = this.buildInitiativeOwnerMppingDTO(new InitiativesDTO(dbValue, flag), Long.valueOf(empId));
                    System.out.println("**************end****************");
                    return matchInitiative;
                }
                return null;
            }).filter(Objects::nonNull).collect(Collectors.toList());
        }
        return kpiList;
    }

    public InitiativesDTO buildInitiativeOwnerMppingDTO(InitiativesDTO dbValue, Long empId) {
        InitiativesDTO dto = dbValue;
        this.populateImpactDesc(dto);
        try {
            this.populateActual(dto);
            this.populateTotalBudgetAndActual(dto);
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        boolean overallApprove = false;
        if (CollectionUtils.isNotEmpty((Collection)dto.getSubInitiativeList())) {
            for (SubInitiativesDTO sub : dto.getSubInitiativeList()) {
                System.out.println("sib int empid ::" + empId + "getId :: " + sub.getId());
                System.out.println("activotydetails :: " + this.subInitiativesMapRepository.findAllByEmpIdANDSubInitiativesId(Long.valueOf(sub.getId()), empId.longValue()));
                if (this.subInitiativesMapRepository.findAllByEmpIdANDSubInitiativesId(Long.valueOf(sub.getId()), empId.longValue()) != null) {
                    sub.setUserMapApprove(true);
                    overallApprove = true;
                }
                if (!CollectionUtils.isNotEmpty((Collection)sub.getActivitiesList())) continue;
                for (ActivitiesDTO act : sub.getActivitiesList()) {
                    System.out.println("empid ::" + empId + "getId :: " + act.getId());
                    System.out.println("activotydetails :: " + this.activitiesMapRepository.findAllByEmpIdANDSubInitiativesId(Long.valueOf(act.getId()), empId.longValue()));
                    if (this.activitiesMapRepository.findAllByEmpIdANDSubInitiativesId(Long.valueOf(act.getId()), empId.longValue()) == null) continue;
                    act.setUserMapApprove(true);
                    overallApprove = true;
                }
            }
        }
        return overallApprove ? dto : null;
    }

    public List<InitiativesDTO> initiativesDashBoardListByDeptId(long deptId) throws ParseException {
        List initiativesDTOS = null;
        ArrayList<InitiativesDTO> initiatives_out = new ArrayList<InitiativesDTO>();
        List dbList = this.initiativesRepository.findAllByDeptId(Long.valueOf(deptId), 0);
        if (!dbList.isEmpty() && dbList != null) {
            initiativesDTOS = dbList.stream().map(dbValue -> new InitiativesDTO(dbValue, true)).collect(Collectors.toList());
        }
        for (InitiativesDTO initdto : initiativesDTOS) {
            try {
                this.populateActual(initdto);
            }
            catch (ParseException e) {
                e.printStackTrace();
            }
            InitiativesDTO initdto_temp = this.populateBudget(initdto);
            initiatives_out.add(initdto_temp);
        }
        return initiatives_out;
    }

    public InitiativeDashBoardResponseDTO buildInitiativeDashboard(List<InitiativesDTO> initiativeList) {
        HashMap<String, Integer> activitystatusCount = new HashMap<String, Integer>();
        HashMap<String, Integer> taskstatusCount = new HashMap<String, Integer>();
        HashMap<String, Integer> milestonestatusCount = new HashMap<String, Integer>();
        Long totSubInit = 0L;
        Long totActivity = 0L;
        Integer totActivityComplete = 0;
        Integer totActivityInprogress = 0;
        Long totTask = 0L;
        Long totMilestone = 0L;
        for (InitiativesDTO initiative : initiativeList) {
            Object milestone2;
            if (initiative == null || initiative.getInitiativeValue() == null) continue;
            if (initiative.getSubInitiativeList() != null) {
                System.out.println("enter in treeatment is non null");
                for (SubInitiativesDTO subInit : initiative.getSubInitiativeList()) {
                    if (subInit.getActivitiesList() == null) continue;
                    System.out.println("enter in treeatment is non null");
                    for (ActivitiesDTO activity : subInit.getActivitiesList()) {
                        Integer n;
                        Integer n2;
                        Object progressObj;
                        System.out.println("activity :: " + activity);
                        if (activity == null || activity.getActivitiesValue() == null || (progressObj = activity.getActivitiesValue().get("progress")) == null || progressObj.toString().trim().isEmpty()) continue;
                        double action = Double.parseDouble(progressObj.toString());
                        if (action >= 100.0) {
                            n2 = totActivityComplete;
                            n = totActivityComplete = Integer.valueOf(totActivityComplete + 1);
                            continue;
                        }
                        n2 = totActivityInprogress;
                        n = totActivityInprogress = Integer.valueOf(totActivityInprogress + 1);
                    }
                }
            }
            if (initiative.getMileStonesList() != null) {
                System.out.println("enter in treeatment is non null");
                for (Object milestone2 : initiative.getMileStonesList()) {
                    System.out.println("treatment :: " + milestone2);
                    if (milestone2 == null || milestone2.getMileStonesValue() == null) continue;
                    String action = (String)milestone2.getMileStonesValue().get("status");
                    System.out.println("action :: " + action);
                    action = action == null || action.trim().isEmpty() ? "UNKNOWN" : action;
                    milestonestatusCount.put(action, milestonestatusCount.getOrDefault(action, 0) + 1);
                    System.out.println("milestonestatusCount :: " + milestonestatusCount);
                }
            }
            if (initiative.getTaskList() != null) {
                System.out.println("enter in treeatment is non null");
                Long totalCompleteTask = 0L;
                milestone2 = initiative.getTaskList().iterator();
                while (milestone2.hasNext()) {
                    InitiativeTaskDto task = (InitiativeTaskDto)milestone2.next();
                    System.out.println("treatment :: " + task);
                    if (task == null || task.getTaskValue() == null) continue;
                    String action = (String)task.getTaskValue().get("status");
                    if (action.equalsIgnoreCase("completed")) {
                        totalCompleteTask = totalCompleteTask + 1L;
                    }
                    System.out.println("action :: " + action);
                    action = action == null || action.trim().isEmpty() ? "UNKNOWN" : action;
                    taskstatusCount.put(action, taskstatusCount.getOrDefault(action, 0) + 1);
                    System.out.println("taskstatusCount :: " + taskstatusCount);
                }
                initiative.setTaskCompleteCount(totalCompleteTask);
            }
            Long subinitiveCount = initiative.getSubInitiativeList() != null ? initiative.getSubInitiativeList().size() : 0;
            initiative.setSubInitiativeCount(subinitiveCount);
            totSubInit = totSubInit + subinitiveCount;
            if (initiative.getSubInitiativeList() != null) {
                milestone2 = initiative.getSubInitiativeList().iterator();
                while (milestone2.hasNext()) {
                    SubInitiativesDTO subInitive = (SubInitiativesDTO)milestone2.next();
                    Long activityCount = subInitive.getActivitiesList() != null ? subInitive.getActivitiesList().size() : 0;
                    initiative.setActivityCount(activityCount);
                    totActivity = totActivity + activityCount;
                }
            }
            Long milestoneCount = initiative.getMileStonesList() != null ? initiative.getMileStonesList().size() : 0;
            initiative.setMilestoneCount(milestoneCount);
            totMilestone = totMilestone + milestoneCount;
            Long taskCount = initiative.getTaskList() != null ? initiative.getTaskList().size() : 0;
            initiative.setTaskCount(taskCount);
            totTask = totTask + taskCount;
        }
        activitystatusCount.put("Complete", totActivityComplete);
        activitystatusCount.put("Inprogress", totActivityInprogress);
        InitiativeDashBoardResponseDTO response = new InitiativeDashBoardResponseDTO();
        response.setTotalInitiative(initiativeList != null ? (long)initiativeList.size() : 0L);
        response.setTotalSubInitiative(totSubInit.longValue());
        response.setTotalActivity(totActivity.longValue());
        response.setTotalMilestone(totMilestone.longValue());
        response.setTotalTask(totTask.longValue());
        response.setMessage("Initive Dashboard Data");
        response.setInitiveDTO(initiativeList);
        response.setMilestoneStatusCount(milestonestatusCount);
        response.setTaskStatusCount(taskstatusCount);
        response.setActivityStatusDTO(activitystatusCount);
        return response;
    }
}

