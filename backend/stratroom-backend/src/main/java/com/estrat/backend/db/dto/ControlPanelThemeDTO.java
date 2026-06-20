/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelTheme
 *  com.estrat.backend.db.dto.ControlPanelThemeDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ControlPanelTheme;
import java.time.LocalDateTime;

public class ControlPanelThemeDTO {
    private String loginLogo;
    private String loginTheme;
    private String themeColor;
    private String themeName;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long orgId;

    public ControlPanelThemeDTO() {
    }

    public ControlPanelThemeDTO(ControlPanelTheme controlPanelTheme) {
        this.loginLogo = controlPanelTheme.getLoginLogo();
        this.loginTheme = controlPanelTheme.getLoginTheme();
        this.themeColor = controlPanelTheme.getThemeColor();
        this.createdBy = controlPanelTheme.getCreatedBy();
        this.updatedBy = controlPanelTheme.getUpdatedBy();
        this.orgId = controlPanelTheme.getOrgId();
        this.createdTime = controlPanelTheme.getCreatedTime();
        this.updatedTime = controlPanelTheme.getUpdatedTime();
        this.themeName = controlPanelTheme.getThemeName();
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

