/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.EmployeeDocumentsDTO
 *  com.estrat.backend.user.service.DocumentService
 *  com.estrat.backend.user.service.DocumentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.EmployeeDocumentsDTO;
import com.estrat.backend.user.service.DocumentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.documents.url}")
    private String documentsUrl;
    @Value(value="${dbservice.documentsList.url}")
    private String documentsList;

    public EmployeeDocumentsDTO saveEmployeeDocuments(EmployeeDocumentsDTO employeeDocumentsDTO) {
        return (EmployeeDocumentsDTO)this.commonRestTemplate.postForObject(this.documentsUrl, (Object)employeeDocumentsDTO, EmployeeDocumentsDTO.class);
    }

    public EmployeeDocumentsDTO updateEmployeeDocuments(EmployeeDocumentsDTO employeeDocumentsDTO) {
        return (EmployeeDocumentsDTO)this.commonRestTemplate.putForObject(this.documentsUrl, (Object)employeeDocumentsDTO, EmployeeDocumentsDTO.class);
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
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

