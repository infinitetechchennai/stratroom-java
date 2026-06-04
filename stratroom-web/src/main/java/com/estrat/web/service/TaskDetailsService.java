/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ApprovalRequestDTO
 *  com.estrat.web.dto.ApprovalResponseDTO
 *  com.estrat.web.dto.TaskCategorysDTO
 *  com.estrat.web.dto.TaskDetailsDTO
 *  com.estrat.web.dto.TaskStatusResponseDTO
 *  com.estrat.web.service.TaskDetailsService
 *  com.estrat.web.service.TaskDetailsService$1
 *  com.estrat.web.service.TaskDetailsService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ApprovalRequestDTO;
import com.estrat.web.dto.ApprovalResponseDTO;
import com.estrat.web.dto.TaskCategorysDTO;
import com.estrat.web.dto.TaskDetailsDTO;
import com.estrat.web.dto.TaskStatusResponseDTO;
import com.estrat.web.service.TaskDetailsService;
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
    @Value(value="${scorecard.service.url}")
    private String dbUrl;

    public TaskCategorysDTO saveCategory(TaskCategorysDTO taskCategorysDTO) {
        String url = this.dbUrl + "/taskCategory";
        return (TaskCategorysDTO)this.commonRestTemplate.postForObject(url, taskCategorysDTO, TaskCategorysDTO.class);
    }

    public TaskCategorysDTO updateCategory(TaskCategorysDTO taskCategorysDTO) {
        String url = this.dbUrl + "/taskCategory";
        return (TaskCategorysDTO)this.commonRestTemplate.putForObject(url, taskCategorysDTO, TaskCategorysDTO.class);
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
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public TaskDetailsDTO saveTask(TaskDetailsDTO taskDetailsDTO) {
        String url = this.dbUrl + "/task";
        return (TaskDetailsDTO)this.commonRestTemplate.postForObject(url, taskDetailsDTO, TaskDetailsDTO.class);
    }

    public TaskDetailsDTO updateTask(TaskDetailsDTO taskDetailsDTO) {
        String url = this.dbUrl + "/task";
        return (TaskDetailsDTO)this.commonRestTemplate.putForObject(url, taskDetailsDTO, TaskDetailsDTO.class);
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
        return (ApprovalResponseDTO)this.commonRestTemplate.postForObject(url1, approvalRequest, ApprovalResponseDTO.class);
    }

    public TaskStatusResponseDTO retrieveTaskStatusCount(Long empId, String dateRange) {
        String url = this.dbUrl + "/retrieveTaskStatusCount";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(empId));
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (TaskStatusResponseDTO)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


