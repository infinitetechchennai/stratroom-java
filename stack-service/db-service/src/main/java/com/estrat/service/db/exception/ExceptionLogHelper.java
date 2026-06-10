/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.exception.ExceptionLogHelper
 *  org.apache.log4j.Logger
 */
package com.estrat.service.db.exception;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExceptionLogHelper {
    private static Logger logger = LoggerFactory.getLogger(ExceptionLogHelper.class);

    public static String convertToString(Exception argE) {
        try {
            ByteArrayOutputStream pvBAOS = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(pvBAOS);
            argE.printStackTrace(ps);
            return pvBAOS.toString();
        }
        catch (Exception e) {
            logger.error((Object)"Exception while converting exception ", (Throwable)e);
            return null;
        }
    }
}

