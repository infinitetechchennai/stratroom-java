/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.service.ObjectiveService
 *  com.estrat.web.service.ObjectiveService$1
 *  com.estrat.web.service.ObjectiveService$2
 *  com.estrat.web.service.ObjectiveService$3
 *  com.estrat.web.service.ObjectiveService$4
 *  com.estrat.web.util.DateUtil
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
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.service.ObjectiveService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ObjectiveService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<ObjectivesDTO> getObjectiveDetails(long id) {
        String url = this.scoreCardUrl + "/objectives/" + id;
        ObjectivesDTO objectives = (ObjectivesDTO)this.commonRestTemplate.getForObject(url, ObjectivesDTO.class);
        objectives.setCreateDateString(DateUtil.mapToString((LocalDateTime)objectives.getCreatedTime()));
        objectives.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)objectives.getUpdatedTime()));
        return new ResponseEntity(objectives, HttpStatus.OK);
    }

    public ResponseEntity<List<ObjectivesDTO>> getObjectiveList(long scoreCardID, boolean flag) {
        String url = this.scoreCardUrl + "/objectivesList/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(objectives, HttpStatus.OK);
    }

    public ResponseEntity<List<ObjectivesDTO>> objectivesListByDate(long scoreCardID, boolean flag, String dateRange) {
        String url = this.scoreCardUrl + "/objectivesListByDate/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(objectives, HttpStatus.OK);
    }

    public ResponseEntity<ObjectivesDTO> saveOrUpdateObjectiveDetails(ObjectivesDTO objectives, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/objectives";
            ObjectivesDTO objectives1 = (ObjectivesDTO)this.commonRestTemplate.postForObject(url, objectives, ObjectivesDTO.class);
            return new ResponseEntity(objectives1, HttpStatus.OK);
        }
        String url = this.scoreCardUrl + "/objectives";
        ObjectivesDTO objectives1 = (ObjectivesDTO)this.commonRestTemplate.putForObject(url, objectives, ObjectivesDTO.class);
        return new ResponseEntity(objectives1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteObjectiveDetails(long id) {
        String url = this.scoreCardUrl + "/objectives/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    public List<ObjectivesDTO> getObjectiveListByScoreCardId(long scoreCardID, boolean flag) {
        String url = this.scoreCardUrl + "/objectivesList/{scoreCardId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return objectives;
    }

    public List<ObjectivesDTO> getImportObjectiveList(long scoreCardID, boolean flag) {
        String url = this.scoreCardUrl + "/objectivesList/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return objectives;
    }

    public ObjectivesDTO saveOrUpdateImportObjectiveDetails(ObjectivesDTO objectives, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/objectives";
            ObjectivesDTO objectives1 = (ObjectivesDTO)this.commonRestTemplate.postForObject(url, objectives, ObjectivesDTO.class);
            return objectives1;
        }
        String url = this.scoreCardUrl + "/objectives";
        ObjectivesDTO objectives1 = (ObjectivesDTO)this.commonRestTemplate.putForObject(url, objectives, ObjectivesDTO.class);
        return objectives1;
    }
}


