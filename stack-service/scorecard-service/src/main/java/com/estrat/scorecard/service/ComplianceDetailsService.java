/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.ComplianceAreaDTO
 *  com.estrat.scorecard.dto.ComplianceDetailsDTO
 *  com.estrat.scorecard.service.ComplianceDetailsService
 *  com.estrat.scorecard.service.ComplianceDetailsService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.ComplianceAreaDTO;
import com.estrat.scorecard.dto.ComplianceDetailsDTO;
import com.estrat.scorecard.service.ComplianceDetailsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ComplianceDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public ComplianceAreaDTO saveArea(ComplianceAreaDTO complianceAreaDTO) {
        String url = this.dbUrl + "/complainArea";
        return (ComplianceAreaDTO)this.commonRestTemplate.postForObject(url, (Object)complianceAreaDTO, ComplianceAreaDTO.class);
    }

    public ComplianceAreaDTO updateArea(ComplianceAreaDTO complianceAreaDTO) {
        String url = this.dbUrl + "/complainArea";
        return (ComplianceAreaDTO)this.commonRestTemplate.putForObject(url, (Object)complianceAreaDTO, ComplianceAreaDTO.class);
    }

    public ComplianceAreaDTO retrieveArea(Long id) {
        String url = this.dbUrl + "/complainArea";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (ComplianceAreaDTO)this.commonRestTemplate.getForObject(url1, ComplianceAreaDTO.class);
    }

    public void removeArea(Long id) {
        String url = this.dbUrl + "/complainArea";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<ComplianceAreaDTO> findAll(String pageId, String dateRange) {
        String url = this.dbUrl + "/retrieveComplinValue";
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ComplianceDetailsDTO saveComplain(ComplianceDetailsDTO complianceDetailsDTO) {
        String url = this.dbUrl + "/compliance";
        return (ComplianceDetailsDTO)this.commonRestTemplate.postForObject(url, (Object)complianceDetailsDTO, ComplianceDetailsDTO.class);
    }

    public ComplianceDetailsDTO updateComplain(ComplianceDetailsDTO complianceDetailsDTO) {
        String url = this.dbUrl + "/compliance";
        return (ComplianceDetailsDTO)this.commonRestTemplate.putForObject(url, (Object)complianceDetailsDTO, ComplianceDetailsDTO.class);
    }

    public ComplianceDetailsDTO retrieveComplain(Long id) {
        String url = this.dbUrl + "/compliance";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (ComplianceDetailsDTO)this.commonRestTemplate.getForObject(url1, ComplianceDetailsDTO.class);
    }

    public void removeComplain(Long id) {
        String url = this.dbUrl + "/compliance";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }
}

