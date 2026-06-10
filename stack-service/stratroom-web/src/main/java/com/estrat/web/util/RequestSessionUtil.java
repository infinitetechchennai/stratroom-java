/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.TempUserPrincipal
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.Employee;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.TempUserPrincipal;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RequestSessionUtil {
    @Autowired
    public EmployeeService employeeService;
    @Autowired
    public RoleService roleService;

    public String getSessionId(HttpServletRequest request) {
        String empId = null;
        if (StringUtils.isNotEmpty((CharSequence)request.getHeader("useraccessid")) || request.getSession().getAttribute("tempUserId") != null) {
            empId = request.getSession().getAttribute("tempUserId") != null ? request.getSession().getAttribute("tempUserId").toString() : request.getHeader("useraccessid");
            this.updateSession(empId, request);
        } else {
            empId = UserThreadLocal.get().getProfile().getEmpId();
            this.updateTokenSession(request);
        }
        return empId;
    }

    public void updateSession(String empId, HttpServletRequest request) {
        Employee employee = this.employeeService.getProfileDetails(empId);
        TempUserPrincipal principal = new TempUserPrincipal();
        principal.setProfile(employee);
        principal.setLicenseResponseDTO(this.employeeService.validateLicense());
        Map permissions = RoleUtil.filterPermissionModules((Map)this.roleService.getTempUserPermissions(empId), (List)this.employeeService.validateLicense().getModuleList());
        principal.setUserPermissions(permissions);
        TempUserThreadLocal.set((TempUserPrincipal)principal);
        this.updateHeader(request);
        this.updateTokenSession(request);
    }

    public void updateTokenSession(HttpServletRequest request) {
        if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
            request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
            request.getSession().setAttribute("principal", UserThreadLocal.get());
        } else {
            request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
            request.getSession().setAttribute("principal", UserThreadLocal.get());
        }
        this.updateHeader(request);
    }

    public void updateHeader(HttpServletRequest request) {
        HeaderThreadLocal.set((Map)UserThreadLocal.get().getCommonHeaders());
        if (request.getSession().getAttribute("tempUserId") != null) {
            String empId = request.getSession().getAttribute("tempUserId").toString();
            if (request.getSession().getAttribute("tempdeptId") != null) {
                HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID", request.getSession().getAttribute("tempdeptId").toString());
                HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID_FIELD", request.getSession().getAttribute("tempdeptIdField").toString());
            } else {
                HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID", String.valueOf(UserThreadLocal.get().getProfile().getDeptId()));
                HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID_FIELD", String.valueOf(UserThreadLocal.get().getProfile().getDeptDetails().getId()));
            }
            HeaderThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", empId);
            HeaderThreadLocal.get().put("SUPER_USER_ID", UserThreadLocal.get().getProfile().getEmpId());
        } else {
            HeaderThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", UserThreadLocal.get().getProfile().getEmpId());
            HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID", String.valueOf(UserThreadLocal.get().getProfile().getDeptId()));
            if (UserThreadLocal.get().getProfile().getDeptDetails() != null) {
                HeaderThreadLocal.get().put("LOGGED_IN_DEPT_ID_FIELD", String.valueOf(UserThreadLocal.get().getProfile().getDeptDetails().getId()));
            }
        }
        HeaderThreadLocal.get().put("USER_ORG_ID", String.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()));
    }

    public void clearSession() {
        UserThreadLocal.set(null);
        HeaderThreadLocal.set(null);
        TempUserThreadLocal.set(null);
    }

    public Boolean getCheckSuper(HttpServletRequest request) {
        Boolean status = false;
        if (StringUtils.isNotEmpty((CharSequence)request.getHeader("useraccessid")) || request.getSession().getAttribute("tempUserId") != null) {
            status = true;
        }
        return status;
    }
}

