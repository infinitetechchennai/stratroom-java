/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.NotificationDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KpiStatusNotification
 *  com.estrat.service.db.dto.NotificationDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.NotificationController
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.NotificationService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
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

import com.estrat.service.db.bean.po.NotificationDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KpiStatusNotification;
import com.estrat.service.db.dto.NotificationDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.NotificationService;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
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
public class NotificationController {
    @Autowired
    protected NotificationService notificationService;
    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value={"/notification"})
    public ResponseEntity<NotificationDTO> saveNotification(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (notificationDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getCreatedBy());
            notificationDTO.getNotificationValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (notificationDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getUpdatedBy());
            notificationDTO.getNotificationValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (notificationDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getOwner());
            notificationDTO.getNotificationValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        notificationDTO.getNotificationValue().put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        notificationDTO.getNotificationValue().put("dateTime", dateTime);
        notificationDTO.setCreatedTime(LocalDateTime.now());
        NotificationDTO responseDTO = this.notificationService.save(notificationDTO);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/notification"})
    public ResponseEntity<NotificationDTO> updateNotificationDetails(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (notificationDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getCreatedBy());
            notificationDTO.getNotificationValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (notificationDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getUpdatedBy());
            notificationDTO.getNotificationValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (notificationDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(notificationDTO.getOwner());
            notificationDTO.getNotificationValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        notificationDTO.getNotificationValue().put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        notificationDTO.getNotificationValue().put("dateTime", dateTime);
        notificationDTO.setUpdatedTime(LocalDateTime.now());
        NotificationDTO response = this.notificationService.save(notificationDTO);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/notification/{id}"})
    public ResponseEntity<NotificationDTO> getNotificationDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        NotificationDetails notificationDetails = (NotificationDetails)this.notificationService.findById(id.longValue()).get();
        NotificationDTO responseDTO = new NotificationDTO(notificationDetails);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/notification/{id}"})
    public ResponseEntity<Boolean> deleteNotificationDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional notificationDetails = this.notificationService.findById(id.longValue());
        this.notificationService.delete((NotificationDetails)notificationDetails.get());
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/notificationList/{empId}"})
    public ResponseEntity<List<NotificationDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="notificationType", required=false) String notificationType, @RequestParam(value="targetValue", required=false) String targetValue, @RequestParam(value="meetingIntervalCheck", required=false) String meetingIntervalCheck, @RequestParam(value="readFlag", required=false) String readFlag) throws RequestException {
        boolean flag;
        boolean meetingIntervalFlag = StringUtils.isNotEmpty((CharSequence)meetingIntervalCheck) ? Boolean.valueOf(meetingIntervalCheck) : false;
        boolean memberRead = StringUtils.isNotEmpty((CharSequence)readFlag) ? Boolean.valueOf(readFlag) : false;
        boolean bl = flag = StringUtils.isNotEmpty((CharSequence)notificationType) || StringUtils.isNotEmpty((CharSequence)targetValue);
        if (meetingIntervalFlag) {
            return new ResponseEntity((Object)this.notificationService.findByMeetingTime(empId), HttpStatus.OK);
        }
        if (flag) {
            List responseDTOList = this.notificationService.getNotificationByType(notificationType, targetValue, Long.valueOf(empId));
            return new ResponseEntity((Object)responseDTOList, HttpStatus.OK);
        }
        List responseDTOList = this.notificationService.findAll(empId);
        if (memberRead) {
            this.notificationService.updateNotificationStatus(responseDTOList);
        }
        return new ResponseEntity((Object)responseDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/kpistatusnotification"})
    public ResponseEntity<NotificationDTO> kpistatusnotification(@RequestBody KpiStatusNotification notificationDTO, HttpServletRequest request) throws RequestException {
        this.notificationService.sendKPINotification(notificationDTO);
        return new ResponseEntity((Object)new NotificationDTO(), HttpStatus.OK);
    }
}

