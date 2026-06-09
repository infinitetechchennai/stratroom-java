/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.CustomUsernamePasswordAuthenticationFilter
 *  com.estrat.web.util.PasswordEncoder
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  javax.servlet.http.HttpSession
 *  org.apache.log4j.Logger
 *  org.springframework.security.authentication.AuthenticationServiceException
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
 */
package com.estrat.web.security;

import com.estrat.web.util.PasswordEncoder;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class CustomUsernamePasswordAuthenticationFilter
extends UsernamePasswordAuthenticationFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomUsernamePasswordAuthenticationFilter.class);
    private boolean postOnly = true;

    public boolean isPostOnly() {
        return this.postOnly;
    }

    public void setPostOnly(boolean postOnly) {
        this.postOnly = postOnly;
    }

    protected boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {
        LOGGER.debug("Start of requiresAuthentication() method of CustomUsernamePasswordAuthenticationFilter class");
        String uri = request.getRequestURI();
        LOGGER.debug(("URI " + uri));
        boolean requiredAuthentication = false;
        try {
            String filterProcessesUrl = "/login-home";
            requiredAuthentication = uri.endsWith(filterProcessesUrl);
            if (requiredAuthentication) {
                LOGGER.debug(("requiredAuthentication " + requiredAuthentication));
                return requiredAuthentication;
            }
        }
        catch (Exception e) {
            this.logger.error(("Error in checking for authentication " + e.getMessage()));
        }
        return requiredAuthentication;
    }

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String password = null;
        String username = this.obtainUsername(request);
        String encryptPassword = this.obtainPassword(request);
        if (encryptPassword != null) {
            PasswordEncoder encoder = new PasswordEncoder();
            try {
                password = encoder.decrypt(encryptPassword);
            }
            catch (Exception ex) {
                LOGGER.warn("Unable to decrypt password, falling back to raw value");
                password = encryptPassword;
            }
        }
        if (this.postOnly && !request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        if (username == null) {
            username = "";
        }
        if (password == null) {
            password = "";
        }
        username = username.trim();
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        this.setDetails(request, authRequest);
        Authentication auth = this.getAuthenticationManager().authenticate((Authentication)authRequest);
        if (auth != null) {
            try {
                HttpSession session = request.getSession();
                if (UserThreadLocal.get() != null) {
                    if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                        request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
                        request.getSession().setAttribute("principal", UserThreadLocal.get());
                    } else {
                        request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
                        request.getSession().setAttribute("principal", UserThreadLocal.get());
                    }
                }
            }
            catch (Exception e) {
                LOGGER.error("Error setting session attributes", e);
            }
        }
        return auth;
    }
}

