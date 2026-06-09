
/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.ScoreCardServiceApplication
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.boot.web.client.RestTemplateBuilder
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.ComponentScan
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 *  org.springframework.web.client.RestTemplate
 *  springfox.documentation.swagger2.annotations.EnableSwagger2
 */
package com.estrat.scorecard;

import com.estrat.scorecard.config.CommonRestTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ComponentScan(basePackages={"com"})
public class ScoreCardServiceApplication {
    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "scorecard-service" : configName);
        SpringApplication.run(ScoreCardServiceApplication.class, (String[])args);
    }

    @Bean
    public CommonRestTemplate getRestTemplate() {
        return new CommonRestTemplate();
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        if (configDir == null) { configDir = System.getProperty("user.dir"); }
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "scorecard-service";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }
}

