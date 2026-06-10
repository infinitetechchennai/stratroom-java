/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.SubKPIDTO
 *  com.estrat.service.db.resource.util.KPIUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.service.db.resource.util;

import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.SubKPIDTO;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiPredicate;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

public class KPIUtil {
    private static String quarterFrequency = "quarter";
    private static String halfYearFrequency = "halfyear,half year";
    BiPredicate<String, String> freqFunction = (frequency, validateFreq) -> StringUtils.isNotEmpty((CharSequence)frequency) && Arrays.asList(validateFreq.split(",")).contains(frequency.toLowerCase());

    public void updateKpiValue(Map<String, Object> kpiValue) {
        if (kpiValue.get("kpi_measurement") != null) {
            if (this.freqFunction.test(kpiValue.get("kpi_measurement").toString(), quarterFrequency)) {
                kpiValue.put("kpi_measurement", "Quarterly");
            } else if (this.freqFunction.test(kpiValue.get("kpi_measurement").toString(), halfYearFrequency)) {
                kpiValue.put("kpi_measurement", "Half Yearly");
            }
        }
    }

    public KPIDTO formatDates(KPIDTO kpidto) {
        Map stringObjectsMap = kpidto.getKpiValue();
        List dates = this.processDateRange(stringObjectsMap);
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            kpidto.setStartDate((Date)dates.get(0));
            kpidto.setEndDate((Date)dates.get(1));
        }
        return kpidto;
    }

    public SubKPIDTO formatDates(SubKPIDTO kpidto) {
        Map stringObjectsMap = kpidto.getSubKpiValue();
        List dates = this.processDateRange(stringObjectsMap);
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            kpidto.setStartDate((Date)dates.get(0));
            kpidto.setEndDate((Date)dates.get(1));
        }
        return kpidto;
    }

    public List<Date> processDateRange(Map<String, Object> stringObjectsMap) {
        String dateRange;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("kpi_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("kpi_start_end_date").toString()) ? stringObjectsMap.get("kpi_start_end_date").toString() : null;
        if (StringUtils.isEmpty(dateRange)) {
            String string2 = dateRange = stringObjectsMap.get("kpi_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("kpi_start_end_date").toString()) ? stringObjectsMap.get("kpi_start_end_date").toString() : null;
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
                catch (ParseException parseException) {}
            }
            return Arrays.asList(firstDate, secondDate);
        }
        return Collections.emptyList();
    }
}

