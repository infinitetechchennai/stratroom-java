/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ImpactData
 *  com.estrat.backend.db.bean.po.ImpactSurvay
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.ImpactSurvayDto
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ImpactData;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.ImpactSurvayDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="impactsurvey", schema="orgstructure")
public class ImpactSurvay {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name="process")
    private String process;
    @Column(name="justification_for_crtical")
    private String justificationForCritical;
    @Column(name="create_time")
    private LocalDateTime createTime;
    @Column(name="update_time")
    private LocalDateTime updateTime;
    @Column(name="create_by")
    private Long createBy;
    @Column(name="update_by")
    private Long updateBy;
    @Column(name="creatername")
    private String createrName;
    @Column(name="updatername")
    private String updaterName;
    @Column(name="department_id")
    private long departmentId;
    @Column(name="owner")
    private long owner;
    @OneToMany(mappedBy="impactId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<ImpactData> impactData;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;

    public ImpactSurvay() {
    }

    public ImpactSurvay(ImpactSurvayDto impactSurvayDto) {
        this.id = impactSurvayDto.getId();
        this.justificationForCritical = impactSurvayDto.getJustificationForCritical();
        this.createTime = impactSurvayDto.getCreateTime();
        this.updateTime = impactSurvayDto.getUpdateTime();
        this.createBy = impactSurvayDto.getCreateBy();
        this.updateBy = impactSurvayDto.getUpdateBy();
        this.departmentId = impactSurvayDto.getDepartmentId();
        this.owner = impactSurvayDto.getOwner();
        this.createrName = impactSurvayDto.getCreaterName();
        this.updaterName = impactSurvayDto.getUpdaterName();
        if (impactSurvayDto.getPageId() != 0L) {
            PagesDetails pageDetails = new PagesDetails();
            pageDetails.setId(impactSurvayDto.getPageId());
            this.pageId = pageDetails;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.process = objectMapper.writeValueAsString((Object)impactSurvayDto.getProcess());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcess() {
        return this.process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public String getJustificationForCritical() {
        return this.justificationForCritical;
    }

    public void setJustificationForCritical(String justificationForCritical) {
        this.justificationForCritical = justificationForCritical;
    }

    public List<ImpactData> getImpactData() {
        return this.impactData;
    }

    public void setImpactData(List<ImpactData> impactData) {
        this.impactData = impactData;
    }

    public LocalDateTime getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return this.updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public Long getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public Long getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public String getCreaterName() {
        return this.createrName;
    }

    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }

    public String getUpdaterName() {
        return this.updaterName;
    }

    public void setUpdaterName(String updaterName) {
        this.updaterName = updaterName;
    }
}

