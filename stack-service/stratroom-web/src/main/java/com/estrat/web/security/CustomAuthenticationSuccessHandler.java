/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.CustomAuthenticationSuccessHandler
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.ServletException
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
 *  org.springframework.security.web.savedrequest.HttpSessionRequestCache
 *  org.springframework.security.web.savedrequest.RequestCache
 *  org.springframework.security.web.savedrequest.SavedRequest
 *  org.springframework.stereotype.Repository
 *  org.springframework.util.StringUtils
 */
package com.estrat.web.security;

import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class CustomAuthenticationSuccessHandler
extends SimpleUrlAuthenticationSuccessHandler {
    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);
    private RequestCache requestCache = null;
    @Value(value="${server.servlet.session.timeout}")
    public String sessionExpiry;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        request.getSession().setMaxInactiveInterval(Integer.valueOf(this.sessionExpiry.replaceAll("s", "")).intValue());
        SavedRequest savedRequest = this.requestCache.getRequest(request, response);
        String targetUrlParameter = this.getTargetUrlParameter();
        logger.debug(("targetUrlParameter: " + targetUrlParameter));
        
        // Remove License Check
        String redirectUrl = this.computeRedirectUrl(savedRequest, request);
        if (redirectUrl == null || redirectUrl.endsWith("/login") || redirectUrl.endsWith("/login-home") || redirectUrl.endsWith("/error")) {
            redirectUrl = "/login"; // Default landing page mapped in MemberController
        }
        
        logger.debug(("Redirecting to Url: " + redirectUrl));
        // Keep the thread locals for the session but don't clear them yet, wait why did they clear them?
        // Actually, the original code had: UserThreadLocal.set(null); TempUserThreadLocal.set(null); HeaderThreadLocal.set(null);
        // Let's keep that if it's expected
        UserThreadLocal.set(null);
        TempUserThreadLocal.set(null);
        HeaderThreadLocal.set(null);
        this.getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    @Autowired
    public void setRequestCache(HttpSessionRequestCache requestCache) {
        this.requestCache = requestCache;
    }

    @Bean
    public HttpSessionRequestCache buildSessionCache() {
        HttpSessionRequestCache cache = new HttpSessionRequestCache();
        cache.setCreateSessionAllowed(false);
        return cache;
    }

    private String computeRedirectUrl(SavedRequest savedRequest, HttpServletRequest request) {
        String redirectUrl = null;
        try {
            if (null == savedRequest) {
                logger.debug("There is no saved request ");
                super.clearAuthenticationAttributes(request);
                StringBuffer currentRequest = request.getRequestURL();
                logger.debug(("currentRequest: " + currentRequest));
                redirectUrl = "/login";
            } else {
                redirectUrl = savedRequest.getRedirectUrl();
                if (redirectUrl.endsWith("logout")) {
                    redirectUrl = "/login";
                }
            }
        }
        catch (Exception exception) {
            logger.error("Exception in CustomAuthenticationSuccessHandler class ", (Throwable)exception);
        }
        logger.debug(("redirectUrl: " + redirectUrl));
        return redirectUrl;
    }
}

