/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.dto.UserDTO
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import com.estrat.backend.db.bean.po.OrgDetails;
import com.estrat.backend.db.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

@Entity
@Table(name="employee_details", schema="orgstructure")
@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"})
public class EmployeeProfilePo
implements Serializable {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="emp_id")
    private long empId;
    @ManyToOne
    @JoinColumn(name="dept_id", referencedColumnName="dept_id")
    private DepartmentDetails deptId;
    @ManyToOne
    @JoinColumn(name="org_id", referencedColumnName="org_id")
    private OrgDetails orgId;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="user_role")
    private int userRole;
    @Column(name="profile_image")
    private String profileImage;
    @Column(name="parent_emp_id")
    private long parentEmpId;
    @Column(name="department")
    private String department;
    @Column(name="title")
    private String title;
    @Column(name="location")
    private String location;
    @Column(name="email_address")
    private String emailAddress;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name="currency")
    private String currency;
    @Column(name="currency_symbol")
    private String currencySymbol;
    @Column(name="created_date", updatable=false)
    private LocalDateTime createdDate;
    @Column(name="updated_date")
    private LocalDateTime updatedDate;
    @Column(name="status")
    private String status;
    @Column(name="create_via")
    private String createVia;
    @Column(name="emp_category")
    private String empCategory;
    @Column(name="emp_type")
    private String empType;
    @Column(name="emp_uniqid")
    private String empUniqId;
    @OneToMany(cascade={CascadeType.ALL}, mappedBy="empId", fetch=FetchType.LAZY)
    @Where(clause="active=0")
    private List<EmployeeDepartmentMapping> departmentMappings;

    public EmployeeProfilePo() {
    }

    public EmployeeProfilePo(Employee employeeProfilePo) {
        this.empId = employeeProfilePo.getEmpId();
        if (employeeProfilePo.getDeptDetails() != null) {
            this.deptId = new DepartmentDetails(employeeProfilePo.getDeptDetails());
        }
        this.orgId = new OrgDetails(employeeProfilePo.getOrgDetails());
        this.firstName = employeeProfilePo.getFirstName();
        this.lastName = employeeProfilePo.getLastName();
        this.userRole = employeeProfilePo.getUserRole();
        this.profileImage = employeeProfilePo.getProfileImage();
        this.title = employeeProfilePo.getTitle();
        this.location = employeeProfilePo.getLocation();
        this.emailAddress = employeeProfilePo.getEmailAddress();
        this.parentEmpId = employeeProfilePo.getParentEmpId();
        this.department = employeeProfilePo.getDepartment();
        this.phoneNumber = employeeProfilePo.getPhoneNumber();
        this.currency = employeeProfilePo.getCurrency();
        this.currencySymbol = employeeProfilePo.getCurrency();
        this.currencySymbol = employeeProfilePo.getCurrencySymbol();
    }

    public EmployeeProfilePo(UserDTO employeeProfilePo) {
        this.empId = employeeProfilePo.getUserId();
        this.firstName = employeeProfilePo.getName();
        this.profileImage = employeeProfilePo.getProfileImage();
        this.location = employeeProfilePo.getLocation();
        this.emailAddress = employeeProfilePo.getEmailAddress();
        this.phoneNumber = employeeProfilePo.getPhoneNumber();
        this.status = employeeProfilePo.getStatus();
        this.empCategory = employeeProfilePo.getUserCategory();
        this.empType = employeeProfilePo.getUserType();
        this.empUniqId = employeeProfilePo.getUserUniqId();
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return this.updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public DepartmentDetails getDeptId() {
        return this.deptId;
    }

    public void setDeptId(DepartmentDetails deptId) {
        this.deptId = deptId;
    }

    public OrgDetails getOrgId() {
        return this.orgId;
    }

    public void setOrgId(OrgDetails orgId) {
        this.orgId = orgId;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getUserRole() {
        return this.userRole;
    }

    public void setUserRole(int userRole) {
        this.userRole = userRole;
    }

    public String getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public long getParentEmpId() {
        return this.parentEmpId;
    }

    public void setParentEmpId(long parentEmpId) {
        this.parentEmpId = parentEmpId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCurrency() {
        return this.currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCurrencySymbol() {
        return this.currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }

    public List<EmployeeDepartmentMapping> getDepartmentMappings() {
        return this.departmentMappings;
    }

    public void setDepartmentMappings(List<EmployeeDepartmentMapping> departmentMappings) {
        this.departmentMappings = departmentMappings;
    }

    public String getCreateVia() {
        return this.createVia;
    }

    public void setCreateVia(String createVia) {
        this.createVia = createVia;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeProfilePo)) {
            return false;
        }
        EmployeeProfilePo that = (EmployeeProfilePo)o;
        return Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getEmpId());
    }

    public String getEmpCategory() {
        return this.empCategory;
    }

    public void setEmpCategory(String empCategory) {
        this.empCategory = empCategory;
    }

    public String getEmpType() {
        return this.empType;
    }

    public void setEmpType(String empType) {
        this.empType = empType;
    }

    public String getEmpUniqId() {
        return this.empUniqId;
    }

    public void setEmpUniqId(String empUniqId) {
        this.empUniqId = empUniqId;
    }
}

