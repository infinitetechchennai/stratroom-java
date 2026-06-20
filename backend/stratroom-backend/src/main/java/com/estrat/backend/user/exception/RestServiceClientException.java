/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.exception.RestServiceClientException
 *  org.springframework.http.HttpStatus
 */
package com.estrat.backend.user.exception;

import org.springframework.http.HttpStatus;

public class RestServiceClientException
extends RuntimeException {
    private String errorContent;
    private HttpStatus statusCode;

    public String getErrorContent() {
        return this.errorContent;
    }

    public void setErrorContent(String errorContent) {
        this.errorContent = errorContent;
    }

    public HttpStatus getStatusCode() {
        return this.statusCode;
    }

    public void setStatusCode(HttpStatus statusCode) {
        this.statusCode = statusCode;
    }

    public RestServiceClientException(String message, HttpStatus statusCode, String errorContent, Throwable cause) {
        super(message, cause);
        this.errorContent = errorContent;
        this.statusCode = statusCode;
    }
}

