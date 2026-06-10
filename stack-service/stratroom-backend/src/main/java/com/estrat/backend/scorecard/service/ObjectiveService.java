/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ObjectivesDTO
 *  com.estrat.backend.scorecard.service.ObjectiveService
 *  com.estrat.backend.scorecard.service.ObjectiveService$1
 *  com.estrat.backend.scorecard.service.ObjectiveService$2
 *  com.estrat.backend.scorecard.service.ObjectiveService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ObjectivesDTO;
import com.estrat.backend.scorecard.service.ObjectiveService;
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
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<ObjectivesDTO> getObjectiveDetails(long id) {
        String url = this.dbUrl + "/objectives/" + id;
        ObjectivesDTO objectives = (ObjectivesDTO)this.commonRestTemplate.getForObject(url, ObjectivesDTO.class);
        return new ResponseEntity((Object)objectives, HttpStatus.OK);
    }

    public ResponseEntity<List<ObjectivesDTO>> getObjectiveList(long scoreCardID, boolean flag) {
        String url = this.dbUrl + "/objectivesList/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)objectives, HttpStatus.OK);
    }

    public ResponseEntity<List<ObjectivesDTO>> objectivesListByDate(long scoreCardID, boolean flag, String dateRange) {
        String url = this.dbUrl + "/objectivesListByDate/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{flag}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)objectives, HttpStatus.OK);
    }

    public ResponseEntity<List<ObjectivesDTO>> objectivesListByDate(long deptId, long scoreCardID, boolean flag, String dateRange) {
        String url = this.dbUrl + "/objectivesListByDateDept/{scoreCardId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("scoreCardId", scoreCardID);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("loadFlag", new Object[]{flag}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List objectives = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)objectives, HttpStatus.OK);
    }

    public ResponseEntity<ObjectivesDTO> saveOrUpdateDetails(ObjectivesDTO objectives) {
        String url = this.dbUrl + "/objectives";
        ObjectivesDTO objectives1 = (ObjectivesDTO)this.commonRestTemplate.postForObject(url, (Object)objectives, ObjectivesDTO.class);
        return new ResponseEntity((Object)objectives1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteObjectiveDetails(long id) {
        String url = this.dbUrl + "/objectives/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

