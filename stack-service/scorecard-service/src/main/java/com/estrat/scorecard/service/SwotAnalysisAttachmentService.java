/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.scorecard.service.SwotAnalysisAttachmentService
 *  com.estrat.scorecard.service.SwotAnalysisAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.SWOTAnalysisAttachmentDTO;
import com.estrat.scorecard.service.SwotAnalysisAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class SwotAnalysisAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${db.service.swot.attach.url}")
    private String swotAttachUrl;

    public SWOTAnalysisAttachmentDTO save(SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) {
        return (SWOTAnalysisAttachmentDTO)this.commonRestTemplate.postForObject(this.swotAttachUrl, (Object)swotAnalysisAttachmentDTO, SWOTAnalysisAttachmentDTO.class);
    }

    public SWOTAnalysisAttachmentDTO update(SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) {
        return (SWOTAnalysisAttachmentDTO)this.commonRestTemplate.putForObject(this.swotAttachUrl, (Object)swotAnalysisAttachmentDTO, SWOTAnalysisAttachmentDTO.class);
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
        String url = this.dbUrl + "swotAttachList/" + swotId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List SWOTAnalysisAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return SWOTAnalysisAttachmentDTOList;
    }
}

