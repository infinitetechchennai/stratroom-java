/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ApprovalRequestDTO
 *  com.estrat.backend.scorecard.dto.ApprovalResponseDTO
 *  com.estrat.backend.scorecard.dto.TaskCategorysDTO
 *  com.estrat.backend.scorecard.dto.TaskDetailsDTO
 *  com.estrat.backend.scorecard.dto.TaskStatusResponseDTO
 *  com.estrat.backend.scorecard.service.TaskDetailsService
 *  com.estrat.backend.scorecard.service.TaskDetailsService$1
 *  com.estrat.backend.scorecard.service.TaskDetailsService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ApprovalRequestDTO;
import com.estrat.backend.scorecard.dto.ApprovalResponseDTO;
import com.estrat.backend.scorecard.dto.TaskCategorysDTO;
import com.estrat.backend.scorecard.dto.TaskDetailsDTO;
import com.estrat.backend.scorecard.dto.TaskStatusResponseDTO;
import com.estrat.backend.scorecard.service.TaskDetailsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TaskDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public TaskCategorysDTO saveCategory(TaskCategorysDTO taskCategorysDTO) {
        String url = this.dbUrl + "/taskCategory";
        return (TaskCategorysDTO)this.commonRestTemplate.postForObject(url, (Object)taskCategorysDTO, TaskCategorysDTO.class);
    }

    public TaskCategorysDTO updateCategory(TaskCategorysDTO taskCategorysDTO) {
        String url = this.dbUrl + "/taskCategory";
        return (TaskCategorysDTO)this.commonRestTemplate.putForObject(url, (Object)taskCategorysDTO, TaskCategorysDTO.class);
    }

    public TaskCategorysDTO retrieveCategory(Long id) {
        String url = this.dbUrl + "/taskCategory";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (TaskCategorysDTO)this.commonRestTemplate.getForObject(url1, TaskCategorysDTO.class);
    }

    public void removecategory(Long id) {
        String url = this.dbUrl + "/taskCategory";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<TaskCategorysDTO> findAllByEmpId(Long empId, String dateRange, String type) {
        String url = this.dbUrl + "/retrieveTaskList";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(empId));
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).queryParam("type", new Object[]{type}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public TaskDetailsDTO saveTask(TaskDetailsDTO taskDetailsDTO) {
        String url = this.dbUrl + "/task";
        return (TaskDetailsDTO)this.commonRestTemplate.postForObject(url, (Object)taskDetailsDTO, TaskDetailsDTO.class);
    }

    public TaskDetailsDTO updateTask(TaskDetailsDTO taskDetailsDTO) {
        String url = this.dbUrl + "/task";
        return (TaskDetailsDTO)this.commonRestTemplate.putForObject(url, (Object)taskDetailsDTO, TaskDetailsDTO.class);
    }

    public TaskDetailsDTO retrieveTask(Long id) {
        String url = this.dbUrl + "/task";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (TaskDetailsDTO)this.commonRestTemplate.getForObject(url1, TaskDetailsDTO.class);
    }

    public void removeTask(Long id) {
        String url = this.dbUrl + "/task";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public ApprovalResponseDTO approveTask(Long taskId, ApprovalRequestDTO approvalRequest) {
        String url = this.dbUrl + "/updateTask";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(taskId));
        return (ApprovalResponseDTO)this.commonRestTemplate.postForObject(url1, (Object)approvalRequest, ApprovalResponseDTO.class);
    }

    public TaskStatusResponseDTO retrieveTaskStatusCount(Long empId, String dateRange) {
        String url = this.dbUrl + "/retrieveTaskStatusCount";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(empId));
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (TaskStatusResponseDTO)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

