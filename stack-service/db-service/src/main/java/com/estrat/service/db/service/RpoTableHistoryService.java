/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RpoTableHistory
 *  com.estrat.service.db.dao.RpoTableHistoryRepository
 *  com.estrat.service.db.service.RpoTableHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RpoTableHistory;
import com.estrat.service.db.dao.RpoTableHistoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RpoTableHistoryService {
    @Autowired
    private RpoTableHistoryRepository rpoTableHistoryRepository;

    public void save(RpoTableHistory rpoTableHistory) {
        this.rpoTableHistoryRepository.save(rpoTableHistory);
    }

    public List<RpoTableHistory> findAllByIDs(Long posId) {
        List dbList = this.rpoTableHistoryRepository.findAllByRpoId(posId);
        return dbList;
    }

    public Optional<RpoTableHistory> findAllByversion(Long posId, Long version) {
        Optional dbList = this.rpoTableHistoryRepository.findByRpoIdAndVersion(posId, version);
        return dbList;
    }
}

