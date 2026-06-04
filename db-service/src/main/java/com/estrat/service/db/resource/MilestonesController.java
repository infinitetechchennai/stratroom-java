/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Milestones
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.MilestonesDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.MilestonesController
 *  com.estrat.service.db.resource.util.CacheUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.MilestonesService
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

import com.estrat.service.db.bean.po.Milestones;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.MilestonesDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.CacheUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.MilestonesService;
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
public class MilestonesController {
    @Autowired
    protected MilestonesService milestonesService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private CacheUtil cacheUtil;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> saveMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(milestonesDTO.getMileStonesValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (milestonesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getCreatedBy());
            milestonesDTO.getMileStonesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (milestonesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getUpdatedBy());
            milestonesDTO.getMileStonesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (milestonesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getOwner());
            milestonesDTO.getMileStonesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        Milestones milestones = new Milestones(milestonesDTO);
        milestones.setCreatedTime(LocalDateTime.now());
        MilestonesDTO milestonesDTOObj = this.milestonesService.save(milestones);
        this.auditService.saveAudit("Initiative", milestonesDTOObj.getId(), milestonesDTOObj.getCreatedBy(), "Milestone Created");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "milestonesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)milestonesDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/milestones"})
    public ResponseEntity<MilestonesDTO> updateMilestonesDetails(@RequestBody MilestonesDTO milestonesDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(milestonesDTO.getMileStonesValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (milestonesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getCreatedBy());
            milestonesDTO.getMileStonesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (milestonesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getUpdatedBy());
            milestonesDTO.getMileStonesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (milestonesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(milestonesDTO.getOwner());
            milestonesDTO.getMileStonesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        Milestones milestones = new Milestones(milestonesDTO);
        milestones.setUpdatedTime(LocalDateTime.now());
        MilestonesDTO milestonesDTOObj = this.milestonesService.save(milestones);
        this.auditService.updateAudit("Initiative", milestonesDTOObj.getId(), milestonesDTOObj.getUpdatedBy(), "Milestone Modified");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "milestonesList");
        this.dbCache.remove((Object)cacheKey, "dbCache");
        this.cacheUtil.removeCache(loggedInEmpId);
        return new ResponseEntity((Object)milestonesDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/milestones/{id}"})
    public ResponseEntity<MilestonesDTO> getMilestonesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        MilestonesDTO milestonesDTO = new MilestonesDTO((Milestones)this.milestonesService.findById(id.longValue()).get());
        return new ResponseEntity((Object)milestonesDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/milestones/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteMilestonesById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional mileStones = this.milestonesService.findById(id.longValue());
        if (mileStones.isPresent()) {
            Milestones milestones2 = (Milestones)mileStones.get();
            milestones2.setActive(1);
            this.milestonesService.delete(milestones2);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            this.auditService.updateAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Milestone Deleted");
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "milestonesList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/milestonesList/{initiativeId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List milestonesDTOSList = this.milestonesService.findAllByInitiativesId(initiativeId);
        if (!milestonesDTOSList.isEmpty()) {
            return new ResponseEntity((Object)milestonesDTOSList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveMilestonesList/{empId}"})
    public ResponseEntity<List<MilestonesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List mileStonesList = this.milestonesService.findAll(empId.longValue());
        return new ResponseEntity((Object)mileStonesList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> subInitiativeValue) {
        if (Objects.isNull(subInitiativeValue.get("progressval")) || StringUtils.isEmpty((CharSequence)subInitiativeValue.get("progressval").toString())) {
            subInitiativeValue.put("progressval", "0");
        }
    }

    @GetMapping(value={"/findAllMilestonesList/{initiativeId}"})
    public ResponseEntity<List<MilestonesDTO>> retrieveMilestonesList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List milestonesDTOSList = this.milestonesService.findAllByInitiativesId(initiativeId);
        return new ResponseEntity((Object)milestonesDTOSList, HttpStatus.OK);
    }
}

