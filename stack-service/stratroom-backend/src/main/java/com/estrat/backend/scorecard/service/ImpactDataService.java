/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ImpactDataDto
 *  com.estrat.backend.scorecard.service.ImpactDataService
 *  com.estrat.backend.scorecard.service.ImpactDataService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ImpactDataDto;
import com.estrat.backend.scorecard.service.ImpactDataService;
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
    @Value(value="${dbService.impactData.save.url}")
    private String saveUrl;
    @Value(value="${dbService.impactData.update.url}")
    private String updateUrl;
    @Value(value="${dbService.impactData.getId.url}")
    private String getIdUrl;
    @Value(value="${dbService.impactData.getAll.url}")
    private String getAllUrl;

    public ImpactDataDto saveImpactData(ImpactDataDto impactDataDto) {
        return (ImpactDataDto)this.commonRestTemplate.postForObject(this.saveUrl, (Object)impactDataDto, ImpactDataDto.class);
    }

    public ImpactDataDto updateImpactData(ImpactDataDto impactDataDto) {
        return (ImpactDataDto)this.commonRestTemplate.putForObject(this.updateUrl, (Object)impactDataDto, ImpactDataDto.class);
    }

    public ImpactDataDto findImpDataById(long id) {
        String url = String.join((CharSequence)"/", this.getIdUrl, String.valueOf(id));
        return (ImpactDataDto)this.commonRestTemplate.getForObject(url, ImpactDataDto.class);
    }

    public List<ImpactDataDto> findAllImpactdata() {
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getAllUrl).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

