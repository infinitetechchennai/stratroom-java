/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditDetails
 *  com.estrat.backend.db.bean.po.IpAddress
 *  com.estrat.backend.db.dto.AuditDTO
 *  com.estrat.backend.db.dto.FindDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.AuditTrailController
 *  com.estrat.backend.db.service.AuditDetailsService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.AuditDetails;
import com.estrat.backend.db.bean.po.IpAddress;
import com.estrat.backend.db.dto.AuditDTO;
import com.estrat.backend.db.dto.FindDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.AuditDetailsService;
import java.util.Date;
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
    protected AuditDetailsService auditDetailsService;

    @PostMapping(value={"/auditTrail"})
    public ResponseEntity<AuditDTO> saveAuditDetails(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        this.updateAuditTrail(auditDTO);
        AuditDetails auditDetails = new AuditDetails(auditDTO);
        auditDetails.setCreatedTime(this.auditDetailsService.getCurrentTimeUTC());
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        return new ResponseEntity((Object)this.auditDetailsService.save(auditDetails), HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrail"})
    public ResponseEntity<List<AuditDTO>> getAuditDetails(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditDetailsService.findAuditDetails(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditTrailActionList"})
    public ResponseEntity<List<String>> getAuditTrailActionList(HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditDetailsService.getAuditTrailActionList(), HttpStatus.OK);
    }

    @GetMapping(value={"/clearLogOut"})
    public ResponseEntity<AuditDTO> clearLogOut() throws RequestException {
        return new ResponseEntity((Object)this.auditDetailsService.clearLogOutUser(), HttpStatus.OK);
    }

    @PostMapping(value={"/preAuditTrail"})
    public ResponseEntity<AuditDTO> savePreAuditTrail(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditDetailsService.save(auditDTO), HttpStatus.OK);
    }

    public void updateAuditTrail(AuditDTO auditDTO) {
        if (auditDTO.getAction().equals("User Login")) {
            if (auditDTO.getSystemIp() != null) {
                IpAddress ipAddress = new IpAddress();
                ipAddress.setEmpId(auditDTO.getUserId());
                ipAddress.setIpAddress(auditDTO.getSystemIp());
                ipAddress.setOrgId(auditDTO.getOrgId());
                ipAddress = this.auditDetailsService.save(ipAddress);
            }
        } else if (auditDTO.getAction().equals("User Logout")) {
            IpAddress ipAddress = this.auditDetailsService.getOne(Long.valueOf(auditDTO.getUserId()));
            auditDTO.setSystemIp(ipAddress.getIpAddress());
        } else {
            auditDTO.setSystemIp(this.auditDetailsService.getIpAddress());
        }
    }
}

