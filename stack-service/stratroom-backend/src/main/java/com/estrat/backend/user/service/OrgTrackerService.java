/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.OrgTrackerDTO
 *  com.estrat.backend.user.service.OrgTrackerService
 *  com.estrat.backend.user.service.OrgTrackerService$1
 *  com.estrat.backend.user.service.OrgTrackerService$2
 *  com.estrat.backend.user.service.OrgTrackerService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.OrgTrackerDTO;
import com.estrat.backend.user.service.OrgTrackerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OrgTrackerService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public List<OrgTrackerDTO> orgTrackList(String type, String datePeriod, String id) {
        String url = this.dbUrl + "orgTrackList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("flagType", new Object[]{type}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("id", new Object[]{id}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<OrgTrackerDTO> orgTrackAllList(String datePeriod) {
        String url = this.dbUrl + "orgTrackAllList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void clearOrgTrack(String id, String type) {
        String url = this.dbUrl + "clearOrgTrack/" + id;
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        this.restTemplate.deleteForObject(restoreUrl);
    }

    public List<OrgTrackerDTO> orgTrackSearchList(String type, String datePeriod) {
        String url = this.dbUrl + "orgTrackSearchList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("flagType", new Object[]{type}).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

