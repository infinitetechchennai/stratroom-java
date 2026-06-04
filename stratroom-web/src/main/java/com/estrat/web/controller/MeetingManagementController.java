/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MeetingManagementController
 *  com.estrat.web.dto.MeetingManagementDTO
 *  com.estrat.web.dto.MeetingManagementResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.MeetingManagementService
 *  com.estrat.web.util.RepositoryServices
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
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.MeetingManagementDTO;
import com.estrat.web.dto.MeetingManagementResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.MeetingManagementService;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.RequestSessionUtil;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
public class MeetingManagementController {
    public static final String S3_ASSET_PATHS = "/meetingManagementDocuments";
    @Autowired
    private MeetingManagementService meetingManagementService;
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> saveMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO, HttpServletRequest request) throws RequestException {
        meetingManagementDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.meetingManagementService.saveMeetingManagement(meetingManagementDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/meetingManagement"})
    public ResponseEntity<MeetingManagementResponseDTO> updateMeetingManagement(@RequestBody MeetingManagementDTO meetingManagementDTO, HttpServletRequest request) throws RequestException {
        meetingManagementDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.meetingManagementService.updateMeetingManagement(meetingManagementDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<MeetingManagementDTO> getMeetingManagementById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity(this.meetingManagementService.retrieveMeetingManagement(id, flag), HttpStatus.OK);
    }

    @DeleteMapping(value={"/meetingManagement/{id}"})
    public ResponseEntity<Boolean> deleteMeetingManagementById(@PathVariable(value="id") Long id) throws RequestException {
        this.meetingManagementService.removeMeetingManagement(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/meetingManagementList/{empId}"})
    public ResponseEntity<List<MeetingManagementDTO>> findAll(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List meetingManagementDTOS = this.meetingManagementService.findAll(empId.longValue(), pageId, dateRange);
        return new ResponseEntity(meetingManagementDTOS, HttpStatus.OK);
    }

    @PostMapping(value={"/updateAttachment"})
    public ResponseEntity<Map> updateAttachmentForMeetingManagement(@RequestParam(value="file") MultipartFile attachFile) throws RequestException {
        HashMap map = new HashMap();
        try {
            String fileName = attachFile.getOriginalFilename();
            InputStream inputStreamFile = attachFile.getInputStream();
            this.repositoryServices.putAsset(S3_ASSET_PATHS, fileName, inputStreamFile);
            String attachmentUrl = this.getS3ObjectLink(fileName);
            map.put("attachmentUrl", attachmentUrl);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity(map, HttpStatus.OK);
    }

    private String getS3ObjectLink(String fileName) throws UnsupportedEncodingException {
        return "http://" + this.repositoryServices.getAmazonBucket() + ".s3.amazonaws.com" + S3_ASSET_PATHS + "/" + URLEncoder.encode(fileName, "UTF-8");
    }
}

