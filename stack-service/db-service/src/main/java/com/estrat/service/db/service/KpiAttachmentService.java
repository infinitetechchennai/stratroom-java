/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KpiDetailsAttachments
 *  com.estrat.service.db.dao.KpiDetailsAttachmentsRepository
 *  com.estrat.service.db.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.service.db.service.KpiAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.KpiDetailsAttachments;
import com.estrat.service.db.dao.KpiDetailsAttachmentsRepository;
import com.estrat.service.db.dto.KpiDetailsAttachmentsDTO;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KpiAttachmentService {
    @Autowired
    protected KpiDetailsAttachmentsRepository kpiDetailsAttachmentsRepository;

    public Optional<KpiDetailsAttachments> findById(long id) {
        return this.kpiDetailsAttachmentsRepository.findById(id);
    }

    public KpiDetailsAttachmentsDTO save(KpiDetailsAttachments kpiAttachment) {
        KpiDetailsAttachments kpiResponse = (KpiDetailsAttachments)this.kpiDetailsAttachmentsRepository.save(kpiAttachment);
        KpiDetailsAttachmentsDTO response = new KpiDetailsAttachmentsDTO(kpiResponse);
        return response;
    }

    public void delete(KpiDetailsAttachments kpiAttachment) {
        this.kpiDetailsAttachmentsRepository.delete((Object)kpiAttachment);
    }
}

