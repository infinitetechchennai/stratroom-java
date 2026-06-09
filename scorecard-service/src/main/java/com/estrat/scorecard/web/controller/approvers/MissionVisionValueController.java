/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MissionVisionValueDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.MissionVisionValueService
 *  com.estrat.scorecard.web.controller.approvers.MissionVisionValueController
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
package com.estrat.scorecard.web.controller.approvers;

import com.estrat.scorecard.dto.MissionVisionValueDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.MissionVisionValueService;
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
public class MissionVisionValueController {
    @Autowired
    private MissionVisionValueService misionVisionValueService;

    @PostMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> saveMVV(@RequestBody MissionVisionValueDto missionVisionValueDto) throws RequestException {
        return new ResponseEntity((Object)this.misionVisionValueService.saveMVV(missionVisionValueDto), HttpStatus.OK);
    }

    @PutMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> updateMVV(@RequestBody MissionVisionValueDto missionVisionValueDto) throws RequestException {
        return new ResponseEntity((Object)this.misionVisionValueService.updateMVV(missionVisionValueDto), HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValue/{id}"})
    public ResponseEntity<MissionVisionValueDto> getMVVById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.misionVisionValueService.retrieveMVV(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/missionVisionValue/{id}"})
    public ResponseEntity<Boolean> deleteMVVById(@PathVariable(value="id") Long id) throws RequestException {
        this.misionVisionValueService.removeMVV(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValueList/{empId}"})
    public ResponseEntity<List<MissionVisionValueDto>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        List meetingManagementDTOS = this.misionVisionValueService.findAll(empId);
        return new ResponseEntity((Object)meetingManagementDTOS, HttpStatus.OK);
    }
}

