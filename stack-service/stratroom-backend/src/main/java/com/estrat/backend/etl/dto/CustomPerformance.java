/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.CustomPerformance
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.backend.etl.dto;

import java.util.Map;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;

public class CustomPerformance {
    private String threshold1;
    private String threshold2;
    private String threshold3;
    private String threshold2Color;
    private String threshold1Color;
    private String threshold3Color;
    private String customThreshold;
    private boolean customKPI;
    private boolean customPerformance;
    private boolean customPerspective;
    private boolean customObjective;
    private boolean yearToDate;
    private boolean aggregation;
    private String derivation;
    private String aggregationType;
    private boolean customAggregation;
    private boolean weightEnbled;

    public CustomPerformance(Map<String, Object> performanceMap) {
        this.threshold1 = Objects.nonNull(performanceMap.get("threshold1")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("threshold1").toString()) ? performanceMap.get("threshold1").toString().replaceAll("%", "") : "0";
        this.threshold2 = Objects.nonNull(performanceMap.get("threshold2")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("threshold2").toString()) ? performanceMap.get("threshold2").toString().replaceAll("%", "") : "0";
        this.threshold3 = Objects.nonNull(performanceMap.get("threshold3")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("threshold3").toString()) ? performanceMap.get("threshold3").toString().replaceAll("%", "") : "0";
        this.threshold2Color = Objects.nonNull(performanceMap.get("threshold2Color")) ? performanceMap.get("threshold2Color").toString() : "";
        this.threshold1Color = Objects.nonNull(performanceMap.get("threshold1Color")) ? performanceMap.get("threshold1Color").toString() : "";
        this.threshold3Color = Objects.nonNull(performanceMap.get("threshold3Color")) ? performanceMap.get("threshold3Color").toString() : "";
        this.customThreshold = Objects.nonNull(performanceMap.get("customThreshold")) ? performanceMap.get("customThreshold").toString() : "";
        this.customKPI = Objects.nonNull(performanceMap.get("customKPI")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customKPI").toString()) ? Boolean.valueOf(performanceMap.get("customKPI").toString()) : false;
        this.customPerformance = Objects.nonNull(performanceMap.get("customPerformance")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customPerformance").toString()) ? Boolean.valueOf(performanceMap.get("customPerformance").toString()) : false;
        this.customPerspective = Objects.nonNull(performanceMap.get("customPerspective")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customPerspective").toString()) ? Boolean.valueOf(performanceMap.get("customPerspective").toString()) : false;
        this.customObjective = Objects.nonNull(performanceMap.get("customObjective")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customObjective").toString()) ? Boolean.valueOf(performanceMap.get("customObjective").toString()) : false;
        this.yearToDate = Objects.nonNull(performanceMap.get("yearToDate")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("yearToDate").toString()) ? Boolean.valueOf(performanceMap.get("yearToDate").toString()) : false;
        this.aggregation = Objects.nonNull(performanceMap.get("aggregation")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("aggregation").toString()) ? Boolean.valueOf(performanceMap.get("aggregation").toString()) : false;
        this.derivation = Objects.nonNull(performanceMap.get("derivation")) ? performanceMap.get("derivation").toString() : "";
        this.aggregationType = Objects.nonNull(performanceMap.get("aggregationType")) ? performanceMap.get("aggregationType").toString() : "";
        this.customAggregation = "Custom".equalsIgnoreCase(this.getAggregationType());
        this.weightEnbled = Objects.nonNull(performanceMap.get("weightEnbled")) ? Boolean.valueOf(performanceMap.get("weightEnbled").toString()) : false;
    }

    public boolean isCustomAggregation() {
        return this.customAggregation;
    }

    public void setCustomAggregation(boolean customAggregation) {
        this.customAggregation = customAggregation;
    }

    public boolean isWeightEnbled() {
        return this.weightEnbled;
    }

    public void setWeightEnbled(boolean weightEnbled) {
        this.weightEnbled = weightEnbled;
    }

    public String getThreshold1() {
        return this.threshold1;
    }

    public void setThreshold1(String threshold1) {
        this.threshold1 = threshold1;
    }

    public String getThreshold2() {
        return this.threshold2;
    }

    public void setThreshold2(String threshold2) {
        this.threshold2 = threshold2;
    }

    public String getThreshold3() {
        return this.threshold3;
    }

    public void setThreshold3(String threshold3) {
        this.threshold3 = threshold3;
    }

    public String getThreshold2Color() {
        return this.threshold2Color;
    }

    public void setThreshold2Color(String threshold2Color) {
        this.threshold2Color = threshold2Color;
    }

    public String getThreshold1Color() {
        return this.threshold1Color;
    }

    public void setThreshold1Color(String threshold1Color) {
        this.threshold1Color = threshold1Color;
    }

    public String getThreshold3Color() {
        return this.threshold3Color;
    }

    public void setThreshold3Color(String threshold3Color) {
        this.threshold3Color = threshold3Color;
    }

    public String getCustomThreshold() {
        return this.customThreshold;
    }

    public void setCustomThreshold(String customThreshold) {
        this.customThreshold = customThreshold;
    }

    public boolean isCustomKPI() {
        return this.customKPI;
    }

    public void setCustomKPI(boolean customKPI) {
        this.customKPI = customKPI;
    }

    public boolean isCustomPerformance() {
        return this.customPerformance;
    }

    public void setCustomPerformance(boolean customPerformance) {
        this.customPerformance = customPerformance;
    }

    public boolean isCustomPerspective() {
        return this.customPerspective;
    }

    public void setCustomPerspective(boolean customPerspective) {
        this.customPerspective = customPerspective;
    }

    public boolean isCustomObjective() {
        return this.customObjective;
    }

    public void setCustomObjective(boolean customObjective) {
        this.customObjective = customObjective;
    }

    public boolean isYearToDate() {
        return this.yearToDate;
    }

    public void setYearToDate(boolean yearToDate) {
        this.yearToDate = yearToDate;
    }

    public boolean isAggregation() {
        return this.aggregation;
    }

    public void setAggregation(boolean aggregation) {
        this.aggregation = aggregation;
    }

    public String getDerivation() {
        return this.derivation;
    }

    public void setDerivation(String derivation) {
        this.derivation = derivation;
    }

    public String getAggregationType() {
        return this.aggregationType;
    }

    public void setAggregationType(String aggregationType) {
        this.aggregationType = aggregationType;
    }
}

