/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.EmployeeDocumentsDTO
 *  com.estrat.web.service.DocumentService
 *  com.estrat.web.service.DocumentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.EmployeeDocumentsDTO;
import com.estrat.web.service.DocumentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${userservice.documents.url}")
    private String documentsUrl;
    @Value(value="${userservice.documentsList.url}")
    private String documentsList;

    public EmployeeDocumentsDTO saveEmployeeDocuments(EmployeeDocumentsDTO employeeDocumentsDTO) {
        return (EmployeeDocumentsDTO)this.commonRestTemplate.postForObject(this.documentsUrl, employeeDocumentsDTO, EmployeeDocumentsDTO.class);
    }

    public EmployeeDocumentsDTO updateEmployeeDocuments(EmployeeDocumentsDTO employeeDocumentsDTO) {
        return (EmployeeDocumentsDTO)this.commonRestTemplate.putForObject(this.documentsUrl, employeeDocumentsDTO, EmployeeDocumentsDTO.class);
    }

    public EmployeeDocumentsDTO retrieveEmployeeDocuments(Long id) {
        String url = String.join((CharSequence)"/", this.documentsUrl, String.valueOf(id));
        EmployeeDocumentsDTO employeeDocumentsDTO = (EmployeeDocumentsDTO)this.commonRestTemplate.getForObject(url, EmployeeDocumentsDTO.class);
        return employeeDocumentsDTO;
    }

    public void removeEmployeeDocuments(Long id) {
        String url = this.documentsUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<EmployeeDocumentsDTO> findAll(long empId) {
        String url = this.documentsList + "/" + empId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


