/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.EmployeePerformanceFormDTO
 *  com.estrat.scorecard.service.EmployeePerformanceFormService
 *  com.estrat.scorecard.service.EmployeePerformanceFormService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.EmployeePerformanceFormDTO;
import com.estrat.scorecard.service.EmployeePerformanceFormService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class EmployeePerformanceFormService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public EmployeePerformanceFormDTO savePerformance(EmployeePerformanceFormDTO employeePerformanceFormDTO) {
        String url = this.dbUrl + "/employeePerformance";
        System.out.println("enter in performance score seervice");
        return (EmployeePerformanceFormDTO)this.commonRestTemplate.postForObject(url, (Object)employeePerformanceFormDTO, EmployeePerformanceFormDTO.class);
    }

    public EmployeePerformanceFormDTO updatePerformance(EmployeePerformanceFormDTO employeePerformanceFormDTO) {
        String url = this.dbUrl + "/employeePerformance";
        return (EmployeePerformanceFormDTO)this.commonRestTemplate.putForObject(url, (Object)employeePerformanceFormDTO, EmployeePerformanceFormDTO.class);
    }

    public EmployeePerformanceFormDTO retrievePerformance(Long id) {
        String url = this.dbUrl + "/employeePerformance";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (EmployeePerformanceFormDTO)this.commonRestTemplate.getForObject(url1, EmployeePerformanceFormDTO.class);
    }

    public void removePerformance(Long id) {
        String url = this.dbUrl + "/employeePerformance";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<EmployeePerformanceFormDTO> findAllByEmpId(Long empId) {
        String url = this.dbUrl + "/retrievePerformanceFormList";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(empId));
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url1).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

