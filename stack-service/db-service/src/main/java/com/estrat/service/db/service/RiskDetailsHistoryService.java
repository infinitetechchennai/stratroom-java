/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskDetailsHistory
 *  com.estrat.service.db.dao.RiskDetailsHistoryRepository
 *  com.estrat.service.db.service.RiskDetailsHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskDetailsHistory;
import com.estrat.service.db.dao.RiskDetailsHistoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskDetailsHistoryService {
    @Autowired
    private RiskDetailsHistoryRepository riskDetailsHistoryRepository;

    public void save(RiskDetailsHistory riskDetailsHistory) {
        this.riskDetailsHistoryRepository.save(riskDetailsHistory);
    }

    public List<RiskDetailsHistory> findAllByRiskIDs(Long riskIds) {
        List dbList = this.riskDetailsHistoryRepository.findAllByRiskId(riskIds);
        return dbList;
    }

    public Optional<RiskDetailsHistory> findAllByversion(Long riskIds, Long version) {
        Optional dbList = this.riskDetailsHistoryRepository.findByRiskIdAndVersion(riskIds, version);
        return dbList;
    }

    public void deleteHistor(Long riskId) {
        List dbList = this.riskDetailsHistoryRepository.findAllByRiskId(riskId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskDetailsHistory history : dbList) {
                history.setActive(1);
                this.riskDetailsHistoryRepository.save(history);
            }
        }
    }
}

