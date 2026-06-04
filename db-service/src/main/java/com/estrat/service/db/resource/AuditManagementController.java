/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditManagement
 *  com.estrat.service.db.dto.AuditDashBoardResponseDTO
 *  com.estrat.service.db.dto.AuditManagementDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.AuditManagementController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.AuditManagementService
 *  com.estrat.service.db.service.EmployeeService
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

import com.estrat.service.db.bean.po.AuditManagement;
import com.estrat.service.db.dto.AuditDashBoardResponseDTO;
import com.estrat.service.db.dto.AuditManagementDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.AuditManagementService;
import com.estrat.service.db.service.EmployeeService;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
public class AuditManagementController {
    @Autowired
    protected AuditManagementService auditManagementService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> savePlanning(@RequestBody AuditManagementDTO auditManagementDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (auditManagementDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getCreatedBy());
            auditManagementDTO.getManagementValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (auditManagementDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getUpdatedBy());
            auditManagementDTO.getManagementValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (auditManagementDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getOwner());
            auditManagementDTO.getManagementValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        AuditManagement planning = new AuditManagement(auditManagementDTO);
        planning.setCreatedTime(LocalDateTime.now());
        AuditManagementDTO responseDTO = this.auditManagementService.save(planning);
        this.auditService.saveAudit("AuditManagement PLanning ", responseDTO.getId(), responseDTO.getCreatedBy(), "Audit Management Planning Created");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> updatePlanning(@RequestBody AuditManagementDTO auditManagementDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (auditManagementDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getCreatedBy());
            auditManagementDTO.getManagementValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (auditManagementDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getUpdatedBy());
            auditManagementDTO.getManagementValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (auditManagementDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(auditManagementDTO.getOwner());
            auditManagementDTO.getManagementValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        AuditManagement planning = new AuditManagement(auditManagementDTO);
        planning.setUpdatedTime(LocalDateTime.now());
        AuditManagementDTO responseDTO = this.auditManagementService.save(planning);
        this.auditService.saveAudit("AuditManagement PLanning ", responseDTO.getId(), responseDTO.getUpdatedBy(), "Audit Management Planning Modified");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<AuditManagementDTO> getById(@PathVariable(value="id") Long id) throws RequestException {
        AuditManagement planning = (AuditManagement)this.auditManagementService.findById(id.longValue()).get();
        AuditManagementDTO responseManagementDTO = new AuditManagementDTO(planning);
        return new ResponseEntity((Object)responseManagementDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<AuditManagementDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional projectPlanning = this.auditManagementService.findById(id.longValue());
        this.auditService.saveAudit("AuditManagement PLanning ", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Audit Management Deleted");
        return new ResponseEntity((Object)this.auditManagementService.deleteByObj(projectPlanning), HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagementList"})
    public ResponseEntity<List<AuditManagementDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List responseManagementDTOList = this.auditManagementService.findAllByPageId(pageId);
        return new ResponseEntity((Object)responseManagementDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/auditDashBoardData"})
    public ResponseEntity<AuditDashBoardResponseDTO> initiativeDashBoardDataDeptId(@RequestParam(value="deptId", required=false) Long deptId) throws RequestException, ParseException {
        List responseRiskDTOList = this.auditManagementService.findAllByDeptId(deptId);
        AuditDashBoardResponseDTO dashboardDTO = this.auditManagementService.buildIAuditDashboard(responseRiskDTOList);
        return new ResponseEntity((Object)dashboardDTO, HttpStatus.OK);
    }
}

