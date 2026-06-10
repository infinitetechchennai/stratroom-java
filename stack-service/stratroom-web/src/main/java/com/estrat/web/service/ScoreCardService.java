/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.ScoreCardDetailsDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.dto.ScorecardList
 *  com.estrat.web.dto.StatusCountDto
 *  com.estrat.web.service.ScoreCardService
 *  com.estrat.web.service.ScoreCardService$1
 *  com.estrat.web.service.ScoreCardService$10
 *  com.estrat.web.service.ScoreCardService$11
 *  com.estrat.web.service.ScoreCardService$12
 *  com.estrat.web.service.ScoreCardService$13
 *  com.estrat.web.service.ScoreCardService$2
 *  com.estrat.web.service.ScoreCardService$3
 *  com.estrat.web.service.ScoreCardService$4
 *  com.estrat.web.service.ScoreCardService$5
 *  com.estrat.web.service.ScoreCardService$6
 *  com.estrat.web.service.ScoreCardService$7
 *  com.estrat.web.service.ScoreCardService$8
 *  com.estrat.web.service.ScoreCardService$9
 *  com.estrat.web.util.DateUtil
 *  com.estrat.web.util.ScoreCardUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.ScoreCardDetailsDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.dto.ScorecardList;
import com.estrat.web.dto.StatusCountDto;
import com.estrat.web.service.ScoreCardService;
import com.estrat.web.util.DateUtil;
import com.estrat.web.util.ScoreCardUtil;
import com.estrat.web.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ScoreCardService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private ScoreCardUtil scoreCardUtil;

    public ResponseEntity<ScoreCardDTO> getScoreCardDetails(long id) {
        String url = this.scoreCardUrl + "/scorecard/" + id;
        ScoreCardDTO scoreCard = (ScoreCardDTO)this.commonRestTemplate.getForObject(url, ScoreCardDTO.class);
        scoreCard.setCreateDateString(DateUtil.mapToString((LocalDateTime)scoreCard.getCreatedTime()));
        scoreCard.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)scoreCard.getUpdatedTime()));
        return new ResponseEntity(scoreCard, HttpStatus.OK);
    }

    public ResponseEntity<List<StatusCountDto>> getkpistatus(long id, String period) {
        String url = this.scoreCardUrl + "/kpistatuscount/{id}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("period", new Object[]{period}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List statuscountdto = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(statuscountdto, HttpStatus.OK);
    }

    public ResponseEntity<List<StatusCountDto>> blankkpi(long id, String period) {
        String url = this.scoreCardUrl + "/blankkpi/{id}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("period", new Object[]{period}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List statuscountdto = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(statuscountdto, HttpStatus.OK);
    }

    public ScoreCardResponseDTO scoreCardList(long empId, String pageId, boolean flag) {
        String url = this.scoreCardUrl + "/scoreCardList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return scoreCard;
    }

    public ScoreCardResponseDTO scoreCardDetailList(long empId, String pageId, boolean flag) {
        String url = this.scoreCardUrl + "/scoreCardDetailList/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return scoreCard;
    }

    public ScoreCardResponseDTO scoreCardDetailListDept(long deptId, String pageId, boolean flag) {
        String url = this.scoreCardUrl + "/scoreCardDetailListDept/{deptId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return scoreCard;
    }

    public ScoreCardResponseDTO scoreCardListByDate(long empId, String pageId, boolean flag, String dateRange) {
        String url = this.scoreCardUrl + "/scoreCardListByDate/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return scoreCard;
    }

    public List<ScoreCardResponseDTO> scoreCardListByDatePageIds(long empId, String pageId, boolean flag, String dateRange) {
        String url = this.scoreCardUrl + "/scoreCardListByDatePageIds/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public ScoreCardResponseDTO scoreCardListDeptByDate(long deptId, String pageId, boolean flag, String dateRange) {
        String url = this.scoreCardUrl + "/scoreCardListByDateDept/{deptId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return scoreCard;
    }

    public Map<String, ScoreCardDTO> scoreCardMap(long empId, String pageId, boolean flag) {
        String url = this.scoreCardUrl + "/scoreCardList/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("pageId", new Object[]{pageId}).queryParam("statusLightFlag", new Object[]{"false"}).buildAndExpand(urlVaiables).toUriString();
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, ScoreCardResponseDTO.class);
        return this.scoreCardUtil.mapPage(scoreCard.getScoreCardList());
    }

    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateScoreCardDetails(ScoreCardDTO scoreCard, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/scorecard";
            ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, scoreCard, ScoreCardResponseDTO.class);
            return new ResponseEntity(scoreCardResponse, HttpStatus.OK);
        }
        String url = this.scoreCardUrl + "/scorecard";
        ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.putForObject(url, scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity(scoreCardResponse, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteScoreCard(long id) {
        String url = this.scoreCardUrl + "/scorecard/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    public ScoreCardResponseDTO saveOrUpdateImportScoreCardDetails(ScoreCardDTO scoreCard, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/scorecard";
            ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, scoreCard, ScoreCardResponseDTO.class);
            return scoreCardResponse;
        }
        String url = this.scoreCardUrl + "/scorecard";
        ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.putForObject(url, scoreCard, ScoreCardResponseDTO.class);
        return scoreCardResponse;
    }

    public ResponseEntity<ScoreCardResponseDTO> saveScoreCardDetails(ScoreCardDetailsDTO scoreCard) {
        String url = this.scoreCardUrl + "/scorecardDetails";
        ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity(scoreCardResponse, HttpStatus.OK);
    }

    public ResponseEntity<ScoreCardResponseDTO> updateScoreCardDetails(ScoreCardDetailsDTO scoreCard) {
        String url = this.scoreCardUrl + "/scorecardDetails";
        ScoreCardResponseDTO scoreCardResponse = (ScoreCardResponseDTO)this.commonRestTemplate.putForObject(url, scoreCard, ScoreCardResponseDTO.class);
        return new ResponseEntity(scoreCardResponse, HttpStatus.OK);
    }

    public ResponseEntity<Map> checkScoreName(long empId, String scoreName, long pageId) {
        String url = this.scoreCardUrl + "/checkScoreName/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorename", new Object[]{scoreName}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(map, HttpStatus.OK);
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListByEmpId(long empId) {
        String url = this.scoreCardUrl + "/scoreCardDetailListByEmpId/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListByDeptId(long deptId) {
        String url = this.scoreCardUrl + "/scoreCardDetailListByDeptId/{deptId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> scoreCardListByEmpId() {
        String url = String.valueOf(this.scoreCardUrl + "/scoreCardListByEmpId/" + UserThreadLocal.get().getProfile().getEmpId());
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", UserThreadLocal.get().getProfile().getEmpId());
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> scoreCardListByDeptId() {
        String url = this.scoreCardUrl + "/scoreCardListByDeptId";
        HashMap urlVariables = new HashMap();
        urlVariables.put("deptId", "");
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScorecardList> getscoreCardListByDeptId(String deptIds) {
        String url = this.scoreCardUrl + "/getscoreCardListByDeptIds";
        HashMap urlVariables = new HashMap();
        urlVariables.put("deptIds", deptIds);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> formScoreCardDetailList(long empId) {
        String url = this.scoreCardUrl + "/formScoreCardDetailList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public Map<String, String> checkScore(long empId, String dateRange) {
        String url = this.scoreCardUrl + "/checkScore/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, String> checkScoreCardData(long empId, String pageId) {
        String url = this.scoreCardUrl + "/checkScoreCardData/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Long getDeptOwner(Long deptId) {
        String url = this.scoreCardUrl + "/findEmpOwnerByDeptId/" + deptId;
        Long deptDet = (Long)this.commonRestTemplate.getForObject(url, Long.class);
        return deptDet;
    }

    public ResponseEntity<Map> changeScoreName(String scorecardId, String name) {
        String url = this.scoreCardUrl + "/changePerspectiveName";
        HashMap urlVariables = new HashMap();
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("scorecardId", new Object[]{scorecardId}).queryParam("name", new Object[]{name}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.commonRestTemplate.putForObject(pageURL, null, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(map, HttpStatus.OK);
    }
}


