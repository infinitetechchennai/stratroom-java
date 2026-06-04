/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.resource.util.UserThreadLocal
 */
package com.estrat.service.db.resource.util;

import java.util.HashMap;
import java.util.Map;

/*
 * Exception performing whole class analysis ignored.
 */
public class UserThreadLocal {
    public static final ThreadLocal<Map<String, String>> userThreadLocal = new ThreadLocal();

    public static void set(Map<String, String> tracker) {
        if (null == tracker) {
            userThreadLocal.remove();
        } else {
            userThreadLocal.set(tracker);
        }
    }

    public static String get() {
        if (userThreadLocal.get() == null) {
            UserThreadLocal.set(new HashMap());
        }
        return (String)((Map)userThreadLocal.get()).get("LOGGED_IN_EMPLOYEE_ID");
    }

    public static String get(String key) {
        if (userThreadLocal.get() == null) {
            UserThreadLocal.set(new HashMap());
        }
        return (String)((Map)userThreadLocal.get()).get(key);
    }

    public static Map<String, String> getHeaders() {
        if (userThreadLocal.get() == null) {
            UserThreadLocal.set(new HashMap());
        }
        return (Map)userThreadLocal.get();
    }
}

