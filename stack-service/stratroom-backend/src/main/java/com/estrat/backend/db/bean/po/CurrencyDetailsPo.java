/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.CurrencyDetailsPo
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="currency_details", schema="orgstructure")
public class CurrencyDetailsPo {
    @Id
    @GenericGenerator(name="currencyKey", strategy="assigned")
    @GeneratedValue(generator="currencyKey")
    @Column(name="currency_code")
    private String currencyCode;
    @Column(name="currency_name")
    private String currencyName;
    @Column(name="currency_symbol")
    private String currencySymbol;
    @Column(name="symbol_native")
    private String nativeSymbol;
    @Column(name="decimal_digits")
    private int decimalDigits;
    @Column(name="rounding")
    private double rounding;

    public String getNativeSymbol() {
        return this.nativeSymbol;
    }

    public void setNativeSymbol(String nativeSymbol) {
        this.nativeSymbol = nativeSymbol;
    }

    public String getCurrencySymbol() {
        return this.currencySymbol;
    }

    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
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
}

