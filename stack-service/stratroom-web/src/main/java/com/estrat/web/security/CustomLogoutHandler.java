/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.CustomLogoutHandler
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.web.authentication.logout.LogoutHandler
 */
package com.estrat.web.security;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

public class CustomLogoutHandler
implements LogoutHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomLogoutHandler.class);

    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        LOGGER.debug("Start of logout() method");
        request.getSession().invalidate();
        LOGGER.debug("Current Session invalidated");
        String logoutSuccessUrl = "/index";
        try {
            request.getRequestDispatcher(logoutSuccessUrl).forward((ServletRequest)request, (ServletResponse)response);
        }
        catch (IOException | ServletException e) {
            throw new RuntimeException(e);
        }
        LOGGER.debug("End of logout() method");
    }
}

