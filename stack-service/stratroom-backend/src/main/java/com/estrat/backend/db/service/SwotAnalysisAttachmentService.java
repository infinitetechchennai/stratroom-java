/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.backend.db.dao.SwotAnalysisAttachmentRepository
 *  com.estrat.backend.db.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.backend.db.service.SwotAnalysisAttachmentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.SWOTAnalysisAttachment;
import com.estrat.backend.db.dao.SwotAnalysisAttachmentRepository;
import com.estrat.backend.db.dto.SWOTAnalysisAttachmentDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SwotAnalysisAttachmentService {
    private Logger log = LoggerFactory.getLogger(SwotAnalysisAttachmentService.class);
    @Autowired
    protected SwotAnalysisAttachmentRepository attachmentRepository;

    public Optional<SWOTAnalysisAttachment> findById(long id) {
        return this.attachmentRepository.findById(id);
    }

    public SWOTAnalysisAttachmentDTO save(SWOTAnalysisAttachment swotAnalysisAttachment) {
        SWOTAnalysisAttachment swotAnalysisResponse = (SWOTAnalysisAttachment)this.attachmentRepository.save(swotAnalysisAttachment);
        SWOTAnalysisAttachmentDTO response = new SWOTAnalysisAttachmentDTO(swotAnalysisResponse);
        return response;
    }

    public void delete(SWOTAnalysisAttachment swotAnalysisAttachment) {
        this.attachmentRepository.delete(swotAnalysisAttachment);
    }

    public List<SWOTAnalysisAttachmentDTO> findAll(long swotAnalysisId) {
        List<SWOTAnalysisAttachment> dbList = this.attachmentRepository.findAllBySwotId(Long.valueOf(swotAnalysisId));
        List<SWOTAnalysisAttachmentDTO> response = dbList.stream().map(dbValue -> new SWOTAnalysisAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }
}

