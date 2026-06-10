/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.OrgTrackerDTO
 *  com.estrat.web.service.OrgTrackerService
 *  com.estrat.web.service.OrgTrackerService$1
 *  com.estrat.web.service.OrgTrackerService$2
 *  com.estrat.web.service.OrgTrackerService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.OrgTrackerDTO;
import com.estrat.web.service.OrgTrackerService;
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
    @Value(value="${userservice.menus.url}")
    private String userUrl;

    public List<OrgTrackerDTO> orgTrackList(String type, String datePeriod, String id) {
        String url = this.userUrl + "/orgTrackList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("flagType", new Object[]{type}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("id", new Object[]{id}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<OrgTrackerDTO> orgTrackAllList(String datePeriod) {
        String url = this.userUrl + "/orgTrackAllList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void clearOrgTrack(String id, String type) {
        String url = this.userUrl + "/clearOrgTrack/" + id;
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        this.restTemplate.deleteForObject(restoreUrl);
    }

    public List<OrgTrackerDTO> orgTrackSearchList(String type, String datePeriod) {
        String url = this.userUrl + "/orgTrackSearchList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("flagType", new Object[]{type}).queryParam("datePeriod", new Object[]{datePeriod}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.restTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


