/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskCustomScoreDto
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskDashBoardResponseDTO
 *  com.estrat.web.dto.RiskEventDTO
 *  com.estrat.web.dto.RiskEventNameCountDto
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskOptionsDto
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.dto.RiskStatusCountDto
 *  com.estrat.web.dto.SubRiskStatusCountDto
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.RiskActivitiesService
 *  com.estrat.web.service.RiskCauseAndConsequenceService
 *  com.estrat.web.service.RiskCommentsService
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.service.RiskDetailsService$1
 *  com.estrat.web.service.RiskDetailsService$10
 *  com.estrat.web.service.RiskDetailsService$11
 *  com.estrat.web.service.RiskDetailsService$12
 *  com.estrat.web.service.RiskDetailsService$13
 *  com.estrat.web.service.RiskDetailsService$14
 *  com.estrat.web.service.RiskDetailsService$15
 *  com.estrat.web.service.RiskDetailsService$16
 *  com.estrat.web.service.RiskDetailsService$17
 *  com.estrat.web.service.RiskDetailsService$18
 *  com.estrat.web.service.RiskDetailsService$19
 *  com.estrat.web.service.RiskDetailsService$2
 *  com.estrat.web.service.RiskDetailsService$20
 *  com.estrat.web.service.RiskDetailsService$3
 *  com.estrat.web.service.RiskDetailsService$4
 *  com.estrat.web.service.RiskDetailsService$5
 *  com.estrat.web.service.RiskDetailsService$6
 *  com.estrat.web.service.RiskDetailsService$7
 *  com.estrat.web.service.RiskDetailsService$8
 *  com.estrat.web.service.RiskDetailsService$9
 *  com.estrat.web.service.RiskMonitoringService
 *  com.estrat.web.service.RiskPlanService
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskCustomScoreDto;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskDashBoardResponseDTO;
import com.estrat.web.dto.RiskEventDTO;
import com.estrat.web.dto.RiskEventNameCountDto;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskOptionsDto;
import com.estrat.web.dto.RiskPlanDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.dto.RiskStatusCountDto;
import com.estrat.web.dto.SubRiskStatusCountDto;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.RiskActivitiesService;
import com.estrat.web.service.RiskCauseAndConsequenceService;
import com.estrat.web.service.RiskCommentsService;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.service.RiskMonitoringService;
import com.estrat.web.service.RiskPlanService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@SuppressWarnings({"unchecked", "rawtypes"})
@Service
public class RiskDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private RiskActivitiesService riskActivitiesService;
    @Autowired
    private RiskCommentsService riskCommentsService;
    @Autowired
    private RiskMonitoringService riskMonitoringService;
    @Autowired
    private DepartmentDetailsService deptService;
    @Autowired
    private RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Value(value="${scorecardservice.risk.url}")
    private String riskUrl;
    @Value(value="${scorecard.service.url}")
    private String dbUrl;
    @Value(value="${scorecard.kpi.risklist.list.url}")
    private String kpiRiskList;
    private static final Map<String, Integer> scoreRanking = new LinkedHashMap();

    public RiskResponseDTO saveRisk(RiskDTO initiativesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, initiativesDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRisk(RiskDTO riskDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskDTO, RiskResponseDTO.class);
    }

    public RiskDTO retrieveRiskDetails(Long id, boolean flag) {
        String retrieveRiskDetailsUrl = this.dbUrl + "/risk/" + id;
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveRiskDetailsUrl).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVariables).toUriString();
        RiskDTO riskDTO = (RiskDTO)this.commonRestTemplate.getForObject(url, RiskDTO.class);
        riskDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskDTO.getCreatedTime()));
        riskDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskDTO.getUpdatedTime()));
        if (riskDTO != null) {
            this.calculateRiskScores(riskDTO);
        }
        return riskDTO;
    }

    public void calculateRiskScores(RiskDTO riskDTO) {
        String highestCauseScore = null;
        String highestConsequenceScore = null;
        String highestPlanScore = null;
        String highestPossibilityScore = null;
        if (riskDTO.getRiskCauseAndConsequenceList() != null) {
            for (Object _obj_causeConsequence : riskDTO.getRiskCauseAndConsequenceList()) {
                RiskCauseAndConsequenceDTO causeConsequence = (RiskCauseAndConsequenceDTO) _obj_causeConsequence;
                if (causeConsequence.getCauseAndConsequenceValue().get("score") != null) {
                    String causeScore = (String)causeConsequence.getCauseAndConsequenceValue().get("score");
                    System.out.println("Cause Score: " + (String)causeScore);
                    if (highestCauseScore == null || scoreRanking.containsKey(causeScore) && (Integer)scoreRanking.get(causeScore) < scoreRanking.getOrDefault(highestCauseScore, Integer.MAX_VALUE)) {
                        highestCauseScore = causeScore;
                    }
                }
                if (causeConsequence.getConsequenceList() == null) continue;
                for (Object _obj_consequence : causeConsequence.getConsequenceList()) {
                    RiskConsequenceDTO consequence = (RiskConsequenceDTO) _obj_consequence;
                    if (consequence.getConsequenceValue().get("score") == null) continue;
                    String consequenceScore = (String)consequence.getConsequenceValue().get("score");
                    System.out.println("Consequence Score: " + consequenceScore);
                    if (highestConsequenceScore != null && (!scoreRanking.containsKey(consequenceScore) || (Integer)scoreRanking.get(consequenceScore) >= scoreRanking.getOrDefault(highestConsequenceScore, Integer.MAX_VALUE))) continue;
                    highestConsequenceScore = consequenceScore;
                }
            }
            riskDTO.setInherentRiskConsequenceScore(highestConsequenceScore);
            riskDTO.setInherentRiskCauseScore(highestCauseScore);
        } else {
            System.out.println("RiskCauseAndConsequenceList is null");
        }
        if (riskDTO.getRiskPlanList() != null) {
            for (Object _obj_planDto : riskDTO.getRiskPlanList()) {
                RiskPlanDTO planDto = (RiskPlanDTO) _obj_planDto;
                if (planDto.getRiskPlanValue().get("planscore") != null) {
                    String planscore = (String)planDto.getRiskPlanValue().get("planscore");
                    System.out.println("Plan Score: " + (String)planscore);
                    if (highestPlanScore == null || scoreRanking.containsKey(planscore) && (Integer)scoreRanking.get(planscore) < scoreRanking.getOrDefault(highestPlanScore, Integer.MAX_VALUE)) {
                        highestPlanScore = planscore;
                    }
                }
                if (planDto.getRiskActivitiesDTOList() == null) continue;
                for (Object _obj_activitiesDto : planDto.getRiskActivitiesDTOList()) {
                    RiskActivitiesDTO activitiesDto = (RiskActivitiesDTO) _obj_activitiesDto;
                    if (activitiesDto.getRiskActivitiesValue().get("score") == null) continue;
                    String activitiesscore = (String)activitiesDto.getRiskActivitiesValue().get("score");
                    System.out.println("Activity Score: " + activitiesscore);
                    if (highestPossibilityScore != null && (!scoreRanking.containsKey(activitiesscore) || (Integer)scoreRanking.get(activitiesscore) >= scoreRanking.getOrDefault(highestPossibilityScore, Integer.MAX_VALUE))) continue;
                    highestPossibilityScore = activitiesscore;
                }
            }
            riskDTO.setResidualRiskImpactScore(highestPlanScore);
            riskDTO.setResidualRiskPossibiltyScore(highestPossibilityScore);
            String highestScore = null;
            if (highestPlanScore != null && highestPossibilityScore != null) {
                Integer planScoreRank = (Integer)scoreRanking.get(highestPlanScore);
                Integer possibilityScoreRank = (Integer)scoreRanking.get(highestPossibilityScore);
                if (planScoreRank != null && possibilityScoreRank != null) {
                    highestScore = planScoreRank < possibilityScoreRank ? highestPlanScore : highestPossibilityScore;
                } else if (planScoreRank != null) {
                    highestScore = highestPlanScore;
                } else if (possibilityScoreRank != null) {
                    highestScore = highestPossibilityScore;
                }
            } else if (highestPlanScore != null && scoreRanking.containsKey(highestPlanScore)) {
                highestScore = highestPlanScore;
            } else if (highestPossibilityScore != null && scoreRanking.containsKey(highestPossibilityScore)) {
                highestScore = highestPossibilityScore;
            }
            if (highestScore != null) {
                Integer rank = (Integer)scoreRanking.get(highestScore);
                if (rank != null) {
                    String riskStatus = rank >= 1 && rank <= 9 ? "Extreme" : (rank >= 10 && rank <= 17 ? "High" : (rank >= 18 && rank <= 20 ? "Medium" : "Low"));
                    if (riskDTO.getRiskValue() == null) {
                        riskDTO.setRiskValue(new HashMap());
                    }
                    riskDTO.getRiskValue().put("riskStatus", riskStatus);
                }
            } else {
                if (riskDTO.getRiskValue() == null) {
                    riskDTO.setRiskValue(new HashMap());
                }
                riskDTO.getRiskValue().put("riskStatus", "Low");
            }
        } else {
            riskDTO.getRiskValue().put("riskStatus", "Low");
        }
    }

    public List<RiskPlanDTO> retrieveRiskPlanDetails(Long id) {
        return this.riskPlanService.findAllByRiskId(id);
    }

    public List<RiskActivitiesDTO> retrieveRiskActivitiesDetails(Long id) {
        return this.riskActivitiesService.findAllByRiskId(id);
    }

    public List<RiskMonitoringDTO> retrieveRiskMonitoringDetails(Long id) {
        return this.riskMonitoringService.findAllByRiskId(id);
    }

    public List<RiskCommentsDTO> retrieveRiskCommentDetails(Long id) {
        return this.riskCommentsService.findAllByRiskId(id);
    }

    public List<RiskCommentsDTO> findAllByEmpId(Long empId) {
        return this.riskCommentsService.findAllByEmpIdANDFromPage(empId);
    }

    public List<RiskCauseAndConsequenceDTO> retrieveRiskConsequenceDetails(Long id) {
        return this.riskCauseAndConsequenceService.findAllByRiskId(id);
    }

    public void removeRiskDetails(Long id) {
        String url = this.dbUrl + "/risk/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskDTO> findAll(String empId, String pageId, String dateRange, String type) {
        String url1 = this.dbUrl + "/riskList/{empId}";
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("type", new Object[]{type}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        for (Object _obj_riskDTO : riskDTOList) {
            RiskDTO riskDTO = (RiskDTO) _obj_riskDTO;
            riskDTO.setRiskValue(DateUtil.singleDateFormatDates((Map)riskDTO.getRiskValue(), (String)"risk"));
        }
        return riskDTOList;
    }

    public List<RiskDTO> findAllView(String pageId, String dateRange, String type) {
        String url1 = this.dbUrl + "/riskListView";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("type", new Object[]{type}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        for (Object _obj_riskDTO : riskDTOList) {
            RiskDTO riskDTO = (RiskDTO) _obj_riskDTO;
            riskDTO.setRiskValue(DateUtil.singleDateFormatDates((Map)riskDTO.getRiskValue(), (String)"risk"));
        }
        return riskDTOList;
    }

    public List<RiskDTO> findImpactedRiskDetails(long kpiId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiRiskList).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskStatusCountDto> riskStatusCount(List<RiskDTO> riskList) {
        HashMap<Long, SubRiskStatusCountDto> statusCountMap = new HashMap<Long, SubRiskStatusCountDto>();
        for (Object _obj_riskDTO : riskList) {
            RiskDTO riskDTO = (RiskDTO) _obj_riskDTO;
            Map riskValue;
            Long departmentId = riskDTO.getDepartmentId();
            SubRiskStatusCountDto statusCountDto = statusCountMap.getOrDefault(departmentId, new SubRiskStatusCountDto());
            if (statusCountDto.getLowRisk() == null) {
                statusCountDto.setLowRisk(new ArrayList());
            }
            if (statusCountDto.getMediumRisk() == null) {
                statusCountDto.setMediumRisk(new ArrayList());
            }
            if (statusCountDto.getHighRisk() == null) {
                statusCountDto.setHighRisk(new ArrayList());
            }
            if (statusCountDto.getVeryhighRisk() == null) {
                statusCountDto.setVeryhighRisk(new ArrayList());
            }
            if ((riskValue = riskDTO.getRiskValue()).get("riskStatus") != null) {
                String status = riskValue.get("riskStatus").toString();
                System.out.println("Status is ::: " + status);
                switch (status.toLowerCase()) {
                    case "very low": 
                    case "low": {
                        statusCountDto.setLow(statusCountDto.getLow() + 1L);
                        statusCountDto.getLowRisk().add(riskDTO);
                        break;
                    }
                    case "medium": {
                        statusCountDto.setMedium(statusCountDto.getMedium() + 1L);
                        statusCountDto.getMediumRisk().add(riskDTO);
                        break;
                    }
                    case "high": {
                        statusCountDto.setHigh(statusCountDto.getHigh() + 1L);
                        statusCountDto.getHighRisk().add(riskDTO);
                        break;
                    }
                    case "extreme": {
                        statusCountDto.setExtreme(statusCountDto.getExtreme() + 1L);
                        statusCountDto.getVeryhighRisk().add(riskDTO);
                    }
                }
            }
            statusCountDto.setId(departmentId.longValue());
            statusCountMap.put(departmentId, statusCountDto);
            System.out.println("Status Count :: " + departmentId + " Low==> " + statusCountDto.getLow() + " Medium==> " + statusCountDto.getMedium() + " High==> " + statusCountDto.getHigh() + " Extreme==> " + statusCountDto.getExtreme());
        }
        return this.getRiskStatusCountMapp(statusCountMap);
    }

    public List<RiskStatusCountDto> getRiskStatusCountMapp(Map<Long, SubRiskStatusCountDto> statucountMap) {
        if (statucountMap == null) {
            return null;
        }
        HashMap<Long, RiskStatusCountDto> mappingMap = new HashMap<Long, RiskStatusCountDto>();
        for (Map.Entry<Long, SubRiskStatusCountDto> entry : statucountMap.entrySet()) {
            List<SubRiskStatusCountDto> subRiskStatusList;
            DeptDetails deptname;
            Long key = entry.getKey();
            SubRiskStatusCountDto subRiskCount = entry.getValue();
            RiskStatusCountDto riskStatusCount = mappingMap.getOrDefault(key, new RiskStatusCountDto());
            if (subRiskCount.getId() != 0L && (deptname = this.deptService.findById(Long.valueOf(subRiskCount.getId()))) != null) {
                subRiskCount.setDepartmentName(deptname.getName());
                riskStatusCount.setDepartmentName(deptname.getName());
            }
            if ((subRiskStatusList = riskStatusCount.getStatusCounts()) == null) {
                subRiskStatusList = new ArrayList<SubRiskStatusCountDto>();
                riskStatusCount.setStatusCounts(subRiskStatusList);
            }
            subRiskStatusList.add(subRiskCount);
            riskStatusCount.setId(subRiskCount.getId());
            mappingMap.put(key, riskStatusCount);
        }
        System.out.println("Mapping ::: " + mappingMap);
        return new ArrayList<RiskStatusCountDto>(mappingMap.values());
    }

    public List<Map> findAllRiskDetailsByTableFormat(long empId) {
        String url = this.dbUrl + "/riskListByEmpId/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        ArrayList<Map> mapArrayList = new ArrayList<Map>();
        for (Object _obj_riskDTO : riskDTOList) {
            RiskDTO riskDTO = (RiskDTO) _obj_riskDTO;
            HashMap<String, Long> subMap = new HashMap<String, Long>();
            subMap.put("status", riskDTO.getId());
            subMap.put("id", riskDTO.getId());
            subMap.put("name", (Long)riskDTO.getRiskValue().get("name"));
            subMap.put("riskcategory", (Long)riskDTO.getRiskValue().get("riskcategory"));
            subMap.put("impact", (Long)riskDTO.getRiskValue().get("impact"));
            subMap.put("likeliHood", (Long)riskDTO.getRiskValue().get("likeliHood"));
            subMap.put("score", (Long)riskDTO.getRiskValue().get("score"));
            subMap.put("dateRaised", (Long)riskDTO.getRiskValue().get("dateRaised"));
            subMap.put("nextAssessment", (Long)riskDTO.getRiskValue().get("nextAssessment"));
            subMap.put("pageId", riskDTO.getPageId());
            mapArrayList.add(subMap);
        }
        return mapArrayList;
    }

    public List<RiskDTO> findAllRiskDetailsByEmpId(long empId, String dateRange) {
        String url1 = this.dbUrl + "/riskListByEmpId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskDTO> riskCodeList(long empId, String dateRange) {
        String url1 = this.dbUrl + "/riskCodeListByEmpId/" + empId;
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskDTO> riskListByDeptId(long deptId) {
        String url = this.dbUrl + "/riskListByDeptId/" + deptId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskDTO> riskListWithChild(long empId, String riskIds, String dateRange) {
        String url = this.dbUrl + "/riskListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskIds", new Object[]{riskIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        List<RiskDTO> riskwithStatus = ((List<RiskDTO>)riskDTOList).stream().map(v -> {
            this.calculateRiskScores(v);
            System.out.println(v.getRiskValue().get("riskStatus"));
            return v;
        }).collect(Collectors.toList());
        return riskwithStatus;
    }

    public List<RiskDTO> riskHeadListWithChild(long empId, String riskIds, int limit, String dateRange) {
        String url = this.dbUrl + "/riskListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskIds", new Object[]{riskIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        HashMap<String, Integer> rankMapping = new HashMap<String, Integer>();
        String[] ranks = new String[]{"E5", "E4", "D5", "D4", "E3", "C5", "E2", "B5", "A5", "D3", "C4", "C3", "D2", "B4", "E1", "D1", "A4", "C2", "B3", "C1", "A3", "B2", "A2", "B1", "A1"};
        for (int i = 0; i < ranks.length; ++i) {
            rankMapping.put(ranks[i], i);
        }
        List<RiskDTO> riskscoredDTO = ((List<RiskDTO>)riskDTOList).stream().peek(arg_0 -> this.calculateRiskScores(arg_0)).sorted(Comparator.comparingInt(v -> {
            if (v != null && v.getResidualRiskImpactScore() != null) {
                System.out.println(v.getResidualRiskImpactScore() + " ::::: " + rankMapping.getOrDefault(v.getResidualRiskImpactScore(), Integer.MAX_VALUE));
                return rankMapping.getOrDefault(v.getResidualRiskImpactScore(), Integer.MAX_VALUE);
            }
            return Integer.MAX_VALUE;
        })).limit(limit != -1 ? (long)limit : Long.MAX_VALUE).collect(Collectors.toList());
        return riskscoredDTO;
    }

    public List<RiskDTO> allRiskList(String empId, String pageId, String dateRange) {
        String url1 = this.dbUrl + "/allRiskList/{empId}";
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskOptionsDto> riskOptionsList() {
        String url = this.dbUrl + "riskoptionlist";
        return (List)this.commonRestTemplate.getForObject(url, List.class);
    }

    public List<RiskDTO> riskHistoryList(Long riskId, Long version) {
        String url = this.dbUrl + "/riskhistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskId", new Object[]{riskId}).queryParam("version", new Object[]{version}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskEventDTO> riskEventHistoryList(Long eventId, Long version) {
        String url = this.dbUrl + "/riskEventhistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("eventId", new Object[]{eventId}).queryParam("version", new Object[]{version}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskCustomScoreDto> riskCustomScoreList() {
        String url = this.dbUrl + "riskcustomscore";
        return (List)this.commonRestTemplate.getForObject(url, List.class);
    }

    public ResponseEntity<?> riskCustomScore(RiskCustomScoreDto riskcustomScore) {
        String url = this.dbUrl + "riskcustomscore";
        return this.commonRestTemplate.putForObject(url, riskcustomScore);
    }

    public ResponseEntity<?> riskOptions(RiskOptionsDto riskOptions) {
        String url = this.dbUrl + "riskoptions";
        return this.commonRestTemplate.postForObject(url, riskOptions);
    }

    public void deleteEvent(String eventId) {
        String url1 = this.dbUrl + "riskevent";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("eventId", new Object[]{eventId}).toUriString();
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskEventDTO> findByEventPageId(long pageId, String dateRange, String status) {
        String url1 = this.dbUrl + "riskeventlist";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("status", new Object[]{status}).toUriString();
        System.out.println(url);
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskEventDTO findByEventId(long eventId) {
        String url1 = this.dbUrl + "riskeventbyid";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("eventId", new Object[]{eventId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (RiskEventDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ResponseEntity<?> riskeventadd(RiskEventDTO riskeventdto) {
        String url = this.dbUrl + "riskevent";
        return this.commonRestTemplate.postForObject(url, riskeventdto);
    }

    public ResponseEntity<?> riskeventput(RiskEventDTO riskeventdto) {
        String url = this.dbUrl + "riskevent";
        return this.commonRestTemplate.putForObject(url, riskeventdto);
    }

    public List<RiskEventDTO> riskEventListWithChild(long empId, String pageIds, String dateRange) {
        String url = this.dbUrl + "/riskEventListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskEventDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskEventDTOList;
    }

    public List<RiskEventDTO> riskEventListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/riskEventListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskStatusCountDto> statusCount(String pageIds, String dateRange) {
        String url_val = this.dbUrl + "/riskStatusCountwithPageId";
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        List riskwithStatus = ((List<RiskDTO>)riskDTOList).stream().map(v -> {
            this.calculateRiskScores(v);
            System.out.println(v.getRiskValue().get("riskStatus"));
            return v;
        }).collect(Collectors.toList());
        return this.riskStatusCount(riskwithStatus);
    }

    public List<RiskDTO> ermRiskListWithChild(long empId, String pageIds, int limit, String dateRange) {
        String url = this.dbUrl + "/ermRiskListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        HashMap<String, Integer> rankMapping = new HashMap<String, Integer>();
        String[] ranks = new String[]{"E5", "E4", "D5", "D4", "E3", "C5", "E2", "B5", "A5", "D3", "C4", "C3", "D2", "B4", "E1", "D1", "A4", "C2", "B3", "C1", "A3", "B2", "A2", "B1", "A1"};
        for (int i = 0; i < ranks.length; ++i) {
            rankMapping.put(ranks[i], i);
        }
        List<RiskDTO> riskscoredDTO = ((List<RiskDTO>)riskDTOList).stream().peek(arg_0 -> this.calculateRiskScores(arg_0)).sorted(Comparator.comparingInt(v -> {
            if (v != null && v.getResidualRiskImpactScore() != null) {
                System.out.println(v.getResidualRiskImpactScore() + " ::::: " + rankMapping.getOrDefault(v.getResidualRiskImpactScore(), Integer.MAX_VALUE));
                return rankMapping.getOrDefault(v.getResidualRiskImpactScore(), Integer.MAX_VALUE);
            }
            return Integer.MAX_VALUE;
        })).limit(limit != -1 ? (long)limit : Long.MAX_VALUE).collect(Collectors.toList());
        return riskscoredDTO;
    }

    public List<RiskEventNameCountDto> findRiskEventFreCountList(String pageIds, String dateRange, String limit) {
        String url_val = this.dbUrl + "/riskEventFrequencyCount";
        String url = UriComponentsBuilder.fromHttpUrl((String)url_val).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).queryParam("limit", new Object[]{limit}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskDashBoardResponseDTO riskDashBoardData(long deptId) {
        String url1 = this.dbUrl + "/riskDashBoardData";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("deptId", new Object[]{deptId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (RiskDashBoardResponseDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    static {
        String[] ranks = new String[]{"E5", "E4", "D5", "D4", "E3", "C5", "E2", "B5", "A5", "D3", "C4", "C3", "D2", "B4", "E1", "D1", "A4", "C2", "B3", "C1", "A3", "B2", "A2", "B1", "A1"};
        int rank = 1;
        for (String score : ranks) {
            scoreRanking.put(score, rank++);
        }
    }
}


