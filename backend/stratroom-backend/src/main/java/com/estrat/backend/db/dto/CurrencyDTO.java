/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.CurrencyDetailsPo
 *  com.estrat.backend.db.dto.CurrencyDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.CurrencyDetailsPo;

public class CurrencyDTO {
    private String currencyCode;
    private String currencyName;
    private String currencySymbol;
    private String nativeSymbol;
    private int decimalDigits;
    private double rounding;

    public CurrencyDTO() {
    }

    public CurrencyDTO(CurrencyDetailsPo currencyDetailsPo) {
        this.currencyCode = currencyDetailsPo.getCurrencyCode();
        this.currencyName = currencyDetailsPo.getCurrencyName();
        this.currencySymbol = currencyDetailsPo.getCurrencySymbol();
        this.decimalDigits = currencyDetailsPo.getDecimalDigits();
        this.rounding = currencyDetailsPo.getRounding();
        this.nativeSymbol = currencyDetailsPo.getNativeSymbol();
    }

    public String getCurrencyCode() {
        return this.currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getCurrencyName() {
        return this.currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public String getCurrencySymbol() {
        return this.currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }

    public String getNativeSymbol() {
        return this.nativeSymbol;
    }

    public void setNativeSymbol(String nativeSymbol) {
        this.nativeSymbol = nativeSymbol;
    }

    public int getDecimalDigits() {
        return this.decimalDigits;
    }

    public void setDecimalDigits(int decimalDigits) {
        this.decimalDigits = decimalDigits;
    }

    public double getRounding() {
        return this.rounding;
    }

    public void setRounding(double rounding) {
        this.rounding = rounding;
    }
}

