/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.InitiativeTaskController
 *  com.estrat.web.dto.InitiativeTaskDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.InitiativeTaskService
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

import com.estrat.web.dto.InitiativeTaskDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.InitiativeTaskService;
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
public class InitiativeTaskController {
    @Autowired
    protected InitiativeTaskService initiativeTaskService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> saveTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto, HttpServletRequest request) throws RequestException {
        initiativeTaskDto.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.initiativeTaskService.save(initiativeTaskDto), HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> updateTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto, HttpServletRequest request) throws RequestException {
        initiativeTaskDto.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.initiativeTaskService.update(initiativeTaskDto), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<InitiativeTaskDto> getTasksDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.initiativeTaskService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<Boolean> deleteTasksDetailsById(@PathVariable Long id) throws RequestException {
        this.initiativeTaskService.remove(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeTasklist/{initiativeId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.initiativeTaskService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity(activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveInitiativesTask/{empId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List taskDTOList = this.initiativeTaskService.findAllByEmpId(empId);
        return new ResponseEntity(taskDTOList, HttpStatus.OK);
    }
}

