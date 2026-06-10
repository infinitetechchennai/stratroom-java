/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Master
 *  com.estrat.service.db.bean.po.Status
 *  com.estrat.service.db.dao.MasterRepository
 *  com.estrat.service.db.dto.MasterDto
 *  com.estrat.service.db.service.MasterService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.Master;
import com.estrat.service.db.bean.po.Status;
import com.estrat.service.db.dao.MasterRepository;
import com.estrat.service.db.dto.MasterDto;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MasterService {
    @Autowired
    MasterRepository masterRepository;

    public ResponseEntity<?> saveMaster(MasterDto masterDto) {
        Master master = new Master(masterDto);
        Optional dublicateMaster = this.masterRepository.findByMasterName(masterDto.getMasterName());
        if (dublicateMaster.isPresent()) {
            return new ResponseEntity((Object)new Status(401, masterDto.getMasterName() + " This Master Name is Already Presend "), HttpStatus.ALREADY_REPORTED);
        }
        master.setCreatedDate(LocalDate.now());
        this.masterRepository.save(master);
        return new ResponseEntity((Object)new Status(200, " Created Sucessfully "), HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> fetchByMasterId(long masterId) {
        Optional getMaster = this.masterRepository.findById(masterId);
        if (getMaster.isPresent()) {
            return ResponseEntity.ok((Object)getMaster);
        }
        return new ResponseEntity((Object)new Status(200, "This Master is Not Presend"), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> updateStatus(MasterDto masterDto) {
        Optional updateMaster = this.masterRepository.findById(masterDto.getId());
        Master newMaster = new Master(masterDto);
        if (updateMaster.isPresent()) {
            newMaster.setCreatedDate(((Master)updateMaster.get()).getCreatedDate());
            newMaster.setUpdateDate(LocalDate.now());
            this.masterRepository.save(newMaster);
            return new ResponseEntity((Object)new Status(200, "Updated sucessfully "), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity((Object)new Status(200, "This Master is Not Presend"), HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> deleteByMaster(long id) {
        this.masterRepository.deleteById((Object)id);
        return new ResponseEntity((Object)new Status(200, "Deleted sucessfully "), HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> findByMasterNameAndDepartMent(String masterName, String departMent) {
        return ResponseEntity.ok((Object)this.masterRepository.findByMasterNameAndDepartMent(masterName, departMent));
    }
}

