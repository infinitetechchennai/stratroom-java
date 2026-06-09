/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.EtlServiceApplication
 *  com.estrat.service.etl.batch.scheduler.StratroomScheduler
 *  com.estrat.service.etl.config.CommonRestTemplate
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.boot.web.client.RestTemplateBuilder
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 *  org.springframework.scheduling.annotation.EnableAsync
 *  org.springframework.scheduling.annotation.EnableScheduling
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.service.etl;

import com.estrat.service.etl.batch.scheduler.StratroomScheduler;
import com.estrat.service.etl.config.CommonRestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class EtlServiceApplication {
    @Bean
    public StratroomScheduler getStratroomScheduler() {
        return new StratroomScheduler();
    }

    @Bean
    public CommonRestTemplate getRestTemplate() {
        return new CommonRestTemplate();
    }

    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "etl-service" : configName);
        SpringApplication.run(EtlServiceApplication.class, (String[])args);
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        if (configDir == null) { configDir = System.getProperty("user.dir"); }
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "etl-service";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}

