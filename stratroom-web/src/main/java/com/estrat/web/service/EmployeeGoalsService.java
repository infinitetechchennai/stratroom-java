/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.EmployeeGoalsDTO
 *  com.estrat.web.dto.EmployeeGoalsResponseDTO
 *  com.estrat.web.service.EmployeeGoalsService
 *  com.estrat.web.service.EmployeeGoalsService$1
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.EmployeeGoalsDTO;
import com.estrat.web.dto.EmployeeGoalsResponseDTO;
import com.estrat.web.service.EmployeeGoalsService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class EmployeeGoalsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${userservice.goals.url}")
    private String goalUrl;
    @Value(value="${userservice.goalsList.url}")
    private String goalList;

    public EmployeeGoalsResponseDTO saveEmployeeGoals(EmployeeGoalsDTO employeeGoalsDTO) {
        return (EmployeeGoalsResponseDTO)this.commonRestTemplate.postForObject(this.goalUrl, employeeGoalsDTO, EmployeeGoalsResponseDTO.class);
    }

    public EmployeeGoalsResponseDTO updateEmployeeGoals(EmployeeGoalsDTO employeeGoalsDTO) {
        return (EmployeeGoalsResponseDTO)this.commonRestTemplate.putForObject(this.goalUrl, employeeGoalsDTO, EmployeeGoalsResponseDTO.class);
    }

    public EmployeeGoalsDTO retrieveEmployeeGoals(Long id) {
        String url = String.join((CharSequence)"/", this.goalUrl, String.valueOf(id));
        EmployeeGoalsDTO employeeGoalsDTO = (EmployeeGoalsDTO)this.commonRestTemplate.getForObject(url, EmployeeGoalsDTO.class);
        employeeGoalsDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)employeeGoalsDTO.getCreatedTime()));
        employeeGoalsDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)employeeGoalsDTO.getUpdatedTime()));
        return employeeGoalsDTO;
    }

    public void removeEmployeeGoals(Long id) {
        String url = this.goalUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<EmployeeGoalsDTO> findAll(long empId) {
        String url = this.goalList + "/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List employeeGoalsDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        for (Object _obj_employeeGoalsDTO : employeeGoalsDTOList) {
            EmployeeGoalsDTO employeeGoalsDTO = (EmployeeGoalsDTO) _obj_employeeGoalsDTO;
            employeeGoalsDTO.setGoalsValue(DateUtil.singleDateFormatDates((Map)employeeGoalsDTO.getGoalsValue(), (String)"goals"));
        }
        return employeeGoalsDTOList;
    }
}


