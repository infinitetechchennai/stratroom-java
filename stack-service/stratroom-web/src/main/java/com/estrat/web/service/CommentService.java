/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.CommentsDTO
 *  com.estrat.web.service.CommentService
 *  com.estrat.web.service.CommentService$1
 *  com.estrat.web.service.CommentService$2
 *  com.estrat.web.service.CommentService$3
 *  com.estrat.web.service.CommentService$4
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.CommentsDTO;
import com.estrat.web.service.CommentService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CommentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${scorecardservice.comments.url}")
    private String dbUrl;
    @Value(value="${scorecardservice.comments.list.url}")
    private String initiativeList;
    @Value(value="${dbservice.comments.emplist.url}")
    private String initiativeEmpList;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;

    public CommentsDTO createComment(CommentsDTO commentsDTO) {
        return (CommentsDTO)this.commonRestTemplate.postForObject(this.dbUrl, commentsDTO, CommentsDTO.class);
    }

    public CommentsDTO updateComment(CommentsDTO commentsDTO) {
        return (CommentsDTO)this.commonRestTemplate.putForObject(this.dbUrl, commentsDTO, CommentsDTO.class);
    }

    public CommentsDTO retriveComment(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        CommentsDTO commentsDTO = (CommentsDTO)this.commonRestTemplate.getForObject(url, CommentsDTO.class);
        commentsDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)commentsDTO.getCreatedTime()));
        commentsDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)commentsDTO.getUpdatedTime()));
        return commentsDTO;
    }

    public void removeComment(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<CommentsDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.initiativeList, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<CommentsDTO> findAllByEmpId(String empId) {
        String url = String.join((CharSequence)"/", this.initiativeEmpList, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<CommentsDTO> findAllByKPIId(String kpiId) {
        String url = String.join((CharSequence)"/kpi/", this.initiativeList, String.valueOf(kpiId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void removeKPIComment(Long id) {
        String url = String.join((CharSequence)"/kpi/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public void removeEmployeeComment(Long id) {
        String url = String.join((CharSequence)"/employee/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<CommentsDTO> findAllEmpIdComments(String empId) {
        String url = String.join((CharSequence)"/employee/", this.initiativeList, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public CommentsDTO updateCommentLike(CommentsDTO commentsDTO) {
        String url = String.join((CharSequence)"/", this.scorecardUrl, "commentLike");
        return (CommentsDTO)this.commonRestTemplate.putForObject(url, commentsDTO, CommentsDTO.class);
    }
}


