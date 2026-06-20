/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.dto.ControlPanelSecurityDTO
 *  com.estrat.backend.user.service.ControlPanelSecurityService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.ControlPanelResponseDTO;
import com.estrat.backend.user.dto.ControlPanelSecurityDTO;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ControlPanelSecurityService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbService.control.panel.security.url}")
    private String dbUrl;
    @Value(value="${dbService.control.panel.security.list.url}")
    private String retrieveControlPanelSecurityUrl;

    public ControlPanelResponseDTO saveControlPanelSecurity(ControlPanelSecurityDTO controlPanelSecurityDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)controlPanelSecurityDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelResponseDTO updateControlPanelSecurity(ControlPanelSecurityDTO controlPanelSecurityDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)controlPanelSecurityDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelSecurityDTO retrieveControlPanelSecurity(Long id) {
        String url = this.dbUrl + "/" + id;
        return (ControlPanelSecurityDTO)this.commonRestTemplate.getForObject(url, ControlPanelSecurityDTO.class);
    }

    public void removeControlPanelSecurity(Long id) {
        String url = this.dbUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public ControlPanelSecurityDTO findByOrgId(long orgId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("orgId", orgId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrieveControlPanelSecurityUrl).buildAndExpand(urlVariables).toUriString();
        return (ControlPanelSecurityDTO)this.commonRestTemplate.getForObject(url, ControlPanelSecurityDTO.class);
    }
}

