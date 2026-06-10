/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.PosTradingHoursCountsDto
 */
package com.estrat.web.dto;

public class PosTradingHoursCountsDto {
    private long id;
    private String beforeHourTrading;
    private String atTheClockTrading;
    private String afterHourTrading;
    private int beforeHourTradingCount;
    private int atTheClockTradingCount;
    private int afterHourTradingCount;
    private String departMentName;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBeforeHourTrading() {
        return this.beforeHourTrading;
    }

    public void setBeforeHourTrading(String beforeHourTrading) {
        this.beforeHourTrading = beforeHourTrading;
    }

    public String getAtTheClockTrading() {
        return this.atTheClockTrading;
    }

    public void setAtTheClockTrading(String atTheClockTrading) {
        this.atTheClockTrading = atTheClockTrading;
    }

    public String getAfterHourTrading() {
        return this.afterHourTrading;
    }

    public void setAfterHourTrading(String afterHourTrading) {
        this.afterHourTrading = afterHourTrading;
    }

    public int getBeforeHourTradingCount() {
        return this.beforeHourTradingCount;
    }

    public void setBeforeHourTradingCount(int beforeHourTradingCount) {
        this.beforeHourTradingCount = beforeHourTradingCount;
    }

    public int getAtTheClockTradingCount() {
        return this.atTheClockTradingCount;
    }

    public void setAtTheClockTradingCount(int atTheClockTradingCount) {
        this.atTheClockTradingCount = atTheClockTradingCount;
    }

    public int getAfterHourTradingCount() {
        return this.afterHourTradingCount;
    }

    public void setAfterHourTradingCount(int afterHourTradingCount) {
        this.afterHourTradingCount = afterHourTradingCount;
    }

    public String getDepartMentName() {
        return this.departMentName;
    }

    public void setDepartMentName(String departMentName) {
        this.departMentName = departMentName;
    }
}

