/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.EmployeePerformanceFormDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.EmployeePerformanceFormService
 *  com.estrat.backend.scorecard.web.controller.Performance.EmployeePerformanceFormController
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
package com.estrat.backend.scorecard.web.controller.Performance;

import com.estrat.backend.scorecard.dto.EmployeePerformanceFormDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.EmployeePerformanceFormService;
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
        System.out.println("enter in performance score cotroller");
        return new ResponseEntity((Object)this.employeePerformanceFormService.savePerformance(employeePerformanceFormDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/employeePerformance"})
    public ResponseEntity<EmployeePerformanceFormDTO> updatePerformance(@RequestBody EmployeePerformanceFormDTO employeePerformanceFormDTO) throws RequestException {
        return new ResponseEntity((Object)this.employeePerformanceFormService.updatePerformance(employeePerformanceFormDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<EmployeePerformanceFormDTO> getPerformance(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.employeePerformanceFormService.retrievePerformance(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<Boolean> deletePerformance(@PathVariable(value="id") Long id) throws RequestException {
        this.employeePerformanceFormService.removePerformance(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePerformanceFormList/{empId}"})
    public ResponseEntity<List<EmployeePerformanceFormDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.employeePerformanceFormService.findAllByEmpId(empId);
        return new ResponseEntity((Object)RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }
}

