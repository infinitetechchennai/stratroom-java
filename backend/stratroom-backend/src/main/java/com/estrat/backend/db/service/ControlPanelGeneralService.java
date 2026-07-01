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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelGeneralService {
    @Autowired
    protected ControlPanelGeneralRepository controlPanelGeneralRepository;
    @Autowired
    protected ControlPanelCustomRepository controlPanelCustomRepository;

    @Transactional
    public ControlPanelResponseDTO save(ControlPanelGeneral controlPanelGeneral) {
        ControlPanelGeneral existing = this.controlPanelGeneralRepository.findById(controlPanelGeneral.getOrgId()).orElse(null);
        ControlPanelGeneral controlPanelGeneralResponse;
        if (existing == null) {
            controlPanelGeneralResponse = (ControlPanelGeneral)this.controlPanelGeneralRepository.save(controlPanelGeneral);
        } else {
            existing.setSiteName(controlPanelGeneral.getSiteName());
            existing.setSiteLanguage(controlPanelGeneral.getSiteLanguage());
            existing.setAdminEmailId(controlPanelGeneral.getAdminEmailId());
            existing.setCurrencyType(controlPanelGeneral.getCurrencyType());
            existing.setCalendarYear(controlPanelGeneral.getCalendarYear());
            existing.setTimeZone(controlPanelGeneral.getTimeZone());
            existing.setUpdatedBy(controlPanelGeneral.getUpdatedBy());
            existing.setUpdatedTime(controlPanelGeneral.getUpdatedTime());
            existing.setDepartment(controlPanelGeneral.getDepartment());
            existing.setCurrencyView(controlPanelGeneral.getCurrencyView());
            existing.setDepartmentId(controlPanelGeneral.getDepartmentId());
            existing.setDefaultDatePeriod(controlPanelGeneral.getDefaultDatePeriod());
            existing.setImplementation(controlPanelGeneral.getImplementation());
            existing.setImplementationType(controlPanelGeneral.getImplementationType());
            existing.setStartMonth(controlPanelGeneral.getStartMonth());
            existing.setEndMonth(controlPanelGeneral.getEndMonth());
            if (controlPanelGeneral.getGeneralSettingValue() != null) {
                existing.setGeneralSettingValue(controlPanelGeneral.getGeneralSettingValue());
            }
            controlPanelGeneralResponse = (ControlPanelGeneral)this.controlPanelGeneralRepository.save(existing);
        }
        
        ControlPanelResponseDTO responseDTO = new ControlPanelResponseDTO();
        responseDTO.setFlag(true);
        ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO(controlPanelGeneralResponse);
        responseDTO.setControlPanelGeneralDTO(controlPanelGeneralDTO);
        return responseDTO;
    }

    @Transactional
    public ControlPanelResponseDTO saveCustomPerformance(ControlPanelCustomPerformance controlPanelCustomPerformance) {
        ControlPanelCustomPerformance existing = this.controlPanelCustomRepository.findById(controlPanelCustomPerformance.getOrgId()).orElse(null);
        ControlPanelCustomPerformance controlPanelGeneralResponse;
        if (existing == null) {
            controlPanelGeneralResponse = (ControlPanelCustomPerformance)this.controlPanelCustomRepository.save(controlPanelCustomPerformance);
        } else {
            if (controlPanelCustomPerformance.getCustomValue() != null) {
                existing.setCustomValue(controlPanelCustomPerformance.getCustomValue());
            }
            if (controlPanelCustomPerformance.getRisksetting() != null) {
                existing.setRisksetting(controlPanelCustomPerformance.getRisksetting());
            }
            existing.setUpdatedBy(controlPanelCustomPerformance.getUpdatedBy());
            existing.setUpdatedTime(controlPanelCustomPerformance.getUpdatedTime());
            controlPanelGeneralResponse = (ControlPanelCustomPerformance)this.controlPanelCustomRepository.save(existing);
        }

        ObjectMapper mapper = new ObjectMapper();
        CustomPerformance customPerformance = null;
        try {
            if (controlPanelGeneralResponse.getCustomValue() != null && !controlPanelGeneralResponse.getCustomValue().isBlank()) {
                customPerformance = new CustomPerformance((Map)mapper.readValue(controlPanelGeneralResponse.getCustomValue(), HashMap.class));
            }
        }
        catch (Exception e) {
            // ignore
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
                String customValue = ((ControlPanelCustomPerformance)result.get()).getCustomValue();
                if (customValue == null || customValue.isBlank()) {
                    return Collections.emptyMap();
                }
                ObjectMapper mapper = new ObjectMapper();
                try {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> parsed = mapper.readValue(customValue, HashMap.class);
                    return parsed;
                }
                catch (Exception e) {
                    return Collections.emptyMap();
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
                    return (Map)mapper.readValue(((ControlPanelCustomPerformance)result.get()).getRisksetting(), HashMap.class);
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
        if (controlPanelGeneral == null) {
            return new ControlPanelGeneralDTO();
        }
        return new ControlPanelGeneralDTO(controlPanelGeneral);
    }

    // Flips the org between Employee and Department implementation modes. Used by the
    // two-file org import, which switches the org to Department mode after loading the
    // department-hierarchy file.
    public ControlPanelGeneralDTO setImplementationType(long orgId, String type) {
        ControlPanelGeneral controlPanelGeneral = this.controlPanelGeneralRepository.findById(orgId).orElse(null);
        if (controlPanelGeneral == null) {
            return new ControlPanelGeneralDTO();
        }
        controlPanelGeneral.setImplementationType(type);
        controlPanelGeneral.setImplementation(type);
        controlPanelGeneral.setUpdatedTime(java.time.LocalDateTime.now());
        this.controlPanelGeneralRepository.save(controlPanelGeneral);
        return new ControlPanelGeneralDTO(controlPanelGeneral);
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
                return (Map)mapper.readValue(((ControlPanelCustomPerformance)result.get()).getCustomValue(), HashMap.class);
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

