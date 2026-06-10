/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.config.CommonRestTemplate
 *  com.estrat.service.user.dto.DeptDetails
 *  com.estrat.service.user.dto.FindDTO
 *  com.estrat.service.user.service.DepartmentDetailsService
 *  com.estrat.service.user.service.DepartmentDetailsService$1
 *  com.estrat.service.user.service.DepartmentDetailsService$2
 *  com.estrat.service.user.service.DepartmentDetailsService$3
 *  com.estrat.service.user.service.DepartmentDetailsService$4
 *  com.estrat.service.user.service.DepartmentDetailsService$5
 *  com.estrat.service.user.service.DepartmentDetailsService$6
 *  com.estrat.service.user.service.DepartmentDetailsService$7
 *  com.estrat.service.user.service.DepartmentDetailsService$8
 *  com.estrat.service.user.service.DepartmentDetailsService$9
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.service.user.service;

import com.estrat.service.user.config.CommonRestTemplate;
import com.estrat.service.user.dto.DeptDetails;
import com.estrat.service.user.dto.FindDTO;
import com.estrat.service.user.service.DepartmentDetailsService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class DepartmentDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public Map<String, Object> saveDepartmentDetails(DeptDetails deptDetails) {
        String url = this.dbUrl + "departmentDetails";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.postForObject(url, (Object)deptDetails, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> updateDepartmentDetails(DeptDetails deptDetails) {
        String url = this.dbUrl + "departmentDetails";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.putForObject(url, (Object)deptDetails, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAll() {
        String url = this.dbUrl + "allDepartmentList";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Integer> getYearsForDropdown() {
        String url = this.dbUrl + "years";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAllByOrgId(long orgId, String datePeriod, String name) {
        String url = this.dbUrl + "allDepartmentListByOrgId";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("name", new Object[]{name}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAllByOrgId(long orgId) {
        String url = this.dbUrl + "departmentListByOrgId";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DeptDetails findByDeptName(FindDTO findDTO) {
        String url = this.dbUrl + "findByDeptName";
        return (DeptDetails)this.commonRestTemplate.getForObject(url, (Object)findDTO, DeptDetails.class);
    }

    public DeptDetails findByDeptUniqueId(FindDTO findDTO) {
        String url = this.dbUrl + "findByDeptUniqueId";
        return (DeptDetails)this.commonRestTemplate.getForObject(url, (Object)findDTO, DeptDetails.class);
    }

    public DeptDetails findById(Long deptId) {
        String url = this.dbUrl + "findByDeptId/" + deptId;
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        return (DeptDetails)this.commonRestTemplate.getForObject(restoreUrl, DeptDetails.class);
    }

    public List<DeptDetails> allDepartmentListByLoginUser(long empId, String datePeriod, String name) {
        String url = this.dbUrl + "allDepartmentListByLoginUser";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("empId", new Object[]{empId}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("name", new Object[]{name}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> ownerMappingDepartmentList(long empId) {
        String url = this.dbUrl + "ownerMappingDepartmentList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("empId", new Object[]{empId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> departmentReportees() {
        String url = this.dbUrl + "departmentReportees";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

