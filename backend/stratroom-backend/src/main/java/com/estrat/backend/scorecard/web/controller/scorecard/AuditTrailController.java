/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.AuditDTO
 *  com.estrat.backend.scorecard.dto.FindDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.AuditTrailService
 *  com.estrat.backend.scorecard.web.controller.scorecard.AuditTrailController
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.AuditDTO;
import com.estrat.backend.scorecard.dto.FindDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.AuditTrailService;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditTrailController {
    @Autowired
    protected AuditTrailService auditTrailService;

    @PostMapping(value={"/auditTrail"})
    public ResponseEntity<AuditDTO> saveAuditDetails(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditTrailService.save(auditDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrail"})
    public ResponseEntity<List<AuditDTO>> getAuditDetails(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditTrailService.findAuditDetails(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrailActionList"})
    public ResponseEntity<List<String>> getAuditTrailActionList(HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditTrailService.findAuditTrailActionList(), HttpStatus.OK);
    }

    @GetMapping(value={"/clearLogOut"})
    public ResponseEntity<AuditDTO> clearLogOut() throws RequestException {
        return new ResponseEntity((Object)this.auditTrailService.clearLogOutUser(), HttpStatus.OK);
    }

    @PostMapping(value={"/preAuditTrail"})
    public ResponseEntity<AuditDTO> savePreAuditTrail(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditTrailService.savePreAuditTrail(auditDTO), HttpStatus.OK);
    }
}

