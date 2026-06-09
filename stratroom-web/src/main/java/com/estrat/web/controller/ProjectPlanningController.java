/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ProjectPlanningController
 *  com.estrat.web.dto.ProjectPlanningDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ProjectPlanningService
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
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ProjectPlanningDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ProjectPlanningService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectPlanningController {
    @Autowired
    private ProjectPlanningService projectPlanningService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/projectPlanning"})
    public ResponseEntity<ProjectPlanningDTO> saveProject(@RequestBody ProjectPlanningDTO projectPlanningDTO, HttpServletRequest request) throws RequestException {
        projectPlanningDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.projectPlanningService.saveProject(projectPlanningDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/projectPlanning"})
    public ResponseEntity<ProjectPlanningDTO> updateProject(@RequestBody ProjectPlanningDTO projectPlanningDTO, HttpServletRequest request) throws RequestException {
        projectPlanningDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.projectPlanningService.updateProject(projectPlanningDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/projectPlanning/{id}"})
    public ResponseEntity<ProjectPlanningDTO> getProject(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.projectPlanningService.retrieveProject(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/projectPlanning/{id}"})
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value="id") Long id) throws RequestException {
        this.projectPlanningService.removeProject(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/projectPlanningList"})
    public ResponseEntity<List<ProjectPlanningDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        System.out.println("dateRange ===> " + dateRange);
        List meetingManagementDTOS = this.projectPlanningService.findAll(pageId, dateRange);
        return new ResponseEntity(meetingManagementDTOS, HttpStatus.OK);
    }
}

