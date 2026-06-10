/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MeetingManagementAttachmentDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.MeetingManagementAttachmentService
 *  com.estrat.scorecard.web.controller.meetingManagement.MeetingManagementAttachController
 *  javax.servlet.http.HttpServletRequest
 *  Logger
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
package com.estrat.scorecard.web.controller.meetingManagement;

import com.estrat.scorecard.dto.MeetingManagementAttachmentDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.MeetingManagementAttachmentService;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class MeetingManagementAttachController {
    private Logger log = LoggerFactory.getLogger(MeetingManagementAttachController.class);
    @Autowired
    protected MeetingManagementAttachmentService managementAttachmentService;

    @PostMapping(value={"/meetingAttach"})
    public ResponseEntity<MeetingManagementAttachmentDTO> saveMeetingManagementAttachment(@RequestBody MeetingManagementAttachmentDTO managementAttachmentDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.managementAttachmentService.save(managementAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/meetingAttach/{id}"})
    public ResponseEntity<MeetingManagementAttachmentDTO> getMeetingManagementAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.managementAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/meetingAttach"})
    public ResponseEntity<MeetingManagementAttachmentDTO> updateMeetingManagementAttachmentById(@RequestBody MeetingManagementAttachmentDTO managementAttachmentDTO) throws RequestException {
        return new ResponseEntity((Object)this.managementAttachmentService.update(managementAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/meetingAttach/{id}"})
    public ResponseEntity<Boolean> deleteMeetingManagementAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.managementAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/meetingAttachList/{meetingId}"})
    public ResponseEntity<List<MeetingManagementAttachmentDTO>> meetingAttachList(@PathVariable(value="meetingId") Long meetingId) throws RequestException {
        return new ResponseEntity((Object)this.managementAttachmentService.findAll(meetingId), HttpStatus.OK);
    }
}

