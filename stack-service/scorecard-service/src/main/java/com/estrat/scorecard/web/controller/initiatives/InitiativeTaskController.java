/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.InitiativeTaskDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.InitiativeTaskService
 *  com.estrat.scorecard.web.controller.initiatives.InitiativeTaskController
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
package com.estrat.scorecard.web.controller.initiatives;

import com.estrat.scorecard.dto.InitiativeTaskDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.InitiativeTaskService;
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
public class InitiativeTaskController {
    @Autowired
    protected InitiativeTaskService initiativeTaskService;

    @PostMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> saveTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto) throws RequestException {
        return new ResponseEntity((Object)this.initiativeTaskService.save(initiativeTaskDto), HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> updateTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto) throws RequestException {
        return new ResponseEntity((Object)this.initiativeTaskService.update(initiativeTaskDto), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<InitiativeTaskDto> getTasksDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.initiativeTaskService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<Boolean> deleteTasksDetailsById(@PathVariable Long id) throws RequestException {
        this.initiativeTaskService.remove(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeTasklist/{initiativeId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.initiativeTaskService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveInitiativesTask/{empId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List taskDTOList = this.initiativeTaskService.findAllByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/initiativesTaskList/{empId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findBYEmpId(@PathVariable Long empId) throws RequestException {
        List taskDTOList = this.initiativeTaskService.findByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

