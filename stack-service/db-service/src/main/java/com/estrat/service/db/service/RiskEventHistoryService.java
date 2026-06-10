/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskEventHistory
 *  com.estrat.service.db.dao.RiskEventHistoryRepository
 *  com.estrat.service.db.service.RiskEventHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskEventHistory;
import com.estrat.service.db.dao.RiskEventHistoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskEventHistoryService {
    @Autowired
    private RiskEventHistoryRepository riskEventHistoryRepository;

    public void save(RiskEventHistory riskEventHistory) {
        this.riskEventHistoryRepository.save(riskEventHistory);
    }

    public List<RiskEventHistory> findAllByRiskEventIDs(Long riskIds) {
        List dbList = this.riskEventHistoryRepository.findAllByRiskEventId(riskIds);
        return dbList;
    }

    public Optional<RiskEventHistory> findAllByversion(Long riskIds, Long version) {
        Optional dbList = this.riskEventHistoryRepository.findByRiskEventIdAndVersion(riskIds, version);
        return dbList;
    }
}

