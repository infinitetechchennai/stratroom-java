/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.CommonRestTemplate
 *  com.estrat.service.etl.dto.KpiStatusNotification
 *  com.estrat.service.etl.dto.NotificationDTO
 *  com.estrat.service.etl.dto.ScoreCardDTO
 *  com.estrat.service.etl.dto.ScoreCardDetailsDTO
 *  com.estrat.service.etl.dto.ScoreCardResponseDTO
 *  com.estrat.service.etl.service.ScoreCardService
 *  com.estrat.service.etl.service.ScoreCardService$1
 *  com.estrat.service.etl.service.ScoreCardService$2
 *  com.estrat.service.etl.service.ScoreCardService$3
 *  com.estrat.service.etl.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.service.etl.service;

import com.estrat.service.etl.config.CommonRestTemplate;
import com.estrat.service.etl.dto.KpiStatusNotification;
import com.estrat.service.etl.dto.NotificationDTO;
import com.estrat.service.etl.dto.ScoreCardDTO;
import com.estrat.service.etl.dto.ScoreCardDetailsDTO;
import com.estrat.service.etl.dto.ScoreCardResponseDTO;
import com.estrat.service.etl.service.ScoreCardService;
import com.estrat.service.etl.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ScoreCardService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${scoreservice.url}")
    private String scoreUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<ScoreCardDTO> getScoreCardDetails(long id) {
        String url = this.dbUrl + "/scorecard/" + id;
        ScoreCardDTO scoreCard = (ScoreCardDTO)this.commonRestTemplate.getForObject(url, ScoreCardDTO.class);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    public List<ScoreCardDTO> scoreCardList() {
        String url = this.dbUrl + "/scoreCardList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<ScoreCardDetailsDTO> scoreCardListAll() {
        String url = this.dbUrl + "/scoreCardDetailListAll";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public ScoreCardResponseDTO scoreCardResponse(Long pageId, Long empId, String dateRange, String orgId) {
        String url = this.scoreUrl + "scoreCardListByDateId/" + empId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).queryParam("pageId", new Object[]{pageId}).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        System.out.println(pageURL);
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("DATE_PERIOD", dateRange.replace("-", " - "));
        commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", String.valueOf(empId));
        commonHeaders.put("USER_ORG_ID", orgId);
        UserThreadLocal.set(commonHeaders);
        ScoreCardResponseDTO scoreCard = (ScoreCardResponseDTO)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public NotificationDTO sendnotification(KpiStatusNotification kpiStatusNotification) {
        String notificationUrl = this.dbUrl + "/kpistatusnotification";
        return (NotificationDTO)this.commonRestTemplate.postForObject(notificationUrl, (Object)kpiStatusNotification, NotificationDTO.class);
    }

    public NotificationDTO sendnotification(KpiStatusNotification kpiStatusNotification, Long deptId) {
        String notificationUrl = this.dbUrl + "/kpistatusnotification";
        System.out.println("Department ID before would be " + deptId);
        if (Objects.isNull(kpiStatusNotification.getDepartmentId())) {
            kpiStatusNotification.setDepartmentId(deptId);
        }
        System.out.println("Deparment Id in send notification wire :: " + kpiStatusNotification.getDepartmentId());
        return (NotificationDTO)this.commonRestTemplate.postForObject(notificationUrl, (Object)kpiStatusNotification, NotificationDTO.class);
    }
}

