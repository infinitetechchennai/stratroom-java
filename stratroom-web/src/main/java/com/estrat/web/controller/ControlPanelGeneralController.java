/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ControlPanelGeneralController
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.ControlPanelResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.util.RequestSessionUtil
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

import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.ControlPanelResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Map;
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
public class ControlPanelGeneralController {
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        controlPanelGeneralDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        controlPanelGeneralDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.controlPanelGeneralService.saveControlPanelGeneral(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        controlPanelGeneralDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        controlPanelGeneralDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.controlPanelGeneralService.updateControlPanelGeneral(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<ControlPanelGeneralDTO> getControlPanelGeneralById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.retrieveControlPanelGeneral(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<Boolean> deleteControlPanelGeneralById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.controlPanelGeneralService.removeControlPanelGeneral(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/generalSettingList"})
    public ResponseEntity<ControlPanelGeneralDTO> findByOrgId() throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()), HttpStatus.OK);
    }

    @GetMapping(value={"/scriptrestore"})
    public ResponseEntity<ControlPanelResponseDTO> runScriptBackup(@RequestParam(value="path") String path) throws RequestException {
        Long orgId = UserThreadLocal.get().getProfile().getOrgDetails().getOrgId();
        return new ResponseEntity(this.controlPanelGeneralService.runScriptRestore(path, orgId.toString()), HttpStatus.OK);
    }

    @GetMapping(value={"/restorePath"})
    public ResponseEntity<List<String>> restorePath() throws RequestException {
        Long orgId = UserThreadLocal.get().getProfile().getOrgDetails().getOrgId();
        return this.controlPanelGeneralService.restorePath(orgId.toString());
    }

    @PostMapping(value={"/customPerformance"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelCustomPerformance(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.saveControlPanelCustomPerformance(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/customPerformance/risk"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelrisk(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.saveControlPanelrisk(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/details"})
    public ResponseEntity<Map<String, Object>> findCustomPerformanceDetails() throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.findCustomPerformanceByOrgId(), HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/riskdetails"})
    public ResponseEntity<Map<String, Object>> findCustomPerformanceriskDetails() throws RequestException {
        return new ResponseEntity(this.controlPanelGeneralService.findCustomPerformanceriskByOrgId(), HttpStatus.OK);
    }
}

