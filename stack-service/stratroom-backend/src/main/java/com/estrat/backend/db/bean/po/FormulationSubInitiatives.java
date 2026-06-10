/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationInitiatives
 *  com.estrat.backend.db.bean.po.FormulationSubInitiatives
 *  com.estrat.backend.db.bean.po.FormulationSubInitiativesMap
 *  com.estrat.backend.db.dto.FormulationSubInitiativesDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
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
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.FormulationInitiatives;
import com.estrat.backend.db.bean.po.FormulationSubInitiativesMap;
import com.estrat.backend.db.dto.FormulationSubInitiativesDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
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
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="formulation_subinitiatives", schema="orgstructure")
public class FormulationSubInitiatives {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="sub_initiative_value")
    private String subInitiativeValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @ManyToOne
    @JoinColumn(name="initiative_id")
    private FormulationInitiatives initiativeId;
    @OneToMany(mappedBy="id.subInitiativesId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<FormulationSubInitiativesMap> subInitiativesUserList;
    @Column(name="type")
    private String type;

    public FormulationSubInitiatives() {
    }

    public FormulationSubInitiatives(FormulationSubInitiativesDTO initiativesDTO) {
        String multipleOwners;
        this.id = initiativesDTO.getId();
        this.createdTime = initiativesDTO.getCreatedTime() == null ? LocalDateTime.now() : initiativesDTO.getCreatedTime();
        this.updatedTime = initiativesDTO.getUpdatedTime() == null ? LocalDateTime.now() : initiativesDTO.getUpdatedTime();
        this.createdBy = initiativesDTO.getCreatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : initiativesDTO.getCreatedBy();
        this.updatedBy = initiativesDTO.getUpdatedBy() == 0L ? Long.valueOf(UserThreadLocal.get()).longValue() : initiativesDTO.getUpdatedBy();
        String type = Objects.nonNull(initiativesDTO.getSubInitiativeValue().get("type")) ? initiativesDTO.getSubInitiativeValue().get("type").toString() : "";
        String string = this.type = initiativesDTO.getType() == null ? type : initiativesDTO.getType();
        if (initiativesDTO.getInitiativeId() != 0L) {
            FormulationInitiatives formulationInitiatives = new FormulationInitiatives();
            formulationInitiatives.setId(initiativesDTO.getInitiativeId());
            this.initiativeId = formulationInitiatives;
        }
        String string2 = multipleOwners = initiativesDTO.getSubInitiativeValue().get("multipleowners") != null ? initiativesDTO.getSubInitiativeValue().get("multipleowners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new FormulationSubInitiativesMap(this, empId.toString())).collect(Collectors.toSet());
            this.setSubInitiativesUserList(userList);
        } else {
            this.setSubInitiativesUserList(Collections.emptySet());
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subInitiativeValue = mapper.writeValueAsString((Object)initiativesDTO.getSubInitiativeValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getSubInitiativeValue() {
        return this.subInitiativeValue;
    }

    public void setSubInitiativeValue(String subInitiativeValue) {
        this.subInitiativeValue = subInitiativeValue;
    }

    public Set<FormulationSubInitiativesMap> getSubInitiativesUserList() {
        return this.subInitiativesUserList;
    }

    public void setSubInitiativesUserList(Set<FormulationSubInitiativesMap> subInitiativesUserList) {
        this.subInitiativesUserList = subInitiativesUserList;
    }

    public FormulationInitiatives getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(FormulationInitiatives initiativeId) {
        this.initiativeId = initiativeId;
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
}

