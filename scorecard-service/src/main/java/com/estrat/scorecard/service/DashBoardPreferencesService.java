/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.DashBoardPreferencesDTO
 *  com.estrat.scorecard.dto.HomePreferencesDTO
 *  com.estrat.scorecard.dto.PreferenceDTO
 *  com.estrat.scorecard.service.DashBoardPreferencesService
 *  com.estrat.scorecard.service.DashBoardPreferencesService$1
 *  com.estrat.scorecard.service.DashBoardPreferencesService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.DashBoardPreferencesDTO;
import com.estrat.scorecard.dto.HomePreferencesDTO;
import com.estrat.scorecard.dto.PreferenceDTO;
import com.estrat.scorecard.service.DashBoardPreferencesService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class DashBoardPreferencesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.dashBoardPreferences.url}")
    private String dashboardUrl;
    @Value(value="${dbservice.dashBoardPreferences.list.url}")
    private String dashboardListByEmpIdUrl;
    @Value(value="${dbservice.homePagePreferences.url}")
    private String homePagePreferencesByEmpIdUrl;
    @Value(value="${dbservice.url}")
    private String dbUri;

    public DashBoardPreferencesDTO saveDashBoardPreferences(DashBoardPreferencesDTO dashBoardPreferencesDTO) {
        return (DashBoardPreferencesDTO)this.commonRestTemplate.postForObject(this.dashboardUrl, (Object)dashBoardPreferencesDTO, DashBoardPreferencesDTO.class);
    }

    public DashBoardPreferencesDTO updateDashBoardPreferences(DashBoardPreferencesDTO dashBoardPreferencesDTO) {
        return (DashBoardPreferencesDTO)this.commonRestTemplate.putForObject(this.dashboardUrl, (Object)dashBoardPreferencesDTO, DashBoardPreferencesDTO.class);
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
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public HomePreferencesDTO findByEmpId(Long empId) {
        String url = this.homePagePreferencesByEmpIdUrl + "/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        return (HomePreferencesDTO)this.commonRestTemplate.getForObject(pageURL, HomePreferencesDTO.class);
    }

    public HomePreferencesDTO updateHomePreferences(HomePreferencesDTO homePreferencesDTO) {
        return (HomePreferencesDTO)this.commonRestTemplate.postForObject(this.homePagePreferencesByEmpIdUrl, (Object)homePreferencesDTO, HomePreferencesDTO.class);
    }

    public PreferenceDTO savePreference(PreferenceDTO preferenceDTO) {
        String url = this.dbUri + "/preferences";
        return (PreferenceDTO)this.commonRestTemplate.postForObject(url, (Object)preferenceDTO, PreferenceDTO.class);
    }

    public PreferenceDTO updatePreference(PreferenceDTO preferenceDTO) {
        String url = this.dbUri + "/preferences";
        return (PreferenceDTO)this.commonRestTemplate.putForObject(url, (Object)preferenceDTO, PreferenceDTO.class);
    }

    public PreferenceDTO retrivePreference(Long id) {
        String scorecardUrl1 = this.dbUri + "/preferences";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(id));
        return (PreferenceDTO)this.commonRestTemplate.getForObject(url, PreferenceDTO.class);
    }
}

