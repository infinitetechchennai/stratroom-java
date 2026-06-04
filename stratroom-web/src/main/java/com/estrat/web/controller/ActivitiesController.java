/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ActivitiesController
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.ActivitiesMapDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ActivitiesService
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

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.ActivitiesMapDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
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
public class ActivitiesController {
    @Autowired
    protected ActivitiesService activitiesAndTasksService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> saveActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        activitiesDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.activitiesAndTasksService.saveActivity(activitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> updateActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        activitiesDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.activitiesAndTasksService.updateActivities(activitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/activities/{id}"})
    public ResponseEntity<ActivitiesDTO> getActivitiesAndTasksDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.activitiesAndTasksService.retriveActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activities/{id}"})
    public ResponseEntity<Boolean> deleteActivitiesAndTasksDetailsById(@PathVariable Long id) throws RequestException {
        this.activitiesAndTasksService.removeActivities(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/activitieslist/{initiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findAllByInitiativesId(initiativeId);
        if (!activitiesAndTasksDTOS.isEmpty()) {
            return new ResponseEntity(activitiesAndTasksDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveActivitiesList/{empId}"})
    public ResponseEntity<List<ActivitiesDTO>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List activitiesList = this.activitiesAndTasksService.findAllByEmpId(empId);
        return new ResponseEntity(activitiesList, HttpStatus.OK);
    }

    @PostMapping(value={"/activitiesMap"})
    public ResponseEntity<Boolean> saveActivitiesMap(@RequestBody List<ActivitiesMapDTO> activitiesMapDTOList, HttpServletRequest request) throws RequestException {
        this.activitiesAndTasksService.saveActivitiesMap(activitiesMapDTOList);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesMapList/{activitiesId}"})
    public ResponseEntity<List<ActivitiesMapDTO>> retrieveActivitiesMapList(@PathVariable(value="activitiesId") Long activitiesId) throws RequestException {
        List activitiesMapDTOList = this.activitiesAndTasksService.retrieveActivitiesMapList(activitiesId);
        return new ResponseEntity(activitiesMapDTOList, HttpStatus.OK);
    }
}

