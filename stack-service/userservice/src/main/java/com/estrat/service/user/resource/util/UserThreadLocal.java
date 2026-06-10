/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.resource.util.UserThreadLocal
 */
package com.estrat.service.user.resource.util;

import java.util.Map;

public class UserThreadLocal {
    public static final ThreadLocal<Map<String, String>> userThreadLocal = new ThreadLocal();

    public static void set(Map<String, String> tracker) {
        if (null == tracker) {
            userThreadLocal.remove();
        } else {
            userThreadLocal.set(tracker);
        }
    }

    public static Map<String, String> get() {
        return (Map)userThreadLocal.get();
    }
}

