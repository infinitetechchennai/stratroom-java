package com.estrat.backend.orgstructure.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DeptDetails;
import java.util.List;
import java.util.Map;

/**
 * Aggregated payload for the Org Structure page.
 *
 * Bundles everything the org structure UI needs on load (years, department
 * list, module permissions, employee list) plus the optional per-node
 * department mapping, so the browser can fetch it all in a single call
 * instead of firing each request separately.
 */
public class OrgStructureAggregateDTO {
    private List<Integer> years;
    private List<DeptDetails> departmentList;
    private Map<String, Object> modulePermissions;
    private List<Employee> employeeList;
    private DepartmentChartDTO departmentMapping;

    public List<Integer> getYears() {
        return this.years;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }

    public List<DeptDetails> getDepartmentList() {
        return this.departmentList;
    }

    public void setDepartmentList(List<DeptDetails> departmentList) {
        this.departmentList = departmentList;
    }

    public Map<String, Object> getModulePermissions() {
        return this.modulePermissions;
    }

    public void setModulePermissions(Map<String, Object> modulePermissions) {
        this.modulePermissions = modulePermissions;
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public DepartmentChartDTO getDepartmentMapping() {
        return this.departmentMapping;
    }

    public void setDepartmentMapping(DepartmentChartDTO departmentMapping) {
        this.departmentMapping = departmentMapping;
    }
}
