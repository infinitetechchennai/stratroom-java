/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.EmployeePerformanceFormDTO
 *  com.estrat.web.service.EmployeePerformanceFormService
 *  com.estrat.web.service.EmployeePerformanceFormService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.EmployeePerformanceFormDTO;
import com.estrat.web.service.EmployeePerformanceFormService;
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
    @Value(value="${scorecard.service.url}")
    private String dbUrl;

    public EmployeePerformanceFormDTO savePerformance(EmployeePerformanceFormDTO employeePerformanceFormDTO) {
        String url = this.dbUrl + "/employeePerformance";
        System.out.println("enter in performance service");
        return (EmployeePerformanceFormDTO)this.commonRestTemplate.postForObject(url, employeePerformanceFormDTO, EmployeePerformanceFormDTO.class);
    }

    public EmployeePerformanceFormDTO updatePerformance(EmployeePerformanceFormDTO employeePerformanceFormDTO) {
        String url = this.dbUrl + "/employeePerformance";
        return (EmployeePerformanceFormDTO)this.commonRestTemplate.putForObject(url, employeePerformanceFormDTO, EmployeePerformanceFormDTO.class);
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
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


