/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.SubActivitiesController
 *  com.estrat.web.dto.SubActivitiesDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.SubActivitiesService
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

import com.estrat.web.dto.SubActivitiesDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.SubActivitiesService;
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
public class SubActivitiesController {
    @Autowired
    protected SubActivitiesService subActivitiesService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> saveSubActivities(@RequestBody SubActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        activitiesDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.subActivitiesService.saveSubActivity(activitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> updateSubActivities(@RequestBody SubActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        activitiesDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.subActivitiesService.updateSubActivities(activitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subactivities/{id}"})
    public ResponseEntity<SubActivitiesDTO> getSubActivities(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.subActivitiesService.retriveSubActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subactivities/{id}"})
    public ResponseEntity<Boolean> deleteSubActivities(@PathVariable(value="id") Long id) throws RequestException {
        this.subActivitiesService.removeSubActivities(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/subActivitieslist/{activityId}"})
    public ResponseEntity<List<SubActivitiesDTO>> findAllByActivityId(@PathVariable Long activityId) throws RequestException {
        List activitiesAndTasksDTOS = this.subActivitiesService.findAllByActivityId(activityId);
        return new ResponseEntity(activitiesAndTasksDTOS, HttpStatus.OK);
    }
}

