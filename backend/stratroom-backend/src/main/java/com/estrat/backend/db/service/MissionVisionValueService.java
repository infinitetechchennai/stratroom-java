/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MissionVisionValue
 *  com.estrat.backend.db.dao.MissionVisionValueRepository
 *  com.estrat.backend.db.dto.MissionVisionValueDto
 *  com.estrat.backend.db.service.MissionVisionValueService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.MissionVisionValue;
import com.estrat.backend.db.dao.MissionVisionValueRepository;
import com.estrat.backend.db.dto.MissionVisionValueDto;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MissionVisionValueService {
    @Autowired
    protected MissionVisionValueRepository landingPageMVVRepository;

    public Optional<MissionVisionValue> findById(long id) {
        return this.landingPageMVVRepository.findById(id);
    }

    public void delete(MissionVisionValue misionVisionValue) {
        this.landingPageMVVRepository.delete(misionVisionValue);
    }

    public MissionVisionValueDto save(MissionVisionValue missionVisionValue) {
        MissionVisionValue response = (MissionVisionValue)this.landingPageMVVRepository.save(missionVisionValue);
        MissionVisionValueDto landingPageMVVDto = new MissionVisionValueDto(response);
        return landingPageMVVDto;
    }

    public List<MissionVisionValueDto> findAll(long empId) {
        List<MissionVisionValue> dbList = this.landingPageMVVRepository.findAllByEmpId(Long.valueOf(empId));
        List<MissionVisionValueDto> riskList = dbList.stream().map(dbValue -> new MissionVisionValueDto(dbValue)).collect(Collectors.toList());
        return riskList;
    }
}

