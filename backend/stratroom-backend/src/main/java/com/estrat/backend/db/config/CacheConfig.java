/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.config.CacheConfig
 *  com.estrat.backend.db.config.CacheProperties
 *  com.estrat.backend.db.config.InfinispanGlobalConfigurer
 *  org.infinispan.configuration.cache.CacheMode
 *  org.infinispan.configuration.cache.Configuration
 *  org.infinispan.configuration.cache.ConfigurationBuilder
 *  org.infinispan.configuration.global.GlobalConfiguration
 *  org.infinispan.configuration.global.GlobalConfigurationBuilder
 *  org.infinispan.eviction.EvictionType
 *  org.infinispan.manager.DefaultCacheManager
 *  org.infinispan.manager.EmbeddedCacheManager
 *  org.infinispan.spring.embedded.provider.SpringEmbeddedCacheManager
 *  org.infinispan.spring.embedded.provider.InfinispanCacheConfigurer
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.cache.annotation.EnableCaching
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 */
package com.estrat.backend.db.config;

import com.estrat.backend.db.config.CacheProperties;
import com.estrat.backend.db.config.InfinispanGlobalConfigurer;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import org.infinispan.configuration.cache.CacheMode;
import org.infinispan.configuration.cache.ConfigurationBuilder;
import org.infinispan.configuration.global.GlobalConfiguration;
import org.infinispan.configuration.global.GlobalConfigurationBuilder;
import org.infinispan.manager.DefaultCacheManager;
import org.infinispan.manager.EmbeddedCacheManager;
import org.infinispan.spring.embedded.provider.SpringEmbeddedCacheManager;
// InfinispanCacheConfigurer is now a local interface in the same package
// (com.estrat.backend.db.config.InfinispanCacheConfigurer) -- no import needed.
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    @Value(value="${dbcache.config.numberOfOwners:5}")
    private int numberOfOwners;
    @Value(value="${dbcache.config.evictionSize:50000}")
    private long evictionSize;
    @Value(value="${dbcache.config.maxIdleTime:1000}")
    private long maxIdleTime;
    @Value(value="${dbcache.config.maxIdleAppCacheTime:1000}")
    private long maxIdleAppCacheTime;
    @Value(value="${dbcache.config.applicationEvictionSize:10000}")
    private long applicationEvictionSize;
    @Value(value="${dbcache.config.enableCacheLogging:false}")
    private boolean enableCacheLogging;

    @Bean(name={"cacheManager"}, destroyMethod="stop")
    public SpringEmbeddedCacheManager defaultCacheManager(CacheProperties cacheProperties) {
        ArrayList<InfinispanCacheConfigurer> cacheConfigurers = new ArrayList<InfinispanCacheConfigurer>();
        GlobalConfiguration globalConfiguration = new GlobalConfigurationBuilder()
                .cacheManagerName("DBCACHE_MANAGER_APP")
                .build();
        DefaultCacheManager cacheManager = new DefaultCacheManager(globalConfiguration);
        cacheConfigurers.add(this.dbCacheConfigurer());
        cacheConfigurers.forEach(configurer -> configurer.configureCache((EmbeddedCacheManager)cacheManager));
        cacheManager.start();
        return new SpringEmbeddedCacheManager((EmbeddedCacheManager)cacheManager);
    }

    public InfinispanCacheConfigurer dbCacheConfigurer() {
        return manager -> {
            org.infinispan.configuration.cache.Configuration configuration = new ConfigurationBuilder().memory().maxCount(this.evictionSize).clustering().cacheMode(CacheMode.LOCAL).expiration().maxIdle(this.maxIdleTime, TimeUnit.MINUTES).lifespan(this.maxIdleAppCacheTime, TimeUnit.MINUTES).wakeUpInterval(10L, TimeUnit.SECONDS).statistics().enable().build();
            manager.defineConfiguration("dbCache", configuration);
        };
    }

    public InfinispanGlobalConfigurer infinispanGlobalConfigurer() {
        return jGroupPath -> new GlobalConfigurationBuilder().cacheManagerName("DBCACHE_MANAGER_APP").transport().clearProperties().defaultTransport().clusterName("db_clusters").addProperty("configurationFile", jGroupPath).build();
    }
}

