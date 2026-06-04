/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.web.service.KpiAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.KpiDetailsAttachmentsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KpiAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public KpiDetailsAttachmentsDTO save(KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO) {
        return (KpiDetailsAttachmentsDTO)this.commonRestTemplate.postForObject("kpiAttach", kpiDetailsAttachmentsDTO, KpiDetailsAttachmentsDTO.class);
    }

    public KpiDetailsAttachmentsDTO update(KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO) {
        return (KpiDetailsAttachmentsDTO)this.commonRestTemplate.putForObject("kpiAttach", kpiDetailsAttachmentsDTO, KpiDetailsAttachmentsDTO.class);
    }

    public KpiDetailsAttachmentsDTO findById(Long id) {
        String url = String.join((CharSequence)"/", "kpiAttach", String.valueOf(id));
        return (KpiDetailsAttachmentsDTO)this.commonRestTemplate.getForObject(url, KpiDetailsAttachmentsDTO.class);
    }

    public void delete(Long id) {
        String url = String.join((CharSequence)"/", "kpiAttach", String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }
}

