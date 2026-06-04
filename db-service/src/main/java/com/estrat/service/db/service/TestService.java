/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.service.TestService
 */
package com.estrat.service.db.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestService {
    public static void main(String[] args) throws Exception {
    }

    public static String modifyDateLayout(String inputDate) throws ParseException {
        Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").parse(inputDate);
        return new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(date);
    }
}

