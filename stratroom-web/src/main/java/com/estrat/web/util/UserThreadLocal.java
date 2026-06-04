/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 */
package com.estrat.web.util;

import com.estrat.web.util.UserPrincipal;

/*
 * Exception performing whole class analysis ignored.
 */
public class UserThreadLocal {
    public static final ThreadLocal<UserPrincipal> userThreadLocal = new ThreadLocal();

    public static void set(UserPrincipal tracker) {
        if (null == tracker) {
            userThreadLocal.remove();
        } else {
            userThreadLocal.set(tracker);
        }
    }

    public static UserPrincipal get() {
        if (userThreadLocal.get() == null) {
            UserThreadLocal.set((UserPrincipal)new UserPrincipal());
        }
        return (UserPrincipal)userThreadLocal.get();
    }
}

