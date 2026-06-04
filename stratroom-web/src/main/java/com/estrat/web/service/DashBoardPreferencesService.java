/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.DashBoardPreferencesDTO
 *  com.estrat.web.dto.HomePreferencesDTO
 *  com.estrat.web.dto.PreferenceDTO
 *  com.estrat.web.service.DashBoardPreferencesService
 *  com.estrat.web.service.DashBoardPreferencesService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.DashBoardPreferencesDTO;
import com.estrat.web.dto.HomePreferencesDTO;
import com.estrat.web.dto.PreferenceDTO;
import com.estrat.web.service.DashBoardPreferencesService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class DashBoardPreferencesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    @Value(value="${scorecardService.dashBoardPreferences.url}")
    private String dashboardUrl;
    @Value(value="${scorecardService.dashBoardPreferences.list.url}")
    private String dashboardListByEmpIdUrl;
    @Value(value="${scorecardService.homePagePreferences.url}")
    private String homePagePreferencesurl;

    public DashBoardPreferencesDTO saveDashBoardPreferences(DashBoardPreferencesDTO dashBoardPreferencesDTO) {
        return (DashBoardPreferencesDTO)this.commonRestTemplate.postForObject(this.dashboardUrl, dashBoardPreferencesDTO, DashBoardPreferencesDTO.class);
    }

    public DashBoardPreferencesDTO updateDashBoardPreferences(DashBoardPreferencesDTO dashBoardPreferencesDTO) {
        return (DashBoardPreferencesDTO)this.commonRestTemplate.putForObject(this.dashboardUrl, dashBoardPreferencesDTO, DashBoardPreferencesDTO.class);
    }

    public DashBoardPreferencesDTO retrieveDashBoardPreferences(Long id) {
        String url = String.join((CharSequence)"/", this.dashboardUrl, String.valueOf(id));
        return (DashBoardPreferencesDTO)this.commonRestTemplate.getForObject(url, DashBoardPreferencesDTO.class);
    }

    public void removeDashBoardPreferences(Long id) {
        String url = String.join((CharSequence)"/", this.dashboardUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<DashBoardPreferencesDTO> findAllByEmpId(Long empId, String pageId) {
        String url = this.dashboardListByEmpIdUrl + "/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public HomePreferencesDTO updateHomePreferences(HomePreferencesDTO homePreferencesDTO) {
        return (HomePreferencesDTO)this.commonRestTemplate.postForObject(this.homePagePreferencesurl, homePreferencesDTO, HomePreferencesDTO.class);
    }

    public HomePreferencesDTO retrieveHomePagePreferences(Long empid) {
        String url = String.join((CharSequence)"/", this.homePagePreferencesurl, String.valueOf(empid));
        return (HomePreferencesDTO)this.commonRestTemplate.getForObject(url, HomePreferencesDTO.class);
    }

    public PreferenceDTO savePreference(PreferenceDTO preferenceDTO) {
        String url = this.scorecardUrl + "/preferences";
        return (PreferenceDTO)this.commonRestTemplate.postForObject(url, preferenceDTO, PreferenceDTO.class);
    }

    public PreferenceDTO updatePreference(PreferenceDTO preferenceDTO) {
        String url = this.scorecardUrl + "/preferences";
        return (PreferenceDTO)this.commonRestTemplate.putForObject(url, preferenceDTO, PreferenceDTO.class);
    }

    public PreferenceDTO retrivePreference(Long id) {
        String scorecardUrl1 = this.scorecardUrl + "/preferences";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(id));
        return (PreferenceDTO)this.commonRestTemplate.getForObject(url, PreferenceDTO.class);
    }
}


