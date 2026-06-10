/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Status
 */
package com.estrat.service.db.bean.po;

public class Status {
    private Object data;
    private int status;
    private String message;

    public Status(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public Status(Object data) {
        this.data = data;
    }

    public Object getData() {
        return this.data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

