/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativeTask
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.InitiativeTaskDto
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.InitiativeTaskController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.InitiativeTaskService
 *  com.estrat.service.db.service.TaskDetailsService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
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

import com.estrat.service.db.bean.po.InitiativeTask;
import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.InitiativeTaskDto;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.InitiativeTaskService;
import com.estrat.service.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
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
public class InitiativeTaskController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private InitiativeTaskService initiativeTaskService;
    @Autowired
    private TaskDetailsService taskDetailsService;

    @PostMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> saveTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(initiativeTaskDto.getTaskValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (initiativeTaskDto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getCreatedBy());
            initiativeTaskDto.getTaskValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativeTaskDto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getUpdatedBy());
            initiativeTaskDto.getTaskValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativeTaskDto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getOwner());
            initiativeTaskDto.getTaskValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        InitiativeTask activitiesDetails = new InitiativeTask(initiativeTaskDto);
        activitiesDetails.setCreatedTime(LocalDateTime.now());
        InitiativeTaskDto activitiesDTOObj = this.initiativeTaskService.save(activitiesDetails);
        TaskCategorysDTO taskcategory = new TaskCategorysDTO();
        if (taskcategory.getTaskCategoryValue() == null) {
            taskcategory.setTaskCategoryValue(new HashMap());
        }
        taskcategory.setCreatedTime(LocalDateTime.now());
        taskcategory.setCreatedBy(activitiesDTOObj.getCreatedBy());
        taskcategory.setOwner(activitiesDTOObj.getCreatedBy());
        taskcategory.setType("Initiative");
        Map objectsValue = taskcategory.getTaskCategoryValue();
        objectsValue.put("category", activitiesDTOObj.getTaskValue().get("desc").toString());
        TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeTask"})
    public ResponseEntity<InitiativeTaskDto> updateTasksDetails(@RequestBody InitiativeTaskDto initiativeTaskDto, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(initiativeTaskDto.getTaskValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (initiativeTaskDto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getCreatedBy());
            initiativeTaskDto.getTaskValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativeTaskDto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getUpdatedBy());
            initiativeTaskDto.getTaskValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativeTaskDto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(initiativeTaskDto.getOwner());
            initiativeTaskDto.getTaskValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        InitiativeTask activitiesAndTasks = new InitiativeTask(initiativeTaskDto);
        activitiesAndTasks.setUpdatedTime(LocalDateTime.now());
        InitiativeTaskDto activitiesDTOObj = this.initiativeTaskService.save(activitiesAndTasks);
        this.auditService.updateAudit("Initiative", activitiesDTOObj.getId(), activitiesDTOObj.getUpdatedBy(), "Initiative Task Modified");
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<InitiativeTaskDto> getTasksDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        Optional activitiesAndTasks = this.initiativeTaskService.findById(id.longValue());
        return new ResponseEntity((Object)new InitiativeTaskDto((InitiativeTask)activitiesAndTasks.get()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeTask/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteTasksDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional activitiesAndTasks = this.initiativeTaskService.findById(id.longValue());
        if (activitiesAndTasks.isPresent()) {
            InitiativeTask activitiesDetails = (InitiativeTask)activitiesAndTasks.get();
            activitiesDetails.setActive(1);
            this.initiativeTaskService.delete(activitiesDetails);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            this.auditService.updateAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Initiative Deleted");
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/initiativeTasklist/{initiativeId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.initiativeTaskService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> mapObj) {
        if (Objects.isNull(mapObj.get("progressval")) || StringUtils.isEmpty((CharSequence)mapObj.get("progressval").toString())) {
            mapObj.put("progressval", "0");
        }
    }

    @GetMapping(value={"/emp/initiativesTaskList/{empId}"})
    public ResponseEntity<List<InitiativeTaskDto>> findByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List taskDTOList = this.initiativeTaskService.findAllByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

