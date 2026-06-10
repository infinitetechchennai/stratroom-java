/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.resource.util.StatusUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.user.resource.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class StatusUtil {
    private Logger logger = LoggerFactory.getLogger(StatusUtil.class);

    public Map<String, Integer> updateStatus(Map<String, Object> stringObjectsMap, Map<String, Integer> countMap) {
        String dateRange;
        int greenCount = 0;
        int redCount = 0;
        int yellowCount = 0;
        if (countMap == null) {
            countMap = new LinkedHashMap<String, Integer>();
            countMap.put("GREEN", 0);
            countMap.put("YELLOW", 0);
            countMap.put("RED", 0);
        } else {
            greenCount = countMap.get("GREEN");
            yellowCount = countMap.get("YELLOW");
            redCount = countMap.get("RED");
        }
        double perDayValue = 0.0;
        double expecedPercent = 0.0;
        double defaultThreshold1 = 30.0;
        double defaultThreshold2 = 70.0;
        String[] dataRanges = null;
        double progress = 0.0;
        boolean dueDateCrossed = false;
        try {
            double d = progress = Objects.nonNull(stringObjectsMap.get("progressval")) ? Double.valueOf(stringObjectsMap.get("progressval").toString()) : 0.0;
            if (progress == 0.0) {
                progress = Objects.nonNull(stringObjectsMap.get("progress")) ? Double.valueOf(stringObjectsMap.get("progress").toString()) : 0.0;
            }
        }
        catch (NumberFormatException nfe) {
            progress = 0.0;
        }
        String string = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        if (dateRange == null) {
            String string2 = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
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
            for (SimpleDateFormat pattern : knownPatterns) {
                try {
                    firstDate = pattern.parse(startDate);
                    secondDate = pattern.parse(endDate);
                }
                catch (ParseException pe) {
                    this.logger.error("parser exception for unknown pattern " + pattern);
                }
            }
            Long difference = ChronoUnit.DAYS.between(firstDate.toInstant(), secondDate.toInstant());
            perDayValue = Integer.valueOf(((Object)difference).toString()) == 0 ? 100.0 : (double)(100 / Integer.valueOf(((Object)difference).toString()));
            Date curDate = new Date();
            if (curDate.after(secondDate)) {
                dueDateCrossed = true;
                curDate = secondDate;
            }
            Long diffFromCurrentDate = ChronoUnit.DAYS.between(firstDate.toInstant(), curDate.toInstant());
            expecedPercent = perDayValue * (double)Integer.valueOf(((Object)diffFromCurrentDate).toString()).intValue();
        } else {
            String startDate = dataRanges[0].trim();
            ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
            knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
            knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
            Date firstDate = null;
            for (SimpleDateFormat pattern : knownPatterns) {
                try {
                    firstDate = pattern.parse(startDate);
                }
                catch (ParseException pe) {
                    this.logger.error("parser exception for unknown pattern " + pattern);
                }
            }
            Date curDate = new Date();
            if (curDate.after(firstDate)) {
                dueDateCrossed = true;
                curDate = firstDate;
            }
        }
        if (progress == 100.0) {
            stringObjectsMap.put("statusLight", "progress-bar-success width-per-100 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (dueDateCrossed && progress < 100.0) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
        } else if (progress >= defaultThreshold2) {
            stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (progress > defaultThreshold1 && progress < defaultThreshold2) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-40 rounded-pill bar_height yellow_bar");
            stringObjectsMap.put("statusIndicator", "YELLOW");
            countMap.put("YELLOW", yellowCount + 1);
        } else {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
        }
        return countMap;
    }

    public void updateStatusByProgress(Map<String, Object> stringObjectsMap) {
        String status;
        String dateRange;
        String endDate = null;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        if (dateRange == null) {
            String string2 = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
        if (Objects.nonNull(dateRange)) {
            dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        String string3 = status = Objects.nonNull(stringObjectsMap.get("status")) ? stringObjectsMap.get("status").toString() : "";
        if (dataRanges != null && dataRanges.length > 1) {
            endDate = dataRanges[1].trim();
        } else if (dataRanges != null && dataRanges.length > 0) {
            endDate = dataRanges[0].trim();
        }
        ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
        knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
        knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
        Date endDateObj = null;
        boolean dueDateCrossed = false;
        for (SimpleDateFormat pattern : knownPatterns) {
            try {
                Date curDate = new Date();
                endDateObj = pattern.parse(endDate);
                if (!curDate.after(endDateObj)) continue;
                dueDateCrossed = true;
            }
            catch (Exception pe) {
                this.logger.error("parser exception for unknown pattern " + pattern);
            }
        }
        if (dueDateCrossed) {
            if ("Completed".equalsIgnoreCase(status)) {
                stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
                stringObjectsMap.put("statusIndicator", "GREEN");
            } else {
                stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
                stringObjectsMap.put("statusIndicator", "RED");
            }
        } else {
            stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
        }
    }

    private String calculateStatusLight(Map<String, Integer> countMap) {
        boolean oneKey;
        Map<String, Integer> filteredMap = countMap.entrySet().stream().filter(entry -> (Integer)entry.getValue() != 0).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        if (filteredMap == null || filteredMap.isEmpty()) {
            return "RED";
        }
        boolean bl = oneKey = filteredMap.keySet().size() == 1;
        if (oneKey) {
            return (String)filteredMap.keySet().stream().findFirst().get();
        }
        long max = countMap.values().stream().max(Comparator.naturalOrder()).get().intValue();
        String statusLight = countMap.entrySet().stream().filter(e -> (long)((Integer)e.getValue()).intValue() == max).map(Map.Entry::getKey).findFirst().get();
        return statusLight.equalsIgnoreCase("RED") ? statusLight : "YELLOW";
    }
}

