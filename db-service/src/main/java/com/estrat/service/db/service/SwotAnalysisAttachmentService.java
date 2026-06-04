/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.service.db.dao.SwotAnalysisAttachmentRepository
 *  com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.service.db.service.SwotAnalysisAttachmentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.SWOTAnalysisAttachment;
import com.estrat.service.db.dao.SwotAnalysisAttachmentRepository;
import com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SwotAnalysisAttachmentService {
    private Logger log = Logger.getLogger(SwotAnalysisAttachmentService.class);
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
        this.attachmentRepository.delete((Object)swotAnalysisAttachment);
    }

    public List<SWOTAnalysisAttachmentDTO> findAll(long swotAnalysisId) {
        List dbList = this.attachmentRepository.findAllBySwotId(Long.valueOf(swotAnalysisId));
        List<SWOTAnalysisAttachmentDTO> response = dbList.stream().map(dbValue -> new SWOTAnalysisAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }
}

