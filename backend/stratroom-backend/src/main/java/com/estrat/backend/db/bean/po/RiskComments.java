/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskComments
 *  com.estrat.backend.db.dto.RiskCommentsDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
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

import com.estrat.backend.db.dto.RiskCommentsDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="risk_comments", schema="orgstructure")
public class RiskComments {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="risk_id")
    private long riskId;
    @Column(name="risk_comments_value")
    private String riskCommentsValue;
    @Column(name="from_page")
    private String fromPage;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="version", nullable=false)
    private Long version = 0L;
    @Column(name="like_count")
    private Long likeCount;
    @Column(name="comments_parendId")
    private Long commentsParendId;
    @Column(name="comment_type")
    private int commentType = 0;

    public RiskComments() {
    }

    public RiskComments(RiskCommentsDTO riskCommentsDTO) {
        this.id = riskCommentsDTO.getId();
        this.riskId = riskCommentsDTO.getRiskId();
        this.active = riskCommentsDTO.getActive();
        this.owner = riskCommentsDTO.getOwner();
        this.createdBy = riskCommentsDTO.getCreatedBy();
        this.updatedBy = riskCommentsDTO.getUpdatedBy();
        this.createdTime = riskCommentsDTO.getCreatedTime();
        this.updatedTime = riskCommentsDTO.getUpdatedTime();
        this.fromPage = riskCommentsDTO.getFromPage();
        this.likeCount = riskCommentsDTO.getLikeCount();
        this.commentType = riskCommentsDTO.getCommentType();
        this.commentsParendId = riskCommentsDTO.getCommentsParendId();
        this.version = riskCommentsDTO.getVersion();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskCommentsValue = mapper.writeValueAsString((Object)riskCommentsDTO.getRiskCommentsValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public String getRiskCommentsValue() {
        return this.riskCommentsValue;
    }

    public void setRiskCommentsValue(String riskCommentsValue) {
        this.riskCommentsValue = riskCommentsValue;
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
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

    public String getFromPage() {
        return this.fromPage;
    }

    public void setFromPage(String fromPage) {
        this.fromPage = fromPage;
    }

    public Long getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public int getCommentType() {
        return this.commentType;
    }

    public void setCommentType(int commentType) {
        this.commentType = commentType;
    }

    public Long getCommentsParendId() {
        return this.commentsParendId;
    }

    public void setCommentsParendId(Long commentsParendId) {
        this.commentsParendId = commentsParendId;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

