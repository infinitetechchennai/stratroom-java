/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.NotificationDTO
 *  com.estrat.scorecard.service.NotificationService
 *  com.estrat.scorecard.service.NotificationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.NotificationDTO;
import com.estrat.scorecard.service.NotificationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NotificationService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbService.notification.url}")
    private String notificationUrl;
    @Value(value="${dbService.notificationList.url}")
    private String notificationList;

    public NotificationDTO saveNotification(NotificationDTO notificationDTO) {
        return (NotificationDTO)this.commonRestTemplate.postForObject(this.notificationUrl, (Object)notificationDTO, NotificationDTO.class);
    }

    public NotificationDTO updateNotification(NotificationDTO notificationDTO) {
        return (NotificationDTO)this.commonRestTemplate.putForObject(this.notificationUrl, (Object)notificationDTO, NotificationDTO.class);
    }

    public NotificationDTO retrieveNotification(Long id) {
        String url = String.join((CharSequence)"/", this.notificationUrl, String.valueOf(id));
        NotificationDTO notificationDTO = (NotificationDTO)this.commonRestTemplate.getForObject(url, NotificationDTO.class);
        return notificationDTO;
    }

    public void removeNotification(Long id) {
        String url = this.notificationUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<NotificationDTO> findAll(long empId, String notificationType, String targetValue, String meetingIntervalCheck, String readFlag) {
        String url = this.notificationList + "/" + empId;
        String notificationUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("notificationType", new Object[]{notificationType}).queryParam("targetValue", new Object[]{targetValue}).queryParam("meetingIntervalCheck", new Object[]{meetingIntervalCheck}).queryParam("readFlag", new Object[]{readFlag}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List notificationDTOList = (List)this.commonRestTemplate.getForObject(notificationUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return notificationDTOList;
    }
}

