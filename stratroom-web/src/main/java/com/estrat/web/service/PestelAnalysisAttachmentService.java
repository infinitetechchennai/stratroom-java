/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.web.service.PestelAnalysisAttachmentService
 *  com.estrat.web.service.PestelAnalysisAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.PestelAnalysisAttachmentDTO;
import com.estrat.web.service.PestelAnalysisAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class PestelAnalysisAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecard.service.pestel.attach.url}")
    private String pestelAttachUrl;

    public PestelAnalysisAttachmentDTO save(PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) {
        return (PestelAnalysisAttachmentDTO)this.commonRestTemplate.postForObject(this.pestelAttachUrl, pestelAnalysisAttachmentDTO, PestelAnalysisAttachmentDTO.class);
    }

    public PestelAnalysisAttachmentDTO update(PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) {
        return (PestelAnalysisAttachmentDTO)this.commonRestTemplate.putForObject(this.pestelAttachUrl, pestelAnalysisAttachmentDTO, PestelAnalysisAttachmentDTO.class);
    }

    public PestelAnalysisAttachmentDTO findById(Long id) {
        String url = String.join((CharSequence)"/", this.pestelAttachUrl, String.valueOf(id));
        return (PestelAnalysisAttachmentDTO)this.commonRestTemplate.getForObject(url, PestelAnalysisAttachmentDTO.class);
    }

    public void delete(Long id) {
        String url = String.join((CharSequence)"/", this.pestelAttachUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<PestelAnalysisAttachmentDTO> findAll(Long pestelId) {
        String url = this.scoreCardUrl + "/pestelAttachList/" + pestelId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List pestelAnalysisAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return pestelAnalysisAttachmentDTOList;
    }
}


