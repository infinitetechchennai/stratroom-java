/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesDetails
 *  com.estrat.service.db.bean.po.ActivitiesMap
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.ActivitiesDTO
 *  com.estrat.service.db.dto.ActivitiesMapDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ActivitiesController
 *  com.estrat.service.db.resource.util.CacheUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ActivitiesMapService
 *  com.estrat.service.db.service.ActivitiesService
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
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

import com.estrat.service.db.bean.po.ActivitiesDetails;
import com.estrat.service.db.bean.po.ActivitiesMap;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.ActivitiesDTO;
import com.estrat.service.db.dto.ActivitiesMapDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.CacheUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ActivitiesMapService;
import com.estrat.service.db.service.ActivitiesService;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
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
public class ActivitiesController {
    @Autowired
    protected ActivitiesService activitiesAndTasksService;
    @Autowired
    protected ActivitiesMapService activitiesMapService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> saveActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
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
        String multipleOwner = activitiesDTO.getActivitiesValue().get("multipleowners").toString();
        ActivitiesDetails activitiesDetails = new ActivitiesDetails(activitiesDTO);
        if (StringUtils.isNotEmpty((CharSequence)multipleOwner)) {
            Set ownerList = Arrays.asList(multipleOwner.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new ActivitiesMap(activitiesDetails, Long.valueOf(empId.toString()).longValue())).collect(Collectors.toSet());
            activitiesDetails.setActivitiesMaps(ownerList);
        } else {
            activitiesDetails.setActivitiesMaps(Collections.emptySet());
        }
        activitiesDetails.setCreatedTime(LocalDateTime.now());
        ActivitiesDTO activitiesDTOObj = this.activitiesAndTasksService.save(activitiesDetails, multipleOwner);
        this.auditService.saveAudit("Initiative", activitiesDTOObj.getId(), activitiesDTOObj.getCreatedBy(), "Activities Created");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "activitiesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/activities"})
    public ResponseEntity<ActivitiesDTO> updateActivitiesAndTasksDetails(@RequestBody ActivitiesDTO activitiesDTO, HttpServletRequest request) throws RequestException {
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
        String multipleOwner = activitiesDTO.getActivitiesValue().get("multipleowners").toString();
        ActivitiesDetails activitiesAndTasks = new ActivitiesDetails(activitiesDTO);
        if (StringUtils.isNotEmpty((CharSequence)multipleOwner)) {
            Set ownerList = Arrays.asList(multipleOwner.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new ActivitiesMap(activitiesAndTasks, Long.valueOf(empId.toString()).longValue())).collect(Collectors.toSet());
            activitiesAndTasks.setActivitiesMaps(ownerList);
        } else {
            activitiesAndTasks.setActivitiesMaps(Collections.emptySet());
        }
        activitiesAndTasks.setUpdatedTime(LocalDateTime.now());
        ActivitiesDTO activitiesDTOObj = this.activitiesAndTasksService.save(activitiesAndTasks, multipleOwner);
        this.auditService.updateAudit("Initiative", activitiesDTOObj.getId(), activitiesDTOObj.getUpdatedBy(), "Activities Modified");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "activitiesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)activitiesDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/activities/{id}"})
    public ResponseEntity<ActivitiesDTO> getActivitiesAndTasksDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.activitiesAndTasksService.findByActivitiesId(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activities/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteActivitiesAndTasksDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional activitiesAndTasks = this.activitiesAndTasksService.findById(id.longValue());
        if (activitiesAndTasks.isPresent()) {
            ActivitiesDetails activitiesDetails = (ActivitiesDetails)activitiesAndTasks.get();
            activitiesDetails.setActive(1);
            this.activitiesAndTasksService.saveDelete((ActivitiesDetails)activitiesAndTasks.get());
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            this.auditService.updateAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Activities Deleted");
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "activitiesList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/activitieslist/{initiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findAllByInitiativesId(initiativeId);
        if (!activitiesAndTasksDTOS.isEmpty()) {
            return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveActivitiesList/{empId}"})
    public ResponseEntity<Set<ActivitiesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        Set activitiesList = this.activitiesAndTasksService.findAll(empId.longValue());
        return new ResponseEntity((Object)activitiesList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> mapObj) {
        if (Objects.isNull(mapObj.get("progressval")) || StringUtils.isEmpty((CharSequence)mapObj.get("progressval").toString())) {
            mapObj.put("progressval", "0");
        }
    }

    @PostMapping(value={"/activitiesMap"})
    public ResponseEntity<ActivitiesMapDTO> saveActivitiesMap(@RequestBody ActivitiesMapDTO activitiesMapDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.activitiesMapService.save(activitiesMapDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesMapList/{activitiesId}"})
    public ResponseEntity<List<ActivitiesMapDTO>> retrieveActivitiesMapList(@PathVariable(value="activitiesId") Long activitiesId) throws RequestException {
        List activitiesMapDTOList = this.activitiesMapService.findAllByActivitiesId(activitiesId);
        return new ResponseEntity((Object)activitiesMapDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveActivitiesLists/{initiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> retrieveActivitiesList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/activitiesLists/{empId}"})
    public ResponseEntity<List<ActivitiesDTO>> retrieveActivitiesListByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findByEmpId(empId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativeLists/{subInitiativeId}"})
    public ResponseEntity<List<ActivitiesDTO>> retrieveSubInitiativeList(@PathVariable(value="subInitiativeId") Long subInitiativeId) throws RequestException {
        List activitiesAndTasksDTOS = this.activitiesAndTasksService.findAllBySubInitiativesId(subInitiativeId);
        return new ResponseEntity((Object)activitiesAndTasksDTOS, HttpStatus.OK);
    }
}

