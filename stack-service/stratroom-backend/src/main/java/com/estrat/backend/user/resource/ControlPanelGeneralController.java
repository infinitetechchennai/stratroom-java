/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.resource.ControlPanelGeneralController
 *  com.estrat.backend.user.service.ControlPanelGeneralService
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
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.ControlPanelGeneralDTO;
import com.estrat.backend.user.dto.ControlPanelResponseDTO;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.ControlPanelGeneralService;
import java.util.List;
import java.util.Map;
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
public class ControlPanelGeneralController {
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;

    @PostMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.saveControlPanelGeneral(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.updateControlPanelGeneral(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<ControlPanelGeneralDTO> getControlPanelGeneralById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.retrieveControlPanelGeneral(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<Boolean> deleteControlPanelGeneralById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.controlPanelGeneralService.removeControlPanelGeneral(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/generalSettingList/{orgId}"})
    public ResponseEntity<ControlPanelGeneralDTO> findByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.findByOrgId(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/scriptrestore"})
    public ResponseEntity<ControlPanelResponseDTO> runScriptRestore(@RequestParam(value="path") String path, @RequestParam(value="orgId") String orgId) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.runScriptRestore(path, orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/restorePath"})
    public ResponseEntity<List<String>> restorePath(@RequestParam(value="orgId") String orgId) throws RequestException {
        return this.controlPanelGeneralService.restorePath(orgId);
    }

    @PostMapping(value={"/customPerformance"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelCustomPerformance(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.saveControlPanelCustomPerformance(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/customPerformance/risk"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelrisk(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.saveControlPanelrisk(controlPanelGeneralDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/details"})
    public ResponseEntity<Map<String, Object>> findCustomPerformanceDetails() throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.findCustomPerformanceByOrgId(), HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/riskdetails"})
    public ResponseEntity<Map<String, Object>> findrisksetting() throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.findrisksetting(), HttpStatus.OK);
    }
}

