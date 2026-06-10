/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeDocuments
 *  com.estrat.backend.db.dao.EmployeeDocumentsRepository
 *  com.estrat.backend.db.dto.EmployeeDocumentsDTO
 *  com.estrat.backend.db.service.EmployeeDocumentsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.EmployeeDocuments;
import com.estrat.backend.db.dao.EmployeeDocumentsRepository;
import com.estrat.backend.db.dto.EmployeeDocumentsDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDocumentsService {
    @Autowired
    protected EmployeeDocumentsRepository employeeDocumentsRepository;

    public Optional<EmployeeDocuments> findById(long id) {
        return this.employeeDocumentsRepository.findById(id);
    }

    public EmployeeDocumentsDTO save(EmployeeDocuments employeeDocuments) {
        EmployeeDocuments employeeDocuments1 = (EmployeeDocuments)this.employeeDocumentsRepository.save(employeeDocuments);
        EmployeeDocumentsDTO responseDTO = new EmployeeDocumentsDTO(employeeDocuments1);
        return responseDTO;
    }

    public void delete(EmployeeDocuments employeeDocuments) {
        this.employeeDocumentsRepository.delete(employeeDocuments);
    }

    public List<EmployeeDocumentsDTO> findAll(long empId) {
        List<EmployeeDocuments> dbList = this.employeeDocumentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<EmployeeDocumentsDTO> documentsDTOList = dbList.stream().map(dbValue -> {
            EmployeeDocumentsDTO employeeDocumentsDTO = new EmployeeDocumentsDTO(dbValue);
            return employeeDocumentsDTO;
        }).collect(Collectors.toList());
        return documentsDTOList;
    }
}

