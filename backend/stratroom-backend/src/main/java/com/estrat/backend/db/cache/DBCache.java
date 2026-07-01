/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.cache.DBCache
 *  org.infinispan.CacheSet
 *  org.infinispan.manager.EmbeddedCacheManager
 *  org.infinispan.spring.embedded.provider.SpringEmbeddedCacheManager
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.cache;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.infinispan.CacheSet;
import org.infinispan.manager.EmbeddedCacheManager;
import org.infinispan.spring.embedded.provider.SpringEmbeddedCacheManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DBCache {
    private EmbeddedCacheManager cacheManager;

    @Autowired
    public DBCache(SpringEmbeddedCacheManager embeddedCacheManager) {
        this.cacheManager = embeddedCacheManager.getNativeCacheManager();
    }

    public Object get(Object key, String cacheName) {
        return this.cacheManager.getCache(cacheName).get(key);
    }

    public Object put(Object key, Object value, String cacheName) {
        return this.cacheManager.getCache(cacheName).putIfAbsent(key, value);
    }

    public Object putWithLifeSpan(Object key, Object value, String cacheName) {
        return this.cacheManager.getCache(cacheName).putIfAbsent(key, value, 10L, TimeUnit.MINUTES);
    }

    public Object remove(Object key, String cacheName) {
        return this.cacheManager.getCache(cacheName).remove(key);
    }

    public Object replace(Object key, Object value, String cacheName) {
        return this.cacheManager.getCache(cacheName).replace(key, value);
    }

    public CacheSet<Object> getCacheKeys(String cacheName) {
        return this.cacheManager.getCache(cacheName).keySet();
    }

    public void removeCacheKeys(List<Object> cacheKeys) {
        if (cacheKeys == null) {
            cacheKeys = new ArrayList<Object>();
        }
        cacheKeys.stream().map(key -> this.remove(key, "dbCache")).collect(Collectors.toList());
    }
}
