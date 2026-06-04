/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ModulePrivillageMapping
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.bean.po.RoleUserMapping
 *  com.estrat.service.db.dto.RoleDTO
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ModulePrivillageMapping;
import com.estrat.service.db.bean.po.RoleUserMapping;
import com.estrat.service.db.dto.RoleDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="role_details", schema="orgstructure")
public class RoleDetailsPo {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="role_id")
    private long roleId;
    @Column(name="org_id")
    private Long orgId;
    @Column(name="role_name")
    private String roleName;
    @Column(name="role_type")
    private String roleType;
    @Column(name="status")
    private int status;
    @Column(name="type")
    private int type;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @OneToMany(mappedBy="id.roleId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private Set<RoleUserMapping> employeeList;
    @OneToMany(cascade={CascadeType.ALL}, mappedBy="roleId", fetch=FetchType.LAZY)
    @Where(clause="active=0")
    private List<ModulePrivillageMapping> modulePrivilegeList;

    public RoleDetailsPo() {
    }

    public RoleDetailsPo(RoleDTO roleDetailsPo) {
        this.roleId = roleDetailsPo.getRoleId();
        this.roleName = roleDetailsPo.getRoleName();
        this.roleType = roleDetailsPo.getRoleType();
        this.type = roleDetailsPo.getType();
        this.status = roleDetailsPo.getStatus();
        this.createdBy = roleDetailsPo.getCreatedBy();
        this.updatedBy = roleDetailsPo.getUpdatedBy();
        this.createdTime = roleDetailsPo.getCreatedTime();
        this.updatedTime = roleDetailsPo.getUpdatedTime();
    }

    public Set<RoleUserMapping> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(Set<RoleUserMapping> employeeList) {
        this.employeeList = employeeList;
    }

    public List<ModulePrivillageMapping> getModulePrivilegeList() {
        return this.modulePrivilegeList;
    }

    public void setModulePrivilegeList(List<ModulePrivillageMapping> modulePrivilegeList) {
        this.modulePrivilegeList = modulePrivilegeList;
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

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public String getRoleType() {
        return this.roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoleDetailsPo)) {
            return false;
        }
        RoleDetailsPo that = (RoleDetailsPo)o;
        return Objects.equals(this.getRoleId(), that.getRoleId());
    }

    public int hashCode() {
        return Objects.hash(this.getRoleId());
    }
}

