/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.util.ServiceRequestThreadLocal
 *  com.estrat.backend.auth.util.UserPrincipal
 */
package com.estrat.backend.auth.util;

import com.estrat.backend.auth.util.UserPrincipal;

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

