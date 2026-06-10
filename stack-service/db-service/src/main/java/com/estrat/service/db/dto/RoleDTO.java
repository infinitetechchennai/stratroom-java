/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.dto.ModuleDTO
 *  com.estrat.service.db.dto.PrivilegeDTO
 *  com.estrat.service.db.dto.RoleDTO
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.RoleDetailsPo;
import com.estrat.service.db.dto.ModuleDTO;
import com.estrat.service.db.dto.PrivilegeDTO;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

public class RoleDTO {
    private long roleId;
    private String roleName;
    private String roleType;
    private int type;
    private int status;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private List<Map<String, Object>> modulePrivilegeList;
    private List<ModuleDTO> moduleList;
    private List<PrivilegeDTO> privilegeList;
    private List<Employee> employeeList;
    private List<String> employeeIDs;
    private long orgId;

    public RoleDTO() {
    }

    public RoleDTO(RoleDetailsPo roleDetailsPo, boolean loadFlag) {
        this.roleId = roleDetailsPo.getRoleId();
        this.roleName = roleDetailsPo.getRoleName();
        this.roleType = roleDetailsPo.getRoleType();
        this.status = roleDetailsPo.getStatus();
        this.type = roleDetailsPo.getType();
        this.createdBy = roleDetailsPo.getCreatedBy();
        this.updatedBy = roleDetailsPo.getUpdatedBy();
        this.createdTime = roleDetailsPo.getCreatedTime();
        this.updatedTime = roleDetailsPo.getUpdatedTime();
        if (loadFlag && CollectionUtils.isNotEmpty((Collection)roleDetailsPo.getEmployeeList())) {
            this.employeeList = roleDetailsPo.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId(), Boolean.valueOf(false), Boolean.valueOf(false))).collect(Collectors.toList());
        }
    }

    public List<String> getEmployeeIDs() {
        return this.employeeIDs;
    }

    public void setEmployeeIDs(List<String> employeeIDs) {
        this.employeeIDs = employeeIDs;
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public long getRoleId() {
        return this.roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return this.roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleType() {
        return this.roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getType() {
        return this.type;
    }

    public void setType(int type) {
        this.type = type;
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

    public List<ModuleDTO> getModuleList() {
        return this.moduleList;
    }

    public void setModuleList(List<ModuleDTO> moduleList) {
        this.moduleList = moduleList;
    }

    public List<PrivilegeDTO> getPrivilegeList() {
        return this.privilegeList;
    }

    public void setPrivilegeList(List<PrivilegeDTO> privilegeList) {
        this.privilegeList = privilegeList;
    }

    public List<Map<String, Object>> getModulePrivilegeList() {
        return this.modulePrivilegeList;
    }

    public void setModulePrivilegeList(List<Map<String, Object>> modulePrivilegeList) {
        this.modulePrivilegeList = modulePrivilegeList;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }
}

