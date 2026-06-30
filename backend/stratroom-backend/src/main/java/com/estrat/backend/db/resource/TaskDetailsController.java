/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.bean.po.TaskDetails
 *  com.estrat.backend.db.dto.ApprovalRequestDTO
 *  com.estrat.backend.db.dto.ApprovalResponseDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.dto.TaskDetailsDTO
 *  com.estrat.backend.db.dto.TaskStatusResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.TaskDetailsController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.TaskDetailsService
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

import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.bean.po.TaskDetails;
import com.estrat.backend.db.dto.ApprovalRequestDTO;
import com.estrat.backend.db.dto.ApprovalResponseDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.TaskCategorysDTO;
import com.estrat.backend.db.dto.TaskDetailsDTO;
import com.estrat.backend.db.dto.TaskStatusResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.TaskDetailsService;
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
public class TaskDetailsController {
    @Autowired
    protected TaskDetailsService taskDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> saveTasksDetails(@RequestBody TaskCategorysDTO taskCategorysDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (taskCategorysDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getCreatedBy());
            taskCategorysDTO.getTaskCategoryValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskCategorysDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getUpdatedBy());
            taskCategorysDTO.getTaskCategoryValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        System.out.println("taskCategorysDTO.getOwner() :" + taskCategorysDTO.getOwner());
        if (taskCategorysDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getOwner());
            taskCategorysDTO.getTaskCategoryValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        TaskCategorys taskDetails = new TaskCategorys(taskCategorysDTO);
        taskDetails.setCreatedTime(LocalDateTime.now());
        TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(taskDetails);
        this.auditService.saveAudit("Task", taskDTOObj.getId(), taskDTOObj.getCreatedBy(), "Task category Created");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> updateActivitiesAndTasksDetails(@RequestBody TaskCategorysDTO taskCategorysDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (taskCategorysDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getCreatedBy());
            taskCategorysDTO.getTaskCategoryValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskCategorysDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getUpdatedBy());
            taskCategorysDTO.getTaskCategoryValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskCategorysDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(taskCategorysDTO.getOwner());
            taskCategorysDTO.getTaskCategoryValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        TaskCategorys tasks = new TaskCategorys(taskCategorysDTO);
        tasks.setUpdatedTime(LocalDateTime.now());
        TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(tasks);
        this.auditService.updateAudit("Task", taskDTOObj.getId(), taskDTOObj.getUpdatedBy(), "Task category Modified");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<TaskCategorysDTO> getTasksDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)new TaskCategorysDTO((TaskCategorys)this.taskDetailsService.findById(id.longValue()).get()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<TaskCategorysDTO> deleteTasksDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional tasks = this.taskDetailsService.findById(id.longValue());
        if (tasks.isPresent()) {
            TaskCategorys taskDetails = (TaskCategorys)tasks.get();
            taskDetails.setActive(1);
            this.taskDetailsService.delete(taskDetails);
            this.auditService.updateAudit("Task", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Task Category Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveTaskList/{empId}"})
    public ResponseEntity<List<TaskCategorysDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange") String dateRange, @RequestParam(value="type") String type) throws RequestException {
        List taskDTOList = this.taskDetailsService.findAll(empId.longValue(), dateRange, type);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> saveTasks(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (taskDetailsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getCreatedBy());
            taskDetailsDTO.getTaskValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskDetailsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getUpdatedBy());
            taskDetailsDTO.getTaskValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskDetailsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getOwner());
            taskDetailsDTO.getTaskValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        TaskDetails taskDetails = new TaskDetails(taskDetailsDTO);
        taskDetails.setCreatedTime(LocalDateTime.now());
        TaskDetailsDTO taskDTOObj = this.taskDetailsService.saveTaskDetail(taskDetails);
        this.auditService.saveAudit("Task", taskDTOObj.getId(), taskDTOObj.getCreatedBy(), "Task Created");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> updatetasks(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (taskDetailsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getCreatedBy());
            taskDetailsDTO.getTaskValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskDetailsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getUpdatedBy());
            taskDetailsDTO.getTaskValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (taskDetailsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(taskDetailsDTO.getOwner());
            taskDetailsDTO.getTaskValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        TaskDetails tasks = new TaskDetails(taskDetailsDTO);
        tasks.setUpdatedTime(LocalDateTime.now());
        TaskDetailsDTO taskDTOObj = this.taskDetailsService.saveTaskDetail(tasks);
        this.auditService.updateAudit("Task", taskDTOObj.getId(), taskDTOObj.getUpdatedBy(), "Task category Modified");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/task/{id}"})
    public ResponseEntity<TaskDetailsDTO> getTaskById(@PathVariable(value="id") Long id) throws RequestException {
        TaskDetailsDTO riskCauseAndConsequenceDTO = new TaskDetailsDTO((TaskDetails)this.taskDetailsService.findTaskById(id.longValue()).get());
        return new ResponseEntity((Object)riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/task/{id}"})
    public ResponseEntity<TaskDetailsDTO> deleteTaskById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional task = this.taskDetailsService.findTaskById(id.longValue());
        if (task.isPresent()) {
            TaskDetails riskConqObj = (TaskDetails)task.get();
            this.taskDetailsService.delete(riskConqObj);
            this.auditService.deleteAudit("Task", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "task Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value={"/updateTask/{taskId}"})
    public ResponseEntity<ApprovalResponseDTO> approveStagingChange(@PathVariable Long taskId, @RequestBody ApprovalRequestDTO approvalRequest, HttpServletRequest request) {
        Optional taskDetail = this.taskDetailsService.findTaskById(taskId.longValue());
        ApprovalResponseDTO response = null;
        if (taskDetail.isPresent()) {
            TaskDetails details = (TaskDetails)taskDetail.get();
            if (approvalRequest.getStatus() != null && !approvalRequest.getStatus().isEmpty()) {
                details.setStatus(approvalRequest.getStatus());
                this.taskDetailsService.saveTaskDetail(details);
                response = new ApprovalResponseDTO("Status updated", null);
            } else if (approvalRequest.getPriority() != null && !approvalRequest.getPriority().isEmpty()) {
                details.setPriority(approvalRequest.getPriority());
                this.taskDetailsService.saveTaskDetail(details);
                response = new ApprovalResponseDTO("Priority updated", null);
            }
        } else {
            response = new ApprovalResponseDTO("Task Id not present", null);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping(value={"/retrieveTaskStatusCount/{empId}"})
    public ResponseEntity<TaskStatusResponseDTO> retrieveTaskStatusCount(
            @PathVariable(value="empId") Long empId,
            @RequestParam(value="dateRange", required=false, defaultValue="") String dateRange) throws RequestException {
        List<TaskCategorysDTO> taskDTOList = this.taskDetailsService.findAll(empId.longValue(), dateRange, null);
        TaskStatusResponseDTO responce = this.taskDetailsService.buildTaskStatusResponse(taskDTOList);
        return new ResponseEntity<>(responce, HttpStatus.OK);
    }
}

