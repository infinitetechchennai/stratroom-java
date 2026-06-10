/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelTheme
 *  com.estrat.service.db.dao.ControlPanelThemeRepository
 *  com.estrat.service.db.dto.ControlPanelResponseDTO
 *  com.estrat.service.db.dto.ControlPanelThemeDTO
 *  com.estrat.service.db.service.ControlPanelThemeService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelTheme;
import com.estrat.service.db.dao.ControlPanelThemeRepository;
import com.estrat.service.db.dto.ControlPanelResponseDTO;
import com.estrat.service.db.dto.ControlPanelThemeDTO;
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
            this.controlPanelThemeRepository.delete((Object)controlPanelGeneral1);
            controlPanelResponseDTO.setFlag(true);
            return controlPanelResponseDTO;
        }
        controlPanelResponseDTO.setFlag(false);
        return controlPanelResponseDTO;
    }
}

