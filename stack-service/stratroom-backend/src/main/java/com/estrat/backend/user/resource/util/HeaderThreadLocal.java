/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.resource.util.HeaderThreadLocal
 */
package com.estrat.backend.user.resource.util;

import java.util.Map;

public class HeaderThreadLocal {
    public static final ThreadLocal<Map<String, String>> headerThreadLocal = new ThreadLocal();

    public static void set(Map<String, String> tracker) {
        if (null == tracker) {
            headerThreadLocal.remove();
        } else {
            headerThreadLocal.set(tracker);
        }
    }

    public static Map<String, String> get() {
        return (Map)headerThreadLocal.get();
    }
}

