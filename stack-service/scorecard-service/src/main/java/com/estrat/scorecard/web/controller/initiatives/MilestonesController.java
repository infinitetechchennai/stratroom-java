/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MilestonesDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.MilestonesService
 *  com.estrat.scorecard.util.KPIUtil
 *  com.estrat.scorecard.web.controller.initiatives.MilestonesController
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

import com.estrat.scorecard.dto.MilestonesDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.MilestonesService;
import com.estrat.scorecard.util.KPIUtil;
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
public class MilestonesController {
    @Autowired
    protected MilestonesService milestonesService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> saveMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO) throws RequestException {
        return new ResponseEntity((Object)this.milestonesService.createMilestones(milestonesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> updateMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO) throws RequestException {
        return new ResponseEntity((Object)this.milestonesService.updateMilestones(milestonesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/milestones/{id}"})
    public ResponseEntity<MilestonesDTO> getMilestonesDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.milestonesService.retriveMilestones(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/milestones/{id}"})
    public ResponseEntity<Boolean> deleteMilestonesById(@PathVariable Long id) throws RequestException {
        this.milestonesService.removeMilestones(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/milestonesList/{initiativeId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List milestonesDTOSList = this.milestonesService.findAllByInitiativesId(initiativeId);
        if (!milestonesDTOSList.isEmpty()) {
            for (com.estrat.scorecard.dto.MilestonesDTO milestonesDTO : (java.util.List<com.estrat.scorecard.dto.MilestonesDTO>)milestonesDTOSList) {
                this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
            }
        }
        return new ResponseEntity((Object)milestonesDTOSList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMilestonesList/{empId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List mileStonesList = this.milestonesService.findAllByEmpId(empId);
        if (!mileStonesList.isEmpty()) {
            for (com.estrat.scorecard.dto.MilestonesDTO milestonesDTO : (java.util.List<com.estrat.scorecard.dto.MilestonesDTO>)mileStonesList) {
                this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
            }
        }
        return new ResponseEntity((Object)mileStonesList, HttpStatus.OK);
    }

    @GetMapping(value={"/findAllMilestonesList/{initiativeId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllMilestonesList(@PathVariable Long initiativeId) throws RequestException {
        List milestonesDTOSList = this.milestonesService.findAllMilestonesList(initiativeId);
        if (!milestonesDTOSList.isEmpty()) {
            for (com.estrat.scorecard.dto.MilestonesDTO milestonesDTO : (java.util.List<com.estrat.scorecard.dto.MilestonesDTO>)milestonesDTOSList) {
                this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
            }
        }
        return new ResponseEntity((Object)milestonesDTOSList, HttpStatus.OK);
    }
}

