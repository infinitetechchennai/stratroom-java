/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.exception.ExceptionLogHelper
 *  com.estrat.backend.db.resource.util.DateUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.exception.ExceptionLogHelper;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DateUtil {
    private static Logger log = LoggerFactory.getLogger(DateUtil.class);

    public static String mapToString(LocalDateTime localDateTime, String format) {
        String formatteddDate = "";
        if (localDateTime != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat(format);
            formatteddDate = dateFormat.format(Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant()));
        }
        return formatteddDate;
    }

    public static Date getStringTODateDDMMYYYY(String date) {
        Date result = null;
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        if (date != null) {
            try {
                result = formatter.parse(date);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }

    public static String mapToString(LocalDate localDateTime, String format) {
        String formatteddDate = "";
        if (localDateTime != null) {
            DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern(format);
            formatteddDate = dateFormat.format(localDateTime);
        }
        return formatteddDate;
    }

    public static String mapToDBString(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formatteddDate = dateFormat.format(date);
        return formatteddDate;
    }

    public static LocalDate mapToObject(String date, String format) {
        try {
            if (StringUtils.isNotEmpty((CharSequence)date)) {
                DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern(format);
                LocalDate formatteddDate = LocalDate.parse(date.trim(), dateFormat);
                return formatteddDate;
            }
            return null;
        }
        catch (Exception e) {
            log.error(("Exception Occured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public static LocalDateTime convertDateTimeObject(String date, String zoneId) {
        try {
            if (StringUtils.isNotEmpty((CharSequence)date)) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy hh:mm a");
                dateFormat.setTimeZone(TimeZone.getTimeZone(ZoneId.of(zoneId)));
                Date formattedDate = dateFormat.parse(date.trim());
                ZonedDateTime timeUTC = formattedDate.toInstant().atZone(ZoneOffset.UTC);
                return timeUTC.toLocalDateTime();
            }
            return null;
        }
        catch (Exception e) {
            log.error(("Exception Occured " + ExceptionLogHelper.convertToString((Exception)e)));
            return null;
        }
    }

    public static String mapToString() {
        String formatteddDate = "";
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
        formatteddDate = dateFormat.format(new Date());
        return formatteddDate;
    }

    public static LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
    }

    public LocalDateTime getFirstDateTime(Date date) {
        String datePattern24Hrs = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat24Hrs = new SimpleDateFormat(datePattern24Hrs);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 0);
        calendar.set(12, 0);
        calendar.set(13, 0);
        calendar.set(14, 0);
        Date dateTime = calendar.getTime();
        String dateTimeIn24Hrs = simpleDateFormat24Hrs.format(dateTime);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeIn24Hrs, formatter);
        return localDateTime;
    }

    public LocalDateTime getSecondDateTime(Date date) {
        String datePattern24Hrs = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat simpleDateFormat24Hrs = new SimpleDateFormat(datePattern24Hrs);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(11, 23);
        calendar.set(12, 59);
        calendar.set(13, 59);
        calendar.set(14, 59);
        Date dateTime = calendar.getTime();
        String dateTimeIn24Hrs = simpleDateFormat24Hrs.format(dateTime);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.parse(dateTimeIn24Hrs, formatter);
        return localDateTime;
    }
}

