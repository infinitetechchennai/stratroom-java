/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.bean.po.RiskPlanHistory
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.RiskActivitiesHistoryRepository
 *  com.estrat.service.db.dao.RiskPlanHistoryRepository
 *  com.estrat.service.db.dao.RiskPlanMappingRepository
 *  com.estrat.service.db.dao.RiskPlanRepository
 *  com.estrat.service.db.dto.RiskActivitiesDTO
 *  com.estrat.service.db.dto.RiskPlanDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.service.RiskPlanService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskPlan;
import com.estrat.service.db.bean.po.RiskPlanHistory;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.RiskActivitiesHistoryRepository;
import com.estrat.service.db.dao.RiskPlanHistoryRepository;
import com.estrat.service.db.dao.RiskPlanMappingRepository;
import com.estrat.service.db.dao.RiskPlanRepository;
import com.estrat.service.db.dto.RiskActivitiesDTO;
import com.estrat.service.db.dto.RiskPlanDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
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
public class RiskPlanService {
    private Logger log = LoggerFactory.getLogger(RiskPlanService.class);
    @Autowired
    protected RiskPlanRepository riskPlanRepository;
    @Autowired
    protected RiskPlanMappingRepository planMappingRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private RiskPlanHistoryRepository historyRepository;
    @Autowired
    private RiskActivitiesHistoryRepository riskActivitiesHistoryRepository;

    public Optional<RiskPlan> findById(long id) {
        return this.riskPlanRepository.findById(id);
    }

    public RiskResponseDTO save(RiskPlan riskPlan) {
        RiskPlan riskPlanResponse = (RiskPlan)this.riskPlanRepository.save(riskPlan);
        RiskResponseDTO responseDTO = new RiskResponseDTO();
        responseDTO.setFlag(true);
        RiskPlanDTO riskPlanDTO = new RiskPlanDTO(riskPlanResponse, false);
        responseDTO.setRiskPlanDTO(riskPlanDTO);
        return responseDTO;
    }

    public void save(RiskPlanHistory history) {
        this.historyRepository.save(history);
    }

    public List<RiskPlanDTO> findByVersion(Long riskId, Long version, String flagtype) {
        List dbList = this.historyRepository.findByRiskIdAndVersion(riskId, version, flagtype);
        List<RiskPlanDTO> riskList = dbList.stream().map(dbValue -> {
            RiskPlanDTO plandto = new RiskPlanDTO(dbValue);
            if (flagtype.equals("RiskPlan")) {
                List activeList = this.riskActivitiesHistoryRepository.findByRiskIdAndVersion(Long.valueOf(plandto.getId()), plandto.getVersion());
                List riskactivtyList = activeList.stream().map(dbdata -> new RiskActivitiesDTO(dbdata)).collect(Collectors.toList());
                plandto.setRiskActivitiesDTOList(riskactivtyList);
            }
            return plandto;
        }).collect(Collectors.toList());
        return riskList;
    }

    public RiskResponseDTO delete(long id) {
        RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
        Optional riskPlan = this.riskPlanRepository.findById(id);
        if (riskPlan.isPresent()) {
            RiskPlan riskPlan1 = (RiskPlan)riskPlan.get();
            riskPlan1.setActive(1);
            this.planMappingRepository.deleteByIdRiskPlanId(riskPlan1);
            this.riskPlanRepository.delete((Object)riskPlan1);
            riskResponseDTO.setFlag(true);
        }
        return riskResponseDTO;
    }

    public void deleteHistor(Long planId) {
        List dbList = this.historyRepository.findByRiskPlanId(planId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskPlanHistory history : dbList) {
                history.setActive(1);
                this.historyRepository.save(history);
            }
        }
    }

    public List<RiskPlanDTO> findAll(long empId) {
        List dbList = this.riskPlanRepository.findAllByEmpIdANDTypeFlag(Long.valueOf(empId), 0, "RiskPlan");
        List<RiskPlanDTO> riskList = dbList.stream().map(dbValue -> new RiskPlanDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskPlanDTO> findAllByRiskDetailsId(Long riskId) {
        List dbList = this.riskPlanRepository.findAllByRiskDetailsIdANDTypeFlag(riskId, "RiskPlan");
        List<RiskPlanDTO> riskList = dbList.stream().map(dbValue -> new RiskPlanDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskPlanDTO> findAllTreatment(long empId) {
        List dbList = this.riskPlanRepository.findAllByEmpIdANDTypeFlag(Long.valueOf(empId), 0, "RiskTreatment");
        List<RiskPlanDTO> riskList = dbList.stream().map(dbValue -> new RiskPlanDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskPlanDTO> findAllByRiskDetailsIdTreatment(Long riskId) {
        List dbList = this.riskPlanRepository.findAllByRiskDetailsIdANDTypeFlag(riskId, "RiskTreatment");
        List<RiskPlanDTO> riskList = dbList.stream().map(dbValue -> new RiskPlanDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }
}

