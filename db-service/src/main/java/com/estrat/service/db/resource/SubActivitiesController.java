/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubActivitiesDetails
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.SubActivitiesDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.SubActivitiesController
 *  com.estrat.service.db.resource.util.CacheUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.SubActivitiesService
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

import com.estrat.service.db.bean.po.SubActivitiesDetails;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.SubActivitiesDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.CacheUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.SubActivitiesService;
import java.time.LocalDateTime;
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
public class SubActivitiesController {
    @Autowired
    private SubActivitiesService subActivitiesService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> saveActivitiesAndTasksDetails(@RequestBody SubActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(activitiesDTO.getActivitiesValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (activitiesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getCreatedBy());
            activitiesDTO.getActivitiesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (activitiesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getUpdatedBy());
            activitiesDTO.getActivitiesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (activitiesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getOwner());
            activitiesDTO.getActivitiesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        SubActivitiesDetails activitiesDetails = new SubActivitiesDetails(activitiesDTO);
        activitiesDetails.setCreatedTime(LocalDateTime.now());
        SubActivitiesDTO activitiesDTOObj = this.subActivitiesService.save(activitiesDetails);
        this.auditService.saveAudit("Initiative", activitiesDTOObj.getId(), activitiesDTOObj.getCreatedBy(), "SubActivities Created");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "subactivitiesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/subactivities"})
    public ResponseEntity<SubActivitiesDTO> updateActivitiesAndTasksDetails(@RequestBody SubActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(activitiesDTO.getActivitiesValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (activitiesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getCreatedBy());
            activitiesDTO.getActivitiesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (activitiesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getUpdatedBy());
            activitiesDTO.getActivitiesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (activitiesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(activitiesDTO.getOwner());
            activitiesDTO.getActivitiesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        SubActivitiesDetails activitiesAndTasks = new SubActivitiesDetails(activitiesDTO);
        activitiesAndTasks.setUpdatedTime(LocalDateTime.now());
        SubActivitiesDTO activitiesDTOObj = this.subActivitiesService.save(activitiesAndTasks);
        this.auditService.updateAudit("Initiative", activitiesDTOObj.getId(), activitiesDTOObj.getUpdatedBy(), "Activities Modified");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "activitiesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/subactivities/{id}"})
    public ResponseEntity<SubActivitiesDTO> getSubActivitiesAndTasksDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        Optional activitiesAndTasks = this.subActivitiesService.findById(id.longValue());
        SubActivitiesDTO subactivity = new SubActivitiesDTO((SubActivitiesDetails)activitiesAndTasks.get());
        return new ResponseEntity((Object)subactivity, HttpStatus.OK);
    }

    @DeleteMapping(value={"/subactivities/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteActivitiesAndTasksDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional activitiesAndTasks = this.subActivitiesService.findById(id.longValue());
        if (activitiesAndTasks.isPresent()) {
            SubActivitiesDetails activitiesDetails = (SubActivitiesDetails)activitiesAndTasks.get();
            activitiesDetails.setActive(1);
            this.subActivitiesService.saveDelete((SubActivitiesDetails)activitiesAndTasks.get());
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            this.auditService.updateAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "SubActivities Deleted");
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "subactivitiesList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    private void applyDefaultValues(Map<String, Object> mapObj) {
        if (Objects.isNull(mapObj.get("progressval")) || StringUtils.isEmpty((CharSequence)mapObj.get("progressval").toString())) {
            mapObj.put("progressval", "0");
        }
    }

    @GetMapping(value={"/subActivitieslist/{activityId}"})
    public ResponseEntity<List<SubActivitiesDTO>> findAllByInitiativesId(@PathVariable(value="activityId") Long activityId) throws RequestException {
        List activitiesAndTasksDTOS = this.subActivitiesService.findAllByActivityId(activityId);
        if (!activitiesAndTasksDTOS.isEmpty()) {
            return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/emp/subActivitiesLists/{empId}"})
    public ResponseEntity<List<SubActivitiesDTO>> retrieveSubActivitiesListByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List activitiesList = this.subActivitiesService.findByEmpId(empId);
        return new ResponseEntity((Object)activitiesList, HttpStatus.OK);
    }
}

