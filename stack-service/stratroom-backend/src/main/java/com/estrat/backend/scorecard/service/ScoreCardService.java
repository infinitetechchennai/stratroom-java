/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ChildStatusCountDto
 *  com.estrat.backend.scorecard.dto.ChildTrackerDTO
 *  com.estrat.backend.scorecard.dto.DashBoardPreferencesDTO
 *  com.estrat.backend.scorecard.dto.DepartmentChartDTO
 *  com.estrat.backend.scorecard.dto.Employee
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.ObjectivesDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.backend.scorecard.dto.ScorecardList
 *  com.estrat.backend.scorecard.dto.StatusCountDto
 *  com.estrat.backend.scorecard.service.DashBoardPreferencesService
 *  com.estrat.backend.scorecard.service.ScoreCardService
 *  com.estrat.backend.scorecard.service.ScoreCardService$1
 *  com.estrat.backend.scorecard.service.ScoreCardService$10
 *  com.estrat.backend.scorecard.service.ScoreCardService$11
 *  com.estrat.backend.scorecard.service.ScoreCardService$12
 *  com.estrat.backend.scorecard.service.ScoreCardService$13
 *  com.estrat.backend.scorecard.service.ScoreCardService$14
 *  com.estrat.backend.scorecard.service.ScoreCardService$15
 *  com.estrat.backend.scorecard.service.ScoreCardService$16
 *  com.estrat.backend.scorecard.service.ScoreCardService$17
 *  com.estrat.backend.scorecard.service.ScoreCardService$18
 *  com.estrat.backend.scorecard.service.ScoreCardService$19
 *  com.estrat.backend.scorecard.service.ScoreCardService$2
 *  com.estrat.backend.scorecard.service.ScoreCardService$20
 *  com.estrat.backend.scorecard.service.ScoreCardService$21
 *  com.estrat.backend.scorecard.service.ScoreCardService$22
 *  com.estrat.backend.scorecard.service.ScoreCardService$3
 *  com.estrat.backend.scorecard.service.ScoreCardService$4
 *  com.estrat.backend.scorecard.service.ScoreCardService$5
 *  com.estrat.backend.scorecard.service.ScoreCardService$6
 *  com.estrat.backend.scorecard.service.ScoreCardService$7
 *  com.estrat.backend.scorecard.service.ScoreCardService$9
 *  com.estrat.backend.scorecard.util.KPIThreadLocal
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Qualifier
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.core.task.TaskExecutor
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ChildStatusCountDto;
import com.estrat.backend.scorecard.dto.ChildTrackerDTO;
import com.estrat.backend.scorecard.dto.DashBoardPreferencesDTO;
import com.estrat.backend.scorecard.dto.DepartmentChartDTO;
import com.estrat.backend.scorecard.dto.Employee;
import com.estrat.backend.scorecard.dto.KPIDTO;
import com.estrat.backend.scorecard.dto.ObjectivesDTO;
import com.estrat.backend.scorecard.dto.ScoreCardDTO;
import com.estrat.backend.scorecard.dto.ScoreCardDetailsDTO;
import com.estrat.backend.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.backend.scorecard.dto.ScorecardList;
import com.estrat.backend.scorecard.dto.StatusCountDto;
import com.estrat.backend.scorecard.service.DashBoardPreferencesService;
import com.estrat.backend.scorecard.service.ScoreCardService;
import com.estrat.backend.scorecard.util.KPIThreadLocal;
import com.estrat.backend.scorecard.util.KPIUtil;
import com.estrat.backend.scorecard.util.UserThreadLocal;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.task.TaskExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ScoreCardService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;
    @Autowired
    @Qualifier(value="executorB")
    private TaskExecutor scoreCardExecutor;

    public ResponseEntity<ScoreCardDTO> getScoreCardDetails(long id) {
        String url = this.dbUrl + "/scorecard/" + id;
        ScoreCardDTO scoreCard = (ScoreCardDTO)this.commonRestTemplate.getForObject(url, ScoreCardDTO.class);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    public List<ScoreCardDTO> scoreCardList(long empId, String pageId, boolean flag) {
        String url = this.dbUrl + "/scoreCardList/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDTO> scoreCardListByDate(long detailsId, boolean flag, String dateRange) {
        String url = this.dbUrl + "/scoreCardListByDate";
        HashMap urlVariables = new HashMap();
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("detailsId", new Object[]{detailsId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDTO> scoreCardListByDateDept(long deptId, long detailsId, boolean flag, String dateRange) {
        String url = this.dbUrl + "/scoreCardListByDateDept";
        HashMap urlVariables = new HashMap();
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("deptId", new Object[]{deptId}).queryParam("detailsId", new Object[]{detailsId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public ScoreCardDetailsDTO scoreCardDetailsListByDate(long empId, String pageId, boolean flag, String dateRange) {
        String url = this.dbUrl + "/scoreCardDetailsListByDate/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ScoreCardDetailsDTO detailsDTOList = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardDetailsDTO.class);
        return detailsDTOList;
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailsListByDatePageIds(long empId, String pageId, boolean flag, String dateRange) {
        String url = this.dbUrl + "/scoreCardDetailsListByDatePageIds/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List detailsDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return detailsDTOList;
    }

    public ScoreCardDetailsDTO scoreCardDetailsListByDateDept(long deptId, String pageId, boolean flag, String dateRange) {
        String url = this.dbUrl + "/scoreCardDetailsListByDateDept/{deptId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ScoreCardDetailsDTO detailsDTOList = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardDetailsDTO.class);
        return detailsDTOList;
    }

    public ScoreCardDetailsDTO scoreCardDetailList(long empId, String pageId, boolean flag) {
        String url = this.dbUrl + "/scoreCardDetailList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ScoreCardDetailsDTO scoreCard = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardDetailsDTO.class);
        return scoreCard;
    }

    public ScoreCardDetailsDTO scoreCardDetailListDept(long deptId, String pageId, boolean flag) {
        String url = this.dbUrl + "/scoreCardDetailListDept/{deptId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ScoreCardDetailsDTO scoreCard = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardDetailsDTO.class);
        return scoreCard;
    }

    public ScoreCardDetailsDTO scoreCardDetailListPage(String pageId) {
        String url = this.dbUrl + "/scoreCardDetailListPage/{pageId}";
        HashMap<String, String> urlVariables = new HashMap<String, String>();
        urlVariables.put("pageId", pageId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ScoreCardDetailsDTO scoreCard = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardDetailsDTO.class);
        return scoreCard;
    }

    public List<StatusCountDto> statusCount(Long id, String period) {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = this.dashBoardPreferencesService.retrieveDashBoardPreferences(id);
        ArrayList<Long> deptlist = new ArrayList<Long>();
        ArrayList<Long> emplist = new ArrayList<Long>();
        if (dashBoardPreferencesDTO != null && dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("type").equals("kpistatuscount")) {
            String scorecard = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("scorecard");
            String daterange = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("datarangechart");
            if (daterange != null) {
                period = daterange;
            }
            String url = this.dbUrl + "/scorecardList";
            List scoreCardDetailsDTOList = new ArrayList();
            if (scorecard.contains(",")) {
                String[] scoresArray = scorecard.split(",");
                List<String> scoresList = Arrays.asList(scoresArray);
                for (String score : (java.util.List<String>)scoresList) {
                    UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardid", new Object[]{score}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
                    List scoreCardDetailsDTOList_tmp = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
                    if (scoreCardDetailsDTOList_tmp == null || scoreCardDetailsDTOList_tmp.size() <= 0) continue;
                    scoreCardDetailsDTOList.addAll(scoreCardDetailsDTOList_tmp);
                }
            } else {
                UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardid", new Object[]{scorecard}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
                scoreCardDetailsDTOList = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
            }
            Long empId = Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID"));
            String url_childtracker = this.dbUrl + "/childtrackerlist";
            UriComponentsBuilder url_childtracker_data = UriComponentsBuilder.fromHttpUrl((String)url_childtracker).queryParam("orgid", new Object[]{empId}).queryParam("period", new Object[]{period}).queryParam("upgrade", new Object[]{"1"}).queryParam("orgtype", new Object[]{Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID"))});
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
            List childTrackerDTOList = (List)this.commonRestTemplate.getForObject(url_childtracker_data.toUriString(), new org.springframework.core.ParameterizedTypeReference<java.util.List<com.estrat.backend.scorecard.dto.ChildTrackerDTO>>() {});
            for (ChildTrackerDTO childTrackerDTO : (java.util.List<ChildTrackerDTO>)childTrackerDTOList) {
                if (childTrackerDTO.getType().equals("Department")) {
                    if (deptlist.contains(childTrackerDTO.getChildId())) continue;
                    deptlist.add(childTrackerDTO.getChildId());
                    deptlist.add(childTrackerDTO.getParentId());
                    continue;
                }
                if (emplist.contains(childTrackerDTO.getChildId())) continue;
                emplist.add(childTrackerDTO.getChildId());
                emplist.add(childTrackerDTO.getParentId());
            }
            ConcurrentHashMap<Long, ChildStatusCountDto> statucountMap = new ConcurrentHashMap<Long, ChildStatusCountDto>();
            for (ScoreCardDetailsDTO scorecardDetails : (java.util.List<ScoreCardDetailsDTO>)scoreCardDetailsDTOList) {
                ChildTrackerDTO childto = null;
                for (ChildTrackerDTO childTrackerDTO : (java.util.List<ChildTrackerDTO>)childTrackerDTOList) {
                    if (!childTrackerDTO.getParentId().equals(scorecardDetails.getDepartmentId())) continue;
                    childto = childTrackerDTO;
                }
                System.out.println("SCoreCard Department ID L:::: " + scorecardDetails.getDepartmentId() + " ::: childto ::: " + Objects.isNull(childto));
                if (scorecardDetails.getScoreCardDTOS() == null || childto == null) continue;
                for (ScoreCardDTO scorecardDto : scorecardDetails.getScoreCardDTOS()) {
                    if (scorecardDto.getObjectiveList() == null) continue;
                    for (ObjectivesDTO obj : scorecardDto.getObjectiveList()) {
                        if (obj == null || obj.getKpiList() == null) continue;
                        for (KPIDTO kpidto : obj.getKpiList()) {
                            kpidto.setDepartmentId(scorecardDetails.getDepartmentId().longValue());
                            String period_val = period;
                            System.out.println("Actual for Kpi status ::: " + kpidto.getKpiValue().get("actual"));
                            String statuslight = this.kpiUtil.buildStatusLight_count(kpidto, String.valueOf(empId), period_val);
                            ChildStatusCountDto statusCountDto = new ChildStatusCountDto();
                            if (statusCountDto.getRedKpi() == null) {
                                statusCountDto.setRedKpi(new ArrayList());
                                statusCountDto.setRed(Long.valueOf(0L));
                            }
                            if (statusCountDto.getLightredKpi() == null) {
                                statusCountDto.setLightredKpi(new ArrayList());
                                statusCountDto.setLightred(Long.valueOf(0L));
                            }
                            if (statusCountDto.getAmberKpi() == null) {
                                statusCountDto.setAmberKpi(new ArrayList());
                                statusCountDto.setAmber(Long.valueOf(0L));
                            }
                            if (statusCountDto.getGreenKpi() == null) {
                                statusCountDto.setGreenKpi(new ArrayList());
                                statusCountDto.setGreen(Long.valueOf(0L));
                            }
                            if (statusCountDto.getLightgreenKpi() == null) {
                                statusCountDto.setLightgreenKpi(new ArrayList());
                                statusCountDto.setLightgreen(Long.valueOf(0L));
                            }
                            statusCountDto.setId(scorecardDetails.getDepartmentId());
                            if (Objects.isNull(statuslight)) {
                                statuslight = "red fas fa-flag";
                            }
                            if (Objects.nonNull(statucountMap.get(childto.getChildId()))) {
                                statusCountDto = (ChildStatusCountDto)statucountMap.get(childto.getChildId());
                                if (statuslight.equals("red fas fa-flag")) {
                                    Long red = statusCountDto.getRed();
                                    if (red != null) {
                                        statusCountDto.setRed(Long.valueOf(red + 1L));
                                        statusCountDto.getRedKpi().add(kpidto);
                                    } else {
                                        statusCountDto.setRed(Long.valueOf(1L));
                                        statusCountDto.getRedKpi().add(kpidto);
                                    }
                                }
                                if (statuslight.equals("lightgreen fas fa-flag")) {
                                    Long lightgreen = statusCountDto.getLightgreen();
                                    if (lightgreen != null) {
                                        statusCountDto.setLightgreen(Long.valueOf(lightgreen + 1L));
                                        statusCountDto.getLightgreenKpi().add(kpidto);
                                    } else {
                                        statusCountDto.setLightgreen(Long.valueOf(1L));
                                        statusCountDto.getLightgreenKpi().add(kpidto);
                                    }
                                }
                                if (statuslight.equals("green fas fa-flag")) {
                                    Long green = statusCountDto.getGreen();
                                    if (green != null) {
                                        statusCountDto.setGreen(Long.valueOf(green + 1L));
                                        statusCountDto.getGreenKpi().add(kpidto);
                                    } else {
                                        statusCountDto.setGreen(Long.valueOf(1L));
                                        statusCountDto.getGreenKpi().add(kpidto);
                                    }
                                }
                                if (statuslight.equals("yellow fas fa-flag")) {
                                    Long yellow = statusCountDto.getAmber();
                                    if (yellow != null) {
                                        statusCountDto.setAmber(Long.valueOf(yellow + 1L));
                                        statusCountDto.getAmberKpi().add(kpidto);
                                    } else {
                                        statusCountDto.setAmber(Long.valueOf(1L));
                                        statusCountDto.getAmberKpi().add(kpidto);
                                    }
                                }
                                if (statuslight.equals("lightred fas fa-flag")) {
                                    Long lightred = statusCountDto.getLightred();
                                    if (lightred != null) {
                                        statusCountDto.setLightred(Long.valueOf(lightred + 1L));
                                        statusCountDto.getLightredKpi().add(kpidto);
                                    } else {
                                        statusCountDto.setLightred(Long.valueOf(1L));
                                        statusCountDto.getLightredKpi().add(kpidto);
                                    }
                                }
                                statucountMap.put(childto.getChildId(), statusCountDto);
                            } else {
                                statusCountDto.setId(childto.getChildId());
                                statusCountDto.setParentId(childto.getParentId().longValue());
                                if (statuslight.equals("red fas fa-flag")) {
                                    statusCountDto.getRedKpi().add(kpidto);
                                    statusCountDto.setRed(Long.valueOf(1L));
                                    statusCountDto.setAmber(Long.valueOf(0L));
                                    statusCountDto.setGreen(Long.valueOf(0L));
                                    statusCountDto.setLightgreen(Long.valueOf(0L));
                                    statusCountDto.setLightred(Long.valueOf(0L));
                                }
                                if (statuslight.equals("lightred fas fa-flag")) {
                                    statusCountDto.getLightredKpi().add(kpidto);
                                    statusCountDto.setLightred(Long.valueOf(1L));
                                    statusCountDto.setAmber(Long.valueOf(0L));
                                    statusCountDto.setGreen(Long.valueOf(0L));
                                    statusCountDto.setLightgreen(Long.valueOf(0L));
                                    statusCountDto.setRed(Long.valueOf(0L));
                                }
                                if (statuslight.equals("green fas fa-flag")) {
                                    statusCountDto.getGreenKpi().add(kpidto);
                                    statusCountDto.setGreen(Long.valueOf(1L));
                                    statusCountDto.setAmber(Long.valueOf(0L));
                                    statusCountDto.setLightred(Long.valueOf(0L));
                                    statusCountDto.setLightgreen(Long.valueOf(0L));
                                    statusCountDto.setRed(Long.valueOf(0L));
                                }
                                if (statuslight.equals("yellow")) {
                                    statusCountDto.getAmberKpi().add(kpidto);
                                    statusCountDto.setAmber(Long.valueOf(1L));
                                    statusCountDto.setGreen(Long.valueOf(0L));
                                    statusCountDto.setLightred(Long.valueOf(0L));
                                    statusCountDto.setLightgreen(Long.valueOf(0L));
                                    statusCountDto.setRed(Long.valueOf(0L));
                                }
                                if (statuslight.equals("lightgreen fas fa-flag")) {
                                    statusCountDto.getLightgreenKpi().add(kpidto);
                                    statusCountDto.setLightgreen(Long.valueOf(1L));
                                    statusCountDto.setGreen(Long.valueOf(0L));
                                    statusCountDto.setLightred(Long.valueOf(0L));
                                    statusCountDto.setAmber(Long.valueOf(0L));
                                    statusCountDto.setRed(Long.valueOf(0L));
                                }
                            }
                            statucountMap.put(childto.getChildId(), statusCountDto);
                        }
                    }
                }
            }
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
            for (Long value : (java.util.List<Long>)deptId) {
                stringList.add(String.valueOf(value));
            }
            commaSeparatedString = String.join((CharSequence)",", stringList);
            url = this.dbUrl + "/employeeDetailsList";
            pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("emplist", new Object[]{stringList}).toUriString();
            parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
            List employees = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
            for (Employee employee : (java.util.List<Employee>)employees) {
                namemapping.put(employee.getEmpId(), employee.getFirstName());
            }
        } else {
            stringList = new ArrayList<String>();
            for (Long value : (java.util.List<Long>)deptId) {
                stringList.add(String.valueOf(value));
            }
            commaSeparatedString = String.join((CharSequence)",", stringList);
            url = this.dbUrl + "/dept_detailsby_List";
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
            for (Long key : (java.util.List<Long>)keysList) {
                java.util.List<ChildStatusCountDto> childStatusCountDtos;
                StatusCountDto statusCountDto = new StatusCountDto();
                ChildStatusCountDto childStatusCountDto = childstatusMapping.get(key);
                String childName = (String)namemapping.get(key);
                String parentName = (String)namemapping.get(childStatusCountDto.getParentId());
                childStatusCountDto.setChildName(childName);
                if (mappingMap.get(childStatusCountDto.getParentId()) != null) {
                    statusCountDto = (StatusCountDto)mappingMap.get(childStatusCountDto.getParentId());
                    if (statusCountDto.getChildStatusCount() != null) {
                        childStatusCountDtos = statusCountDto.getChildStatusCount();
                        childStatusCountDtos.add(childStatusCountDto);
                        statusCountDto.setChildStatusCount(childStatusCountDtos);
                        mappingMap.put(childStatusCountDto.getParentId(), statusCountDto);
                        continue;
                    }
                    childStatusCountDtos = new ArrayList<ChildStatusCountDto>();
                    childStatusCountDtos.add(childStatusCountDto);
                    statusCountDto.setChildStatusCount(childStatusCountDtos);
                    mappingMap.put(childStatusCountDto.getParentId(), statusCountDto);
                    continue;
                }
                statusCountDto.setId(childStatusCountDto.getParentId());
                statusCountDto.setParentName((String)namemapping.get(childStatusCountDto.getParentId()));
                childStatusCountDtos = new ArrayList();
                childStatusCountDtos.add(childStatusCountDto);
                statusCountDto.setChildStatusCount(childStatusCountDtos);
                mappingMap.put(childStatusCountDto.getParentId(), statusCountDto);
            }
            List<StatusCountDto> statusCountDto_list = mappingMap.entrySet().stream().map(Value2 -> (StatusCountDto)Value2.getValue()).collect(Collectors.toList());
            return statusCountDto_list;
        }
        return null;
    }

    private Long incrementCount(Long count) {
        if (count == null) {
            return 1L;
        }
        return count + 1L;
    }

    private void initializeStatusCountDto(ChildStatusCountDto dto) {
        dto.setRed(Long.valueOf(0L));
        dto.setAmber(Long.valueOf(0L));
        dto.setGreen(Long.valueOf(0L));
        dto.setLightred(Long.valueOf(0L));
        dto.setLightgreen(Long.valueOf(0L));
        dto.setRedKpi(new ArrayList());
        dto.setAmberKpi(new ArrayList());
        dto.setGreenKpi(new ArrayList());
        dto.setLightredKpi(new ArrayList());
        dto.setLightgreenKpi(new ArrayList());
    }

    public List<StatusCountDto> blankkpi(Long id, String period) {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = this.dashBoardPreferencesService.retrieveDashBoardPreferences(id);
        ArrayList<Long> deptlist = new ArrayList<Long>();
        ArrayList<Long> emplist = new ArrayList<Long>();
        if (dashBoardPreferencesDTO != null && dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("type").equals("blankkpireports")) {
            String scorecard = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("scorecard");
            String daterange = (String)dashBoardPreferencesDTO.getDashBoardPreferencesValue().get("datarangechart");
            if (daterange != null) {
                period = daterange;
            }
            String url = this.dbUrl + "/scorecardList";
            List scoreCardDetailsDTOList = new ArrayList();
            if (scorecard.contains(",")) {
                String[] scoresArray = scorecard.split(",");
                List<String> scoresList = Arrays.asList(scoresArray);
                for (String score : (java.util.List<String>)scoresList) {
                    UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardid", new Object[]{score}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
                    List scoreCardDetailsDTOList_tmp = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
                    System.out.println(pageURL.toUriString());
                    if (scoreCardDetailsDTOList_tmp == null || scoreCardDetailsDTOList_tmp.size() <= 0) continue;
                    scoreCardDetailsDTOList.addAll(scoreCardDetailsDTOList_tmp);
                }
            } else {
                UriComponentsBuilder pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardid", new Object[]{scorecard}).queryParam("dateRange", new Object[]{period});
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
                scoreCardDetailsDTOList = (List)this.commonRestTemplate.getForObject(pageURL.toUriString(), (ParameterizedTypeReference)parameterizedTypeReference);
            }
            System.out.println("Size of Score card list  :: " + scoreCardDetailsDTOList.size());
            ConcurrentHashMap statucountMap = new ConcurrentHashMap();
            Long empId = Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID"));
            String url_childtracker = this.dbUrl + "/childtrackerlist";
            UriComponentsBuilder url_childtracker_data = UriComponentsBuilder.fromHttpUrl((String)url_childtracker).queryParam("orgid", new Object[]{empId}).queryParam("period", new Object[]{period}).queryParam("upgrade", new Object[]{"1"}).queryParam("orgtype", new Object[]{Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID"))});
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
            List childTrackerDTOList = (List)this.commonRestTemplate.getForObject(url_childtracker_data.toUriString(), new org.springframework.core.ParameterizedTypeReference<java.util.List<com.estrat.backend.scorecard.dto.ChildTrackerDTO>>() {});
            for (ChildTrackerDTO childTrackerDTO : (java.util.List<ChildTrackerDTO>)childTrackerDTOList) {
                if (childTrackerDTO.getType().equals("Department")) {
                    if (deptlist.contains(childTrackerDTO.getChildId())) continue;
                    deptlist.add(childTrackerDTO.getChildId());
                    deptlist.add(childTrackerDTO.getParentId());
                    continue;
                }
                if (emplist.contains(childTrackerDTO.getChildId())) continue;
                emplist.add(childTrackerDTO.getChildId());
                emplist.add(childTrackerDTO.getParentId());
            }
            System.out.println("Department List ::: " + deptlist);
            HashMap capturedUserCtx = UserThreadLocal.get() != null ? new HashMap(UserThreadLocal.get()) : new HashMap();
            HashMap capturedKpiCtx = new HashMap(KPIThreadLocal.get());
            String periodFinal = period;
            Long empIdFinal = empId;
            ArrayList<CompletableFuture<Void>> deptFutures = new ArrayList<CompletableFuture<Void>>();
            for (ScoreCardDetailsDTO scoreCardDetailsDTO : (java.util.List<ScoreCardDetailsDTO>)scoreCardDetailsDTOList) {
                ChildTrackerDTO childtoResolved = null;
                for (ChildTrackerDTO childTrackerDTO : (java.util.List<ChildTrackerDTO>)childTrackerDTOList) {
                    if (!childTrackerDTO.getChildId().equals(scoreCardDetailsDTO.getDepartmentId())) continue;
                    childtoResolved = childTrackerDTO;
                    break;
                }
                if (childtoResolved == null || scoreCardDetailsDTO.getScoreCardDTOS() == null) continue;
                ChildTrackerDTO childto = childtoResolved;
                deptFutures.add(CompletableFuture.runAsync(() -> {
                    UserThreadLocal.set((Map)capturedUserCtx);
                    KPIThreadLocal.set((Map)capturedKpiCtx);
                    try {
                        for (ScoreCardDTO scorecardDto : scoreCardDetailsDTO.getScoreCardDTOS()) {
                            if (scorecardDto.getObjectiveList() == null) continue;
                            for (ObjectivesDTO obj : scorecardDto.getObjectiveList()) {
                                if (obj == null || obj.getKpiList() == null) continue;
                                for (KPIDTO kpidto : obj.getKpiList()) {
                                    Map submap;
                                    if (childto.getType().equals("Department")) {
                                        kpidto.setDepartmentId(scoreCardDetailsDTO.getDepartmentId().longValue());
                                        submap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", String.valueOf(empIdFinal), periodFinal);
                                    } else {
                                        submap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", String.valueOf(childto.getChildId()), periodFinal);
                                    }
                                    BigDecimal actual = Objects.nonNull(submap.get("actual")) ? new BigDecimal(submap.get("actual").toString()) : BigDecimal.ZERO;
                                    statucountMap.compute(childto.getChildId(), (key, existing) -> {
                                        ChildStatusCountDto dto;
                                        ChildStatusCountDto childStatusCountDto = dto = existing != null ? (ChildStatusCountDto)existing : new ChildStatusCountDto();
                                        if (dto.getBlankpiList() == null) {
                                            dto.setBlankpiList(new ArrayList());
                                            dto.setBlankkpi(Long.valueOf(0L));
                                        }
                                        dto.setId(childto.getChildId());
                                        dto.setParentId(childto.getParentId().longValue());
                                        if (actual.doubleValue() == 0.0) {
                                            dto.setBlankkpi(Long.valueOf((dto.getBlankkpi() != null ? dto.getBlankkpi() : 0L) + 1L));
                                            dto.getBlankpiList().add(kpidto);
                                        }
                                        return dto;
                                    });
                                }
                            }
                        }
                    }
                    catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    finally {
                        UserThreadLocal.set(null);
                        KPIThreadLocal.set(null);
                    }
                }, (Executor)this.scoreCardExecutor));
            }
            CompletableFuture.allOf(deptFutures.toArray(new CompletableFuture[0])).join();
            return this.getStatusCountMapping(emplist, deptlist, statucountMap);
        }
        return null;
    }

    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateDetails(ScoreCardDTO scoreCard) {
        String url = this.dbUrl + "/scorecard";
        ScoreCardResponseDTO scoreCard1 = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, (Object)scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity((Object)scoreCard1, HttpStatus.OK);
    }

    public ResponseEntity<ScoreCardResponseDTO> saveScoreCardDetails(ScoreCardDetailsDTO scoreCard) {
        String url = this.dbUrl + "/scorecardDetails";
        ScoreCardResponseDTO scoreCard1 = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, (Object)scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity((Object)scoreCard1, HttpStatus.OK);
    }

    public ResponseEntity<ScoreCardResponseDTO> updateScoreCardDetails(ScoreCardDetailsDTO scoreCard) {
        String url = this.dbUrl + "/scorecardDetails";
        ScoreCardResponseDTO scoreCard1 = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, (Object)scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity((Object)scoreCard1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteDeptDetails(long id) {
        String url = this.dbUrl + "/scorecard/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    public ResponseEntity<Map<String, Object>> checkScoreName(long empId, String scoreName, String pageId) {
        String url = this.dbUrl + "/checkScoreName/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorename", new Object[]{scoreName}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)map, HttpStatus.OK);
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListByEmpId(long empId) {
        String url = this.dbUrl + "/scoreCardDetailListByEmpId/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListByDeptId(long deptId) {
        String url = this.dbUrl + "/scoreCardDetailListByDeptId/{deptId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> scoreCardListByEmpId(long empId) {
        String url = this.dbUrl + "/checkscoreCardListByEmpId/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> scoreCardListByDeptId() {
        String url = this.dbUrl + "/checkscoreCardListByDeptId";
        HashMap<String, String> urlVariables = new HashMap<String, String>();
        urlVariables.put("deptId", "");
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> getscoreCardListByDeptId(String deptIds) {
        String url = this.dbUrl + "/getcheckscoreCardListByDeptId";
        HashMap<String, String> urlVariables = new HashMap<String, String>();
        urlVariables.put("deptIds", deptIds);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> formScoreCardDetailList(long empId) {
        String url = this.dbUrl + "/formScoreCardDetailList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> scoreCardListFindScore(long empId, String dateRange) {
        String url = this.dbUrl + "/scoreCardListFindScore/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public Map<String, String> checkScoreCardData(long empId, String pageId) {
        String url = this.dbUrl + "/checkScoreCardData/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ResponseEntity<Map<String, Object>> changeScoreName(String scorecardId, String name) {
        String url = this.dbUrl + "/changePerspectiveName";
        HashMap urlVariables = new HashMap();
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardId", new Object[]{scorecardId}).queryParam("name", new Object[]{name}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.commonRestTemplate.putForObject(pageURL, null, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)map, HttpStatus.OK);
    }
}

