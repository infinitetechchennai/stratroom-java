/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.MeetingManagementAttachmentDTO
 *  com.estrat.backend.scorecard.service.MeetingManagementAttachmentService
 *  com.estrat.backend.scorecard.service.MeetingManagementAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.MeetingManagementAttachmentDTO;
import com.estrat.backend.scorecard.service.MeetingManagementAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class MeetingManagementAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${db.service.meeting.attach.url}")
    private String meetingAttachUrl;

    public MeetingManagementAttachmentDTO save(MeetingManagementAttachmentDTO meetingManagementAttachmentDTO) {
        return (MeetingManagementAttachmentDTO)this.commonRestTemplate.postForObject(this.meetingAttachUrl, (Object)meetingManagementAttachmentDTO, MeetingManagementAttachmentDTO.class);
    }

    public MeetingManagementAttachmentDTO update(MeetingManagementAttachmentDTO meetingManagementAttachmentDTO) {
        return (MeetingManagementAttachmentDTO)this.commonRestTemplate.putForObject(this.meetingAttachUrl, (Object)meetingManagementAttachmentDTO, MeetingManagementAttachmentDTO.class);
    }

    public MeetingManagementAttachmentDTO findById(Long id) {
        String url = String.join((CharSequence)"/", this.meetingAttachUrl, String.valueOf(id));
        return (MeetingManagementAttachmentDTO)this.commonRestTemplate.getForObject(url, MeetingManagementAttachmentDTO.class);
    }

    public void delete(Long id) {
        String url = String.join((CharSequence)"/", this.meetingAttachUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<MeetingManagementAttachmentDTO> findAll(Long meetingId) {
        String url = this.dbUrl + "meetingAttachList/" + meetingId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List MeetingManagementAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return MeetingManagementAttachmentDTOList;
    }
}

