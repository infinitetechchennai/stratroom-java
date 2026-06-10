/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.resource.util.AuditTrailLocal
 */
package com.estrat.backend.db.resource.util;

import java.util.HashMap;
import java.util.Map;

/*
 * Exception performing whole class analysis ignored.
 */
public class AuditTrailLocal {
    public static final ThreadLocal<Map<String, String>> auditThreadLocal = new ThreadLocal();

    public static void set(Map<String, String> tracker) {
        if (null == tracker) {
            auditThreadLocal.remove();
        } else {
            auditThreadLocal.set(tracker);
        }
    }

    public static Map<String, String> get() {
        if (auditThreadLocal.get() == null) {
            AuditTrailLocal.set(new HashMap());
        }
        return (Map)auditThreadLocal.get();
    }
}

