/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.resource.util.CacheUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
 *  org.infinispan.util.function.SerializableFunction
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.io.Serializable;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.infinispan.util.function.SerializableFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CacheUtil {
    @Autowired
    private DBCache dbCache;

    public void removeCache(String empId) {
        String cacheKey1 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(true), "initiativeList");
        String cacheKey2 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(false), "initiativeList");
        Predicate<Object> cachePredicate = key -> key.toString().startsWith(cacheKey1) || key.toString().startsWith(cacheKey2);
        this.dbCache.getCacheKeys("dbCache").stream().filter(cachePredicate).map((SerializableFunction & Serializable)key -> this.dbCache.remove(key, "dbCache")).collect(Collectors.toList());
    }

    public void removeCache(Initiatives initiatives, String empId) {
        if (initiatives.getPageId() != null && StringUtils.isNotEmpty((CharSequence)String.valueOf(initiatives.getPageId().getId()))) {
            String pageId = String.valueOf(initiatives.getPageId().getId());
            String cacheKey1 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(true), "initiativeList", pageId);
            String cacheKey2 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(false), "initiativeList", pageId);
            this.dbCache.remove((Object)cacheKey1, "dbCache");
            this.dbCache.remove((Object)cacheKey2, "dbCache");
        } else {
            String cacheKey1 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(true), "initiativeList");
            String cacheKey2 = String.join((CharSequence)"_", String.valueOf(empId), String.valueOf(false), "initiativeList");
            this.dbCache.remove((Object)cacheKey1, "dbCache");
            this.dbCache.remove((Object)cacheKey2, "dbCache");
        }
    }

    public void removeEmployeeCache(Object empId) {
        String orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        if (orgId != null) {
            this.dbCache.remove((Object)(orgId + "_orgEmployeeList"), "dbCache");
        }
        if (empId != null && !empId.toString().equals("null") && !empId.toString().trim().isEmpty()) {
            this.dbCache.remove(empId, "dbCache");
            this.dbCache.remove((Object)(empId + "_reporteeList"), "dbCache");
            this.dbCache.remove((Object)(empId + "_allReporteeList"), "dbCache");
            this.dbCache.remove((Object)(empId + "_parentEmployeeList"), "dbCache");
        }
    }
}

