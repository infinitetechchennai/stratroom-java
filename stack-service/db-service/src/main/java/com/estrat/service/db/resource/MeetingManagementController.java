/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MeetingManagement
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.MeetingManagementDTO
 *  com.estrat.service.db.dto.MeetingManagementResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.MeetingManagementController
 *  com.estrat.service.db.resource.util.DateUtil
 *  com.estrat.service.db.resource.util.NotificationUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.MeetingManagementService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.MeetingManagement;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.MeetingManagementDTO;
import com.estrat.service.db.dto.MeetingManagementResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.DateUtil;
import com.estrat.service.db.resource.util.NotificationUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.MeetingManagementService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
public class MeetingManagementController {
    @Autowired
    protected MeetingManagementService meetingManagementService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> saveMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (meetingManagementDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getCreatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getUpdatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getOwner());
            meetingManagementDTO.getMeetingManagementValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        MeetingManagement meetingManagement = new MeetingManagement(this.meetingManagementService.formatDate(meetingManagementDTO));
        meetingManagement.setCreatedTime(LocalDateTime.now());
        if (Objects.nonNull(meetingManagementDTO.getMeetingManagementValue().get("fromtime")) && Objects.nonNull(meetingManagementDTO.getMeetingManagementValue().get("zoneId"))) {
            String meetingTime = meetingManagementDTO.getMeetingManagementValue().get("fromtime").toString();
            String zoneId = meetingManagementDTO.getMeetingManagementValue().get("zoneId").toString();
            meetingManagement.setMeetingTime(DateUtil.convertDateTimeObject((String)meetingTime, (String)zoneId));
        }
        MeetingManagementResponseDTO meetingManagementResponseDTO = this.meetingManagementService.save(meetingManagement);
        this.auditService.saveAudit("Meeting ", meetingManagementResponseDTO.getMeetingManagementDTO().getId(), meetingManagementResponseDTO.getMeetingManagementDTO().getCreatedBy(), "Meeting Created");
        this.notification.saveNotification((Object)meetingManagementResponseDTO, UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)meetingManagementResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> updateMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (meetingManagementDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getCreatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getUpdatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getOwner());
            meetingManagementDTO.getMeetingManagementValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        MeetingManagement meetingManagement = new MeetingManagement(this.meetingManagementService.formatDate(meetingManagementDTO));
        meetingManagement.setUpdatedTime(LocalDateTime.now());
        if (Objects.nonNull(meetingManagementDTO.getMeetingManagementValue().get("fromtime")) && Objects.nonNull(meetingManagementDTO.getMeetingManagementValue().get("zoneId"))) {
            String meetingTime = meetingManagementDTO.getMeetingManagementValue().get("fromtime").toString();
            String zoneId = meetingManagementDTO.getMeetingManagementValue().get("zoneId").toString();
            meetingManagement.setMeetingTime(DateUtil.convertDateTimeObject((String)meetingTime, (String)zoneId));
        }
        MeetingManagementResponseDTO meetingManagementResponseDTO = this.meetingManagementService.save(meetingManagement);
        if (!meetingManagementDTO.isRecommendationmethod()) {
            this.auditService.saveAudit("Meeting ", meetingManagementResponseDTO.getMeetingManagementDTO().getId(), meetingManagementResponseDTO.getMeetingManagementDTO().getUpdatedBy(), "Meeting Modified");
        }
        this.notification.saveNotification((Object)meetingManagementResponseDTO, UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)meetingManagementResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<MeetingManagementDTO> getMeetingManagementById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        MeetingManagement meetingManagement = (MeetingManagement)this.meetingManagementService.findById(id.longValue()).get();
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        MeetingManagementDTO responseMeetingManagementDTO = new MeetingManagementDTO(meetingManagement, flag);
        return new ResponseEntity((Object)responseMeetingManagementDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<MeetingManagementResponseDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional meetingManagement = this.meetingManagementService.findById(id.longValue());
        this.auditService.saveAudit("Meeting ", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Meeting Deleted");
        return new ResponseEntity((Object)this.meetingManagementService.deleteByMeetingObj(meetingManagement), HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagementList/{empId}"})
    public ResponseEntity<List<MeetingManagementDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List responseMeetingManagementDTOList = this.meetingManagementService.findAll(empId, pageId, dateRange);
        return new ResponseEntity((Object)responseMeetingManagementDTOList, HttpStatus.OK);
    }

    public MeetingManagementResponseDTO save(MeetingManagement meetingManagement) {
        MeetingManagementDTO meetingManagementDTO = new MeetingManagementDTO(meetingManagement, false);
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (meetingManagementDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getCreatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getUpdatedBy());
            meetingManagementDTO.getMeetingManagementValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (meetingManagementDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(meetingManagementDTO.getOwner());
            meetingManagementDTO.getMeetingManagementValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        MeetingManagement meetingManagement1 = new MeetingManagement(meetingManagementDTO);
        meetingManagement1.setUpdatedTime(LocalDateTime.now());
        MeetingManagementResponseDTO meetingManagementResponseDTO = this.meetingManagementService.save(meetingManagement);
        return meetingManagementResponseDTO;
    }

    @GetMapping(value={"/setMeetingDate"})
    public ResponseEntity<String> scoreCardListByDate() {
        this.meetingManagementService.saveSetDate();
        return new ResponseEntity((Object)"success", HttpStatus.OK);
    }
}

