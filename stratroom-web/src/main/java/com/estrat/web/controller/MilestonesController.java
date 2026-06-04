/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MilestonesController
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.MilestonesService
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

import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.MilestonesService;
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
public class MilestonesController {
    @Autowired
    protected MilestonesService milestonesService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> saveMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO, HttpServletRequest request) throws RequestException {
        milestonesDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.milestonesService.createMilestones(milestonesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> updateMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO, HttpServletRequest request) throws RequestException {
        milestonesDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.milestonesService.updateMilestones(milestonesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/milestones/{id}"})
    public ResponseEntity<MilestonesDTO> getMilestonesDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.milestonesService.retriveMilestones(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/milestones/{id}"})
    public ResponseEntity<Boolean> deleteMilestonesById(@PathVariable Long id) throws RequestException {
        this.milestonesService.removeMilestones(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/milestonesList/{initiativeId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List milestonesDTOSList = this.milestonesService.findAllByInitiativesId(initiativeId);
        if (!milestonesDTOSList.isEmpty()) {
            return new ResponseEntity(milestonesDTOSList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveMilestonesList/{empId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List mileStonesList = this.milestonesService.findAllByEmpId(empId);
        return new ResponseEntity(mileStonesList, HttpStatus.OK);
    }
}

