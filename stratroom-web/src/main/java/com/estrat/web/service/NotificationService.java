/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.NotificationDTO
 *  com.estrat.web.service.NotificationService
 *  com.estrat.web.service.NotificationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.NotificationDTO;
import com.estrat.web.service.NotificationService;
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
    @Value(value="${scorecard_Service.notification.url}")
    private String notificationUrl;
    @Value(value="${scorecard_Service.notificationList.url}")
    private String notificationList;

    public NotificationDTO saveNotification(NotificationDTO notificationDTO) {
        return (NotificationDTO)this.commonRestTemplate.postForObject(this.notificationUrl, notificationDTO, NotificationDTO.class);
    }

    public NotificationDTO updateNotification(NotificationDTO notificationDTO) {
        return (NotificationDTO)this.commonRestTemplate.putForObject(this.notificationUrl, notificationDTO, NotificationDTO.class);
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
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List notificationDTOList = (List)this.commonRestTemplate.getForObject(notificationUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return notificationDTOList;
    }
}


