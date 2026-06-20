package com.estrat.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.config.BootstrapMode;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Single entry point for the merged Stratroom Backend application.
 *
 * Replaces:
 *  - AuthServiceApplication      (port 8081)
 *  - UserServiceApplication       (port 8082)
 *  - DbServiceApplication         (port 8083)
 *  - ScoreCardServiceApplication  (port 8084)
 *  - EtlServiceApplication        (port 8086)
 *  - LicenceServiceApplication    (embedded)
 *
 * All now run as one application on port 8085.
 */
@SpringBootApplication
@ComponentScan(
    basePackages = {"com.estrat.backend"},
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.REGEX,
        pattern = "com\\.estrat\\.backend\\.(user|scorecard|etl)\\..*"
    )
)
@EntityScan(basePackages = {
    "com.estrat.backend.db.bean",
    "com.estrat.backend.license.bean"
})
@EnableJpaRepositories(
    basePackages = {
        "com.estrat.backend.db.dao",
        "com.estrat.backend.db.repository",
        "com.estrat.backend.license.dao"
    },
    bootstrapMode = BootstrapMode.LAZY
)
@EnableScheduling
public class StratroomBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StratroomBackendApplication.class, args);
    }
}
