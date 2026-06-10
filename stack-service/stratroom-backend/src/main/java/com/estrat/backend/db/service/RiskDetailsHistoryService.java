/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskDetailsHistory
 *  com.estrat.backend.db.dao.RiskDetailsHistoryRepository
 *  com.estrat.backend.db.service.RiskDetailsHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.RiskDetailsHistory;
import com.estrat.backend.db.dao.RiskDetailsHistoryRepository;
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
        List<RiskDetailsHistory> dbList = this.riskDetailsHistoryRepository.findAllByRiskId(riskIds);
        return dbList;
    }

    public Optional<RiskDetailsHistory> findAllByversion(Long riskIds, Long version) {
        Optional dbList = this.riskDetailsHistoryRepository.findByRiskIdAndVersion(riskIds, version);
        return dbList;
    }

    public void deleteHistor(Long riskId) {
        List<RiskDetailsHistory> dbList = this.riskDetailsHistoryRepository.findAllByRiskId(riskId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskDetailsHistory history : dbList) {
                history.setActive(1);
                this.riskDetailsHistoryRepository.save(history);
            }
        }
    }
}

