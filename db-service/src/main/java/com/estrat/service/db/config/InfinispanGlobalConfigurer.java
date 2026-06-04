/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.config.InfinispanGlobalConfigurer
 *  org.infinispan.configuration.global.GlobalConfiguration
 */
package com.estrat.service.db.config;

import org.infinispan.configuration.global.GlobalConfiguration;

@FunctionalInterface
public interface InfinispanGlobalConfigurer {
    public GlobalConfiguration getGlobalConfiguration(String var1);
}

