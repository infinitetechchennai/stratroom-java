/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.MeetingManagement
 *  com.estrat.backend.db.dto.MeetingManagementDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.MeetingManagement;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MeetingManagementDTO {
    private long id;
    private int active = 0;
    private long owner;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> meetingManagementValue;
    private LocalDateTime meetingTime;
    private List<Employee> multipleOwerlist;
    private long pageId;
    private String pageName;
    private Date startDate;
    private Date endDate;
    private boolean recommendationmethod;

    public MeetingManagementDTO() {
    }

    public MeetingManagementDTO(MeetingManagement meetingManagement, boolean flag) {
        this.id = meetingManagement.getId();
        this.active = meetingManagement.getActive();
        this.owner = meetingManagement.getOwner();
        this.createdBy = meetingManagement.getCreatedBy();
        this.updatedBy = meetingManagement.getUpdatedBy();
        this.createdTime = meetingManagement.getCreatedTime();
        this.updatedTime = meetingManagement.getUpdatedTime();
        this.startDate = meetingManagement.getStartDate();
        this.endDate = meetingManagement.getEndDate();
        if (Objects.nonNull(meetingManagement.getMeetingTime())) {
            LocalDateTime timeUTC;
            LocalDateTime meetingTime = meetingManagement.getMeetingTime();
            this.meetingTime = timeUTC = meetingTime.atZone(ZoneOffset.UTC).toLocalDateTime();
        }
        if (meetingManagement.getPageId() != null) {
            this.pageId = meetingManagement.getPageId().getId();
            this.pageName = meetingManagement.getPageId().getPageName();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.meetingManagementValue = (Map)mapper.readValue(meetingManagement.getMeetingManagementValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)meetingManagement.getEmployeeList())) {
            this.multipleOwerlist = meetingManagement.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
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

    public Map<String, Object> getMeetingManagementValue() {
        return this.meetingManagementValue;
    }

    public void setMeetingManagementValue(Map<String, Object> meetingManagementValue) {
        this.meetingManagementValue = meetingManagementValue;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
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

    public boolean isRecommendationmethod() {
        return this.recommendationmethod;
    }

    public void setRecommendationmethod(boolean recommendationmethod) {
        this.recommendationmethod = recommendationmethod;
    }
}

