/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.MasterValue
 *  com.estrat.backend.db.dao.MasterRepository
 *  com.estrat.backend.db.dao.MasterValueRepository
 *  com.estrat.backend.db.dto.MasterValueDto
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.service.MasterValueService
 *  javax.transaction.Transactional
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.MasterValue;
import com.estrat.backend.db.dao.MasterRepository;
import com.estrat.backend.db.dao.MasterValueRepository;
import com.estrat.backend.db.dto.MasterValueDto;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
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
        MasterValue mvalue = this.masterValueRepository.save(masterValue);
        MasterValueDto saveMasterValue = new MasterValueDto(mvalue);
        return saveMasterValue;
    }

    public List<MasterValue> findAllMasterValue() {
        List<MasterValue> masterList = this.masterValueRepository.findAll();
        return masterList;
    }

    public Optional<MasterValue> findMasterById(long id) {
        return this.masterValueRepository.findById(id);
    }

    public void delete(MasterValue mastervalue) {
        this.masterValueRepository.delete(mastervalue);
    }

    public List<MasterValueDto> findAllByType(String type) {
        List<MasterValue> types = this.masterValueRepository.findAllByType(type);
        List<MasterValueDto> masterValueList = types.stream().map(typelist -> {
            MasterValueDto mastervalueDto = new MasterValueDto(typelist);
            if (mastervalueDto.getDepartment() != 0L) {
                mastervalueDto.setDepartmentName(this.departmentDetailsRepository.findById(mastervalueDto.getDepartment()).get().getName());
            }
            return mastervalueDto;
        }).collect(Collectors.toList());
        return masterValueList;
    }
}

