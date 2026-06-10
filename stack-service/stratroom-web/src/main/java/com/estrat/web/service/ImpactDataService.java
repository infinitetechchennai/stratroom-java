/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ImpactDataDto
 *  com.estrat.web.service.ImpactDataService
 *  com.estrat.web.service.ImpactDataService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ImpactDataDto;
import com.estrat.web.service.ImpactDataService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ImpactDataService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardService.impactData.save.url}")
    private String saveUrl;
    @Value(value="${scorecardService.impactData.update.url}")
    private String updateUrl;
    @Value(value="${scorecardService.impactData.getId.url}")
    private String getIdUrl;
    @Value(value="${scorecardService.impactData.getAll.url}")
    private String getAllUrl;

    public ImpactDataDto saveImpactData(ImpactDataDto impactDataDto) {
        return (ImpactDataDto)this.commonRestTemplate.postForObject(this.saveUrl, impactDataDto, ImpactDataDto.class);
    }

    public ImpactDataDto updateImpactData(ImpactDataDto impactDataDto) {
        return (ImpactDataDto)this.commonRestTemplate.putForObject(this.updateUrl, impactDataDto, ImpactDataDto.class);
    }

    public ImpactDataDto findImpDataById(long id) {
        String url = String.join((CharSequence)"/", this.getIdUrl, String.valueOf(id));
        return (ImpactDataDto)this.commonRestTemplate.getForObject(url, ImpactDataDto.class);
    }

    public List<ImpactDataDto> findAllImpactdata() {
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getAllUrl).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


