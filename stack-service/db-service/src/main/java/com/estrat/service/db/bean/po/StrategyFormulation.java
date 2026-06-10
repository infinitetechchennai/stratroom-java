/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationScoreCard
 *  com.estrat.service.db.bean.po.FormulationUserMapping
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.StrategyFormulation
 *  com.estrat.service.db.dto.StrategyFormulationDTO
 *  com.estrat.service.db.resource.util.DateUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
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
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationScoreCard;
import com.estrat.service.db.bean.po.FormulationUserMapping;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.dto.StrategyFormulationDTO;
import com.estrat.service.db.resource.util.DateUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
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
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="strategy_formulation", schema="orgstructure")
public class StrategyFormulation {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @ManyToOne
    @JoinColumn(name="page_id")
    private PagesDetails pageId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;
    @Column(name="approved_date")
    private LocalDate approvedDate;
    @Column(name="plan_type")
    private String planType;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="approved_by")
    private long approvedBy;
    @Column(name="status")
    private String status;
    @OneToMany(mappedBy="formulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<FormulationScoreCard> scoreCardList;
    @OneToMany(mappedBy="id.formulationId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<FormulationUserMapping> formulationList;
    @Column(name="name")
    private String formulationName;
    @Column(name="dept")
    private String formulationDept;

    public StrategyFormulation() {
    }

    public StrategyFormulation(StrategyFormulationDTO strategyFormulation, boolean loadScoreCard) {
        this.id = strategyFormulation.getId();
        this.formulationName = strategyFormulation.getFormulationName();
        this.formulationDept = strategyFormulation.getFormulationDept();
        LocalDateTime localDateTime = this.createdTime = strategyFormulation.getCreatedTime() == null ? LocalDateTime.now() : strategyFormulation.getCreatedTime();
        if (loadScoreCard) {
            this.scoreCardList = strategyFormulation.getScoreCardList() != null ? strategyFormulation.getScoreCardList().stream().map(obj -> new FormulationScoreCard(this, obj)).collect(Collectors.toList()) : Collections.emptyList();
        }
        this.updatedTime = strategyFormulation.getUpdatedTime() == null ? LocalDateTime.now() : strategyFormulation.getUpdatedTime();
        this.createdBy = strategyFormulation.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : strategyFormulation.getCreatedBy();
        this.updatedBy = strategyFormulation.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : strategyFormulation.getUpdatedBy();
        this.approvedBy = strategyFormulation.getApprovedBy();
        this.approvedDate = DateUtil.mapToObject((String)strategyFormulation.getApprovedDate(), (String)"MM/dd/yyyy");
        this.startDate = DateUtil.mapToObject((String)strategyFormulation.getStartDate(), (String)"MM/dd/yyyy");
        this.endDate = DateUtil.mapToObject((String)strategyFormulation.getEndDate(), (String)"MM/dd/yyyy");
        this.planType = strategyFormulation.getPlanType();
        String string = this.status = strategyFormulation.getStatus() == null ? "Pending" : strategyFormulation.getStatus();
        if (this.status.equals("Approved")) {
            this.approvedDate = LocalDate.now();
        }
        PagesDetails pagesDetails = new PagesDetails();
        pagesDetails.setId(strategyFormulation.getPageId());
        this.pageId = pagesDetails;
    }

    public Set<FormulationUserMapping> getFormulationList() {
        return this.formulationList;
    }

    public void setFormulationList(Set<FormulationUserMapping> formulationList) {
        this.formulationList = formulationList;
    }

    public String getFormulationDept() {
        return this.formulationDept;
    }

    public void setFormulationDept(String formulationDept) {
        this.formulationDept = formulationDept;
    }

    public String getFormulationName() {
        return this.formulationName;
    }

    public void setFormulationName(String formulationName) {
        this.formulationName = formulationName;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
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

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getApprovedDate() {
        return this.approvedDate;
    }

    public void setApprovedDate(LocalDate approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getPlanType() {
        return this.planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
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

    public long getApprovedBy() {
        return this.approvedBy;
    }

    public void setApprovedBy(long approvedBy) {
        this.approvedBy = approvedBy;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<FormulationScoreCard> getScoreCardList() {
        return this.scoreCardList;
    }

    public void setScoreCardList(List<FormulationScoreCard> scoreCardList) {
        this.scoreCardList = scoreCardList;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StrategyFormulation)) {
            return false;
        }
        StrategyFormulation that = (StrategyFormulation)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

