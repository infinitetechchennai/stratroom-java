/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePerformanceForm
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.EmployeePerformanceFormDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.EmployeePerformanceFormController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeePerformanceFormService
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

import com.estrat.service.db.bean.po.EmployeePerformanceForm;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.EmployeePerformanceFormDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeePerformanceFormService;
import com.estrat.service.db.service.EmployeeService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeePerformanceFormController {
    @Autowired
    protected EmployeePerformanceFormService employeePerformanceFormService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/employeePerformance"})
    public ResponseEntity<EmployeePerformanceFormDTO> savePerformanceDetails(@RequestBody EmployeePerformanceFormDTO employeePerformanceFormDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeePerformanceFormDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getCreatedBy());
            employeePerformanceFormDTO.getPerformanceFormValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeePerformanceFormDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getUpdatedBy());
            employeePerformanceFormDTO.getPerformanceFormValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeePerformanceFormDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getOwner());
            employeePerformanceFormDTO.getPerformanceFormValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        EmployeePerformanceForm performance = new EmployeePerformanceForm(employeePerformanceFormDTO);
        performance.setCreatedTime(LocalDateTime.now());
        EmployeePerformanceFormDTO dTOObj = this.employeePerformanceFormService.save(performance);
        this.auditService.saveAudit("Task", dTOObj.getId(), dTOObj.getCreatedBy(), "Task category Created");
        return new ResponseEntity((Object)dTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/employeePerformance"})
    public ResponseEntity<EmployeePerformanceFormDTO> updatePerformanceDetails(@RequestBody EmployeePerformanceFormDTO employeePerformanceFormDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeePerformanceFormDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getCreatedBy());
            employeePerformanceFormDTO.getPerformanceFormValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeePerformanceFormDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getUpdatedBy());
            employeePerformanceFormDTO.getPerformanceFormValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeePerformanceFormDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeePerformanceFormDTO.getOwner());
            employeePerformanceFormDTO.getPerformanceFormValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        EmployeePerformanceForm performance = new EmployeePerformanceForm(employeePerformanceFormDTO);
        performance.setUpdatedTime(LocalDateTime.now());
        EmployeePerformanceFormDTO dTOObj = this.employeePerformanceFormService.save(performance);
        this.auditService.updateAudit("Task", dTOObj.getId(), dTOObj.getUpdatedBy(), "Task category Modified");
        return new ResponseEntity((Object)dTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<EmployeePerformanceFormDTO> getPerformanceById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)new EmployeePerformanceFormDTO((EmployeePerformanceForm)this.employeePerformanceFormService.findById(id.longValue()).get()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/employeePerformance/{id}"})
    public ResponseEntity<EmployeePerformanceFormDTO> deletePerformanceById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional tasks = this.employeePerformanceFormService.findById(id.longValue());
        if (tasks.isPresent()) {
            EmployeePerformanceForm taskDetails = (EmployeePerformanceForm)tasks.get();
            taskDetails.setActive(1);
            this.employeePerformanceFormService.delete(taskDetails);
            this.auditService.updateAudit("Task", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Task Category Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrievePerformanceFormList/{empId}"})
    public ResponseEntity<List<EmployeePerformanceFormDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List taskDTOList = this.employeePerformanceFormService.findAll(empId.longValue());
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

