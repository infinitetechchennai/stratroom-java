/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.OrgstructureGroupDTO
 *  com.estrat.backend.scorecard.service.OrgstructureGroupService
 *  com.estrat.backend.scorecard.service.OrgstructureGroupService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.OrgstructureGroupDTO;
import com.estrat.backend.scorecard.service.OrgstructureGroupService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OrgstructureGroupService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public OrgstructureGroupDTO saveOrgGroup(OrgstructureGroupDTO orgstructureGroupDTO) {
        String url = this.dbUrl + "/orgGroup";
        return (OrgstructureGroupDTO)this.commonRestTemplate.postForObject(url, (Object)orgstructureGroupDTO, OrgstructureGroupDTO.class);
    }

    public OrgstructureGroupDTO updateOrgGroup(OrgstructureGroupDTO orgstructureGroupDTO) {
        String url = this.dbUrl + "/orgGroup";
        return (OrgstructureGroupDTO)this.commonRestTemplate.putForObject(url, (Object)orgstructureGroupDTO, OrgstructureGroupDTO.class);
    }

    public OrgstructureGroupDTO retrieveOrgGroup(Long id) {
        String url = this.dbUrl + "/orgGroup";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (OrgstructureGroupDTO)this.commonRestTemplate.getForObject(url2, OrgstructureGroupDTO.class);
    }

    public void removeOrgGroup(Long id) {
        String url = this.dbUrl + "/orgGroup";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<OrgstructureGroupDTO> findAllValue() {
        String url = this.dbUrl + "/orgGroupList";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

