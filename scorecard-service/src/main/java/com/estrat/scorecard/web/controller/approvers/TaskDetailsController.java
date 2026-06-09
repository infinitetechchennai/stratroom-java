/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ApprovalRequestDTO
 *  com.estrat.scorecard.dto.ApprovalResponseDTO
 *  com.estrat.scorecard.dto.TaskCategorysDTO
 *  com.estrat.scorecard.dto.TaskDetailsDTO
 *  com.estrat.scorecard.dto.TaskStatusResponseDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.TaskDetailsService
 *  com.estrat.scorecard.web.controller.approvers.TaskDetailsController
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
package com.estrat.scorecard.web.controller.approvers;

import com.estrat.scorecard.dto.ApprovalRequestDTO;
import com.estrat.scorecard.dto.ApprovalResponseDTO;
import com.estrat.scorecard.dto.TaskCategorysDTO;
import com.estrat.scorecard.dto.TaskDetailsDTO;
import com.estrat.scorecard.dto.TaskStatusResponseDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.TaskDetailsService;
import java.util.List;
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
    private TaskDetailsService taskDetailsService;

    @PostMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> saveCategory(@RequestBody TaskCategorysDTO taskCategorysDTO) throws RequestException {
        return new ResponseEntity((Object)this.taskDetailsService.saveCategory(taskCategorysDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/taskCategory"})
    public ResponseEntity<TaskCategorysDTO> updateCategory(@RequestBody TaskCategorysDTO taskCategorysDTO) throws RequestException {
        return new ResponseEntity((Object)this.taskDetailsService.updateCategory(taskCategorysDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<TaskCategorysDTO> getCategory(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.taskDetailsService.retrieveCategory(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/taskCategory/{id}"})
    public ResponseEntity<Boolean> deleteCategory(@PathVariable(value="id") Long id) throws RequestException {
        this.taskDetailsService.removecategory(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveTaskList/{empId}"})
    public ResponseEntity<List<TaskCategorysDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange") String dateRange, @RequestParam(value="type") String type) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.taskDetailsService.findAllByEmpId(empId, dateRange, type);
        return new ResponseEntity((Object)RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> saveTask(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.taskDetailsService.saveTask(taskDetailsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/task"})
    public ResponseEntity<TaskDetailsDTO> updateTask(@RequestBody TaskDetailsDTO taskDetailsDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.taskDetailsService.updateTask(taskDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/task/{id}"})
    public ResponseEntity<TaskDetailsDTO> getTask(@PathVariable(value="id") Long id) throws RequestException {
        TaskDetailsDTO taskDTO = this.taskDetailsService.retrieveTask(id);
        return new ResponseEntity((Object)taskDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/task/{id}"})
    public ResponseEntity<Boolean> deleteTask(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.taskDetailsService.removeTask(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PostMapping(value={"/updateTask/{taskId}"})
    public ResponseEntity<ApprovalResponseDTO> approveTask(@PathVariable Long taskId, @RequestBody ApprovalRequestDTO approvalRequest) {
        ApprovalResponseDTO response = this.taskDetailsService.approveTask(taskId, approvalRequest);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveTaskStatusCount/{empId}"})
    public ResponseEntity<TaskStatusResponseDTO> retrieveTaskStatusCount(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange") String dateRange) throws RequestException {
        TaskStatusResponseDTO list = this.taskDetailsService.retrieveTaskStatusCount(empId, dateRange);
        return new ResponseEntity((Object)list, HttpStatus.OK);
    }
}

