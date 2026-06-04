/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeDocuments
 *  com.estrat.service.db.dao.EmployeeDocumentsRepository
 *  com.estrat.service.db.dto.EmployeeDocumentsDTO
 *  com.estrat.service.db.service.EmployeeDocumentsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.EmployeeDocuments;
import com.estrat.service.db.dao.EmployeeDocumentsRepository;
import com.estrat.service.db.dto.EmployeeDocumentsDTO;
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
        this.employeeDocumentsRepository.delete((Object)employeeDocuments);
    }

    public List<EmployeeDocumentsDTO> findAll(long empId) {
        List dbList = this.employeeDocumentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<EmployeeDocumentsDTO> documentsDTOList = dbList.stream().map(dbValue -> {
            EmployeeDocumentsDTO employeeDocumentsDTO = new EmployeeDocumentsDTO(dbValue);
            return employeeDocumentsDTO;
        }).collect(Collectors.toList());
        return documentsDTOList;
    }
}

