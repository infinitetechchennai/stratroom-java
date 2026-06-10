/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.web.service.SwotAnalysisAttachmentService
 *  com.estrat.web.service.SwotAnalysisAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.SWOTAnalysisAttachmentDTO;
import com.estrat.web.service.SwotAnalysisAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class SwotAnalysisAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecard.service.swot.attach.url}")
    private String swotAttachUrl;

    public SWOTAnalysisAttachmentDTO save(SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) {
        return (SWOTAnalysisAttachmentDTO)this.commonRestTemplate.postForObject(this.swotAttachUrl, swotAnalysisAttachmentDTO, SWOTAnalysisAttachmentDTO.class);
    }

    public SWOTAnalysisAttachmentDTO update(SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) {
        return (SWOTAnalysisAttachmentDTO)this.commonRestTemplate.putForObject(this.swotAttachUrl, swotAnalysisAttachmentDTO, SWOTAnalysisAttachmentDTO.class);
    }

    public SWOTAnalysisAttachmentDTO findById(Long id) {
        String url = String.join((CharSequence)"/", this.swotAttachUrl, String.valueOf(id));
        return (SWOTAnalysisAttachmentDTO)this.commonRestTemplate.getForObject(url, SWOTAnalysisAttachmentDTO.class);
    }

    public void delete(Long id) {
        String url = String.join((CharSequence)"/", this.swotAttachUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SWOTAnalysisAttachmentDTO> findAll(Long swotId) {
        String url = this.scoreCardUrl + "/swotAttachList/" + swotId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List SWOTAnalysisAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return SWOTAnalysisAttachmentDTOList;
    }
}


