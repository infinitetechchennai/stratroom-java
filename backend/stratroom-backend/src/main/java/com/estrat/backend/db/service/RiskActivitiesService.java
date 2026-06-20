/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskActivities
 *  com.estrat.backend.db.bean.po.RiskActivitiesHistory
 *  com.estrat.backend.db.dao.RiskActivitiesHistoryRepository
 *  com.estrat.backend.db.dao.RiskActivitiesRepository
 *  com.estrat.backend.db.dto.RiskActivitiesDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.service.RiskActivitiesService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.RiskActivities;
import com.estrat.backend.db.bean.po.RiskActivitiesHistory;
import com.estrat.backend.db.dao.RiskActivitiesHistoryRepository;
import com.estrat.backend.db.dao.RiskActivitiesRepository;
import com.estrat.backend.db.dto.RiskActivitiesDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class RiskActivitiesService {
    private Logger log = LoggerFactory.getLogger(RiskActivitiesService.class);
    @Autowired
    protected RiskActivitiesRepository riskActivitiesRepository;
    @Autowired
    protected RiskActivitiesHistoryRepository riskActivitiesHistoryRepository;

    public Optional<RiskActivities> findById(long id) {
        return this.riskActivitiesRepository.findById(id);
    }

    public RiskResponseDTO save(RiskActivities riskActivities) {
        RiskActivities riskActivitiesResponse = (RiskActivities)this.riskActivitiesRepository.save(riskActivities);
        RiskResponseDTO responseDTO = new RiskResponseDTO();
        responseDTO.setFlag(true);
        RiskActivitiesDTO riskActivitiesDTO = new RiskActivitiesDTO(riskActivitiesResponse, false);
        responseDTO.setRiskActivitiesDTO(riskActivitiesDTO);
        return responseDTO;
    }

    public void save(RiskActivitiesHistory riskActivities) {
        this.riskActivitiesHistoryRepository.save(riskActivities);
    }

    public void deleteHistor(Long activeId) {
        List<RiskActivitiesHistory> dbList = this.riskActivitiesHistoryRepository.findAllByactiveId(activeId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskActivitiesHistory history : dbList) {
                history.setActive(1);
                this.riskActivitiesHistoryRepository.save(history);
            }
        }
    }

    public RiskResponseDTO delete(long id) {
        RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
        Optional riskActivities = this.riskActivitiesRepository.findById(id);
        if (riskActivities.isPresent()) {
            RiskActivities riskActivities1 = (RiskActivities)riskActivities.get();
            riskActivities1.setActive(1);
            this.riskActivitiesRepository.delete(riskActivities1);
            riskResponseDTO.setFlag(true);
        }
        return riskResponseDTO;
    }

    public List<RiskActivitiesDTO> findAll(long empId) {
        List<RiskActivities> dbList = this.riskActivitiesRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<RiskActivitiesDTO> riskList = dbList.stream().map(dbValue -> new RiskActivitiesDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskActivitiesDTO> findAllByRiskPlanId(Long riskPlanId) {
        List<RiskActivities> dbList = this.riskActivitiesRepository.findAllByRiskPlanId(riskPlanId);
        List<RiskActivitiesDTO> riskActivitiesDTOList = dbList.stream().map(dbValue -> new RiskActivitiesDTO(dbValue, true)).collect(Collectors.toList());
        return riskActivitiesDTOList;
    }
}

