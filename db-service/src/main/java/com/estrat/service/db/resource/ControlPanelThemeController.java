/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelTheme
 *  com.estrat.service.db.dto.ControlPanelResponseDTO
 *  com.estrat.service.db.dto.ControlPanelThemeDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ControlPanelThemeController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelThemeService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.ControlPanelTheme;
import com.estrat.service.db.dto.ControlPanelResponseDTO;
import com.estrat.service.db.dto.ControlPanelThemeDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelThemeService;
import java.time.LocalDateTime;
import java.util.Optional;
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
    protected AuditDetailsService auditService;

    @PostMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        System.out.println("theameNameDto : " + controlPanelThemeDTO.getThemeName());
        ControlPanelTheme controlPanelTheme = new ControlPanelTheme(controlPanelThemeDTO);
        System.out.println("theameName : " + controlPanelTheme.getThemeName());
        controlPanelTheme.setCreatedTime(LocalDateTime.now());
        this.updateTheme(controlPanelThemeDTO);
        System.out.println("uptheameName : " + controlPanelTheme.getThemeName());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelThemeService.save(controlPanelTheme);
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/theme"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelTheme(@RequestBody ControlPanelThemeDTO controlPanelThemeDTO, HttpServletRequest request) throws RequestException {
        ControlPanelTheme controlPanelGeneral = new ControlPanelTheme(controlPanelThemeDTO);
        controlPanelGeneral.setUpdatedTime(LocalDateTime.now());
        this.updateTheme(controlPanelThemeDTO);
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelThemeService.save(controlPanelGeneral);
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/theme/{id}"})
    public ResponseEntity<ControlPanelThemeDTO> getControlPanelThemeById(@PathVariable(value="id") Long id) throws RequestException {
        ControlPanelThemeDTO controlPanelThemeDTO = new ControlPanelThemeDTO((ControlPanelTheme)this.controlPanelThemeService.findById(id.longValue()).get());
        return new ResponseEntity((Object)controlPanelThemeDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/theme/{id}"})
    public ResponseEntity<ControlPanelResponseDTO> deleteControlPanelThemeById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelThemeService.deleteById(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/themeList/{orgId}"})
    public ResponseEntity<ControlPanelThemeDTO> findAllByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        Optional controlPanelTheme = this.controlPanelThemeService.findById(orgId);
        if (controlPanelTheme.isPresent()) {
            ControlPanelThemeDTO controlPanelThemeDTO = new ControlPanelThemeDTO((ControlPanelTheme)controlPanelTheme.get());
            return new ResponseEntity((Object)controlPanelThemeDTO, HttpStatus.OK);
        }
        return new ResponseEntity((Object)new ControlPanelThemeDTO(), HttpStatus.OK);
    }

    private void updateTheme(ControlPanelThemeDTO controlPanelThemeDTO) {
        Optional controlPanelTheme = this.controlPanelThemeService.findById(controlPanelThemeDTO.getOrgId());
        if (controlPanelTheme.isPresent()) {
            ControlPanelThemeDTO controlPanelThemeDTO1 = new ControlPanelThemeDTO((ControlPanelTheme)controlPanelTheme.get());
            if (controlPanelThemeDTO1.getLoginLogo() != null && !controlPanelThemeDTO1.getLoginLogo().equals(controlPanelThemeDTO.getLoginLogo())) {
                this.auditService.saveAudit("Control Panel", controlPanelThemeDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Logo Uploaded");
            }
            if (controlPanelThemeDTO1.getLoginTheme() != null && !controlPanelThemeDTO1.getLoginTheme().isEmpty() && !controlPanelThemeDTO1.getLoginTheme().equals(controlPanelThemeDTO.getLoginTheme())) {
                this.auditService.saveAudit("Control Panel", controlPanelThemeDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Login Image Uploaded");
            }
            if (controlPanelThemeDTO1.getThemeColor() != null && !controlPanelThemeDTO1.getThemeColor().equals(controlPanelThemeDTO.getThemeColor())) {
                this.auditService.updateAudit("Control Panel", controlPanelThemeDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Branding Color Modified");
            }
            if (controlPanelThemeDTO1.getThemeName() != null && !controlPanelThemeDTO1.getThemeName().equals(controlPanelThemeDTO.getThemeName())) {
                this.auditService.updateAudit("Control Panel", controlPanelThemeDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Branding Theam Modified");
            }
        }
    }
}

