/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ChartDetails
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.ChartRepository
 *  com.estrat.service.db.dao.PreferenceDetailRepository
 *  com.estrat.service.db.dto.ChartDTO
 *  com.estrat.service.db.dto.PreferenceDTO
 *  com.estrat.service.db.service.ChartService
 *  com.estrat.service.db.service.PestelAnalysisService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ChartDetails;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.ChartRepository;
import com.estrat.service.db.dao.PreferenceDetailRepository;
import com.estrat.service.db.dto.ChartDTO;
import com.estrat.service.db.dto.PreferenceDTO;
import com.estrat.service.db.service.PestelAnalysisService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartService {
    private Logger log = Logger.getLogger(PestelAnalysisService.class);
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
        this.chartRepository.delete((Object)chartDetails);
    }

    public List<ChartDTO> findAll(long empId, String pageId) {
        List dbList = null;
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
        List preferDetail;
        if (Objects.nonNull(chartDTO.getId()) && (preferDetail = this.preferenceDetailRepository.findAllBychartIdId(Long.valueOf(chartDTO.getId()))) != null) {
            List preferencesDTOS = preferDetail.stream().map(dbValue -> new PreferenceDTO(dbValue)).collect(Collectors.toList());
            chartDTO.setChartPreferenceDetailList(preferencesDTOS);
        }
    }
}

