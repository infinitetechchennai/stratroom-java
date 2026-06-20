/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.dto.ControlPanelThemeDTO
 *  com.estrat.backend.user.service.ControlPanelThemeService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.ControlPanelResponseDTO;
import com.estrat.backend.user.dto.ControlPanelThemeDTO;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ControlPanelThemeService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbService.control.panel.theme.url}")
    private String dbUrl;
    @Value(value="${dbService.control.panel.theme.list.url}")
    private String retrieveControlPanelThemeUrl;

    public ControlPanelResponseDTO saveControlPanelTheme(ControlPanelThemeDTO controlPanelThemeDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)controlPanelThemeDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelResponseDTO updateControlPanelTheme(ControlPanelThemeDTO controlPanelThemeDTO) {
        return (ControlPanelResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)controlPanelThemeDTO, ControlPanelResponseDTO.class);
    }

    public ControlPanelThemeDTO retrieveControlPanelTheme(Long id) {
        String url = this.dbUrl + "/" + id;
        return (ControlPanelThemeDTO)this.commonRestTemplate.getForObject(url, ControlPanelThemeDTO.class);
    }

    public void removeControlPanelTheme(Long id) {
        String url = this.dbUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public ControlPanelThemeDTO findByOrgId(long orgId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("orgId", orgId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrieveControlPanelThemeUrl).buildAndExpand(urlVariables).toUriString();
        return (ControlPanelThemeDTO)this.commonRestTemplate.getForObject(url, ControlPanelThemeDTO.class);
    }
}

