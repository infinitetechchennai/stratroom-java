/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MeetingManagementAttachment
 *  com.estrat.backend.db.dao.MeetingManagementAttachmentRepository
 *  com.estrat.backend.db.dto.MeetingManagementAttachmentDTO
 *  com.estrat.backend.db.service.MeetingManagementAttachmentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.MeetingManagementAttachment;
import com.estrat.backend.db.dao.MeetingManagementAttachmentRepository;
import com.estrat.backend.db.dto.MeetingManagementAttachmentDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingManagementAttachmentService {
    private Logger log = LoggerFactory.getLogger(MeetingManagementAttachmentService.class);
    @Autowired
    protected MeetingManagementAttachmentRepository attachmentRepository;

    public Optional<MeetingManagementAttachment> findById(long id) {
        return this.attachmentRepository.findById(id);
    }

    public MeetingManagementAttachmentDTO save(MeetingManagementAttachment managementAttachment) {
        MeetingManagementAttachment meetingManagementAttachment = this.attachmentRepository.save(managementAttachment);
        MeetingManagementAttachmentDTO response = new MeetingManagementAttachmentDTO(meetingManagementAttachment);
        return response;
    }

    public void delete(MeetingManagementAttachment managementAttachment) {
        this.attachmentRepository.delete(managementAttachment);
    }

    public List<MeetingManagementAttachmentDTO> findAll(long meetingId) {
        List<MeetingManagementAttachment> dbList = this.attachmentRepository.findAllByMeetingId(Long.valueOf(meetingId));
        List<MeetingManagementAttachmentDTO> response = dbList.stream().map(dbValue -> new MeetingManagementAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }
}

