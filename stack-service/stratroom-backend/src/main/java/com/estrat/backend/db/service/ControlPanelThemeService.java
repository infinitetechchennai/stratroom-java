/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelTheme
 *  com.estrat.backend.db.dao.ControlPanelThemeRepository
 *  com.estrat.backend.db.dto.ControlPanelResponseDTO
 *  com.estrat.backend.db.dto.ControlPanelThemeDTO
 *  com.estrat.backend.db.service.ControlPanelThemeService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ControlPanelTheme;
import com.estrat.backend.db.dao.ControlPanelThemeRepository;
import com.estrat.backend.db.dto.ControlPanelResponseDTO;
import com.estrat.backend.db.dto.ControlPanelThemeDTO;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelThemeService {
    @Autowired
    protected ControlPanelThemeRepository controlPanelThemeRepository;

    public ControlPanelResponseDTO save(ControlPanelTheme controlPanelTheme) {
        ControlPanelTheme controlPanelThemeResponse = (ControlPanelTheme)this.controlPanelThemeRepository.save(controlPanelTheme);
        ControlPanelResponseDTO responseDTO = new ControlPanelResponseDTO();
        responseDTO.setFlag(true);
        ControlPanelThemeDTO controlPanelThemeDTO = new ControlPanelThemeDTO(controlPanelThemeResponse);
        responseDTO.setControlPanelThemeDTO(controlPanelThemeDTO);
        return responseDTO;
    }

    public Optional<ControlPanelTheme> findById(long id) {
        return this.controlPanelThemeRepository.findById(id);
    }

    public ControlPanelResponseDTO deleteById(long id) {
        Optional controlPanelTheme = this.findById(id);
        ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
        if (controlPanelTheme.isPresent()) {
            ControlPanelTheme controlPanelGeneral1 = (ControlPanelTheme)controlPanelTheme.get();
            this.controlPanelThemeRepository.delete(controlPanelGeneral1);
            controlPanelResponseDTO.setFlag(true);
            return controlPanelResponseDTO;
        }
        controlPanelResponseDTO.setFlag(false);
        return controlPanelResponseDTO;
    }
}

