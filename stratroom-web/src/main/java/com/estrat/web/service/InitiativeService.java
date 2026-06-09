/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.InitiativeBudgetDTO
 *  com.estrat.web.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.web.dto.InitiativeResponseDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.InitiativesTrackerDTO
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.dto.StatusCountDto
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.service.InitiativeService$1
 *  com.estrat.web.service.InitiativeService$10
 *  com.estrat.web.service.InitiativeService$11
 *  com.estrat.web.service.InitiativeService$12
 *  com.estrat.web.service.InitiativeService$13
 *  com.estrat.web.service.InitiativeService$14
 *  com.estrat.web.service.InitiativeService$15
 *  com.estrat.web.service.InitiativeService$2
 *  com.estrat.web.service.InitiativeService$3
 *  com.estrat.web.service.InitiativeService$4
 *  com.estrat.web.service.InitiativeService$5
 *  com.estrat.web.service.InitiativeService$6
 *  com.estrat.web.service.InitiativeService$7
 *  com.estrat.web.service.InitiativeService$8
 *  com.estrat.web.service.InitiativeService$9
 *  com.estrat.web.service.MilestonesService
 *  com.estrat.web.service.SubInitiativeService
 *  com.estrat.web.util.DateUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.InitiativeBudgetDTO;
import com.estrat.web.dto.InitiativeDashBoardResponseDTO;
import com.estrat.web.dto.InitiativeResponseDTO;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.InitiativesTrackerDTO;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.dto.StatusCountDto;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.service.MilestonesService;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.util.DateUtil;
import com.estrat.web.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@SuppressWarnings({"unchecked", "rawtypes"})
@Service
public class InitiativeService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private SubInitiativeService subInitiativeService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private MilestonesService milestonesService;
    @Value(value="${scorecardservice.initiative.url}")
    private String dbUrl;
    @Value(value="${scorecard.service.url}")
    private String serviceUrl;
    @Value(value="${scorecardservice.getinitiative.url}")
    private String retriveInitiativeUrl;
    @Value(value="${scorecardservice.initiatives.list.url}")
    private String initiativeList;
    @Value(value="${dbservice.kpi.initiatives.list.url}")
    private String kpiInitiativeList;

    public InitiativeResponseDTO saveInitiatives(InitiativesDTO initiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, initiativesDTO, InitiativeResponseDTO.class);
    }

    public Map saveInitiativesData(List<InitiativesTrackerDTO> initiativesDTO) {
        String url = this.serviceUrl + "/initiativestracker";
        return (Map)this.commonRestTemplate.postForObject(url, initiativesDTO, Map.class);
    }

    public Map saveInitiativesBudget(List<InitiativeBudgetDTO> initiativesDTO) {
        String url = this.serviceUrl + "/initiativesbudget";
        return (Map)this.commonRestTemplate.postForObject(url, initiativesDTO, Map.class);
    }

    public Map<String, Long> saveInitiativesTracker(List<InitiativesTrackerDTO> initiativesDTO) {
        String urlString = this.dbUrl + "/initiativestracker";
        return (Map)this.commonRestTemplate.postForObject(urlString, initiativesDTO, Map.class);
    }

    public InitiativeResponseDTO updateInitiatives(InitiativesDTO initiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, initiativesDTO, InitiativeResponseDTO.class);
    }

    public InitiativesDTO retriveInitiatives(Long id, boolean flag) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retriveInitiativeUrl).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVariables).toUriString();
        InitiativesDTO initiativesDTO = (InitiativesDTO)this.commonRestTemplate.getForObject(url, InitiativesDTO.class);
        initiativesDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)initiativesDTO.getCreatedTime()));
        initiativesDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)initiativesDTO.getUpdatedTime()));
        return initiativesDTO;
    }

    public void removeInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<StatusCountDto> statusCount(long id, String period) {
        String url_val = this.serviceUrl + "/initiativestatuscount/" + id;
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("period", new Object[]{period}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<StatusCountDto> progresscount(long id, String period) {
        String url_val = this.serviceUrl + "/initiativeprogresscount/" + id;
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("period", new Object[]{period}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<StatusCountDto> noprogresscount(long id, String period) {
        String url_val = this.serviceUrl + "/initiativenoprogresscount/" + id;
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("period", new Object[]{period}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> findImpactedInitiatives(long kpiId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiInitiativeList).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> findAll(boolean flag, String pageId, String empId, String nodate) {
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.initiativeList).queryParam("loadFlag", new Object[]{flag}).queryParam("nodate", new Object[]{nodate}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List<InitiativesDTO> initiativesDTOList = (List<InitiativesDTO>)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        if (initiativesDTOList == null) {
            initiativesDTOList = Collections.emptyList();
        }
        for (Object _obj_initiativesDTO : initiativesDTOList) {
            InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
            initiativesDTO.setInitiativeValue(DateUtil.formatDates((Map)initiativesDTO.getInitiativeValue(), (String)"initiative"));
        }
        return initiativesDTOList;
    }

    public InitiativesDTO retrieveInitiativeDetailsList(Long empId) {
        InitiativesDTO response = new InitiativesDTO();
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.initiativeList).queryParam("loadFlag", new Object[]{true}).queryParam("nodate", new Object[]{"date"}).queryParam("pageId", new Object[]{""}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        ArrayList subInitiativesDTOS = new ArrayList();
        ArrayList activitiesDTOS = new ArrayList();
        ArrayList milestonesDTOS = new ArrayList();
        List initiativesDTOS = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        if (!initiativesDTOS.isEmpty() && initiativesDTOS != null) {
            for (Object _obj : initiativesDTOS) {
                InitiativesDTO initiativesDTO = (InitiativesDTO) _obj;
                if (initiativesDTO == null) continue;
                if (initiativesDTO.getSubInitiativeList() != null && !initiativesDTO.getSubInitiativeList().isEmpty()) {
                    subInitiativesDTOS.addAll(initiativesDTO.getSubInitiativeList());
                }
                if (initiativesDTO.getActivitiesList() != null && !initiativesDTO.getActivitiesList().isEmpty()) {
                    activitiesDTOS.addAll(initiativesDTO.getActivitiesList());
                }
                if (initiativesDTO.getMileStonesList() == null || initiativesDTO.getMileStonesList().isEmpty()) continue;
                milestonesDTOS.addAll(initiativesDTO.getMileStonesList());
            }
        }
        List subInitiativesDTOList = this.subInitiativeService.findByEmpId(empId.toString());
        if (subInitiativesDTOS != null && !subInitiativesDTOS.isEmpty()) {
            subInitiativesDTOS.addAll(subInitiativesDTOList);
            List dtoList = ((List<SubInitiativesDTO>)subInitiativesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<SubInitiativesDTO>(Comparator.comparing(SubInitiativesDTO::getId)))).stream().collect(Collectors.toList());
            response.setSubInitiativeList(dtoList);
        } else {
            response.setSubInitiativeList(subInitiativesDTOList);
        }
        List activitiesDTOList = this.activitiesService.findByEmpId(empId.toString());
        if (subInitiativesDTOS != null && !subInitiativesDTOS.isEmpty()) {
            activitiesDTOS.addAll(activitiesDTOList);
            List dtoList = ((List<ActivitiesDTO>)activitiesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<ActivitiesDTO>(Comparator.comparing(ActivitiesDTO::getId)))).stream().collect(Collectors.toList());
            response.setActivitiesList(dtoList);
        } else {
            response.setActivitiesList(activitiesDTOList);
        }
        List milestonesDTOList = this.milestonesService.findAllByEmpId(empId.toString());
        if (milestonesDTOList != null && !milestonesDTOList.isEmpty()) {
            milestonesDTOS.addAll(milestonesDTOList);
            List dtoList = ((List<MilestonesDTO>)milestonesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<MilestonesDTO>(Comparator.comparing(MilestonesDTO::getId)))).stream().collect(Collectors.toList());
            response.setMileStonesList(dtoList);
        } else {
            response.setMileStonesList(milestonesDTOList);
        }
        return response;
    }

    public List<InitiativesDTO> findByEmpId(long empId) {
        String url = this.serviceUrl + "/initiativesListByEmpId/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List initiativesDTOS = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initiativesDTOS;
    }

    public List<InitiativesDTO> initiativesListByDeptId(long deptId) {
        String url = this.serviceUrl + "/initiativesListByDeptId/" + deptId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List initiativesDTOS = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initiativesDTOS;
    }

    public List<InitiativesDTO> initiativesListByDeptIds(String deptIds) {
        String url = this.serviceUrl + "/initiativesListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List initiativesDTOS = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return initiativesDTOS;
    }

    public List<InitiativesDTO> initiativesListWithChild(String empId, String initiativeIds, String pageIds, String dateRange) {
        String url = this.serviceUrl + "/initiativesListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("initiativeIds", new Object[]{initiativeIds}).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListWithBudget(String empId, String initiativeIds) {
        String url = this.serviceUrl + "/initiativesListWithBudget/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("initiativeIds", new Object[]{initiativeIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListwithChildByempId() {
        String url = String.valueOf(this.serviceUrl + "/initiativesListwithChildByempId/" + UserThreadLocal.get().getProfile().getEmpId());
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> initiativesListwithChildBydeptId() {
        String url = this.serviceUrl + "/initiativesListwithChildByDeptId";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativesDTO> findAllviewMapList(boolean flag, String pageId, String empId, String nodate) {
        String url = this.serviceUrl + "/initiativeViewList/" + empId;
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String url1 = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("nodate", new Object[]{nodate}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List<InitiativesDTO> initiativesDTOList = (List<InitiativesDTO>)this.commonRestTemplate.getForObject(url1, (ParameterizedTypeReference)parameterizedTypeReference);
        if (initiativesDTOList == null) {
            initiativesDTOList = Collections.emptyList();
        }
        for (Object _obj_initiativesDTO : initiativesDTOList) {
            InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
            initiativesDTO.setInitiativeValue(DateUtil.formatDates((Map)initiativesDTO.getInitiativeValue(), (String)"initiative"));
        }
        return initiativesDTOList;
    }

    public InitiativeDashBoardResponseDTO initiDashBoardData(long deptId) {
        String url1 = this.serviceUrl + "/initiativeDashBoardData";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("deptId", new Object[]{deptId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (InitiativeDashBoardResponseDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


