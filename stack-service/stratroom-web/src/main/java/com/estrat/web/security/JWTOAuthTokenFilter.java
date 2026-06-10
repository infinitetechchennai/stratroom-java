/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.TokenResponseDTO
 *  com.estrat.web.security.JWTOAuthTokenFilter
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.FilterChain
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.authority.AuthorityUtils
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.security.core.userdetails.User
 *  org.springframework.web.filter.OncePerRequestFilter
 */
package com.estrat.web.security;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.TokenResponseDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.UserPrincipal;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTOAuthTokenFilter
extends OncePerRequestFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JWTOAuthTokenFilter.class);
    private EmployeeService employeeService;
    private AuditTrailService auditTrailService;
    private String contextPath;

    public JWTOAuthTokenFilter(EmployeeService employeeService, AuditTrailService auditTrailService, String contextPath) {
        this.employeeService = employeeService;
        this.auditTrailService = auditTrailService;
        this.contextPath = contextPath;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getHeader("Authorization") != null) {
            try {
                String jwtToken = request.getHeader("Authorization").substring(7);
                UserThreadLocal.get().setJwtToken(jwtToken);
                TokenResponseDTO tokenResponseDTO = this.employeeService.validateToken();
                UserThreadLocal.get().getCommonHeaders().put("PRELOGINAPI", "");
                if (tokenResponseDTO.isValidationSuccess()) {
                    request.getSession().invalidate();
                    String userInfo = tokenResponseDTO.getUserInfo().get("decryptUserInfo").toString();
                    Map userPermissions = (Map)tokenResponseDTO.getUserInfo().get("userPermissions");
                    String userName = userInfo.split("#")[1];
                    String password = userInfo.split("#")[2];
                    Employee employeeProfile = new Employee();
                    employeeProfile.setEmpId(userInfo.split("#")[0]);
                    UserThreadLocal.get().setProfile(employeeProfile);
                    UserPrincipal userPrincipal = null;
                    userPrincipal = request.getSession().getAttribute("principal") != null ? (UserPrincipal)request.getSession().getAttribute("principal") : (UserPrincipal)request.getSession().getAttribute("userPrincipal");
                    employeeProfile = userPrincipal != null && userPrincipal.getProfile() != null ? this.employeeService.getProfileDetails(userPrincipal.getProfile().getEmpId()) : this.employeeService.getProfileDetails(UserThreadLocal.get().getProfile().getEmpId());
                    Long count = this.employeeService.getOrgUserCount(employeeProfile.getOrgDetails().getOrgId());
                    if (count > UserThreadLocal.get().getLicenseResponseDTO().getTotalAllowedUsers()) {
                        request.setAttribute("loginFlag", "User count higher than enrolled users in license please remove users to match with license");
                        request.getRequestDispatcher("/authfail").forward((ServletRequest)request, (ServletResponse)response);
                    } else {
                        Map permissions = RoleUtil.filterPermissionModules((Map)userPermissions, (List)UserThreadLocal.get().getLicenseResponseDTO().getModuleList());
                        UserThreadLocal.get().setUserPermissions(permissions);
                        UserThreadLocal.get().setAllReporteeIds(userInfo.split("#")[3]);
                        UserThreadLocal.get().setProfile(employeeProfile);
                        UserThreadLocal.get().setExpireAt(tokenResponseDTO.getExpireAt());
                        UserThreadLocal.get().setUserInfo(userInfo);
                        List authority = (List)tokenResponseDTO.getUserInfo().get("authorities");
                        List grantedAuths = AuthorityUtils.createAuthorityList((String[])authority.toArray(new String[authority.size()]));
                        User userDetails = new User(userName, password, (Collection)grantedAuths);
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, password, (Collection)grantedAuths);
                        SecurityContextHolder.getContext().setAuthentication((Authentication)auth);
                        UserThreadLocal.get().setAuthenticated(true);
                    }
                } else {
                    System.out.println("Else error");
                    UserThreadLocal.get().setAuthenticated(false);
                    SecurityContextHolder.clearContext();
                }
            }
            catch (Exception e) {
                this.auditTrailService.clearLogOutUser();
                UserThreadLocal.get().setAuthenticated(false);
                SecurityContextHolder.clearContext();
                LOGGER.error("Validation failed", (Throwable)e);
            }
            if (UserThreadLocal.get().isAuthenticated()) {
                request.getRequestDispatcher(request.getRequestURI().replaceAll(this.contextPath, "")).forward((ServletRequest)request, (ServletResponse)response);
            } else {
                request.getRequestDispatcher("/authfail").forward((ServletRequest)request, (ServletResponse)response);
            }
        } else {
            filterChain.doFilter((ServletRequest)request, (ServletResponse)response);
        }
    }
}

