/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ChildStatusCountDto
 *  com.estrat.scorecard.dto.StatusCountDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.ChildStatusCountDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class StatusCountDto {
    private long id;
    private String parentName;
    private List<ChildStatusCountDto> childStatusCount;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getParentName() {
        return this.parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public List<ChildStatusCountDto> getChildStatusCount() {
        return this.childStatusCount;
    }

    public void setChildStatusCount(List<ChildStatusCountDto> childStatusCount) {
        this.childStatusCount = childStatusCount;
    }
}

