/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.scorecard.service.PestelAnalysisAttachmentService
 *  com.estrat.scorecard.service.PestelAnalysisAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.PestelAnalysisAttachmentDTO;
import com.estrat.scorecard.service.PestelAnalysisAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class PestelAnalysisAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${db.service.pestel.attach.url}")
    private String pestelAttachUrl;

    public PestelAnalysisAttachmentDTO save(PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) {
        return (PestelAnalysisAttachmentDTO)this.commonRestTemplate.postForObject(this.pestelAttachUrl, (Object)pestelAnalysisAttachmentDTO, PestelAnalysisAttachmentDTO.class);
    }

    public PestelAnalysisAttachmentDTO update(PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) {
        return (PestelAnalysisAttachmentDTO)this.commonRestTemplate.putForObject(this.pestelAttachUrl, (Object)pestelAnalysisAttachmentDTO, PestelAnalysisAttachmentDTO.class);
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
        String url = this.dbUrl + "pestelAttachList/" + pestelId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List pestelAnalysisAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return pestelAnalysisAttachmentDTOList;
    }
}

