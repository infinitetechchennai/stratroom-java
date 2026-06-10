/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.dao.ComplianceDetailsAttachmentRepository
 *  com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.service.db.service.ComplianceDetailsAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.service.db.dao.ComplianceDetailsAttachmentRepository;
import com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplianceDetailsAttachmentService {
    @Autowired
    protected ComplianceDetailsAttachmentRepository complianceDetailsAttachmentRepository;

    public Optional<ComplianceDetailsAttachment> findById(long id) {
        return this.complianceDetailsAttachmentRepository.findById(id);
    }

    public ComplianceDetailsAttachmentDTO save(ComplianceDetailsAttachment complianceDetailsAttachment) {
        ComplianceDetailsAttachment kpiResponse = (ComplianceDetailsAttachment)this.complianceDetailsAttachmentRepository.save(complianceDetailsAttachment);
        ComplianceDetailsAttachmentDTO response = new ComplianceDetailsAttachmentDTO(kpiResponse);
        return response;
    }

    public void delete(ComplianceDetailsAttachment complianceDetailsAttachment) {
        this.complianceDetailsAttachmentRepository.delete((Object)complianceDetailsAttachment);
    }
}

