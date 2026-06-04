/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Milestones
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.MilestonesRepository
 *  com.estrat.service.db.dto.MilestonesDTO
 *  com.estrat.service.db.service.MilestonesService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.Milestones;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.MilestonesRepository;
import com.estrat.service.db.dto.MilestonesDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MilestonesService {
    @Autowired
    protected MilestonesRepository milestonesRepository;
    @Autowired
    private DBCache dbCache;
    private Logger log = Logger.getLogger(MilestonesService.class);

    public Optional<Milestones> findById(long id) {
        return this.milestonesRepository.findById(id);
    }

    public MilestonesDTO save(Milestones milestones) {
        return new MilestonesDTO((Milestones)this.milestonesRepository.save(milestones));
    }

    public void delete(Milestones milestones) {
        this.milestonesRepository.delete((Object)milestones);
    }

    public List<MilestonesDTO> findAllByInitiativesId(Long initiativesId) {
        List dbList = this.milestonesRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new MilestonesDTO(dbValue)).collect(Collectors.toList());
    }

    public List<MilestonesDTO> findAll(long empId) {
        String cacheKey = String.join((CharSequence)"_", String.valueOf(empId), "milestonesList");
        if (this.dbCache.get((Object)cacheKey, "dbCache") != null) {
            this.log.debug((Object)"milestonesList list returned from cache");
            return (List)this.dbCache.get((Object)cacheKey, "dbCache");
        }
        List dbList = this.milestonesRepository.findAllByEmpIds(Long.valueOf(empId), 0);
        List<MilestonesDTO> mileStonesList = dbList.stream().map(dbValue -> {
            MilestonesDTO milestonesDTO = new MilestonesDTO(dbValue);
            return milestonesDTO;
        }).collect(Collectors.toList());
        this.log.debug((Object)"milestonesList list populated into cache");
        this.dbCache.put((Object)cacheKey, mileStonesList, "dbCache");
        return mileStonesList;
    }
}

