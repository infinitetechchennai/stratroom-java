/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPICommentMapping
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="kpi_comment_mapping", schema="orgstructure")
public class KPICommentMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="empId")
    private Long empId;
    @Column(name="comment_id")
    private Long commentId;

    public KPICommentMapping() {
    }

    public KPICommentMapping(Long empId, Long commentId) {
        this.empId = empId;
        this.commentId = commentId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getEmpId() {
        return this.empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public Long getCommentId() {
        return this.commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }
}

