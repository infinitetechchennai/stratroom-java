/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubInitiatives
 *  com.estrat.service.db.bean.po.SubInitiativesMap
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.SubInitiativesDTO
 *  com.estrat.service.db.dto.SubInitiativesMapDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.SubInitiativesController
 *  com.estrat.service.db.resource.util.CacheUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.SubInitiativesMapService
 *  com.estrat.service.db.service.SubInitiativesService
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

import com.estrat.service.db.bean.po.SubInitiatives;
import com.estrat.service.db.bean.po.SubInitiativesMap;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.SubInitiativesDTO;
import com.estrat.service.db.dto.SubInitiativesMapDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.CacheUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.SubInitiativesMapService;
import com.estrat.service.db.service.SubInitiativesService;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
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
public class SubInitiativesController {
    @Autowired
    protected SubInitiativesService subInitiativesService;
    @Autowired
    protected SubInitiativesMapService subInitiativesMapService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(subInitiativesDTO.getSubInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (subInitiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getCreatedBy());
            subInitiativesDTO.getSubInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subInitiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getUpdatedBy());
            subInitiativesDTO.getSubInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subInitiativesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getOwner());
            subInitiativesDTO.getSubInitiativeValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        String multipleOwner = subInitiativesDTO.getSubInitiativeValue().get("multipleowners").toString();
        SubInitiatives subInitiatives = new SubInitiatives(subInitiativesDTO);
        if (StringUtils.isNotEmpty((CharSequence)multipleOwner)) {
            Set ownerList = Arrays.asList(multipleOwner.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new SubInitiativesMap(subInitiatives, Long.valueOf(empId.toString()).longValue())).collect(Collectors.toSet());
            subInitiatives.setSubInitiativesMaps(ownerList);
        } else {
            subInitiatives.setSubInitiativesMaps(Collections.emptySet());
        }
        subInitiatives.setCreatedTime(LocalDateTime.now());
        InitiativeResponseDTO initiativeResponseDTO = this.subInitiativesService.save(subInitiatives, multipleOwner);
        this.auditService.saveAudit("Initiative", initiativeResponseDTO.getSubInitiativesDTO().getId(), initiativeResponseDTO.getSubInitiativesDTO().getCreatedBy(), "Sub Initiative Created");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "subInitiativesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(subInitiativesDTO.getSubInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (subInitiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getCreatedBy());
            subInitiativesDTO.getSubInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subInitiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getUpdatedBy());
            subInitiativesDTO.getSubInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subInitiativesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(subInitiativesDTO.getOwner());
            subInitiativesDTO.getSubInitiativeValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        String multipleOwner = subInitiativesDTO.getSubInitiativeValue().get("multipleowners").toString();
        SubInitiatives subInitiatives = new SubInitiatives(subInitiativesDTO);
        if (StringUtils.isNotEmpty((CharSequence)multipleOwner)) {
            Set ownerList = Arrays.asList(multipleOwner.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new SubInitiativesMap(subInitiatives, Long.valueOf(empId.toString()).longValue())).collect(Collectors.toSet());
            subInitiatives.setSubInitiativesMaps(ownerList);
        } else {
            subInitiatives.setSubInitiativesMaps(Collections.emptySet());
        }
        subInitiatives.setUpdatedTime(LocalDateTime.now());
        InitiativeResponseDTO initiativeResponseDTO = this.subInitiativesService.save(subInitiatives, multipleOwner);
        this.auditService.updateAudit("Initiative", initiativeResponseDTO.getSubInitiativesDTO().getId(), initiativeResponseDTO.getSubInitiativesDTO().getUpdatedBy(), "Sub Initiative Modified");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "subInitiativesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<SubInitiativesDTO> getSubInitiativesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        SubInitiativesDTO subInitiativesDTO = new SubInitiativesDTO((SubInitiatives)this.subInitiativesService.findById(id.longValue()).get());
        return new ResponseEntity((Object)subInitiativesDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteSubInitiativesDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional subInitiatives = this.subInitiativesService.findById(id.longValue());
        if (subInitiatives.isPresent()) {
            SubInitiatives initiatives = (SubInitiatives)subInitiatives.get();
            initiatives.setActive(1);
            this.subInitiativesService.saveDelete(initiatives);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            this.auditService.deleteAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Sub Initiative Deleted");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "subInitiativesList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/subInitiativesList/{initiativeId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByInitiativesId(initiativeId);
        if (!subInitiativesDTOList.isEmpty()) {
            return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveSubInitiativesList/{empId}"})
    public ResponseEntity<Set<SubInitiativesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        Set subInitiativesDTOList = this.subInitiativesService.findAll(empId.longValue());
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> subInitiativeValue) {
        if (Objects.isNull(subInitiativeValue.get("progressval")) || StringUtils.isEmpty((CharSequence)subInitiativeValue.get("progressval").toString())) {
            subInitiativeValue.put("progressval", "0");
        }
    }

    @PostMapping(value={"/subInitiativesMap"})
    public ResponseEntity<SubInitiativesMapDTO> saveSubInitiativesMap(@RequestBody SubInitiativesMapDTO subInitiativesMapDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.subInitiativesMapService.save(subInitiativesMapDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativesMapList/{subInitiativesId}"})
    public ResponseEntity<List<SubInitiativesMapDTO>> retrieveSubInitiativesMapList(@PathVariable(value="subInitiativesId") Long subInitiativesId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesMapService.findAllBySubInitiativesId(subInitiativesId);
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/findAllSubInitiativesList/{initiativeId}"})
    public ResponseEntity<List<SubInitiativesDTO>> retrieveSubInitiativesList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/subInitiativesList/{empId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByEmpId(empId);
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }
}

