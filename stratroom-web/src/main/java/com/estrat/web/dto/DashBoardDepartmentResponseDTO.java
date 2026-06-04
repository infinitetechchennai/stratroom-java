/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DashBoardDepartmentResponseDTO
 *  com.estrat.web.dto.DepartmentResponseDetailsDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.DepartmentResponseDetailsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class DashBoardDepartmentResponseDTO {
    private DepartmentResponseDetailsDTO nodeList;

    public DepartmentResponseDetailsDTO getNodeList() {
        return this.nodeList;
    }

    public void setNodeList(DepartmentResponseDetailsDTO nodeList) {
        this.nodeList = nodeList;
    }
}

