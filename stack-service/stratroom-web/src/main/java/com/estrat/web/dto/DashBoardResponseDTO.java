/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DashBoardResponseDTO
 *  com.estrat.web.dto.Employee
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.Employee;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class DashBoardResponseDTO {
    private Employee nodeList;
    private Employee profile;

    public Employee getNodeList() {
        return this.nodeList;
    }

    public void setNodeList(Employee nodeList) {
        this.nodeList = nodeList;
    }

    public Employee getProfile() {
        return this.profile;
    }

    public void setProfile(Employee profile) {
        this.profile = profile;
    }
}

