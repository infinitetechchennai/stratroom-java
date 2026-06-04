/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.FormulationInitiativesDTO
 *  com.estrat.service.db.dto.InitiativesDTO
 *  com.estrat.service.db.resource.util.InitiativeUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.resource.util;

import com.estrat.service.db.dto.FormulationInitiativesDTO;
import com.estrat.service.db.dto.InitiativesDTO;
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
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class InitiativeUtil {
    public InitiativesDTO formatDates(InitiativesDTO initiativesDTO) {
        Map stringObjectsMap = initiativesDTO.getInitiativeValue();
        List dates = this.processDateRangeForActual(stringObjectsMap);
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            initiativesDTO.setStartDate((Date)dates.get(0));
            initiativesDTO.setEndDate((Date)dates.get(1));
        }
        return initiativesDTO;
    }

    public FormulationInitiativesDTO formatDates(FormulationInitiativesDTO initiativesDTO) {
        Map stringObjectsMap = initiativesDTO.getInitiativeValue();
        List dates = this.processDateRange(stringObjectsMap);
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            initiativesDTO.setStartDate((Date)dates.get(0));
            initiativesDTO.setEndDate((Date)dates.get(1));
        }
        return initiativesDTO;
    }

    public List<Date> processDateRangeForActual(Map<String, Object> stringObjectsMap) {
        String dateRange;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("actualdaterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("actualdaterange").toString()) ? stringObjectsMap.get("actualdaterange").toString() : null;
        if (StringUtils.isEmpty(dateRange)) {
            String string2 = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
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

    public List<Date> processDateRange(Map<String, Object> stringObjectsMap) {
        String dateRange;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        if (StringUtils.isEmpty(dateRange)) {
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
                catch (ParseException parseException) {}
            }
            return Arrays.asList(firstDate, secondDate);
        }
        return Collections.emptyList();
    }

    public void applyDefaultValues(Map<String, Object> mapObj) {
        if (Objects.isNull(mapObj.get("progressval")) || StringUtils.isEmpty((CharSequence)mapObj.get("progressval").toString())) {
            mapObj.put("progressval", "0");
        }
        if (Objects.isNull(mapObj.get("impactDesc")) || StringUtils.isEmpty((CharSequence)mapObj.get("impactDesc").toString())) {
            mapObj.put("impactDesc", "NA");
        }
    }
}

