/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIEntrys
 *  com.estrat.service.db.bean.po.PerformanceContract
 *  com.estrat.service.db.bean.po.SubKPIEntrys
 *  com.estrat.service.db.dao.KPIEntrysRepository
 *  com.estrat.service.db.dao.PerformanceContractRepository
 *  com.estrat.service.db.dao.SubKPIEntrysRepository
 *  com.estrat.service.db.dto.KPIEntrysDTO
 *  com.estrat.service.db.dto.PerformanceContractDTO
 *  com.estrat.service.db.dto.SubKPIEntrysDTO
 *  com.estrat.service.db.service.PerformanceContractService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.KPIEntrys;
import com.estrat.service.db.bean.po.PerformanceContract;
import com.estrat.service.db.bean.po.SubKPIEntrys;
import com.estrat.service.db.dao.KPIEntrysRepository;
import com.estrat.service.db.dao.PerformanceContractRepository;
import com.estrat.service.db.dao.SubKPIEntrysRepository;
import com.estrat.service.db.dto.KPIEntrysDTO;
import com.estrat.service.db.dto.PerformanceContractDTO;
import com.estrat.service.db.dto.SubKPIEntrysDTO;
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
        this.performanceContractRepository.delete((Object)performanceContract);
        return new PerformanceContractDTO(performanceContract);
    }

    public List<PerformanceContractDTO> findByEmpId(Long empId) {
        List dbList = this.performanceContractRepository.findAllByEmpIds(empId);
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

