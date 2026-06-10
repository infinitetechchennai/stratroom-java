/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelSecurity
 *  com.estrat.service.db.dao.ControlPanelSecurityRepository
 *  com.estrat.service.db.dto.ControlPanelResponseDTO
 *  com.estrat.service.db.dto.ControlPanelSecurityDTO
 *  com.estrat.service.db.service.ControlPanelSecurityService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelSecurity;
import com.estrat.service.db.dao.ControlPanelSecurityRepository;
import com.estrat.service.db.dto.ControlPanelResponseDTO;
import com.estrat.service.db.dto.ControlPanelSecurityDTO;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelSecurityService {
    @Autowired
    protected ControlPanelSecurityRepository controlPanelSecurityRepository;

    public ControlPanelResponseDTO save(ControlPanelSecurity controlPanelSecurity) {
        ControlPanelSecurity controlPanelThemeResponse = (ControlPanelSecurity)this.controlPanelSecurityRepository.save(controlPanelSecurity);
        ControlPanelResponseDTO responseDTO = new ControlPanelResponseDTO();
        responseDTO.setFlag(true);
        ControlPanelSecurityDTO controlPanelSecurityDTO = new ControlPanelSecurityDTO(controlPanelThemeResponse);
        responseDTO.setControlPanelSecurityDTO(controlPanelSecurityDTO);
        return responseDTO;
    }

    public Optional<ControlPanelSecurity> findById(long id) {
        return this.controlPanelSecurityRepository.findById(id);
    }

    public ControlPanelSecurityDTO findAllByOrgId(long orgId) {
        ControlPanelSecurity controlPanelSecurity = this.controlPanelSecurityRepository.findAllByOrgId(Long.valueOf(orgId));
        ControlPanelSecurityDTO controlPanelSecurityDTO = new ControlPanelSecurityDTO(controlPanelSecurity);
        return controlPanelSecurityDTO;
    }

    public ControlPanelResponseDTO deleteById(long id) {
        Optional controlPanelSecurity = this.findById(id);
        ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
        if (controlPanelSecurity.isPresent()) {
            ControlPanelSecurity controlPanelSecurity1 = (ControlPanelSecurity)controlPanelSecurity.get();
            this.controlPanelSecurityRepository.delete((Object)controlPanelSecurity1);
            controlPanelResponseDTO.setFlag(true);
            return controlPanelResponseDTO;
        }
        controlPanelResponseDTO.setFlag(false);
        return controlPanelResponseDTO;
    }
}

