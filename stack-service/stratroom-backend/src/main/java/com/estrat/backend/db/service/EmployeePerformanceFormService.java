/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeePerformanceForm
 *  com.estrat.backend.db.dao.EmployeePerformanceFormRepository
 *  com.estrat.backend.db.dto.EmployeePerformanceFormDTO
 *  com.estrat.backend.db.service.EmployeePerformanceFormService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.EmployeePerformanceForm;
import com.estrat.backend.db.dao.EmployeePerformanceFormRepository;
import com.estrat.backend.db.dto.EmployeePerformanceFormDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeePerformanceFormService {
    @Autowired
    protected EmployeePerformanceFormRepository employeePerformanceFormRepository;

    public Optional<EmployeePerformanceForm> findById(long id) {
        return this.employeePerformanceFormRepository.findById(id);
    }

    public EmployeePerformanceFormDTO save(EmployeePerformanceForm employeePerformanceForm) {
        EmployeePerformanceForm response = this.employeePerformanceFormRepository.save(employeePerformanceForm);
        EmployeePerformanceFormDTO taskDTO = new EmployeePerformanceFormDTO(response);
        return taskDTO;
    }

    public void delete(EmployeePerformanceForm employeePerformanceForm) {
        this.employeePerformanceFormRepository.delete(employeePerformanceForm);
    }

    public List<EmployeePerformanceFormDTO> findAll(long empId) {
        List<EmployeePerformanceForm> dbList = this.employeePerformanceFormRepository.findAllByEmpId(Long.valueOf(empId));
        return dbList.stream().map(dbValue -> new EmployeePerformanceFormDTO(dbValue)).collect(Collectors.toList());
    }
}

