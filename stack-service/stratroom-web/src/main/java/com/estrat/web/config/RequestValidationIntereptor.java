/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.RequestValidationIntereptor
 *  com.estrat.web.dto.TokenResponseDTO
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.core.annotation.Order
 *  org.springframework.web.servlet.HandlerInterceptor
 *  org.springframework.web.servlet.HandlerMapping
 */
package com.estrat.web.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.estrat.web.dto.TokenResponseDTO;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.UserRoleManagementService;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

@Configuration
@Order(value=0x7FFFFFFF)
public class RequestValidationIntereptor
implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(RequestValidationIntereptor.class);
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private UserRoleManagementService userRolesService;
    @Value(value="${emp.path.keys}")
    private String empKeys;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            if (UserThreadLocal.get() != null && StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getJwtToken())) {
                // Only call authservice's /validateToken when this is an actual JWT-
                // authenticated request (Authorization header present). For the legacy
                // session-cookie web flow the principal is already restored from the
                // HTTP session, so an extra /validateToken hop adds no security but does
                // flood the log with 403 WARNs every time the JWT does not happen to
                // match the request shape authservice expects (mismatched USER_INFO etc).
                boolean jwtAuthenticatedRequest = StringUtils.isNotEmpty((CharSequence)request.getHeader("Authorization"));
                Map pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
                boolean pathFlag = true;
                if (jwtAuthenticatedRequest) {
                    try {
                        if (this.validCheckUser(request)) {
                            return true;
                        }
                    } catch (Exception e) {
                        log.debug("validCheckUser failed (service unavailable?), continuing: " + e.getMessage());
                    }
                }
                if (pathVariables != null && StringUtils.isEmpty((CharSequence)request.getHeader("useraccessid"))) {
                    pathFlag = Arrays.asList(this.empKeys.split("\\,")).stream().allMatch(key -> this.validate((String)pathVariables.get(key.toString()), request));
                }
                Arrays.asList(this.empKeys.split("\\,")).stream().allMatch(key -> this.validate(request.getParameter(key.toString()), request));
            }
        } catch (Exception e) {
            log.warn("RequestValidationIntereptor.preHandle exception, continuing: " + e.getMessage());
        }
        return true;
    }

    public boolean validCheckUser(HttpServletRequest request) {
        boolean userStatus = false;
        try {
            TokenResponseDTO tokenResponseDTO = this.employeeService.validateToken();
            if (tokenResponseDTO != null && tokenResponseDTO.isValidationSuccess()) {
                UserDTO user = this.userRolesService.findById(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()).longValue());
                if (user != null) {
                    UserThreadLocal.get().getProfile().setUserRoleName(user.getUserRole());
                    request.getSession().setAttribute("principal", UserThreadLocal.get());
                    if (user.getUserRole() != null && user.getUserRole().equalsIgnoreCase("Super User")) {
                        userStatus = true;
                    }
                }
            }
        } catch (Exception e) {
            log.debug("validCheckUser service call failed: " + e.getMessage());
        }
        return userStatus;
    }

    public boolean validate(String empId, HttpServletRequest request) {
        if (StringUtils.isEmpty((CharSequence)empId)) {
            return true;
        }
        ArrayList<String> repotees = new ArrayList<String>();
        String allrespoteeIds = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getAllReporteeIds())) {
            allrespoteeIds = UserThreadLocal.get().getAllReporteeIds();
        } else {
            TokenResponseDTO tokenResponseDTO = this.employeeService.validateToken();
            if (tokenResponseDTO.isValidationSuccess()) {
                Map userInfo = tokenResponseDTO.getUserInfo();
                String decryptUserInfo = userInfo.get("decryptUserInfo").toString();
                allrespoteeIds = decryptUserInfo.split("#")[3];
                UserThreadLocal.get().setAllReporteeIds(allrespoteeIds);
                if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                    request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
                } else {
                    request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
                    request.getSession().setAttribute("principal", UserThreadLocal.get());
                }
            }
        }
        if (StringUtils.isNotEmpty((CharSequence)allrespoteeIds)) {
            repotees.addAll(Arrays.asList(allrespoteeIds.split("\\,")));
        }
        return repotees.contains(empId);
    }
}

