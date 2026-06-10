/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.UserServiceApplication
 *  com.estrat.service.user.config.CommonRestTemplate
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 */
package com.estrat.service.user;

import com.estrat.service.user.config.CommonRestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "user-service" : configName);
        SpringApplication.run(UserServiceApplication.class, (String[])args);
    }

    @Bean
    public CommonRestTemplate getRestTemplate() {
        return new CommonRestTemplate();
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        if (configDir == null) { configDir = System.getProperty("user.dir"); }
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "user-service";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }
}

