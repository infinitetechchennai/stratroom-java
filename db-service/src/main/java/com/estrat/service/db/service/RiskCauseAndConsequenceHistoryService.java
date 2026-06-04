/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory
 *  com.estrat.service.db.bean.po.RiskConsequenceDetailsHistory
 *  com.estrat.service.db.dao.RiskCauseAndConsequenceHistoryRepository
 *  com.estrat.service.db.dao.RiskConsequenceHistoryRepository
 *  com.estrat.service.db.service.RiskCauseAndConsequenceHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory;
import com.estrat.service.db.bean.po.RiskConsequenceDetailsHistory;
import com.estrat.service.db.dao.RiskCauseAndConsequenceHistoryRepository;
import com.estrat.service.db.dao.RiskConsequenceHistoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskCauseAndConsequenceHistoryService {
    @Autowired
    protected RiskCauseAndConsequenceHistoryRepository historyRepository;
    @Autowired
    protected RiskConsequenceHistoryRepository historyConqRepository;

    public void save(RiskCauseAndConsequenceHistory history) {
        this.historyRepository.save(history);
    }

    public void save(RiskConsequenceDetailsHistory history) {
        this.historyConqRepository.save(history);
    }

    public void deleteHistor(Long causeId) {
        List dbList = this.historyRepository.findAllBycauseId(causeId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskCauseAndConsequenceHistory history : dbList) {
                history.setActive(1);
                this.historyRepository.save(history);
            }
        }
    }

    public void deleteConsequHistor(Long conseId) {
        List dbList = this.historyConqRepository.findAllByconcequId(conseId);
        if (dbList != null && !dbList.isEmpty()) {
            for (RiskConsequenceDetailsHistory history : dbList) {
                history.setActive(1);
                this.historyConqRepository.save(history);
            }
        }
    }
}

