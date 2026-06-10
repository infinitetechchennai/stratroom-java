/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskAttachment
 *  com.estrat.backend.db.dao.RiskAttachmentRepository
 *  com.estrat.backend.db.dto.RiskAttachmentDto
 *  com.estrat.backend.db.service.RiskAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.RiskAttachment;
import com.estrat.backend.db.dao.RiskAttachmentRepository;
import com.estrat.backend.db.dto.RiskAttachmentDto;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskAttachmentService {
    @Autowired
    protected RiskAttachmentRepository riskAttachmentRepository;

    public Optional<RiskAttachment> findById(long id) {
        return this.riskAttachmentRepository.findById(id);
    }

    public RiskAttachmentDto save(RiskAttachment riskAttachment) {
        RiskAttachment riskResponse = (RiskAttachment)this.riskAttachmentRepository.save(riskAttachment);
        RiskAttachmentDto response = new RiskAttachmentDto(riskResponse);
        return response;
    }

    public void delete(RiskAttachment riskAttachment) {
        this.riskAttachmentRepository.delete(riskAttachment);
    }

    public List<RiskAttachmentDto> findAllByRiskId(long riskId) {
        List<RiskAttachment> dbList = this.riskAttachmentRepository.findAllByRiskId(Long.valueOf(riskId));
        List<RiskAttachmentDto> response = dbList.stream().map(dbValue -> new RiskAttachmentDto(dbValue)).collect(Collectors.toList());
        return response;
    }

    public List<RiskAttachmentDto> findAllByEmpId(Long empId) {
        List<RiskAttachment> dbList = this.riskAttachmentRepository.findAllByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new RiskAttachmentDto(dbValue)).collect(Collectors.toList());
    }
}

