/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.resource.util.ProcessEnablerUtil
 */
package com.estrat.backend.db.resource.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ProcessEnablerUtil {
    public static Date getStringTimeTOTime(String time) {
        Date result = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
        try {
            result = dateFormat.parse(time);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public static String getTimeToStringTime(Date time) {
        String result = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
        try {
            result = dateFormat.format(time);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}

