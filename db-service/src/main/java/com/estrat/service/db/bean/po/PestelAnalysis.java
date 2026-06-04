/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.PestelAnalysis
 *  com.estrat.service.db.bean.po.PestelUserMapping
 *  com.estrat.service.db.dto.PestelAnalysisDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
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
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.bean.po.PestelUserMapping;
import com.estrat.service.db.dto.PestelAnalysisDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="pestel_analysis", schema="orgstructure")
public class PestelAnalysis {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="dept_id")
    private Long deptId;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="flagType")
    private String flagType;
    @Column(name="pestelAnalysisValue")
    private String pestelAnalysisValue;
    @OneToMany(mappedBy="id.pestelId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<PestelUserMapping> employeeList;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;

    public PestelAnalysis() {
    }

    public PestelAnalysis(PestelAnalysisDTO pestelAnalysisDTO) {
        String multipleOwners;
        this.id = pestelAnalysisDTO.getId();
        this.active = pestelAnalysisDTO.getActive();
        this.owner = pestelAnalysisDTO.getOwner();
        this.createdBy = pestelAnalysisDTO.getCreatedBy();
        this.updatedBy = pestelAnalysisDTO.getUpdatedBy();
        this.createdTime = pestelAnalysisDTO.getCreatedTime();
        this.updatedTime = pestelAnalysisDTO.getUpdatedTime();
        this.flagType = pestelAnalysisDTO.getFlagType();
        this.deptId = pestelAnalysisDTO.getDeptId();
        Long pageId = pestelAnalysisDTO.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(pestelAnalysisDTO.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.pestelAnalysisValue = mapper.writeValueAsString((Object)pestelAnalysisDTO.getPestelAnalysisValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String string = multipleOwners = pestelAnalysisDTO.getPestelAnalysisValue().get("multipleOwners") != null ? pestelAnalysisDTO.getPestelAnalysisValue().get("multipleOwners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new PestelUserMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setEmployeeList(userList);
        } else {
            this.setEmployeeList(Collections.emptySet());
        }
    }

    public Set<PestelUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<PestelUserMapping> employeeList) {
        this.employeeList = employeeList;
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

    public String getFlagType() {
        return this.flagType;
    }

    public void setFlagType(String flagType) {
        this.flagType = flagType;
    }

    public String getPestelAnalysisValue() {
        return this.pestelAnalysisValue;
    }

    public void setPestelAnalysisValue(String pestelAnalysisValue) {
        this.pestelAnalysisValue = pestelAnalysisValue;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PestelAnalysis)) {
            return false;
        }
        PestelAnalysis that = (PestelAnalysis)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

