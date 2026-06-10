/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MissionVisionValue
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.MissionVisionValueDto
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.MissionVisionValueController
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.MissionVisionValueService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.MissionVisionValue;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.MissionVisionValueDto;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.MissionVisionValueService;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MissionVisionValueController {
    @Autowired
    protected MissionVisionValueService landingPageMVVService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> saveMVV(@RequestBody MissionVisionValueDto landingPageMVVDto, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (landingPageMVVDto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getCreatedBy());
            landingPageMVVDto.getMissionvisionvalue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (landingPageMVVDto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getUpdatedBy());
            landingPageMVVDto.getMissionvisionvalue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (landingPageMVVDto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getOwner());
            landingPageMVVDto.getMissionvisionvalue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        MissionVisionValue landingPageMVV = new MissionVisionValue(landingPageMVVDto);
        landingPageMVV.setCreatedTime(LocalDateTime.now());
        MissionVisionValueDto mresponseDTO = this.landingPageMVVService.save(landingPageMVV);
        this.auditService.saveAudit("LandingPage ", landingPageMVVDto.getId(), landingPageMVVDto.getCreatedBy(), "MVV Created");
        return new ResponseEntity((Object)mresponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/missionVisionValue"})
    public ResponseEntity<MissionVisionValueDto> updateMVV(@RequestBody MissionVisionValueDto landingPageMVVDto, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (landingPageMVVDto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getCreatedBy());
            landingPageMVVDto.getMissionvisionvalue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (landingPageMVVDto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getUpdatedBy());
            landingPageMVVDto.getMissionvisionvalue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (landingPageMVVDto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(landingPageMVVDto.getOwner());
            landingPageMVVDto.getMissionvisionvalue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        MissionVisionValue landingPageMVV = new MissionVisionValue(landingPageMVVDto);
        landingPageMVV.setUpdatedTime(LocalDateTime.now());
        MissionVisionValueDto mresponseDTO = this.landingPageMVVService.save(landingPageMVV);
        this.auditService.saveAudit("LandingPage ", landingPageMVVDto.getId(), landingPageMVVDto.getUpdatedBy(), "MVV Modified");
        return new ResponseEntity((Object)mresponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValue/{id}"})
    public ResponseEntity<MissionVisionValueDto> getMVVById(@PathVariable(value="id") Long id) throws RequestException {
        MissionVisionValue landingPageMVV = (MissionVisionValue)this.landingPageMVVService.findById(id.longValue()).get();
        MissionVisionValueDto responseDTO = new MissionVisionValueDto(landingPageMVV);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/missionVisionValueList/{empId}"})
    public ResponseEntity<List<MissionVisionValueDto>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        List responseDTOList = this.landingPageMVVService.findAll(empId);
        return new ResponseEntity((Object)responseDTOList, HttpStatus.OK);
    }
}

