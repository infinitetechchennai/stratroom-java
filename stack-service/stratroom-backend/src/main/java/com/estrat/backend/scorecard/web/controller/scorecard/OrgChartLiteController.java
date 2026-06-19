package com.estrat.backend.scorecard.web.controller.scorecard;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @Value("${license.datasource.url:jdbc:postgresql://localhost:5432/stratroomlicense}")
    private String licenseDbUrl;
    @Value("${license.datasource.username:root}")
    private String licenseDbUser;
    @Value("${license.datasource.password:1234}")
    private String licenseDbPass;

    // The main app DB (employees, departments, etc.) -- defaults to the same
    // datasource that scorecard-service is already wired to.
    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/orgstructure?currentSchema=orgstructure,public}")
    private String orgDbUrl;
    @Value("${spring.datasource.username:root}")
    private String orgDbUser;
    @Value("${spring.datasource.password:1234}")
    private String orgDbPass;

    /**
     * Stub org-chart endpoint. stratroom-web's OrgChartService builds the URL as
     * "${chartservice.orgchart.url}" + empId + "/employeeList", which after we
     * add a trailing slash to the property gives /orgchart/{empId}/employeeList.
     * Returns the requested employee with its full reportee subtree, shaped to
     * match the legacy Employee DTO field names (id, name, pid, children, etc.).
     */
    @GetMapping("/{empId}/employeeList")
    public ResponseEntity<Map<String, Object>> employeeList(@PathVariable("empId") long empId) {
        Map<Long, Map<String, Object>> byId = new HashMap<>();
        Map<Long, List<Long>> childrenOf = new HashMap<>();
        Long orgId = null;
        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection(orgDbUrl, orgDbUser, orgDbPass)) {
                // Find the org of the requested employee
                try (PreparedStatement ps = con.prepareStatement(
                        "SELECT org_id FROM employee_details WHERE emp_id = ?")) {
                    ps.setLong(1, empId);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            orgId = rs.getLong("org_id");
                        }
                    }
                }
                if (orgId == null) {
                    // Unknown employee -- return a minimal placeholder so the page
                    // doesn't break.
                    Map<String, Object> placeholder = new LinkedHashMap<>();
                    placeholder.put("id", String.valueOf(empId));
                    placeholder.put("ownerName", "Employee " + empId);
                    placeholder.put("name", "Employee " + empId);
                    placeholder.put("deptName", "");
                    placeholder.put("designation", "");
                    placeholder.put("location", "");
                    placeholder.put("children", new ArrayList<>());
                    return ResponseEntity.ok(placeholder);
                }
                // Load every employee in this org
                try (PreparedStatement ps = con.prepareStatement(
                        "SELECT emp_id, parent_emp_id, first_name, last_name, title, " +
                        "       department, email_address, profile_image " +
                        "  FROM employee_details " +
                        " WHERE org_id = ? " +
                        " ORDER BY emp_id")) {
                    ps.setLong(1, orgId);
                    try (ResultSet rs = ps.executeQuery()) {
                        while (rs.next()) {
                            long id = rs.getLong("emp_id");
                            long pid = rs.getLong("parent_emp_id");
                            String first = rs.getString("first_name");
                            String last = rs.getString("last_name");
                            String name = ((first == null ? "" : first) + " " + (last == null ? "" : last)).trim();
                            if (name.isEmpty()) name = "Employee " + id;
                            Map<String, Object> node = new LinkedHashMap<>();
                            node.put("id", String.valueOf(id));
                            // The legacy org-structure JS reads node.ownerName / deptName
                            // / designation / location / profileImage -- emit those names
                            // directly so the tree view shows real values instead of N/A.
                            node.put("ownerName", name);
                            node.put("name", name);
                            node.put("pid", pid);
                            String title = rs.getString("title");
                            node.put("designation", title);
                            node.put("title", title);
                            String dept = rs.getString("department");
                            node.put("deptName", dept);
                            node.put("dept", dept);
                            node.put("location", "");
                            String email = rs.getString("email_address");
                            if (email != null && !email.isEmpty()) node.put("email", email);
                            String image = rs.getString("profile_image");
                            node.put("profileImage", image);
                            if (image != null && !image.isEmpty()) node.put("image", image);
                            node.put("children", new ArrayList<Map<String, Object>>());
                            byId.put(id, node);
                            childrenOf.computeIfAbsent(pid, k -> new ArrayList<>()).add(id);
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.warn("orgchart employeeList failed for empId={} : {}", empId, e.getMessage());
            Map<String, Object> placeholder = new LinkedHashMap<>();
            placeholder.put("id", String.valueOf(empId));
            placeholder.put("ownerName", "Employee " + empId);
            placeholder.put("name", "Employee " + empId);
            placeholder.put("children", new ArrayList<>());
            return ResponseEntity.ok(placeholder);
        }
        // Build the subtree rooted at the requested employee
        Map<String, Object> root = byId.get(empId);
        if (root == null) {
            root = new LinkedHashMap<>();
            root.put("id", String.valueOf(empId));
            root.put("ownerName", "Employee " + empId);
            root.put("name", "Employee " + empId);
            root.put("children", new ArrayList<>());
            return ResponseEntity.ok(root);
        }
        attachChildren(root, empId, byId, childrenOf);
        return ResponseEntity.ok(root);
    }

    @SuppressWarnings("unchecked")
    private void attachChildren(Map<String, Object> node, long id,
                                Map<Long, Map<String, Object>> byId,
                                Map<Long, List<Long>> childrenOf) {
        List<Map<String, Object>> children = (List<Map<String, Object>>) node.get("children");
        List<Long> kids = childrenOf.get(id);
        if (kids == null) return;
        for (Long kid : kids) {
            Map<String, Object> child = byId.get(kid);
            if (child == null) continue;
            children.add(child);
            attachChildren(child, kid, byId, childrenOf);
        }
    }

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
            Class.forName("org.postgresql.Driver");
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
