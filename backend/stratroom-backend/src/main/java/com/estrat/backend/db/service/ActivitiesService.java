/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.ActivitiesAndTasksRepository
 *  com.estrat.backend.db.dao.ActivitiesMapRepository
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.service.ActivitiesMapService
 *  com.estrat.backend.db.service.ActivitiesService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.bean.po.ActivitiesMap;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.ActivitiesAndTasksRepository;
import com.estrat.backend.db.dao.ActivitiesMapRepository;
import com.estrat.backend.db.dto.ActivitiesDTO;
import com.estrat.backend.db.service.ActivitiesMapService;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class ActivitiesService {
    @Autowired
    protected ActivitiesAndTasksRepository activitiesAndTasksRepository;
    @Autowired
    protected ActivitiesMapRepository activitiesMapRepository;
    @Autowired
    protected ActivitiesMapService activitiesMapService;
    @Autowired
    private DBCache dbCache;
    private Logger log = Logger.getLogger(ActivitiesService.class);

    public Optional<ActivitiesDetails> findById(long id) {
        return this.activitiesAndTasksRepository.findById(id);
    }

    public ActivitiesDTO findByActivitiesId(long id) {
        ActivitiesDTO activitiesAndTasksDTO = new ActivitiesDTO((ActivitiesDetails)this.activitiesAndTasksRepository.getOne(id));
        return activitiesAndTasksDTO;
    }

    public ActivitiesDTO save(ActivitiesDetails activitiesAndTasks, String multipleOwner) {
        ActivitiesDetails activitiesAndTasks1 = (ActivitiesDetails)this.activitiesAndTasksRepository.save(activitiesAndTasks);
        return new ActivitiesDTO(activitiesAndTasks1);
    }

    public ActivitiesDTO saveDelete(ActivitiesDetails activitiesAndTasks) {
        activitiesAndTasks.getActivitiesMaps();
        this.activitiesAndTasksRepository.delete(activitiesAndTasks);
        return new ActivitiesDTO(activitiesAndTasks);
    }

    public List<ActivitiesDTO> findAllByInitiativesId(Long initiativesId) {
        List<ActivitiesDetails> dbList = this.activitiesAndTasksRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new ActivitiesDTO(dbValue)).collect(Collectors.toList());
    }

    public List<ActivitiesDTO> findAllBySubInitiativesId(Long initiativesId) {
        List<ActivitiesDetails> dbList = this.activitiesAndTasksRepository.findAllBySubInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new ActivitiesDTO(dbValue)).collect(Collectors.toList());
    }

    public Set<ActivitiesDTO> findAll(long empId) {
        String cacheKey = String.join((CharSequence)"_", String.valueOf(empId), "activitiesList");
        if (this.dbCache.get((Object)cacheKey, "dbCache") != null) {
            this.log.debug((Object)"activitiesList  returned from cache");
            Set ownerList = (Set)this.dbCache.get((Object)cacheKey, "dbCache");
            if (CollectionUtils.isNotEmpty((Collection)ownerList)) {
                return ownerList;
            }
        }
        List<ActivitiesMap> dbList = this.activitiesMapRepository.findAllByOwnerId(Long.valueOf(empId));
        Set<ActivitiesDTO> activitiesList = dbList.stream().map(dbValue -> {
            ActivitiesDTO activitiesDTO = new ActivitiesDTO(dbValue.getActivitiesId());
            return activitiesDTO;
        }).collect(Collectors.toSet());
        this.log.debug((Object)"activitiesList  populated into cache");
        this.dbCache.put((Object)cacheKey, activitiesList, "dbCache");
        return activitiesList;
    }

    public List<ActivitiesDTO> findByEmpId(Long empId) {
        List<ActivitiesDetails> dbList = this.activitiesAndTasksRepository.findByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new ActivitiesDTO(dbValue)).collect(Collectors.toList());
    }
}

