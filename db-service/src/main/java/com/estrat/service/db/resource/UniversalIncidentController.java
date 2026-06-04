/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.UniversalIncident
 *  com.estrat.service.db.bean.po.UniversalIncidentAttachment
 *  com.estrat.service.db.dao.UniversalIncidentAttachmentRepository
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.UniversalIncidentAttachmentDTO
 *  com.estrat.service.db.dto.UniversalIncidentDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.UniversalIncidentController
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.UniversalIncidentService
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

import com.estrat.service.db.bean.po.UniversalIncident;
import com.estrat.service.db.bean.po.UniversalIncidentAttachment;
import com.estrat.service.db.dao.UniversalIncidentAttachmentRepository;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.UniversalIncidentAttachmentDTO;
import com.estrat.service.db.dto.UniversalIncidentDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.UniversalIncidentService;
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
public class UniversalIncidentController {
    @Autowired
    protected UniversalIncidentService universalIncidentService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    protected UniversalIncidentAttachmentRepository incidentAttachmentRepository;

    @PostMapping(value={"/universalIncident"})
    public ResponseEntity<UniversalIncidentDTO> savePlanning(@RequestBody UniversalIncidentDTO universalIncidentDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (universalIncidentDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getCreatedBy());
            universalIncidentDTO.getIncidentValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (universalIncidentDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getUpdatedBy());
            universalIncidentDTO.getIncidentValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (universalIncidentDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getOwner());
            universalIncidentDTO.getIncidentValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        UniversalIncident planning = new UniversalIncident(universalIncidentDTO);
        planning.setCreatedTime(LocalDateTime.now());
        UniversalIncidentDTO responseDTO = this.universalIncidentService.save(planning);
        if (universalIncidentDTO.getIncidentAttachment() != null) {
            for (UniversalIncidentAttachmentDTO kpidoc : universalIncidentDTO.getIncidentAttachment()) {
                UniversalIncidentAttachment attachdocument = new UniversalIncidentAttachment(kpidoc);
                attachdocument.setCreatedTime(LocalDateTime.now());
                attachdocument.setCreatedBy(responseDTO.getCreatedBy());
                attachdocument.setIncidentId(responseDTO.getId());
                this.incidentAttachmentRepository.save(attachdocument);
            }
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/universalIncident"})
    public ResponseEntity<UniversalIncidentDTO> updatePlanning(@RequestBody UniversalIncidentDTO universalIncidentDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (universalIncidentDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getCreatedBy());
            universalIncidentDTO.getIncidentValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (universalIncidentDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getUpdatedBy());
            universalIncidentDTO.getIncidentValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (universalIncidentDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(universalIncidentDTO.getOwner());
            universalIncidentDTO.getIncidentValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        UniversalIncident planning = new UniversalIncident(universalIncidentDTO);
        planning.setUpdatedTime(LocalDateTime.now());
        UniversalIncidentDTO responseDTO = this.universalIncidentService.save(planning);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/universalIncident/{id}"})
    public ResponseEntity<UniversalIncidentDTO> getById(@PathVariable(value="id") Long id) throws RequestException {
        UniversalIncident planning = (UniversalIncident)this.universalIncidentService.findById(id.longValue()).get();
        UniversalIncidentDTO responseManagementDTO = new UniversalIncidentDTO(planning);
        return new ResponseEntity((Object)responseManagementDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/universalIncident/{id}"})
    public ResponseEntity<UniversalIncidentDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional universal = this.universalIncidentService.findById(id.longValue());
        return new ResponseEntity((Object)this.universalIncidentService.deleteByObj(universal), HttpStatus.OK);
    }

    @GetMapping(value={"/universalIncidentList"})
    public ResponseEntity<List<UniversalIncidentDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List responseManagementDTOList = this.universalIncidentService.findAllByPageId(pageId);
        return new ResponseEntity((Object)responseManagementDTOList, HttpStatus.OK);
    }
}

