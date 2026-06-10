/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.ChildStatusCountDto
 *  com.estrat.scorecard.dto.ControlPanelGeneralDTO
 *  com.estrat.scorecard.dto.DashBoardPreferencesDTO
 *  com.estrat.scorecard.dto.DepartmentChartDTO
 *  com.estrat.scorecard.dto.Employee
 *  com.estrat.scorecard.dto.InitiativeBudgetDTO
 *  com.estrat.scorecard.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.scorecard.dto.InitiativeResponseDTO
 *  com.estrat.scorecard.dto.InitiativesDTO
 *  com.estrat.scorecard.dto.InitiativesTrackerDTO
 *  com.estrat.scorecard.dto.StatusCountDto
 *  com.estrat.scorecard.dto.SubInitiativesDTO
 *  com.estrat.scorecard.service.DashBoardPreferencesService
 *  com.estrat.scorecard.service.InitiativeService
 *  com.estrat.scorecard.service.InitiativeService$1
 *  com.estrat.scorecard.service.InitiativeService$10
 *  com.estrat.scorecard.service.InitiativeService$11
 *  com.estrat.scorecard.service.InitiativeService$12
 *  com.estrat.scorecard.service.InitiativeService$13
 *  com.estrat.scorecard.service.InitiativeService$14
 *  com.estrat.scorecard.service.InitiativeService$15
 *  com.estrat.scorecard.service.InitiativeService$16
 *  com.estrat.scorecard.service.InitiativeService$17
 *  com.estrat.scorecard.service.InitiativeService$18
 *  com.estrat.scorecard.service.InitiativeService$2
 *  com.estrat.scorecard.service.InitiativeService$3
 *  com.estrat.scorecard.service.InitiativeService$4
 *  com.estrat.scorecard.service.InitiativeService$5
 *  com.estrat.scorecard.service.InitiativeService$6
 *  com.estrat.scorecard.service.InitiativeService$8
 *  com.estrat.scorecard.service.InitiativeService$9
 *  com.estrat.scorecard.util.KPIUtil
 *  com.estrat.scorecard.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.ChildStatusCountDto;
import com.estrat.scorecard.dto.ControlPanelGeneralDTO;
import com.estrat.scorecard.dto.DashBoardPreferencesDTO;
import com.estrat.scorecard.dto.DepartmentChartDTO;
import com.estrat.scorecard.dto.Employee;
import com.estrat.scorecard.dto.InitiativeBudgetDTO;
import com.estrat.scorecard.dto.InitiativeDashBoardResponseDTO;
import com.estrat.scorecard.dto.InitiativeResponseDTO;
import com.estrat.scorecard.dto.InitiativesDTO;
import com.estrat.scorecard.dto.InitiativesTrackerDTO;
import com.estrat.scorecard.dto.StatusCountDto;
import com.estrat.scorecard.dto.SubInitiativesDTO;
import com.estrat.scorecard.service.DashBoardPreferencesService;
import com.estrat.scorecard.service.InitiativeService;
import com.estrat.scorecard.util.KPIUtil;
import com.estrat.scorecard.util.UserThreadLocal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/*
 * Exception performing whole class analysis ignored.
 */
@Service
public class InitiativeService {
    private Logger logger = LoggerFactory.getLogger(InitiativeService.class);
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;
    @Value(value="${dbservice.initiative.url}")
    private String dbUrl;
    @Value(value="${dbservice.getinitiative.url}")
    private String retriveInitiativeUrl;
    @Value(value="${dbservice.initiatives.list.url}")
    private String initiativeList;
    @Value(value="${dbservice.kpi.initiatives.list.url}")
    private String kpiInitiativeList;
    @Value(value="${dbservice.url}")
    private String dBUrl;

