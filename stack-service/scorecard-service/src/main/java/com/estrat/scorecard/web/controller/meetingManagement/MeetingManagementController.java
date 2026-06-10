/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MeetingManagementDTO
 *  com.estrat.scorecard.dto.MeetingManagementResponseDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.MeetingManagementService
 *  com.estrat.scorecard.web.controller.meetingManagement.MeetingManagementController
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
package com.estrat.scorecard.web.controller.meetingManagement;

import com.estrat.scorecard.dto.MeetingManagementDTO;
import com.estrat.scorecard.dto.MeetingManagementResponseDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.MeetingManagementService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeetingManagementController {
    @Autowired
    private MeetingManagementService meetingManagementService;

    @PostMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> saveMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO) throws RequestException {
        return new ResponseEntity((Object)this.meetingManagementService.saveMeetingManagement(meetingManagementDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> updateMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO) throws RequestException {
        return new ResponseEntity((Object)this.meetingManagementService.updateMeetingManagement(meetingManagementDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<MeetingManagementDTO> getMeetingManagementById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity((Object)this.meetingManagementService.retrieveMeetingManagement(id, flag), HttpStatus.OK);
    }

    @DeleteMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<Boolean> deleteMeetingManagementById(@PathVariable(value="id") Long id) throws RequestException {
        this.meetingManagementService.removeMeetingManagement(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagementList/{empId}"})
    public ResponseEntity<List<MeetingManagementDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List meetingManagementDTOS = this.meetingManagementService.findAll(empId, pageId, dateRange);
        return new ResponseEntity((Object)meetingManagementDTOS, HttpStatus.OK);
    }
}

