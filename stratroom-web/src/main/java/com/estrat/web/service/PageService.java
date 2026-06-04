/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.CockpitViewDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.PageService$1
 *  com.estrat.web.service.PageService$2
 *  com.estrat.web.service.PageService$3
 *  com.estrat.web.service.PageService$4
 *  com.estrat.web.service.PageService$5
 *  com.estrat.web.service.PageService$6
 *  com.estrat.web.service.PageService$7
 *  com.estrat.web.service.PageService$8
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.CockpitViewDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.PageService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class PageService {
    @Value(value="${scorecardservice.pages.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<PageDTO> getPageDetails(long id) {
        String url = this.scoreCardUrl + "pages/" + id;
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.getForObject(url, PageDTO.class);
        return new ResponseEntity(scoreCard, HttpStatus.OK);
    }

    public PageDTO getDefaultPage(String pageType) {
        String url = this.scoreCardUrl + "getDefaultPage";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        PageDTO pageDTO = (PageDTO)this.commonRestTemplate.getForObject(pageURL, PageDTO.class);
        return pageDTO;
    }

    public ResponseEntity<PageDTO> getPageDetails(String pageName, long empId) {
        String url = this.scoreCardUrl + "pages/" + pageName + "/" + empId;
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.getForObject(url, PageDTO.class);
        return new ResponseEntity(scoreCard, HttpStatus.OK);
    }

    public List<PageDTO> pageList(long empId) {
        String url = this.scoreCardUrl + "pageList/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageDeptList(long deptId, String pageType) {
        String url = this.scoreCardUrl + "pageDeptList/" + deptId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageDeptList(String pageType) {
        String url = this.scoreCardUrl + "pageDeptList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public ResponseEntity<ScoreCardResponseDTO> saveDetails(PageDTO pageDTO) {
        String url = this.scoreCardUrl + "pages";
        ScoreCardResponseDTO scoreCardResponseDTO = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, pageDTO, ScoreCardResponseDTO.class);
        return new ResponseEntity(scoreCardResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<ScoreCardResponseDTO> updateDetails(PageDTO pageDTO) {
        String url = this.scoreCardUrl + "pages";
        ScoreCardResponseDTO scoreCardResponseDTO = (ScoreCardResponseDTO)this.commonRestTemplate.putForObject(url, pageDTO, ScoreCardResponseDTO.class);
        return new ResponseEntity(scoreCardResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deletePageDetails(long id) {
        String url = this.scoreCardUrl + "pages/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    public Map<String, Object> checkpages(String pageName, long empId) {
        String url = this.scoreCardUrl + "checkpages/" + pageName + "/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        Map map = (Map)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return map;
    }

    public PageDTO checkPageType(String pageId) {
        String url = this.scoreCardUrl + "emp/checkDetails";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).toUriString();
        return (PageDTO)this.commonRestTemplate.getForObject(pageURL, PageDTO.class);
    }

    public List<PageDTO> pageListByPageType(long empId, String pageType) {
        String url = this.scoreCardUrl + "pageListByPageType/" + empId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public ResponseEntity<PageDTO> updateColumnView(CockpitViewDTO cockpitViewDTO) {
        String url = this.scoreCardUrl + "updateColumnView";
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.putForObject(url, cockpitViewDTO, PageDTO.class);
        return new ResponseEntity(scoreCard, HttpStatus.OK);
    }

    public List<PageDTO> pageListByDeptPageType(long deptId, String pageType) {
        String url = this.scoreCardUrl + "pageListByDeptPageType/" + deptId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageByDeptListPageType(String deptId, String pageType) {
        String url = this.scoreCardUrl + "pageByDeptListPageType";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("pageType", new Object[]{pageType}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> findAllByPinnedList(Long deptId) {
        String url = this.scoreCardUrl + "pageByPinnedList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }
}


