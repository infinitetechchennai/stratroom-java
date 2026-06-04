/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.NotificationEntity
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  javax.persistence.UniqueConstraint
 */
package com.estrat.service.db.bean.po;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="notification_queue", schema="orgstructure", uniqueConstraints={@UniqueConstraint(columnNames={"kpi_id", "notification_type", "date_of_notification"})})
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="kpi_id", nullable=false)
    private String kpiId;
    @Column(name="notification_type", nullable=false)
    private Integer notificationType;
    @Column(name="date_of_notification", nullable=false)
    private LocalDate dateOfNotification;
    @Column(name="target_value")
    private String targetValue;
    @Column(name="actual_value")
    private String actualValue;
    @Column(name="department_id")
    private Long departmentId;
    @Column(name="month_year")
    private String monthYear;
    @Column(name="kpi_name")
    private String kpiName;
    @Column(name="department_name")
    private String departmentName;
    @Column(name="owner")
    private Long owner;
    @Column(name="frequency")
    private String frequency;
    @Column(name="employee_email")
    private String employeeEmail;
    @Column(name="employee_full_name")
    private String employeeFullName;
    @Column(name="sent", nullable=false)
    private boolean sent = false;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(String kpiId) {
        this.kpiId = kpiId;
    }

    public Integer getNotificationType() {
        return this.notificationType;
    }

    public void setNotificationType(Integer notificationType) {
        this.notificationType = notificationType;
    }

    public LocalDate getDateOfNotification() {
        return this.dateOfNotification;
    }

    public void setDateOfNotification(LocalDate dateOfNotification) {
        this.dateOfNotification = dateOfNotification;
    }

    public String getTargetValue() {
        return this.targetValue;
    }

    public void setTargetValue(String targetValue) {
        this.targetValue = targetValue;
    }

    public String getActualValue() {
        return this.actualValue;
    }

    public void setActualValue(String actualValue) {
        this.actualValue = actualValue;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getMonthYear() {
        return this.monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public boolean isSent() {
        return this.sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }

    public String getEmployeeEmail() {
        return this.employeeEmail;
    }

    public String getEmployeeFullName() {
        return this.employeeFullName;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public void setEmployeeFullName(String employeeFullName) {
        this.employeeFullName = employeeFullName;
    }
}

