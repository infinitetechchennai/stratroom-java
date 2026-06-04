/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.TempUserPrincipal
 *  com.estrat.web.util.TempUserThreadLocal
 */
package com.estrat.web.util;

import com.estrat.web.util.TempUserPrincipal;

/*
 * Exception performing whole class analysis ignored.
 */
public class TempUserThreadLocal {
    public static final ThreadLocal<TempUserPrincipal> tempUserThreadLocal = new ThreadLocal();

    public static void set(TempUserPrincipal tracker) {
        if (null == tracker) {
            tempUserThreadLocal.remove();
        } else {
            tempUserThreadLocal.set(tracker);
        }
    }

    public static TempUserPrincipal get() {
        if (tempUserThreadLocal.get() == null) {
            TempUserThreadLocal.set((TempUserPrincipal)new TempUserPrincipal());
        }
        return (TempUserPrincipal)tempUserThreadLocal.get();
    }
}

