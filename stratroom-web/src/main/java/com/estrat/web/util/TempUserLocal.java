/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.TempUserLocal
 */
package com.estrat.web.util;

import java.util.HashMap;
import java.util.Map;

/*
 * Exception performing whole class analysis ignored.
 */
public class TempUserLocal {
    public static final ThreadLocal<Map<String, String>> tempUserLocal = new ThreadLocal();

    public static void set(Map<String, String> tracker) {
        if (null == tracker) {
            tempUserLocal.remove();
        } else {
            tempUserLocal.set(tracker);
        }
    }

    public static String get() {
        if (tempUserLocal.get() == null) {
            TempUserLocal.set(new HashMap());
        }
        return (String)((Map)tempUserLocal.get()).get("userFlag");
    }
}

