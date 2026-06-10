/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.resource.util.ObjectiveUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.resource.util;

import com.estrat.service.db.dto.ObjectivesDTO;
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
public class ObjectiveUtil {
    public ObjectivesDTO formatDates(ObjectivesDTO objectivesDTO) {
        Map stringObjectsMap = objectivesDTO.getObjectivesValue();
        List dates = this.processDateRange(stringObjectsMap);
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            objectivesDTO.setStartDate((Date)dates.get(0));
            objectivesDTO.setEndDate((Date)dates.get(1));
        }
        return objectivesDTO;
    }

    public List<Date> processDateRange(Map<String, Object> stringObjectsMap) {
        String dateRange;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("objective_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("objective_start_end_date").toString()) ? stringObjectsMap.get("objective_start_end_date").toString() : null;
        if (StringUtils.isEmpty(dateRange)) {
            String string2 = dateRange = stringObjectsMap.get("objective_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("objective_start_end_date").toString()) ? stringObjectsMap.get("objective_start_end_date").toString() : null;
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

