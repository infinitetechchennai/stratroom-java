/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.OrgChartService
 *  com.estrat.web.service.OrgChartService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.Employee;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.OrgChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;

@Component
public class OrgChartService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${chartservice.orgchart.url}")
    private String orgChartUrl;

    public Employee fetchOrgChartDetails(String empId) throws RequestException {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (Employee)this.restTemplate.getForObject(this.orgChartUrl + empId + "/employeeList", (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


