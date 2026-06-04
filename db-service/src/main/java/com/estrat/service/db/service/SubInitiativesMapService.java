/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubInitiatives
 *  com.estrat.service.db.bean.po.SubInitiativesMap
 *  com.estrat.service.db.dao.SubInitiativesMapRepository
 *  com.estrat.service.db.dto.SubInitiativesMapDTO
 *  com.estrat.service.db.service.SubInitiativesMapService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.SubInitiatives;
import com.estrat.service.db.bean.po.SubInitiativesMap;
import com.estrat.service.db.dao.SubInitiativesMapRepository;
import com.estrat.service.db.dto.SubInitiativesMapDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubInitiativesMapService {
    @Autowired
    protected SubInitiativesMapRepository subInitiativesMapRepository;

    public Optional<SubInitiativesMap> findById(long id) {
        return this.subInitiativesMapRepository.findById(id);
    }

    public SubInitiativesMapDTO save(SubInitiativesMapDTO subInitiativesMapDTO) {
        subInitiativesMapDTO.setCreatedTime(LocalDateTime.now());
        SubInitiatives subInitiatives = new SubInitiatives();
        subInitiatives.setId(subInitiativesMapDTO.getSubInitiativeId());
        SubInitiativesMap subInitiativesMap = (SubInitiativesMap)this.subInitiativesMapRepository.save(new SubInitiativesMap(subInitiatives, subInitiativesMapDTO.getEmpId()));
        SubInitiativesMapDTO sDto = new SubInitiativesMapDTO(subInitiativesMap);
        return sDto;
    }

    public void saveDeleteMultipleOwner(Long subInitiativesId) {
        List subInitiativesMapList = this.subInitiativesMapRepository.findAllBySubInitiativesId(subInitiativesId);
        if (subInitiativesMapList != null) {
            for (SubInitiativesMap subInitiativesMap : subInitiativesMapList) {
                this.subInitiativesMapRepository.delete((Object)subInitiativesMap);
            }
        }
    }

    public List<SubInitiativesMapDTO> findAllBySubInitiativesId(Long subInitiativesId) {
        List dbList = this.subInitiativesMapRepository.findAllBySubInitiativesId(subInitiativesId);
        return dbList.stream().map(dbValue -> new SubInitiativesMapDTO(dbValue)).collect(Collectors.toList());
    }
}

