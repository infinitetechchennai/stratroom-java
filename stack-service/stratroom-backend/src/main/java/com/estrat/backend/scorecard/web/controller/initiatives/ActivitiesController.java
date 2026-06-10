/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ActivitiesDTO
 *  com.estrat.backend.scorecard.dto.ActivitiesMapDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.ActivitiesService
 *  com.estrat.backend.scorecard.web.controller.initiatives.ActivitiesController
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
package com.estrat.backend.scorecard.web.controller.initiatives;

import com.estrat.backend.scorecard.dto.ActivitiesDTO;
import com.estrat.backend.scorecard.dto.ActivitiesMapDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.ActivitiesService;
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
public class ActivitiesController {
    @Autowired
    protected ActivitiesService activitiesAndTasksService;

    @PostMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> saveActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.activitiesAndTasksService.saveActivity(activitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> updateActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.activitiesAndTasksService.updateActivities(activitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/activities/{id}"})
    public ResponseEntity<ActivitiesDTO> getActivitiesAndTasksDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.activitiesAndTasksService.retriveActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activities/{id}"})
    public ResponseEntity<Boolean> deleteActivitiesAndTasksDetailsById(@PathVariable Long id) throws RequestException {
        this.activitiesAndTasksService.removeActivities(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/activitieslist/{initiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesList/{empId}"})
    public ResponseEntity<List<ActivitiesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List activitiesList = this.activitiesAndTasksService.findAllByEmpId(empId);
        return new ResponseEntity((Object)activitiesList, HttpStatus.OK);
    }

    @PostMapping(value={"/activitiesMap"})
    public ResponseEntity<ActivitiesMapDTO> saveActivitiesMap(@RequestBody ActivitiesMapDTO activitiesMapDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.activitiesAndTasksService.saveActivitiesMap(activitiesMapDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesMapList/{activitiesId}"})
    public ResponseEntity<List<ActivitiesMapDTO>> retrieveActivitiesMapList(@PathVariable(value="activitiesId") Long activitiesId) throws RequestException {
        List activitiesMapDTOList = this.activitiesAndTasksService.retrieveActivitiesMapList(activitiesId);
        return new ResponseEntity((Object)activitiesMapDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesLists/{initiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> retrieveActivitiesList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.retrieveActivitiesList(initiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/activitiesLists/{empId}"})
    public ResponseEntity<List<ActivitiesDTO>> activitiesLists(@PathVariable(value="empId") Long empId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findByEmpId(empId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativeLists/{subInitiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> retrieveSubInitiveList(@PathVariable(value="subInitiativeId") Long subInitiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.retrieveSubInitiativeList(subInitiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }
}

