/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PestelAnalysisAttachment
 *  com.estrat.backend.db.dao.PestelAnalysisAttachmentRepository
 *  com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.backend.db.service.PestelAnalysisAttachmentService
 *  com.estrat.backend.db.service.SwotAnalysisAttachmentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.PestelAnalysisAttachment;
import com.estrat.backend.db.dao.PestelAnalysisAttachmentRepository;
import com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO;
import com.estrat.backend.db.service.SwotAnalysisAttachmentService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PestelAnalysisAttachmentService {
    private Logger log = LoggerFactory.getLogger(SwotAnalysisAttachmentService.class);
    @Autowired
    protected PestelAnalysisAttachmentRepository attachmentRepository;

    public Optional<PestelAnalysisAttachment> findById(long id) {
        return this.attachmentRepository.findById(id);
    }

    public PestelAnalysisAttachmentDTO save(PestelAnalysisAttachment pestelAnalysisAttachment) {
        PestelAnalysisAttachment pestelAnalysisAttachment1 = (PestelAnalysisAttachment)this.attachmentRepository.save(pestelAnalysisAttachment);
        PestelAnalysisAttachmentDTO response = new PestelAnalysisAttachmentDTO(pestelAnalysisAttachment1);
        return response;
    }

    public void delete(PestelAnalysisAttachment pestelAnalysisAttachment) {
        this.attachmentRepository.delete(pestelAnalysisAttachment);
    }

    public List<PestelAnalysisAttachmentDTO> findAll(long swotAnalysisId) {
        List<PestelAnalysisAttachment> dbList = this.attachmentRepository.findAllByPestelId(Long.valueOf(swotAnalysisId));
        List<PestelAnalysisAttachmentDTO> response = dbList.stream().map(dbValue -> new PestelAnalysisAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }
}

