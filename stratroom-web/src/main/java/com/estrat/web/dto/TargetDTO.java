/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.TargetDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class TargetDTO {
    private String target;
    private String actual;
    private long orgkpiId;

    public String getTarget() {
        return this.target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getActual() {
        return this.actual;
    }

    public void setActual(String actual) {
        this.actual = actual;
    }

    public long getOrgkpiId() {
        return this.orgkpiId;
    }

    public void setOrgkpiId(long orgkpiId) {
        this.orgkpiId = orgkpiId;
    }
}

