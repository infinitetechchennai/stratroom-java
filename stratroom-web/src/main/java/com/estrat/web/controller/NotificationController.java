/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.NotificationController
 *  com.estrat.web.dto.NotificationDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.NotificationService
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
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.NotificationDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.NotificationService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {
    @Autowired
    protected NotificationService notificationService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/notification"})
    public ResponseEntity<NotificationDTO> saveNotification(@RequestBody NotificationDTO notificationDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.notificationService.saveNotification(notificationDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/notification/{id}"})
    public ResponseEntity<NotificationDTO> updateNotificationDetails(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        NotificationDTO notificationDTO = this.notificationService.retrieveNotification(id);
        notificationDTO.setStatus("read");
        return new ResponseEntity(this.notificationService.updateNotification(notificationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/notification/{id}"})
    public ResponseEntity<NotificationDTO> getNotificationDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.notificationService.retrieveNotification(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/notification/{id}"})
    public ResponseEntity<Boolean> deleteNotificationDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.notificationService.removeNotification(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/notificationList"})
    public ResponseEntity<List<NotificationDTO>> findAll(@RequestParam(value="notificationType", required=false) String notificationType, @RequestParam(value="targetValue", required=false) String targetValue, @RequestParam(value="meetingIntervalCheck", required=false) String meetingIntervalCheck, @RequestParam(value="readFlag", required=false) String readFlag, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.notificationService.findAll(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), notificationType, targetValue, meetingIntervalCheck, readFlag), HttpStatus.OK);
    }
}

