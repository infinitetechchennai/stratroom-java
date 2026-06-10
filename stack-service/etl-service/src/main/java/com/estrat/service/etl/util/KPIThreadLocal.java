/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.util.KPIThreadLocal
 */
package com.estrat.service.etl.util;

import java.util.HashMap;
import java.util.Map;

/*
 * Exception performing whole class analysis ignored.
 */
public class KPIThreadLocal {
    public static final ThreadLocal<Map<String, Object>> kpiThreadLocal = new ThreadLocal();

    public static void set(Map<String, Object> tracker) {
        if (null == tracker) {
            kpiThreadLocal.remove();
        } else {
            kpiThreadLocal.set(tracker);
        }
    }

    public static Map<String, Object> get() {
        if (kpiThreadLocal.get() == null) {
            KPIThreadLocal.set(new HashMap());
        }
        return (Map)kpiThreadLocal.get();
    }
}

