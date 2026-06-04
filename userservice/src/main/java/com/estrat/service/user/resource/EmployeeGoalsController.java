/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.EmployeeGoalsDTO
 *  com.estrat.service.user.dto.EmployeeGoalsResponseDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.EmployeeGoalsController
 *  com.estrat.service.user.resource.util.StatusUtil
 *  com.estrat.service.user.service.EmployeeGoalsService
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
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.EmployeeGoalsDTO;
import com.estrat.service.user.dto.EmployeeGoalsResponseDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.resource.util.StatusUtil;
import com.estrat.service.user.service.EmployeeGoalsService;
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
public class EmployeeGoalsController {
    @Autowired
    private EmployeeGoalsService employeeGoalsService;
    @Autowired
    private StatusUtil statusUtil;

    @PostMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> saveEmployeeGoals(@RequestBody EmployeeGoalsDTO employeeGoalsDTO) throws RequestException {
        return new ResponseEntity((Object)this.employeeGoalsService.saveEmployeeGoals(employeeGoalsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> updateEmployeeGoals(@RequestBody EmployeeGoalsDTO employeeGoalsDTO) throws RequestException {
        return new ResponseEntity((Object)this.employeeGoalsService.updateEmployeeGoals(employeeGoalsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/goals/{id}"})
    public ResponseEntity<EmployeeGoalsDTO> retrieveEmployeeGoals(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.employeeGoalsService.retrieveEmployeeGoals(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/goals/{id}"})
    public ResponseEntity<Boolean> removeEmployeeGoals(@PathVariable(value="id") Long id) throws RequestException {
        this.employeeGoalsService.removeEmployeeGoals(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/goalsList/{empId}"})
    public ResponseEntity<List<EmployeeGoalsDTO>> findAll(@PathVariable(value="empId") Long empId) throws RequestException {
        List employeeGoalsDTOS = this.employeeGoalsService.findAll(empId.longValue());
        if (!employeeGoalsDTOS.isEmpty()) {
            for (EmployeeGoalsDTO employeeGoalsDTO : (List<EmployeeGoalsDTO>) employeeGoalsDTOS) {
                this.statusUtil.updateStatusByProgress(employeeGoalsDTO.getGoalsValue());
            }
        }
        return new ResponseEntity((Object)employeeGoalsDTOS, HttpStatus.OK);
    }
}

