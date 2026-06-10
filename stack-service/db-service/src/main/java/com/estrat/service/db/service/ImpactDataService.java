/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ImpactData
 *  com.estrat.service.db.dao.ImpactDataRepository
 *  com.estrat.service.db.dto.ImpactDataDto
 *  com.estrat.service.db.service.ImpactDataService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ImpactData;
import com.estrat.service.db.dao.ImpactDataRepository;
import com.estrat.service.db.dto.ImpactDataDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpactDataService {
    @Autowired
    private ImpactDataRepository impactDataRepository;

    public ImpactDataDto save(ImpactData impactData) {
        ImpactData impactDatavalue = (ImpactData)this.impactDataRepository.save(impactData);
        ImpactDataDto impactDataDto = new ImpactDataDto(impactDatavalue);
        return impactDataDto;
    }

    public Optional<ImpactData> findImpactDataById(long id) {
        return this.impactDataRepository.findById(id);
    }

    public List<ImpactDataDto> findAllImpactData() {
        ArrayList<ImpactDataDto> impactList = new ArrayList<ImpactDataDto>();
        List impactTableList = this.impactDataRepository.findAll();
        for (ImpactData impactData : impactTableList) {
            ImpactDataDto impDto = new ImpactDataDto(impactData);
            impactList.add(impDto);
        }
        return impactList;
    }
}

