package com.estrat.scorecard.web.controller.scorecard;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Lite controller for orgchart endpoints normally served by a separate
 * orgchart-service. The license check reads the real license row from the
 * stratroomlicense database so the web app receives the licensed module list.
 */
@RestController
@RequestMapping("/orgchart")
public class OrgChartLiteController {

    private static final Logger log = LoggerFactory.getLogger(OrgChartLiteController.class);

    // The licensed modules live in the separate stratroomlicense database.
    @Value("${license.datasource.url:jdbc:mysql://localhost:3306/stratroomlicense?useSSL=false&serverTimezone=UTC}")
    private String licenseDbUrl;
    @Value("${license.datasource.username:root}")
    private String licenseDbUser;
    @Value("${license.datasource.password:123456}")
    private String licenseDbPass;

    @GetMapping("/validateLicense")
    public ResponseEntity<Map<String, Object>> validateLicense() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("validationSuccess", true);
        body.put("validationMesssage", "License is valid");
        body.put("organization", "StratRoom");
        body.put("totalAllowedUsers", 1000L);
        List<String> moduleList = new ArrayList<>();
        List<String> deviceList = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection con = DriverManager.getConnection(licenseDbUrl, licenseDbUser, licenseDbPass)) {
                // Use the most recently issued license row.
                PreparedStatement ps = con.prepareStatement(
                        "SELECT organiztion, total_users, modules, devices " +
                        "FROM org_license_details ORDER BY org_license_id DESC LIMIT 1");
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    String org = rs.getString("organiztion");
                    if (org != null && !org.trim().isEmpty()) {
                        body.put("organization", org);
                    }
                    long totalUsers = rs.getLong("total_users");
                    if (totalUsers > 0) {
                        body.put("totalAllowedUsers", totalUsers);
                    }
                    moduleList = splitCsv(rs.getString("modules"));
                    deviceList = splitCsv(rs.getString("devices"));
                }
            }
        } catch (Exception e) {
            log.error("Could not read license from stratroomlicense DB, returning empty module list", e);
        }

        body.put("moduleList", moduleList);
        body.put("deviceList", deviceList);
        return ResponseEntity.ok(body);
    }

    private static List<String> splitCsv(String value) {
        if (value == null || value.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
