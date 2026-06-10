/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.StrategyMap
 *  com.estrat.backend.db.dao.ScoreCardDetailsRepository
 *  com.estrat.backend.db.dao.StrategyMapRepository
 *  com.estrat.backend.db.dto.StrategyMapDto
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.resource.ScoreCardController
 *  com.estrat.backend.db.service.StrategyMapService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.StrategyMap;
import com.estrat.backend.db.dao.ScoreCardDetailsRepository;
import com.estrat.backend.db.dao.StrategyMapRepository;
import com.estrat.backend.db.dto.StrategyMapDto;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.resource.ScoreCardController;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StrategyMapService {
    @Autowired
    protected StrategyMapRepository strategyMapRepo;
    @Autowired
    protected DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    protected ScoreCardDetailsRepository scorecardDetailsRepo;
    protected ScoreCardController scoreCardController;

    public StrategyMapDto findById(Long id) {
        StrategyMap strategyMap = this.strategyMapRepo.findAllByPageId(id.longValue());
        if (strategyMap != null) {
            StrategyMapDto strategyMapDto = new StrategyMapDto(strategyMap);
            return strategyMapDto;
        }
        return new StrategyMapDto();
    }

    public StrategyMapDto save(StrategyMap strategyMap) {
        strategyMap.setUpdateAt(LocalDateTime.now());
        StrategyMap existence = this.strategyMapRepo.findAllByPageId(strategyMap.getPageId().getId());
        if (existence != null) {
            strategyMap.setId(existence.getId());
            StrategyMap strategyMapResponse = (StrategyMap)this.strategyMapRepo.save(strategyMap);
            StrategyMapDto StrategyMapDTO = new StrategyMapDto(strategyMapResponse);
            return StrategyMapDTO;
        }
        StrategyMap strategyMapResponse = (StrategyMap)this.strategyMapRepo.save(strategyMap);
        StrategyMapDto StrategyMapDTO = new StrategyMapDto(strategyMapResponse);
        return StrategyMapDTO;
    }
}

