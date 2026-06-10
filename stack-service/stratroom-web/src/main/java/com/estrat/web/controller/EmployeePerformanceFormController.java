/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.EmployeePerformanceFormController
 *  com.estrat.web.dto.EmployeePerformanceFormDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeePerformanceFormService
 *  com.estrat.web.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.EmployeePerformanceFormDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeePerformanceFormService;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeePerformanceFormController {
    @Autowired
    private EmployeePerformanceFormService employeePerformanceFormService;

    @PostMapping(value={"/employeePerformance"})
    public ResponseEntity<EmployeePerformanceFormDTO> savePerformance(@RequestBody EmployeePerformanceFormDTO employeePerformanceFormDTO) throws RequestException {
        employeePerformanceFormDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        System.out.println("enter in performance cotroller");
        return new ResponseEntity(this.employeePerformanceFormService.savePerformance(employeePerformanceFormDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/employeePerformance"})
    public ResponseEntity<EmployeePerformanceFormDTO> updatePerformance(@RequestBody EmployeePerformanceFormDTO employeePerformanceFormDTO) throws RequestException {
        employeePerformanceFormDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.employeePerformanceFormService.updatePerformance(employeePerformanceFormDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<EmployeePerformanceFormDTO> getPerformance(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.employeePerformanceFormService.retrievePerformance(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<Boolean> deletePerformance(@PathVariable(value="id") Long id) throws RequestException {
        this.employeePerformanceFormService.removePerformance(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePerformanceFormList/{empId}"})
    public ResponseEntity<List<EmployeePerformanceFormDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.employeePerformanceFormService.findAllByEmpId(empId);
        return new ResponseEntity(RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }
}

