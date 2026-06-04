/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.ControlPanelResponseDTO
 *  com.estrat.service.user.dto.ControlPanelThemeDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.ControlPanelThemeController
 *  com.estrat.service.user.service.ControlPanelThemeService
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
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.ControlPanelResponseDTO;
import com.estrat.service.user.dto.ControlPanelThemeDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.service.ControlPanelThemeService;
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

    @PostMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelThemeService.saveControlPanelTheme(controlPanelThemeDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelThemeService.updateControlPanelTheme(controlPanelThemeDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/theme/{id}"})
    public ResponseEntity<ControlPanelThemeDTO> getControlPanelThemeById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelThemeService.retrieveControlPanelTheme(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/theme/{id}"})
    public ResponseEntity<Boolean> deleteControlPanelThemeById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.controlPanelThemeService.removeControlPanelTheme(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/themeList/{orgId}"})
    public ResponseEntity<ControlPanelThemeDTO> findByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelThemeService.findByOrgId(orgId), HttpStatus.OK);
    }
}

