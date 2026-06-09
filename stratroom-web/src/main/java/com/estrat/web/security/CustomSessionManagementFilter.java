/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.CustomSessionManagementFilter
 *  javax.servlet.FilterChain
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.security.authentication.AuthenticationTrustResolver
 *  org.springframework.security.authentication.AuthenticationTrustResolverImpl
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.security.web.DefaultRedirectStrategy
 *  org.springframework.security.web.authentication.AuthenticationFailureHandler
 *  org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
 *  org.springframework.security.web.authentication.session.SessionAuthenticationException
 *  org.springframework.security.web.authentication.session.SessionAuthenticationStrategy
 *  org.springframework.security.web.context.SecurityContextRepository
 *  org.springframework.security.web.session.SessionManagementFilter
 */
package com.estrat.web.security;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.session.SessionManagementFilter;

public class CustomSessionManagementFilter
extends SessionManagementFilter {
    private static final Logger logger = LoggerFactory.getLogger(CustomSessionManagementFilter.class);
    static final String FILTER_APPLIED = "__spring_security_session_mgmt_filter_applied";
    private String contextPath;
    private final SecurityContextRepository securityContextRepository;
    private SessionAuthenticationStrategy sessionAuthenticationStrategy;
    private final AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();
    private AuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();

    public String getContextPath() {
        return this.contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public CustomSessionManagementFilter(SecurityContextRepository securityContextRepository) {
        super(securityContextRepository);
        this.securityContextRepository = securityContextRepository;
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        Authentication authentication;
        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)res;
        if (request.getAttribute(FILTER_APPLIED) != null) {
            chain.doFilter((ServletRequest)request, (ServletResponse)response);
            return;
        }
        request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
        if (!this.securityContextRepository.containsContext(request) && request.getHeader("Authorization") == null && (authentication = SecurityContextHolder.getContext().getAuthentication()) != null && !this.authenticationTrustResolver.isAnonymous(authentication)) {
            try {
                this.sessionAuthenticationStrategy.onAuthentication(authentication, request, response);
            }
            catch (SessionAuthenticationException e) {
                logger.debug("SessionAuthenticationStrategy rejected the authentication object", (Throwable)e);
                SecurityContextHolder.clearContext();
                this.failureHandler.onAuthenticationFailure(request, response, (AuthenticationException)e);
                return;
            }
            this.securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
        }
        String contextValue = this.contextPath;
        if (StringUtils.isNotEmpty((CharSequence)this.contextPath) && !"/".equalsIgnoreCase(this.contextPath)) {
            contextValue = String.join((CharSequence)"", this.contextPath, "/");
        }
        String requestURI = ((HttpServletRequest)req).getRequestURI().replaceAll(contextValue, "");
        if (this.isMemberAlreadyLoggedIn(request) && requestURI.equalsIgnoreCase("")) {
            String redirectUrl = "/login";
            DefaultRedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
            try {
                logger.debug(("Redirect URL :: " + redirectUrl));
                redirectStrategy.sendRedirect(request, response, redirectUrl);
            }
            catch (IOException e) {
                logger.error("IO Exception while trying to redirect to redirectURL");
            }
            return;
        }
        if (!(requestURI == null || requestURI.trim().equalsIgnoreCase("") || requestURI.equalsIgnoreCase("index") || requestURI.equalsIgnoreCase("logout") || this.isMemberAlreadyLoggedIn(request))) {
            request.setAttribute("loginFlag", "Session Expired");
        }
        chain.doFilter((ServletRequest)request, (ServletResponse)response);
    }

    private boolean isMemberAlreadyLoggedIn(HttpServletRequest request) {
        boolean isMemberAlreadyLoggedIn = false;
        if (request.getSession().getAttribute("principal") != null) {
            isMemberAlreadyLoggedIn = true;
        }
        return isMemberAlreadyLoggedIn;
    }
}

