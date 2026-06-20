/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonControllerInterceptor
 *  com.estrat.backend.scorecard.dto.TokenResponseDTO
 *  com.estrat.backend.scorecard.exception.AuthorizationException
 *  com.estrat.backend.scorecard.service.TokenService
 *  com.estrat.backend.scorecard.util.DateUtil
 *  com.estrat.backend.scorecard.util.HeaderThreadLocal
 *  com.estrat.backend.scorecard.util.KPIThreadLocal
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.web.servlet.ModelAndView
 *  org.springframework.web.servlet.handler.HandlerInterceptorAdapter
 */
package com.estrat.backend.scorecard.config;

import com.estrat.backend.scorecard.dto.TokenResponseDTO;
import com.estrat.backend.scorecard.exception.AuthorizationException;
import com.estrat.backend.scorecard.service.TokenService;
import com.estrat.backend.scorecard.util.DateUtil;
import com.estrat.backend.scorecard.util.HeaderThreadLocal;
import com.estrat.backend.scorecard.util.KPIThreadLocal;
import com.estrat.backend.scorecard.util.UserThreadLocal;
import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.HandlerInterceptor;

public class CommonControllerInterceptor
implements HandlerInterceptor {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private DateUtil dateUtil;
    @Value(value="${jwt.verification.enabled}")
    private boolean jwtVerification;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HashMap<String, String> commonThreadHeaders = new HashMap<String, String>();
        commonThreadHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
        commonThreadHeaders.put("DATE_PERIOD", request.getHeader("DATE_PERIOD"));
        commonThreadHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
        commonThreadHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
        commonThreadHeaders.put("LOGGED_IN_DEPT_ID", request.getHeader("LOGGED_IN_DEPT_ID"));
        commonThreadHeaders.put("LOGGED_IN_DEPT_ID_FIELD", request.getHeader("LOGGED_IN_DEPT_ID_FIELD"));
        HeaderThreadLocal.set(commonThreadHeaders);
        UserThreadLocal.set(commonThreadHeaders);
        this.dateUtil.populateCalendarYear();
        if (StringUtils.isNotEmpty((CharSequence)request.getHeader("PRELOGINAPI"))) {
            return true;
        }
        if (!this.jwtVerification) {
            HashMap<String, String> commonHeaders = new HashMap<String, String>();
            commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
            commonHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
            commonHeaders.put("DATE_PERIOD", request.getHeader("DATE_PERIOD"));
            commonHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
            commonThreadHeaders.put("LOGGED_IN_DEPT_ID", request.getHeader("LOGGED_IN_DEPT_ID"));
            commonThreadHeaders.put("LOGGED_IN_DEPT_ID_FIELD", request.getHeader("LOGGED_IN_DEPT_ID_FIELD"));
            UserThreadLocal.set(commonHeaders);
            return true;
        }
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("Authorization", request.getHeader("Authorization"));
        commonHeaders.put("USER_INFO", request.getHeader("USER_INFO"));
        UserThreadLocal.set(commonHeaders);
        TokenResponseDTO responseDTO = this.tokenService.validateToken();
        if (responseDTO.isValidationSuccess()) {
            Map userInfo = responseDTO.getUserInfo();
            String decryptUserInfo = userInfo.get("decryptUserInfo").toString();
            if (StringUtils.isNotEmpty((CharSequence)request.getHeader("LOGGED_IN_EMPLOYEE_ID"))) {
                if (request.getHeader("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(decryptUserInfo.split("#")[0])) {
                    UserThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", decryptUserInfo.split("#")[0]);
                } else {
                    UserThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
                }
            } else {
                UserThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", decryptUserInfo.split("#")[0]);
            }
            UserThreadLocal.get().put("ALL_REPORTEE_ID", decryptUserInfo.split("#")[3]);
            UserThreadLocal.get().put("USER_ORG_ID", decryptUserInfo.split("#")[5]);
            UserThreadLocal.get().put("DATE_PERIOD", request.getHeader("DATE_PERIOD"));
            UserThreadLocal.get().put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
            UserThreadLocal.get().put("LOGGED_IN_DEPT_ID", request.getHeader("LOGGED_IN_DEPT_ID"));
            UserThreadLocal.get().put("LOGGED_IN_DEPT_ID_FIELD", request.getHeader("LOGGED_IN_DEPT_ID_FIELD"));
        } else if (responseDTO.isTokenExpired()) {
            throw new AuthorizationException("AU001", "Jwt Token Expired");
        }
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        KPIThreadLocal.set(null);
        UserThreadLocal.set(null);
        
    }
}

