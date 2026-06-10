/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.CustomSimpleUrlAuthenticationFailureHandler
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
 *  org.springframework.security.web.util.UrlUtils
 *  org.springframework.stereotype.Repository
 *  org.springframework.util.Assert
 */
package com.estrat.web.security;

import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

@Repository
public class CustomSimpleUrlAuthenticationFailureHandler
extends SimpleUrlAuthenticationFailureHandler {
    private static final Logger logger = LoggerFactory.getLogger(CustomSimpleUrlAuthenticationFailureHandler.class);
    private String defaultFailureUrl;

    public CustomSimpleUrlAuthenticationFailureHandler() {
        this.defaultFailureUrl = "/authfail";
    }

    public CustomSimpleUrlAuthenticationFailureHandler(String defaultFailureUrl) {
        this.setDefaultFailureUrl(defaultFailureUrl);
    }

    public void setDefaultFailureUrl(String defaultFailureUrl) {
        Assert.isTrue((boolean)UrlUtils.isValidRedirectUrl((String)defaultFailureUrl), (String)("'" + defaultFailureUrl + "' is not a valid redirect URL"));
        this.defaultFailureUrl = defaultFailureUrl;
    }

    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        UserThreadLocal.set(null);
        TempUserThreadLocal.set(null);
        HeaderThreadLocal.set(null);
        if (this.defaultFailureUrl == null) {
            logger.debug("No failure URL set, sending 401 Unauthorized error");
            response.sendError(401, "Authentication Failed: " + exception.getMessage());
        } else {
            this.saveException(request, exception);
            logger.debug(("Forwarding to " + this.defaultFailureUrl));
            request.getRequestDispatcher(this.defaultFailureUrl).forward((ServletRequest)request, (ServletResponse)response);
        }
    }
}

