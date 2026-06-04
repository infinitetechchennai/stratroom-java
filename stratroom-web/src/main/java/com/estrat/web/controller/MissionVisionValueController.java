/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MissionVisionValueController
 *  com.estrat.web.dto.MissionVisionValueDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.MissionVisionValueService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.MissionVisionValueDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.MissionVisionValueService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> saveMVV(@RequestBody MissionVisionValueDto missionVisionValueDto, HttpServletRequest request) throws RequestException {
        missionVisionValueDto.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.misionVisionValueService.saveMVV(missionVisionValueDto), HttpStatus.OK);
    }

    @PutMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> updateMVV(@RequestBody MissionVisionValueDto missionVisionValueDto, HttpServletRequest request) throws RequestException {
        missionVisionValueDto.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.misionVisionValueService.updateMVV(missionVisionValueDto), HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValue/{id}"})
    public ResponseEntity<MissionVisionValueDto> getMVVById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.misionVisionValueService.retrieveMVV(id), HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValueList/{empId}"})
    public ResponseEntity<List<MissionVisionValueDto>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        List meetingManagementDTOS = this.misionVisionValueService.findAll(empId);
        return new ResponseEntity(meetingManagementDTOS, HttpStatus.OK);
    }
}

