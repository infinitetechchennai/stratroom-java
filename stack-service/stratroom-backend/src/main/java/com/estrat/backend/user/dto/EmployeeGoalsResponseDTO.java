/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.EmployeeGoalsDTO
 *  com.estrat.backend.user.dto.EmployeeGoalsResponseDTO
 */
package com.estrat.backend.user.dto;

import com.estrat.backend.user.dto.EmployeeGoalsDTO;

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

