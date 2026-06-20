/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.MasterValueDto
 *  com.estrat.backend.scorecard.service.MasterValueService
 *  com.estrat.backend.scorecard.service.MasterValueService$1
 *  com.estrat.backend.scorecard.service.MasterValueService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.MasterValueDto;
import com.estrat.backend.scorecard.service.MasterValueService;
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
    @Value(value="${dbService.url}")
    private String dbUrl;
    @Value(value="${dbService.mastervalue.url}")
    private String masterValueUrl;
    @Value(value="${dbService.getmastertype.url}")
    private String valueTypeUrl;
    @Value(value="${dbService.mastervaluebyId.url}")
    private String getIdUrl;
    @Value(value="${dbService.deletemastervalue.url}")
    private String deleteUrl;
    @Value(value="${dbService.updatemastervalue.url}")
    private String updateUrl;

    public MasterValueDto saveMasterValue(MasterValueDto masterValueDto) {
        return (MasterValueDto)this.commonRestTemplate.postForObject(this.masterValueUrl, (Object)masterValueDto, MasterValueDto.class);
    }

    public List<MasterValueDto> findAllMasterValue() {
        String url = this.dbUrl + "/retrieveMasterValue";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
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
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.valueTypeUrl).queryParam("type", new Object[]{type}).buildAndExpand(urlVariable).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public MasterValueDto updateMasterValue(MasterValueDto masterValueDto) {
        return (MasterValueDto)this.commonRestTemplate.putForObject(this.updateUrl, (Object)masterValueDto, MasterValueDto.class);
    }
}

