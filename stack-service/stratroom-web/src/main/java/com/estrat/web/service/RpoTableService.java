/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RpoTableDto
 *  com.estrat.web.service.RpoTableService
 *  com.estrat.web.service.RpoTableService$1
 *  com.estrat.web.service.RpoTableService$2
 *  com.estrat.web.service.RpoTableService$3
 *  com.estrat.web.service.RpoTableService$4
 *  com.estrat.web.service.RpoTableService$5
 *  com.estrat.web.service.RpoTableService$6
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RpoTableDto;
import com.estrat.web.service.RpoTableService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RpoTableService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String dbUrl;
    @Value(value="${scorecardService.saverpo.url}")
    private String rpoUrl;
    @Value(value="${scorecardService.getAllrpo.url}")
    private String getAllUrl;
    @Value(value="${scorecardService.getidrpo.url}")
    private String getIdUrl;
    @Value(value="${scorecardService.getAllrpoByEmpId.url}")
    private String getAllByEmpIdUrl;
    @Value(value="${scorecardService.getAllrpoByPageId.url}")
    private String getAllByPageIdUrl;
    @Value(value="${scorecardService.deleterpo.url}")
    private String deleteUrl;
    @Value(value="${scorecardService.updaterpo.url}")
    private String updateUrl;

    public RpoTableDto saveRpoTable(RpoTableDto rpoTableDto) {
        return (RpoTableDto)this.commonRestTemplate.postForObject(this.rpoUrl, rpoTableDto, RpoTableDto.class);
    }

    public List<RpoTableDto> findAllRpo() {
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getAllUrl).buildAndExpand(urlVariable).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RpoTableDto findByIdRpo(long id) {
        String url = String.join((CharSequence)"/", this.getIdUrl, String.valueOf(id));
        return (RpoTableDto)this.commonRestTemplate.getForObject(url, RpoTableDto.class);
    }

    public void removeRpo(long id) {
        String url = String.join((CharSequence)"/", this.deleteUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public RpoTableDto updateRpo(RpoTableDto rpoTableDto) {
        return (RpoTableDto)this.commonRestTemplate.putForObject(this.updateUrl, rpoTableDto, RpoTableDto.class);
    }

    public List<RpoTableDto> findAllRpoBYEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.getAllByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RpoTableDto> findByAllPageId(long pageId, String dateRange, String status) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getAllByPageIdUrl).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("status", new Object[]{status}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RpoTableDto> rpoListWithChild(long empId, String pageIds, String dateRange) {
        String url = this.dbUrl + "/rpoListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List rpoDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return rpoDTOList;
    }

    public List<RpoTableDto> rpoListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/rpoListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RpoTableDto> rpoHistoryList(Long rpoId, Long version) {
        String url = this.dbUrl + "/rpohistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("rpoId", new Object[]{rpoId}).queryParam("version", new Object[]{version}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }
}


