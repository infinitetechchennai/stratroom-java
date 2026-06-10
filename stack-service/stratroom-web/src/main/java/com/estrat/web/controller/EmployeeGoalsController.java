/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.EmployeeGoalsController
 *  com.estrat.web.dto.EmployeeGoalsDTO
 *  com.estrat.web.dto.EmployeeGoalsResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeGoalsService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
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

import com.estrat.web.dto.EmployeeGoalsDTO;
import com.estrat.web.dto.EmployeeGoalsResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeGoalsService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
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
public class EmployeeGoalsController {
    @Autowired
    private EmployeeGoalsService employeeGoalsService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> saveEmployeeGoals(@RequestBody EmployeeGoalsDTO employeeGoalsDTO, HttpServletRequest request) throws RequestException {
        employeeGoalsDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.employeeGoalsService.saveEmployeeGoals(employeeGoalsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> updateEmployeeGoals(@RequestBody EmployeeGoalsDTO employeeGoalsDTO, HttpServletRequest request) throws RequestException {
        employeeGoalsDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.employeeGoalsService.updateEmployeeGoals(employeeGoalsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/goals/{id}"})
    public ResponseEntity<EmployeeGoalsDTO> retrieveEmployeeGoals(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.employeeGoalsService.retrieveEmployeeGoals(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/goals/{id}"})
    public ResponseEntity<Boolean> removeEmployeeGoals(@PathVariable(value="id") Long id) throws RequestException {
        this.employeeGoalsService.removeEmployeeGoals(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/goalsList"})
    public ResponseEntity<List<EmployeeGoalsDTO>> findAll(HttpServletRequest request) throws RequestException {
        List employeeGoalsDTOS = this.employeeGoalsService.findAll(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(employeeGoalsDTOS, HttpStatus.OK);
    }
}

