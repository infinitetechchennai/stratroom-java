/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ProjectPlanning
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.ProjectPlanningDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ProjectPlanningController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ProjectPlanningService
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

import com.estrat.service.db.bean.po.ProjectPlanning;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.ProjectPlanningDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.ProjectPlanningService;
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
public class ProjectPlanningController {
    @Autowired
    protected ProjectPlanningService projectPlanningService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/projectPlanning"})
    public ResponseEntity<ProjectPlanningDTO> saveMeetingManagement(@RequestBody ProjectPlanningDTO projectPlanningDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (projectPlanningDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getCreatedBy());
            projectPlanningDTO.getPlanningValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (projectPlanningDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getUpdatedBy());
            projectPlanningDTO.getPlanningValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (projectPlanningDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getOwner());
            projectPlanningDTO.getPlanningValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ProjectPlanning projectPlanning = new ProjectPlanning(this.projectPlanningService.formatDate(projectPlanningDTO));
        projectPlanning.setCreatedTime(LocalDateTime.now());
        ProjectPlanningDTO responseDTO = this.projectPlanningService.save(projectPlanning);
        this.auditService.saveAudit("Project PLanning ", responseDTO.getId(), responseDTO.getCreatedBy(), "Project PLanning Created");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/projectPlanning"})
    public ResponseEntity<ProjectPlanningDTO> updateMeetingManagement(@RequestBody ProjectPlanningDTO projectPlanningDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (projectPlanningDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getCreatedBy());
            projectPlanningDTO.getPlanningValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (projectPlanningDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getUpdatedBy());
            projectPlanningDTO.getPlanningValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (projectPlanningDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(projectPlanningDTO.getOwner());
            projectPlanningDTO.getPlanningValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ProjectPlanning projectPlanning = new ProjectPlanning(this.projectPlanningService.formatDate(projectPlanningDTO));
        projectPlanning.setUpdatedTime(LocalDateTime.now());
        ProjectPlanningDTO responseDTO = this.projectPlanningService.save(projectPlanning);
        this.auditService.saveAudit("Project PLanning ", responseDTO.getId(), responseDTO.getUpdatedBy(), "Project PLanning Modified");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/projectPlanning/{id}"})
    public ResponseEntity<ProjectPlanningDTO> getMeetingManagementById(@PathVariable(value="id") Long id) throws RequestException {
        ProjectPlanning projectPlanning = (ProjectPlanning)this.projectPlanningService.findById(id.longValue()).get();
        ProjectPlanningDTO responseManagementDTO = new ProjectPlanningDTO(projectPlanning);
        return new ResponseEntity((Object)responseManagementDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/projectPlanning/{id}"})
    public ResponseEntity<ProjectPlanningDTO> deleteMeetingManagementById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional projectPlanning = this.projectPlanningService.findById(id.longValue());
        this.auditService.saveAudit("Project PLanning ", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project PLanning Deleted");
        return new ResponseEntity((Object)this.projectPlanningService.deleteByObj(projectPlanning), HttpStatus.OK);
    }

    @GetMapping(value={"/projectPlanningList"})
    public ResponseEntity<List<ProjectPlanningDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List responseManagementDTOList = this.projectPlanningService.findAllByPageId(pageId, dateRange);
        return new ResponseEntity((Object)responseManagementDTOList, HttpStatus.OK);
    }
}

