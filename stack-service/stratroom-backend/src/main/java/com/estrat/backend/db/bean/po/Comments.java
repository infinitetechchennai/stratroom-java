/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Comments
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.CommentsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="comments_details", schema="orgstructure")
public class Comments {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="comments_value")
    private String commentsValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @Column(name="initiative_id")
    private long commentsInitiativeId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="like_count")
    private Long likeCount;
    @Column(name="comments_parendId")
    private Long commentsParendId;
    @Column(name="comment_type")
    private int commentType = 0;

    public Comments() {
    }

    public Comments(CommentsDTO commentsDTO) {
        this.id = commentsDTO.getId();
        this.commentsInitiativeId = commentsDTO.getInitiativeId();
        this.active = commentsDTO.getActive();
        this.createdTime = commentsDTO.getCreatedTime();
        this.createdBy = commentsDTO.getCreatedBy();
        this.updatedBy = commentsDTO.getUpdatedBy();
        this.owner = commentsDTO.getOwner();
        this.updatedTime = commentsDTO.getUpdatedTime();
        this.commentType = commentsDTO.getCommentType();
        this.commentsParendId = commentsDTO.getCommentsParendId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.commentsValue = mapper.writeValueAsString((Object)commentsDTO.getCommentsValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public String getCommentsValue() {
        return this.commentsValue;
    }

    public void setCommentsValue(String commentsValue) {
        this.commentsValue = commentsValue;
    }

    public long getCommentsInitiativeId() {
        return this.commentsInitiativeId;
    }

    public void setCommentsInitiativeId(long commentsInitiativeId) {
        this.commentsInitiativeId = commentsInitiativeId;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Long getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Long getCommentsParendId() {
        return this.commentsParendId;
    }

    public void setCommentsParendId(Long commentsParendId) {
        this.commentsParendId = commentsParendId;
    }

    public int getCommentType() {
        return this.commentType;
    }

    public void setCommentType(int commentType) {
        this.commentType = commentType;
    }
}

