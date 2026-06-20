/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.ObjectivesDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.resource.ObjectivesController
 *  com.estrat.backend.db.resource.util.NotificationUtil
 *  com.estrat.backend.db.resource.util.ObjectiveUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.ObjectivesService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.ObjectivesDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.resource.util.NotificationUtil;
import com.estrat.backend.db.resource.util.ObjectiveUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.ObjectivesService;
import java.util.List;
import java.util.Optional;
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
public class ObjectivesController {
    @Autowired
    private ObjectivesService objectivesService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private ObjectiveUtil objectiveUtil;
    @Autowired
    private AuditDetailsService auditService;

    @GetMapping(value={"/objectives/{id}"})
    public ResponseEntity<ObjectivesDTO> getObjectivesById(@PathVariable long id) {
        Optional objOptional = this.objectivesService.findById(id);
        if (objOptional.isPresent()) {
            ObjectivesDTO objectivesDTO = new ObjectivesDTO((Objectives)objOptional.get(), true);
            return new ResponseEntity((Object)objectivesDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value={"/objectives"})
    public ResponseEntity<ObjectivesDTO> saveOrUpdateObjectives(@RequestBody ObjectivesDTO objectives) {
        Boolean updateStatus = false;
        if (objectives.getId() != 0L) {
            updateStatus = true;
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (objectives.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(objectives.getCreatedBy());
            objectives.getObjectivesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (objectives.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(objectives.getUpdatedBy());
            objectives.getObjectivesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (objectives.getOwner() != 0L) {
            employeeDTO.setEmployeeId(objectives.getOwner());
            objectives.getObjectivesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        Objectives obj = new Objectives(this.objectiveUtil.formatDates(objectives));
        ObjectivesDTO response = this.objectivesService.save(obj);
        if (updateStatus.booleanValue()) {
            this.auditService.updateAudit("Scorecard", response.getId(), response.getUpdatedBy(), "Objective Modified");
        } else {
            this.auditService.saveAudit("Scorecard", response.getId(), response.getCreatedBy(), "Objective Created");
        }
        this.notification.saveNotification((Object)response, UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/objectives/{id}"})
    public ResponseEntity<ScoreCardResponseDTO> softDeleteObjectives(@PathVariable long id) {
        this.auditService.deleteAudit("Scorecard", id, Long.valueOf(UserThreadLocal.get()).longValue(), "Objective Deleted");
        return new ResponseEntity((Object)this.objectivesService.softDeleteObjectivesById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/objectivesList/{scoreCardId}"})
    public ResponseEntity<List<ObjectivesDTO>> objectivesList(@PathVariable(value="scoreCardId") long scoreCardId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        List objectiveList = this.objectivesService.objectivesList(scoreCardId, flag);
        return new ResponseEntity((Object)objectiveList, HttpStatus.OK);
    }

    @GetMapping(value={"/objectivesListByDate/{scoreCardId}"})
    public ResponseEntity<List<ObjectivesDTO>> objectivesListByDate(@PathVariable(value="scoreCardId") long scoreCardId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        List objectiveList = this.objectivesService.objectivesListByDate(scoreCardId, flag, dateRange);
        return new ResponseEntity((Object)objectiveList, HttpStatus.OK);
    }
}

