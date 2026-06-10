package com.estrat.service.db;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class, SecurityAutoConfiguration.class})
public class DbServiceLiteApplication {
    public static void main(String[] args) {
        System.setProperty("server.port", "8083");
        System.setProperty("server.servlet.context-path", "/db-service");
        SpringApplication.run(DbServiceLiteApplication.class, args);
    }
}
