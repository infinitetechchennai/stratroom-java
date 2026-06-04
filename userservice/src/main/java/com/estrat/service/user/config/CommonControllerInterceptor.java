/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.config.CommonControllerInterceptor
 *  com.estrat.service.user.dto.TokenResponseDTO
 *  com.estrat.service.user.exception.AuthorizationException
 *  com.estrat.service.user.resource.util.HeaderThreadLocal
 *  com.estrat.service.user.resource.util.UserThreadLocal
 *  com.estrat.service.user.service.TokenService
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.web.servlet.ModelAndView
 *  org.springframework.web.servlet.handler.HandlerInterceptorAdapter
 */
package com.estrat.service.user.config;

import com.estrat.service.user.dto.TokenResponseDTO;
import com.estrat.service.user.exception.AuthorizationException;
import com.estrat.service.user.resource.util.HeaderThreadLocal;
import com.estrat.service.user.resource.util.UserThreadLocal;
import com.estrat.service.user.service.TokenService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonControllerInterceptor
extends HandlerInterceptorAdapter {
    @Autowired
    private TokenService tokenService;
    @Value(value="${jwt.verification.enabled}")
    private boolean jwtVerification;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HashMap<String, String> commonThreadHeaders = new HashMap<String, String>();
        commonThreadHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
        commonThreadHeaders.put("DATE_PERIOD", request.getHeader("DATE_PERIOD"));
        commonThreadHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
        commonThreadHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
        HeaderThreadLocal.set(commonThreadHeaders);
        if (StringUtils.isNotEmpty((CharSequence)request.getHeader("PRELOGINAPI"))) {
            return true;
        }
        if (!this.jwtVerification) {
            HashMap<String, String> commonHeaders = new HashMap<String, String>();
            commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
            commonHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
            commonHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
            UserThreadLocal.set(commonHeaders);
            return true;
        }
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("Authorization", request.getHeader("Authorization"));
        commonHeaders.put("USER_INFO", request.getHeader("USER_INFO"));
        commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
        commonHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
        commonHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
        UserThreadLocal.set(commonHeaders);
        TokenResponseDTO responseDTO = this.tokenService.validateToken();
        if (responseDTO.isValidationSuccess()) {
            Map userInfo = responseDTO.getUserInfo();
            String decryptUserInfo = userInfo.get("decryptUserInfo").toString();
            UserThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", decryptUserInfo.split("#")[0]);
            UserThreadLocal.get().put("USER_ORG_ID", decryptUserInfo.split("#")[5]);
        } else if (responseDTO.isTokenExpired()) {
            throw new AuthorizationException("AU001", "Jwt Token Expired");
        }
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserThreadLocal.set(null);
        super.postHandle(request, response, handler, modelAndView);
    }
}

