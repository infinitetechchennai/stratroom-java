/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MasterValueDto
 *  com.estrat.web.service.MasterValueService
 *  com.estrat.web.service.MasterValueService$1
 *  com.estrat.web.service.MasterValueService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MasterValueDto;
import com.estrat.web.service.MasterValueService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MasterValueService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardService.mastervalue.url}")
    private String masterValueUrl;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecardService.getmastertype.url}")
    private String getTypeUrl;
    @Value(value="${scorecardService.mastervaluebyId.url}")
    private String getIdUrl;
    @Value(value="${scorecardService.deletemastervalue.url}")
    private String deleteUrl;
    @Value(value="${scorecardService.updatemastervalue.url}")
    private String updateUrl;

    public MasterValueDto saveMasterValue(MasterValueDto masterValueDto) {
        return (MasterValueDto)this.commonRestTemplate.postForObject(this.masterValueUrl, masterValueDto, MasterValueDto.class);
    }

    public List<MasterValueDto> findAllMasterValue() {
        String url = this.scoreCardUrl + "/retrieveMasterValue";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public MasterValueDto findMasterById(long id) {
        String url = String.join((CharSequence)"/", this.getIdUrl, String.valueOf(id));
        return (MasterValueDto)this.commonRestTemplate.getForObject(url, MasterValueDto.class);
    }

    public void removeMasterValue(long id) {
        String url = String.join((CharSequence)"/", this.deleteUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<MasterValueDto> findAllByTypes(String type) {
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getTypeUrl).queryParam("type", new Object[]{type}).buildAndExpand(urlVariable).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public MasterValueDto updateMasterValue(MasterValueDto masterValueDto) {
        return (MasterValueDto)this.commonRestTemplate.putForObject(this.updateUrl, masterValueDto, MasterValueDto.class);
    }
}


