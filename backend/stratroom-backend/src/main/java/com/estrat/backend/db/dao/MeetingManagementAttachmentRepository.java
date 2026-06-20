/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MeetingManagementAttachment
 *  com.estrat.backend.db.dao.MeetingManagementAttachmentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.MeetingManagementAttachment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingManagementAttachmentRepository
extends JpaRepository<MeetingManagementAttachment, Long> {
    @Query(value="SELECT m FROM MeetingManagementAttachment m WHERE m.meetingManagementId.id =:meetingId")
    public List<MeetingManagementAttachment> findAllByMeetingId(@Param(value="meetingId") Long var1);
}

