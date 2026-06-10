/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.SubActivitiesDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.SubActivitiesService
 *  com.estrat.backend.scorecard.web.controller.initiatives.SubActivitiesController
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

import com.estrat.backend.scorecard.dto.SubActivitiesDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.SubActivitiesService;
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
public class SubActivitiesController {
    @Autowired
    protected SubActivitiesService subActivitiesService;

    @PostMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> saveSubActivities(@RequestBody SubActivitiesDTO activitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.subActivitiesService.saveSubActivity(activitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> updateSubActivities(@RequestBody SubActivitiesDTO activitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.subActivitiesService.updateSubActivities(activitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subactivities/{id}"})
    public ResponseEntity<SubActivitiesDTO> getSubActivities(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.subActivitiesService.retriveSubActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subactivities/{id}"})
    public ResponseEntity<Boolean> deleteSubActivities(@PathVariable(value="id") Long id) throws RequestException {
        this.subActivitiesService.removeSubActivities(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/subActivitieslist/{activityId}"})
    public ResponseEntity<List<SubActivitiesDTO>> findAllByActivityId(@PathVariable Long activityId) throws RequestException {
        List activitiesAndTasksDTOS = this.subActivitiesService.findAllByActivityId(activityId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/subActivitiesLists/{empId}"})
    public ResponseEntity<List<SubActivitiesDTO>> subactivitiesLists(@PathVariable(value="empId") Long empId) throws RequestException {
        List activitiesAndTasksDTOS = this.subActivitiesService.findByEmpId(empId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }
}

