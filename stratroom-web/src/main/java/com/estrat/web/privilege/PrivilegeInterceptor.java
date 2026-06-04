/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.exception.AuthorizationException
 *  com.estrat.web.privilege.Privilege
 *  com.estrat.web.privilege.PrivilegeInterceptor
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.aopalliance.intercept.MethodInterceptor
 *  org.aopalliance.intercept.MethodInvocation
 */
package com.estrat.web.privilege;

import com.estrat.web.exception.AuthorizationException;
import com.estrat.web.privilege.Privilege;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.Map;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

public class PrivilegeInterceptor
implements MethodInterceptor {
    private RoleService roleService;

    public PrivilegeInterceptor(RoleService roleService) {
        this.roleService = roleService;
    }

    public Object invoke(MethodInvocation invocation) throws Throwable {
        Privilege privilege = invocation.getMethod().getAnnotation(Privilege.class);
        if (privilege == null) {
            return invocation.proceed();
        }
        Map privMap = this.roleService.getUserPermissions(UserThreadLocal.get().getProfile().getEmpId());
        boolean privFlag = RoleUtil.validatePrivileges((String[])privilege.modules(), (String[])privilege.privleges(), (boolean)privilege.matchAll(), (Map)privMap);
        if (!privFlag) {
            throw new AuthorizationException("AU001", "Authorization failed to access this module");
        }
        return invocation.proceed();
    }
}

