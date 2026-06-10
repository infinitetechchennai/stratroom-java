/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.EmployeeGoalsDTO
 *  com.estrat.backend.db.dto.EmployeeGoalsResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.dto.EmployeeGoalsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class EmployeeGoalsResponseDTO {
    private boolean flag;
    EmployeeGoalsDTO employeeGoalsDTO;

    public boolean isFlag() {
        return this.flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public EmployeeGoalsDTO getEmployeeGoalsDTO() {
        return this.employeeGoalsDTO;
    }

    public void setEmployeeGoalsDTO(EmployeeGoalsDTO employeeGoalsDTO) {
        this.employeeGoalsDTO = employeeGoalsDTO;
    }
}

