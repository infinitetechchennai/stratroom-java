/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.util.ServiceRequestThreadLocal
 *  com.estrat.service.util.UserPrincipal
 */
package com.estrat.service.util;

import com.estrat.service.util.UserPrincipal;

public class ServiceRequestThreadLocal {
    public static final ThreadLocal<UserPrincipal> requestThreadLocal = new ThreadLocal();

    public static void set(UserPrincipal tracker) {
        if (null == tracker) {
            requestThreadLocal.remove();
        } else {
            requestThreadLocal.set(tracker);
        }
    }

    public static UserPrincipal get() {
        return (UserPrincipal)requestThreadLocal.get();
    }
}

