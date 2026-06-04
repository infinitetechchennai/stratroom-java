/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.TaskDetailsController
 *  com.estrat.web.dto.ApprovalRequestDTO
 *  com.estrat.web.dto.ApprovalResponseDTO
 *  com.estrat.web.dto.TaskCategorysDTO
 *  com.estrat.web.dto.TaskDetailsDTO
 *  com.estrat.web.dto.TaskStatusResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.TaskDetailsService
 *  com.estrat.web.util.UserThreadLocal
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
package com.estrat.web.controller;

import com.estrat.web.dto.ApprovalRequestDTO;
import com.estrat.web.dto.ApprovalResponseDTO;
import com.estrat.web.dto.TaskCategorysDTO;
import com.estrat.web.dto.TaskDetailsDTO;
import com.estrat.web.dto.TaskStatusResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.TaskDetailsService;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
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
public class TaskDetailsController {
    @Autowired
    private TaskDetailsService taskDetailsService;

    @PostMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> saveCategory(@RequestBody TaskCategorysDTO taskCategorysDTO) throws RequestException {
        taskCategorysDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.taskDetailsService.saveCategory(taskCategorysDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> updateCategory(@RequestBody TaskCategorysDTO taskCategorysDTO) throws RequestException {
        taskCategorysDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.taskDetailsService.updateCategory(taskCategorysDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<TaskCategorysDTO> getCategory(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.taskDetailsService.retrieveCategory(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<Boolean> deleteCategory(@PathVariable(value="id") Long id) throws RequestException {
        this.taskDetailsService.removecategory(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveTaskList/{empId}"})
    public ResponseEntity<List<TaskCategorysDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange") String dateRange, @RequestParam(value="type") String type) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.taskDetailsService.findAllByEmpId(empId, dateRange, type);
        return new ResponseEntity(RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> saveTask(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        taskDetailsDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.taskDetailsService.saveTask(taskDetailsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> updateTask(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        taskDetailsDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.taskDetailsService.updateTask(taskDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/task/{id}"})
    public ResponseEntity<TaskDetailsDTO> getTask(@PathVariable(value="id") Long id) throws RequestException {
        TaskDetailsDTO taskDTO = this.taskDetailsService.retrieveTask(id);
        return new ResponseEntity(taskDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/task/{id}"})
    public ResponseEntity<Boolean> deleteTask(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.taskDetailsService.removeTask(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PostMapping(value={"/updateTask/{taskId}"})
    public ResponseEntity<ApprovalResponseDTO> approveTask(@PathVariable Long taskId, @RequestBody ApprovalRequestDTO approvalRequest) {
        ApprovalResponseDTO response = this.taskDetailsService.approveTask(taskId, approvalRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value={"/retrieveTaskStatusCount/{empId}"})
    public ResponseEntity<TaskStatusResponseDTO> retrieveTaskStatusCount(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange") String dateRange) throws RequestException {
        TaskStatusResponseDTO list = this.taskDetailsService.retrieveTaskStatusCount(empId, dateRange);
        return new ResponseEntity(list, HttpStatus.OK);
    }
}

