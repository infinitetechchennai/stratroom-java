/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.privilege.PrivilegeAdvisor
 *  com.estrat.web.privilege.PrivilegeInterceptor
 *  org.aopalliance.aop.Advice
 *  org.springframework.aop.Pointcut
 *  org.springframework.aop.support.AbstractPointcutAdvisor
 *  org.springframework.aop.support.StaticMethodMatcherPointcut
 */
package com.estrat.web.privilege;

import com.estrat.web.privilege.PrivilegeInterceptor;
import org.aopalliance.aop.Advice;
import org.springframework.aop.Pointcut;
import org.springframework.aop.support.AbstractPointcutAdvisor;
import org.springframework.aop.support.StaticMethodMatcherPointcut;

public class PrivilegeAdvisor
extends AbstractPointcutAdvisor {
    private PrivilegeInterceptor privilegeInterceptor;
    private static final transient StaticMethodMatcherPointcut staticPointCut = new org.springframework.aop.support.StaticMethodMatcherPointcut() {
        public boolean matches(java.lang.reflect.Method method, Class<?> targetClass) {
            return targetClass != null && targetClass.getName() != null && targetClass.getName().startsWith("com.estrat");
        }
    };

    public PrivilegeAdvisor(PrivilegeInterceptor privilegeInterceptor) {
        this.privilegeInterceptor = privilegeInterceptor;
    }

    public Pointcut getPointcut() {
        return staticPointCut;
    }

    public Advice getAdvice() {
        return this.privilegeInterceptor;
    }
}

