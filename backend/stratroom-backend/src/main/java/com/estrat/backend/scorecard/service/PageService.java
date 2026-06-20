/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.CockpitViewDTO
 *  com.estrat.backend.scorecard.dto.PageDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.backend.scorecard.service.PageService
 *  com.estrat.backend.scorecard.service.PageService$1
 *  com.estrat.backend.scorecard.service.PageService$2
 *  com.estrat.backend.scorecard.service.PageService$3
 *  com.estrat.backend.scorecard.service.PageService$4
 *  com.estrat.backend.scorecard.service.PageService$5
 *  com.estrat.backend.scorecard.service.PageService$6
 *  com.estrat.backend.scorecard.service.PageService$7
 *  com.estrat.backend.scorecard.service.PageService$8
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.CockpitViewDTO;
import com.estrat.backend.scorecard.dto.PageDTO;
import com.estrat.backend.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.backend.scorecard.service.PageService;
import com.estrat.backend.scorecard.util.UserThreadLocal;
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
public class PageService {
    @Value(value="${dbservice.pages.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<PageDTO> getPageDetails(long id) {
        String url = this.dbUrl + "pages/" + id;
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.getForObject(url, PageDTO.class);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    public ResponseEntity<PageDTO> getDefaultPage(String pageType) {
        String url = this.dbUrl + "getDefaultPage";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        PageDTO pageDTO = (PageDTO)this.commonRestTemplate.getForObject(pageURL, PageDTO.class);
        return new ResponseEntity((Object)pageDTO, HttpStatus.OK);
    }

    public ResponseEntity<PageDTO> getPageDetails(String pageName, long empId) {
        String url = this.dbUrl + "pages/" + pageName + "/" + empId;
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.getForObject(url, PageDTO.class);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    public List<PageDTO> pageList(long empId) {
        String url = this.dbUrl + "pageList/" + empId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageDeptList(long deptId, String pageType) {
        String url = this.dbUrl + "pageDeptList/" + deptId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageDeptList(String pageType) {
        String deptId = (String)UserThreadLocal.get().get("LOGGED_IN_DEPT_ID_FIELD");
        String url = this.dbUrl + "pageDeptList/" + deptId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public ResponseEntity<ScoreCardResponseDTO> saveDetails(PageDTO pageDTO) {
        String url = this.dbUrl + "pages";
        ScoreCardResponseDTO scoreCardResponseDTO = (ScoreCardResponseDTO)this.commonRestTemplate.postForObject(url, (Object)pageDTO, ScoreCardResponseDTO.class);
        return new ResponseEntity((Object)scoreCardResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<ScoreCardResponseDTO> updateDetails(PageDTO pageDTO) {
        String url = this.dbUrl + "pages";
        ScoreCardResponseDTO scoreCardResponseDTO = (ScoreCardResponseDTO)this.commonRestTemplate.putForObject(url, (Object)pageDTO, ScoreCardResponseDTO.class);
        return new ResponseEntity((Object)scoreCardResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deletePageDetails(long id) {
        String url = this.dbUrl + "pages/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    public ResponseEntity<Map<String, Object>> checkpages(String pageName, long empId) {
        String url = this.dbUrl + "checkpages/" + pageName + "/" + empId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map map = (Map)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)map, HttpStatus.OK);
    }

    public ResponseEntity<PageDTO> checkPageType(String pageId) {
        String url = this.dbUrl + "emp/checkDetails";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageId", new Object[]{pageId}).toUriString();
        PageDTO pageDTO = (PageDTO)this.commonRestTemplate.getForObject(pageURL, PageDTO.class);
        return new ResponseEntity((Object)pageDTO, HttpStatus.OK);
    }

    public List<PageDTO> pageListByPageType(long empId, String pageType) {
        String url = this.dbUrl + "pageListByPageType/" + empId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public ResponseEntity<PageDTO> updateColumnView(CockpitViewDTO cockpitViewDTO) {
        String url = this.dbUrl + "updateColumnView";
        PageDTO scoreCard = (PageDTO)this.commonRestTemplate.putForObject(url, (Object)cockpitViewDTO, PageDTO.class);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    public List<PageDTO> pageListByDeptPageType(long empId, String pageType) {
        String url = this.dbUrl + "pageListByDeptPageType/" + empId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageType", new Object[]{pageType}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> pageByDeptListPageType(String deptId, String pageType) {
        String url = this.dbUrl + "pageByDeptListPageType";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("pageType", new Object[]{pageType}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }

    public List<PageDTO> findAllByPinnedList(Long deptId) {
        String url = this.dbUrl + "pageByPinnedList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pageDTOList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return pageDTOList;
    }
}

