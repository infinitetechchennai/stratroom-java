/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Milestones
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.MilestonesRepository
 *  com.estrat.backend.db.dto.MilestonesDTO
 *  com.estrat.backend.db.service.MilestonesService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.Milestones;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.MilestonesRepository;
import com.estrat.backend.db.dto.MilestonesDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MilestonesService {
    @Autowired
    protected MilestonesRepository milestonesRepository;
    @Autowired
    private DBCache dbCache;
    private Logger log = LoggerFactory.getLogger(MilestonesService.class);

    public Optional<Milestones> findById(long id) {
        return this.milestonesRepository.findById(id);
    }

    public MilestonesDTO save(Milestones milestones) {
        return new MilestonesDTO(this.milestonesRepository.save(milestones));
    }

    public void delete(Milestones milestones) {
        this.milestonesRepository.delete(milestones);
    }

    public List<MilestonesDTO> findAllByInitiativesId(Long initiativesId) {
        List<Milestones> dbList = this.milestonesRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new MilestonesDTO(dbValue)).collect(Collectors.toList());
    }

    public List<MilestonesDTO> findAll(long empId) {
        String cacheKey = String.join((CharSequence)"_", String.valueOf(empId), "milestonesList");
        if (this.dbCache.get(cacheKey, "dbCache") != null) {
            this.log.debug("milestonesList list returned from cache");
            return (List<MilestonesDTO>)this.dbCache.get(cacheKey, "dbCache");
        }
        List<Milestones> dbList = this.milestonesRepository.findAllByEmpIds(Long.valueOf(empId), 0);
        List<MilestonesDTO> mileStonesList = dbList.stream().map(dbValue -> {
            MilestonesDTO milestonesDTO = new MilestonesDTO(dbValue);
            return milestonesDTO;
        }).collect(Collectors.toList());
        this.log.debug("milestonesList list populated into cache");
        this.dbCache.put(cacheKey, mileStonesList, "dbCache");
        return mileStonesList;
    }
}

