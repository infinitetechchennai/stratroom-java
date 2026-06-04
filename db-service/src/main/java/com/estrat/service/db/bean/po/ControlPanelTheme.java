/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelTheme
 *  com.estrat.service.db.dto.ControlPanelThemeDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.ControlPanelThemeDTO;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="control_panel_theme", schema="orgstructure")
public class ControlPanelTheme {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="orgId")
    private long orgId;
    @Column(name="login_logo")
    private String loginLogo;
    @Column(name="login_theme")
    private String loginTheme;
    @Column(name="theme_color")
    private String themeColor;
    @Column(name="theme_name")
    private String themeName;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    public ControlPanelTheme() {
    }

    public ControlPanelTheme(ControlPanelThemeDTO controlPanelThemeDTO) {
        this.loginLogo = controlPanelThemeDTO.getLoginLogo();
        this.loginTheme = controlPanelThemeDTO.getLoginTheme();
        this.themeColor = controlPanelThemeDTO.getThemeColor();
        this.createdBy = controlPanelThemeDTO.getCreatedBy();
        this.updatedBy = controlPanelThemeDTO.getUpdatedBy();
        this.orgId = controlPanelThemeDTO.getOrgId();
        this.createdTime = controlPanelThemeDTO.getCreatedTime();
        this.updatedTime = controlPanelThemeDTO.getUpdatedTime();
        this.themeName = controlPanelThemeDTO.getThemeName();
    }

    public String getLoginLogo() {
        return this.loginLogo;
    }

    public void setLoginLogo(String loginLogo) {
        this.loginLogo = loginLogo;
    }

    public String getLoginTheme() {
        return this.loginTheme;
    }

    public void setLoginTheme(String loginTheme) {
        this.loginTheme = loginTheme;
    }

    public String getThemeColor() {
        return this.themeColor;
    }

    public void setThemeColor(String themeColor) {
        this.themeColor = themeColor;
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

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public String getThemeName() {
        return this.themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }
}

