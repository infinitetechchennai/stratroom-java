/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.ApplicationConfig
 *  com.estrat.service.etl.config.CommonControllerInterceptor
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.web.servlet.HandlerInterceptor
 *  org.springframework.web.servlet.config.annotation.InterceptorRegistry
 *  org.springframework.web.servlet.config.annotation.WebMvcConfigurer
 */
package com.estrat.service.etl.config;

import com.estrat.service.etl.config.CommonControllerInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfig
implements WebMvcConfigurer {
    @Value(value="${interCeptFlag:true}")
    public boolean interCeptFlag;
    @Value(value="${kpi.notification.day}")
    private int notificationDay;
    @Value(value="${kpi.notification.hour}")
    private int notificationHour;
    @Value(value="${kpi.notification.minute}")
    private int notificationMinute;

    @Bean
    public String cronExpressionKPISchedule() {
        return String.format("0 %d %d %d * ?", this.notificationMinute, this.notificationHour, this.notificationDay);
    }

    @Bean
    public CommonControllerInterceptor controllerInterceptor() {
        CommonControllerInterceptor commonControllerInterceptor = new CommonControllerInterceptor();
        return commonControllerInterceptor;
    }

    public void addInterceptors(InterceptorRegistry registry) {
        if (this.interCeptFlag) {
            registry.addInterceptor((HandlerInterceptor)this.controllerInterceptor());
        }
    }
}

