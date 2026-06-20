/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChartDetails
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.ChartRepository
 *  com.estrat.backend.db.dao.PreferenceDetailRepository
 *  com.estrat.backend.db.dto.ChartDTO
 *  com.estrat.backend.db.dto.PreferenceDTO
 *  com.estrat.backend.db.service.ChartService
 *  com.estrat.backend.db.service.PestelAnalysisService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ChartDetails;
import com.estrat.backend.db.bean.po.PreferenceSubDetail;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.ChartRepository;
import com.estrat.backend.db.dao.PreferenceDetailRepository;
import com.estrat.backend.db.dto.ChartDTO;
import com.estrat.backend.db.dto.PreferenceDTO;
import com.estrat.backend.db.service.PestelAnalysisService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartService {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisService.class);
    @Autowired
    protected ChartRepository chartRepository;
    @Autowired
    protected PreferenceDetailRepository preferenceDetailRepository;
    @Autowired
    private DBCache dbCache;

    public Optional<ChartDetails> findById(long id) {
        return this.chartRepository.findById(id);
    }

    public ChartDTO save(ChartDetails chartDetails) {
        ChartDetails chartDetailsResponse = (ChartDetails)this.chartRepository.save(chartDetails);
        ChartDTO chartDTOResponse = new ChartDTO(chartDetailsResponse);
        return chartDTOResponse;
    }

    public void delete(ChartDetails chartDetails) {
        this.chartRepository.delete(chartDetails);
    }

    public List<ChartDTO> findAll(long empId, String pageId) {
        List<ChartDetails> dbList = null;
        dbList = pageId != null && !pageId.isEmpty() ? this.chartRepository.findAllByEmpId(Long.valueOf(empId), 0, Long.valueOf(pageId)) : this.chartRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<ChartDTO> chartDTOList = dbList.stream().map(dbValue -> {
            ChartDTO chartDTOs = new ChartDTO(dbValue);
            this.populateActualData(chartDTOs);
            return chartDTOs;
        }).collect(Collectors.toList());
        return chartDTOList;
    }

    public List<ChartDetails> findAllByPageId(long pageId) {
        return this.chartRepository.findAllByPageId(Long.valueOf(pageId));
    }

    public void populateActualData(ChartDTO chartDTO) {
        List<PreferenceSubDetail> preferDetail;
        if (Objects.nonNull(chartDTO.getId()) && (preferDetail = this.preferenceDetailRepository.findAllBychartIdId(Long.valueOf(chartDTO.getId()))) != null) {
            List<PreferenceDTO> preferencesDTOS = preferDetail.stream().map(dbValue -> new PreferenceDTO(dbValue)).collect(Collectors.toList());
            chartDTO.setChartPreferenceDetailList(preferencesDTOS);
        }
    }
}

