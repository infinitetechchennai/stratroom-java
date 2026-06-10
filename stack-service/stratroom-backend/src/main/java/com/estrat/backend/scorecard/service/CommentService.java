/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.CommentsDTO
 *  com.estrat.backend.scorecard.service.CommentService
 *  com.estrat.backend.scorecard.service.CommentService$1
 *  com.estrat.backend.scorecard.service.CommentService$2
 *  com.estrat.backend.scorecard.service.CommentService$3
 *  com.estrat.backend.scorecard.service.CommentService$4
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.CommentsDTO;
import com.estrat.backend.scorecard.service.CommentService;
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
    @Value(value="${dbservice.comments.url}")
    private String dbUrl;
    @Value(value="${dbservice.url}")
    private String dbServiceUrl;
    @Value(value="${dbservice.comments.list.url}")
    private String initiativeList;
    @Value(value="${dbservice.comments.emplist.url}")
    private String initiativeEmpList;

    public CommentsDTO createComment(CommentsDTO commentsDTO) {
        return (CommentsDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)commentsDTO, CommentsDTO.class);
    }

    public CommentsDTO updateComment(CommentsDTO commentsDTO) {
        return (CommentsDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)commentsDTO, CommentsDTO.class);
    }

    public CommentsDTO retriveComment(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        return (CommentsDTO)this.commonRestTemplate.getForObject(url, CommentsDTO.class);
    }

    public void removeComment(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public void removeKPIComment(Long id) {
        String url = String.join((CharSequence)"/kpi/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<CommentsDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.initiativeList, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<CommentsDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.initiativeEmpList, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<CommentsDTO> findAllByKPIId(Long kpiId) {
        String url = String.join((CharSequence)"/kpi/", this.initiativeList, String.valueOf(kpiId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void removeEmployeeComment(Long id) {
        String url = String.join((CharSequence)"/employee/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<CommentsDTO> findAllEmpIdComments(Long empId) {
        String url = String.join((CharSequence)"/employee/", this.initiativeList, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public CommentsDTO updateCommentLike(CommentsDTO commentsDTO) {
        String url = this.dbServiceUrl + "commentLike";
        return (CommentsDTO)this.commonRestTemplate.putForObject(url, (Object)commentsDTO, CommentsDTO.class);
    }
}

