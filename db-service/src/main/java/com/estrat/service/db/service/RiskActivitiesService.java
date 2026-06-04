/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskActivities
 *  com.estrat.service.db.bean.po.RiskActivitiesHistory
 *  com.estrat.service.db.dao.RiskActivitiesHistoryRepository
 *  com.estrat.service.db.dao.RiskActivitiesRepository
 *  com.estrat.service.db.dto.RiskActivitiesDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.service.RiskActivitiesService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskActivities;
import com.estrat.service.db.bean.po.RiskActivitiesHistory;
import com.estrat.service.db.dao.RiskActivitiesHistoryRepository;
import com.estrat.service.db.dao.RiskActivitiesRepository;
import com.estrat.service.db.dto.RiskActivitiesDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class RiskActivitiesService {
    private Logger log = Logger.getLogger(RiskActivitiesService.class);
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
        List dbList = this.riskActivitiesHistoryRepository.findAllByactiveId(activeId);
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
            this.riskActivitiesRepository.delete((Object)riskActivities1);
            riskResponseDTO.setFlag(true);
        }
        return riskResponseDTO;
    }

    public List<RiskActivitiesDTO> findAll(long empId) {
        List dbList = this.riskActivitiesRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<RiskActivitiesDTO> riskList = dbList.stream().map(dbValue -> new RiskActivitiesDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskActivitiesDTO> findAllByRiskPlanId(Long riskPlanId) {
        List dbList = this.riskActivitiesRepository.findAllByRiskPlanId(riskPlanId);
        List<RiskActivitiesDTO> riskActivitiesDTOList = dbList.stream().map(dbValue -> new RiskActivitiesDTO(dbValue, true)).collect(Collectors.toList());
        return riskActivitiesDTOList;
    }
}

