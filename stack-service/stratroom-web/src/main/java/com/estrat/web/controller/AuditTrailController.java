/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.AuditTrailController
 *  com.estrat.web.dto.AuditDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.util.AuditTrailReader
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.AuditDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.util.AuditTrailReader;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditTrailController {
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected AuditTrailReader auditTrailReader;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/auditTrail"})
    public ResponseEntity<AuditDTO> saveAuditDetails(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        if (auditDTO.getUserId() == null) {
            if (auditDTO.getAction().equalsIgnoreCase("User Logout")) {
                auditDTO.setUserId(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
            } else {
                auditDTO.setUserId(Long.valueOf(this.sessionUtil.getSessionId(request)));
            }
        }
        auditDTO.setOrgId(Long.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()).longValue());
        auditDTO.setType("USER");
        AuditDTO response = this.auditTrailService.save(auditDTO);
        if (response.getAction().equalsIgnoreCase("User Logout")) {
            this.sessionUtil.clearSession();
        }
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrailList"})
    public ResponseEntity<List<AuditDTO>> getAuditDetails(@RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="performedBy", required=false) Long performedBy, @RequestParam(value="action", required=false) String action, HttpServletRequest request) throws RequestException {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        if (performedBy != null) {
            findDTO.setPerformedBy(performedBy);
        }
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            findDTO.setDateRange(dateRange);
        }
        if (StringUtils.isNotEmpty((CharSequence)action)) {
            findDTO.setAction(action);
        }
        return new ResponseEntity(this.auditTrailService.findAuditDetails(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrailActionList"})
    public ResponseEntity<List<String>> getAuditTrailActionList(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.auditTrailService.findAuditTrailActionList(), HttpStatus.OK);
    }

    @PostMapping(value={"/preAuditTrail"})
    public ResponseEntity<AuditDTO> savePreAuditTrail(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(new AuditDTO(), HttpStatus.OK);
    }

    @GetMapping(value={"/downloadAuditTrail"})
    public ResponseEntity<ByteArrayResource> downloadAuditTrail(@RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="performedBy", required=false) Long performedBy, @RequestParam(value="action", required=false) String action, HttpServletRequest request) throws Exception {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        if (performedBy != null) {
            findDTO.setPerformedBy(performedBy);
        }
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            findDTO.setDateRange(dateRange);
        }
        if (StringUtils.isNotEmpty((CharSequence)action)) {
            findDTO.setAction(action);
        }
        List auditDTOList = this.auditTrailService.findAuditDetails(findDTO);
        return this.auditTrailReader.writeDocForAuditTrail(auditDTOList);
    }
}

