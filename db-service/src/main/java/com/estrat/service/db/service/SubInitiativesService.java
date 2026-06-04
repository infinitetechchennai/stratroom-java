/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Initiatives
 *  com.estrat.service.db.bean.po.InitiativesTracker
 *  com.estrat.service.db.bean.po.SubInitiatives
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.SubInitiativesMapRepository
 *  com.estrat.service.db.dao.SubInitiativesRepository
 *  com.estrat.service.db.dto.InitiativeResponseDTO
 *  com.estrat.service.db.dto.InitiativesDTO
 *  com.estrat.service.db.dto.SubInitiativesDTO
 *  com.estrat.service.db.repository.InitiativeTrackerRepository
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.InitiativesService
 *  com.estrat.service.db.service.SubInitiativesMapService
 *  com.estrat.service.db.service.SubInitiativesService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.Initiatives;
import com.estrat.service.db.bean.po.InitiativesTracker;
import com.estrat.service.db.bean.po.SubInitiatives;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.SubInitiativesMapRepository;
import com.estrat.service.db.dao.SubInitiativesRepository;
import com.estrat.service.db.dto.InitiativeResponseDTO;
import com.estrat.service.db.dto.InitiativesDTO;
import com.estrat.service.db.dto.SubInitiativesDTO;
import com.estrat.service.db.repository.InitiativeTrackerRepository;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.InitiativesService;
import com.estrat.service.db.service.SubInitiativesMapService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class SubInitiativesService {
    @Autowired
    protected SubInitiativesRepository subInitiativesRepository;
    @Autowired
    protected SubInitiativesMapRepository subInitiativesMapRepository;
    @Autowired
    protected InitiativeTrackerRepository initiativeTrackerRepository;
    @Autowired
    protected InitiativesService initiativesService;
    @Autowired
    protected SubInitiativesMapService subInitiativesMapService;
    @Autowired
    private DBCache dbCache;
    private Logger log = Logger.getLogger(SubInitiativesService.class);

    public Optional<SubInitiatives> findById(long id) {
        return this.subInitiativesRepository.findById(id);
    }

    public InitiativeResponseDTO save(SubInitiatives subInitiatives, String multipleOwner) {
        SubInitiatives subInitiatives1 = (SubInitiatives)this.subInitiativesRepository.save(subInitiatives);
        Optional initiatives = this.initiativesService.findById(subInitiatives.getInitiativeId());
        if (initiatives != null && initiatives.isPresent()) {
            InitiativesDTO initiativesDTO = new InitiativesDTO((Initiatives)initiatives.get(), true);
            int progressval = 0;
            if (initiativesDTO != null) {
                for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                    if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                    Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                    Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                    if (subprogress <= 0) continue;
                    progressval += contribution * subprogress / 100;
                }
                if (progressval > 0) {
                    LocalDate now = LocalDate.now();
                    LocalDateTime startOfMonth = LocalDateTime.of(now.withDayOfMonth(1), LocalTime.MIN);
                    LocalDateTime endOfMonth = LocalDateTime.of(now.withDayOfMonth(now.lengthOfMonth()), LocalTime.MAX);
                    List initiativesTracker_list = this.initiativeTrackerRepository.findByInitiativeIdbtwDate(String.valueOf(initiativesDTO.getId()), Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), startOfMonth, endOfMonth);
                    if (initiativesTracker_list != null && initiativesTracker_list.size() > 0) {
                        InitiativesTracker initiativesTracker = (InitiativesTracker)initiativesTracker_list.get(0);
                        initiativesTracker.setActual(String.valueOf(progressval));
                        this.initiativeTrackerRepository.save(initiativesTracker);
                    } else {
                        InitiativesTracker initiativesTracker = new InitiativesTracker();
                        initiativesTracker.setActual(String.valueOf(progressval));
                        initiativesTracker.setTarget(String.valueOf(0));
                        initiativesTracker.setEnd_date(LocalDateTime.now());
                        initiativesTracker.setInitiative_id(String.valueOf(initiativesDTO.getId()));
                        initiativesTracker.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")));
                        initiativesTracker.setCreated_dt(LocalDateTime.now());
                        this.initiativeTrackerRepository.save(initiativesTracker);
                    }
                }
            }
        }
        InitiativeResponseDTO responseDTO = new InitiativeResponseDTO();
        responseDTO.setFlag(true);
        responseDTO.setSubInitiativesDTO(new SubInitiativesDTO(subInitiatives1));
        return responseDTO;
    }

    public InitiativeResponseDTO saveDelete(SubInitiatives subInitiatives) {
        subInitiatives.getSubInitiativesMaps();
        this.subInitiativesRepository.delete((Object)subInitiatives);
        InitiativeResponseDTO responseDTO = new InitiativeResponseDTO();
        responseDTO.setFlag(true);
        responseDTO.setSubInitiativesDTO(new SubInitiativesDTO(subInitiatives));
        return responseDTO;
    }

    public List<SubInitiativesDTO> findAllByInitiativesId(Long initiativesId) {
        List dbList = this.subInitiativesRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new SubInitiativesDTO(dbValue)).collect(Collectors.toList());
    }

    public Set<SubInitiativesDTO> findAll(long empId) {
        String cacheKey = String.join((CharSequence)"_", String.valueOf(empId), "subInitiativesList");
        if (this.dbCache.get((Object)cacheKey, "dbCache") != null) {
            this.log.debug((Object)"subInitiativesList list returned from cache");
            Set ownerList = (Set)this.dbCache.get((Object)cacheKey, "dbCache");
            if (CollectionUtils.isNotEmpty((Collection)ownerList)) {
                return ownerList;
            }
        }
        List dbList = this.subInitiativesMapRepository.findAllByOwnerId(Long.valueOf(empId));
        Set<SubInitiativesDTO> subInitiativesList = dbList.stream().map(dbValue -> {
            SubInitiativesDTO subInitiativesDTO = new SubInitiativesDTO(dbValue.getSubInitiativeId());
            return subInitiativesDTO;
        }).collect(Collectors.toSet());
        this.log.debug((Object)"subInitiativesList list populated into cache");
        this.dbCache.put((Object)cacheKey, subInitiativesList, "dbCache");
        return subInitiativesList;
    }

    public List<SubInitiativesDTO> findAllByEmpId(Long empId) {
        List dbList = this.subInitiativesRepository.findAllByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new SubInitiativesDTO(dbValue)).collect(Collectors.toList());
    }
}

