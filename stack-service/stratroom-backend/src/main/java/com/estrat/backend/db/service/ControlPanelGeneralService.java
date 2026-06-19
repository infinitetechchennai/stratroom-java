/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelCustomPerformance
 *  com.estrat.backend.db.bean.po.ControlPanelGeneral
 *  com.estrat.backend.db.dao.ControlPanelGeneralRepository
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.ControlPanelResponseDTO
 *  com.estrat.backend.db.dto.CustomPerformance
 *  com.estrat.backend.db.repository.ControlPanelCustomRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ControlPanelCustomPerformance;
import com.estrat.backend.db.bean.po.ControlPanelGeneral;
import com.estrat.backend.db.dao.ControlPanelGeneralRepository;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.ControlPanelResponseDTO;
import com.estrat.backend.db.dto.CustomPerformance;
import com.estrat.backend.db.repository.ControlPanelCustomRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.estrat.backend.db.util.JsonUtil;

@Service
public class ControlPanelGeneralService {
    @Autowired
    protected ControlPanelGeneralRepository controlPanelGeneralRepository;
    @Autowired
    protected ControlPanelCustomRepository controlPanelCustomRepository;

    public ControlPanelResponseDTO save(ControlPanelGeneral controlPanelGeneral) {
        ControlPanelGeneral controlPanelGeneralResponse = (ControlPanelGeneral)this.controlPanelGeneralRepository.save(controlPanelGeneral);
        ControlPanelResponseDTO responseDTO = new ControlPanelResponseDTO();
        responseDTO.setFlag(true);
        ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO(controlPanelGeneralResponse);
        responseDTO.setControlPanelGeneralDTO(controlPanelGeneralDTO);
        return responseDTO;
    }

    public ControlPanelResponseDTO saveCustomPerformance(ControlPanelCustomPerformance controlPanelCustomPerformance) {
        ControlPanelCustomPerformance controlPanelGeneralResponse = (ControlPanelCustomPerformance)this.controlPanelCustomRepository.save(controlPanelCustomPerformance);
        ObjectMapper mapper = new ObjectMapper();
        CustomPerformance customPerformance = null;
        try {
            customPerformance = new CustomPerformance(JsonUtil.parseMap(controlPanelGeneralResponse.getCustomValue()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        ControlPanelResponseDTO responseDTO = new ControlPanelResponseDTO();
        responseDTO.setCustomPerformance(customPerformance);
        if (Objects.nonNull(controlPanelGeneralResponse)) {
            responseDTO.setFlag(true);
        } else {
            responseDTO.setFlag(false);
        }
        return responseDTO;
    }

    public Map<String, Object> findCustomPerformanceByOrgId() {
        String orgID = UserThreadLocal.get((String)"USER_ORG_ID");
        if (orgID != null && orgID != "") {
            Optional result = this.controlPanelCustomRepository.findById(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
            if (result.isPresent()) {
                ObjectMapper mapper = new ObjectMapper();
                try {
                    return JsonUtil.parseMap(((ControlPanelCustomPerformance)result.get()).getCustomValue());
                }
                catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            return Collections.emptyMap();
        }
        return Collections.emptyMap();
    }

    public Map<String, Object> findrisksettingsByOrgId() {
        String orgID = UserThreadLocal.get((String)"USER_ORG_ID");
        if (orgID != null && orgID != "") {
            Optional result = this.controlPanelCustomRepository.findById(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
            if (result.isPresent()) {
                ObjectMapper mapper = new ObjectMapper();
                try {
                    return JsonUtil.parseMap(((ControlPanelCustomPerformance)result.get()).getRisksetting());
                }
                catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            return Collections.emptyMap();
        }
        return Collections.emptyMap();
    }

    public Optional<ControlPanelGeneral> findById(long id) {
        return this.controlPanelGeneralRepository.findById(id);
    }

    public ControlPanelGeneralDTO findByOrgId(long orgId) {
        ControlPanelGeneral controlPanelGeneral = this.controlPanelGeneralRepository.findAllByOrgId(Long.valueOf(orgId));
        ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO(controlPanelGeneral);
        return controlPanelGeneralDTO;
    }

    public ControlPanelResponseDTO deleteById(long id) {
        Optional controlPanelGeneral = this.findById(id);
        ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
        if (controlPanelGeneral.isPresent()) {
            ControlPanelGeneral controlPanelGeneral1 = (ControlPanelGeneral)controlPanelGeneral.get();
            this.controlPanelGeneralRepository.delete(controlPanelGeneral1);
            controlPanelResponseDTO.setFlag(true);
            return controlPanelResponseDTO;
        }
        controlPanelResponseDTO.setFlag(false);
        return controlPanelResponseDTO;
    }

    public Map<String, String> findCustomPerformance(long orgId) {
        Optional result = this.controlPanelCustomRepository.findById(orgId);
        if (result.isPresent()) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                return (Map)JsonUtil.parseMap(((ControlPanelCustomPerformance)result.get()).getCustomValue());
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return Collections.emptyMap();
    }

    public ControlPanelCustomPerformance findCustomPerformancebyid(long orgId) {
        Optional result = this.controlPanelCustomRepository.findById(orgId);
        if (result.isPresent()) {
            return (ControlPanelCustomPerformance)result.get();
        }
        return null;
    }
}

