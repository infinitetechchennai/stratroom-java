/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationRiskActivities
 *  com.estrat.service.db.bean.po.FormulationRiskDetails
 *  com.estrat.service.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.service.db.bean.po.FormulationSubRiskMapping
 *  com.estrat.service.db.dto.FormulationSubRiskDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
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
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.FormulationRiskActivities;
import com.estrat.service.db.bean.po.FormulationRiskDetails;
import com.estrat.service.db.bean.po.FormulationSubRiskMapping;
import com.estrat.service.db.dto.FormulationSubRiskDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
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
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="formulation_sub_risks", schema="orgstructure")
public class FormulationSubRiskDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="sub_risk_value")
    private String subRiskValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @ManyToOne
    @JoinColumn(name="risk_id")
    private FormulationRiskDetails riskId;
    @Column(name="type")
    private String type;
    @OneToMany(mappedBy="id.subRiskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<FormulationSubRiskMapping> subRiskUserList;
    @OneToMany(mappedBy="subRiskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private Set<FormulationRiskActivities> activitiesList;

    public FormulationSubRiskDetails() {
    }

    public FormulationSubRiskDetails(FormulationSubRiskDTO subRiskDTO) {
        String multipleOwners;
        this.id = subRiskDTO.getId();
        this.createdTime = subRiskDTO.getCreatedTime() == null ? LocalDateTime.now() : subRiskDTO.getCreatedTime();
        this.updatedTime = subRiskDTO.getUpdatedTime() == null ? LocalDateTime.now() : subRiskDTO.getUpdatedTime();
        this.createdBy = subRiskDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : subRiskDTO.getCreatedBy();
        this.updatedBy = subRiskDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : subRiskDTO.getUpdatedBy();
        String type = Objects.nonNull(subRiskDTO.getSubRiskValue().get("type")) ? subRiskDTO.getSubRiskValue().get("type").toString() : "";
        String string = this.type = subRiskDTO.getType() == null ? type : subRiskDTO.getType();
        if (subRiskDTO.getRiskId() != 0L) {
            FormulationRiskDetails riskFormulation = new FormulationRiskDetails();
            riskFormulation.setId(subRiskDTO.getRiskId());
            this.riskId = riskFormulation;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subRiskValue = mapper.writeValueAsString((Object)subRiskDTO.getSubRiskValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String string2 = multipleOwners = subRiskDTO.getSubRiskValue().get("multipleowners") != null ? subRiskDTO.getSubRiskValue().get("multipleowners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new FormulationSubRiskMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setSubRiskUserList(userList);
        } else {
            this.setSubRiskUserList(Collections.emptySet());
        }
        if (CollectionUtils.isNotEmpty((Collection)subRiskDTO.getActivitiesList())) {
            this.activitiesList = subRiskDTO.getActivitiesList().stream().map(activity -> new FormulationRiskActivities(activity)).collect(Collectors.toSet());
        }
    }

    public Set<FormulationRiskActivities> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(Set<FormulationRiskActivities> activitiesList) {
        this.activitiesList = activitiesList;
    }

    public Set<FormulationSubRiskMapping> getSubRiskUserList() {
        return this.subRiskUserList;
    }

    public void setSubRiskUserList(Set<FormulationSubRiskMapping> subRiskUserList) {
        this.subRiskUserList = subRiskUserList;
    }

    public FormulationRiskDetails getRiskId() {
        return this.riskId;
    }

    public void setRiskId(FormulationRiskDetails riskId) {
        this.riskId = riskId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getSubRiskValue() {
        return this.subRiskValue;
    }

    public void setSubRiskValue(String subRiskValue) {
        this.subRiskValue = subRiskValue;
    }
}

