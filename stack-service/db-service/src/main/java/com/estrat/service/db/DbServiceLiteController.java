package com.estrat.service.db;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DbServiceLiteController {

    @GetMapping({"", "/"})
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("service", "db-service");
        body.put("status", "UP");
        body.put("mode", "lite");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/validateLicense")
    public ResponseEntity<Map<String, Object>> validateLicense() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("validationSuccess", true);
        body.put("validationMesssage", "Validated in lite mode");
        body.put("moduleList", java.util.Arrays.asList("Risk", "Initiatives & Projects", "My Space", "PESTEL", "Meetings", "Scorecard", "SWOT", "Access Control", "Control Panel", "Data Sources", "Template", "Charts", "Cockpit", "Report", "KPI", "Organization", "Strategy Formulation", "Project Formulation", "Risk Formulation", "Risksummary", "User Management", "Audit Trail"));
        body.put("deviceList", java.util.Collections.emptyList());
        body.put("totalAllowedUsers", 1000);
        return ResponseEntity.ok(body);
    }

    @GetMapping("/control/panel/custom/get")
    public ResponseEntity<Map<String, Object>> getControlPanelCustom() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("threshold1", "0");
        body.put("threshold2", "0");
        body.put("threshold3", "0");
        body.put("customPerformance", false);
        body.put("performance", false);
        return ResponseEntity.ok(body);
    }

    @GetMapping("/control/panel/general/lists")
    public ResponseEntity<Map<String, Object>> getControlPanelGeneralList() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("siteName", "StratRoom");
        body.put("calendarYear", "01/01/2026 - 12/31/2026");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/userRole/{id}")
    public ResponseEntity<Map<String, Object>> getUserRole(@org.springframework.web.bind.annotation.PathVariable("id") Long id) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", id);
        body.put("userRole", "Super Admin");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/homePagePreferences/{empId}")
    public ResponseEntity<Map<String, Object>> getHomePagePreferences(@org.springframework.web.bind.annotation.PathVariable("empId") Long empId) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", 1);
        body.put("pageId", 0);
        body.put("pageName", "Organisation");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/user/permissions/{empId}")
    public ResponseEntity<Map<String, java.util.Set<String>>> getUserPermissions(@org.springframework.web.bind.annotation.PathVariable("empId") String empId) {
        Map<String, java.util.Set<String>> perms = new LinkedHashMap<>();
        java.util.Set<String> allAccess = new java.util.HashSet<>(java.util.Arrays.asList("View", "Create", "Update", "Delete"));
        
        perms.put("Risk", allAccess);
        perms.put("Initiatives & Projects", allAccess);
        perms.put("My Space", allAccess);
        perms.put("PESTEL", allAccess);
        perms.put("Meetings", allAccess);
        perms.put("Scorecard", allAccess);
        perms.put("SWOT", allAccess);
        perms.put("Access Control", allAccess);
        perms.put("Control Panel", allAccess);
        perms.put("Data Sources", allAccess);
        perms.put("Template", allAccess);
        perms.put("Charts", allAccess);
        perms.put("Cockpit", allAccess);
        perms.put("Report", allAccess);
        perms.put("KPI", allAccess);
        perms.put("Organization", allAccess);
        perms.put("Strategy Formulation", allAccess);
        perms.put("Project Formulation", allAccess);
        perms.put("Risk Formulation", allAccess);
        perms.put("Risksummary", allAccess);
        perms.put("User Management", allAccess);
        perms.put("Audit Trail", allAccess);
        
        return ResponseEntity.ok(perms);
    }

    @GetMapping("/user/modulePermissions/{empId}")
    public ResponseEntity<Map<String, Object>> getModulePermissions(@org.springframework.web.bind.annotation.PathVariable("empId") String empId, @org.springframework.web.bind.annotation.RequestParam("moduleName") String moduleName) {
        Map<String, Object> body = new LinkedHashMap<>();
        Map<String, String> privs = new LinkedHashMap<>();
        privs.put("privilegeView", "TRUE");
        privs.put("privilegeCreate", "TRUE");
        privs.put("privilegeUpdate", "TRUE");
        privs.put("privilegeDelete", "TRUE");
        
        // Mock sub-modules based on moduleName if necessary, but returning a generic full access structure is usually enough.
        Map<String, Object> innerMap = new LinkedHashMap<>();
        if ("Initiatives & Projects".equals(moduleName)) {
            innerMap.put("Initiatives", privs);
            innerMap.put("Projects", privs);
        } else {
            innerMap.put(moduleName, privs);
        }
        body.put(moduleName, innerMap);
        
        // For Data Sources and Templates, we need specific structure
        if ("Data Sources".equals(moduleName)) {
            body.put("Manual", privs);
            body.put("Excel", privs);
            body.put("Others", privs);
        } else if ("Template".equals(moduleName) || "Templates".equals(moduleName)) {
            body.put("Excel", privs);
            body.put("Masters", privs);
            body.put("Standard BSC", privs);
        } else if ("Scorecard".equals(moduleName)) {
            Map<String, Object> scoreMap = new LinkedHashMap<>();
            scoreMap.put("Scorecard", privs);
            body.put("Scorecard", scoreMap);
        }
        
        return ResponseEntity.ok(body);
    }
    @GetMapping("/orgGroupList")
    public ResponseEntity<java.util.List<Object>> orgGroupList() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }

    @GetMapping("/notificationList")
    public ResponseEntity<java.util.List<Object>> notificationList() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }

    @GetMapping("/pageTypeList")
    public ResponseEntity<java.util.List<Object>> pageTypeList() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }

    @GetMapping("/themeList")
    public ResponseEntity<java.util.List<Object>> themeList() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }

    @GetMapping("/org/years")
    public ResponseEntity<java.util.List<Object>> orgYears() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }

    @GetMapping("/notification/list/{id}")
    public ResponseEntity<java.util.List<Object>> notificationListId() {
        return ResponseEntity.ok(java.util.Collections.emptyList());
    }
}
