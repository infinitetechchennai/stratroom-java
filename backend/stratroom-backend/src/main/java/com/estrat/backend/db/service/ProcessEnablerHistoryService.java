/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ProcessEnablerHistory
 *  com.estrat.backend.db.dao.ProcessEnablerHistoryRepository
 *  com.estrat.backend.db.service.ProcessEnablerHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ProcessEnablerHistory;
import com.estrat.backend.db.dao.ProcessEnablerHistoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessEnablerHistoryService {
    @Autowired
    private ProcessEnablerHistoryRepository processEnablerHistoryRepository;

    public void save(ProcessEnablerHistory processEnablerHistory) {
        this.processEnablerHistoryRepository.save(processEnablerHistory);
    }

    public List<ProcessEnablerHistory> findAllByIDs(Long posId) {
        List dbList = this.processEnablerHistoryRepository.findAllByPOSId(posId);
        return dbList;
    }

    public Optional<ProcessEnablerHistory> findAllByversion(Long posId, Long version) {
        Optional dbList = this.processEnablerHistoryRepository.findByPosIdAndVersion(posId, version);
        return dbList;
    }
}

