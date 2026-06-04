/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MeetingManagementAttachmentDTO
 *  com.estrat.web.service.MeetingManagementAttachmentService
 *  com.estrat.web.service.MeetingManagementAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MeetingManagementAttachmentDTO;
import com.estrat.web.service.MeetingManagementAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class MeetingManagementAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecard.service.meeting.attach.url}")
    private String meetingAttachUrl;

    public MeetingManagementAttachmentDTO save(MeetingManagementAttachmentDTO meetingManagementAttachmentDTO) {
        return (MeetingManagementAttachmentDTO)this.commonRestTemplate.postForObject(this.meetingAttachUrl, meetingManagementAttachmentDTO, MeetingManagementAttachmentDTO.class);
    }

    public MeetingManagementAttachmentDTO update(MeetingManagementAttachmentDTO meetingManagementAttachmentDTO) {
        return (MeetingManagementAttachmentDTO)this.commonRestTemplate.putForObject(this.meetingAttachUrl, meetingManagementAttachmentDTO, MeetingManagementAttachmentDTO.class);
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
        String url = this.scoreCardUrl + "/meetingAttachList/" + meetingId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List MeetingManagementAttachmentDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return MeetingManagementAttachmentDTOList;
    }
}


