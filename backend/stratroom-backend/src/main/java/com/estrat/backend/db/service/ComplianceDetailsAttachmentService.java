/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.backend.db.dao.ComplianceDetailsAttachmentRepository
 *  com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.backend.db.service.ComplianceDetailsAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.backend.db.dao.ComplianceDetailsAttachmentRepository;
import com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO;
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
        this.complianceDetailsAttachmentRepository.delete(complianceDetailsAttachment);
    }
}