    public InitiativeResponseDTO saveInitiatives(InitiativesDTO initiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)initiativesDTO, InitiativeResponseDTO.class);
    }

    public InitiativeResponseDTO updateInitiatives(InitiativesDTO initiativesDTO) {
        System.out.println("End date period :::: " + initiativesDTO.getEndDatePeriod());
        return (InitiativeResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)initiativesDTO, InitiativeResponseDTO.class);
    }

    public Map<String, Object> saveTracker(List<InitiativesTrackerDTO> initiativesDTO) {
        String url = this.dBUrl + "/initiativestracker";
        return (Map)this.commonRestTemplate.postForObject(url, initiativesDTO, Map.class);
    }

    public Map<String, Object> saveBudget(List<InitiativeBudgetDTO> initiativesDTO) {
        String url = this.dBUrl + "/initiativesbudget";
        return (Map)this.commonRestTemplate.postForObject(url, initiativesDTO, Map.class);
    }

    public InitiativesDTO retriveInitiatives(Long id, boolean flag) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("id", id);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retriveInitiativeUrl).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVaiables).toUriString();
        return (InitiativesDTO)this.commonRestTemplate.getForObject(url, InitiativesDTO.class);
    }

    public List<StatusCountDto> statusCount(Long id, String period) {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = this.dashBoardPreferencesService.retrieveDashBoardPreferences(id);
        ArrayList<Long> deptlist = new ArrayList<Long>();
        ArrayList<Long> emplist = new ArrayList<Long>();
        String url_general = this.dBUrl + "/generalSettingList/{orgId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("orgId", Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID")));
        UriComponentsBuilder url_general_data = UriComponentsBuilder.fromHttpUrl((String)url_general).uriVariables((java.util.Map)urlVaiables);
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        ControlPanelGeneralDTO controlPanelGeneralDTO = (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url_general_data.toUriString(), new org.springframework.core.ParameterizedTypeReference<com.estrat.scorecard.dto.ControlPanelGeneralDTO>() {});
        if (dashBoardPreferencesDTO != null && dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("type").equals("projectstatuscount")) {
            String initiatives = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("initiative");
            if (Objects.isNull(period)) {
                period = (String)UserThreadLocal.get().get("DATE_PERIOD");
            }
            String url = this.dBUrl + "/initiativesListbyId";
            UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("id", new Object[]{initiatives}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List initiativesDTODTOList = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
            HashMap<Long, ChildStatusCountDto> statucountMap = new HashMap<Long, ChildStatusCountDto>();
            List validList = InitiativeService.filterValidInitiatives((List)initiativesDTODTOList, (String)period);
            Date firstDate = new Date();
            Date secondDate = new Date();
            String[] dataRanges = null;
            if (Objects.nonNull(period)) {
                String[] stringArray = dataRanges = period.contains("-") ? period.split("-") : period.split(",");
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
            for (com.estrat.scorecard.dto.InitiativesDTO initiativesDTO : (java.util.List<com.estrat.scorecard.dto.InitiativesDTO>)(java.util.List)validList) {
                this.updateDaysDifference(initiativesDTO, secondDate);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                Long empId = initiativesDTO.getOwner();
                Long deptID = initiativesDTO.getDepartmentId();
                Long orgId = Objects.nonNull(deptID) ? deptID : empId;
                Map countMap = new HashMap();
                if (controlPanelGeneralDTO.getImplementationType().equals("Department")) {
                    deptlist.add(initiativesDTO.getDepartmentId());
                } else {
                    emplist.add(initiativesDTO.getOwner());
                }
                ChildStatusCountDto statusCountDto = new ChildStatusCountDto();
                if (statusCountDto.getGreenInitiative() == null) {
                    statusCountDto.setGreenInitiative(new ArrayList());
                }
                if (statusCountDto.getAmberInitiative() == null) {
                    statusCountDto.setAmberInitiative(new ArrayList());
                }
                if (statusCountDto.getRedInitiative() == null) {
                    statusCountDto.setRedInitiative(new ArrayList());
                }
                statusCountDto.setId(initiativesDTO.getDepartmentId());
                countMap = this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (Objects.nonNull(countMap)) {
                    String statusLight = this.kpiUtil.calculateStatusLight(countMap);
                    if ("GREEN".equalsIgnoreCase(statusLight)) {
                        if (statucountMap.get(initiativesDTO.getDepartmentId()) != null) {
                            statusCountDto = (ChildStatusCountDto)statucountMap.get(initiativesDTO.getDepartmentId());
                            Long green = statusCountDto.getGreen();
                            if (green != null) {
                                statusCountDto.setGreen(Long.valueOf(green + 1L));
                                statusCountDto.getGreenInitiative().add(initiativesDTO);
                            } else {
                                statusCountDto.getGreenInitiative().add(initiativesDTO);
                                statusCountDto.setGreen(Long.valueOf(1L));
                            }
                        } else {
                            statusCountDto.setId(initiativesDTO.getDepartmentId());
                            statusCountDto.setGreen(Long.valueOf(1L));
                            statusCountDto.setRed(Long.valueOf(0L));
                            statusCountDto.setAmber(Long.valueOf(0L));
                            statusCountDto.getGreenInitiative().add(initiativesDTO);
                        }
                    } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                        if (statucountMap.get(initiativesDTO.getDepartmentId()) != null) {
                            statusCountDto = (ChildStatusCountDto)statucountMap.get(initiativesDTO.getDepartmentId());
                            Long amber = statusCountDto.getAmber();
                            if (amber != null) {
                                statusCountDto.setAmber(Long.valueOf(amber + 1L));
                                statusCountDto.getAmberInitiative().add(initiativesDTO);
                            } else {
                                statusCountDto.setAmber(Long.valueOf(1L));
                                statusCountDto.getAmberInitiative().add(initiativesDTO);
                            }
                        } else {
                            statusCountDto.setId(initiativesDTO.getDepartmentId());
                            statusCountDto.setAmber(Long.valueOf(1L));
                            statusCountDto.setRed(Long.valueOf(0L));
                            statusCountDto.setGreen(Long.valueOf(0L));
                            statusCountDto.getAmberInitiative().add(initiativesDTO);
                        }
                    } else if (statucountMap.get(initiativesDTO.getDepartmentId()) != null) {
                        statusCountDto = (ChildStatusCountDto)statucountMap.get(initiativesDTO.getDepartmentId());
                        Long red = statusCountDto.getRed();
                        if (red != null) {
                            statusCountDto.setRed(Long.valueOf(red + 1L));
                            statusCountDto.getRedInitiative().add(initiativesDTO);
                        } else {
                            statusCountDto.setRed(Long.valueOf(1L));
                            statusCountDto.getRedInitiative().add(initiativesDTO);
                        }
                    } else {
                        statusCountDto.setId(initiativesDTO.getDepartmentId());
                        statusCountDto.setRed(Long.valueOf(1L));
                        statusCountDto.setGreen(Long.valueOf(0L));
                        statusCountDto.setAmber(Long.valueOf(0L));
                        statusCountDto.getRedInitiative().add(initiativesDTO);
                    }
                }
                statucountMap.put(initiativesDTO.getDepartmentId(), statusCountDto);
                System.out.println("Status Count :::: " + initiativesDTO.getDepartmentId() + " :::::  " + statusCountDto.getAmber() + " ::: " + statusCountDto.getGreen() + " ::: " + statusCountDto.getRed());
            }
            System.out.println("Status Count Map ::::   " + statucountMap);
            return this.getStatusCountMapping(emplist, deptlist, statucountMap);
        }
        return null;
    }

    public List<StatusCountDto> progresscount(Long id, String period) {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = this.dashBoardPreferencesService.retrieveDashBoardPreferences(id);
        ArrayList<Long> deptlist = new ArrayList<Long>();
        ArrayList<Long> emplist = new ArrayList<Long>();
        String url_general = this.dBUrl + "/generalSettingList/{orgId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("orgId", Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID")));
        UriComponentsBuilder url_general_data = UriComponentsBuilder.fromHttpUrl((String)url_general).uriVariables((java.util.Map)urlVaiables);
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        ControlPanelGeneralDTO controlPanelGeneralDTO = (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url_general_data.toUriString(), new org.springframework.core.ParameterizedTypeReference<com.estrat.scorecard.dto.ControlPanelGeneralDTO>() {});
        if (dashBoardPreferencesDTO != null && dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("type").equals("initiativeCount")) {
            String initiatives = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("initiative");
            if (Objects.isNull(period)) {
                period = (String)UserThreadLocal.get().get("DATE_PERIOD");
            }
            String url = this.dBUrl + "/initiativesListbyId";
            UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("id", new Object[]{initiatives}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List initiativesDTODTOList = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
            List validList = InitiativeService.filterValidInitiatives((List)initiativesDTODTOList, (String)period);
            HashMap<Long, ChildStatusCountDto> statucountMap = new HashMap<Long, ChildStatusCountDto>();
            for (com.estrat.scorecard.dto.InitiativesDTO initiativesDTO : (java.util.List<com.estrat.scorecard.dto.InitiativesDTO>)(java.util.List)validList) {
                boolean completed;
                Long empId = initiativesDTO.getOwner();
                Long deptID = initiativesDTO.getDepartmentId();
                Long orgId = null;
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                if (controlPanelGeneralDTO.getImplementationType().equals("Department")) {
                    deptlist.add(initiativesDTO.getDepartmentId());
                    orgId = deptID;
                } else {
                    emplist.add(initiativesDTO.getOwner());
                    orgId = empId;
                }
                ChildStatusCountDto statusCountDto = new ChildStatusCountDto();
                statusCountDto.setId(orgId);
                if (statucountMap.get(orgId) != null) {
                    Long count;
                    statusCountDto = (ChildStatusCountDto)statucountMap.get(orgId);
                    completed = false;
                    if (initiativesDTO.getInitiativeValue().get("progressval") != null && initiativesDTO.getInitiativeValue().get("progressval").equals("0")) {
                        completed = true;
                    }
                    if (completed) {
                        count = statusCountDto.getCompleted();
                        if (count != null) {
                            statusCountDto.setCompleted(Long.valueOf(count + 1L));
                        } else {
                            statusCountDto.setCompleted(Long.valueOf(1L));
                        }
                    } else {
                        count = statusCountDto.getInProgress();
                        if (count != null) {
                            statusCountDto.setInProgress(Long.valueOf(count + 1L));
                        } else {
                            statusCountDto.setInProgress(Long.valueOf(1L));
                        }
                    }
                } else {
                    completed = false;
                    if (initiativesDTO.getInitiativeValue().get("progressval") != null && initiativesDTO.getInitiativeValue().get("progressval").equals("100")) {
                        completed = true;
                    }
                    if (completed) {
                        statusCountDto.setCompleted(Long.valueOf(1L));
                        statusCountDto.setInProgress(Long.valueOf(0L));
                    } else {
                        statusCountDto.setInProgress(Long.valueOf(1L));
                        statusCountDto.setCompleted(Long.valueOf(0L));
                    }
                }
                statucountMap.put(orgId, statusCountDto);
            }
            return this.getStatusCountMapping(emplist, deptlist, statucountMap);
        }
        return null;
    }

    public List<StatusCountDto> noprogresscount(Long id, String period) {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = this.dashBoardPreferencesService.retrieveDashBoardPreferences(id);
        ArrayList<Long> deptlist = new ArrayList<Long>();
        ArrayList<Long> emplist = new ArrayList<Long>();
        String url_general = this.dBUrl + "/generalSettingList/{orgId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("orgId", Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID")));
        UriComponentsBuilder url_general_data = UriComponentsBuilder.fromHttpUrl((String)url_general).uriVariables((java.util.Map)urlVaiables);
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        ControlPanelGeneralDTO controlPanelGeneralDTO = (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url_general_data.toUriString(), new org.springframework.core.ParameterizedTypeReference<com.estrat.scorecard.dto.ControlPanelGeneralDTO>() {});
        if (dashBoardPreferencesDTO != null && dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("type").equals("blankinitiativeCount")) {
            String initiatives = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("initiative");
            if (Objects.isNull(period)) {
                period = (String)UserThreadLocal.get().get("DATE_PERIOD");
            }
            String url = this.dBUrl + "/initiativesListbyId";
            UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("id", new Object[]{initiatives}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List initiativesDTODTOList = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
            List validList = InitiativeService.filterValidInitiatives((List)initiativesDTODTOList, (String)period);
            HashMap<Long, ChildStatusCountDto> statucountMap = new HashMap<Long, ChildStatusCountDto>();
            for (com.estrat.scorecard.dto.InitiativesDTO initiativesDTO : (java.util.List<com.estrat.scorecard.dto.InitiativesDTO>)(java.util.List)validList) {
                Long empId = initiativesDTO.getOwner();
                Long deptID = initiativesDTO.getDepartmentId();
                Long orgId = null;
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                if (controlPanelGeneralDTO.getImplementationType().equals("Department")) {
                    deptlist.add(initiativesDTO.getDepartmentId());
                    orgId = deptID;
                } else {
                    emplist.add(initiativesDTO.getOwner());
                    orgId = empId;
                }
                System.out.println(initiativesDTO.getInitiativeValue().get("actualValue") + " :::: " + initiativesDTO.getInitiativeValue().get("progressval") + " :::: " + initiativesDTO.getInitiativeValue().get("blank"));
                ChildStatusCountDto statusCountDto = new ChildStatusCountDto();
                statusCountDto.setId(orgId);
                if (statusCountDto.getBlankinitiative() == null) {
                    statusCountDto.setBlankinitiative(new ArrayList());
                }
                if (statucountMap.get(orgId) != null) {
                    statusCountDto = (ChildStatusCountDto)statucountMap.get(orgId);
                    if (Objects.isNull(initiativesDTO.getInitiativeValue().get("actualValue")) || initiativesDTO.getInitiativeValue().get("actualValue") == "0") {
                        statusCountDto.setBlankinitiativecount(Long.valueOf((statusCountDto.getBlankinitiativecount() != null ? statusCountDto.getBlankinitiativecount() : 0L) + 1L));
                        statusCountDto.getBlankinitiative().add(initiativesDTO);
                    } else {
                        statusCountDto.setBlankinitiativecount(Long.valueOf(statusCountDto.getBlankinitiativecount() != null ? statusCountDto.getBlankinitiativecount() : 0L));
                    }
                } else if (Objects.isNull(initiativesDTO.getInitiativeValue().get("actualValue")) || initiativesDTO.getInitiativeValue().get("actualValue") == "0") {
                    statusCountDto.setBlankinitiativecount(Long.valueOf((statusCountDto.getBlankinitiativecount() != null ? statusCountDto.getBlankinitiativecount() : 0L) + 1L));
                    statusCountDto.getBlankinitiative().add(initiativesDTO);
                } else {
                    statusCountDto.setBlankinitiativecount(Long.valueOf(statusCountDto.getBlankinitiativecount() != null ? statusCountDto.getBlankinitiativecount() : 0L));
                }
                System.out.println("statusCountDto.getBlankinitiative()==>" + statusCountDto.getBlankinitiative());
                statucountMap.put(orgId, statusCountDto);
            }
            System.out.println(statucountMap + " :::: " + deptlist + " :::: " + emplist);
            return this.getStatusCountMapping(emplist, deptlist, statucountMap);
        }
        return null;
    }

    public List<StatusCountDto> getStatusCountMapping(List<Long> empId, List<Long> deptId, Map<Long, ChildStatusCountDto> childstatusMapping) {
        ParameterizedTypeReference<Object> parameterizedTypeReference = null;
        String pageURL;
        Object url;
        Object commaSeparatedString;
        ArrayList<String> stringList;
        HashMap<Long, String> namemapping = new HashMap<Long, String>();
        if (Objects.nonNull(empId) && empId.size() > 0) {
            stringList = new ArrayList();
            for (Long value : deptId) {
                stringList.add(String.valueOf(value));
            }
            commaSeparatedString = String.join((CharSequence)",", stringList);
            url = this.dBUrl + "/employeeDetailsList";
            pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("emplist", new Object[]{stringList}).toUriString();
            parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List employees = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
            for (Employee employee : (java.util.List<Employee>)employees) {
                namemapping.put(employee.getEmpId(), employee.getFirstName());
            }
        } else {
            stringList = new ArrayList<String>();
            for (Long value : deptId) {
                stringList.add(String.valueOf(value));
            }
            commaSeparatedString = String.join((CharSequence)",", stringList);
            url = this.dBUrl + "/dept_detailsby_List";
            pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{commaSeparatedString}).toUriString();
            parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List departmentChartDTOs = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
            for (DepartmentChartDTO departmentChartDTO : (java.util.List<DepartmentChartDTO>)departmentChartDTOs) {
                namemapping.put(departmentChartDTO.getDeptId(), departmentChartDTO.getDeptName());
            }
        }
        if (childstatusMapping != null) {
            Set<Long> keysList = childstatusMapping.keySet();
            HashMap<Long, StatusCountDto> mappingMap = new HashMap<Long, StatusCountDto>();
            for (Long key : keysList) {
                java.util.List<com.estrat.scorecard.dto.ChildStatusCountDto> childStatusCountDtos;
                StatusCountDto statusCountDto = new StatusCountDto();
                ChildStatusCountDto childStatusCountDto = childstatusMapping.get(key);
                System.out.println("Key ::: " + key + " ::: id ::: " + childStatusCountDto.getId());
                String childName = (String)namemapping.get(key);
                childStatusCountDto.setChildName(childName);
                statusCountDto.setParentName(childName);
                if (mappingMap.get(childStatusCountDto.getId()) != null) {
                    statusCountDto = (StatusCountDto)mappingMap.get(childStatusCountDto.getId());
                    if (statusCountDto.getChildStatusCount() != null) {
                        childStatusCountDtos = (java.util.List<com.estrat.scorecard.dto.ChildStatusCountDto>)(java.util.List)statusCountDto.getChildStatusCount();
                        childStatusCountDtos.add(childStatusCountDto);
                        statusCountDto.setChildStatusCount(childStatusCountDtos);
                        mappingMap.put(childStatusCountDto.getId(), statusCountDto);
                        continue;
                    }
                    childStatusCountDtos = new ArrayList<ChildStatusCountDto>();
                    childStatusCountDtos.add(childStatusCountDto);
                    statusCountDto.setChildStatusCount(childStatusCountDtos);
                    mappingMap.put(childStatusCountDto.getId(), statusCountDto);
                    continue;
                }
                statusCountDto.setId(childStatusCountDto.getId().longValue());
                statusCountDto.setParentName((String)namemapping.get(childStatusCountDto.getId()));
                childStatusCountDtos = new ArrayList();
                childStatusCountDtos.add(childStatusCountDto);
                statusCountDto.setChildStatusCount(childStatusCountDtos);
                mappingMap.put(childStatusCountDto.getId(), statusCountDto);
            }
            System.out.println("Mapping ::: " + mappingMap);
            List<StatusCountDto> statusCountDto_list = mappingMap.entrySet().stream().map(Value2 -> (StatusCountDto)Value2.getValue()).collect(Collectors.toList());
            return statusCountDto_list;
        }
        return null;
    }

    public static List<InitiativesDTO> filterValidInitiatives(List<InitiativesDTO> initiatives, String dataRange) {
        ArrayList<InitiativesDTO> validInitiatives = new ArrayList<InitiativesDTO>();
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            String[] rangeParts = dataRange.split(" - ");
            Date rangeStartDate = dateFormat.parse(rangeParts[0]);
            Date rangeEndDate = dateFormat.parse(rangeParts[1]);
            for (InitiativesDTO initiative : initiatives) {
                String inidaterange = (String)initiative.getInitiativeValue().get("daterange");
                SimpleDateFormat inidateFormat = new SimpleDateFormat("MM/dd/yyyy");
                String[] inirangeParts = inidaterange.split(" - ");
                Date inirangeStartDate = dateFormat.parse(inirangeParts[0]);
                Date inirangeEndDate = dateFormat.parse(inirangeParts[1]);
                if (!(inirangeStartDate.compareTo(rangeStartDate) <= 0 && inirangeEndDate.compareTo(rangeStartDate) >= 0 || inirangeStartDate.compareTo(rangeStartDate) >= 0 && inirangeStartDate.compareTo(rangeEndDate) <= 0) && (inirangeEndDate.compareTo(rangeStartDate) < 0 || inirangeEndDate.compareTo(rangeEndDate) > 0)) continue;
                validInitiatives.add(initiative);
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return validInitiatives;
    }

    public void removeInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<InitiativesDTO> findAll(long empId, boolean flag, String pageId, String nodate) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.initiativeList).queryParam("loadFlag", new Object[]{flag}).queryParam("nodate", new Object[]{nodate}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> findImpactedInitiatives(long kpiId) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiInitiativeList).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void updateDaysDifference(InitiativesDTO initiativesDTO) {
        try {
            Map stringObjectsMap = initiativesDTO.getInitiativeValue();
            String dateRangeVal = null;
            if (stringObjectsMap.containsKey("actualdaterange") && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("actualdaterange").toString())) {
                dateRangeVal = stringObjectsMap.get("actualdaterange").toString();
            } else if (stringObjectsMap.containsKey("daterange")) {
                dateRangeVal = stringObjectsMap.get("daterange").toString();
            }
            if (dateRangeVal != null && StringUtils.isNotEmpty(dateRangeVal)) {
                String[] dateRange = dateRangeVal.split("-");
                String startDate = dateRange[0].trim();
                String endDate = dateRange[1].trim();
                SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
                Date firstDate = null;
                Date secondDate = null;
                try {
                    firstDate = format.parse(startDate);
                    secondDate = format.parse(endDate);
                }
                catch (ParseException pe) {
                    this.logger.error("parser exception for unknown pattern " + pe);
                }
                Calendar calendar = Calendar.getInstance();
                Date currrentDate = new Date();
                calendar.setTime(currrentDate);
                calendar.set(5, 1);
                calendar.add(5, -1);
                Date today = calendar.getTime();
                Long difference = null;
                if (today.after(firstDate)) {
                    if (today.after(secondDate)) {
                        int progress = Integer.valueOf(stringObjectsMap.get("progressval").toString());
                        if (progress >= 100) {
                            stringObjectsMap.put("daysRemaining", 0);
                        } else {
                            difference = ChronoUnit.DAYS.between(today.toInstant(), secondDate.toInstant());
                            stringObjectsMap.put("daysRemaining", difference);
                        }
                    } else {
                        difference = ChronoUnit.DAYS.between(today.toInstant(), secondDate.toInstant());
                        stringObjectsMap.put("daysRemaining", difference);
                    }
                } else {
                    difference = ChronoUnit.DAYS.between(firstDate.toInstant(), secondDate.toInstant());
                    stringObjectsMap.put("daysRemaining", difference);
                }
            }
            initiativesDTO.setInitiativeValue(stringObjectsMap);
        }
        catch (Exception e) {
            this.logger.error("parser exception for unknown pattern " + e);
        }
    }

    public void updateDaysDifference(InitiativesDTO initiativesDTO, Date endDateselect) {
        try {
            Map stringObjectsMap = initiativesDTO.getInitiativeValue();
            String dateRangeVal = null;
            if (stringObjectsMap.containsKey("actualdaterange") && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("actualdaterange").toString())) {
                dateRangeVal = stringObjectsMap.get("actualdaterange").toString();
            } else if (stringObjectsMap.containsKey("daterange")) {
                dateRangeVal = stringObjectsMap.get("daterange").toString();
            }
            if (dateRangeVal != null && StringUtils.isNotEmpty(dateRangeVal)) {
                String[] dateRange = dateRangeVal.split("-");
                String startDate = dateRange[0].trim();
                String endDate = dateRange[1].trim();
                SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
                Date firstDate = null;
                Date secondDate = null;
                try {
                    firstDate = format.parse(startDate);
                    secondDate = format.parse(endDate);
                }
                catch (ParseException pe) {
                    this.logger.error("parser exception for unknown pattern " + pe);
                }
                Calendar calendar = Calendar.getInstance();
                Date currrentDate = endDateselect;
                calendar.setTime(currrentDate);
                calendar.set(5, 1);
                calendar.add(5, -1);
                Date today = calendar.getTime();
                Long difference = null;
                if (today.after(firstDate)) {
                    if (today.after(secondDate)) {
                        int progress = Integer.valueOf(stringObjectsMap.get("progressval").toString());
                        if (progress >= 100) {
                            stringObjectsMap.put("daysRemaining", 0);
                        } else {
                            difference = ChronoUnit.DAYS.between(today.toInstant(), secondDate.toInstant());
                            stringObjectsMap.put("daysRemaining", difference);
                        }
                    } else {
                        difference = ChronoUnit.DAYS.between(today.toInstant(), secondDate.toInstant());
                        stringObjectsMap.put("daysRemaining", difference);
                    }
                } else {
                    difference = ChronoUnit.DAYS.between(firstDate.toInstant(), secondDate.toInstant());
                    stringObjectsMap.put("daysRemaining", difference);
                }
            }
            initiativesDTO.setInitiativeValue(stringObjectsMap);
        }
        catch (Exception e) {
            this.logger.error("parser exception for unknown pattern " + e);
        }
    }

    public List<InitiativesDTO> initiativesListByEmpId(long empId) {
        String url1 = this.dBUrl + "initiativesListByEmpId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListByDeptId(long deptId) {
        String url1 = this.dBUrl + "initiativesListByDeptId/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListwchildByDeptId() {
        String url1 = this.dBUrl + "initiativesDtoListByDeptId";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListwchildByempId(String empId) {
        String url1 = this.dBUrl + "initiativesdtoListByempId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListWithChild(String empId, String initiativeIds, String pageIds, String dateRange) {
        String url = this.dBUrl + "initiativesListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("initiativeIds", new Object[]{initiativeIds}).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListWithDeptIds(String deptIds) {
        String url = this.dBUrl + "initiativesListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> findAllviewMapList(long empId, boolean flag, String pageId, String nodate) {
        String url = this.dBUrl + "initiativeViewList/" + empId;
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String url1 = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("nodate", new Object[]{nodate}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url1, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public InitiativeDashBoardResponseDTO initiDashBoardData(long deptId) {
        String url1 = this.dBUrl + "/initiativeDashBoardData";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("deptId", new Object[]{deptId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (InitiativeDashBoardResponseDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

