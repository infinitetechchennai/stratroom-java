package com.estrat.web.dto;

public class IncidentImpactData {
    private Long id;
    private String impactCategory;
    private String impactDescription;
    private String impactLevel;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImpactCategory() {
        return this.impactCategory;
    }

    public void setImpactCategory(String impactCategory) {
        this.impactCategory = impactCategory;
    }

    public String getImpactDescription() {
        return this.impactDescription;
    }

    public void setImpactDescription(String impactDescription) {
        this.impactDescription = impactDescription;
    }

    public String getImpactLevel() {
        return this.impactLevel;
    }

    public void setImpactLevel(String impactLevel) {
        this.impactLevel = impactLevel;
    }
}
