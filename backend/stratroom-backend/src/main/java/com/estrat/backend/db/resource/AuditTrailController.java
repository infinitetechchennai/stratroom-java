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
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

    /** Legacy-compatible list endpoint used by the React audit trail page. */
    @GetMapping(value={"/auditTrailList"})
    public ResponseEntity<List<AuditDTO>> auditTrailList(
            @RequestParam(value="dateRange", required=false) String dateRange,
            @RequestParam(value="performedBy", required=false) Long performedBy,
            @RequestParam(value="action", required=false) String action,
            HttpServletRequest request) throws RequestException {
        FindDTO findDTO = new FindDTO();
        String orgHeader = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isNotEmpty(orgHeader)) {
            findDTO.setOrgId(Long.valueOf(orgHeader));
        }
        if (performedBy != null) {
            findDTO.setPerformedBy(performedBy);
        }
        if (StringUtils.isNotEmpty(dateRange)) {
            findDTO.setDateRange(dateRange);
        }
        if (StringUtils.isNotEmpty(action)) {
            findDTO.setAction(action);
        }
        return new ResponseEntity((Object)this.auditDetailsService.findAuditDetails(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/downloadAuditTrail"})
    public ResponseEntity<byte[]> downloadAuditTrail(
            @RequestParam(value="dateRange", required=false) String dateRange,
            @RequestParam(value="performedBy", required=false) Long performedBy,
            @RequestParam(value="action", required=false) String action) throws RequestException {
        FindDTO findDTO = new FindDTO();
        String orgHeader = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isNotEmpty(orgHeader)) {
            findDTO.setOrgId(Long.valueOf(orgHeader));
        }
        if (performedBy != null) {
            findDTO.setPerformedBy(performedBy);
        }
        if (StringUtils.isNotEmpty(dateRange)) {
            findDTO.setDateRange(dateRange);
        }
        if (StringUtils.isNotEmpty(action)) {
            findDTO.setAction(action);
        }
        List<AuditDTO> rows = this.auditDetailsService.findAuditDetails(findDTO);
        StringBuilder csv = new StringBuilder("Performed By,Action,Additional Information,Date/Time,IP Address\n");
        SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        for (AuditDTO row : rows) {
            String when = row.getAccessDate() != null ? fmt.format(row.getAccessDate())
                    : (row.getCreatedTime() != null ? row.getCreatedTime().toString() : "");
            csv.append(csvCell(row.getUserName())).append(',')
                    .append(csvCell(row.getAction())).append(',')
                    .append(csvCell(row.getType())).append(',')
                    .append(csvCell(when)).append(',')
                    .append(csvCell(row.getSystemIp())).append('\n');
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=audit-trail.csv")
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .body(bytes);
    }

    private static String csvCell(String value) {
        if (value == null) {
            return "";
        }
        String escaped = value.replace("\"", "\"\"");
        return "\"" + escaped + "\"";
    }

    @GetMapping(value={"/clearLogOut"})
    public ResponseEntity<AuditDTO> clearLogOut() throws RequestException {
        return new ResponseEntity((Object)this.auditDetailsService.clearLogOutUser(), HttpStatus.OK);
    }

    @PostMapping(value={"/preAuditTrail"})
    public ResponseEntity<AuditDTO> savePreAuditTrail(@RequestBody AuditDTO auditDTO, HttpServletRequest request) throws RequestException {
        // Pre-login audit logging is best-effort: a failure here (e.g. no matching
        // employee profile yet) must never break the login page.
        try {
            return new ResponseEntity((Object)this.auditDetailsService.save(auditDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity((Object)auditDTO, HttpStatus.OK);
        }
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

