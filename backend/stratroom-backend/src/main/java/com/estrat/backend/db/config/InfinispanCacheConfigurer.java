package com.estrat.backend.db.config;

import org.infinispan.manager.EmbeddedCacheManager;

/**
 * Local stub for the legacy {@code org.infinispan.spring.starter.embedded.InfinispanCacheConfigurer}
 * interface, which no longer ships in Infinispan 15's standalone Spring artifacts.
 * The interface is a single-method contract that hands cache definitions to an
 * {@link EmbeddedCacheManager}. Keeping the type local lets CacheConfig keep
 * working without pulling in a missing/deprecated artifact.
 */
@FunctionalInterface
public interface InfinispanCacheConfigurer {
    void configureCache(EmbeddedCacheManager manager);
}
