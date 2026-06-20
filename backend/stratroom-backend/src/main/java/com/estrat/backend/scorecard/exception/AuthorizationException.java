/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.exception.AuthorizationException
 *  com.estrat.backend.scorecard.exception.RequestException
 */
package com.estrat.backend.scorecard.exception;

import com.estrat.backend.scorecard.exception.RequestException;

public class AuthorizationException
extends RequestException {
    public String errorCode;
    public String errorMessage;

    public String getErrorMessage() {
        return this.errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public AuthorizationException(String errorCode, String message) {
        super(message);
        this.errorMessage = message;
        this.errorCode = errorCode;
    }
}

