/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.MeetingManagementDTO
 *  com.estrat.backend.db.dto.MeetingManagementResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.dto.MeetingManagementDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MeetingManagementResponseDTO {
    private boolean flag;
    private MeetingManagementDTO meetingManagementDTO;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public MeetingManagementDTO getMeetingManagementDTO() {
        return this.meetingManagementDTO;
    }

    public void setMeetingManagementDTO(MeetingManagementDTO meetingManagementDTO) {
        this.meetingManagementDTO = meetingManagementDTO;
    }
}

