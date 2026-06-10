/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MeetingManagement
 *  com.estrat.backend.db.bean.po.MeetingUserMapping
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.MeetingManagementDTO
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

import com.estrat.backend.db.bean.po.MeetingUserMapping;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.MeetingManagementDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
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
@Table(name="meeting_management", schema="orgstructure")
public class MeetingManagement {
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
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="meetingManagementValue")
    private String meetingManagementValue;
    @Column(name="meeting_time")
    private LocalDateTime meetingTime;
    @OneToMany(mappedBy="id.meetingManagementId", fetch=FetchType.LAZY, cascade={CascadeType.ALL}, orphanRemoval=true)
    private Set<MeetingUserMapping> employeeList;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;

    public MeetingManagement() {
    }

    public MeetingManagement(MeetingManagementDTO meetingManagementDTO) {
        String multipleOwners;
        this.id = meetingManagementDTO.getId();
        this.active = meetingManagementDTO.getActive();
        this.owner = meetingManagementDTO.getOwner();
        this.createdBy = meetingManagementDTO.getCreatedBy();
        this.updatedBy = meetingManagementDTO.getUpdatedBy();
        this.createdTime = meetingManagementDTO.getCreatedTime();
        this.updatedTime = meetingManagementDTO.getUpdatedTime();
        this.startDate = meetingManagementDTO.getStartDate();
        this.endDate = meetingManagementDTO.getEndDate();
        Long pageId = meetingManagementDTO.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(meetingManagementDTO.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.meetingManagementValue = mapper.writeValueAsString((Object)meetingManagementDTO.getMeetingManagementValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String string = multipleOwners = meetingManagementDTO.getMeetingManagementValue().get("multipleOwners") != null ? meetingManagementDTO.getMeetingManagementValue().get("multipleOwners").toString() : "";
        if (StringUtils.isNotEmpty((CharSequence)multipleOwners)) {
            Set userList = Arrays.asList(multipleOwners.split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new MeetingUserMapping(this, empId.toString())).collect(Collectors.toSet());
            this.setEmployeeList(userList);
        } else {
            this.setEmployeeList(Collections.emptySet());
        }
    }

    public Set<MeetingUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<MeetingUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public LocalDateTime getMeetingTime() {
        return this.meetingTime;
    }

    public void setMeetingTime(LocalDateTime meetingTime) {
        this.meetingTime = meetingTime;
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

    public String getMeetingManagementValue() {
        return this.meetingManagementValue;
    }

    public void setMeetingManagementValue(String meetingManagementValue) {
        this.meetingManagementValue = meetingManagementValue;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeetingManagement)) {
            return false;
        }
        MeetingManagement that = (MeetingManagement)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

