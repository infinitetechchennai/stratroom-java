/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIEntrys
 *  com.estrat.backend.db.bean.po.PerformanceContract
 *  com.estrat.backend.db.bean.po.SubKPIEntrys
 *  com.estrat.backend.db.dao.KPIEntrysRepository
 *  com.estrat.backend.db.dao.PerformanceContractRepository
 *  com.estrat.backend.db.dao.SubKPIEntrysRepository
 *  com.estrat.backend.db.dto.KPIEntrysDTO
 *  com.estrat.backend.db.dto.PerformanceContractDTO
 *  com.estrat.backend.db.dto.SubKPIEntrysDTO
 *  com.estrat.backend.db.service.PerformanceContractService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.KPIEntrys;
import com.estrat.backend.db.bean.po.PerformanceContract;
import com.estrat.backend.db.bean.po.SubKPIEntrys;
import com.estrat.backend.db.dao.KPIEntrysRepository;
import com.estrat.backend.db.dao.PerformanceContractRepository;
import com.estrat.backend.db.dao.SubKPIEntrysRepository;
import com.estrat.backend.db.dto.KPIEntrysDTO;
import com.estrat.backend.db.dto.PerformanceContractDTO;
import com.estrat.backend.db.dto.SubKPIEntrysDTO;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerformanceContractService {
    @Autowired
    protected PerformanceContractRepository performanceContractRepository;
    @Autowired
    private SubKPIEntrysRepository subKPIEntrysRepository;
    @Autowired
    private KPIEntrysRepository kpiEntrysRepository;

    public Optional<PerformanceContract> findById(long id) {
        return this.performanceContractRepository.findById(id);
    }

    public PerformanceContractDTO save(PerformanceContract performanceContract) {
        PerformanceContract activitiesAndTasks1 = (PerformanceContract)this.performanceContractRepository.save(performanceContract);
        return new PerformanceContractDTO(activitiesAndTasks1);
    }

    public PerformanceContractDTO saveDelete(PerformanceContract performanceContract) {
        this.performanceContractRepository.delete(performanceContract);
        return new PerformanceContractDTO(performanceContract);
    }

    public List<PerformanceContractDTO> findByEmpId(Long empId) {
        List<PerformanceContract> dbList = this.performanceContractRepository.findAllByEmpIds(empId);
        return dbList.stream().map(dbValue -> new PerformanceContractDTO(dbValue)).collect(Collectors.toList());
    }

    public SubKPIEntrysDTO findBysubKPIEntryId(long subkpId) throws JsonParseException, JsonMappingException, IOException {
        SubKPIEntrys event = this.subKPIEntrysRepository.findTopBySubkpiIdOrderByIdDesc(Long.valueOf(subkpId));
        SubKPIEntrysDTO eventDto = null;
        if (event != null) {
            eventDto = new SubKPIEntrysDTO(event);
        }
        return eventDto;
    }

    public KPIEntrysDTO findByKPIEntryId(long kpiId) throws JsonParseException, JsonMappingException, IOException {
        KPIEntrys event = this.kpiEntrysRepository.findTopByKpiIdOrderByIdDesc(Long.valueOf(kpiId));
        KPIEntrysDTO eventDto = null;
        if (event != null) {
            eventDto = new KPIEntrysDTO(event);
        }
        return eventDto;
    }

    public PerformanceContractDTO findByPerformanceId(long performanceId) throws JsonParseException, JsonMappingException, IOException {
        Optional event = this.performanceContractRepository.findById(performanceId);
        PerformanceContractDTO eventDto = null;
        if (event.isPresent()) {
            eventDto = new PerformanceContractDTO((PerformanceContract)event.get());
        }
        return eventDto;
    }

    public PerformanceContractDTO findByPerformanceScoreCardId(long scoreCardId) throws JsonParseException, JsonMappingException, IOException {
        PerformanceContract event = this.performanceContractRepository.findAllByScorecardId(Long.valueOf(scoreCardId));
        PerformanceContractDTO eventDto = new PerformanceContractDTO();
        if (event != null) {
            eventDto = new PerformanceContractDTO(event);
        }
        return eventDto;
    }
}

