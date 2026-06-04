/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.MasterValue
 *  com.estrat.service.db.dao.MasterRepository
 *  com.estrat.service.db.dao.MasterValueRepository
 *  com.estrat.service.db.dto.MasterValueDto
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.service.MasterValueService
 *  javax.transaction.Transactional
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.DepartmentDetails;
import com.estrat.service.db.bean.po.MasterValue;
import com.estrat.service.db.dao.MasterRepository;
import com.estrat.service.db.dao.MasterValueRepository;
import com.estrat.service.db.dto.MasterValueDto;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class MasterValueService {
    @Autowired
    MasterValueRepository masterValueRepository;
    @Autowired
    DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    MasterRepository masterRepository;

    public MasterValueDto saveMasterValue(MasterValue masterValue) {
        MasterValue mvalue = (MasterValue)this.masterValueRepository.save(masterValue);
        MasterValueDto saveMasterValue = new MasterValueDto(mvalue);
        return saveMasterValue;
    }

    public List<MasterValue> findAllMasterValue() {
        List masterList = this.masterValueRepository.findAll();
        return masterList;
    }

    public Optional<MasterValue> findMasterById(long id) {
        return this.masterValueRepository.findById(id);
    }

    public void delete(MasterValue mastervalue) {
        this.masterValueRepository.delete((Object)mastervalue);
    }

    public List<MasterValueDto> findAllByType(String type) {
        List types = this.masterValueRepository.findAllByType(type);
        List<MasterValueDto> masterValueList = types.stream().map(typelist -> {
            MasterValueDto mastervalueDto = new MasterValueDto(typelist);
            if (mastervalueDto.getDepartment() != 0L) {
                mastervalueDto.setDepartmentName(((DepartmentDetails)this.departmentDetailsRepository.findById(mastervalueDto.getDepartment()).get()).getName());
            }
            return mastervalueDto;
        }).collect(Collectors.toList());
        return masterValueList;
    }
}

