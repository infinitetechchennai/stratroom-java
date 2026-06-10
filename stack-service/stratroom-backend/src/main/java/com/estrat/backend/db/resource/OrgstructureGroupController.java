/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.MeetingManagementResponseDTO
 *  com.estrat.backend.db.dto.OrgstructureGroupDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.OrgstructureGroupController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.OrgstructureGroupService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.OrgstructureGroup;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.MeetingManagementResponseDTO;
import com.estrat.backend.db.dto.OrgstructureGroupDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.OrgstructureGroupService;
import java.time.LocalDateTime;
import java.util.List;
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
public class OrgstructureGroupController {
    @Autowired
    protected OrgstructureGroupService orgstructureGroupService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> save(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (orgstructureGroupDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getCreatedBy());
            orgstructureGroupDTO.getGroupValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (orgstructureGroupDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getUpdatedBy());
            orgstructureGroupDTO.getGroupValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (orgstructureGroupDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getOwner());
            orgstructureGroupDTO.getGroupValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        OrgstructureGroup orgstructureGroup = new OrgstructureGroup(orgstructureGroupDTO);
        orgstructureGroup.setCreatedTime(LocalDateTime.now());
        OrgstructureGroupDTO responseDTO = this.orgstructureGroupService.save(orgstructureGroup);
        this.auditService.saveAudit("OrgGroup ", responseDTO.getId(), responseDTO.getCreatedBy(), "OrgGroup Created");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> updateMeetingManagement(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (orgstructureGroupDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getCreatedBy());
            orgstructureGroupDTO.getGroupValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (orgstructureGroupDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getUpdatedBy());
            orgstructureGroupDTO.getGroupValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (orgstructureGroupDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(orgstructureGroupDTO.getOwner());
            orgstructureGroupDTO.getGroupValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        OrgstructureGroup orgstructureGroup = new OrgstructureGroup(orgstructureGroupDTO);
        orgstructureGroup.setUpdatedTime(LocalDateTime.now());
        OrgstructureGroupDTO responseDTO = this.orgstructureGroupService.save(orgstructureGroup);
        this.auditService.saveAudit("OrgGroup ", responseDTO.getId(), responseDTO.getUpdatedBy(), "OrgGroup Modified");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<OrgstructureGroupDTO> getMeetingManagementById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        OrgstructureGroup orgstructureGroup = (OrgstructureGroup)this.orgstructureGroupService.findById(id.longValue()).get();
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        OrgstructureGroupDTO responseDTO = new OrgstructureGroupDTO(orgstructureGroup);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<MeetingManagementResponseDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional group = this.orgstructureGroupService.findById(id.longValue());
        this.auditService.saveAudit("OrgGroup ", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "OrgGroup Deleted");
        return new ResponseEntity((Object)this.orgstructureGroupService.deleteByObj(group), HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroupList"})
    public ResponseEntity<List<OrgstructureGroupDTO>> findAllMasterValue() {
        return new ResponseEntity((Object)this.orgstructureGroupService.findAllValue(), HttpStatus.OK);
    }
}

