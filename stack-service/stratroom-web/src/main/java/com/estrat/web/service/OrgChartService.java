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
        // Use a typed ParameterizedTypeReference<Employee> so RestTemplate decodes
        // the JSON directly into our Employee DTO instead of a LinkedHashMap, which
        // would then ClassCastException when cast to Employee.
        org.springframework.core.ParameterizedTypeReference<Employee> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Employee>() {};
        return (Employee)this.restTemplate.getForObject(this.orgChartUrl + empId + "/employeeList", parameterizedTypeReference);
    }

    /**
     * Raw pass-through variant -- returns the upstream JSON as a Map without going
     * through the Employee DTO. The legacy org-structure JS reads ownerName/deptName
     * /designation/location/profileImage directly from each node, which the Employee
     * DTO's @JsonProperty mappings (name/dept/title/image only) silently drop.
     */
    public Object fetchOrgChartDetailsRaw(String empId) throws RequestException {
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return this.restTemplate.getForObject(this.orgChartUrl + empId + "/employeeList", parameterizedTypeReference);
    }
}


