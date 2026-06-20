/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.service.ControlPanelGeneralService
 *  com.estrat.backend.user.service.ControlPanelGeneralService$1
 *  com.estrat.backend.user.service.ControlPanelGeneralService$2
 *  com.estrat.backend.user.service.ControlPanelGeneralService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.ControlPanelGeneralDTO;
import com.estrat.backend.user.dto.ControlPanelResponseDTO;
import com.estrat.backend.user.service.ControlPanelGeneralService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ControlPanelGeneralService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbService.control.panel.general.url}")
    private String dbUrl;
    @Value(value="${dbservice.menus.url}")
    private String dbServiceUrl;
    @Value(value="${dbService.control.panel.general.lists.url}")
    private String retrieveControlPanelGeneralUrl;
    @Value(value="${dbService.control.panel.custom.save.url}")
    private String customPerformanceSaveUrl;
    @Value(value="${dbService.control.panel.custom.get.url}")
    private String customPerformanceGetUrl;
    @Value(value="${dbService.control.panel.risk.save.url}")
    private String customPerformanceriskSaveUrl;
    @Value(value="${dbService.control.panel.risk.get.url}")
    private String customPerformanceriskGetUrl;

    public ControlPanelResponseDTO saveControlPanelGeneral(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)controlPanelGeneralDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelResponseDTO saveControlPanelCustomPerformance(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.customPerformanceSaveUrl, (Object)controlPanelGeneralDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelResponseDTO saveControlPanelrisk(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.customPerformanceriskSaveUrl, (Object)controlPanelGeneralDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelResponseDTO saveControlPanelRisk(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.customPerformanceriskSaveUrl, (Object)controlPanelGeneralDTO, ControlPanelResponseDTO.class);
    }

    public Map<String, Object> findCustomPerformanceByOrgId() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(this.customPerformanceGetUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> findrisksetting() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(this.customPerformanceriskGetUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ControlPanelResponseDTO updateControlPanelGeneral(ControlPanelGeneralDTO initiativesDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)initiativesDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelGeneralDTO retrieveControlPanelGeneral(Long id) {
        String url = this.dbUrl + "/" + id;
        return (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url, ControlPanelGeneralDTO.class);
    }

    public void removeControlPanelGeneral(Long id) {
        String url = this.dbUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public ControlPanelGeneralDTO findByOrgId(long orgId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("orgId", orgId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrieveControlPanelGeneralUrl).buildAndExpand(urlVariables).toUriString();
        return (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url, ControlPanelGeneralDTO.class);
    }

    public ControlPanelResponseDTO runScriptRestore(String path, String orgId) {
        String url = this.dbServiceUrl + "scriptrestore";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("path", new Object[]{path}).queryParam("orgId", new Object[]{orgId}).toUriString();
        return (ControlPanelResponseDTO)this.commonRestTemplate.getForObject(restoreUrl, ControlPanelResponseDTO.class);
    }

    public ResponseEntity<List<String>> restorePath(String orgId) {
        String url = this.dbServiceUrl + "restorePath";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List fileList = (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)fileList, HttpStatus.OK);
    }
}

