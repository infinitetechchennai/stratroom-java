/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonHandlerInterceptor
 *  com.estrat.web.dto.TokenResponseDTO
 *  com.estrat.web.exception.AuthorizationException
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.core.annotation.Order
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.web.servlet.HandlerInterceptor
 *  org.springframework.web.servlet.ModelAndView
 */
package com.estrat.web.config;

import com.estrat.web.dto.TokenResponseDTO;
import com.estrat.web.exception.AuthorizationException;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Configuration
@Order(value=-2147483648)
public class CommonHandlerInterceptor
implements HandlerInterceptor {
    private Logger logger = LoggerFactory.getLogger(CommonHandlerInterceptor.class);
    @Value(value="${authservice.url}")
    private String authUrl;
    @Value(value="${jwt.generation.enabled}")
    private boolean jwtGeneration;
    @Value(value="${date.management.url}")
    private String dataUrl;
    @Autowired
    private EmployeeService employeeService;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getHeader("Authorization") != null) {
            if (!UserThreadLocal.get().isAuthenticated()) {
                if (request.getAttribute("loginFlag") != null) {
                    throw new AuthorizationException("AU001", request.getAttribute("loginFlag").toString());
                }
                throw new AuthorizationException("AU001", "Authentication failed for token provided");
            }
            Enumeration headers = request.getHeaderNames();
            while (headers.hasMoreElements()) {
                String header = (String)headers.nextElement();
                if (!StringUtils.isNotEmpty((CharSequence)header)) continue;
                UserThreadLocal.get().getCommonHeaders().put(header, request.getHeader(header));
            }
            UserThreadLocal.get().getCommonHeaders().remove("Authorization");
        }
        if (request.getHeader("Authorization") == null) {
            this.handleInterceptForWebFlow(request);
        }
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (request.getHeader("Authorization") != null) {
            SecurityContextHolder.clearContext();
        }
    }

    private void handleInterceptForWebFlow(HttpServletRequest request) throws RequestException {
        if (!UserThreadLocal.get().isSsoLoginSuccess()) {
            throw new AuthorizationException("AU001", "SSO Authorization failed for given user");
        }
        if (UserThreadLocal.get() != null && request.getSession().getAttribute("datePeriod") != null) {
            UserThreadLocal.get().setDatePeriod(request.getSession().getAttribute("datePeriod").toString());
        }
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getUserInfo())) {
            UserThreadLocal.get().getCommonHeaders().put("USER_INFO", UserThreadLocal.get().getUserInfo());
        }
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getDatePeriod())) {
            UserThreadLocal.get().getCommonHeaders().put("DATE_PERIOD", UserThreadLocal.get().getDatePeriod());
        }
        if (UserThreadLocal.get() != null && UserThreadLocal.get().getExpireAt() != null && this.jwtGeneration && request.getHeader("Authorization") == null) {
            Date expireTime = UserThreadLocal.get().getExpireAt();
            this.logger.debug(("Original expire time " + expireTime));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(expireTime);
            calendar.set(13, calendar.get(13) - 30);
            this.logger.debug(("Expire time after deduct 30 seconds " + calendar.getTime()));
            boolean expireFlag = calendar.getTime().before(new Date());
            if (expireFlag) {
                UserThreadLocal.get().getCommonHeaders().put("USER_INFO", UserThreadLocal.get().getUserInfo());
                UserThreadLocal.get().getCommonHeaders().put("REFRESH_TOKEN", UserThreadLocal.get().getRefreshToken());
                try {
                    TokenResponseDTO tokenResponse = this.employeeService.refreshToken();
                    this.logger.error(("Token Expired created new token " + tokenResponse.getToken()));
                    UserThreadLocal.get().setExpireAt(tokenResponse.getExpireAt());
                    UserThreadLocal.get().setJwtToken(tokenResponse.getToken());
                    UserThreadLocal.get().setDataManagementUrl(String.join((CharSequence)"?jwtToken=", this.dataUrl, tokenResponse.getToken()));
                    if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                        request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
                    } else {
                        request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
                        request.getSession().setAttribute("principal", UserThreadLocal.get());
                    }
                }
                catch (Exception ex) {
                    this.logger.error("Token Expired session invalidate ");
                    request.getSession().invalidate();
                    throw new RequestException("Token refresh failed", (Throwable)ex);
                }
            }
        }
    }
}

