/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.exception.ExceptionLogHelper
 *  org.apache.log4j.Logger
 */
package com.estrat.service.etl.exception;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.apache.log4j.Logger;

public class ExceptionLogHelper {
    private static Logger logger = Logger.getLogger(ExceptionLogHelper.class);

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

