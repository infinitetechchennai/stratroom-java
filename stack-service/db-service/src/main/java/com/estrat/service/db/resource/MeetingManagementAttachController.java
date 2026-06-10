/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MeetingManagementAttachment
 *  com.estrat.service.db.dto.MeetingManagementAttachmentDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.MeetingManagementAttachController
 *  com.estrat.service.db.service.MeetingManagementAttachmentService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.MeetingManagementAttachment;
import com.estrat.service.db.dto.MeetingManagementAttachmentDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.MeetingManagementAttachmentService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
        MeetingManagementAttachment meetingManagementAttachment = new MeetingManagementAttachment(managementAttachmentDTO);
        meetingManagementAttachment.setCreatedTime(LocalDateTime.now());
        MeetingManagementAttachmentDTO response = this.managementAttachmentService.save(meetingManagementAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/meetingAttach/{id}"})
    public ResponseEntity<MeetingManagementAttachmentDTO> getMeetingManagementAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        MeetingManagementAttachmentDTO managementAttachmentDTO = new MeetingManagementAttachmentDTO((MeetingManagementAttachment)this.managementAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)managementAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/meetingAttach"})
    public ResponseEntity<MeetingManagementAttachmentDTO> updateMeetingManagementAttachmentById(@RequestBody MeetingManagementAttachmentDTO managementAttachmentDTO) throws RequestException {
        MeetingManagementAttachment meetingManagementAttachment = new MeetingManagementAttachment(managementAttachmentDTO);
        if (Objects.isNull(managementAttachmentDTO.getCreatedTime())) {
            meetingManagementAttachment.setCreatedTime(LocalDateTime.now());
        }
        meetingManagementAttachment.setUpdatedTime(LocalDateTime.now());
        MeetingManagementAttachmentDTO response = this.managementAttachmentService.save(meetingManagementAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/meetingAttach/{id}"})
    public ResponseEntity<Boolean> deleteMeetingManagementAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional meetingManagementAttachment = this.managementAttachmentService.findById(id.longValue());
        if (meetingManagementAttachment.isPresent()) {
            MeetingManagementAttachment managementAttachment = (MeetingManagementAttachment)meetingManagementAttachment.get();
            this.managementAttachmentService.delete(managementAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/meetingAttachList/{meetingId}"})
    public ResponseEntity<List<MeetingManagementAttachmentDTO>> meetingAttachList(@PathVariable(value="meetingId") Long meetingId) throws RequestException {
        List MeetingManagementAttachmentDTOList = this.managementAttachmentService.findAll(meetingId.longValue());
        return new ResponseEntity((Object)MeetingManagementAttachmentDTOList, HttpStatus.OK);
    }
}

