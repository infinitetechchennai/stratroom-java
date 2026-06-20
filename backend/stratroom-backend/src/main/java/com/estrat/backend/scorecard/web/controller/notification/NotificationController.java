/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.NotificationDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.NotificationService
 *  com.estrat.backend.scorecard.web.controller.notification.NotificationController
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
package com.estrat.backend.scorecard.web.controller.notification;

import com.estrat.backend.scorecard.dto.NotificationDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.NotificationService;
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
public class NotificationController {
    @Autowired
    protected NotificationService notificationService;

    @PostMapping(value={"/notification"})
    public ResponseEntity<NotificationDTO> saveNotification(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.notificationService.saveNotification(notificationDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/notification"})
    public ResponseEntity<NotificationDTO> updateNotificationDetails(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.notificationService.updateNotification(notificationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/notification/{id}"})
    public ResponseEntity<NotificationDTO> getNotificationDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.notificationService.retrieveNotification(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/notification/{id}"})
    public ResponseEntity<Boolean> deleteNotificationDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.notificationService.removeNotification(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/notificationList/{empId}"})
    public ResponseEntity<List<NotificationDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="notificationType", required=false) String notificationType, @RequestParam(value="targetValue", required=false) String targetValue, @RequestParam(value="meetingIntervalCheck", required=false) String meetingIntervalCheck, @RequestParam(value="readFlag", required=false) String readFlag) throws RequestException {
        return new ResponseEntity((Object)this.notificationService.findAll(empId, notificationType, targetValue, meetingIntervalCheck, readFlag), HttpStatus.OK);
    }
}

