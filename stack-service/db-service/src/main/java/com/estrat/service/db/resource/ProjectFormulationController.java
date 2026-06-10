/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.FormulationInitiativesDTO
 *  com.estrat.service.db.dto.FormulationSubInitiativesDTO
 *  com.estrat.service.db.dto.ProjectFormulationDTO
 *  com.estrat.service.db.resource.ProjectFormulationController
 *  com.estrat.service.db.resource.util.InitiativeUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ProjectFormulationService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.FormulationInitiativesDTO;
import com.estrat.service.db.dto.FormulationSubInitiativesDTO;
import com.estrat.service.db.dto.ProjectFormulationDTO;
import com.estrat.service.db.resource.util.InitiativeUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.ProjectFormulationService;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectFormulationController {
    @Autowired
    private ProjectFormulationService projectFormulationService;
    @Autowired
    private InitiativeUtil initiativeUtil;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/projectFormulation"})
    public ResponseEntity<ProjectFormulationDTO> saveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        Boolean updated = false;
        if (formulationDTO.getId() > 0L) {
            updated = true;
        }
        ProjectFormulationDTO response = this.projectFormulationService.saveProjectFormulation(formulationDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Modified");
        } else {
            this.auditService.saveAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/projectFormulation/{formulationId}"})
    public ResponseEntity<ProjectFormulationDTO> getProjectFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = StringUtils.isNotEmpty((CharSequence)loadFlag) ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity((Object)this.projectFormulationService.getProjectFormulation(Long.valueOf(formulationId).longValue(), flag), HttpStatus.OK);
    }

    @PostMapping(value={"/initiatives/projectFormulation"})
    public ResponseEntity<FormulationInitiativesDTO> saveProjectFormulationInitiatives(@RequestBody FormulationInitiativesDTO formulationInitiativesDTO) {
        Boolean updated = false;
        if (formulationInitiativesDTO.getId() > 0L) {
            updated = true;
        }
        this.initiativeUtil.applyDefaultValues(formulationInitiativesDTO.getInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (formulationInitiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationInitiativesDTO.getCreatedBy());
            formulationInitiativesDTO.getInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (formulationInitiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationInitiativesDTO.getUpdatedBy());
            formulationInitiativesDTO.getInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (formulationInitiativesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(formulationInitiativesDTO.getOwner());
            formulationInitiativesDTO.getInitiativeValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.initiativeUtil.formatDates(formulationInitiativesDTO);
        FormulationInitiativesDTO response = this.projectFormulationService.saveFormulationInitiatives(formulationInitiativesDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Modified");
        } else {
            this.auditService.saveAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/subinitiatives/projectFormulation"})
    public ResponseEntity<FormulationSubInitiativesDTO> saveProjectFormulationSubInitiatives(@RequestBody FormulationSubInitiativesDTO formulationSubInitiativesDTO) {
        Boolean updated = false;
        if (formulationSubInitiativesDTO.getId() > 0L) {
            updated = true;
        }
        this.initiativeUtil.applyDefaultValues(formulationSubInitiativesDTO.getSubInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (formulationSubInitiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationSubInitiativesDTO.getCreatedBy());
            formulationSubInitiativesDTO.getSubInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (formulationSubInitiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationSubInitiativesDTO.getUpdatedBy());
            formulationSubInitiativesDTO.getSubInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        FormulationSubInitiativesDTO response = this.projectFormulationService.saveFormulationSubInitiatives(formulationSubInitiativesDTO);
        if (updated.booleanValue()) {
            if (response.getType().equalsIgnoreCase("Milestone")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Milestone Modified");
            }
            if (response.getType().equalsIgnoreCase("Sub Initiative")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Sub Initiative Modified");
            }
            if (response.getType().equalsIgnoreCase("Activity")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Activities Modified");
            }
        } else {
            if (response.getType().equalsIgnoreCase("Milestone")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Milestone Created");
            }
            if (response.getType().equalsIgnoreCase("Sub Initiative")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Sub Initiative Created");
            }
            if (response.getType().equalsIgnoreCase("Activity")) {
                this.auditService.updateAudit("Project Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Activities Created");
            }
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<FormulationSubInitiativesDTO> viewProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity((Object)this.projectFormulationService.getFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<FormulationInitiativesDTO> viewProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        return new ResponseEntity((Object)this.projectFormulationService.getFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity((Object)this.projectFormulationService.deleteFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        this.auditService.deleteAudit("Project Formulation", Long.valueOf(initiativeId).longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Deleted");
        return new ResponseEntity((Object)this.projectFormulationService.deleteFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationInitiativesList"})
    public ResponseEntity<List<FormulationInitiativesDTO>> formulationInitiativesList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        String[] searchStrArray = new String[]{"%20", "%2520", "%2526"};
        String[] replaceStringArray = new String[]{" ", " ", "&"};
        String updateDept = StringUtils.isNotEmpty((CharSequence)department) ? StringUtils.replaceEach((String)department, (String[])searchStrArray, (String[])replaceStringArray) : department;
        return new ResponseEntity((Object)this.projectFormulationService.getInitiaitivesList(Long.valueOf(formulationId).longValue(), updateDept), HttpStatus.OK);
    }

    @PostMapping(value={"/status/projectFormulation"})
    public ResponseEntity<Boolean> approveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.projectFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }
}

