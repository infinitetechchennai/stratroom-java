/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.RiskCustomScoreDto
 *  com.estrat.backend.scorecard.dto.RiskDTO
 *  com.estrat.backend.scorecard.dto.RiskDashBoardResponseDTO
 *  com.estrat.backend.scorecard.dto.RiskEventDTO
 *  com.estrat.backend.scorecard.dto.RiskEventNameCountDto
 *  com.estrat.backend.scorecard.dto.RiskOptionsDto
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.service.DashBoardPreferencesService
 *  com.estrat.backend.scorecard.service.RiskDetailsService
 *  com.estrat.backend.scorecard.service.RiskDetailsService$1
 *  com.estrat.backend.scorecard.service.RiskDetailsService$10
 *  com.estrat.backend.scorecard.service.RiskDetailsService$11
 *  com.estrat.backend.scorecard.service.RiskDetailsService$12
 *  com.estrat.backend.scorecard.service.RiskDetailsService$13
 *  com.estrat.backend.scorecard.service.RiskDetailsService$14
 *  com.estrat.backend.scorecard.service.RiskDetailsService$15
 *  com.estrat.backend.scorecard.service.RiskDetailsService$16
 *  com.estrat.backend.scorecard.service.RiskDetailsService$17
 *  com.estrat.backend.scorecard.service.RiskDetailsService$18
 *  com.estrat.backend.scorecard.service.RiskDetailsService$2
 *  com.estrat.backend.scorecard.service.RiskDetailsService$3
 *  com.estrat.backend.scorecard.service.RiskDetailsService$4
 *  com.estrat.backend.scorecard.service.RiskDetailsService$5
 *  com.estrat.backend.scorecard.service.RiskDetailsService$6
 *  com.estrat.backend.scorecard.service.RiskDetailsService$7
 *  com.estrat.backend.scorecard.service.RiskDetailsService$8
 *  com.estrat.backend.scorecard.service.RiskDetailsService$9
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.RiskCustomScoreDto;
import com.estrat.backend.scorecard.dto.RiskDTO;
import com.estrat.backend.scorecard.dto.RiskDashBoardResponseDTO;
import com.estrat.backend.scorecard.dto.RiskEventDTO;
import com.estrat.backend.scorecard.dto.RiskEventNameCountDto;
import com.estrat.backend.scorecard.dto.RiskOptionsDto;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.service.DashBoardPreferencesService;
import com.estrat.backend.scorecard.service.RiskDetailsService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.risk.url}")
    private String riskUrl;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbservice.kpi.risklist.list.url}")
    private String kpiRiskList;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;

    public RiskResponseDTO saveRisk(RiskDTO initiativesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)initiativesDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRisk(RiskDTO riskDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskDTO, RiskResponseDTO.class);
    }

    public RiskDTO retrieveRiskDetails(Long id, boolean flag) {
        String retrieveRiskDetailsUrl = this.dbUrl + "risk/" + id;
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveRiskDetailsUrl).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVariables).toUriString();
        return (RiskDTO)this.commonRestTemplate.getForObject(url, RiskDTO.class);
    }

    public void removeRiskDetails(Long id) {
        String url = this.dbUrl + "risk/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskDTO> findAll(long empId, String pageId, String dateRange, String type) {
        String url1 = this.dbUrl + "riskList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("type", new Object[]{type}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> findAllView(String pageId, String dateRange, String type) {
        String url1 = this.dbUrl + "riskListView";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("type", new Object[]{type}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> findAllByEmpId(long empId, String dateRange) {
        String url1 = this.dbUrl + "riskListByEmpId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> riskCodeList(long empId, String dateRange) {
        String url1 = this.dbUrl + "riskCodeListByEmpId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> findImpactedRiskDetails(long kpiId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiRiskList).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> riskListByDeptId(long deptId) {
        String url1 = this.dbUrl + "riskListByDeptId/" + deptId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> riskListWithChild(long empId, String riskIds, String dateRange) {
        String url = this.dbUrl + "/riskListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskIds", new Object[]{riskIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskDTO> allRiskList(long empId, String pageId, String dateRange) {
        String url1 = this.dbUrl + "allRiskList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> riskHistoryList(Long riskId, Long version) {
        String url = this.dbUrl + "/riskhistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskId", new Object[]{riskId}).queryParam("version", new Object[]{version}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskEventDTO> riskEventHistoryList(Long eventId, Long version) {
        String url = this.dbUrl + "/riskEventhistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("eventId", new Object[]{eventId}).queryParam("version", new Object[]{version}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskOptionsDto> riskOptionsList() {
        String url = this.dbUrl + "riskoptionlist";
        return (List)this.commonRestTemplate.getForObject(url, List.class);
    }

    public List<RiskCustomScoreDto> riskCustomScoreList() {
        String url = this.dbUrl + "riskcustomscore";
        return (List)this.commonRestTemplate.getForObject(url, List.class);
    }

    public ResponseEntity<?> riskCustomScore(RiskCustomScoreDto riskcustomScore) {
        String url = this.dbUrl + "riskcustomscore";
        return this.commonRestTemplate.putForObject(url, (Object)riskcustomScore);
    }

    public ResponseEntity<?> riskOptions(RiskOptionsDto riskOptions) {
        String url = this.dbUrl + "riskoptions";
        return this.commonRestTemplate.postForObject(url, (Object)riskOptions);
    }

    public void deleteEvent(String eventId) {
        String url1 = this.dbUrl + "riskevent";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("eventId", new Object[]{eventId}).toUriString();
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskEventDTO> findByEventPageId(long pageId, String dateRange, String status) {
        String url1 = this.dbUrl + "riskeventlist";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("status", new Object[]{status}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskEventDTO findByEventId(long eventId) {
        String url1 = this.dbUrl + "riskeventbyid";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("eventId", new Object[]{eventId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (RiskEventDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ResponseEntity<?> riskeventadd(RiskEventDTO riskeventdto) {
        String url = this.dbUrl + "riskevent";
        return this.commonRestTemplate.postForObject(url, (Object)riskeventdto);
    }

    public ResponseEntity<?> riskeventput(RiskEventDTO riskeventdto) {
        String url = this.dbUrl + "riskevent";
        return this.commonRestTemplate.putForObject(url, (Object)riskeventdto);
    }

    public List<RiskEventDTO> riskEventListWithChild(long empId, String pageIds, String dateRange) {
        String url = this.dbUrl + "/riskEventListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskEventDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskEventDTOList;
    }

    public List<RiskEventDTO> riskEventListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/riskEventListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> statusCount(String pageIds, String dateRange) {
        String url_val = this.dbUrl + "/riskStatusCountwithPageId";
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskDTO> ermRiskListWithChild(long empId, String pageIds, String dateRange) {
        String url = this.dbUrl + "/ermRiskListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskEventNameCountDto> findRiskEventFreCountList(String pageIds, String dateRange, String limit) {
        String url_val = this.dbUrl + "/riskEventFrequencyCount";
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).queryParam("limit", new Object[]{limit}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskDashBoardResponseDTO riskDashBoardData(long deptId) {
        String url1 = this.dbUrl + "/riskDashBoardData";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("deptId", new Object[]{deptId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (RiskDashBoardResponseDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

