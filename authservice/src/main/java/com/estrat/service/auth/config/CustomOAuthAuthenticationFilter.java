/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.config.CustomOAuthAuthenticationFilter
 *  javax.servlet.FilterChain
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.security.authentication.AbstractAuthenticationToken
 *  org.springframework.security.authentication.AnonymousAuthenticationToken
 *  org.springframework.security.authentication.AuthenticationDetailsSource
 *  org.springframework.security.authentication.AuthenticationManager
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter
 *  org.springframework.security.oauth2.common.exceptions.InvalidTokenException
 *  org.springframework.security.oauth2.common.exceptions.OAuth2Exception
 *  org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor
 *  org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails
 *  org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetailsSource
 *  org.springframework.security.oauth2.provider.authentication.TokenExtractor
 */
package com.estrat.service.auth.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetailsSource;
import org.springframework.security.oauth2.provider.authentication.TokenExtractor;

public class CustomOAuthAuthenticationFilter
extends OAuth2ClientAuthenticationProcessingFilter {
    private AuthenticationManager authenticationManager;
    private TokenExtractor tokenExtractor = new BearerTokenExtractor();
    private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new OAuth2AuthenticationDetailsSource();

    public CustomOAuthAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    public AuthenticationManager getAuthenticationManager() {
        return this.authenticationManager;
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)res;
        try {
            Authentication authentication = this.tokenExtractor.extract(request);
            if (authentication == null) {
                if (this.isAuthenticated()) {
                    SecurityContextHolder.clearContext();
                }
            } else {
                request.setAttribute(OAuth2AuthenticationDetails.ACCESS_TOKEN_VALUE, authentication.getPrincipal());
                if (authentication instanceof AbstractAuthenticationToken) {
                    AbstractAuthenticationToken needsDetails = (AbstractAuthenticationToken)authentication;
                    needsDetails.setDetails(this.authenticationDetailsSource.buildDetails((HttpServletRequest)request));
                }
                Authentication authResult = this.authenticationManager.authenticate(authentication);
                SecurityContextHolder.getContext().setAuthentication(authResult);
            }
        }
        catch (InvalidTokenException tokenExpired) {
            SecurityContextHolder.clearContext();
            request.setAttribute("TokenExpired", (Object)tokenExpired.getMessage());
        }
        catch (OAuth2Exception failed) {
            SecurityContextHolder.clearContext();
            request.setAttribute("AU001", (Object)failed.getMessage());
        }
        chain.doFilter((ServletRequest)request, (ServletResponse)response);
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && !(authentication instanceof AnonymousAuthenticationToken);
    }
}

