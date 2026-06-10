/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.CustomPerformance
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.web.dto;

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
    private boolean performance;
    private String threshold01Color;
    private String threshold12Color;
    private String threshold13Color;
    private String threshold01;
    private String threshold12;
    private String threshold13;

    public CustomPerformance(Map<String, Object> performanceMap) {
        this.threshold1 = Objects.nonNull(performanceMap.get("threshold1")) ? performanceMap.get("threshold1").toString().replaceAll("%", "") : "0";
        this.threshold2 = Objects.nonNull(performanceMap.get("threshold2")) ? performanceMap.get("threshold2").toString().replaceAll("%", "") : "0";
        this.threshold3 = Objects.nonNull(performanceMap.get("threshold3")) ? performanceMap.get("threshold3").toString().replaceAll("%", "") : "0";
        this.threshold2Color = Objects.nonNull(performanceMap.get("threshold2Color")) ? performanceMap.get("threshold2Color").toString() : "";
        this.threshold1Color = Objects.nonNull(performanceMap.get("threshold1Color")) ? performanceMap.get("threshold1Color").toString() : "";
        this.threshold3Color = Objects.nonNull(performanceMap.get("threshold3Color")) ? performanceMap.get("threshold3Color").toString() : "";
        this.customThreshold = Objects.nonNull(performanceMap.get("customThreshold")) ? performanceMap.get("customThreshold").toString() : "";
        this.customKPI = Objects.nonNull(performanceMap.get("customKPI")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customKPI").toString()) ? Boolean.valueOf(performanceMap.get("customKPI").toString()) : false;
        this.performance = Objects.nonNull(performanceMap.get("performance")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("performance").toString()) ? Boolean.valueOf(performanceMap.get("performance").toString()) : false;
        this.threshold01Color = Objects.nonNull(performanceMap.get("threshold0_1Color")) ? performanceMap.get("threshold0_1Color").toString() : "";
        this.threshold12Color = Objects.nonNull(performanceMap.get("threshold1_2Color")) ? performanceMap.get("threshold1_2Color").toString() : "";
        this.threshold13Color = Objects.nonNull(performanceMap.get("threshold1_3Color")) ? performanceMap.get("threshold1_3Color").toString() : "";
        this.threshold01 = Objects.nonNull(performanceMap.get("threshold0_1")) ? performanceMap.get("threshold0_1").toString().replaceAll("%", "") : "0";
        this.threshold12 = Objects.nonNull(performanceMap.get("threshold1_2")) ? performanceMap.get("threshold1_2").toString().replaceAll("%", "") : "0";
        this.threshold13 = Objects.nonNull(performanceMap.get("threshold1_3")) ? performanceMap.get("threshold1_3").toString().replaceAll("%", "") : "0";
        this.customPerformance = Objects.nonNull(performanceMap.get("customPerformance")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customPerformance").toString()) ? Boolean.valueOf(performanceMap.get("customPerformance").toString()) : false;
        this.customPerspective = Objects.nonNull(performanceMap.get("customPerspective")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customPerspective").toString()) ? Boolean.valueOf(performanceMap.get("customPerspective").toString()) : false;
        this.customObjective = Objects.nonNull(performanceMap.get("customObjective")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("customObjective").toString()) ? Boolean.valueOf(performanceMap.get("customObjective").toString()) : false;
        this.yearToDate = Objects.nonNull(performanceMap.get("yearToDate")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("yearToDate").toString()) ? Boolean.valueOf(performanceMap.get("yearToDate").toString()) : false;
        this.aggregation = Objects.nonNull(performanceMap.get("aggregation")) && StringUtils.isNotEmpty((CharSequence)performanceMap.get("aggregation").toString()) ? Boolean.valueOf(performanceMap.get("aggregation").toString()) : false;
        this.derivation = Objects.nonNull(performanceMap.get("derivation")) ? performanceMap.get("derivation").toString() : "";
        this.aggregationType = Objects.nonNull(performanceMap.get("aggregationType")) ? performanceMap.get("aggregationType").toString() : "";
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

    public boolean isPerformance() {
        return this.performance;
    }

    public void setPerformance(boolean performance) {
        this.performance = performance;
    }

    public String getThreshold01Color() {
        return this.threshold01Color;
    }

    public void setThreshold01Color(String threshold01Color) {
        this.threshold01Color = threshold01Color;
    }

    public String getThreshold12Color() {
        return this.threshold12Color;
    }

    public void setThreshold12Color(String threshold12Color) {
        this.threshold12Color = threshold12Color;
    }

    public String getThreshold13Color() {
        return this.threshold13Color;
    }

    public void setThreshold13Color(String threshold13Color) {
        this.threshold13Color = threshold13Color;
    }

    public String getThreshold01() {
        return this.threshold01;
    }

    public void setThreshold01(String threshold01) {
        this.threshold01 = threshold01;
    }

    public String getThreshold12() {
        return this.threshold12;
    }

    public void setThreshold12(String threshold12) {
        this.threshold12 = threshold12;
    }

    public String getThreshold13() {
        return this.threshold13;
    }

    public void setThreshold13(String threshold13) {
        this.threshold13 = threshold13;
    }
}

