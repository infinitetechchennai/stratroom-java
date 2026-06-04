/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.DepartmentDetailsService$1
 *  com.estrat.web.service.DepartmentDetailsService$2
 *  com.estrat.web.service.DepartmentDetailsService$3
 *  com.estrat.web.service.DepartmentDetailsService$4
 *  com.estrat.web.service.DepartmentDetailsService$5
 *  com.estrat.web.service.DepartmentDetailsService$6
 *  com.estrat.web.service.DepartmentDetailsService$7
 *  com.estrat.web.service.DepartmentDetailsService$8
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.service.DepartmentDetailsService;
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
    @Value(value="${userservice.menus.url}")
    private String userUrl;

    public Map<String, Object> saveDepartmentDetails(DeptDetails deptDetails) {
        String url = this.userUrl + "/departmentDetails";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (Map)this.commonRestTemplate.postForObject(url, deptDetails, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public Map<String, Object> updateDepartmentDetails(DeptDetails deptDetails) {
        String url = this.userUrl + "/departmentDetails";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (Map)this.commonRestTemplate.putForObject(url, deptDetails, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAll() {
        String url = this.userUrl + "/allDepartmentList";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAllByOrgId(long orgId) {
        String url = this.userUrl + "/departmentListByOrgId";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> findAllByOrgId(long orgId, String datePeriod, String name) {
        String url = this.userUrl + "/allDepartmentListByOrgId";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("name", new Object[]{name}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public DeptDetails findByDeptName(FindDTO findDTO) {
        String url = this.userUrl + "/findByDeptName";
        return (DeptDetails)this.commonRestTemplate.getForObject(url, findDTO, DeptDetails.class);
    }

    public DeptDetails findByDeptUniqueId(FindDTO findDTO) {
        String url = this.userUrl + "/findByDeptUniqueId";
        return (DeptDetails)this.commonRestTemplate.getForObject(url, findDTO, DeptDetails.class);
    }

    public DeptDetails findById(Long deptId) {
        String url = this.userUrl + "/findByDeptId/" + deptId;
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        return (DeptDetails)this.commonRestTemplate.getForObject(restoreUrl, DeptDetails.class);
    }

    public List<DeptDetails> allDepartmentListByLoginUser(long empId, String datePeriod, String name) {
        String url = this.userUrl + "/allDepartmentListByLoginUser";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("empId", new Object[]{empId}).queryParam("datePeriod", new Object[]{datePeriod}).queryParam("name", new Object[]{name}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> ownerMappingDepartmentList(long empId) {
        String url = this.userUrl + "/ownerMappingDepartmentList";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("empId", new Object[]{empId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<DeptDetails> departmentReportees() {
        String url = this.userUrl + "/departmentReportees";
        String restoreUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(restoreUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


