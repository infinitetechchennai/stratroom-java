/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.PermissionLocal
 *  com.estrat.web.util.PermissionPricipal
 */
package com.estrat.web.util;

import com.estrat.web.util.PermissionPricipal;

/*
 * Exception performing whole class analysis ignored.
 */
public class PermissionLocal {
    public static final ThreadLocal<PermissionPricipal> permissionLocal = new ThreadLocal();

    public static void set(PermissionPricipal tracker) {
        if (null == tracker) {
            permissionLocal.remove();
        } else {
            permissionLocal.set(tracker);
        }
    }

    public static PermissionPricipal get() {
        if (permissionLocal.get() == null) {
            PermissionLocal.set((PermissionPricipal)new PermissionPricipal());
        }
        return (PermissionPricipal)permissionLocal.get();
    }
}

