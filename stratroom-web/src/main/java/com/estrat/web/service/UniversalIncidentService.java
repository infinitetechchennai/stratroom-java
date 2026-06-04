/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.UniversalIncidentDTO
 *  com.estrat.web.service.UniversalIncidentService
 *  com.estrat.web.service.UniversalIncidentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.UniversalIncidentDTO;
import com.estrat.web.service.UniversalIncidentService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class UniversalIncidentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.pages.url}")
    private String dbUrl;

    public UniversalIncidentDTO saveUniversal(UniversalIncidentDTO universalIncidentDTO) {
        String url = this.dbUrl + "/universalIncident";
        return (UniversalIncidentDTO)this.commonRestTemplate.postForObject(url, universalIncidentDTO, UniversalIncidentDTO.class);
    }

    public UniversalIncidentDTO updateUniversal(UniversalIncidentDTO universalIncidentDTO) {
        String url = this.dbUrl + "/universalIncident";
        return (UniversalIncidentDTO)this.commonRestTemplate.putForObject(url, universalIncidentDTO, UniversalIncidentDTO.class);
    }

    public UniversalIncidentDTO retrieveUniversal(Long id) {
        String url = this.dbUrl + "/universalIncident";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (UniversalIncidentDTO)this.commonRestTemplate.getForObject(url2, UniversalIncidentDTO.class);
    }

    public void removeUniversal(Long id) {
        String url = this.dbUrl + "/universalIncident";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<UniversalIncidentDTO> findAll(String pageId) {
        String url1 = this.dbUrl + "/universalIncidentList";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


