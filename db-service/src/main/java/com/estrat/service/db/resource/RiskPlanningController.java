/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskPlanning
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.RiskPlanningDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RiskPlanningController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RiskPlanningService
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

import com.estrat.service.db.bean.po.RiskPlanning;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.RiskPlanningDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.RiskPlanningService;
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
public class RiskPlanningController {
    @Autowired
    protected RiskPlanningService riskPlanningService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/riskPlanning"})
    public ResponseEntity<RiskPlanningDTO> savePlanning(@RequestBody RiskPlanningDTO riskPlanningDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (riskPlanningDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getCreatedBy());
            riskPlanningDTO.getRiskPlanningValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskPlanningDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getUpdatedBy());
            riskPlanningDTO.getRiskPlanningValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskPlanningDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getOwner());
            riskPlanningDTO.getRiskPlanningValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        RiskPlanning riskPlanning = new RiskPlanning(riskPlanningDTO);
        riskPlanning.setCreatedTime(LocalDateTime.now());
        RiskPlanningDTO responseDTO = this.riskPlanningService.save(riskPlanning);
        this.auditService.saveAudit("Project PLanning ", responseDTO.getId(), responseDTO.getCreatedBy(), "Project PLanning Created");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskPlanning"})
    public ResponseEntity<RiskPlanningDTO> updatePlanning(@RequestBody RiskPlanningDTO riskPlanningDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (riskPlanningDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getCreatedBy());
            riskPlanningDTO.getRiskPlanningValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskPlanningDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getUpdatedBy());
            riskPlanningDTO.getRiskPlanningValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskPlanningDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(riskPlanningDTO.getOwner());
            riskPlanningDTO.getRiskPlanningValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        RiskPlanning riskPlanning = new RiskPlanning(riskPlanningDTO);
        riskPlanning.setUpdatedTime(LocalDateTime.now());
        RiskPlanningDTO responseDTO = this.riskPlanningService.save(riskPlanning);
        this.auditService.saveAudit("Project PLanning ", responseDTO.getId(), responseDTO.getUpdatedBy(), "Project PLanning Modified");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanning/{id}"})
    public ResponseEntity<RiskPlanningDTO> getById(@PathVariable(value="id") Long id) throws RequestException {
        RiskPlanning planning = (RiskPlanning)this.riskPlanningService.findById(id.longValue()).get();
        RiskPlanningDTO responseManagementDTO = new RiskPlanningDTO(planning);
        return new ResponseEntity((Object)responseManagementDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskPlanning/{id}"})
    public ResponseEntity<RiskPlanningDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional projectPlanning = this.riskPlanningService.findById(id.longValue());
        this.auditService.saveAudit("Project PLanning ", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project PLanning Deleted");
        return new ResponseEntity((Object)this.riskPlanningService.deleteByObj(projectPlanning), HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanningList"})
    public ResponseEntity<List<RiskPlanningDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List responseManagementDTOList = this.riskPlanningService.findAllByPageId(pageId);
        return new ResponseEntity((Object)responseManagementDTOList, HttpStatus.OK);
    }
}

