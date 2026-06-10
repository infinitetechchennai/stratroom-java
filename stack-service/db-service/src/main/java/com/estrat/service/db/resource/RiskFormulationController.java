/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.FormulationRiskActivitiesDTO
 *  com.estrat.service.db.dto.FormulationRiskDTO
 *  com.estrat.service.db.dto.FormulationSubRiskDTO
 *  com.estrat.service.db.dto.RiskFormulationDTO
 *  com.estrat.service.db.resource.RiskFormulationController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RiskFormulationService
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
import com.estrat.service.db.dto.FormulationRiskActivitiesDTO;
import com.estrat.service.db.dto.FormulationRiskDTO;
import com.estrat.service.db.dto.FormulationSubRiskDTO;
import com.estrat.service.db.dto.RiskFormulationDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.RiskFormulationService;
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
public class RiskFormulationController {
    @Autowired
    private RiskFormulationService riskFormulationService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/riskFormulation"})
    public ResponseEntity<RiskFormulationDTO> saveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        Boolean updated = false;
        if (formulationDTO.getId() > 0L) {
            updated = true;
        }
        RiskFormulationDTO response = this.riskFormulationService.saveRiskFormulation(formulationDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Risk Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Formulation Modified");
        } else {
            this.auditService.saveAudit("Risk Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Formulation Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/riskFormulation/{formulationId}"})
    public ResponseEntity<RiskFormulationDTO> getRiskFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = StringUtils.isNotEmpty((CharSequence)loadFlag) ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity((Object)this.riskFormulationService.getRiskFormulation(Long.valueOf(formulationId).longValue(), flag), HttpStatus.OK);
    }

    @PostMapping(value={"/risk/riskFormulation"})
    public ResponseEntity<FormulationRiskDTO> saveFormulationRisk(@RequestBody FormulationRiskDTO formulationRiskDTO) {
        Boolean updated = false;
        if (formulationRiskDTO.getId() > 0L) {
            updated = true;
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (formulationRiskDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationRiskDTO.getCreatedBy());
            formulationRiskDTO.getRiskValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (formulationRiskDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(formulationRiskDTO.getUpdatedBy());
            formulationRiskDTO.getRiskValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (formulationRiskDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(formulationRiskDTO.getOwner());
            formulationRiskDTO.getRiskValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        FormulationRiskDTO response = this.riskFormulationService.saveFormulationRisk(formulationRiskDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Risk Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Formulation Modified");
        } else {
            this.auditService.saveAudit("Risk Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Formulation Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/subRisk/riskFormulation"})
    public ResponseEntity<FormulationSubRiskDTO> saveFormulationSubRisk(@RequestBody FormulationSubRiskDTO formulationSubRiskDTO) {
        if (formulationSubRiskDTO.getId() == 0L) {
            if (formulationSubRiskDTO.getSubRiskValue().get("type").equals("Cause")) {
                this.auditService.saveAudit("Risk Formulation", formulationSubRiskDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Cause Created");
            } else {
                this.auditService.saveAudit("Risk Formulation", formulationSubRiskDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Plan Created");
            }
        } else if (formulationSubRiskDTO.getSubRiskValue().get("type").equals("Cause")) {
            this.auditService.saveAudit("Risk Formulation", formulationSubRiskDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Cause Modified");
        } else {
            this.auditService.saveAudit("Risk Formulation", formulationSubRiskDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Plan Modified");
        }
        return new ResponseEntity((Object)this.riskFormulationService.saveFormulationSubRisk(formulationSubRiskDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/activity/riskFormulation"})
    public ResponseEntity<FormulationRiskActivitiesDTO> saveFormulationRiskActivity(@RequestBody FormulationRiskActivitiesDTO formulationRiskActivitiesDTO) {
        if (formulationRiskActivitiesDTO.getId() == 0L) {
            if (formulationRiskActivitiesDTO.getActivityValue().get("type").equals("Consequence")) {
                this.auditService.saveAudit("Risk Formulation", formulationRiskActivitiesDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Consequence Created");
            } else {
                this.auditService.saveAudit("Risk Formulation", formulationRiskActivitiesDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Action Created");
            }
        } else if (formulationRiskActivitiesDTO.getActivityValue().get("type").equals("Consequence")) {
            this.auditService.saveAudit("Risk Formulation", formulationRiskActivitiesDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Consequence Modified");
        } else {
            this.auditService.saveAudit("Risk Formulation", formulationRiskActivitiesDTO.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Action Modified");
        }
        return new ResponseEntity((Object)this.riskFormulationService.saveFormulationRiskActivities(formulationRiskActivitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<FormulationSubRiskDTO> getFormulationSubRisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<FormulationRiskDTO> getFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<FormulationRiskActivitiesDTO> getFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationRiskActivities(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<Boolean> deleteFormulationSubrisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<Boolean> deleteFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<Boolean> deleteFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationRiskActivity(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationRiskList"})
    public ResponseEntity<List<FormulationRiskDTO>> formulationRiskList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        String[] searchStrArray = new String[]{"%20", "%2520", "%2526"};
        String[] replaceStringArray = new String[]{" ", " ", "&"};
        String updateDept = StringUtils.isNotEmpty((CharSequence)department) ? StringUtils.replaceEach((String)department, (String[])searchStrArray, (String[])replaceStringArray) : department;
        return new ResponseEntity((Object)this.riskFormulationService.getRiskList(Long.valueOf(formulationId).longValue(), updateDept), HttpStatus.OK);
    }

    @PostMapping(value={"/status/riskFormulation"})
    public ResponseEntity<Boolean> approveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }
}

