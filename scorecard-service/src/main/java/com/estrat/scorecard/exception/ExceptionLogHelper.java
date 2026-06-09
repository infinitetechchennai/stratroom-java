/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.exception.ExceptionLogHelper
 *  Logger
 */
package com.estrat.scorecard.exception;

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
            logger.error("Exception while converting exception ", e);
            return null;
        }
    }
}

