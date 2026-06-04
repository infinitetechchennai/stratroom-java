/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ControlPanelThemeController
 *  com.estrat.web.dto.ControlPanelResponseDTO
 *  com.estrat.web.dto.ControlPanelThemeDTO
 *  com.estrat.web.dto.OrganizationDetails
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ControlPanelThemeService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.LicenseService
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ControlPanelResponseDTO;
import com.estrat.web.dto.ControlPanelThemeDTO;
import com.estrat.web.dto.OrganizationDetails;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ControlPanelThemeService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.LicenseService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControlPanelThemeController {
    @Autowired
    protected ControlPanelThemeService controlPanelThemeService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected LicenseService licenseService;

    @PostMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        controlPanelThemeDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        controlPanelThemeDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.controlPanelThemeService.saveControlPanelTheme(controlPanelThemeDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        controlPanelThemeDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        controlPanelThemeDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.controlPanelThemeService.updateControlPanelTheme(controlPanelThemeDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/theme/{id}"})
    public ResponseEntity<ControlPanelThemeDTO> getControlPanelThemeById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.controlPanelThemeService.retrieveControlPanelTheme(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/theme/{id}"})
    public ResponseEntity<Boolean> deleteControlPanelThemeById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.controlPanelThemeService.removeControlPanelTheme(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/themeList"})
    public ResponseEntity<ControlPanelThemeDTO> findByOrgId() throws RequestException {
        return new ResponseEntity(this.controlPanelThemeService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()), HttpStatus.OK);
    }

    @GetMapping(value={"/loginTheme"})
    public ResponseEntity<ControlPanelThemeDTO> findTheme() throws RequestException {
        // Bypass licenseService call (db-service unavailable) - return empty theme for login page
        try {
            UserThreadLocal.get().getCommonHeaders().put("PRELOGINAPI", "TRUE");
            OrganizationDetails organizationDetails = this.employeeService.findByName(this.licenseService.validateLicense().getOrganization());
            if (organizationDetails != null) {
                return new ResponseEntity(this.controlPanelThemeService.findByOrgId(organizationDetails.getId()), HttpStatus.OK);
            }
        } catch (Exception e) {
            // silently return empty theme if license service is unavailable
        }
        return new ResponseEntity(new ControlPanelThemeDTO(), HttpStatus.OK);
    }
}

