package com.estrat.service.auth;

import com.estrat.service.auth.config.AuthRestTemplate;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

@SpringBootApplication
@ComponentScan(basePackages = {"com"})
@EnableAutoConfiguration(exclude = {DataSourceTransactionManagerAutoConfiguration.class})
public class AuthServiceApplication {

    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "auth-service" : configName);
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @Bean
    public AuthRestTemplate getRestTemplate() {
        return new AuthRestTemplate();
    }

    @Bean
    public DataSource dataSource(
            @Value("${spring.datasource.url}") String url,
            @Value("${spring.datasource.driverClassName:com.mysql.cj.jdbc.Driver}") String driver,
            @Value("${spring.datasource.username}") String username,
            @Value("${spring.datasource.password}") String password) {
        return DataSourceBuilder.create()
                .url(url)
                .driverClassName(driver)
                .username(username)
                .password(password)
                .build();
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        if (configDir == null) { configDir = System.getProperty("user.dir"); }
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer cfg = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "auth-service";
        FileSystemResource fileSystemResource = new FileSystemResource(
                String.format("%s/%s%s", configDir, serviceName, ".properties"));
        cfg.setLocations(new Resource[]{fileSystemResource});
        return cfg;
    }
}
