/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.auth0.jwt.exceptions.TokenExpiredException
 *  com.estrat.service.auth.config.CustomOAuthAuthenticationFilter
 *  com.estrat.service.auth.config.JWTOAuthTokenFilter
 *  com.estrat.service.encryption.EncryptionProvider
 *  com.estrat.service.exception.RequestException
 *  com.estrat.service.jwt.JwtTokenUtil
 *  javax.servlet.FilterChain
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
 *  org.springframework.security.authentication.AuthenticationManager
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.authority.AuthorityUtils
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager
 *  org.springframework.web.filter.GenericFilterBean
 */
package com.estrat.service.auth.config;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.estrat.service.auth.config.CustomOAuthAuthenticationFilter;
import com.estrat.service.encryption.EncryptionProvider;
import com.estrat.service.exception.RequestException;
import com.estrat.service.jwt.JwtTokenUtil;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager;
import org.springframework.web.filter.GenericFilterBean;

public class JWTOAuthTokenFilter
extends GenericFilterBean {
    private static final Logger LOGGER = Logger.getLogger(JWTOAuthTokenFilter.class);
    private AuthenticationManager authenticationManager;
    private OAuth2AuthenticationManager auth2AuthenticationManager;
    private EncryptionProvider encryptionProvider;
    private JwtTokenUtil jwtTokenUtil;

    public void setAuth2AuthenticationManager(OAuth2AuthenticationManager auth2AuthenticationManager) {
        this.auth2AuthenticationManager = auth2AuthenticationManager;
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void setEncryptionProvider(EncryptionProvider encryptionProvider) {
        this.encryptionProvider = encryptionProvider;
    }

    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)arg0;
        String decryptUserInfo = null;
        try {
            String userInfo = request.getHeader("USER_INFO");
            if (this.encryptionProvider.isENCFormatted(userInfo)) {
                try {
                    decryptUserInfo = this.encryptionProvider.decrypt(userInfo);
                }
                catch (RequestException e) {
                    throw new ServletException((Throwable)e);
                }
                LOGGER.debug((Object)("decypted user info in JWTOAuthTokenFilter " + decryptUserInfo));
            } else {
                decryptUserInfo = userInfo;
            }
            if (request.getHeader("OAUTH_VALIDATION") != null && request.getHeader("Authorization") != null) {
                CustomOAuthAuthenticationFilter authAuthenticationFilter = new CustomOAuthAuthenticationFilter("/");
                authAuthenticationFilter.setAuthenticationManager((AuthenticationManager)this.auth2AuthenticationManager);
                authAuthenticationFilter.doFilter(arg0, arg1, arg2);
            } else if (request.getHeader("Authorization") != null) {
                String jwtToken = request.getHeader("Authorization").substring(7);
                LOGGER.debug((Object)("JWT Token " + jwtToken));
                if (this.jwtTokenUtil.isTokenExpired(jwtToken).booleanValue()) {
                    LOGGER.debug((Object)"Jwt Token Expired");
                    request.setAttribute("TokenExpired", (Object)"Jwt Token Expired");
                } else if (!this.jwtTokenUtil.validateToken(jwtToken, decryptUserInfo).booleanValue()) {
                    LOGGER.debug((Object)"Jwt Token not matching with userinfo");
                    request.setAttribute("AU001", (Object)"Jwt Token not matching with userinfo");
                } else if (this.jwtTokenUtil.validateToken(jwtToken, decryptUserInfo).booleanValue()) {
                    request.setAttribute("userInfo", (Object)decryptUserInfo);
                    List grantedAuths = AuthorityUtils.createAuthorityList((String[])new String[]{"ROLE_USER"});
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(null, null, (Collection)grantedAuths);
                    SecurityContextHolder.getContext().setAuthentication((Authentication)auth);
                }
            } else {
                LOGGER.debug((Object)"Jwt Token missing in the request");
                request.setAttribute("AU001", (Object)"Jwt Token missing in the request");
            }
            arg2.doFilter((ServletRequest)request, arg1);
        }
        catch (TokenExpiredException exception) {
            request.setAttribute("TokenExpired", (Object)"Jwt Token Expired");
            arg2.doFilter((ServletRequest)request, arg1);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

