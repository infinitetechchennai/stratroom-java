/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.ControlPanelGeneralDTO
 *  com.estrat.service.etl.exception.ExceptionLogHelper
 *  com.estrat.service.etl.exception.RequestException
 *  com.estrat.service.etl.service.DBService
 *  com.estrat.service.etl.service.KPIService
 *  com.estrat.service.etl.util.DateUtil
 *  com.estrat.service.etl.util.KPIThreadLocal
 *  com.estrat.service.etl.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.ControlPanelGeneralDTO;
import com.estrat.service.etl.exception.ExceptionLogHelper;
import com.estrat.service.etl.exception.RequestException;
import com.estrat.service.etl.service.DBService;
import com.estrat.service.etl.service.KPIService;
import com.estrat.service.etl.util.KPIThreadLocal;
import com.estrat.service.etl.util.UserThreadLocal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DateUtil {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DBService dbService;
    @Value(value="${entry.start.day:1}")
    private int entryStartDay;
    @Value(value="${entry.end.day:7}")
    private int entryEndDay;
    private Logger log = LoggerFactory.getLogger(DateUtil.class);

    public String mapToString(LocalDateTime localDateTime) {
        String formatteddDate = "";
        if (localDateTime != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MMM-yyyy");
            formatteddDate = dateFormat.format(Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant()));
        }
        return formatteddDate;
    }

    public String mapToString(Date date, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        String formatteddDate = dateFormat.format(date);
        return formatteddDate;
    }

    public Date mapToObject(String date) throws RequestException {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date formatteddDate = dateFormat.parse(date);
            return formatteddDate;
        }
        catch (Exception e) {
            this.log.error("Exception Occured " + ExceptionLogHelper.convertToString((Exception)e));
            throw new RequestException((Throwable)e);
        }
    }

    public Map<String, Object> populatePeriod(Date startDate, Date endDate, String frequency) {
        Date updatedStartDate = this.updateStartDate(startDate, frequency);
        Date updatedEndDate = this.updateEndDate(endDate, frequency);
        Map periodMap = null;
        periodMap = frequency.equalsIgnoreCase("Quarterly") ? this.updateQuarterFrequency(updatedStartDate, updatedEndDate, false) : (frequency.equalsIgnoreCase("HalfYearly") ? this.updateHalfYearFrequency(updatedStartDate, updatedEndDate, false) : (frequency.equalsIgnoreCase("Monthly") ? this.updateMonthlyFrequency(updatedStartDate, updatedEndDate) : this.updateYearlyFrequency(updatedStartDate, updatedEndDate)));
        return periodMap;
    }

    public Map<String, Object> updateQuarterFrequency(Date startDate, Date endDate, boolean calendarYearFlag) {
        int quarters = this.findTotalFrequency(startDate, endDate, "Quarterly");
        LinkedHashMap<String, Object> quarterMap = new LinkedHashMap<String, Object>();
        ArrayList<Date> dateList = new ArrayList<Date>();
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start.setTime(startDate);
        end.setTime(startDate);
        end.set(2, start.get(2) + 2);
        end.set(5, end.getActualMaximum(5));
        dateList.add(start.getTime());
        dateList.add(end.getTime());
        String key = null;
        if (calendarYearFlag) {
            key = "Q1";
        } else {
            String intialQuarterValue = this.findQuarterFromCalendarYear(start.getTime());
            int initialDateMonth = start.get(2);
            key = intialQuarterValue.equalsIgnoreCase("Q4") && initialDateMonth >= 0 && initialDateMonth <= 2 ? String.join((CharSequence)" ", intialQuarterValue, String.valueOf(start.get(1) - 1)) : String.join((CharSequence)" ", intialQuarterValue, String.valueOf(start.get(1)));
        }
        quarterMap.put(key, dateList);
        int startCount = start.get(2);
        for (int i = 1; i < quarters; ++i) {
            ArrayList<Date> subList = new ArrayList<Date>();
            int endcount = (startCount += 3) + 2;
            Calendar startIndex = (Calendar)start.clone();
            Calendar endIndex = (Calendar)end.clone();
            if (endIndex.getActualMaximum(5) == 31) {
                endIndex.set(5, 30);
            }
            startIndex.set(2, startCount);
            startIndex.set(5, 1);
            endIndex.set(2, endcount);
            endIndex.set(5, endIndex.getActualMaximum(5));
            subList.add(startIndex.getTime());
            subList.add(endIndex.getTime());
            String subKey = null;
            if (calendarYearFlag) {
                subKey = "Q" + (i + 1);
            } else {
                String intialValue = this.findQuarterFromCalendarYear(startIndex.getTime());
                int initialDateMonth = startIndex.get(2);
                subKey = intialValue.equalsIgnoreCase("Q4") && initialDateMonth >= 0 && initialDateMonth <= 2 ? String.join((CharSequence)" ", intialValue, String.valueOf(startIndex.get(1) - 1)) : String.join((CharSequence)" ", intialValue, String.valueOf(startIndex.get(1)));
            }
            quarterMap.put(subKey, subList);
        }
        return quarterMap;
    }

    public Map<String, Object> updateHalfYearFrequency(Date startDate, Date endDate, boolean calendarYearFlag) {
        int halfYears = this.findTotalFrequency(startDate, endDate, "HalfYearly");
        LinkedHashMap<String, Object> halfYearMap = new LinkedHashMap<String, Object>();
        ArrayList<Date> dateList = new ArrayList<Date>();
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start.setTime(startDate);
        end.setTime(startDate);
        end.set(2, start.get(2) + 5);
        end.set(5, end.getActualMaximum(5));
        String key = null;
        key = calendarYearFlag ? "H1" : String.join((CharSequence)" ", this.findHalfYearFromCalendarYear(start.getTime()), String.valueOf(start.get(1)));
        dateList.add(start.getTime());
        dateList.add(end.getTime());
        halfYearMap.put(key, dateList);
        int startCount = start.get(2);
        for (int i = 1; i < halfYears; ++i) {
            int endcount = (startCount += 6) + 5;
            ArrayList<Date> subList = new ArrayList<Date>();
            Calendar startIndex = (Calendar)start.clone();
            Calendar endIndex = (Calendar)end.clone();
            if (endIndex.getActualMaximum(5) == 31) {
                endIndex.set(5, 30);
            }
            startIndex.set(2, startCount);
            startIndex.set(5, 1);
            endIndex.set(2, endcount);
            endIndex.set(5, endIndex.getActualMaximum(5));
            subList.add(startIndex.getTime());
            subList.add(endIndex.getTime());
            String subKey = null;
            subKey = calendarYearFlag ? "H" + (i + 1) : String.join((CharSequence)" ", this.findHalfYearFromCalendarYear(startIndex.getTime()), String.valueOf(startIndex.get(1)));
            halfYearMap.put(subKey, subList);
        }
        return halfYearMap;
    }

    public Map<String, Object> updateMonthlyFrequency(Date startDate, Date endDate) {
        int months = this.findTotalFrequency(startDate, endDate, "Monthly");
        ArrayList<Date> dateList = new ArrayList<Date>();
        LinkedHashMap<String, Object> monthlyMap = new LinkedHashMap<String, Object>();
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        start.setTime(startDate);
        end.setTime(startDate);
        end.set(2, start.get(2));
        end.set(5, end.getActualMaximum(5));
        dateList.add(start.getTime());
        dateList.add(end.getTime());
        String key = String.join((CharSequence)" ", this.getMonthlyName(start.get(2)), String.valueOf(start.get(1)));
        monthlyMap.put(key, dateList);
        int startCount = start.get(2);
        for (int i = 1; i < months; ++i) {
            ArrayList<Date> subList = new ArrayList<Date>();
            Calendar startIndex = (Calendar)start.clone();
            Calendar endIndex = (Calendar)end.clone();
            startIndex.set(2, ++startCount);
            startIndex.set(5, 1);
            endIndex.set(2, startCount);
            endIndex.set(5, endIndex.getActualMaximum(5));
            subList.add(startIndex.getTime());
            subList.add(endIndex.getTime());
            String subKey = String.join((CharSequence)" ", this.getMonthlyName(startIndex.get(2)), String.valueOf(startIndex.get(1)));
            monthlyMap.put(subKey, subList);
        }
        return monthlyMap;
    }

    public Date updateStartDate(Date startDate, String frequency) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        if (frequency.equalsIgnoreCase("Quarterly")) {
            String quarter = this.findQuarterFromCalendarYear(startDate);
            Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearQuarterMap");
            List<Date> dateRange = (List<Date>)calendarYearMap.get(quarter);
            Calendar startQuarterDate = Calendar.getInstance();
            startQuarterDate.setTime((Date)dateRange.get(0));
            calendar.set(5, 1);
            calendar.set(2, startQuarterDate.get(2));
        } else if (frequency.equalsIgnoreCase("HalfYearly")) {
            String halfYear = this.findHalfYearFromCalendarYear(startDate);
            Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearHalfYearMap");
            String intialHalfYearValue = this.findHalfYearFromCalendarYear(startDate);
            int initialDateMonth = calendar.get(2);
            if (intialHalfYearValue.equalsIgnoreCase("H2") && (initialDateMonth >= 9 || initialDateMonth <= 2)) {
                int updateYear = calendar.get(1) - 1;
                calendar.set(1, updateYear);
            }
            List<Date> dateRange = (List<Date>)calendarYearMap.get(halfYear);
            Calendar startHalfYearDate = Calendar.getInstance();
            startHalfYearDate.setTime((Date)dateRange.get(0));
            calendar.set(5, 1);
            calendar.set(2, startHalfYearDate.get(2));
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            calendar.set(5, 1);
            calendar.set(2, calendar.get(2));
        } else {
            Calendar yearStart = (Calendar)KPIThreadLocal.get().get("calenderYearStart");
            int startDateMonth = calendar.get(2);
            int startDateYear = calendar.get(1);
            int calendarStartMonth = yearStart.get(2);
            if (startDateMonth < calendarStartMonth) {
                calendar.set(1, startDateYear - 1);
            }
            calendar.set(5, 1);
            calendar.set(2, calendarStartMonth);
        }
        return calendar.getTime();
    }

    public Date updateEndDate(Date endDate, String frequency) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(endDate);
        if (frequency.equalsIgnoreCase("Quarterly")) {
            String quarter = this.findQuarterFromCalendarYear(endDate);
            Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearQuarterMap");
            List<Date> dateRange = (List<Date>)calendarYearMap.get(quarter);
            Calendar startQuarterDate = Calendar.getInstance();
            startQuarterDate.setTime((Date)dateRange.get(1));
            calendar.set(5, startQuarterDate.getActualMaximum(5));
            calendar.set(2, startQuarterDate.get(2));
        } else if (frequency.equalsIgnoreCase("HalfYearly")) {
            String halfYear = this.findHalfYearFromCalendarYear(endDate);
            Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearHalfYearMap");
            List<Date> dateRange = (List<Date>)calendarYearMap.get(halfYear);
            Calendar endHalfYearDate = Calendar.getInstance();
            endHalfYearDate.setTime((Date)dateRange.get(1));
            calendar.set(5, endHalfYearDate.getActualMaximum(5));
            calendar.set(2, endHalfYearDate.get(2));
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            calendar.set(2, calendar.get(2));
            calendar.set(5, calendar.getActualMaximum(5));
        } else {
            Calendar yearEnd = (Calendar)KPIThreadLocal.get().get("calenderYearEnd");
            int endDateMonth = calendar.get(2);
            int endDateYear = calendar.get(1);
            int calendarEndMonth = yearEnd.get(2);
            if (endDateMonth > calendarEndMonth) {
                calendar.set(1, endDateYear + 1);
            }
            calendar.set(5, yearEnd.getActualMaximum(5));
            calendar.set(2, calendarEndMonth);
        }
        return calendar.getTime();
    }

    public int findQuarter(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int month = cal.get(2);
        int quarter = month / 3 + 1;
        return quarter;
    }

    public String findQuarterFromCalendarYear(Date date) {
        Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearQuarterMap");
        Calendar givenDate = Calendar.getInstance();
        givenDate.setTime(date);
        String result = null;
        int givenMonth = givenDate.get(2);
        for (String key : calendarYearMap.keySet()) {
            List<Date> dateRange = (List<Date>)calendarYearMap.get(key);
            Calendar start = Calendar.getInstance();
            start.setTime((Date)dateRange.get(0));
            int startMonth = start.get(2);
            Calendar end = Calendar.getInstance();
            end.setTime((Date)dateRange.get(1));
            int endMonth = end.get(2);
            if (givenMonth < startMonth || givenMonth > endMonth) continue;
            result = key;
            break;
        }
        return result;
    }

    public String findHalfYearFromCalendarYear(Date date) {
        Map<String, List<Date>> calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearHalfYearMap");
        Calendar givenDate = Calendar.getInstance();
        givenDate.setTime(date);
        String result = null;
        int givenMonth = givenDate.get(2);
        for (String key : calendarYearMap.keySet()) {
            List<Date> dateRange = (List<Date>)calendarYearMap.get(key);
            Calendar start = Calendar.getInstance();
            start.setTime((Date)dateRange.get(0));
            int startMonth = start.get(2);
            Calendar end = Calendar.getInstance();
            end.setTime((Date)dateRange.get(1));
            int endMonth = end.get(2);
            if (startMonth == 9) {
                if (givenMonth < startMonth && givenMonth > endMonth) continue;
                result = key;
                break;
            }
            if (givenMonth < startMonth || givenMonth > endMonth) continue;
            result = key;
            break;
        }
        return result;
    }

    public int findHalfYear(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int month = cal.get(2);
        int quarter = month / 6 + 1;
        return quarter;
    }

    public Map<String, Object> updateYearlyFrequency(Date startDate, Date endDate) {
        Calendar yearStart = (Calendar)KPIThreadLocal.get().get("calenderYearStart");
        Calendar yearEnd = (Calendar)KPIThreadLocal.get().get("calenderYearEnd");
        Calendar a = this.getCalendar(startDate);
        Calendar b = this.getCalendar(endDate);
        int year = b.get(1);
        LinkedHashMap<String, Object> yearMap = new LinkedHashMap<String, Object>();
        for (int startYear = a.get(1); startYear <= year; ++startYear) {
            ArrayList<Date> dateList = new ArrayList<Date>();
            Calendar start = Calendar.getInstance();
            start.set(5, 1);
            start.set(2, yearStart.get(2));
            start.set(1, startYear);
            Calendar end = Calendar.getInstance();
            end.set(5, yearEnd.getActualMaximum(5));
            end.set(2, yearEnd.get(2));
            end.set(1, startYear);
            dateList.add(start.getTime());
            dateList.add(end.getTime());
            yearMap.put(String.valueOf(startYear), dateList);
        }
        return yearMap;
    }

    public Calendar getCalendar(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal;
    }

    public String getMonthlyName(int i) {
        String result = null;
        if (i == 0) {
            result = "JAN";
        } else if (i == 1) {
            result = "FEB";
        } else if (i == 2) {
            result = "MAR";
        } else if (i == 3) {
            result = "APR";
        } else if (i == 4) {
            result = "MAY";
        } else if (i == 5) {
            result = "JUN";
        } else if (i == 6) {
            result = "JUL";
        } else if (i == 7) {
            result = "AUG";
        } else if (i == 8) {
            result = "SEP";
        } else if (i == 9) {
            result = "OCT";
        } else if (i == 10) {
            result = "NOV";
        } else if (i == 11) {
            result = "DEC";
        }
        return result;
    }

    public String getQuarterlyName(int i) {
        String result = null;
        if (i == 1) {
            result = "Q1";
        } else if (i == 2) {
            result = "Q2";
        } else if (i == 3) {
            result = "Q3";
        } else if (i == 4) {
            result = "Q4";
        }
        return result;
    }

    public String getHalflyName(int i) {
        String result = null;
        if (i == 1) {
            result = "H1";
        } else if (i == 2) {
            result = "H2";
        }
        return result;
    }

    public void populateCalendarYear() {
        ControlPanelGeneralDTO panelGeneralDTO;
        KPIThreadLocal.get().put("customPerformance", this.kpiService.findCustomPerformanceByOrgId());
        if (KPIThreadLocal.get().get("calenderYearStart") == null && Objects.nonNull(panelGeneralDTO = this.dbService.findByOrgId(Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID")).longValue())) && StringUtils.isNotEmpty((CharSequence)panelGeneralDTO.getCalendarYear())) {
            String calendarYear = panelGeneralDTO.getCalendarYear();
            Calendar startDate = Calendar.getInstance();
            Calendar endDate = Calendar.getInstance();
            Calendar currentFinStartDate = Calendar.getInstance();
            Calendar currentFinEndDate = Calendar.getInstance();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                Date parsedStart = dateFormat.parse(calendarYear.split("\\-")[0].trim());
                Date parsedEnd = dateFormat.parse(calendarYear.split("\\-")[1].trim());
                startDate.setTime(parsedStart);
                endDate.setTime(parsedEnd);
                currentFinStartDate.setTime(parsedStart);
                currentFinEndDate.setTime(parsedEnd);
                int startYear = startDate.get(1);
                int endYear = endDate.get(1);
                Calendar currenctDate = Calendar.getInstance();
                int currentYear = currenctDate.get(1);
                currentFinStartDate.set(1, currentYear);
                currentFinEndDate.set(1, startYear == endYear ? currentYear : currentYear + 1);
                String financialPeriod = String.join((CharSequence)"-", dateFormat.format(currentFinStartDate.getTime()), dateFormat.format(currentFinEndDate.getTime()));
                KPIThreadLocal.get().put("calenderYearStart", startDate);
                KPIThreadLocal.get().put("calenderYearEnd", endDate);
                KPIThreadLocal.get().put("calenderYearQuarterMap", this.updateQuarterFrequency(startDate.getTime(), endDate.getTime(), true));
                KPIThreadLocal.get().put("calenderYearHalfYearMap", this.updateHalfYearFrequency(startDate.getTime(), endDate.getTime(), true));
                KPIThreadLocal.get().put("financialPeriodString", financialPeriod);
                KPIThreadLocal.get().put("financialPeriodStart", currentFinStartDate);
                KPIThreadLocal.get().put("financialPeriodEnd", currentFinEndDate);
                KPIThreadLocal.get().put("globalCurrency", StringUtils.stripToEmpty((String)panelGeneralDTO.getCurrencyType()));
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public int findTotalFrequency(Date startDate, Date endDate, String frequency) {
        int divider = 0;
        long DAY_IN_MILLIS = 86400000L;
        int diffInDays = (int)((startDate.getTime() - endDate.getTime()) / 86400000L);
        if (frequency.equalsIgnoreCase("Quarterly")) {
            divider = 90;
        } else if (frequency.equalsIgnoreCase("HalfYearly")) {
            divider = 180;
        } else if (frequency.equalsIgnoreCase("Monthly")) {
            divider = 30;
        } else {
            if (frequency.equalsIgnoreCase("Yearly")) {
                Calendar a = this.getCalendar(startDate);
                Calendar b = this.getCalendar(endDate);
                int year = b.get(1);
                int totalYears = 0;
                for (int startYear = a.get(1); startYear <= year; ++startYear) {
                    ++totalYears;
                }
                return totalYears;
            }
            return Math.abs(diffInDays);
        }
        int value = Math.abs(diffInDays / divider);
        return value;
    }

    public int monthsBetween(Date d1, Date d2) {
        if (d2 == null || d1 == null) {
            return -1;
        }
        Calendar m_calendar = Calendar.getInstance();
        m_calendar.setTime(d1);
        int nMonth1 = 12 * m_calendar.get(1) + m_calendar.get(2);
        m_calendar.setTime(d2);
        int nMonth2 = 12 * m_calendar.get(1) + m_calendar.get(2);
        return Math.abs(nMonth2 - nMonth1);
    }

    public List<Object> findPeriodFromCurrentDate(String frequency) {
        boolean flag = this.isPreReminderNotification();
        Calendar currentDate = Calendar.getInstance();
        int month = currentDate.get(2);
        currentDate.set(2, month);
        int year = currentDate.get(1);
        if (flag) {
            currentDate.set(2, month < 11 ? month + 1 : 0);
            currentDate.set(1, month < 11 ? year : year + 1);
        }
        currentDate.set(5, 1);
        int day = currentDate.get(5);
        month = currentDate.get(2);
        year = currentDate.get(1);
        if (day >= this.entryStartDay && day <= this.entryEndDay) {
            Map<String, List<Date>> calendarYearMap = null;
            if (frequency.equalsIgnoreCase("Quarterly")) {
                calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearQuarterMap");
            } else if (frequency.equalsIgnoreCase("HalfYearly")) {
                calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearHalfYearMap");
            } else {
                boolean checkFlag;
                if (frequency.equalsIgnoreCase("Monthly")) {
                    Calendar monthStart = Calendar.getInstance();
                    monthStart.set(2, month == 0 ? 11 : month - 1);
                    monthStart.set(5, 1);
                    monthStart.set(1, month == 0 ? year - 1 : year);
                    Calendar monnthEnd = (Calendar)monthStart.clone();
                    monnthEnd.set(5, monthStart.getActualMaximum(5));
                    return Arrays.asList(monthStart.getTime(), monnthEnd.getTime());
                }
                Calendar yearStart = (Calendar)KPIThreadLocal.get().get("calenderYearStart");
                Calendar yearEnd = (Calendar)KPIThreadLocal.get().get("calenderYearEnd");
                boolean bl = checkFlag = currentDate.get(2) == yearStart.get(2);
                if (checkFlag) {
                    Calendar yearStartPeriod = (Calendar)yearStart.clone();
                    yearStartPeriod.set(1, year - 1);
                    Calendar yearEndPeriod = (Calendar)yearEnd.clone();
                    yearEndPeriod.set(1, year - 1);
                    return Arrays.asList(yearStartPeriod.getTime(), yearEndPeriod.getTime());
                }
                return Collections.emptyList();
            }
            int index = 0;
            ArrayList<String> list = new ArrayList<String>();
            for (String keys : calendarYearMap.keySet()) {
                boolean checkFlag;
                list.add(keys);
                List periods = (List)calendarYearMap.get(keys);
                Date periodStartDate = (Date)periods.get(0);
                Calendar periodCalendar = Calendar.getInstance();
                periodCalendar.setTime(periodStartDate);
                boolean bl = checkFlag = currentDate.get(2) == periodCalendar.get(2);
                if (checkFlag) {
                    Calendar startPeriod = Calendar.getInstance();
                    Calendar endPeriod = Calendar.getInstance();
                    if (index == 0) {
                        List objects = (List)calendarYearMap.values().toArray()[calendarYearMap.size() - 1];
                        Date startDate = (Date)objects.get(0);
                        startPeriod.setTime(startDate);
                        startPeriod.set(1, year);
                        Date endDate = (Date)objects.get(1);
                        endPeriod.setTime(endDate);
                        endPeriod.set(1, year);
                        if (startPeriod.getTime().after(currentDate.getTime())) {
                            startPeriod.set(1, year - 1);
                            endPeriod.set(1, year - 1);
                        }
                        return Arrays.asList(startPeriod.getTime(), endPeriod.getTime());
                    }
                    List objects = (List)calendarYearMap.get(list.get(index - 1));
                    Date startDate = (Date)objects.get(0);
                    startPeriod.setTime(startDate);
                    startPeriod.set(1, year);
                    Date endDate = (Date)objects.get(1);
                    endPeriod.setTime(endDate);
                    endPeriod.set(1, year);
                    return Arrays.asList(startPeriod.getTime(), endPeriod.getTime());
                }
                ++index;
            }
        }
        return Collections.emptyList();
    }

    public String getDataValidTillDays() {
        Calendar currentDate = Calendar.getInstance();
        int day = currentDate.get(5);
        if (day >= this.entryStartDay && day <= this.entryEndDay) {
            int validTill = this.entryEndDay - day;
            return String.valueOf(validTill);
        }
        return "";
    }

    public boolean isTodayEligibleForDataNotification() {
        if (this.isPreReminderNotification()) {
            return true;
        }
        LocalDate today = LocalDate.now();
        Calendar currentMonth = Calendar.getInstance();
        currentMonth.set(5, 7);
        LocalDate endDate = LocalDateTime.ofInstant(currentMonth.toInstant(), ZoneId.systemDefault()).toLocalDate();
        long endCompare = ChronoUnit.DAYS.between(today, endDate);
        return endCompare == 0L;
    }

    public boolean isPreReminderNotification() {
        Calendar nextMonth = Calendar.getInstance();
        int month = nextMonth.get(2);
        nextMonth.set(2, month + 1);
        nextMonth.set(5, 1);
        LocalDate nextMonthStart = LocalDateTime.ofInstant(nextMonth.toInstant(), ZoneId.systemDefault()).toLocalDate();
        LocalDate today = LocalDate.now();
        long compare = ChronoUnit.DAYS.between(today, nextMonthStart);
        return compare == 3L;
    }

    public String getDatePeriodForStatusLight(String frequency) {
        List periodList;
        Calendar currentDate = Calendar.getInstance();
        int month = currentDate.get(2);
        int year = currentDate.get(1);
        Map<String, List<Date>> calendarYearMap = null;
        String key = null;
        if (frequency.equalsIgnoreCase("Quarterly")) {
            calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearQuarterMap");
            key = this.findQuarterFromCalendarYear(currentDate.getTime());
            periodList = (List)calendarYearMap.get(key);
            currentDate.setTime((Date)periodList.get(0));
            month = currentDate.get(2);
            year = currentDate.get(1);
        } else if (frequency.equalsIgnoreCase("HalfYearly")) {
            calendarYearMap = (Map<String, List<Date>>)KPIThreadLocal.get().get("calenderYearHalfYearMap");
            key = this.findHalfYearFromCalendarYear(currentDate.getTime());
            periodList = (List)calendarYearMap.get(key);
            currentDate.setTime((Date)periodList.get(0));
            month = currentDate.get(2);
            year = currentDate.get(1);
        } else {
            boolean checkFlag;
            if (frequency.equalsIgnoreCase("Monthly")) {
                Calendar monthStart = Calendar.getInstance();
                monthStart.set(2, month == 0 ? 11 : month - 1);
                monthStart.set(5, 1);
                monthStart.set(1, month == 0 ? year - 1 : year);
                Calendar monnthEnd = (Calendar)monthStart.clone();
                monnthEnd.set(5, monthStart.getActualMaximum(5));
                return String.join((CharSequence)"-", this.mapToString(monthStart.getTime(), "MM/dd/yyyy"), this.mapToString(monnthEnd.getTime(), "MM/dd/yyyy"));
            }
            Calendar yearStart = (Calendar)KPIThreadLocal.get().get("calenderYearStart");
            Calendar yearEnd = (Calendar)KPIThreadLocal.get().get("calenderYearEnd");
            boolean bl = checkFlag = currentDate.get(2) == yearStart.get(2);
            if (checkFlag) {
                Calendar yearStartPeriod = (Calendar)yearStart.clone();
                yearStartPeriod.set(1, year - 1);
                Calendar yearEndPeriod = (Calendar)yearEnd.clone();
                yearEndPeriod.set(1, year - 1);
                return String.join((CharSequence)"-", this.mapToString(yearStartPeriod.getTime(), "MM/dd/yyyy"), this.mapToString(yearEndPeriod.getTime(), "MM/dd/yyyy"));
            }
            return "";
        }
        int index = 0;
        ArrayList<String> list = new ArrayList<String>();
        for (String keys : calendarYearMap.keySet()) {
            list.add(keys);
            boolean checkFlag = keys.equalsIgnoreCase(key);
            if (checkFlag) {
                Calendar startPeriod = Calendar.getInstance();
                Calendar endPeriod = Calendar.getInstance();
                if (index == 0) {
                    List objects = (List)calendarYearMap.values().toArray()[calendarYearMap.size() - 1];
                    Date startDate = (Date)objects.get(0);
                    startPeriod.setTime(startDate);
                    startPeriod.set(1, year);
                    Date endDate = (Date)objects.get(1);
                    endPeriod.setTime(endDate);
                    endPeriod.set(1, year);
                    if (startPeriod.getTime().after(currentDate.getTime())) {
                        startPeriod.set(1, year - 1);
                        endPeriod.set(1, year - 1);
                    }
                    return String.join((CharSequence)"-", this.mapToString(startPeriod.getTime(), "MM/dd/yyyy"), this.mapToString(endPeriod.getTime(), "MM/dd/yyyy"));
                }
                List objects = (List)calendarYearMap.get(list.get(index - 1));
                Date startDate = (Date)objects.get(0);
                startPeriod.setTime(startDate);
                startPeriod.set(1, year);
                Date endDate = (Date)objects.get(1);
                endPeriod.setTime(endDate);
                endPeriod.set(1, year);
                return String.join((CharSequence)"-", this.mapToString(startPeriod.getTime(), "MM/dd/yyyy"), this.mapToString(endPeriod.getTime(), "MM/dd/yyyy"));
            }
            ++index;
        }
        return "";
    }
}

