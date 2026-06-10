/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ProjectPlanningDTO
 *  com.estrat.backend.scorecard.service.ProjectPlanningService
 *  com.estrat.backend.scorecard.service.ProjectPlanningService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ProjectPlanningDTO;
import com.estrat.backend.scorecard.service.ProjectPlanningService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ProjectPlanningService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public ProjectPlanningDTO saveProject(ProjectPlanningDTO projectPlanningDTO) {
        String url = this.dbUrl + "/projectPlanning";
        return (ProjectPlanningDTO)this.commonRestTemplate.postForObject(url, (Object)projectPlanningDTO, ProjectPlanningDTO.class);
    }

    public ProjectPlanningDTO updateProject(ProjectPlanningDTO projectPlanningDTO) {
        String url = this.dbUrl + "/projectPlanning";
        return (ProjectPlanningDTO)this.commonRestTemplate.putForObject(url, (Object)projectPlanningDTO, ProjectPlanningDTO.class);
    }

    public ProjectPlanningDTO retrieveProject(Long id) {
        String url = this.dbUrl + "/projectPlanning";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (ProjectPlanningDTO)this.commonRestTemplate.getForObject(url2, ProjectPlanningDTO.class);
    }

    public void removeProject(Long id) {
        String url = this.dbUrl + "/projectPlanning";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<ProjectPlanningDTO> findAll(String pageId, String dateRange) {
        String url1 = this.dbUrl + "/projectPlanningList";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

