/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PestelAnalysisAttachment
 *  com.estrat.service.db.dao.PestelAnalysisAttachmentRepository
 *  com.estrat.service.db.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.service.db.service.PestelAnalysisAttachmentService
 *  com.estrat.service.db.service.SwotAnalysisAttachmentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.PestelAnalysisAttachment;
import com.estrat.service.db.dao.PestelAnalysisAttachmentRepository;
import com.estrat.service.db.dto.PestelAnalysisAttachmentDTO;
import com.estrat.service.db.service.SwotAnalysisAttachmentService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PestelAnalysisAttachmentService {
    private Logger log = Logger.getLogger(SwotAnalysisAttachmentService.class);
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
        this.attachmentRepository.delete((Object)pestelAnalysisAttachment);
    }

    public List<PestelAnalysisAttachmentDTO> findAll(long swotAnalysisId) {
        List dbList = this.attachmentRepository.findAllByPestelId(Long.valueOf(swotAnalysisId));
        List<PestelAnalysisAttachmentDTO> response = dbList.stream().map(dbValue -> new PestelAnalysisAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }
}

