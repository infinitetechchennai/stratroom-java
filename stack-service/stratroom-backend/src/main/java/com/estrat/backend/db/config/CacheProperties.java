/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.config.CacheProperties
 *  javax.annotation.PostConstruct
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 */
package com.estrat.backend.db.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheProperties {
    @Value(value="${jgroups.tcp.port:7800}")
    private String host;
    @Value(value="${jgroups.tcp.address:localhost}")
    private String port;
    @Value(value="${jgroups.thread_pool.min_threads:2}")
    private String minThreads;
    @Value(value="${jgroups.thread_pool.max_threads:30}")
    private String maxThreads;
    @Value(value="${jgroups.tcpping.initial_hosts:localhost[7800],localhost[7801]}")
    private String initialHosts;
    private String jGroupPath;

    public String getjGroupPath() {
        return this.jGroupPath;
    }

    @Value(value="${jgroups.configfile.path:jgroups.xml}")
    public void setjGroupPath(String jGroupPath) {
        this.jGroupPath = jGroupPath;
    }

    @PostConstruct
    public void init() {
        System.setProperty("jgroups.tcp.port", this.host);
        System.setProperty("jgroups.tcp.address", this.port);
        System.setProperty("jgroups.thread_pool.min_threads", this.minThreads);
        System.setProperty("jgroups.thread_pool.max_threads", this.maxThreads);
        System.setProperty("jgroups.tcpping.initial_hosts", this.initialHosts);
    }
}

