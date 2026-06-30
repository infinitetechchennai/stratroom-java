package com.estrat.backend.db.dto;

public class LicenseModuleDTO {
    private long moduleId;
    private String moduleName;
    private String tagName;
    private boolean enabled;

    public long getModuleId() {
        return this.moduleId;
    }

    public void setModuleId(long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return this.moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getTagName() {
        return this.tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
