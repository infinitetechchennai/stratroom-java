/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.exception.ExceptionLogHelper
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.util.DateUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 */
package com.estrat.web.util;

import com.estrat.web.exception.ExceptionLogHelper;
import com.estrat.web.exception.RequestException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Exception performing whole class analysis ignored.
 */
public class DateUtil {
    private static Logger log = LoggerFactory.getLogger(DateUtil.class);

    public static String mapToString(LocalDateTime localDateTime) {
        String formatteddDate = "";
        if (localDateTime != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
            formatteddDate = dateFormat.format(Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant()));
        }
        return formatteddDate;
    }

    public static String mapToDBString(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formatteddDate = dateFormat.format(date);
        return formatteddDate;
    }

    public static Date mapToObject(String date) throws RequestException {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date formatteddDate = dateFormat.parse(date);
            return formatteddDate;
        }
        catch (Exception e) {
            log.error(("Exception Occured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RequestException((Throwable)e);
        }
    }

    public static boolean validateCalendarYear(String period) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        try {
            Date startDate = dateFormat.parse(period.split("\\-")[0].trim());
            Date endDate = dateFormat.parse(period.split("\\-")[1].trim());
            int totalFrequency = DateUtil.findTotalFrequency((Date)startDate, (Date)endDate);
            if (totalFrequency == 365 || totalFrequency == 364) {
                return true;
            }
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public static int findTotalFrequency(Date startDate, Date endDate) {
        long DAY_IN_MILLIS = 86400000L;
        int diffInDays = (int)((startDate.getTime() - endDate.getTime()) / 86400000L);
        return Math.abs(diffInDays);
    }

    public static Map<String, Object> singleDateFormatDates(Map<String, Object> objectMap, String type) {
        Map<String, Object> stringObjectsMap = objectMap;
        String[] dataRanges = null;
        String endDate = null;
        String dateRange = null;
        if (type.equals("risk")) {
            dateRange = stringObjectsMap.get("dateCompleted") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateCompleted").toString()) ? stringObjectsMap.get("dateCompleted").toString() : null;
        } else {
            String string = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
        if (dateRange != null) {
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            endDate = dataRanges != null && dataRanges.length > 1 ? dataRanges[1].trim() : (dataRanges != null && dataRanges.length > 1 ? dataRanges[0].trim() : dateRange);
            ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
            knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
            knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
            Date secondDate = null;
            for (Object _obj_pattern : knownPatterns) {
                SimpleDateFormat pattern = (SimpleDateFormat) _obj_pattern;
                try {
                    secondDate = pattern.parse(endDate);
                }
                catch (ParseException parseException) {}
            }
            try {
                SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
                String strDate = formatter.format(secondDate);
                stringObjectsMap.put("dateString", strDate);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return stringObjectsMap;
    }

    public static Map<String, Object> formatDates(Map<String, Object> objectMap, String type) {
        Map<String, Object> stringObjectsMap = objectMap;
        String[] dataRanges = null;
        String dateRange = null;
        if (type.equals("initiative")) {
            dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        } else {
            String string = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
        if (dateRange != null) {
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
                knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
                knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
                Date firstDate = null;
                Date secondDate = null;
                for (Object _obj_pattern : knownPatterns) {
                    SimpleDateFormat pattern = (SimpleDateFormat) _obj_pattern;
                    try {
                        firstDate = pattern.parse(startDate);
                        secondDate = pattern.parse(endDate);
                    }
                    catch (ParseException parseException) {}
                }
                try {
                    SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
                    String strDate = formatter.format(firstDate);
                    String enDate = formatter.format(secondDate);
                    stringObjectsMap.put("dateString", strDate + " - " + enDate);
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return stringObjectsMap;
    }
}

