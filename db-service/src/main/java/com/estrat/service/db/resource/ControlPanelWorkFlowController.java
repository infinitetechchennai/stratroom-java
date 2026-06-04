/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.bean.po.DepartmentChartMapping
 *  com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.resource.ControlPanelWorkFlowController
 *  com.estrat.service.db.service.ControlPanelWorkFlowApproverMappingService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.service.db.bean.po.DepartmentChartMapping;
import com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import com.estrat.service.db.service.ControlPanelWorkFlowApproverMappingService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControlPanelWorkFlowController {
    @Autowired
    ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ControlPanelWorkFlowApproverMappingService WorkFlowApproverMappingService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;

    @PostMapping(value={"/saveWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> saveControlPanelWorkFlow(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (controlPanelWorkFlowDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(controlPanelWorkFlowDTO.getCreatedBy());
            controlPanelWorkFlowDTO.setCreaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (controlPanelWorkFlowDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(controlPanelWorkFlowDTO.getUpdatedBy());
            controlPanelWorkFlowDTO.setUpdaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ControlPanelWorkFlow controlPanelWorkFlow = new ControlPanelWorkFlow(controlPanelWorkFlowDTO);
        controlPanelWorkFlow.setCreatedTime(LocalDateTime.now());
        ControlPanelWorkFlowDTO workFlowDTO = this.controlPanelWorkFlowService.save(controlPanelWorkFlow);
        int order = 1;
        for (ControlPanelWorkFlowApproverMappingDTO workFlowData : controlPanelWorkFlowDTO.getApproverList()) {
            ControlPanelWorkFlowApproverMapping workFlow = new ControlPanelWorkFlowApproverMapping(workFlowData);
            workFlow.setWorkflow(controlPanelWorkFlow);
            workFlow.setApproverOrder(Integer.valueOf(order));
            this.WorkFlowApproverMappingService.save(workFlow);
            ++order;
        }
        return new ResponseEntity((Object)workFlowDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlow"})
    public ResponseEntity<?> findAllImpact() {
        return ResponseEntity.ok((Object)this.controlPanelWorkFlowService.findAllWorkFlow());
    }

    @GetMapping(value={"/retriveWorkFlow/{id}"})
    public ResponseEntity<ControlPanelWorkFlowDTO> findImpactById(@PathVariable long id) {
        ControlPanelWorkFlowDTO impactDto = new ControlPanelWorkFlowDTO((ControlPanelWorkFlow)this.controlPanelWorkFlowService.findWorkFlowById(id).get());
        if (impactDto.getDepartment() != 0L) {
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(impactDto.getDepartment()));
            impactDto.setDepartmentName(deptData.getDeptName());
        }
        return new ResponseEntity((Object)impactDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteWorkFlow/{id}"})
    public ResponseEntity<ControlPanelWorkFlowDTO> deleteImpact(@PathVariable long id) {
        Optional optionalImpact = this.controlPanelWorkFlowService.findWorkFlowById(id);
        ControlPanelWorkFlow workFlow = (ControlPanelWorkFlow)optionalImpact.get();
        if (optionalImpact.isPresent()) {
            this.controlPanelWorkFlowService.delete(workFlow);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value={"/updateWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> updateWorkflow(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO, HttpServletRequest request) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (controlPanelWorkFlowDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(controlPanelWorkFlowDTO.getCreatedBy());
            controlPanelWorkFlowDTO.setCreaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (controlPanelWorkFlowDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(controlPanelWorkFlowDTO.getUpdatedBy());
            controlPanelWorkFlowDTO.setUpdaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ControlPanelWorkFlow controlPanelWorkFlow = new ControlPanelWorkFlow(controlPanelWorkFlowDTO);
        controlPanelWorkFlow.setUpdatedTime(LocalDateTime.now());
        ControlPanelWorkFlowDTO workFlowDTO = this.controlPanelWorkFlowService.save(controlPanelWorkFlow);
        int order = 1;
        for (ControlPanelWorkFlowApproverMappingDTO workFlowData : controlPanelWorkFlowDTO.getApproverList()) {
            ControlPanelWorkFlowApproverMapping workFlow = new ControlPanelWorkFlowApproverMapping(workFlowData);
            workFlow.setWorkflow(controlPanelWorkFlow);
            workFlow.setApproverOrder(Integer.valueOf(order));
            this.WorkFlowApproverMappingService.save(workFlow);
            ++order;
        }
        return new ResponseEntity((Object)workFlowDTO, HttpStatus.OK);
    }
}

