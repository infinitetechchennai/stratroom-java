/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.EmployeeGoalsDTO
 *  com.estrat.backend.user.dto.EmployeeGoalsResponseDTO
 *  com.estrat.backend.user.service.EmployeeGoalsService
 *  com.estrat.backend.user.service.EmployeeGoalsService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.EmployeeGoalsDTO;
import com.estrat.backend.user.dto.EmployeeGoalsResponseDTO;
import com.estrat.backend.user.service.EmployeeGoalsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class EmployeeGoalsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.goals.url}")
    private String goalUrl;
    @Value(value="${dbservice.goalsList.url}")
    private String goalList;

    public EmployeeGoalsResponseDTO saveEmployeeGoals(EmployeeGoalsDTO employeeGoalsDTO) {
        return (EmployeeGoalsResponseDTO)this.commonRestTemplate.postForObject(this.goalUrl, (Object)employeeGoalsDTO, EmployeeGoalsResponseDTO.class);
    }

    public EmployeeGoalsResponseDTO updateEmployeeGoals(EmployeeGoalsDTO employeeGoalsDTO) {
        return (EmployeeGoalsResponseDTO)this.commonRestTemplate.putForObject(this.goalUrl, (Object)employeeGoalsDTO, EmployeeGoalsResponseDTO.class);
    }

    public EmployeeGoalsDTO retrieveEmployeeGoals(Long id) {
        String url = String.join((CharSequence)"/", this.goalUrl, String.valueOf(id));
        EmployeeGoalsDTO employeeGoalsDTO = (EmployeeGoalsDTO)this.commonRestTemplate.getForObject(url, EmployeeGoalsDTO.class);
        return employeeGoalsDTO;
    }

    public void removeEmployeeGoals(Long id) {
        String url = this.goalUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<EmployeeGoalsDTO> findAll(long empId) {
        String url = this.goalList + "/" + empId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

