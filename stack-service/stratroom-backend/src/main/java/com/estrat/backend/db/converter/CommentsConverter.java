/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeComments
 *  com.estrat.backend.db.bean.po.KPIComments
 *  com.estrat.backend.db.converter.CommentsConverter
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.converter;

import com.estrat.backend.db.bean.po.EmployeeComments;
import com.estrat.backend.db.bean.po.KPIComments;
import com.estrat.backend.db.dto.CommentsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import com.estrat.backend.db.util.JsonUtil;

@Component
public class CommentsConverter {
    public CommentsDTO convert(KPIComments comments) {
        CommentsDTO commentsDTO = new CommentsDTO();
        commentsDTO.setId(comments.getId());
        commentsDTO.setKpiId(comments.getCommentsKpiId());
        commentsDTO.setActive(comments.getActive());
        commentsDTO.setCreatedTime(comments.getCreatedTime());
        commentsDTO.setCreatedBy(comments.getCreatedBy());
        commentsDTO.setUpdatedBy(comments.getUpdatedBy());
        commentsDTO.setOwner(comments.getOwner());
        commentsDTO.setUpdatedTime(comments.getUpdatedTime());
        commentsDTO.setLikeCount(comments.getLikeCount());
        commentsDTO.setType(comments.getType());
        if (comments.getCommentsParendId() != null) {
            commentsDTO.setCommentsParendId(comments.getCommentsParendId());
        }
        commentsDTO.setCommentType(comments.getCommentType());
        ObjectMapper mapper = new ObjectMapper();
        try {
            commentsDTO.setCommentsValue(JsonUtil.parseMap(comments.getCommentsValue()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return commentsDTO;
    }

    public KPIComments convert(CommentsDTO comments) {
        KPIComments commentsDTO = new KPIComments();
        commentsDTO.setId(comments.getId());
        commentsDTO.setCommentsKpiId(comments.getKpiId());
        commentsDTO.setActive(comments.getActive());
        commentsDTO.setCreatedTime(comments.getCreatedTime());
        commentsDTO.setCreatedBy(comments.getCreatedBy());
        commentsDTO.setUpdatedBy(comments.getUpdatedBy());
        commentsDTO.setOwner(comments.getOwner());
        commentsDTO.setUpdatedTime(comments.getUpdatedTime());
        commentsDTO.setLikeCount(comments.getLikeCount());
        commentsDTO.setCommentType(comments.getCommentType());
        commentsDTO.setCommentsParendId(comments.getCommentsParendId());
        commentsDTO.setType(comments.getType());
        ObjectMapper mapper = new ObjectMapper();
        try {
            commentsDTO.setCommentsValue(mapper.writeValueAsString((Object)comments.getCommentsValue()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return commentsDTO;
    }

    public CommentsDTO convert(EmployeeComments comments) {
        CommentsDTO commentsDTO = new CommentsDTO();
        commentsDTO.setId(comments.getId());
        commentsDTO.setActive(comments.getActive());
        commentsDTO.setCreatedTime(comments.getCreatedTime());
        commentsDTO.setCreatedBy(comments.getCreatedBy());
        commentsDTO.setUpdatedBy(comments.getUpdatedBy());
        commentsDTO.setOwner(comments.getOwner());
        commentsDTO.setUpdatedTime(comments.getUpdatedTime());
        commentsDTO.setLikeCount(comments.getLikeCount());
        commentsDTO.setCommentType(comments.getCommentType());
        commentsDTO.setCommentsParendId(comments.getCommentsParendId());
        ObjectMapper mapper = new ObjectMapper();
        try {
            commentsDTO.setCommentsValue(JsonUtil.parseMap(comments.getCommentsValue()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return commentsDTO;
    }

    public EmployeeComments convertEmployeeComments(CommentsDTO comments) {
        EmployeeComments commentsDTO = new EmployeeComments();
        commentsDTO.setId(comments.getId());
        commentsDTO.setActive(comments.getActive());
        commentsDTO.setCreatedTime(comments.getCreatedTime());
        commentsDTO.setCreatedBy(comments.getCreatedBy());
        commentsDTO.setUpdatedBy(comments.getUpdatedBy());
        commentsDTO.setOwner(comments.getOwner());
        commentsDTO.setUpdatedTime(comments.getUpdatedTime());
        commentsDTO.setLikeCount(comments.getLikeCount());
        commentsDTO.setCommentType(comments.getCommentType());
        commentsDTO.setCommentsParendId(comments.getCommentsParendId());
        ObjectMapper mapper = new ObjectMapper();
        try {
            commentsDTO.setCommentsValue(mapper.writeValueAsString((Object)comments.getCommentsValue()));
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return commentsDTO;
    }
}

